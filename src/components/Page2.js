import React, { useRef } from 'react';
import { PhaserGame } from './PhaserGame';

function Page2({ onBack }) {
  const phaserRef = useRef(null);

  const onCurrentActiveScene = (scene) => {
    console.log('Current active scene:', scene);
  };

  return (
    <div className="relative w-full h-screen bg-[#1a1a2e]">
      {/* 돌아가기 버튼 */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white/90 text-[#8b5a7a] py-2 px-4 rounded-[10px] text-sm shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95"
      >
        ← 돌아가기
      </button>

      {/* Phaser Game */}
      <PhaserGame ref={phaserRef} currentActiveScene={onCurrentActiveScene} />

      {/* 설명 */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 py-3 px-6 rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.15)] text-center"> */}
        {/* <p className="text-sm text-[#8b5a7a]"> */}
          {/* 클릭: 걷기/멈추기 | 더블클릭: 점프 */}
        {/* </p> */}
      {/* </div> */}
    </div>
  );
}

export default Page2;
