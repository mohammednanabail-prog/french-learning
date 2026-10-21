export interface SentenceWord {
  french: string;
  arabic: string;
  pos: string; // e.g. "اسم (Nom)", "فعل (Verbe)", "ضمير (Pronom)"
  gender?: string; // 'مذكر' | 'مؤنث' | '-'
  number?: string; // 'مفرد' | 'جمع' | '-'
}

export type CategoryKey = 'الحياة اليومية' | 'التسوق' | 'السفر' | 'العمل' | 'التعارف';
export type RegisterType = 'رسمي' | 'مهذب' | 'ودي' | 'عامي';

export interface SentenceItem {
  id: string;
  french: string;
  arabic: string;
  category: CategoryKey;
  register: RegisterType;
  tone?: string;
  cultural_note: string;
  words: SentenceWord[];
  isCustom?: boolean;
  isAiGenerated?: boolean;
  createdAt?: string;
}

export interface AppSettings {
  geminiApiKey: string;
  speechRate: number; // default 0.9
  slowSpeedRate: number; // default 0.6
  selectedVoiceURI: string;
  autoPlayAudio: boolean;
}
