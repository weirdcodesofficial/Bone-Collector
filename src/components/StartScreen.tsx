import { useState } from 'react';
import { Play, Trophy, Sparkles, X } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { SoundToggle } from './SoundToggle';
import { ExitModal } from './ExitModal';
import { DogAvatar, DEFAULT_DOG_AVATAR } from '../data/dogAvatars';
import { FullBodyDogImage } from './FullBodyDogImage';

interface StartScreenProps {
  highScore: number;
  achievements?: number;
  dogAvatar?: DogAvatar;
  onStartGame: () => void;
}

export function StartScreen({
  highScore,
  achievements = 0,
  dogAvatar = DEFAULT_DOG_AVATAR,
  onStartGame,
}: StartScreenProps) {
  const [showExitModal, setShowExitModal] = useState(false);

  const handleStart = () => {
    audioManager.playBarkSound();
    onStartGame();
  };

  return (
    <div
      id="start-screen-container"
      className="relative w-full h-full flex flex-col justify-between items-center p-6 sm:p-8 bg-[#2E7D32] overflow-hidden select-none"
    >
      {/* Geometric Dot Grid Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none geometric-dot-bg"
      />

      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between w-full pt-2">
        {/* High Score & Achievements Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            id="start-screen-high-score-badge"
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/30 text-white shadow-sm"
          >
            <div className="text-left">
              <div className="text-[8px] sm:text-[9px] uppercase font-black tracking-widest text-green-200">Best Score</div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                <span>🦴</span>
                <span>{highScore}</span>
              </div>
            </div>
          </div>

          {achievements > 0 && (
            <div
              id="start-screen-achievements-badge"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-400/20 backdrop-blur-md rounded-full border border-amber-300/40 text-yellow-200 shadow-sm"
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <div className="text-left">
                <div className="text-[8px] sm:text-[9px] uppercase font-black tracking-widest text-amber-200">Achievements</div>
                <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                  <span>🏆</span>
                  <span>{achievements}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls: Sound & Exit/Quit Button */}
        <div className="flex items-center gap-2.5">
          <SoundToggle id="start-screen-sound-toggle" />

          {/* Requirement 11: Exit button at top right at screen at start screen */}
          <button
            id="start-screen-exit-btn"
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              setShowExitModal(true);
            }}
            className="flex items-center gap-2 sm:gap-3 bg-white/15 hover:bg-white/25 active:scale-95 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-white/30 text-white transition-all cursor-pointer"
            title="Exit Game"
            aria-label="Exit Game"
          >
            <span className="font-black uppercase tracking-widest text-xs sm:text-sm">Quit</span>
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      </header>

      {/* Center Geometric Hero Card */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto w-full px-2 py-2 sm:py-4">
        <div
          id="start-hero-card"
          className="bg-white p-6 sm:p-8 md:p-10 rounded-[3rem] sm:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center border-[8px] sm:border-[10px] md:border-[12px] border-[#8BC34A] flex flex-col items-center gap-4 sm:gap-5 max-w-sm sm:max-w-md w-full animate-scale-up"
        >
          {/* Full Body Dog Mascot Avatar Showcase */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-36 h-28 sm:w-44 sm:h-32 bg-green-100 rounded-3xl flex items-center justify-center p-2 shadow-inner border-4 border-green-200 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => audioManager.playBarkSound()}
              title={`Tap ${dogAvatar.name} to bark!`}
            >
              <FullBodyDogImage avatarId={dogAvatar.id} size={140} animated />
            </div>

            {/* Saved Dog Avatar Badge with Dog Name */}
            <div className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black border shadow-xs ${dogAvatar.badgeBg}`}>
              <span>{dogAvatar.name} the {dogAvatar.breed}</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-900 tracking-tighter leading-none">
              DOG BONE<br />JUMP
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-green-700 font-medium opacity-90">
              Jump to catch the bones!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 w-full">
            {/* Requirement 9: Start Game Button */}
            <button
              id="start-game-btn"
              type="button"
              onClick={handleStart}
              className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white py-4 sm:py-5 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl md:text-3xl font-black shadow-[0_8px_0_rgb(104,159,56)] active:shadow-none active:translate-y-1.5 transition-all tracking-tight cursor-pointer flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              START GAME
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold text-green-800/60 uppercase tracking-widest pt-0.5">
              <span>👆</span>
              <span>Click anywhere on screen to jump</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Jump area tag */}
      <footer className="relative z-20 w-full flex justify-center pb-2">
        <div className="bg-black/20 px-5 py-2 rounded-full text-xs font-black text-green-100 uppercase tracking-wider">
          🦴 Geometric Balance Edition
        </div>
      </footer>

      {/* Exit Modal for Start Screen */}
      <ExitModal
        score={0}
        highScore={highScore}
        achievements={achievements}
        dogEmoji={dogAvatar.emoji}
        dogAvatarId={dogAvatar.id}
        isFromStartScreen={true}
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onRestartGame={() => setShowExitModal(false)}
        onConfirmExitToMenu={() => setShowExitModal(false)}
      />
    </div>
  );
}
