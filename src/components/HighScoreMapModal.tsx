import { useState, useMemo, useRef, useEffect, type DragEvent, type ChangeEvent } from 'react';
import {
  X,
  Trophy,
  MapPin,
  Users,
  Compass,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ChevronRight,
  User,
  Image as ImageIcon,
  Award,
  Check,
  RotateCcw,
  Upload,
  Camera,
  Trash2,
} from 'lucide-react';
import { audioManager } from '../utils/audio';
import { FullBodyDogImage } from './FullBodyDogImage';
import { DogAvatar, DOG_AVATARS, getDogAvatarById } from '../data/dogAvatars';
import {
  MapPlayer,
  MAP_ZONES,
  BASE_COMMUNITY_PLAYERS,
  TOTAL_COMMUNITY_PLAYERS_COUNT,
  getUserCustomProfile,
  saveUserCustomProfile,
} from '../data/mapPlayers';

const HUMAN_AVATAR_PRESETS = [
  { id: 'h1', name: 'Explorer Alex', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
  { id: 'h2', name: 'Explorer Liam', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'h3', name: 'Trail Guide Maya', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: 'h4', name: 'Scout Ryan', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 'h5', name: 'Ranger Chloe', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
  { id: 'h6', name: 'Tracker Sam', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
];

interface HighScoreMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  userHighScore: number;
  userAchievements: number;
  currentDogAvatar: DogAvatar;
  initialTab?: 'map' | 'leaderboard' | 'profile';
}

type MapTab = 'map' | 'leaderboard' | 'profile';

export function HighScoreMapModal({
  isOpen,
  onClose,
  userHighScore,
  userAchievements,
  currentDogAvatar,
  initialTab = 'map',
}: HighScoreMapModalProps) {
  const [activeTab, setActiveTab] = useState<MapTab>(initialTab);
  const [userProfile, setUserProfile] = useState(() => getUserCustomProfile());
  const [selectedPlayer, setSelectedPlayer] = useState<MapPlayer | null>(null);
  const [customNameInput, setCustomNameInput] = useState(userProfile.name);
  const [customAvatarUrlInput, setCustomAvatarUrlInput] = useState(userProfile.avatarUrl);
  const [selectedAvatarId, setSelectedAvatarId] = useState(currentDogAvatar.id);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const mapScrollContainerRef = useRef<HTMLDivElement>(null);
  const userPinRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to process & downscale uploaded image to avoid storage issues
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToastMessage('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      // Downscale image via canvas to keep it lightweight (~300px max)
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          setCustomAvatarUrlInput(optimizedDataUrl);
          setUserProfile((prev) => ({
            ...prev,
            avatarUrl: optimizedDataUrl,
          }));

          saveUserCustomProfile(customNameInput || userProfile.name, optimizedDataUrl);
          showToastMessage('Profile photo updated successfully!');
          audioManager.playBarkSound();
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Sync profile when modal opens
  useEffect(() => {
    if (isOpen) {
      const saved = getUserCustomProfile();
      setUserProfile(saved);
      setCustomNameInput(saved.name);
      setCustomAvatarUrlInput(saved.avatarUrl);
      setSelectedAvatarId(currentDogAvatar.id);
      if (initialTab) setActiveTab(initialTab);
    }
  }, [isOpen, currentDogAvatar.id, initialTab]);

  const showToastMessage = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Combine community players and Current User, sorted by high score descending
  const allPlayers: MapPlayer[] = useMemo(() => {
    const currentUserPlayer: MapPlayer = {
      id: 'current-user-player',
      name: userProfile.name || 'You (Player Pup)',
      score: userHighScore,
      achievements: userAchievements,
      avatarId: selectedAvatarId,
      avatarUrl: userProfile.avatarUrl || '',
      countryEmoji: '⭐',
      title: userHighScore >= 100 ? 'Bone Master' : userHighScore >= 30 ? 'Trail Scout' : 'Novice Hopper',
      isCurrentUser: true,
      color: '#10B981',
    };

    const combined = [...BASE_COMMUNITY_PLAYERS, currentUserPlayer];
    // Sort descending by score
    combined.sort((a, b) => b.score - a.score);
    return combined;
  }, [userHighScore, userAchievements, userProfile, selectedAvatarId]);

  // Find user's index / rank
  const userRankIndex = useMemo(() => {
    return allPlayers.findIndex((p) => p.isCurrentUser);
  }, [allPlayers]);

  const userRank = userRankIndex >= 0 ? userRankIndex + 1 : 1;

  // Players immediately ahead and behind the user
  const playerAhead = userRankIndex > 0 ? allPlayers[userRankIndex - 1] : null;
  const playerBehind = userRankIndex < allPlayers.length - 1 ? allPlayers[userRankIndex + 1] : null;

  // Scroll to user's pin
  const scrollToUserPin = () => {
    if (userPinRef.current && mapScrollContainerRef.current) {
      userPinRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      audioManager.playClickSound();
    }
  };

  const handleSaveProfile = () => {
    audioManager.playClickSound();
    const cleanName = customNameInput.trim() || 'You (Player Pup)';
    const cleanAvatar = customAvatarUrlInput.trim();
    saveUserCustomProfile(cleanName, cleanAvatar);
    setUserProfile({ name: cleanName, avatarUrl: cleanAvatar });
    showToastMessage('Profile settings saved!');
  };

  if (!isOpen) return null;

  return (
    <div
      id="high-score-map-modal-overlay"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-2 sm:p-4 animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        id="high-score-map-modal-card"
        className="w-full max-w-4xl max-h-[95dvh] bg-[#F5F9F2] rounded-[2rem] sm:rounded-[3rem] shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-[6px] sm:border-[8px] border-[#8BC34A] flex flex-col overflow-hidden relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Save/Status Toast */}
        {saveToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white px-4 py-2 rounded-full font-black text-xs sm:text-sm shadow-xl flex items-center gap-1.5 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Modal Top Header */}
        <header className="bg-[#2E7D32] text-white p-3.5 sm:p-5 flex flex-col gap-3 relative border-b-4 border-green-800 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white/20">
                🗺️
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
                    High Score Adventure Map
                  </h2>
                  <span className="bg-yellow-400 text-yellow-950 font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full uppercase shadow-xs">
                    Live Trail
                  </span>
                </div>
                <p className="text-green-100 text-xs sm:text-sm font-medium">
                  Track players ahead & behind you on the global bone trail!
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              id="high-score-map-close-btn"
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onClose();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white border border-white/20 transition-all cursor-pointer"
              title="Close Map"
              aria-label="Close Map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Banner Bar */}
          <div className="grid grid-cols-3 gap-2 bg-black/20 p-2 sm:p-3 rounded-2xl border border-white/10 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-wider text-green-200 flex items-center gap-1">
                <Users className="w-3 h-3" /> Total Players
              </span>
              <span className="text-sm sm:text-lg font-black text-white">
                {(TOTAL_COMMUNITY_PLAYERS_COUNT + 1).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center border-x border-white/10">
              <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-wider text-yellow-300 flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Your Rank
              </span>
              <span className="text-sm sm:text-lg font-black text-yellow-300">
                #{userRank} <span className="text-[10px] text-yellow-200 font-bold">/ {allPlayers.length}</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-wider text-green-200 flex items-center gap-1">
                🦴 Your Best
              </span>
              <span className="text-sm sm:text-lg font-black text-white">
                {userHighScore} <span className="text-[10px] text-green-200 font-bold">Bones</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5">
            <button
              id="map-tab-trail-btn"
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                setActiveTab('map');
              }}
              className={`flex-1 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-white text-green-950 shadow-md border-b-2 border-green-800'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Trail Map</span>
            </button>

            <button
              id="map-tab-leaderboard-btn"
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                setActiveTab('leaderboard');
              }}
              className={`flex-1 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-green-950 shadow-md border-b-2 border-green-800'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Leaderboard</span>
            </button>

            <button
              id="map-tab-profile-btn"
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                setActiveTab('profile');
              }}
              className={`flex-1 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                activeTab === 'profile'
                  ? 'bg-white text-green-950 shadow-md border-b-2 border-green-800'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Player Profile</span>
            </button>
          </div>
        </header>

        {/* Modal Main Content Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-[#F1F8E9]">
          {/* TAB 1: VISUAL ADVENTURE TRAIL MAP */}
          {activeTab === 'map' && (
            <div className="relative flex-1 flex flex-col overflow-hidden">
              {/* Relative Position Status Sub-bar */}
              <div className="bg-white/90 backdrop-blur-sm border-b border-green-200 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 shrink-0 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {playerAhead ? (
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <ArrowUp className="w-3 h-3 text-emerald-600 font-extrabold" />
                      <span>
                        Forward Target: <strong className="text-emerald-950">{playerAhead.name}</strong> (+{playerAhead.score - userHighScore} bones)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                      <span>👑 You are currently #1 on the map!</span>
                    </div>
                  )}

                  {playerBehind && (
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <ArrowDown className="w-3 h-3 text-amber-600 font-extrabold" />
                      <span>
                        Behind You: <strong className="text-amber-950">{playerBehind.name}</strong> (-{userHighScore - playerBehind.score} bones)
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    id="jump-to-my-pin-btn"
                    type="button"
                    onClick={scrollToUserPin}
                    className="py-1 px-3 bg-[#8BC34A] hover:bg-[#7CB342] text-white rounded-full text-[11px] sm:text-xs font-black shadow-xs flex items-center gap-1 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <MapPin className="w-3 h-3" />
                    Jump to My Pin
                  </button>
                </div>
              </div>

              {/* Scrollable Trail Map Container */}
              <div
                ref={mapScrollContainerRef}
                className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6 sm:space-y-8 relative"
              >
                {/* Winding Map Visual Guide */}
                <div className="relative max-w-2xl mx-auto flex flex-col gap-6 sm:gap-8 pb-10">
                  {/* Decorative background dashed path spine */}
                  <div className="absolute top-4 bottom-4 left-6 sm:left-10 w-1.5 bg-gradient-to-b from-green-300 via-amber-300 to-purple-400 rounded-full z-0 opacity-70" />

                  {/* Render Milestone Zones */}
                  {MAP_ZONES.slice().reverse().map((zone, zIdx) => {
                    // Filter players inside this milestone zone
                    const zoneMax = zIdx === 0 ? Infinity : MAP_ZONES.slice().reverse()[zIdx - 1]?.scoreRequirement ?? Infinity;
                    const zonePlayers = allPlayers.filter(
                      (p) => p.score >= zone.scoreRequirement && p.score < zoneMax
                    );

                    return (
                      <div
                        key={zone.id}
                        id={`map-zone-${zone.id}`}
                        className="relative z-10 flex flex-col gap-3 bg-white/85 backdrop-blur-sm rounded-3xl p-3.5 sm:p-5 border-2 border-green-200 shadow-sm"
                      >
                        {/* Zone Header Banner */}
                        <div className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-white bg-gradient-to-r ${zone.bgGradient} shadow-md`}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl sm:text-2xl drop-shadow-sm">{zone.icon}</span>
                            <div>
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wide">
                                {zone.name}
                              </div>
                              <div className="text-[10px] sm:text-xs text-white/90 font-medium">
                                {zone.description}
                              </div>
                            </div>
                          </div>
                          <div className="bg-black/25 px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider shrink-0">
                            {zone.scoreRequirement}+ Bones
                          </div>
                        </div>

                        {/* Players in this Zone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {zonePlayers.length === 0 ? (
                            <div className="col-span-full text-center py-3 text-xs text-green-800/60 font-semibold italic bg-green-50/50 rounded-xl border border-dashed border-green-200">
                              No players currently resting in this zone. Keep jumping to conquer it!
                            </div>
                          ) : (
                            zonePlayers.map((player) => {
                              const rank = allPlayers.findIndex((p) => p.id === player.id) + 1;
                              const isAhead = player.score > userHighScore;
                              const isBehind = player.score < userHighScore;
                              const scoreDiff = Math.abs(player.score - userHighScore);

                              return (
                                <div
                                  key={player.id}
                                  ref={player.isCurrentUser ? userPinRef : null}
                                  onClick={() => {
                                    audioManager.playClickSound();
                                    setSelectedPlayer(player);
                                  }}
                                  className={`relative flex items-center gap-2.5 p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                                    player.isCurrentUser
                                      ? 'bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-500 shadow-md ring-4 ring-emerald-400/40 animate-pulse'
                                      : 'bg-white hover:bg-green-50/80 border-green-200 shadow-xs hover:shadow-md'
                                  }`}
                                >
                                  {/* Rank & Profile Pic / Favicon */}
                                  <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-center p-1 shadow-inner overflow-hidden relative">
                                      {player.avatarUrl ? (
                                        <img
                                          src={player.avatarUrl}
                                          alt={player.name}
                                          className="w-full h-full object-cover rounded-xl"
                                          referrerPolicy="no-referrer"
                                          onError={(e) => {
                                            (e.currentTarget as HTMLElement).style.display = 'none';
                                          }}
                                        />
                                      ) : (
                                        <FullBodyDogImage avatarId={player.avatarId} size={40} />
                                      )}
                                    </div>

                                    {/* Rank Number Badge */}
                                    <div
                                      className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border shadow-xs ${
                                        rank === 1
                                          ? 'bg-yellow-400 text-yellow-950 border-yellow-500'
                                          : rank === 2
                                          ? 'bg-slate-200 text-slate-900 border-slate-400'
                                          : rank === 3
                                          ? 'bg-amber-600 text-white border-amber-700'
                                          : 'bg-green-900 text-white border-green-700'
                                      }`}
                                    >
                                      {rank}
                                    </div>
                                  </div>

                                  {/* Player Details */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs sm:text-sm font-black text-green-950 truncate">
                                        {player.name}
                                      </span>
                                      {player.isCurrentUser && (
                                        <span className="bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full shrink-0 uppercase tracking-wider">
                                          YOU
                                        </span>
                                      )}
                                      {player.countryEmoji && (
                                        <span className="text-xs shrink-0">{player.countryEmoji}</span>
                                      )}
                                    </div>

                                    <div className="text-[10px] text-green-800 font-bold truncate">
                                      {player.title}
                                    </div>

                                    {/* Forward / Back Indicator */}
                                    <div className="flex items-center gap-1 mt-0.5">
                                      {player.isCurrentUser ? (
                                        <span className="text-[10px] font-black text-emerald-700 flex items-center gap-0.5">
                                          📍 Your Current Location
                                        </span>
                                      ) : isAhead ? (
                                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                                          <ArrowUp className="w-2.5 h-2.5 font-black text-emerald-600" />
                                          +{scoreDiff} ahead (Forward)
                                        </span>
                                      ) : (
                                        <span className="text-[9px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                                          <ArrowDown className="w-2.5 h-2.5 font-black text-amber-600" />
                                          -{scoreDiff} behind (Back)
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* High Score Bone Tag */}
                                  <div className="text-right shrink-0">
                                    <div className="text-xs sm:text-sm font-black text-green-950 flex items-center justify-end gap-1">
                                      <span>🦴</span>
                                      <span>{player.score}</span>
                                    </div>
                                    <div className="text-[9px] font-bold text-amber-700 flex items-center justify-end gap-0.5">
                                      <Trophy className="w-2.5 h-2.5 fill-amber-500 text-amber-600" />
                                      <span>{player.achievements}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADERBOARD RANKINGS TABLE */}
          {activeTab === 'leaderboard' && (
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
              <div className="bg-white rounded-3xl p-3 sm:p-5 border-2 border-green-200 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-green-100">
                  <div className="text-xs sm:text-sm font-black text-green-950 uppercase tracking-wider">
                    Global Explorer Rankings
                  </div>
                  <div className="text-[10px] sm:text-xs text-green-800 font-bold">
                    Sorted by All-Time High Score
                  </div>
                </div>

                <div className="divide-y divide-green-100 mt-2">
                  {allPlayers.map((player, idx) => {
                    const rank = idx + 1;
                    const isAhead = player.score > userHighScore;
                    const isBehind = player.score < userHighScore;
                    const scoreDiff = Math.abs(player.score - userHighScore);

                    return (
                      <div
                        key={player.id}
                        onClick={() => {
                          audioManager.playClickSound();
                          setSelectedPlayer(player);
                        }}
                        className={`flex items-center justify-between gap-3 py-2.5 px-2 sm:px-3 rounded-2xl transition-colors cursor-pointer ${
                          player.isCurrentUser
                            ? 'bg-emerald-100/90 border-2 border-emerald-500 font-black'
                            : 'hover:bg-green-50/80'
                        }`}
                      >
                        {/* Rank + Avatar + Name */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                              rank === 1
                                ? 'bg-yellow-400 text-yellow-950'
                                : rank === 2
                                ? 'bg-slate-300 text-slate-900'
                                : rank === 3
                                ? 'bg-amber-600 text-white'
                                : 'bg-green-100 text-green-900'
                            }`}
                          >
                            {rank}
                          </span>

                          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center p-0.5 shrink-0 overflow-hidden relative">
                            {player.avatarUrl ? (
                              <img
                                src={player.avatarUrl}
                                alt={player.name}
                                className="w-full h-full object-cover rounded-lg"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <FullBodyDogImage avatarId={player.avatarId} size={30} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="text-xs sm:text-sm font-black text-green-950 truncate">
                                {player.name}
                              </span>
                              {player.isCurrentUser && (
                                <span className="bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
                                  YOU
                                </span>
                              )}
                              {player.countryEmoji && (
                                <span className="text-xs">{player.countryEmoji}</span>
                              )}
                            </div>
                            <div className="text-[10px] text-green-700 font-semibold truncate">
                              {player.title}
                            </div>
                          </div>
                        </div>

                        {/* Relative Position Status */}
                        <div className="hidden sm:flex items-center">
                          {player.isCurrentUser ? (
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full">
                              Your Rank
                            </span>
                          ) : isAhead ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <ArrowUp className="w-3 h-3 text-emerald-600" />
                              +{scoreDiff} Ahead (Forward)
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <ArrowDown className="w-3 h-3 text-amber-600" />
                              -{scoreDiff} Behind (Back)
                            </span>
                          )}
                        </div>

                        {/* Score & Trophies */}
                        <div className="text-right shrink-0 flex items-center gap-3">
                          <div className="text-xs sm:text-sm font-black text-green-950 flex items-center gap-1">
                            <span>🦴</span>
                            <span>{player.score}</span>
                          </div>
                          <div className="text-xs font-black text-amber-600 flex items-center gap-0.5">
                            <Trophy className="w-3 h-3 fill-amber-400 text-amber-600" />
                            <span>{player.achievements}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE CONFIG */}
          {activeTab === 'profile' && (
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
              <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-green-200 shadow-sm max-w-xl mx-auto flex flex-col gap-4">
                {/* Profile Avatar & Pin Preview */}
                <div className="p-4 bg-green-50 rounded-2xl border border-green-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-3xl bg-white border-3 border-emerald-500 shadow-md flex items-center justify-center p-1 relative overflow-hidden">
                      {userProfile.avatarUrl ? (
                        <img
                          src={userProfile.avatarUrl}
                          alt="Profile Favicon"
                          className="w-full h-full object-cover rounded-2xl"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <FullBodyDogImage avatarId={selectedAvatarId} size={70} animated />
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white font-black text-[8px] py-0.5 text-center uppercase">
                        MAP PIN
                      </div>
                    </div>

                    {/* Quick photo upload button badge on top of avatar */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 border-2 border-white"
                      title="Upload photo from your device"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <span className="text-base sm:text-xl font-black text-green-950 truncate">
                        {userProfile.name}
                      </span>
                    </div>
                    <div className="text-xs text-green-800 font-bold mt-0.5">
                      Rank #{userRank} • {userHighScore} Total Bones Caught • {userAchievements} Trophies
                    </div>
                    <div className="text-[11px] text-green-600 font-medium mt-1">
                      This avatar and favicon represent you on the adventure trail and leaderboard!
                    </div>

                    {/* Quick Actions if photo is uploaded */}
                    <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black rounded-lg shadow-xs flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Photo</span>
                      </button>
                      {userProfile.avatarUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomAvatarUrlInput('');
                            setUserProfile((prev) => ({ ...prev, avatarUrl: '' }));
                            saveUserCustomProfile(customNameInput || userProfile.name, '');
                            showToastMessage('Photo cleared (using dog mascot)');
                          }}
                          className="py-1 px-2.5 bg-white hover:bg-rose-50 text-rose-600 text-[11px] font-bold rounded-lg border border-rose-200 flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="space-y-3.5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-green-900 mb-1">
                      Explorer Display Name
                    </label>
                    <input
                      id="custom-player-name-input"
                      type="text"
                      maxLength={24}
                      value={customNameInput}
                      onChange={(e) => setCustomNameInput(e.target.value)}
                      placeholder="Enter your explorer name..."
                      className="w-full px-3.5 py-2.5 bg-green-50/70 border-2 border-green-200 rounded-xl text-green-950 font-bold text-sm focus:outline-none focus:border-green-600 transition-colors"
                    />
                  </div>

                  {/* Drag-and-Drop & File Upload Photo Section */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-green-900 mb-1">
                      Your Profile Photo / Avatar
                    </label>

                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />

                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
                        isDragging
                          ? 'border-emerald-600 bg-emerald-100/90 scale-102 shadow-md'
                          : 'border-green-300 hover:border-emerald-500 bg-green-50/60 hover:bg-green-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shadow-xs">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-green-950">
                          {isDragging ? 'Drop your photo here!' : 'Click to select or drag & drop your photo'}
                        </div>
                        <div className="text-[10px] text-green-700 font-medium mt-0.5">
                          Supports PNG, JPG, JPEG, WebP from your device
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Favicon / Profile Pic Image URL */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-green-900 mb-1">
                      Or Paste Image URL Directly
                    </label>
                    <input
                      id="custom-player-avatar-url-input"
                      type="url"
                      value={customAvatarUrlInput}
                      onChange={(e) => setCustomAvatarUrlInput(e.target.value)}
                      placeholder="https://example.com/your-photo.png"
                      className="w-full px-3.5 py-2.5 bg-green-50/70 border-2 border-green-200 rounded-xl text-green-950 font-medium text-xs focus:outline-none focus:border-green-600 transition-colors"
                    />
                  </div>

                  {/* Real Photo Avatar Presets Selection */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-green-900 mb-1.5">
                      Or Choose Instant Photo Avatar
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-1.5 bg-green-50 rounded-2xl border border-green-200">
                      {HUMAN_AVATAR_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            audioManager.playClickSound();
                            setCustomAvatarUrlInput(preset.url);
                            setUserProfile((prev) => ({ ...prev, avatarUrl: preset.url }));
                            saveUserCustomProfile(customNameInput || userProfile.name, preset.url);
                            showToastMessage(`Selected ${preset.name}!`);
                          }}
                          className={`p-1 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                            customAvatarUrlInput === preset.url
                              ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400'
                              : 'bg-white/60 hover:bg-white border-green-200'
                          }`}
                          title={preset.name}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[8px] font-black text-green-950 truncate max-w-full mt-1">
                            {preset.name.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dog Avatar Preset Selection */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-green-900 mb-1.5">
                      Or Choose Dog Avatar Mascot
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-green-50 rounded-2xl border border-green-200">
                      {DOG_AVATARS.map((dog) => (
                        <button
                          key={dog.id}
                          type="button"
                          onClick={() => {
                            audioManager.playClickSound();
                            setSelectedAvatarId(dog.id);
                            setCustomAvatarUrlInput('');
                            setUserProfile((prev) => ({ ...prev, avatarUrl: '' }));
                            saveUserCustomProfile(customNameInput || userProfile.name, '');
                          }}
                          className={`p-1.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                            selectedAvatarId === dog.id && !customAvatarUrlInput
                              ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400'
                              : 'bg-white/60 hover:bg-white border-green-200'
                          }`}
                          title={`${dog.name} the ${dog.breed}`}
                        >
                          <div className="w-8 h-8 flex items-center justify-center">
                            <FullBodyDogImage avatarId={dog.id} size={28} />
                          </div>
                          <span className="text-[9px] font-black text-green-900 truncate max-w-full">
                            {dog.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Profile Button */}
                  <button
                    id="save-player-profile-btn"
                    type="button"
                    onClick={handleSaveProfile}
                    className="w-full py-3 px-4 bg-[#8BC34A] hover:bg-[#7CB342] active:translate-y-0.5 text-white font-black text-sm sm:text-base rounded-2xl shadow-[0_4px_0_rgb(104,159,56)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Explorer Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Player Detail Card Drawer / Overlay */}
        {selectedPlayer && (
          <div
            id="player-detail-overlay"
            className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={() => setSelectedPlayer(null)}
          >
            <div
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-4 border-[#8BC34A] shadow-2xl flex flex-col items-center text-center gap-3 relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-green-100 text-green-900 hover:bg-green-200 flex items-center justify-center font-bold cursor-pointer"
                title="Close"
              >
                ✕
              </button>

              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center p-1.5 border-2 border-green-200 shadow-inner overflow-hidden">
                {selectedPlayer.avatarUrl ? (
                  <img
                    src={selectedPlayer.avatarUrl}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <FullBodyDogImage avatarId={selectedPlayer.avatarId} size={70} animated />
                )}
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="text-xl font-black text-green-950">{selectedPlayer.name}</h3>
                  {selectedPlayer.countryEmoji && <span>{selectedPlayer.countryEmoji}</span>}
                </div>
                <div className="text-xs font-bold text-green-800">{selectedPlayer.title}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full bg-green-50 p-3 rounded-2xl border border-green-200 text-center">
                <div>
                  <div className="text-[9px] uppercase font-black text-green-800">High Score</div>
                  <div className="text-lg font-black text-green-950 flex items-center justify-center gap-1">
                    <span>🦴</span>
                    <span>{selectedPlayer.score}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-black text-green-800">Achievements</div>
                  <div className="text-lg font-black text-amber-600 flex items-center justify-center gap-1">
                    <span>🏆</span>
                    <span>{selectedPlayer.achievements}</span>
                  </div>
                </div>
              </div>

              {/* Relative Position relative to current user */}
              <div className="w-full py-2 px-3 bg-white rounded-xl border border-green-200 text-xs font-bold text-green-900">
                {selectedPlayer.isCurrentUser ? (
                  <span className="text-emerald-700 font-black">🌟 This is your adventurer profile!</span>
                ) : selectedPlayer.score > userHighScore ? (
                  <span className="text-emerald-700 font-black flex items-center justify-center gap-1">
                    <ArrowUp className="w-4 h-4" />
                    {selectedPlayer.name} is {selectedPlayer.score - userHighScore} bones ahead of you (Forward)!
                  </span>
                ) : (
                  <span className="text-amber-700 font-black flex items-center justify-center gap-1">
                    <ArrowDown className="w-4 h-4" />
                    You are {userHighScore - selectedPlayer.score} bones ahead of {selectedPlayer.name}!
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlayer(null)}
                className="w-full py-2.5 bg-[#8BC34A] text-white font-black rounded-xl cursor-pointer"
              >
                Back to Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
