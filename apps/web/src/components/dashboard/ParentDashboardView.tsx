'use client';

import React, { useState } from 'react';
import {
  offlineStorage,
  SAMPLE_STUDENT_PROFILES,
  StudentProfile,
} from '../../lib/storage/offlineStore';
import { computeProgressMetrics } from '../../lib/tutor/adaptivePractice';
import { KARNATAKA_CLASS_8_SCIENCE_CURRICULUM } from '../../lib/curriculum/karnatakaClass8Science';
import { useI18n } from '../../lib/i18n';
import {
  Users,
  Heart,
  Smile,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  School,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const ParentDashboardView: React.FC = () => {
  const { language } = useI18n();

  const [progress] = useState(offlineStorage.getProgress());
  const [profile, setProfile] = useState<StudentProfile>(offlineStorage.getActiveStudentProfile());

  const handleProfileSwitch = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    offlineStorage.setActiveStudentProfile(newProfile);
  };

  const metrics = computeProgressMetrics(progress, KARNATAKA_CLASS_8_SCIENCE_CURRICULUM);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12">
      {/* ── TOP BANNER: Parent & Teacher Friendly Overview ── */}
      <div className="bg-gradient-to-r from-[#14264F] to-[#12B8C2] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
              {language === 'kn' ? 'ಪಾಲಕರು & ಶಿಕ್ಷಕರ ಮಾರ್ಗದರ್ಶಿ' : 'Parent & Teacher Guide'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
            {language === 'kn' ? `${profile.nameKn} ಅವರ ಕಲಿಕಾ ವರದಿ` : `${profile.nameEn}'s Learning Report`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 mt-1">
            {language === 'kn'
              ? 'ಸರಳ ವಿವರಣೆ • ನಿಮ್ಮ ಮಗುವಿನ ವಿಜ್ಞಾನ ಪ್ರಗತಿ ಮತ್ತು ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.'
              : 'Simple summary • Understand your child\'s science learning and encouragement areas.'}
          </p>
        </div>

        {/* Profile Switcher */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-xl border border-white/20">
          <Users className="w-4 h-4 text-white" />
          <select
            value={profile.id}
            onChange={(e) => {
              const found = SAMPLE_STUDENT_PROFILES.find((p) => p.id === e.target.value);
              if (found) handleProfileSwitch(found);
            }}
            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
          >
            {SAMPLE_STUDENT_PROFILES.map((p) => (
              <option key={p.id} value={p.id} className="text-slate-800">
                {p.nameKn} ({p.districtKn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── PARENT SUMMARY CARD (Plain Kannada, No Jargon) ── */}
      <div className="bg-white rounded-2xl border border-[#DCE5EF] p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#14264F]">
              {language === 'kn' ? 'ಈ ವಾರದ ಕಲಿಕೆಯ ಮುಖ್ಯಾಂಶಗಳು' : 'Weekly Highlights'}
            </h2>
            <p className="text-xs text-[#71809A]">
              {language === 'kn'
                ? `${profile.nameKn} ಅವರು ಕಳೆದ 3 ದಿನಗಳಿಂದ ನಿಯಮಿತವಾಗಿ ವಿಜ್ಞಾನವನ್ನು ಅಭ್ಯಾಸ ಮಾಡುತ್ತಿದ್ದಾರೆ.`
                : `${profile.nameEn} has been regularly practicing science for the last 3 days.`}
            </p>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#DCE5EF] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#14264F]">
              {language === 'kn' ? 'ಒಟ್ಟಾರೆ 8ನೇ ತರಗತಿ ವಿಜ್ಞಾನ ಪೂರ್ಣತೆ:' : 'Class 8 Science Mastery:'}
            </span>
            <span className="text-sm font-black text-[#12B8C2]">{metrics.masteryPercentage}%</span>
          </div>
          <div className="w-full bg-[#DCE5EF] rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#14264F] to-[#12B8C2] h-3 rounded-full transition-all"
              style={{ width: `${metrics.masteryPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-[#71809A]">
            {language === 'kn'
              ? `${progress.completedTopics.length} ಅಧ್ಯಾಯಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಕಲಿಯಲಾಗಿದೆ.`
              : `${progress.completedTopics.length} chapters fully completed.`}
          </span>
        </div>
      </div>

      {/* ── 2 COLUMNS: STRENGTHS vs AREAS NEEDING ENCOURAGEMENT ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Strengths */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{language === 'kn' ? 'ಮಗು ಅತ್ಯುತ್ತಮವಾಗಿ ಕಲಿತ ವಿಷಯಗಳು' : 'Topics Mastered with Confidence'}</span>
          </div>
          <p className="text-xs text-slate-600">
            {language === 'kn'
              ? 'ಈ ವಿಷಯಗಳಲ್ಲಿ ನಿಮ್ಮ ಮಗು ಬಹುಪಾಲು ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಿಯಾದ ಉತ್ತರ ನೀಡಿದೆ:'
              : 'Your child scored high accuracy in these concepts:'}
          </p>

          <div className="flex flex-col gap-2 mt-1">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-emerald-950 block">
                  ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ (Crop Management)
                </span>
                <span className="text-[11px] text-emerald-800">
                  ಖಾರಿಫ್ ಮತ್ತು ರಬಿ ಬೆಳೆಗಳು, ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿ
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700">85% ಸರಿ</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-emerald-950 block">
                  ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳು: ಮಿತ್ರ ಮತ್ತು ಶತ್ರು
                </span>
                <span className="text-[11px] text-emerald-800">
                  ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್, ಹುದುಗುವಿಕೆ ಮತ್ತು ಲಸಿಕೆಗಳು
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700">80% ಸರಿ</span>
            </div>
          </div>
        </div>

        {/* Right: Areas Needing Support */}
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Heart className="w-5 h-5 text-amber-600" />
            <span>{language === 'kn' ? 'ಪ್ರೋತ್ಸಾಹ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ಬೇಕಾದ ವಿಷಯಗಳು' : 'Areas Needing Gentle Support'}</span>
          </div>
          <p className="text-xs text-slate-600">
            {language === 'kn'
              ? 'ಈ ವಿಷಯಗಳಲ್ಲಿ ಮಗು ಸ್ವಲ್ಪ ಗೊಂದಲಕ್ಕೊಳಗಾಗಿದೆ. ಮನೆಯಲ್ಲಿ ಧೈರ್ಯ ತುಂಬಿ:'
              : 'Concepts where your child made a few mistakes:'}
          </p>

          <div className="flex flex-col gap-2 mt-1">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-amber-950 block">
                  ಬಲ ಮತ್ತು ಒತ್ತಡ (Force and Pressure)
                </span>
                <span className="text-[11px] text-amber-800">
                  ಸ್ಥಾಯೀವಿದ್ಯುತ್ ಬಲ ಮತ್ತು ವಾತಾವರಣದ ಒತ್ತಡ
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700">ಮತ್ತೆ ಕಲಿಯಿರಿ</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-amber-950 block">
                  ಶಬ್ದ ಮತ್ತು ಆವರ್ತನ (Sound Frequency)
                </span>
                <span className="text-[11px] text-amber-800">
                  ಹರ್ಟ್ಜ್ (Hz) ಮತ್ತು ಶ್ರವ್ಯ ಶಬ್ದದ ಮಿತಿಗಳು
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700">ಮತ್ತೆ ಕಲಿಯಿರಿ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PARENT ENCOURAGEMENT TIPS (Real World Village Science) ── */}
      <div className="bg-white rounded-2xl border border-[#DCE5EF] p-5 sm:p-6 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#14264F] font-bold text-sm">
          <Sparkles className="w-5 h-5 text-[#12B8C2]" />
          <span>{language === 'kn' ? 'ಪಾಲಕರಿಗೆ ಸರಳ ಸಲಹೆಗಳು — ಮನೆಯಲ್ಲೇ ವಿಜ್ಞಾನ ಕಲಿಯಲು ಸಹಕರಿಸಿ' : 'Everyday Science Tips at Home'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#DCE5EF]">
            <span className="font-bold text-[#14264F] block mb-1">🥛 ಅಡುಗೆ ಮನೆಯಲ್ಲಿ ಮೊಸರು:</span>
            <span>ಉಗುರುಬೆಚ್ಚಗಿನ ಹಾಲಿಗೆ ಹೆಪ್ಪು ಹಾಕುವಾಗ ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್ ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಕೆಲಸವನ್ನು ಮಗುವಿಗೆ ನೆನಪಿಸಿ.</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#DCE5EF]">
            <span className="font-bold text-[#14264F] block mb-1">🚲 ಸೈಕಲ್ ಮತ್ತು ಘರ್ಷಣೆ:</span>
            <span>ಸೈಕಲ್ ಚೈನ್‌ಗೆ ಎಣ್ಣೆ ಹಾಕಿದಾಗ ಸರಾಗವಾಗಿ ಚಲಿಸುವುದು ಘರ್ಷಣೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುವ ಉದಾಹರಣೆ ಎಂದು ತೋರಿಸಿ.</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#DCE5EF]">
            <span className="font-bold text-[#14264F] block mb-1">🔔 ದೇವಸ್ಥಾನದ ಗಂಟೆ ಮತ್ತು ಶಬ್ದ:</span>
            <span>ಗಂಟೆ ಬಾರಿಸಿದ ನಂತರ ಮುಟ್ಟಿದಾಗ ಕೈಗೆ ಆಗುವ ಕಂಪನವೇ ಶಬ್ದ ಉತ್ಪತ್ತಿಗೆ ಕಾರಣ ಎಂದು ವಿವರಿಸಿ.</span>
          </div>
        </div>
      </div>

      {/* ── PRIVACY NOTICE ── */}
      <div className="flex items-center justify-between text-xs text-[#71809A] px-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>ಖಾಸಗಿತನ ರಕ್ಷಣೆ: ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಫೋನ್ ನಂಬರ್ ಅಥವಾ ವಿಳಾಸವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.</span>
        </div>
      </div>
    </div>
  );
};
