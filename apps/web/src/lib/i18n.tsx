'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CONFIG,
  SupportedLanguage,
  isSupportedLanguage,
} from '@signbridge/types';
import { getVoiceStatusForLanguage, VoiceStatus } from './speech/tts';

export const LANGUAGE_STORAGE_KEY = 'signbridge.language';

const EN = {
  'nav.eduTutor': 'AI Science Tutor',
  'nav.studentDashboard': 'Student Progress',
  'nav.parentDashboard': 'Parent & Teacher',
  'nav.dashboard': 'Communication',
  'nav.demo': 'Sentence Demo',
  'nav.meeting': 'Meeting',
  'nav.meetingView': 'Meeting View',
  'nav.history': 'History',
  'nav.settings': 'Settings',
  'nav.navigation': 'Main navigation',
  'header.demoScenarios': 'Demo Scenarios',
  'header.telemetry': 'Telemetry',
  'header.interfaceLanguage': 'Language',
  'status.ready': 'Ready & Synchronized',
  'status.signing': 'ISL Signing Detected',
  'status.listening': 'Speech Listening',
  'status.thinking': 'AI Reasoning',
  'status.responding': 'Response Ready',
  'status.speaking': 'TTS Synthesizing',
  'status.lowConfidence': 'Verifying Confidence',
  'status.reconnecting': 'Reconnecting Gateway',
  'settings.speechLanguage': 'Speech Recognition Language',
  'settings.speechLanguageHelp': 'Language utilized for speech-to-sign and voice queries.',
  'voice.missingShort': 'Voice unavailable',
  'voice.missing': 'No {language} voice is installed on this device, so spoken output is off. Text still appears.',
  'edu.board': 'Karnataka State Board - Class 8 Science',
  'edu.askDoubt': 'Ask a Doubt',
  'edu.voiceDoubt': 'Voice Question',
  'edu.photoDoubt': 'Photo Question',
  'edu.practice': 'Adaptive Practice',
  'edu.lessons': 'Topic Lessons',
  'edu.offline': 'Offline Mode Active',
  'edu.online': 'Online Mode Active',
  'edu.syncPending': '{count} actions queued for sync',
  'edu.mastery': 'Subject Mastery',
  'edu.streak': '{count} Day Streak',
  'edu.readExplanation': 'Read Aloud (TTS)',
  'edu.stopAudio': 'Stop Audio',
  'edu.remedialHint': 'Helpful Hint',
  'edu.submitAnswer': 'Submit Answer',
  'edu.nextQuestion': 'Next Question',
  'edu.correct': 'Correct Answer!',
  'edu.incorrect': 'Let\'s Learn:',
  'edu.conceptAnalogy': 'Everyday Karnataka Example',
  'edu.weakTopics': 'Concepts Needing Practice',
  'edu.recommendedRevision': 'Recommended Next Action',
} as const;

export type TranslationKey = keyof typeof EN;

type Dictionary = Partial<Record<TranslationKey, string>>;

