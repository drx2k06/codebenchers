'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  EducationTopic,
  DifficultyLevel,
  QuizQuestion,
  SupportedLanguage,
} from '@signbridge/types';
import {
  KARNATAKA_CLASS_8_SCIENCE_CURRICULUM,
  getCurriculumTopic,
} from '../../lib/curriculum/karnatakaClass8Science';
import { aiTutor, TutorResponse } from '../../lib/tutor/aiTutorEngine';
import { selectNextAdaptiveQuestion } from '../../lib/tutor/adaptivePractice';
import { offlineStorage } from '../../lib/storage/offlineStore';
import { StreamingSTTClient } from '../../lib/speech/stt';
import { ttsPlayer } from '../../lib/speech/tts';
import { useI18n } from '../../lib/i18n';
import {
  BookOpen,
  Mic,
  MicOff,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Wifi,
  WifiOff,
  Flame,
  Award,
  Layers,
  ChevronRight,
  Upload,
  Send,
} from 'lucide-react';

export const ScienceTutorView: React.FC = () => {
  const { language, t, ttsVoiceStatus } = useI18n();

  // Curriculum state
  const [selectedTopicId, setSelectedTopicId] = useState<string>('karn-c8-crop');
  const [activeTab, setActiveTab] = useState<'lessons' | 'doubt' | 'practice'>('lessons');

  // Doubt Solver state
  const [doubtText, setDoubtText] = useState<string>('');
  const [isAskingDoubt, setIsAskingDoubt] = useState<boolean>(false);
  const [doubtResponse, setDoubtResponse] = useState<TutorResponse | null>(null);
  const [doubtImageBase64, setDoubtImageBase64] = useState<string | null>(null);
  const [isListeningDoubt, setIsListeningDoubt] = useState<boolean>(false);
  const [sttError, setSttError] = useState<string | null>(null);

  // Audio readout state
  const [isSpeakingAnswer, setIsSpeakingAnswer] = useState<boolean>(false);

  // Practice state
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<QuizQuestion | null>(null);
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>('easy');
  const [remedialHint, setRemedialHint] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(3);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sttClientRef = useRef<StreamingSTTClient | null>(null);

  const activeTopic = getCurriculumTopic(selectedTopicId) || KARNATAKA_CLASS_8_SCIENCE_CURRICULUM[0];

  // Sync state & network listeners
  useEffect(() => {
    setIsOnline(offlineStorage.isOnline());
    setPendingSyncCount(offlineStorage.getPendingQueueCount());

    const unsubscribe = offlineStorage.onSyncChange((count, online) => {
      setPendingSyncCount(count);
      setIsOnline(online);
    });

    const progress = offlineStorage.getProgress();
    setStreakCount(progress.streakDays);

    return () => {
      unsubscribe();
      sttClientRef.current?.stop();
      ttsPlayer.stop();
    };
  }, []);

  // Update adaptive question when topic or practice tab changes
  useEffect(() => {
    if (activeTopic) {
      const progress = offlineStorage.getProgress();
      const adaptive = selectNextAdaptiveQuestion(activeTopic, progress.questionHistory);
      setCurrentQuizQuestion(adaptive.question);
      setCurrentLevel(adaptive.currentLevel);
      setRemedialHint(adaptive.remedialHintKn);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  }, [selectedTopicId, activeTab]);

  // Voice Query STT Toggle
  const toggleVoiceQuestion = () => {
    if (isListeningDoubt) {
      sttClientRef.current?.stop();
      setIsListeningDoubt(false);
      return;
    }

    setSttError(null);
    sttClientRef.current = new StreamingSTTClient({
      language: language as SupportedLanguage,
      onPartial: (text) => {
        setDoubtText(text);
      },
      onFinal: (text) => {
        setDoubtText(text);
        setIsListeningDoubt(false);
      },
      onError: (err) => {
        setSttError(err);
        setIsListeningDoubt(false);
      },
      onStateChange: (listening) => {
        setIsListeningDoubt(listening);
      },
    });

    sttClientRef.current.start();
  };

  // Photo Input Handling
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedBase64 = await aiTutor.processImageForUpload(file);
      setDoubtImageBase64(compressedBase64);
    } catch (err) {
      console.warn('Failed to process image:', err);
    }
  };

  // Submit Doubt Question
  const handleAskDoubt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!doubtText.trim() && !doubtImageBase64) return;

    setIsAskingDoubt(true);
    try {
      const response = await aiTutor.resolveDoubt(
        doubtText.trim() || 'ಚಿತ್ರದಲ್ಲಿರುವ ಪ್ರಶ್ನೆಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಸರಳವಾಗಿ ವಿವರಿಸಿ.',
        selectedTopicId,
        language as SupportedLanguage,
        doubtImageBase64 || undefined,
      );
      setDoubtResponse(response);
    } catch (err) {
      console.error('Error resolving doubt:', err);
    } finally {
      setIsAskingDoubt(false);
    }
  };

  // Audio Playback
  const handleSpeakText = (text: string) => {
    if (isSpeakingAnswer) {
      ttsPlayer.stop();
      setIsSpeakingAnswer(false);
      return;
    }

    setIsSpeakingAnswer(true);
    ttsPlayer.speak(text, language as SupportedLanguage, () => {
      setIsSpeakingAnswer(false);
    });
  };

  // Submit MCQ Answer
  const handleSubmitMCQ = () => {
    if (selectedOption === null || !currentQuizQuestion) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuizQuestion.correctOptionIndex;

    // Record attempt in offline store
    offlineStorage.recordAttempt({
      questionId: currentQuizQuestion.id,
      topicId: activeTopic.id,
      selectedOption,
      isCorrect,
      timestamp: Date.now(),
      difficulty: currentLevel,
    });

    if (isCorrect) {
      offlineStorage.markTopicCompleted(activeTopic.id);
    }
  };

  // Load Next Adaptive Question
  const handleNextQuestion = () => {
    const progress = offlineStorage.getProgress();
    const adaptive = selectNextAdaptiveQuestion(activeTopic, progress.questionHistory);
    setCurrentQuizQuestion(adaptive.question);
    setCurrentLevel(adaptive.currentLevel);
    setRemedialHint(adaptive.remedialHintKn);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-6xl mx-auto pb-12">
      {/* ── TOP BANNER: Karnataka Board Header & Connection Badge ── */}
      <div className="bg-gradient-to-r from-[#14264F] to-[#1e3875] text-white p-5 sm:p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#12B8C2] text-white">
              {t('edu.board')}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{t('edu.streak', { count: streakCount })}</span>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1.5 tracking-tight">
            {language === 'kn' ? 'ಕರ್ನಾಟಕ 8ನೇ ತರಗತಿ ವಿಜ್ಞಾನ AI ಬೋಧಕ' : 'Karnataka Class 8 Science AI Tutor'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
            {language === 'kn'
              ? 'ಕನ್ನಡ ವಿವರಣೆಗಳು • ದೈನಂದಿನ ಗ್ರಾಮೀಣ ಉದಾಹರಣೆಗಳು • ಆಫ್‌ಲೈನ್ ಕಲಿಕೆ'
              : 'Kannada explanations • Everyday Karnataka analogies • Offline learning'}
          </p>
        </div>

        {/* Network & Offline Status Pill */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isOnline ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{isOnline ? t('edu.online') : t('edu.offline')}</span>
          </div>

          {pendingSyncCount > 0 && (
            <div className="text-[11px] bg-sky-500/20 border border-sky-400/40 text-sky-200 px-2.5 py-1 rounded-full">
              {t('edu.syncPending', { count: pendingSyncCount })}
            </div>
          )}
        </div>
      </div>

      {/* ── CHAPTER SELECTOR CHIPS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {KARNATAKA_CLASS_8_SCIENCE_CURRICULUM.map((topic) => {
          const isSelected = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setDoubtResponse(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 border ${
                isSelected
                  ? 'bg-[#12B8C2] text-white border-[#12B8C2] shadow-sm'
                  : 'bg-white text-[#14264F] hover:bg-slate-50 border-[#DCE5EF]'
              }`}
            >
              <span>
                {topic.chapterNumber}. {language === 'kn' ? topic.chapterTitleKn : topic.chapterTitleEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── TAB SWITCHER (Lessons | Ask Doubt | Adaptive Practice) ── */}
      <div className="flex border-b border-[#DCE5EF] bg-white rounded-xl p-1 gap-1 shadow-sm">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'lessons' ? 'bg-[#E7F4FC] text-[#14264F] shadow-sm' : 'text-[#71809A] hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#12B8C2]" />
          <span>{t('edu.lessons')}</span>
        </button>

        <button
          onClick={() => setActiveTab('doubt')}
          className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'doubt' ? 'bg-[#E7F4FC] text-[#14264F] shadow-sm' : 'text-[#71809A] hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#12B8C2]" />
          <span>{t('edu.askDoubt')}</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'practice' ? 'bg-[#E7F4FC] text-[#14264F] shadow-sm' : 'text-[#71809A] hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4 text-[#12B8C2]" />
          <span>{t('edu.practice')}</span>
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* TAB 1: TOPIC LESSONS & CONCEPT CARDS                              */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {activeTab === 'lessons' && (
        <div className="flex flex-col gap-6">
          {/* Chapter Overview Box */}
          <div className="bg-white rounded-2xl border border-[#DCE5EF] p-5 sm:p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#14264F]">
              {language === 'kn' ? activeTopic.chapterTitleKn : activeTopic.chapterTitleEn}
            </h2>
            <p className="text-xs sm:text-sm text-[#71809A] mt-1">
              {language === 'kn' ? activeTopic.descriptionKn : activeTopic.descriptionEn}
            </p>

            {/* Read Aloud Button */}
            <div className="mt-3">
              <button
                onClick={() =>
                  handleSpeakText(
                    language === 'kn'
                      ? `${activeTopic.chapterTitleKn}. ${activeTopic.descriptionKn}`
                      : `${activeTopic.chapterTitleEn}. ${activeTopic.descriptionEn}`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E7F4FC] hover:bg-[#d0ebfa] text-[#14264F] text-xs font-semibold transition"
              >
                {isSpeakingAnswer ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#12B8C2]" />}
                <span>{isSpeakingAnswer ? t('edu.stopAudio') : t('edu.readExplanation')}</span>
              </button>
            </div>
          </div>

          {/* Key Concepts Grid with Rural Analogies */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#71809A]">
              {language === 'kn' ? 'ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳು & ಹಳ್ಳಿಯ ಉದಾಹರಣೆಗಳು' : 'Key Concepts & Everyday Karnataka Examples'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTopic.keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#DCE5EF] p-4 shadow-sm flex flex-col justify-between gap-3 hover:border-[#12B8C2]/40 transition"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-[#14264F]">{concept.termKn}</span>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {concept.termEn}
                      </span>
                    </div>
                    <p className="text-xs text-[#14264F] mt-2 font-medium">
                      {concept.definitionKn}
                    </p>
                  </div>

                  {/* Rural Analogy Box */}
                  <div className="bg-[#F7F9FC] border border-[#DCE5EF] rounded-lg p-2.5 text-xs text-[#14264F]">
                    <span className="font-bold text-[#12B8C2] block mb-0.5">
                      💡 {t('edu.conceptAnalogy')}:
                    </span>
                    <span>{concept.ruralAnalogyKn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Lessons */}
          <div className="flex flex-col gap-4">
            {activeTopic.lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-2xl border border-[#DCE5EF] p-5 shadow-sm flex flex-col gap-3">
                <h4 className="text-base font-bold text-[#14264F]">
                  {language === 'kn' ? lesson.titleKn : lesson.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {language === 'kn' ? lesson.explanationKn : lesson.explanationEn}
                </p>

                {/* Key Points Bullet List */}
                <div className="bg-[#F7F9FC] p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-[#14264F] block mb-1.5">
                    {language === 'kn' ? 'ನೆನಪಿನಲ್ಲಿಡಬೇಕಾದ ಅಂಶಗಳು:' : 'Key Points to Remember:'}
                  </span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                    {(language === 'kn' ? lesson.keyPointsKn : lesson.keyPointsEn).map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {lesson.practicalActivityKn && (
                  <div className="text-xs bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                    <span className="font-bold">🔬 ಪ್ರಾಯೋಗಿಕ ಚಟುವಟಿಕೆ:</span> {lesson.practicalActivityKn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* TAB 2: AI KANNADA DOUBT RESOLUTION (Voice + Photo + Text)         */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {activeTab === 'doubt' && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-[#DCE5EF] p-5 sm:p-6 shadow-sm flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#14264F]">{t('edu.askDoubt')}</h2>
              <p className="text-xs text-[#71809A]">
                {language === 'kn'
                  ? 'ನಿಮ್ಮ ವಿಜ್ಞಾನ ಪ್ರಶ್ನೆಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಬರೆಯಿರಿ, ಮೈಕ್ರೋಫೋನ್ ಬಳಸಿ ಮಾತನಾಡಿ ಅಥವಾ ನೋಟ್‌ಬುಕ್ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.'
                  : 'Ask your science question in Kannada, speak via microphone, or take a picture of your notebook.'}
              </p>
            </div>

            <form onSubmit={handleAskDoubt} className="flex flex-col gap-3">
              <div className="relative">
                <textarea
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  placeholder={
                    language === 'kn'
                      ? 'ಉದಾಹರಣೆ: ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿಯ ಅನುಕೂಲಗಳೇನು? ಅಥವಾ ಶಬ್ದವು ನಿರ್ವಾತದಲ್ಲಿ ಏಕೆ ಹರಿಯುವುದಿಲ್ಲ?'
                      : 'E.g., What are the advantages of drip irrigation? Or why does sound not travel in a vacuum?'
                  }
                  rows={3}
                  className="w-full p-3.5 rounded-xl border border-[#DCE5EF] focus:outline-none focus:ring-2 focus:ring-[#12B8C2] text-sm text-[#14264F] resize-none"
                />
              </div>

              {/* Photo Preview if attached */}
              {doubtImageBase64 && (
                <div className="relative inline-block self-start border border-[#DCE5EF] rounded-xl p-1 bg-slate-50">
                  <img
                    src={doubtImageBase64}
                    alt="Question thumbnail"
                    className="h-24 w-auto rounded-lg object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setDoubtImageBase64(null)}
                    className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Action Buttons: Voice Mic, Photo Upload, Submit */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceQuestion}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                      isListeningDoubt
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-white hover:bg-slate-50 border border-[#DCE5EF] text-[#14264F]'
                    }`}
                  >
                    {isListeningDoubt ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#12B8C2]" />}
                    <span>{isListeningDoubt ? 'ಆಲಿಸಲಾಗುತ್ತಿದೆ...' : t('edu.voiceDoubt')}</span>
                  </button>

                  {/* Photo Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-[#DCE5EF] text-[#14264F] transition shadow-sm"
                  >
                    <Camera className="w-4 h-4 text-[#12B8C2]" />
                    <span>{t('edu.photoDoubt')}</span>
                  </button>
                </div>

                {/* Submit Question */}
                <button
                  type="submit"
                  disabled={isAskingDoubt || (!doubtText.trim() && !doubtImageBase64)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#14264F] hover:bg-[#1e3875] text-white flex items-center gap-2 transition disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAskingDoubt ? 'ಉತ್ತರಿಸಲಾಗುತ್ತಿದೆ...' : 'ಪ್ರಶ್ನೆ ಕೇಳಿ (Ask)'}</span>
                </button>
              </div>

              {sttError && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{sttError}</span>
                </div>
              )}
            </form>
          </div>

          {/* AI Response Card */}
          {doubtResponse && (
            <div className="bg-white rounded-2xl border border-[#12B8C2]/40 p-5 sm:p-6 shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#DCE5EF] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#12B8C2] text-white">
                    {doubtResponse.keyConcept}
                  </span>
                  <span className="text-[11px] text-[#71809A] font-mono">
                    Model: {doubtResponse.sourceModel}
                  </span>
                </div>

                {/* Read Aloud Button */}
                <button
                  onClick={() =>
                    handleSpeakText(
                      language === 'kn' ? doubtResponse.answerKn : doubtResponse.answerEn
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E7F4FC] hover:bg-[#d0ebfa] text-[#14264F] text-xs font-semibold transition"
                >
                  {isSpeakingAnswer ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#12B8C2]" />}
                  <span>{isSpeakingAnswer ? t('edu.stopAudio') : t('edu.readExplanation')}</span>
                </button>
              </div>

              {/* Primary Answer in Kannada */}
              <div className="text-sm sm:text-base text-[#14264F] leading-relaxed whitespace-pre-line font-medium">
                {language === 'kn' ? doubtResponse.answerKn : doubtResponse.answerEn}
              </div>

              {/* Simplified Rural Analogy Box */}
              {doubtResponse.ruralAnalogyKn && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900">
                  <span className="font-bold text-amber-800 block mb-1">
                    🌾 {t('edu.conceptAnalogy')}:
                  </span>
                  <span>{doubtResponse.ruralAnalogyKn}</span>
                </div>
              )}

              {/* Follow-up Question Suggestions */}
              {doubtResponse.followUpQuestions?.length > 0 && (
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-xs font-bold text-[#71809A]">
                    {language === 'kn' ? 'ಹೆಚ್ಚಿನ ಕಲಿಕೆಗೆ ಪ್ರಶ್ನೆಗಳು:' : 'Follow-up Questions:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {doubtResponse.followUpQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDoubtText(q);
                        }}
                        className="text-xs bg-[#F7F9FC] hover:bg-[#E7F4FC] text-[#14264F] border border-[#DCE5EF] px-3 py-1.5 rounded-lg transition text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* TAB 3: ADAPTIVE MCQ PRACTICE ASSESSMENT                           */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {activeTab === 'practice' && currentQuizQuestion && (
        <div className="bg-white rounded-2xl border border-[#DCE5EF] p-5 sm:p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#DCE5EF] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71809A]">
                {language === 'kn' ? activeTopic.chapterTitleKn : activeTopic.chapterTitleEn}
              </span>
              <h2 className="text-lg font-bold text-[#14264F]">{t('edu.practice')}</h2>
            </div>

            {/* Adaptive Difficulty Level Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#71809A]">ಮಟ್ಟ (Level):</span>
              <span
                className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                  currentLevel === 'easy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentLevel === 'medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {currentLevel}
              </span>
            </div>
          </div>

          {/* Remedial Hint if student made mistake previously */}
          {remedialHint && !isAnswerSubmitted && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{t('edu.remedialHint')}: </span>
                <span>{remedialHint}</span>
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="flex flex-col gap-1">
            <h3 className="text-base sm:text-lg font-bold text-[#14264F]">
              {language === 'kn' ? currentQuizQuestion.questionKn : currentQuizQuestion.questionEn}
            </h3>
            {language === 'kn' && (
              <span className="text-xs text-[#71809A]">{currentQuizQuestion.questionEn}</span>
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            {(language === 'kn' ? currentQuizQuestion.optionsKn : currentQuizQuestion.optionsEn).map(
              (optionText, idx) => {
                const isSelected = selectedOption === idx;
                let optionStyle = 'bg-white border-[#DCE5EF] hover:bg-slate-50 text-[#14264F]';

                if (isAnswerSubmitted) {
                  if (idx === currentQuizQuestion.correctOptionIndex) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-[#E7F4FC] border-[#12B8C2] text-[#14264F] font-bold shadow-sm';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{optionText}</span>
                    <span className="text-xs font-bold text-[#71809A] uppercase">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Feedback & Detailed Explanation */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border flex flex-col gap-2 ${
                selectedOption === currentQuizQuestion.correctOptionIndex
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOption === currentQuizQuestion.correctOptionIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{t('edu.correct')}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>{t('edu.incorrect')}</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {language === 'kn' ? currentQuizQuestion.explanationKn : currentQuizQuestion.explanationEn}
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmitMCQ}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#14264F] hover:bg-[#1e3875] text-white transition disabled:opacity-40 shadow-sm"
              >
                {t('edu.submitAnswer')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#12B8C2] hover:bg-[#0fa6af] text-white flex items-center gap-2 transition shadow-sm"
              >
                <span>{t('edu.nextQuestion')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
