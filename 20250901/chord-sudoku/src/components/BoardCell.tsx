'use client';

import { BoardCell as BoardCellType } from '@/types';

interface BoardCellProps {
  cell: BoardCellType;
  row: number;
  col: number;
  onClick: () => void;
}

export default function BoardCell({ cell, onClick }: BoardCellProps) {
  const getCellStyles = () => {
    let baseStyles = 'w-16 h-16 rounded-lg border-2 transition-all duration-200 cursor-pointer flex items-center justify-center text-center font-bold text-sm';
    
    if (cell.isCurrent) {
      return `${baseStyles} bg-yellow-400 border-yellow-300 text-gray-900 shadow-lg transform scale-105`;
    }
    
    if (cell.isCompleted) {
      return `${baseStyles} bg-green-500 border-green-400 text-white`;
    }
    
    return `${baseStyles} bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50`;
  };

  return (
    <div 
      className={getCellStyles()}
      onClick={onClick}
      title={`${cell.chord.displayName} - ${cell.chord.notes.join(', ')}`}
    >
      <div className="flex flex-col items-center">
        <div className="font-bold text-lg">
          {cell.key}
        </div>
        <div className="text-xs opacity-80">
          {cell.chord.type}
        </div>
      </div>
    </div>
  );
}