const MESSAGES: Record<SupportedLanguage, Dictionary> = {
  en: EN,
  kn: {
    'nav.eduTutor': 'AI ಸೈನ್ಸ್ ಬೋಧಕ',
    'nav.studentDashboard': 'ವಿದ್ಯಾರ್ಥಿ ಪ್ರಗತಿ',
    'nav.parentDashboard': 'ಪಾಲಕರು & ಶಿಕ್ಷಕರು',
    'nav.dashboard': 'ಸಂವಹನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.demo': 'ವಾಕ್ಯ ಡೆಮೊ',
    'nav.meeting': 'ಸಭೆ (ಮೀಟಿಂಗ್)',
    'nav.meetingView': 'ಸಭೆ ವೀಕ್ಷಣೆ',
    'nav.history': 'ಇತಿಹಾಸ',
    'nav.settings': 'ಸೆಟ್ಟಿಂಗ್ಸ್',
    'nav.navigation': 'ಮುಖ್ಯ ನ್ಯಾವಿಗೇಷನ್',
    'header.demoScenarios': 'ಡೆಮೊ ಸನ್ನಿವೇಶಗಳು',
    'header.telemetry': 'ಟೆಲಿಮೆಟ್ರಿ',
    'header.interfaceLanguage': 'ಭಾಷೆ',
    'status.ready': 'ಸಿದ್ಧವಾಗಿದೆ ಮತ್ತು ಸಿಂಕ್ ಆಗಿದೆ',
    'status.signing': 'ISL ಸೈನಿಂಗ್ ಪತ್ತೆಯಾಗಿದೆ',
    'status.listening': 'ಮಾತು ಆಲಿಸಲಾಗುತ್ತಿದೆ',
    'status.thinking': 'AI ಬೋಧಕ ಯೋಚಿಸುತ್ತಿದೆ',
    'status.responding': 'ಪ್ರತಿಕ್ರಿಯೆ ಸಿದ್ಧವಾಗಿದೆ',
    'status.speaking': 'ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆ',
    'status.lowConfidence': 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ',
    'status.reconnecting': 'ಗೇಟ್‌ವೇ ಮರುಸಂಪರ್ಕಗೊಳ್ಳುತ್ತಿದೆ',
    'settings.speechLanguage': 'ಮಾತು ಗುರುತಿಸುವಿಕೆ ಭಾಷೆ',
    'settings.speechLanguageHelp': 'ಮಾತು ಮತ್ತು ಧ್ವನಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಬಳಸಲಾಗುವ ಭಾಷೆ.',
    'voice.missingShort': 'ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ',
    'voice.missing': 'ಈ ಸಾಧನದಲ್ಲಿ {language} ಧ್ವನಿ ಸ್ಥಾಪಿಸಲಾಗಿಲ್ಲ, ಆದ್ದರಿಂದ ಮಾತಿನ ಔಟ್‌ಪುಟ್ ಆಫ್ ಆಗಿದೆ. ಪಠ್ಯ ಇನ್ನೂ ಕಾಣಿಸುತ್ತದೆ.',
    'edu.board': 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪಠ್ಯಕ್ರಮ - 8ನೇ ತರಗತಿ ವಿಜ್ಞಾನ',
    'edu.askDoubt': 'ಸಂಶಯ ಪರಿಹಾರ / ಪ್ರಶ್ನೆ ಕೇಳಿ',
    'edu.voiceDoubt': 'ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆ',
    'edu.photoDoubt': 'ಚಿತ್ರ / ಫೋಟೋ ಪ್ರಶ್ನೆ',
    'edu.practice': 'ಹೊಂದಿಕೊಳ್ಳುವ ಅಭ್ಯಾಸ (Adaptive)',
    'edu.lessons': 'ಅಧ್ಯಾಯದ ಪಾಠಗಳು',
    'edu.offline': 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    'edu.online': 'ಆನ್‌ಲೈನ್ ಮೋಡ್',
    'edu.syncPending': '{count} ಕಾರ್ಯಗಳು ಸಿಂಕ್ ಬಾಕಿ ಇವೆ',
    'edu.mastery': 'ವಿಷಯ ಪ್ರಾವೀಣ್ಯತೆ',
    'edu.streak': '{count} ದಿನಗಳ ಕಲಿಕಾ ಸರಣಿ',
    'edu.readExplanation': 'ಓದಿ ಕೇಳಿಸಿ (ಧ್ವನಿ)',
    'edu.stopAudio': 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    'edu.remedialHint': 'ಸಹಾಯಕ ಸುಳಿವು',
    'edu.submitAnswer': 'ಉತ್ತರ ಸಲ್ಲಿಸಿ',
    'edu.nextQuestion': 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
    'edu.correct': 'ಸರಿಯಾದ ಉತ್ತರ! ಅಭಿನಂದನೆಗಳು!',
    'edu.incorrect': 'ಕಲಿಯೋಣ ಬನ್ನಿ:',
    'edu.conceptAnalogy': 'ಹಳ್ಳಿಯ ದಿನನಿತ್ಯದ ಉದಾಹರಣೆ',
    'edu.weakTopics': 'ಪುನರಾವರ್ತಿಸಬೇಕಾದ ಕಷ್ಟದ ವಿಷಯಗಳು',
    'edu.recommendedRevision': 'ಮುಂದಿನ ಶಿಫಾರಸು ಮಾಡಿದ ಅಭ್ಯಾಸ',
  },
  hi: {
    'nav.eduTutor': 'AI विज्ञान शिक्षक',
    'nav.studentDashboard': 'विद्यार्थी प्रगति',
    'nav.parentDashboard': 'अभिभावक व शिक्षक',
    'nav.dashboard': 'संचार डैशबोर्ड',
    'nav.demo': 'वाक्य डेमो',
    'nav.meeting': 'मीटिंग',
    'nav.meetingView': 'मीटिंग दृश्य',
    'nav.history': 'इतिहास',
    'nav.settings': 'सेटिंग्स',
    'nav.navigation': 'मुख्य नेविगेशन',
    'header.demoScenarios': 'डेमो परिदृश्य',
    'header.telemetry': 'टेलीमेट्री',
    'header.interfaceLanguage': 'भाषा',
    'status.ready': 'तैयार और सिंक्रोनाइज़ित',
    'status.signing': 'ISL साइनिंग का पता चला',
    'status.listening': 'भाषण सुना जा रहा है',
    'status.thinking': 'AI विचार कर रहा है',
    'status.responding': 'उत्तर तैयार है',
    'status.speaking': 'आवाज़ तैयार हो रही है',
    'status.lowConfidence': 'जाँच हो रही है',
    'status.reconnecting': 'पुनः कनेक्ट हो रहा है',
    'settings.speechLanguage': 'वाक् पहचान भाषा',
    'settings.speechLanguageHelp': 'बोली और आवाज़ प्रश्नों के लिए उपयोग की जाने वाली भाषा।',
    'voice.missingShort': 'आवाज़ उपलब्ध नहीं',
    'voice.missing': 'इस डिवाइस पर {language} आवाज़ स्थापित नहीं है, इसलिए बोला गया आउटपुट बंद है। टेक्स्ट दिखेगा।',
    'edu.board': 'कर्नाटक राज्य बोर्ड - कक्षा 8 विज्ञान',
    'edu.askDoubt': 'प्रश्न पूछें / संदेह समाधान',
    'edu.voiceDoubt': 'आवाज़ से प्रश्न',
    'edu.photoDoubt': 'फोटो प्रश्न',
    'edu.practice': 'अनुकूली अभ्यास (Adaptive)',
    'edu.lessons': 'अध्याय पाठ',
    'edu.offline': 'ऑफलाइन मोड सक्रिय',
    'edu.online': 'ऑनलाइन मोड',
    'edu.syncPending': '{count} कार्य सिंक होना बाकी हैं',
    'edu.mastery': 'विषय प्रवीणता',
    'edu.streak': '{count} दिन की निरंतरता',
    'edu.readExplanation': 'बोलकर सुनें (TTS)',
    'edu.stopAudio': 'आवाज़ रोकें',
    'edu.remedialHint': 'मददगार संकेत',
    'edu.submitAnswer': 'उत्तर सबमिट करें',
    'edu.nextQuestion': 'अगला प्रश्न',
    'edu.correct': 'सही उत्तर! बधाई हो!',
    'edu.incorrect': 'आइए सीखें:',
    'edu.conceptAnalogy': 'रोज़मर्रा का उदाहरण',
    'edu.weakTopics': 'अभ्यास की आवश्यकता वाले विषय',
    'edu.recommendedRevision': 'अनुशंसित अगला कदम',
  },
  te: {
    'nav.eduTutor': 'AI సైన్స్ ట్యూటర్',
    'nav.studentDashboard': 'విద్యార్థి పురోగతి',
    'nav.parentDashboard': 'తల్లిదండ్రులు & ఉపాధ్యాయులు',
    'nav.dashboard': 'కమ్యూనికేషన్ డాష్‌బోర్డ్',
    'nav.demo': 'వాక్య డెమో',
    'nav.meeting': 'సమావేశం',
    'nav.meetingView': 'సమావేశ వీక్షణ',
    'nav.history': 'చరిత్ర',
    'nav.settings': 'సెట్టింగ్‌లు',
    'nav.navigation': 'ప్రధాన నావిగేషన్',
    'header.demoScenarios': 'డెమో దృశ్యాలు',
    'header.telemetry': 'టెలిమెట్రీ',
    'header.interfaceLanguage': 'భాష',
    'status.ready': 'సిద్ధంగా ఉంది & సమకాలీకరించబడింది',
    'status.signing': 'ISL సైనింగ్ గుర్తించబడింది',
    'status.listening': 'ప్రసంగం వింటోంది',
    'status.thinking': 'AI ఆలోచిస్తోంది',
    'status.responding': 'స్పందన సిద్ధంగా ఉంది',
    'status.speaking': 'వాయిస్ తయారవుతోంది',
    'status.lowConfidence': 'ధృవీకరించబడుతోంది',
    'status.reconnecting': 'మళ్లీ కనెక్ట్ చేస్తోంది',
    'settings.speechLanguage': 'ప్రసంగ గుర్తింపు భాష',
    'settings.speechLanguageHelp': 'ప్రసంగం మరియు వాయిస్ ప్రశ్నలకు ఉపయోగించే భాష.',
    'voice.missingShort': 'వాయిస్ అందుబాటులో లేదు',
    'voice.missing': 'ఈ పరికరంలో {language} వాయిస్ ఇన్‌స్టాల్ చేయబడలేదు, కాబట్టి మాట్లాడే అవుట్‌పుట్ ఆఫ్‌లో ఉంది.',
    'edu.board': 'కర్ణాటక స్టేట్ బోర్డ్ - 8వ తరగతి సైన్స్',
    'edu.askDoubt': 'సందేహం అడగండి',
    'edu.voiceDoubt': 'వాయిస్ ప్రశ్న',
    'edu.photoDoubt': 'ఫోటో ప్రశ్న',
    'edu.practice': 'అడాప్టివ్ ప్రాక్టీస్',
    'edu.lessons': 'పాఠ్యాంశాలు',
    'edu.offline': 'ఆఫ్‌లైన్ మోడ్ సక్రియం',
    'edu.online': 'ఆన్‌లైన్ మోడ్',
    'edu.syncPending': '{count} చర్యలు సింక్ పెండింగ్‌లో ఉన్నాయి',
    'edu.mastery': 'సబ్జెక్ట్ పట్టు',
    'edu.streak': '{count} రోజుల నిరంతర అభ్యాసం',
    'edu.readExplanation': 'వినండి (TTS)',
    'edu.stopAudio': 'వాయిస్ ఆపండి',
    'edu.remedialHint': 'సహాయక సూచన',
    'edu.submitAnswer': 'సమాధానం సమర్పించండి',
    'edu.nextQuestion': 'తరువాతి ప్రశ్న',
    'edu.correct': 'సరైన సమాధానం! అభినందనలు!',
    'edu.incorrect': 'నేర్చుకుందాం రండి:',
    'edu.conceptAnalogy': 'రోజువారీ గ్రామీణ ఉదాహరణ',
    'edu.weakTopics': 'సాధన అవసరమైన భావనలు',
    'edu.recommendedRevision': 'సిఫార్సు చేయబడిన తరువాతి చర్య',
  },
};

