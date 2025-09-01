'use client';

import { useGameStore } from '@/store/gameStore';
import BoardCell from './BoardCell';

export default function ChordBoard() {
  const { board, setCurrentPosition } = useGameStore();

  if (board.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">보드를 생성 중...</div>
      </div>
    );
  }

  const handleCellClick = (row: number, col: number) => {
    setCurrentPosition(row, col);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        코드 보드
      </h2>
      
      <div className="flex justify-center">
        <div 
          className={`grid gap-2 ${
            board.length === 3 
              ? 'grid-cols-3' 
              : 'grid-cols-9'
          }`}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <BoardCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center text-blue-200 text-sm">
        <p>스도쿠 규칙: 각 행, 열, 3x3 블록에 중복된 키가 없어야 합니다.</p>
      </div>
    </div>
  );
}
