import { X, Play, RotateCcw, Home } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { FullBodyDogImage } from './FullBodyDogImage';

interface ExitModalProps {
  score?: number;
  highScore?: number;
  achievements?: number;
  dogEmoji?: string;
  dogAvatarId?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmExitToMenu: () => void;
  onRestartGame?: () => void;
  isFromStartScreen?: boolean;
}

export function ExitModal({
  score = 0,
  highScore = 0,
  achievements = 0,
  dogEmoji = '🐕',
  dogAvatarId = 'golden',
  isOpen,
  onClose,
  onConfirmExitToMenu,
  onRestartGame,
  isFromStartScreen = false,
}: ExitModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="exit-modal-overlay"
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#2E7D32]/85 backdrop-blur-md p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="exit-modal-card"
        className="w-full max-w-xs sm:max-w-sm max-h-[94dvh] overflow-y-auto bg-white rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[6px] sm:border-[8px] border-[#8BC34A] text-center relative transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="exit-modal-close-btn"
          type="button"
          onClick={() => {
            audioManager.playClickSound();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-green-800/60 hover:text-green-950 rounded-full hover:bg-green-100 transition-colors font-bold text-lg"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="w-20 h-16 sm:w-24 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center p-1 shadow-inner border-2 border-green-200 mx-auto my-1">
          <FullBodyDogImage avatarId={dogAvatarId} size={72} animated />
        </div>

        {isFromStartScreen ? (
          <>
            <h3 className="text-xl sm:text-2xl font-black text-green-950 tracking-tight mt-1">Take a Puppy Break?</h3>
            <p className="text-green-700 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
              Your puppy and trophies will be waiting here!
            </p>

            <div className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
              <button
                id="exit-modal-stay-btn"
                type="button"
                onClick={() => {
                  audioManager.playClickSound();
                  onClose();
                }}
                className="w-full py-3.5 sm:py-4 px-5 sm:px-6 bg-[#8BC34A] hover:bg-[#7CB342] active:translate-y-1 active:shadow-none text-white font-black text-base sm:text-lg tracking-tight rounded-2xl shadow-[0_5px_0_rgb(104,159,56)] sm:shadow-[0_6px_0_rgb(104,159,56)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                STAY & PLAY
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg sm:text-2xl font-black text-green-950 tracking-tight mt-1">Exit Game?</h3>
            <p className="text-green-700 text-xs sm:text-sm mt-0.5 font-medium">
              Return to menu or keep playing?
            </p>

            <div className="my-2.5 sm:my-3 p-2.5 sm:p-3.5 bg-green-50 rounded-2xl border-2 border-green-100 grid grid-cols-2 gap-2 text-center">
              <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-green-200">
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-green-800">Total Bones</div>
                <div className="text-xl sm:text-2xl font-black text-green-950 flex items-center justify-center gap-1 mt-0.5">
                  <span>🦴</span>
                  <span>{score}</span>
                </div>
              </div>
              <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-green-200">
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-green-800">Trophies</div>
                <div className="text-xl sm:text-2xl font-black text-amber-600 flex items-center justify-center gap-1 mt-0.5">
                  <span>🏆</span>
                  <span>{achievements}</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3 flex flex-col gap-2">
              <button
                id="exit-modal-resume-btn"
                type="button"
                onClick={() => {
                  audioManager.playClickSound();
                  onClose();
                }}
                className="w-full py-2.5 sm:py-3 px-4 bg-[#8BC34A] hover:bg-[#7CB342] text-white font-black text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-[0_4px_0_rgb(104,159,56)] sm:shadow-[0_5px_0_rgb(104,159,56)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Resume Playing
              </button>

              {onRestartGame && (
                <button
                  id="exit-modal-restart-btn"
                  type="button"
                  onClick={() => {
                    audioManager.playClickSound();
                    onRestartGame();
                    onClose();
                  }}
                  className="w-full py-2 sm:py-2.5 px-4 bg-green-100 hover:bg-green-200 text-green-950 font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Restart Round
                </button>
              )}

              <button
                id="exit-modal-confirm-menu-btn"
                type="button"
                onClick={() => {
                  audioManager.playClickSound();
                  onConfirmExitToMenu();
                  onClose();
                }}
                className="w-full py-1.5 sm:py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl sm:rounded-2xl border border-red-200 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Return to Main Menu
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
