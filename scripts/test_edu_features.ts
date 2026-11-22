/**
 * SignBridge Edu — Automated Test Suite
 * Validates Multilingual Foundation, Karnataka Curriculum, Adaptive Practice,
 * Offline Storage & Queue, and AI Science Tutor.
 */

import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_CONFIG,
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  normalizeLanguage,
} from '../packages/types/src/index';

import {
  KARNATAKA_CLASS_8_SCIENCE_CURRICULUM,
  getCurriculumTopic,
  searchCurriculum,
} from '../apps/web/src/lib/curriculum/karnatakaClass8Science';

import {
  selectNextAdaptiveQuestion,
  computeProgressMetrics,
} from '../apps/web/src/lib/tutor/adaptivePractice';

import {
  INITIAL_STUDENT_PROGRESS,
  SAMPLE_STUDENT_PROFILES,
} from '../apps/web/src/lib/storage/offlineStore';

import {
  KannadaScienceTutorEngine,
} from '../apps/web/src/lib/tutor/aiTutorEngine';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failCount++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting SignBridge Edu Verification Test Suite');
  console.log('====================================================\n');

  // ── TEST 1: Multilingual Foundation (Sprint 1) ──
  console.log('--- Test Suite 1: Multilingual Foundation ---');
  assert(SUPPORTED_LANGUAGES.includes('en'), 'English is supported');
  assert(SUPPORTED_LANGUAGES.includes('kn'), 'Kannada is supported');
  assert(SUPPORTED_LANGUAGES.includes('hi'), 'Hindi is supported');
  assert(SUPPORTED_LANGUAGES.includes('te'), 'Telugu is supported');

  assert(LANGUAGE_CONFIG['kn'].nativeName === 'ಕನ್ನಡ', 'Kannada native name is ಕನ್ನಡ');
  assert(LANGUAGE_CONFIG['kn'].sttLocale === 'kn-IN', 'Kannada STT locale is kn-IN');
  assert(LANGUAGE_CONFIG['kn'].ttsLocale === 'kn-IN', 'Kannada TTS locale is kn-IN');
  assert(isSupportedLanguage('kn') === true, 'isSupportedLanguage recognizes kn');
  assert(isSupportedLanguage('xyz') === false, 'isSupportedLanguage rejects invalid');
  assert(normalizeLanguage('xyz') === DEFAULT_LANGUAGE, 'normalizeLanguage falls back to DEFAULT_LANGUAGE');

  // ── TEST 2: Karnataka Class 8 Science Curriculum ──
  console.log('\n--- Test Suite 2: Karnataka Class 8 Science Curriculum ---');
  assert(KARNATAKA_CLASS_8_SCIENCE_CURRICULUM.length >= 5, 'Curriculum contains at least 5 complete chapters');

  const cropTopic = getCurriculumTopic('karn-c8-crop');
  assert(!!cropTopic, 'Crop Production chapter exists');
  assert(cropTopic?.chapterTitleKn === 'ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ', 'Chapter title in Kannada is correct');
  assert(cropTopic?.grade === 8, 'Grade is Class 8');
  assert(cropTopic?.board === 'Karnataka State Board', 'Board is Karnataka State Board');
  assert((cropTopic?.keyConcepts.length ?? 0) >= 3, 'Key concepts with rural analogies exist');
  assert((cropTopic?.questions.length ?? 0) >= 3, 'Questions across difficulty levels exist');

  const soundTopic = getCurriculumTopic('karn-c8-sound');
  assert(!!soundTopic, 'Sound chapter exists');
  assert(soundTopic?.keyConcepts.some((c) => c.termKn.includes('ಕಂಪನ')) === true, 'Sound concept includes Vibration');

  // Search curriculum
  const searchResults = searchCurriculum('ಹನಿ ನೀರಾವರಿ');
  assert(searchResults.length > 0, 'Curriculum search returns matches for Drip irrigation');
  assert(searchResults[0].topic.id === 'karn-c8-crop', 'Search matches correct chapter');

  // ── TEST 3: Adaptive Practice Engine ──
  console.log('\n--- Test Suite 3: Adaptive Difficulty & Progression ---');
  if (cropTopic) {
    // 1. Initial attempt on new topic -> easy level
    const firstAdaptive = selectNextAdaptiveQuestion(cropTopic, []);
    assert(firstAdaptive.currentLevel === 'easy', 'First question starts at easy level');

    // 2. Successful attempt on easy -> advances to medium
    const nextAfterSuccess = selectNextAdaptiveQuestion(cropTopic, [
      {
        questionId: firstAdaptive.question.id,
        topicId: cropTopic.id,
        selectedOption: 0,
        isCorrect: true,
        timestamp: Date.now(),
        difficulty: 'easy',
      },
    ]);
    assert(nextAfterSuccess.currentLevel === 'medium', 'Correct answer advances difficulty to medium');

    // 3. Failed attempt -> provides remedial hint and stays easy
    const nextAfterFailure = selectNextAdaptiveQuestion(cropTopic, [
      {
        questionId: 'q-crop-1',
        topicId: cropTopic.id,
        selectedOption: 2,
        isCorrect: false,
        timestamp: Date.now(),
        difficulty: 'easy',
      },
    ]);
    assert(nextAfterFailure.currentLevel === 'easy', 'Incorrect answer retains easy difficulty');
    assert(!!nextAfterFailure.remedialHintKn, 'Incorrect answer produces a Kannada remedial hint');
  }

  // ── TEST 4: Progress Metrics & Offline Storage ──
  console.log('\n--- Test Suite 4: Student Progress Metrics & Offline State ---');
  const metrics = computeProgressMetrics(INITIAL_STUDENT_PROGRESS, KARNATAKA_CLASS_8_SCIENCE_CURRICULUM);
  assert(metrics.masteryPercentage > 0, 'Mastery percentage is computed');
  assert(Array.isArray(metrics.recommendations), 'Personalized recommendations generated');
  assert(SAMPLE_STUDENT_PROFILES.length >= 3, 'Sample learner profiles (Kavya, Basavaraj, Ananya) available');
  assert(SAMPLE_STUDENT_PROFILES[0].districtKn === 'ಮಂಡ್ಯ', 'Kavya is from Mandya district');

  // ── TEST 5: AI Science Tutor Knowledge-Base Engine ──
  console.log('\n--- Test Suite 5: Kannada AI Science Tutor Engine ---');
  const tutorEngine = new KannadaScienceTutorEngine();
  const explanation = tutorEngine.generateOfflineExplanation('ಹಾಲನ್ನು ಮೊಸರು ಮಾಡುವುದು ಹೇಗೆ?');

  assert(!!explanation.answerKn, 'Generates Kannada explanation');
  assert(!!explanation.answerEn, 'Generates English counterpart explanation');
  assert(!!explanation.ruralAnalogyKn, 'Includes rural everyday analogy');
  assert(explanation.isOfflineFallback === true, 'Truthfully marks offline status without fake claims');
  assert(explanation.followUpQuestions.length >= 2, 'Generates follow-up study questions in Kannada');

  console.log('\n====================================================');
  console.log(`🏁 Test Results: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('====================================================');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
