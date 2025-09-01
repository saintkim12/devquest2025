'use client';

import { useGameStore } from '@/store/gameStore';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ChordDisplay() {
  const { board, currentPosition, settings } = useGameStore();
  
  if (board.length === 0) {
    return null;
  }

  const currentCell = board[currentPosition.row]?.[currentPosition.col];
  
  if (!currentCell) {
    return null;
  }

  const { chord, isCompleted } = currentCell;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        현재 코드
      </h2>
      
      <div className="text-center space-y-4">
        {/* 코드 이름 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4">
          <div className="text-4xl font-bold text-white mb-2">
            {chord.displayName}
          </div>
          <div className="text-white/80 text-sm">
            {chord.key} {chord.type}
          </div>
        </div>

        {/* 초보자 모드: 구성음 표시 */}
        {settings.beginnerMode.showChordNotes && (
          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">구성음</h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {chord.notes.map((note, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 완료 상태 */}
        <div className="flex items-center justify-center gap-2">
          {isCompleted ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">완료됨</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">연습 필요</span>
            </>
          )}
        </div>

        {/* 위치 정보 */}
        <div className="text-white/60 text-sm">
          위치: {currentPosition.row + 1}행 {currentPosition.col + 1}열
        </div>
      </div>
    </div>
  );
}
