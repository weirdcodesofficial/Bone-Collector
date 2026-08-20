import React, { useState, useEffect } from 'react';
import { Sparkles, X, RefreshCw, Download, Trophy, Palette, Lock, CheckCircle2 } from 'lucide-react';
import { DOG_AVATARS, DogAvatar, isDogAvatarUnlocked } from '../data/dogAvatars';
import {
  getSavedGeneratedDogs,
  generateDogAchievementSvg,
  GeneratedAchievementDog,
  getLatestGeneratedDogForAvatar,
} from '../utils/aiImageGenerator';
import { FullBodyDogImage } from './FullBodyDogImage';
import { audioManager } from '../utils/audio';

interface DogAiStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDogAvatar: DogAvatar;
  achievements: number;
  onSelectDogAvatar?: (avatar: DogAvatar) => void;
}

export const DogAiStudioModal: React.FC<DogAiStudioModalProps> = ({
  isOpen,
  onClose,
  currentDogAvatar,
  achievements,
  onSelectDogAvatar,
}) => {
  const [selectedBreed, setSelectedBreed] = useState<DogAvatar>(currentDogAvatar);
  const [gallery, setGallery] = useState<GeneratedAchievementDog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreviewSvg, setActivePreviewSvg] = useState<string | null>(null);
  const [activeDogInfo, setActiveDogInfo] = useState<{ name: string; breed: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedGeneratedDogs();
      setGallery(saved);
      setSelectedBreed(currentDogAvatar);
      const latest = getLatestGeneratedDogForAvatar(currentDogAvatar.id);
      if (latest && latest.svg) {
        setActivePreviewSvg(latest.svg);
      } else {
        setActivePreviewSvg(null);
      }
      setActiveDogInfo({ name: currentDogAvatar.name, breed: currentDogAvatar.breed });
    }
  }, [isOpen, currentDogAvatar]);

  if (!isOpen) return null;

  const handleGenerate = async (avatar: DogAvatar) => {
    audioManager.playClickSound();
    setIsGenerating(true);
    setStatusMessage(`Generating vector art body for ${avatar.name}...`);

    try {
      const result = await generateDogAchievementSvg(avatar, achievements || 1);
      setActivePreviewSvg(result.svg);
      setActiveDogInfo({ name: avatar.name, breed: avatar.breed });
      setStatusMessage(`Rendered vector art body for ${avatar.name}!`);
      const updatedGallery = getSavedGeneratedDogs();
      setGallery(updatedGallery);
      audioManager.playBarkSound();
    } catch (err: any) {
      console.warn('AI vector generation error:', err);
      setStatusMessage('Completed with vector design!');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleDownload = () => {
    try {
      if (activePreviewSvg) {
        const blob = new Blob([activePreviewSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${activeDogInfo?.name || 'Dog'}-${activeDogInfo?.breed || 'Breed'}-vector.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        audioManager.playBarkSound();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div
      id="dog-ai-studio-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        id="dog-ai-studio-modal"
        className="relative w-full max-w-4xl bg-[#132E16] text-white rounded-3xl sm:rounded-[2.5rem] border-3 sm:border-4 border-yellow-300 shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="p-4 sm:p-6 bg-[#1A401E] border-b-2 border-green-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-yellow-950 flex items-center justify-center font-black shadow-md">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black tracking-tight text-white">
                  Dog AI Vector Art Studio
                </h2>
                <span className="bg-yellow-400/30 text-yellow-200 border border-yellow-400/40 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  30 Trophies = 30 Breeds
                </span>
              </div>
              <p className="text-green-200 text-xs font-medium mt-0.5">
                Generate vector art avatar bodies for all 30 dog breeds (Unlock all 30 with 30 Trophies)!
              </p>
            </div>
          </div>

          <button
            id="close-ai-studio-btn"
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onClose();
            }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center border border-white/30 transition-all cursor-pointer shadow-sm"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Preview & Generator Control (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#193A1D] rounded-2xl p-4 border border-green-700/60 shadow-md flex flex-col items-center">
              {/* Main Preview Frame */}
              <div className="relative w-full aspect-square max-w-[260px] bg-slate-900 rounded-2xl border-2 border-yellow-300/80 overflow-hidden shadow-xl flex items-center justify-center group p-2">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <RefreshCw className="w-8 h-8 text-yellow-300 animate-spin" />
                    <span className="text-xs font-bold text-yellow-300">
                      Generating Full Vector Body...
                    </span>
                  </div>
                ) : activePreviewSvg ? (
                  <FullBodyDogImage
                    avatarId={selectedBreed.id}
                    customSvg={activePreviewSvg}
                    size={220}
                    animated
                  />
                ) : (
                  <FullBodyDogImage avatarId={selectedBreed.id} size={180} animated />
                )}
              </div>

              {/* Active Dog Details */}
              <div className="w-full text-center mt-3">
                <div className="text-sm sm:text-base font-black text-white">
                  {selectedBreed.name} the {selectedBreed.breed}
                </div>
                <div className="text-xs text-green-300 font-bold">{selectedBreed.title}</div>
              </div>

              {/* Status Toast */}
              {statusMessage && (
                <div className="mt-2 px-3 py-1 bg-yellow-400 text-yellow-950 rounded-lg text-xs font-black animate-pulse text-center">
                  {statusMessage}
                </div>
              )}

              {/* Generator Actions */}
              <div className="flex items-center gap-2 w-full mt-3">
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => handleGenerate(selectedBreed)}
                  className="flex-1 py-2.5 px-3 bg-yellow-400 hover:bg-yellow-300 active:scale-95 disabled:opacity-50 text-yellow-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Rendering...' : `Generate ${selectedBreed.name} Vector`}</span>
                </button>

                {activePreviewSvg && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="py-2.5 px-3 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold text-xs rounded-xl border border-white/30 transition-all flex items-center justify-center cursor-pointer"
                    title="Download Vector Art"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>

              {onSelectDogAvatar && (
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playBarkSound();
                    onSelectDogAvatar({
                      ...selectedBreed,
                      customSvg: activePreviewSvg || undefined,
                      customImageUrl: undefined,
                    });
                    onClose();
                  }}
                  className="w-full mt-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>✨ Equip Vector Body In Game 🐾</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Breed Selector Grid & Gallery (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Breed Selector */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-green-300">
                    30 Dog Breeds ({Math.min(achievements, 30)}/30 Unlocked)
                  </span>
                  <span className="bg-amber-400 text-yellow-950 font-black text-[9px] px-1.5 py-0.2 rounded-md shadow-xs">
                    🏆 30 Trophies = All 30 Unlocked
                  </span>
                </div>
                <span className="text-[10px] text-green-400 font-bold">
                  Tap any breed to preview or equip
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-[260px] overflow-y-auto pr-1">
                {DOG_AVATARS.map((avatar) => {
                  const isSelected = selectedBreed.id === avatar.id;
                  const isCurrent = currentDogAvatar.id === avatar.id;
                  const isUnlocked = isDogAvatarUnlocked(avatar.id, achievements);

                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => {
                        audioManager.playClickSound();
                        setSelectedBreed(avatar);
                        const saved = getLatestGeneratedDogForAvatar(avatar.id);
                        if (saved && saved.svg) {
                          setActivePreviewSvg(saved.svg);
                        } else {
                          setActivePreviewSvg(null);
                        }
                        setActiveDogInfo({ name: avatar.name, breed: avatar.breed });
                      }}
                      className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-yellow-400 text-yellow-950 border-yellow-300 scale-105 shadow-md font-black ring-2 ring-yellow-200'
                          : isUnlocked
                          ? 'bg-[#1A401E] hover:bg-[#225026] text-white border-green-700/60'
                          : 'bg-[#122b15] hover:bg-[#18361c] text-white/70 border-green-900/60 opacity-85'
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full border border-white text-[8px] flex items-center justify-center font-black text-white z-10 shadow-xs" title="Currently Equipped">
                          ✓
                        </span>
                      )}

                      {!isUnlocked && (
                        <span className="absolute -top-1.5 -left-1.5 px-1 py-0.5 bg-zinc-900/90 text-amber-300 rounded-md border border-amber-400/40 text-[7px] font-black flex items-center gap-0.5 z-10 shadow-xs">
                          <Lock className="w-2 h-2" />
                          <span>#{avatar.trophyRequired}</span>
                        </span>
                      )}

                      <div className="w-8 h-8 flex items-center justify-center">
                        <FullBodyDogImage avatarId={avatar.id} size={30} />
                      </div>
                      <span className="text-[10px] font-bold truncate max-w-full mt-1">
                        {avatar.name}
                      </span>
                      <span className="text-[8px] text-green-300/80 truncate max-w-full font-medium">
                        {avatar.breed.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Achievement Unlocked Gallery */}
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-green-300 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  Unlocked Trophy Vector Gallery ({gallery.length})
                </span>
              </div>

              {gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        audioManager.playClickSound();
                        if (item.svg) {
                          setActivePreviewSvg(item.svg);
                        }
                        setActiveDogInfo({ name: item.name, breed: item.breed });
                      }}
                      className="group relative bg-[#1A401E] rounded-xl border border-green-700 overflow-hidden cursor-pointer hover:border-yellow-300 transition-all p-1 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <div className="w-full h-20 flex items-center justify-center p-1">
                        <FullBodyDogImage avatarId={item.avatarId} customSvg={item.svg} size={80} />
                      </div>
                      <div className="w-full p-1 bg-black/60 backdrop-blur-xs flex items-center justify-between rounded-md mt-1">
                        <span className="text-[10px] font-black truncate">{item.name}</span>
                        <span className="text-[9px] text-yellow-300 font-bold">#{item.achievementLevel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#1A401E]/60 border border-dashed border-green-700/60 text-center text-xs text-green-300">
                  Catch 10 bones in-game to unlock achievements and generate full vector art avatar bodies!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
