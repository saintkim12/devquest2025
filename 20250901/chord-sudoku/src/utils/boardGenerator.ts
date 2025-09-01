import { Board, BoardCell, BoardSize, Key } from '@/types';
import { createChord, keysFor3x3, keysFor9x9, basicChordTypes } from '@/data/chords';

// 스도쿠 규칙 검증 함수
const isValidPlacement = (
  board: (Key | null)[][],
  row: number,
  col: number,
  key: Key,
  size: BoardSize
): boolean => {
  // 행 검사
  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === key) {
      return false;
    }
  }

  // 열 검사
  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === key) {
      return false;
    }
  }

  // 3x3 블록 검사 (3x3 보드의 경우 전체가 하나의 블록)
  if (size === 3) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === key) {
          return false;
        }
      }
    }
  } else {
    // 9x9 보드의 경우 3x3 블록 검사
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;
    
    for (let r = blockRow; r < blockRow + 3; r++) {
      for (let c = blockCol; c < blockCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === key) {
          return false;
        }
      }
    }
  }

  return true;
};

// 백트래킹을 사용한 스도쿠 보드 생성
const generateSudokuBoard = (size: BoardSize): Key[][] => {
  const board: (Key | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  const availableKeys = size === 3 ? keysFor3x3 : keysFor9x9;

  const solve = (row: number, col: number): boolean => {
    if (col === size) {
      row++;
      col = 0;
    }
    
    if (row === size) {
      return true;
    }

    if (board[row][col] !== null) {
      return solve(row, col + 1);
    }

    // 키들을 랜덤하게 섞기
    const shuffledKeys = [...availableKeys].sort(() => Math.random() - 0.5);

    for (const key of shuffledKeys) {
      if (isValidPlacement(board, row, col, key, size)) {
        board[row][col] = key;
        if (solve(row, col + 1)) {
          return true;
        }
        board[row][col] = null;
      }
    }

    return false;
  };

  if (!solve(0, 0)) {
    throw new Error('스도쿠 보드를 생성할 수 없습니다.');
  }

  return board as Key[][];
};

// BoardCell 배열로 변환
const convertToBoardCells = (keyBoard: Key[][]): BoardCell[][] => {
  return keyBoard.map((row, rowIndex) =>
    row.map((key, colIndex) => ({
      key,
      chord: createChord(key, basicChordTypes[Math.floor(Math.random() * basicChordTypes.length)]),
      isCompleted: false,
      isCurrent: rowIndex === 0 && colIndex === 0, // 첫 번째 셀을 현재 위치로 설정
    }))
  );
};

// 보드 생성 메인 함수
export const generateBoard = (size: BoardSize): Board => {
  const keyBoard = generateSudokuBoard(size);
  return convertToBoardCells(keyBoard);
};

// 보드 유효성 검사
export const validateBoard = (board: Board): boolean => {
  const size = board.length;
  
  for (let row = 0; row < size; row++) {
    const rowKeys = new Set<Key>();
    const colKeys = new Set<Key>();
    
    for (let col = 0; col < size; col++) {
      // 행 검사
      if (rowKeys.has(board[row][col].key)) {
        return false;
      }
      rowKeys.add(board[row][col].key);
      
      // 열 검사
      if (colKeys.has(board[col][row].key)) {
        return false;
      }
      colKeys.add(board[col][row].key);
    }
  }

  // 3x3 블록 검사 (9x9 보드의 경우)
  if (size === 9) {
    for (let blockRow = 0; blockRow < 9; blockRow += 3) {
      for (let blockCol = 0; blockCol < 9; blockCol += 3) {
        const blockKeys = new Set<Key>();
        for (let r = blockRow; r < blockRow + 3; r++) {
          for (let c = blockCol; c < blockCol + 3; c++) {
            if (blockKeys.has(board[r][c].key)) {
              return false;
            }
            blockKeys.add(board[r][c].key);
          }
        }
      }
    }
  }

  return true;
};
