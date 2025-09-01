// 코드 타입 정의
export type ChordType = 'maj7' | 'm7' | '7' | 'dim7' | 'aug7';

// 키 타입 정의
export type Key = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

// 코드 모델
export interface Chord {
  key: Key;
  type: ChordType;
  notes: string[];
  displayName: string;
}

// 보드 셀 타입
export interface BoardCell {
  key: Key;
  chord: Chord;
  isCompleted: boolean;
  isCurrent: boolean;
}

// 보드 타입
export type BoardSize = 3 | 9;
export type Board = BoardCell[][];

// 진행 모드
export type ProgressMode = 'sequential' | 'random';

// 초보자 모드 설정
export interface BeginnerMode {
  showChordNotes: boolean;
  showKeyboardGuide: boolean;
}

// 메트로놈 설정
export interface MetronomeSettings {
  enabled: boolean;
  tempo: number;
  visualEnabled: boolean;
  audioEnabled: boolean;
}

// 게임 설정
export interface GameSettings {
  boardSize: BoardSize;
  beginnerMode: BeginnerMode;
  metronome: MetronomeSettings;
  progressMode: ProgressMode;
}

// 연습 히스토리
export interface PracticeHistory {
  key: Key;
  success: boolean;
  timestamp: number;
  duration: number;
}

// 게임 상태
export interface GameState {
  board: Board;
  currentPosition: { row: number; col: number };
  progress: number;
  history: PracticeHistory[];
  settings: GameSettings;
}
