'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import ChordBoard from '@/components/ChordBoard';
import ChordDisplay from '@/components/ChordDisplay';
import ControlPanel from '@/components/ControlPanel';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  const { board, initializeGame, settings } = useGameStore();

  useEffect(() => {
    // 컴포넌트 마운트 시 게임 초기화
    if (board.length === 0) {
      initializeGame(settings.boardSize);
    }
  }, [board.length, initializeGame, settings.boardSize]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎹 코드 스도쿠
          </h1>
          <p className="text-blue-200">
            피아노 코드 학습을 위한 스도쿠 게임
          </p>
        </header>

        {/* 메인 게임 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 코드 표시 및 컨트롤 */}
          <div className="lg:col-span-1 space-y-6">
            <ChordDisplay />
            <ControlPanel />
          </div>

          {/* 오른쪽: 보드 */}
          <div className="lg:col-span-2">
            <ChordBoard />
          </div>
        </div>

        {/* 진행률 표시 */}
        <div className="mt-8">
          <ProgressBar />
        </div>
      </div>
    </main>
  );
}
