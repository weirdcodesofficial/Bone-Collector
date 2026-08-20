import { useState } from 'react';
import { Play, Trophy, X, Compass, User, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { SoundToggle } from './SoundToggle';
import { ExitModal } from './ExitModal';
import { HighScoreMapModal } from './HighScoreMapModal';
import { DogAiStudioModal } from './DogAiStudioModal';
import { DogAvatar, DEFAULT_DOG_AVATAR } from '../data/dogAvatars';
import { FullBodyDogImage } from './FullBodyDogImage';
import { getUserCustomProfile } from '../data/mapPlayers';

interface StartScreenProps {
  highScore: number;
  achievements?: number;
  dogAvatar?: DogAvatar;
  onStartGame: () => void;
  onSelectDogAvatar?: (avatar: DogAvatar) => void;
}

export function StartScreen({
  highScore,
  achievements = 0,
  dogAvatar = DEFAULT_DOG_AVATAR,
  onStartGame,
  onSelectDogAvatar,
}: StartScreenProps) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showAiStudioModal, setShowAiStudioModal] = useState(false);
  const [mapInitialTab, setMapInitialTab] = useState<'map' | 'leaderboard' | 'profile'>('map');
  const userProfile = getUserCustomProfile();

  const handleStart = () => {
    audioManager.playBarkSound();
    onStartGame();
  };

  const openMapWithTab = (tab: 'map' | 'leaderboard' | 'profile') => {
    audioManager.playClickSound();
    setMapInitialTab(tab);
    setShowMapModal(true);
  };

  return (
    <div
      id="start-screen-container"
      className="relative w-full h-full flex flex-col justify-between items-center p-3 sm:p-6 md:p-8 bg-[#2E7D32] overflow-y-auto overflow-x-hidden select-none"
    >
      {/* Geometric Dot Grid Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none geometric-dot-bg"
      />

      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between w-full pt-1 sm:pt-2">
        {/* High Score & Achievements Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div
            id="start-screen-high-score-badge"
            className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/30 text-white shadow-sm"
          >
            <div className="text-left">
              <div className="text-[7px] sm:text-[9px] uppercase font-black tracking-widest text-green-200">Best Score</div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                <span>🦴</span>
                <span>{highScore}</span>
              </div>
            </div>
          </div>

          {/* Player Profile Badge */}
          <button
            id="start-header-profile-btn"
            type="button"
            onClick={() => openMapWithTab('profile')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md rounded-full border border-white/30 text-white shadow-sm transition-all cursor-pointer"
            title="Player Profile Settings"
          >
            {userProfile.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-white/60 shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            )}
            <span className="text-[10px] sm:text-xs font-black truncate max-w-[80px] sm:max-w-[120px]">
              {userProfile.name}
            </span>
          </button>

          {/* Quick Map Button in Header */}
          <button
            id="start-header-map-btn"
            type="button"
            onClick={() => openMapWithTab('map')}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md rounded-full border border-white/30 text-white shadow-sm transition-all cursor-pointer"
            title="Open High Score Map"
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Map</span>
          </button>

          {achievements > 0 && (
            <div
              id="start-screen-achievements-badge"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-amber-400/20 backdrop-blur-md rounded-full border border-amber-300/40 text-yellow-200 shadow-sm"
            >
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 fill-yellow-300" />
              <div className="text-left">
                <div className="text-[7px] sm:text-[9px] uppercase font-black tracking-widest text-amber-200">Trophies</div>
                <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                  <span>🏆</span>
                  <span>{achievements}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls: Sound & Exit/Quit Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <SoundToggle id="start-screen-sound-toggle" />

          {/* Exit button at top right */}
          <button
            id="start-screen-exit-btn"
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              setShowExitModal(true);
            }}
            className="flex items-center gap-1.5 sm:gap-2.5 bg-white/15 hover:bg-white/25 active:scale-95 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-white/30 text-white transition-all cursor-pointer"
            title="Exit Game"
            aria-label="Exit Game"
          >
            <span className="font-black uppercase tracking-widest text-[11px] sm:text-xs">Quit</span>
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </header>

      {/* Center Geometric Hero Card */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto w-full px-2 py-3 sm:py-6">
        <div
          id="start-hero-card"
          className="bg-white p-5 sm:p-7 md:p-9 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center border-[6px] sm:border-[10px] md:border-[12px] border-[#8BC34A] flex flex-col items-center gap-3 sm:gap-4 max-w-xs sm:max-w-md w-full animate-scale-up"
        >
          {/* Full Body Dog Mascot Avatar Showcase */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <div
              className="w-28 h-24 sm:w-40 sm:h-28 bg-green-100 rounded-2xl sm:rounded-3xl flex items-center justify-center p-2 shadow-inner border-3 sm:border-4 border-green-200 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => audioManager.playBarkSound()}
              title={`Tap ${dogAvatar.name} to bark!`}
            >
              <FullBodyDogImage
                avatarId={dogAvatar.id}
                customImageUrl={dogAvatar.customImageUrl}
                customSvg={dogAvatar.customSvg}
                size={120}
                animated
              />
            </div>

            {/* Saved Dog Avatar Badge with Dog Name */}
            <div className={`flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black border shadow-xs ${dogAvatar.badgeBg}`}>
              <span>{dogAvatar.name} the {dogAvatar.breed}</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-green-900 tracking-tighter leading-none">
              BONE<br />COLLECTOR
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-green-700 font-medium opacity-90">
              Jump to catch the flying bones!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full">
            {/* Start Game Button */}
            <button
              id="start-game-btn"
              type="button"
              onClick={handleStart}
              className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white py-3.5 sm:py-4.5 rounded-2xl sm:rounded-3xl text-lg sm:text-2xl md:text-3xl font-black shadow-[0_6px_0_rgb(104,159,56)] sm:shadow-[0_8px_0_rgb(104,159,56)] active:shadow-none active:translate-y-1.5 transition-all tracking-tight cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              START GAME
            </button>

            {/* Dog AI Image Studio Button */}
            <button
              id="start-open-ai-studio-btn"
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                setShowAiStudioModal(true);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2.5 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black shadow-[0_4px_0_rgb(88,28,135)] active:shadow-none active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-spin" />
              <span>🎨 Dog AI Image Studio</span>
            </button>

            {/* High Score Map Button */}
            <button
              id="start-open-map-btn"
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                setShowMapModal(true);
              }}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white py-2.5 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black shadow-[0_4px_0_rgb(6,95,70)] active:shadow-none active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span>🗺️ High Score Map & Standings</span>
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold text-green-800/60 uppercase tracking-widest pt-0.5">
              <span>👆</span>
              <span>Tap anywhere on screen to leap</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Jump area tag */}
      <footer className="relative z-20 w-full flex justify-center pb-1 sm:pb-2">
        <div className="bg-black/20 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black text-green-100 uppercase tracking-wider">
          🦴 Geometric Balance Edition
        </div>
      </footer>

      {/* Dog AI Image Studio Modal */}
      <DogAiStudioModal
        isOpen={showAiStudioModal}
        onClose={() => setShowAiStudioModal(false)}
        currentDogAvatar={dogAvatar}
        achievements={achievements}
        onSelectDogAvatar={onSelectDogAvatar}
      />

      {/* High Score Adventure Map Modal */}
      <HighScoreMapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        userHighScore={highScore}
        userAchievements={achievements}
        currentDogAvatar={dogAvatar}
        initialTab={mapInitialTab}
      />

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

