import { useState, useEffect } from 'react';
import { GameState } from './types';
import { StartScreen } from './components/StartScreen';
import { DogGameCanvas } from './components/DogGameCanvas';
import { audioManager } from './utils/audio';
import { DogAvatar, getDogAvatarById, DEFAULT_DOG_AVATAR } from './data/dogAvatars';

const HIGH_SCORE_KEY = 'dog_bone_game_high_score';
const ACHIEVEMENTS_KEY = 'dog_bone_game_achievements';
const DOG_AVATAR_KEY = 'dog_bone_game_avatar_id';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [achievements, setAchievements] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // Persisted last updated dog avatar
  const [dogAvatar, setDogAvatar] = useState<DogAvatar>(() => {
    try {
      const savedId = localStorage.getItem(DOG_AVATAR_KEY);
      return getDogAvatarById(savedId);
    } catch {
      return DEFAULT_DOG_AVATAR;
    }
  });

  // Handle BGM loop when entering/leaving PLAYING state
  useEffect(() => {
    if (gameState === 'PLAYING') {
      audioManager.startBGM();
    } else {
      audioManager.stopBGM();
    }

    return () => {
      audioManager.stopBGM();
    };
  }, [gameState]);

  const handleUpdateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        localStorage.setItem(HIGH_SCORE_KEY, newScore.toString());
      } catch {}
    }
  };

  const handleUpdateAchievements = (newAchievements: number) => {
    setAchievements(newAchievements);
    try {
      localStorage.setItem(ACHIEVEMENTS_KEY, newAchievements.toString());
    } catch {}
  };

  const handleUpdateDogAvatar = (newAvatar: DogAvatar) => {
    setDogAvatar(newAvatar);
    try {
      localStorage.setItem(DOG_AVATAR_KEY, newAvatar.id);
    } catch {}
  };

  const handleStartGame = () => {
    setGameState('PLAYING');
  };

  const handleExitToMenu = () => {
    setGameState('START');
  };

  return (
    <div
      id="app-root-container"
      className="h-[100dvh] w-full bg-[#173819] flex items-center justify-center p-0 md:p-4 lg:p-6 overflow-hidden select-none"
    >
      {/* Responsive Viewport Frame: Fluid full-screen on mobile/tablets, elegant 16:9 shell on desktop */}
      <main
        id="game-viewport-frame"
        className="relative w-full h-[100dvh] md:h-auto md:max-w-6xl lg:max-w-7xl 2xl:max-w-[1920px] md:aspect-[16/9] md:max-h-[94vh] bg-[#A8D18D] rounded-none md:rounded-[36px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] md:ring-8 md:ring-green-950/60 md:border-4 md:border-[#8BC34A]/50 flex flex-col mx-auto"
      >
        {gameState === 'START' && (
          <StartScreen
            highScore={highScore}
            achievements={achievements}
            dogAvatar={dogAvatar}
            onStartGame={handleStartGame}
          />
        )}

        {gameState === 'PLAYING' && (
          <DogGameCanvas
            highScore={highScore}
            achievements={achievements}
            dogAvatar={dogAvatar}
            onUpdateHighScore={handleUpdateHighScore}
            onUpdateAchievements={handleUpdateAchievements}
            onUpdateDogAvatar={handleUpdateDogAvatar}
            onExitToMenu={handleExitToMenu}
          />
        )}
      </main>
    </div>
  );
}
