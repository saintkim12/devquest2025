'use client';

import { useGameStore } from '@/store/gameStore';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  RotateCcw, 
  CheckCircle,
  Settings
} from 'lucide-react';

export default function ControlPanel() {
  const { 
    moveToPrevious, 
    moveToNext, 
    moveToRandom, 
    markCellAsCompleted,
    currentPosition,
    resetGame,
    settings
  } = useGameStore();

  const handleComplete = () => {
    markCellAsCompleted(currentPosition.row, currentPosition.col);
  };

  const handleNext = () => {
    if (settings.progressMode === 'random') {
      moveToRandom();
    } else {
      moveToNext();
    }
  };

  const handlePrevious = () => {
    moveToPrevious();
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        제어판
      </h2>
      
      <div className="space-y-4">
        {/* 진행 모드 표시 */}
        <div className="text-center">
          <span className="text-blue-200 text-sm">
            진행 모드: {settings.progressMode === 'sequential' ? '순차' : '랜덤'}
          </span>
        </div>

        {/* 네비게이션 버튼들 */}
        <div className="flex justify-center gap-2">
          <button
            onClick={handlePrevious}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
            title="이전 코드"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
            title="다음 코드"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 랜덤 이동 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={moveToRandom}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            title="랜덤 위치로 이동"
          >
            <Shuffle className="w-4 h-4" />
            랜덤 이동
          </button>
        </div>

        {/* 완료 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleComplete}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            title="현재 코드 완료 표시"
          >
            <CheckCircle className="w-4 h-4" />
            완료 표시
          </button>
        </div>

        {/* 리셋 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            title="게임 리셋"
          >
            <RotateCcw className="w-4 h-4" />
            새 게임
          </button>
        </div>

        {/* 설정 버튼 (향후 구현) */}
        <div className="flex justify-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 opacity-50 cursor-not-allowed"
            title="설정 (향후 구현)"
            disabled
          >
            <Settings className="w-4 h-4" />
            설정
          </button>
        </div>
      </div>
    </div>
  );
}
