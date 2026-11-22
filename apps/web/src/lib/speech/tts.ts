import { DEFAULT_LANGUAGE, LANGUAGE_CONFIG, SupportedLanguage } from '@signbridge/types';

export type VoiceStatus = 'available' | 'missing' | 'unknown';

const normalizeTag = (tag: string) => tag.trim().toLowerCase().replace(/_/g, '-');

/**
 * Find an installed voice for a language. Prefers an exact match on the configured
 * ttsLocale; otherwise accepts any voice sharing the same primary subtag (e.g. "kn").
 */
export function findVoiceForLanguage<V extends { lang: string }>(
  language: SupportedLanguage,
  voices: V[],
): V | undefined {
  const target = normalizeTag(LANGUAGE_CONFIG[language].ttsLocale);
  const exact = voices.find((v) => normalizeTag(v.lang) === target);
  if (exact) return exact;
  const primary = target.split('-')[0];
  return voices.find((v) => normalizeTag(v.lang).split('-')[0] === primary);
}

export function getVoiceStatusForLanguage<V extends { lang: string }>(
  language: SupportedLanguage,
  voices: V[],
): VoiceStatus {
  if (voices.length === 0) return 'unknown';
  return findVoiceForLanguage(language, voices) ? 'available' : 'missing';
}

export class TTSPlayer {
  private synth: SpeechSynthesis | null = null;
  private isSpeakingState: boolean = false;
  private lastSpokenEndTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, language: SupportedLanguage = DEFAULT_LANGUAGE, onEnd?: () => void): boolean {
    if (!this.synth) return false;

    const voices = this.synth.getVoices();
    if (language !== DEFAULT_LANGUAGE && getVoiceStatusForLanguage(language, voices) === 'missing') {
      console.warn(`[TTS] No voice installed for ${LANGUAGE_CONFIG[language].ttsLocale}; spoken output skipped.`);
      return false;
    }

    // Interrupt any ongoing utterance to keep perceived latency low
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_CONFIG[language].ttsLocale;
    const voice = findVoiceForLanguage(language, voices);
    if (voice) utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeakingState = true;
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.lastSpokenEndTime = Date.now();
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeakingState = false;
      this.lastSpokenEndTime = Date.now();
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
    return true;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.lastSpokenEndTime = Date.now();
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  /**
   * Returns true if TTS is currently active OR ended within the last windowMs (default: 600ms),
   * preventing audio feedback echo into the speech recognizer.
   */
  public isRecentlySpeaking(windowMs = 600): boolean {
    return this.isSpeakingState || (Date.now() - this.lastSpokenEndTime < windowMs);
  }
}

export const ttsPlayer = new TTSPlayer();
