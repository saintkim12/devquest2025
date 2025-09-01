import { create } from 'zustand';
import { GameState, GameSettings, BoardSize, ProgressMode, PracticeHistory } from '@/types';
import { generateBoard } from '@/utils/boardGenerator';

interface GameStore extends GameState {
  // 액션들
  initializeGame: (boardSize: BoardSize) => void;
  setCurrentPosition: (row: number, col: number) => void;
  markCellAsCompleted: (row: number, col: number) => void;
  moveToNext: () => void;
  moveToPrevious: () => void;
  moveToRandom: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  addToHistory: (history: PracticeHistory) => void;
  resetGame: () => void;
}

const defaultSettings: GameSettings = {
  boardSize: 3,
  beginnerMode: {
    showChordNotes: true,
    showKeyboardGuide: false,
  },
  metronome: {
    enabled: false,
    tempo: 120,
    visualEnabled: true,
    audioEnabled: false,
  },
  progressMode: 'sequential',
};

export const useGameStore = create<GameStore>((set, get) => ({
  // 초기 상태
  board: [],
  currentPosition: { row: 0, col: 0 },
  progress: 0,
  history: [],
  settings: defaultSettings,

  // 게임 초기화
  initializeGame: (boardSize: BoardSize) => {
    const board = generateBoard(boardSize);
    set({
      board,
      currentPosition: { row: 0, col: 0 },
      progress: 0,
      history: [],
      settings: { ...get().settings, boardSize },
    });
  },

  // 현재 위치 설정
  setCurrentPosition: (row: number, col: number) => {
    const { board } = get();
    if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
      // 이전 현재 위치 초기화
      const updatedBoard = board.map((boardRow, r) =>
        boardRow.map((cell, c) => ({
          ...cell,
          isCurrent: r === row && c === col,
        }))
      );

      set({
        board: updatedBoard,
        currentPosition: { row, col },
      });
    }
  },

  // 셀 완료 표시
  markCellAsCompleted: (row: number, col: number) => {
    const { board } = get();
    const updatedBoard = board.map((boardRow, r) =>
      boardRow.map((cell, c) => ({
        ...cell,
        isCompleted: r === row && c === col ? true : cell.isCompleted,
      }))
    );

    // 진행률 계산
    const totalCells = board.length * board[0].length;
    const completedCells = updatedBoard.flat().filter(cell => cell.isCompleted).length;
    const progress = Math.round((completedCells / totalCells) * 100);

    set({
      board: updatedBoard,
      progress,
    });
  },

  // 다음 위치로 이동
  moveToNext: () => {
    const { board, currentPosition, settings } = get();
    const { row, col } = currentPosition;
    const size = board.length;

    let nextRow = row;
    let nextCol = col + 1;

    if (nextCol >= size) {
      nextCol = 0;
      nextRow++;
    }

    if (nextRow < size) {
      get().setCurrentPosition(nextRow, nextCol);
    }
  },

  // 이전 위치로 이동
  moveToPrevious: () => {
    const { currentPosition } = get();
    const { row, col } = currentPosition;

    let prevRow = row;
    let prevCol = col - 1;

    if (prevCol < 0) {
      prevCol = 8; // 9x9 보드의 경우
      prevRow--;
    }

    if (prevRow >= 0) {
      get().setCurrentPosition(prevRow, prevCol);
    }
  },

  // 랜덤 위치로 이동
  moveToRandom: () => {
    const { board } = get();
    const size = board.length;
    const totalCells = size * size;
    
    // 완료되지 않은 셀들 찾기
    const incompleteCells = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!board[r][c].isCompleted) {
          incompleteCells.push({ row: r, col: c });
        }
      }
    }

    if (incompleteCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * incompleteCells.length);
      const { row, col } = incompleteCells[randomIndex];
      get().setCurrentPosition(row, col);
    }
  },

  // 설정 업데이트
  updateSettings: (newSettings: Partial<GameSettings>) => {
    set(state => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  // 히스토리 추가
  addToHistory: (history: PracticeHistory) => {
    set(state => ({
      history: [...state.history, history],
    }));
  },

  // 게임 리셋
  resetGame: () => {
    const { settings } = get();
    get().initializeGame(settings.boardSize);
  },
}));
