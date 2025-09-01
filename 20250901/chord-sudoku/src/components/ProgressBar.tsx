'use client';

import { useGameStore } from '@/store/gameStore';

export default function ProgressBar() {
  const { progress, board } = useGameStore();

  if (board.length === 0) {
    return null;
  }

  const totalCells = board.length * board[0].length;
  const completedCells = board.flat().filter(cell => cell.isCompleted).length;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">진행률</h3>
        <span className="text-white font-bold">{progress}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-sm text-blue-200">
        <span>완료: {completedCells}개</span>
        <span>전체: {totalCells}개</span>
      </div>
      
      {progress === 100 && (
        <div className="mt-4 text-center">
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
            <p className="text-green-400 font-semibold">
              🎉 축하합니다! 모든 코드를 완료했습니다!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
