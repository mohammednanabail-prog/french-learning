/**
 * French Audio Speech Synthesis utility using Web Speech API
 */

class FrenchAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private frenchVoice: SpeechSynthesisVoice | null = null;
  private isLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Look for French voices
    // Preference: fr-FR, then any fr
    const frFR = voices.find((v) => v.lang.toLowerCase() === 'fr-fr');
    const anyFr = voices.find((v) => v.lang.toLowerCase().startsWith('fr'));
    this.frenchVoice = frFR || anyFr || null;
    this.isLoaded = true;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr'));
  }

  public setVoiceByURI(uri: string) {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const found = voices.find((v) => v.voiceURI === uri);
    if (found) {
      this.frenchVoice = found;
    }
  }

  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported on this browser.');
      options.onError?.('المتصفح لا يدعم تحويل النص إلى كلام.');
      return;
    }

    // Cancel current speaking before starting a new one
    this.synth.cancel();

    // Clean text of extra punctuation for smoother speech
    const cleanText = text.replace(/[*_#]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = options.rate !== undefined ? options.rate : 0.95;
    utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;

    if (this.frenchVoice) {
      utterance.voice = this.frenchVoice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      options.onError?.(e);
      options.onEnd?.();
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Error invoking speak:', err);
      options.onError?.(err);
      options.onEnd?.();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const audioEngine = new FrenchAudioEngine();
