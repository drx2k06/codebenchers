import { DoubtQuery, EducationTopic, KeyConcept, SupportedLanguage } from '@signbridge/types';
import {
  KARNATAKA_CLASS_8_SCIENCE_CURRICULUM,
  searchCurriculum,
} from '../curriculum/karnatakaClass8Science';
import { offlineStorage } from '../storage/offlineStore';

export interface TutorResponse {
  answerKn: string;
  answerEn: string;
  keyConcept: string;
  simplifiedExplanation: string;
  ruralAnalogyKn?: string;
  everydayExample?: string;
  followUpQuestions: string[];
  sourceModel: string;
  isOfflineFallback: boolean;
}

export class KannadaScienceTutorEngine {
  /**
   * Compress and resize an uploaded image file on the client before network transmission
   * to ensure minimal data usage on basic smartphones.
   */
  public async processImageForUpload(file: File, maxDim = 800, quality = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Ask a question / resolve a doubt using AI (Online Gemini Gateway or Offline Curriculum Engine)
   */
  public async resolveDoubt(
    query: string,
    topicId?: string,
    language: SupportedLanguage = 'kn',
    imageBase64?: string,
  ): Promise<TutorResponse> {
    const isOnline = offlineStorage.isOnline();

    if (isOnline) {
      try {
        const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';
        const resp = await fetch(`${gatewayUrl}/api/tutor/doubt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: query,
            topicId,
            language,
            imageBase64,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          return {
            ...data,
            isOfflineFallback: false,
          };
        }
      } catch (err) {
        console.warn('[AITutor] Online Gateway call failed, engaging offline curriculum engine:', err);
      }
    }

    // Offline or Fallback resolution
    return this.generateOfflineExplanation(query, topicId);
  }

  /**
   * Offline Knowledge-Base Explanation Engine for Karnataka Class 8 Science
   */
  public generateOfflineExplanation(query: string, topicId?: string): TutorResponse {
    const cleanQ = query.trim().toLowerCase();
    const searchMatches = searchCurriculum(cleanQ);

    let matchedTopic: EducationTopic | undefined = searchMatches[0]?.topic;
    if (!matchedTopic && topicId) {
      matchedTopic = KARNATAKA_CLASS_8_SCIENCE_CURRICULUM.find((t) => t.id === topicId);
    }
    const safeTopic: EducationTopic = matchedTopic || KARNATAKA_CLASS_8_SCIENCE_CURRICULUM[0];

    // Look for matching concept inside the topic
    const concept =
      safeTopic.keyConcepts.find(
        (c: KeyConcept) =>
          cleanQ.includes(c.termKn.toLowerCase()) ||
          cleanQ.includes(c.termEn.toLowerCase()) ||
          c.definitionKn.toLowerCase().includes(cleanQ),
      ) || safeTopic.keyConcepts[0];

    const lesson = safeTopic.lessons[0];

    return {
      answerKn: `ನಮಸ್ಕಾರ! ${safeTopic.chapterTitleKn} ಅಧ್ಯಾಯದ ಪ್ರಕಾರ:\n\n${concept.termKn} (${concept.termEn}) ಎಂದರೆ: ${concept.definitionKn}\n\n${lesson.explanationKn}`,
      answerEn: `Hello! According to Karnataka Class 8 Science (${safeTopic.chapterTitleEn}):\n\n${concept.termEn} is defined as: ${concept.definitionEn}\n\n${lesson.explanationEn}`,
      keyConcept: `${concept.termKn} (${concept.termEn})`,
      simplifiedExplanation: `ಸರಳವಾಗಿ ಹೇಳಬೇಕೆಂದರೆ: ${concept.ruralAnalogyKn}`,
      ruralAnalogyKn: concept.ruralAnalogyKn,
      everydayExample: concept.everydayExample,
      followUpQuestions: [
        `${safeTopic.chapterTitleKn} ಕುರಿತು ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುವಿರಾ?`,
        `ಈ ಪರಿಕಲ್ಪನೆಯ ಮೇಲೆ ಸರಳ ರಸಪ್ರಶ್ನೆ ಅಭ್ಯಾಸ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?`,
      ],
      sourceModel: 'SignBridge-Offline-Curriculum-Engine (ಕನ್ನಡ ಆಫ್‌ಲೈನ್ ಬೋಧಕ)',
      isOfflineFallback: true,
    };
  }
}

export const aiTutor = new KannadaScienceTutorEngine();
