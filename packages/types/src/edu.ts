import { SupportedLanguage } from './index';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface KeyConcept {
  termKn: string;
  termEn: string;
  definitionKn: string;
  definitionEn: string;
  ruralAnalogyKn: string;
  everydayExample: string;
}

export interface Lesson {
  id: string;
  titleKn: string;
  titleEn: string;
  summaryKn: string;
  summaryEn?: string;
  explanationKn: string;
  explanationEn: string;
  keyPointsKn: string[];
  keyPointsEn: string[];
  practicalActivityKn?: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  questionKn: string;
  questionEn: string;
  optionsKn: string[];
  optionsEn: string[];
  correctOptionIndex: number;
  explanationKn: string;
  explanationEn: string;
  difficulty: DifficultyLevel;
  conceptTag?: string;
}

export interface EducationTopic {
  id: string;
  chapterNumber: number;
  chapterTitleKn: string;
  chapterTitleEn: string;
  subject: 'science';
  grade: number;
  board: string;
  descriptionKn: string;
  descriptionEn: string;
  keyConcepts: KeyConcept[];
  lessons: Lesson[];
  questions: QuizQuestion[];
}

export interface QuestionAttempt {
  questionId: string;
  topicId: string;
  selectedOption: number;
  isCorrect: boolean;
  timestamp: number;
  difficulty: DifficultyLevel;
}

export interface StudentProgress {
  completedTopics: string[];
  completedQuizzes: Record<string, { score: number; total: number; timestamp: number; difficulty: DifficultyLevel }>;
  weakTopics: string[];
  masteryPercentage: number;
  streakDays: number;
  lastActiveDate: string;
  questionHistory: QuestionAttempt[];
  totalTimeSpentMinutes: number;
}

export interface DoubtQuery {
  id: string;
  questionText: string;
  topicId?: string;
  language: SupportedLanguage;
  imageBase64?: string;
  timestamp: number;
  answerKn?: string;
  answerEn?: string;
  keyConcept?: string;
  simplifiedExplanation?: string;
  followUpQuestions?: string[];
  source?: 'voice' | 'text' | 'photo';
}

export interface PendingSyncAction {
  id: string;
  type: 'quiz_attempt' | 'topic_complete' | 'doubt_query' | 'progress_sync';
  payload: any;
  createdAt: number;
  retries: number;
}
