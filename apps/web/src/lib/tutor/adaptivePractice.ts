import {
  DifficultyLevel,
  EducationTopic,
  QuestionAttempt,
  QuizQuestion,
  StudentProgress,
} from '@signbridge/types';
import { KARNATAKA_CLASS_8_SCIENCE_CURRICULUM } from '../curriculum/karnatakaClass8Science';

export interface AdaptiveRecommendation {
  topicId: string;
  topicTitleKn: string;
  topicTitleEn: string;
  reasonKn: string;
  reasonEn: string;
  suggestedActionKn: string;
  priority: 'high' | 'medium' | 'low';
}

export function selectNextAdaptiveQuestion(
  topic: EducationTopic,
  recentAttempts: QuestionAttempt[],
): { question: QuizQuestion; currentLevel: DifficultyLevel; remedialHintKn?: string } {
  const topicAttempts = recentAttempts.filter((a) => a.topicId === topic.id);
  const lastAttempt = topicAttempts[topicAttempts.length - 1];

  let targetDifficulty: DifficultyLevel = 'easy';

  if (!lastAttempt) {
    targetDifficulty = 'easy';
  } else if (!lastAttempt.isCorrect) {
    // Demote or keep easy to reinforce understanding
    targetDifficulty = 'easy';
  } else {
    // Previous was correct! Promote if possible
    if (lastAttempt.difficulty === 'easy') {
      targetDifficulty = 'medium';
    } else if (lastAttempt.difficulty === 'medium') {
      targetDifficulty = 'hard';
    } else {
      targetDifficulty = 'hard';
    }
  }

  // Find questions matching target difficulty
  let matchingQuestions = topic.questions.filter((q) => q.difficulty === targetDifficulty);

  // Fallback if no questions in target difficulty
  if (matchingQuestions.length === 0) {
    matchingQuestions = topic.questions;
  }

  // Avoid repeating the exact last question if other questions exist
  const unattempted = matchingQuestions.filter((q) => !topicAttempts.some((a) => a.questionId === q.id));
  const pool = unattempted.length > 0 ? unattempted : matchingQuestions;
  const selected = pool[Math.floor(Math.random() * pool.length)] || topic.questions[0];

  let remedialHintKn: string | undefined;
  if (!lastAttempt?.isCorrect && lastAttempt) {
    const concept = topic.keyConcepts.find((c) => c.termKn === selected.conceptTag);
    if (concept) {
      remedialHintKn = `ಸಲಹೆ: ${concept.ruralAnalogyKn}`;
    } else {
      remedialHintKn = `ಗಮನಿಸಿ: ಪ್ರಶ್ನೆಯ ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಯನ್ನು ಶಾಂತವಾಗಿ ಓದಿ ಉತ್ತರಿಸಿ.`;
    }
  }

  return {
    question: selected,
    currentLevel: targetDifficulty,
    remedialHintKn,
  };
}

export function computeProgressMetrics(
  progress: StudentProgress,
  allTopics: EducationTopic[] = KARNATAKA_CLASS_8_SCIENCE_CURRICULUM,
): {
  masteryPercentage: number;
  weakTopicsList: EducationTopic[];
  strongTopicsList: EducationTopic[];
  recommendations: AdaptiveRecommendation[];
} {
  const topicStats: Record<string, { correct: number; total: number }> = {};

  for (const attempt of progress.questionHistory) {
    if (!topicStats[attempt.topicId]) {
      topicStats[attempt.topicId] = { correct: 0, total: 0 };
    }
    topicStats[attempt.topicId].total += 1;
    if (attempt.isCorrect) {
      topicStats[attempt.topicId].correct += 1;
    }
  }

  const weakTopicsList: EducationTopic[] = [];
  const strongTopicsList: EducationTopic[] = [];
  const recommendations: AdaptiveRecommendation[] = [];

  for (const topic of allTopics) {
    const stats = topicStats[topic.id];
    if (stats && stats.total > 0) {
      const accuracy = stats.correct / stats.total;
      if (accuracy < 0.6) {
        weakTopicsList.push(topic);
        recommendations.push({
          topicId: topic.id,
          topicTitleKn: topic.chapterTitleKn,
          topicTitleEn: topic.chapterTitleEn,
          reasonKn: `ಈ ಅಧ್ಯಾಯದಲ್ಲಿ ನಿಖರತೆ ${Math.round(accuracy * 100)}% ಇದೆ. ಹೆಚ್ಚಿನ ಅಭ್ಯಾಸ ಅಗತ್ಯವಿದೆ.`,
          reasonEn: `Accuracy is ${Math.round(accuracy * 100)}% in this chapter. Further practice recommended.`,
          suggestedActionKn: 'ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಮತ್ತೆ ಓದಿ ಮತ್ತು ಸರಳ ಹಂತದ ರಸಪ್ರಶ್ನೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.',
          priority: 'high',
        });
      } else if (accuracy >= 0.8) {
        strongTopicsList.push(topic);
      }
    } else {
      // Unattempted chapter
      recommendations.push({
        topicId: topic.id,
        topicTitleKn: topic.chapterTitleKn,
        topicTitleEn: topic.chapterTitleEn,
        reasonKn: 'ಈ ಅಧ್ಯಾಯವನ್ನು ಇನ್ನೂ ಪ್ರಾರಂಭಿಸಿಲ್ಲ.',
        reasonEn: 'This chapter has not been started yet.',
        suggestedActionKn: 'ಅಧ್ಯಾಯದ ಪಾಠಗಳನ್ನು ಓದಿ ಮೊದಲ ರಸಪ್ರಶ್ನೆ ತೆಗೆದುಕೊಳ್ಳಿ.',
        priority: 'medium',
      });
    }
  }

  // Calculate overall mastery
  const completedCount = progress.completedTopics.length;
  const totalTopics = allTopics.length;
  const topicRatio = totalTopics > 0 ? (completedCount / totalTopics) * 60 : 0;

  let totalQuestions = 0;
  let totalCorrect = 0;
  for (const stats of Object.values(topicStats)) {
    totalQuestions += stats.total;
    totalCorrect += stats.correct;
  }
  const quizRatio = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 40 : 0;
  const masteryPercentage = Math.min(100, Math.round(topicRatio + quizRatio));

  return {
    masteryPercentage,
    weakTopicsList,
    strongTopicsList,
    recommendations,
  };
}