export function translate(
  language: SupportedLanguage,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  let template = MESSAGES[language]?.[key];
  if (template === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[i18n] missing "${key}" for language "${language}", using English`);
    }
    template = EN[key];
  }
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
  );
}

export function readStoredLanguage(): SupportedLanguage | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function writeStoredLanguage(language: SupportedLanguage): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    return true;
  } catch {
    return false;
  }
}

export function applyDocumentLanguage(language: SupportedLanguage): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = LANGUAGE_CONFIG[language].code;
  document.documentElement.dir = LANGUAGE_CONFIG[language].direction;
}

type I18nContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  ttsVoiceStatus: VoiceStatus;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) setLanguageState(stored);
  }, []);

  useEffect(() => {
    applyDocumentLanguage(language);
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const load = () => setVoices(synth.getVoices());
    load();
    synth.addEventListener('voiceschanged', load);
    return () => synth.removeEventListener('voiceschanged', load);
  }, []);

  const setLanguage = useCallback((next: SupportedLanguage) => {
    if (!isSupportedLanguage(next)) return;
    setLanguageState(next);
    writeStoredLanguage(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => translate(language, key, params),
    [language],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      ttsVoiceStatus: getVoiceStatusForLanguage(language, voices),
    }),
    [language, setLanguage, t, voices],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (ctx === null) {
    throw new Error('useI18n must be used inside <I18nProvider>');
  }
  return ctx;
}
