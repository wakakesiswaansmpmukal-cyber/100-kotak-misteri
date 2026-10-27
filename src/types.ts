export type BoxType = 'QUESTION' | 'TASK' | 'SURPRISE' | 'STRATEGY';

export type BoxDifficulty = 'Mudah' | 'Sedang' | 'Sulit' | 'Khusus';

export type TaskFormat = 'Lisan' | 'Tertulis' | 'Peragaan / Simulasi';

export interface MysteryBox {
  number: number;
  type: BoxType;
  topic: string;
  difficulty: BoxDifficulty;
  points: number;
  timer: number;
  prompt: string;
  options: string[] | null;
  answer: string;
  effectCode?: string | null;
  opened: boolean;
  openedByTeamId: string | null;
  taskFormat?: TaskFormat;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  correctCount: number;
  taskCount: number;
  bonusCount: number;
  doubleNext: boolean;
  shield: boolean;
}

export interface GameSettings {
  ptsEasy: number;
  ptsMed: number;
  ptsHard: number;
  wrongPenalty: number;
  timeQuestion: number;
  timeHard: number;
  timeTask: number;
}

export interface HistoryLog {
  id: string;
  time: string;
  text: string;
}

export type UserRole = 'TEACHER' | 'STUDENT' | null;

export interface AuthState {
  teacherPin: string;
  currentRole: UserRole;
}

export interface GameState {
  teams: Team[];
  currentTurnIndex: number;
  settings: GameSettings;
  boxes: MysteryBox[];
  history: HistoryLog[];
  auth: AuthState;
}
