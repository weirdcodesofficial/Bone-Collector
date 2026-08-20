import React, { useState } from 'react';
import { Sparkles, Trophy, Download, Check, RefreshCw, X } from 'lucide-react';
import { DogAvatar } from '../data/dogAvatars';
import { FullBodyDogImage } from './FullBodyDogImage';
import { audioManager } from '../utils/audio';

interface AchievementUnlockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievementLevel: number;
  dogAvatar: DogAvatar;
  aiSvg?: string | null;
  isGeneratingAiSvg?: boolean;
  onRegenerateAiSvg?: () => void;
  onEquipDogAvatar?: (avatar: DogAvatar) => void;
  collectionCount: number;
  totalBreeds: number;
}

export const AchievementUnlockedModal: React.FC<AchievementUnlockedModalProps> = ({
  isOpen,
  onClose,
  achievementLevel,
  dogAvatar,
  aiSvg,
  isGeneratingAiSvg = false,
  onRegenerateAiSvg,
  onEquipDogAvatar,
  collectionCount,
  totalBreeds,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleEquipAndContinue = () => {
    audioManager.playBarkSound();
    const updatedAvatar: DogAvatar = {
      ...dogAvatar,
      customSvg: aiSvg || dogAvatar.customSvg,
    };
    onEquipDogAvatar?.(updatedAvatar);
    onClose();
  };

  const handleDownload = () => {
    try {
      if (aiSvg) {
        const blob = new Blob([aiSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${dogAvatar.name}-${dogAvatar.breed}-achievement-${achievementLevel}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      audioManager.playBarkSound();
    } catch (err) {
      console.warn('Download error:', err);
    }
  };

  return (
    <div
      id="achievement-unlocked-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        id="achievement-unlocked-card"
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1C431F] to-[#122A14] text-white rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] border-4 border-yellow-300 flex flex-col items-center gap-3 text-center max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-achievement-modal-btn"
          type="button"
          onClick={() => {
            audioManager.playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center border border-white/30 transition-all cursor-pointer shadow-sm z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top Trophy & Level Header */}
        <div className="flex items-center gap-2 px-3.5 py-1 bg-yellow-400/20 rounded-full border border-yellow-300/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-widest">
          <Trophy className="w-4 h-4 fill-yellow-300 animate-pulse" />
          <span>New Achievement #{achievementLevel}</span>
          <Trophy className="w-4 h-4 fill-yellow-300 animate-pulse" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>🎉 Unlocked {dogAvatar.name}!</span>
          </h2>
          <p className="text-green-200 text-xs font-medium mt-0.5">
            Full vector art body generated for your new {dogAvatar.breed}!
          </p>
        </div>

        {/* Main Showcase Frame for Vector Art Body */}
        <div className="relative w-full aspect-square max-w-[240px] sm:max-w-[280px] bg-slate-900/70 rounded-2xl sm:rounded-3xl border-3 border-yellow-300/80 overflow-hidden shadow-2xl flex items-center justify-center group p-3">
          {isGeneratingAiSvg ? (
            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
              <div className="w-10 h-10 rounded-full border-4 border-yellow-300 border-t-transparent animate-spin flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="text-xs font-black text-yellow-300 animate-pulse">
                Rendering Full Vector Art Body...
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2">
              <FullBodyDogImage
                avatarId={dogAvatar.id}
                customSvg={aiSvg || undefined}
                size={200}
                animated
              />
            </div>
          )}

          {/* Breed Badge Bottom Overlay */}
          <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-md text-white px-2.5 py-1.5 rounded-xl border border-white/20 flex items-center justify-between">
            <div className="text-left min-w-0">
              <div className="text-xs font-black truncate">{dogAvatar.name} the {dogAvatar.breed}</div>
              <div className="text-[9px] text-green-300 font-bold truncate">{dogAvatar.title}</div>
            </div>
            <span className="bg-yellow-400 text-yellow-950 text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0">
              #{collectionCount}/{totalBreeds}
            </span>
          </div>
        </div>

        {/* Action Controls: Regenerate Vector Body, Download, or Equip & Play */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
          <button
            id="regenerate-ai-dog-btn"
            type="button"
            disabled={isGeneratingAiSvg}
            onClick={() => {
              audioManager.playClickSound();
              onRegenerateAiSvg?.();
            }}
            className="flex-1 min-w-[120px] py-2.5 px-3 bg-purple-600 hover:bg-purple-700 active:scale-95 disabled:opacity-50 text-white font-black text-xs rounded-xl border border-purple-400 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAiSvg ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAiSvg ? 'Rendering...' : 'Regenerate Vector Body'}</span>
          </button>

          {aiSvg && (
            <button
              id="download-ai-dog-btn"
              type="button"
              onClick={handleDownload}
              className="py-2.5 px-3 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-black text-xs rounded-xl border border-white/40 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              title="Save Vector Art"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? 'Saved!' : 'Save'}</span>
            </button>
          )}

          <button
            id="continue-playing-btn"
            type="button"
            onClick={handleEquipAndContinue}
            className="flex-1 min-w-[140px] py-2.5 px-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-yellow-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>✨ Equip Vector Body & Play 🐕</span>
          </button>
        </div>
      </div>
    </div>
  );
};
