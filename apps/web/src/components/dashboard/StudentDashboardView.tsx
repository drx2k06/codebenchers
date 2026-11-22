'use client';

import React, { useState, useEffect } from 'react';
import {
  StudentProgress,
  EducationTopic,
} from '@signbridge/types';
import {
  offlineStorage,
  SAMPLE_STUDENT_PROFILES,
  StudentProfile,
} from '../../lib/storage/offlineStore';
import {
  computeProgressMetrics,
  AdaptiveRecommendation,
} from '../../lib/tutor/adaptivePractice';
import { KARNATAKA_CLASS_8_SCIENCE_CURRICULUM } from '../../lib/curriculum/karnatakaClass8Science';
import { useI18n } from '../../lib/i18n';
import {
  Award,
  BookCheck,
  Flame,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  User,
  School,
  Wifi,
  WifiOff,
} from 'lucide-react';

interface StudentDashboardViewProps {
  onNavigateToTopic?: (topicId: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ onNavigateToTopic }) => {
  const { language, t } = useI18n();

  const [progress, setProgress] = useState<StudentProgress>(offlineStorage.getProgress());
  const [profile, setProfile] = useState<StudentProfile>(offlineStorage.getActiveStudentProfile());
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  useEffect(() => {
    setIsOnline(offlineStorage.isOnline());
    setPendingSyncCount(offlineStorage.getPendingQueueCount());

    const unsubscribe = offlineStorage.onSyncChange((count, online) => {
      setProgress(offlineStorage.getProgress());
      setPendingSyncCount(count);
      setIsOnline(online);
    });

    return () => unsubscribe();
  }, []);

  const handleProfileSwitch = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    offlineStorage.setActiveStudentProfile(newProfile);
  };

  const metrics = computeProgressMetrics(progress, KARNATAKA_CLASS_8_SCIENCE_CURRICULUM);

  // Total questions answered
  const totalQuestionsAnswered = progress.questionHistory.length;
  const correctCount = progress.questionHistory.filter((q) => q.isCorrect).length;
  const overallAccuracy =
    totalQuestionsAnswered > 0 ? Math.round((correctCount / totalQuestionsAnswered) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
      {/* ── PROFILE & LEARNER HEADER ── */}
      <div className="bg-white rounded-2xl border border-[#DCE5EF] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#14264F] to-[#12B8C2] flex items-center justify-center text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#14264F]">
                {language === 'kn' ? profile.nameKn : profile.nameEn}
              </h2>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#E7F4FC] text-[#12B8C2] border border-[#12B8C2]/30">
                {language === 'kn' ? '8ನೇ ತರಗತಿ' : 'Class 8'}
              </span>
            </div>
            <p className="text-xs text-[#71809A] flex items-center gap-1.5 mt-0.5">
              <School className="w-3.5 h-3.5 text-[#12B8C2]" />
              <span>{language === 'kn' ? profile.schoolKn : profile.schoolEn}</span>
            </p>
          </div>
        </div>

        {/* Profile Switcher & Network Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#71809A]">
            <span>ವಿದ್ಯಾರ್ಥಿ (Learner):</span>
            <select
              value={profile.id}
              onChange={(e) => {
                const found = SAMPLE_STUDENT_PROFILES.find((p) => p.id === e.target.value);
                if (found) handleProfileSwitch(found);
              }}
              className="bg-[#F7F9FC] border border-[#DCE5EF] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#14264F] outline-none"
            >
              {SAMPLE_STUDENT_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nameKn} ({p.districtKn})
                </option>
              ))}
            </select>
          </div>

          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
              isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{isOnline ? 'ಆನ್‌ಲೈನ್' : 'ಆಫ್‌ಲೈನ್'}</span>
          </div>
        </div>
      </div>

      {/* ── 4 KEY METRICS STATS CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Subject Mastery */}
        <div className="bg-white rounded-2xl border border-[#DCE5EF] p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#71809A]">
            <span className="text-xs font-bold">{t('edu.mastery')}</span>
            <Award className="w-4 h-4 text-[#12B8C2]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-[#14264F]">
              {metrics.masteryPercentage}%
            </span>
            <div className="w-full bg-[#E7F4FC] rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-[#12B8C2] h-2 rounded-full transition-all"
                style={{ width: `${metrics.masteryPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 2: Learning Streak */}
        <div className="bg-white rounded-2xl border border-[#DCE5EF] p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#71809A]">
            <span className="text-xs font-bold">ಕಲಿಕಾ ಸರಣಿ</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-[#14264F]">
              {progress.streakDays} <span className="text-sm font-semibold text-[#71809A]">ದಿನಗಳು</span>
            </span>
            <p className="text-[11px] text-[#71809A] mt-1">ದೈನಂದಿನ ನಿರಂತರತೆ</p>
          </div>
        </div>

        {/* Metric 3: Quiz Accuracy */}
        <div className="bg-white rounded-2xl border border-[#DCE5EF] p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#71809A]">
            <span className="text-xs font-bold">ನಿಖರತೆ (Accuracy)</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-[#14264F]">{overallAccuracy}%</span>
            <p className="text-[11px] text-[#71809A] mt-1">{totalQuestionsAnswered} ಪ್ರಶ್ನೆಗಳು ಪೂರ್ಣ</p>
          </div>
        </div>

        {/* Metric 4: Study Time */}
        <div className="bg-white rounded-2xl border border-[#DCE5EF] p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#71809A]">
            <span className="text-xs font-bold">ಅಧ್ಯಯನ ಸಮಯ</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-[#14264F]">
              {progress.totalTimeSpentMinutes} <span className="text-sm font-semibold text-[#71809A]">ನಿಮಿಷ</span>
            </span>
            <p className="text-[11px] text-[#71809A] mt-1">ಆಫ್‌ಲೈನ್ + ಆನ್‌ಲೈನ್</p>
          </div>
        </div>
      </div>

      {/* ── WEAK TOPICS & ADAPTIVE REVISION CARD ── */}
      {metrics.weakTopicsList.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{t('edu.weakTopics')}</span>
          </div>
          <p className="text-xs text-amber-800">
            {language === 'kn'
              ? 'ಈ ಕೆಳಗಿನ ಅಧ್ಯಾಯಗಳಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳ ನಿಖರತೆ ಕಡಿಮೆಯಾಗಿದೆ. ಪರೀಕ್ಷೆಗೆ ಮುನ್ನ ಇವುಗಳನ್ನು ಮತ್ತೊಮ್ಮೆ ಅಭ್ಯಾಸ ಮಾಡಿ:'
              : 'Accuracy was lower on these concepts. Revise them with adaptive hints:'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {metrics.weakTopicsList.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onNavigateToTopic?.(topic.id)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-100 transition shadow-xs"
              >
                <span>{topic.chapterTitleKn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── TOPIC PROGRESS BREAKDOWN LIST ── */}
      <div className="bg-white rounded-2xl border border-[#DCE5EF] p-5 sm:p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-base font-bold text-[#14264F]">
          {language === 'kn' ? 'ಅಧ್ಯಾಯವಾರು ಕಲಿಕಾ ಪ್ರಗತಿ' : 'Chapter-wise Learning Progress'}
        </h3>

        <div className="flex flex-col divide-y divide-[#DCE5EF]">
          {KARNATAKA_CLASS_8_SCIENCE_CURRICULUM.map((topic) => {
            const isCompleted = progress.completedTopics.includes(topic.id);
            const topicAttempts = progress.questionHistory.filter((a) => a.topicId === topic.id);
            const correctAttempts = topicAttempts.filter((a) => a.isCorrect).length;

            return (
              <div key={topic.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <BookCheck className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#14264F] block">
                      {topic.chapterNumber}. {language === 'kn' ? topic.chapterTitleKn : topic.chapterTitleEn}
                    </span>
                    <span className="text-[11px] text-[#71809A]">
                      {topicAttempts.length > 0
                        ? `${topicAttempts.length} ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ${correctAttempts} ಸರಿ (${Math.round(
                            (correctAttempts / topicAttempts.length) * 100
                          )}%)`
                        : 'ಇನ್ನೂ ಪ್ರಾರಂಭಿಸಿಲ್ಲ'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToTopic?.(topic.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#E7F4FC] hover:bg-[#d0ebfa] text-[#14264F] text-xs font-semibold shrink-0 transition"
                >
                  {isCompleted ? 'ಮತ್ತೆ ಓದಿ' : 'ಕಲಿಯಿರಿ'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
