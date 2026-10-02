export type Language = 'typescript' | 'javascript' | 'python' | 'rust' | 'go' | 'css';

export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export interface CodeSnippet {
  id: string;
  title: string;
  language: Language;
  difficulty: Difficulty;
  description: string;
  code: string;
  tags: string[];
}

export interface KeystrokeEvent {
  char: string;
  timestamp: number;
  expectedChar: string;
  isCorrect: boolean;
  currentWpm: number;
}

export interface MatchStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  timeElapsed: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  streak: number;
  maxStreak: number;
  isCompleted: boolean;
  history: { time: number; wpm: number; accuracy: number }[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  wpm: number;
  accuracy: number;
  language: Language;
  matchesPlayed: number;
  tier: string;
  country: string;
}

export interface TestWidthOption {
  width: number;
  label: string;
  device: string;
  category: 'mobile' | 'tablet' | 'desktop';
}
