import { useState, useEffect, useRef, useCallback, type MouseEvent, type TouchEvent } from 'react';
import { Trophy, Sparkles, X, Heart, Compass, Image as ImageIcon } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { Particle, FloatingText } from '../types';
import { ExitModal } from './ExitModal';
import { SoundToggle } from './SoundToggle';
import { HighScoreMapModal } from './HighScoreMapModal';
import { DOG_AVATARS, DogAvatar, getNextUniqueDogAvatar } from '../data/dogAvatars';
import { FullBodyDogImage } from './FullBodyDogImage';
import { AchievementUnlockedModal } from './AchievementUnlockedModal';
import { DogAiStudioModal } from './DogAiStudioModal';
import { generateDogAchievementSvg } from '../utils/aiImageGenerator';

// Desktop 1920x1080 Resolution
const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;
const GROUND_Y = 940;
const BONES_PER_ACHIEVEMENT = 10;
const UNLOCKED_AVATARS_STORAGE_KEY = 'dog_bone_game_unlocked_avatar_ids';

// Unique sequential ID generators to avoid React key collisions
let particleCounter = 0;
let textCounter = 0;
let rippleCounter = 0;

function getUniqueParticleId(): number {
  particleCounter += 1;
  return particleCounter;
}

function getUniqueTextId(): number {
  textCounter += 1;
  return textCounter;
}

function getUniqueRippleId(): number {
  rippleCounter += 1;
  return rippleCounter;
}

interface DogGameCanvasProps {
  highScore: number;
  achievements: number;
  dogAvatar?: DogAvatar;
  onUpdateHighScore: (score: number) => void;
  onUpdateAchievements: (achievements: number) => void;
  onUpdateDogAvatar?: (avatar: DogAvatar) => void;
  onExitToMenu: () => void;
}

export function DogGameCanvas({
  highScore,
  achievements,
  dogAvatar = DOG_AVATARS[0],
  onUpdateHighScore,
  onUpdateAchievements,
  onUpdateDogAvatar,
  onExitToMenu,
}: DogGameCanvasProps) {
  // Bone collection stack (0 to 10) - resets every 10 bones
  const [boneStack, setBoneStack] = useState<number>(0);
  // Lifetime / session total bones
  const [totalBones, setTotalBones] = useState<number>(0);
  const [currentAchievements, setCurrentAchievements] = useState<number>(achievements);
  const [currentDogAvatar, setCurrentDogAvatar] = useState<DogAvatar>(dogAvatar);

  // Track unlocked/seen dog avatars to guarantee zero repeats for new achievements
  const [usedAvatarIds, setUsedAvatarIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(UNLOCKED_AVATARS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!parsed.includes(dogAvatar.id)) {
            parsed.push(dogAvatar.id);
          }
          return parsed;
        }
      }
    } catch {}
    return [dogAvatar.id];
  });

  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showAiStudioModal, setShowAiStudioModal] = useState<boolean>(false);

  // AI SVG Vector generation on new achievement state
  const [showAchievementModal, setShowAchievementModal] = useState<boolean>(false);
  const [modalAchievementLevel, setModalAchievementLevel] = useState<number>(1);
  const [modalDogAvatar, setModalDogAvatar] = useState<DogAvatar>(dogAvatar);
  const [modalAiSvg, setModalAiSvg] = useState<string | null>(null);
  const [isGeneratingModalAiSvg, setIsGeneratingModalAiSvg] = useState<boolean>(false);

  const [achievementBanner, setAchievementBanner] = useState<{
    id: number;
    level: number;
    text: string;
    dogAvatarId?: string;
    dogName?: string;
    dogBreed?: string;
    dogEmoji?: string;
    dogTitle?: string;
    dogAccentColor?: string;
    collectionCount?: number;
    totalBreeds?: number;
  } | null>(null);

  // Game coordinates in 1920x1080 space
  const [dogPos, setDogPos] = useState({
    x: GAME_WIDTH / 2,
    y: GROUND_Y,
    rotation: 0,
    scaleX: 1,
    isJumping: false,
    barking: false,
  });

  const [bonePos, setBonePos] = useState({
    x: -200,
    y: -200,
    rotation: 0,
    visible: false,
    direction: 'left-to-right' as 'left-to-right' | 'right-to-left',
  });

  // Visual effects
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [tapRipples, setTapRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Animation and physics refs
  const lastTimeRef = useRef<number>(performance.now());
  const jumpRef = useRef<{
    active: boolean;
    startTime: number;
    duration: number;
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    landX: number;
    landY: number;
  }>({
    active: false,
    startTime: 0,
    duration: 750,
    startX: GAME_WIDTH / 2,
    startY: GROUND_Y,
    targetX: GAME_WIDTH / 2,
    targetY: 380,
    landX: GAME_WIDTH / 2,
    landY: GROUND_Y,
  });

  // Flying bone physics ref
  const boneFlightRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    peakY: number;
    startTime: number;
    duration: number;
    direction: 'left-to-right' | 'right-to-left';
  }>({
    active: false,
    startX: -100,
    startY: 460,
    endX: GAME_WIDTH + 140,
    endY: 480,
    peakY: 260,
    startTime: 0,
    duration: 2600,
    direction: 'left-to-right',
  });

  const boneStackRef = useRef(boneStack);
  boneStackRef.current = boneStack;

  const totalBonesRef = useRef(totalBones);
  totalBonesRef.current = totalBones;

  const achievementsRef = useRef(currentAchievements);
  achievementsRef.current = currentAchievements;

  const dogAvatarRef = useRef(currentDogAvatar);
  dogAvatarRef.current = currentDogAvatar;

  const usedAvatarIdsRef = useRef(usedAvatarIds);
  usedAvatarIdsRef.current = usedAvatarIds;

  const boneRef = useRef(bonePos);
  boneRef.current = bonePos;

  const dogRef = useRef(dogPos);
  dogRef.current = dogPos;

  // Requirement:
  // "bone shouldn't float at one place in air. it should come from left going to right side if dog is in the right side of the screen center
  // and should come from the right side going to the left if dog is in the left side of the screen."
  const throwNewBone = useCallback((currentDogX: number) => {
    const isDogOnRight = currentDogX >= GAME_WIDTH / 2;

    const direction: 'left-to-right' | 'right-to-left' = isDogOnRight ? 'left-to-right' : 'right-to-left';
    const startX = isDogOnRight ? -100 : GAME_WIDTH + 100;
    const endX = isDogOnRight ? GAME_WIDTH + 140 : -140;

    // Arc heights across 1920x1080 canvas
    const startY = 460 + Math.random() * 80;
    const endY = 480 + Math.random() * 80;
    const peakY = 220 + Math.random() * 160; // Peak elevation in upper sky
    const duration = 2500 + Math.random() * 400; // 2.5 - 2.9 seconds flight time

    boneFlightRef.current = {
      active: true,
      startX,
      startY,
      endX,
      endY,
      peakY,
      startTime: performance.now(),
      duration,
      direction,
    };

    setBonePos({
      x: startX,
      y: startY,
      rotation: 0,
      visible: true,
      direction,
    });

    audioManager.playWhooshSound();
  }, []);

  // Launch initial bone on component load
  useEffect(() => {
    const timer = setTimeout(() => {
      throwNewBone(dogRef.current.x);
    }, 400);
    return () => clearTimeout(timer);
  }, [throwNewBone]);

  // Spawn particle sparkles
  const createSparkles = (x: number, y: number, isAchievement = false, specialEmoji?: string) => {
    const emojis = isAchievement
      ? ['🏆', '⭐', '✨', '🦴', '🎉', specialEmoji || '🐕']
      : ['✨', '⭐', '🦴', '🌟'];
    const count = isAchievement ? 36 : 18;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = isAchievement ? 6 + Math.random() * 11 : 5 + Math.random() * 8;
      newParticles.push({
        id: getUniqueParticleId(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isAchievement ? 4 : 2),
        size: isAchievement ? 26 + Math.random() * 26 : 20 + Math.random() * 22,
        color: isAchievement ? '#FFD700' : '#8BC34A',
        alpha: 1,
        char: emojis[Math.floor(Math.random() * emojis.length)],
        rotation: Math.random() * 360,
        life: 0,
        maxLife: isAchievement ? 50 + Math.random() * 20 : 35 + Math.random() * 15,
      });
    }
    setParticles((prev) => [...prev.slice(-60), ...newParticles]);

    // Floating text
    const newText: FloatingText = {
      id: getUniqueTextId(),
      x,
      y: y - 50,
      text: isAchievement ? '+1 ACHIEVEMENT! 🏆' : '+1 BONE! 🦴',
      opacity: 1,
      scale: isAchievement ? 1.5 : 1.3,
      vy: isAchievement ? -4.5 : -3.5,
    };
    setFloatingTexts((prev) => [...prev, newText]);
  };

  // Trigger jump: Leaps from ground up to target, then lands cleanly back on ground at targetX
  // User constraint: "jump should not wrork until the dog is on the ground once again"
  const jumpToTarget = useCallback(
    (targetX: number, targetY: number) => {
      // STRICT GROUND CHECK: Dog must be fully landed on the ground before another jump can execute
      if (
        jumpRef.current.active ||
        dogRef.current.isJumping ||
        dogRef.current.y < GROUND_Y - 2
      ) {
        return;
      }

      audioManager.playJumpSound();

      const startX = dogRef.current.x;
      const startY = dogRef.current.y;
      const facing = targetX >= startX ? 1 : -1;

      // Calculate natural duration based on distance and elevation
      const distance = Math.hypot(targetX - startX, targetY - startY);
      const duration = Math.max(550, Math.min(880, distance * 0.42 + 350));

      jumpRef.current = {
        active: true,
        startTime: performance.now(),
        duration,
        startX,
        startY,
        targetX,
        targetY,
        landX: targetX,
        landY: GROUND_Y,
      };

      dogRef.current.isJumping = true;
      setDogPos((prev) => ({
        ...prev,
        isJumping: true,
        scaleX: facing,
      }));
    },
    []
  );

  // Handle Touch or Click on screen: Jump dog to the clicked / tapped position
  const handleCanvasTouchOrClick = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (showExitModal) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    } else {
      return;
    }

    // Convert screen coordinates to 1920x1080 game coordinate space
    const normX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const normY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    const targetX = Math.max(140, Math.min(GAME_WIDTH - 140, normX * GAME_WIDTH));
    const targetY = Math.max(160, Math.min(GROUND_Y - 40, normY * GAME_HEIGHT));

    // If dog is currently in the air, ignore jump input until landed
    if (jumpRef.current.active || dogRef.current.isJumping || dogRef.current.y < GROUND_Y - 2) {
      return;
    }

    // Spawn animated tap ripple indicator at target
    const rippleId = getUniqueRippleId();
    setTapRipples((prev) => [...prev.slice(-6), { id: rippleId, x: targetX, y: targetY }]);
    setTimeout(() => {
      setTapRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 600);

    jumpToTarget(targetX, targetY);
  };

  // Keyboard space / up arrow jump support (also strictly grounded)
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (showExitModal || showMapModal) return;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        // Target current flying bone position or center high
        const targetX = boneRef.current.visible ? boneRef.current.x : dogRef.current.x;
        const targetY = boneRef.current.visible ? Math.max(180, boneRef.current.y) : 380;
        jumpToTarget(targetX, targetY);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showExitModal, showMapModal, jumpToTarget]);

  // Main Game Loop
  useEffect(() => {
    let animId: number;

    const gameLoop = (currentTime: number) => {
      const dt = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      let currentDogX = dogRef.current.x;
      let currentDogY = dogRef.current.y;

      // Handle jumping trajectory (spring up to target, then return to ground)
      if (jumpRef.current.active) {
        const elapsed = currentTime - jumpRef.current.startTime;
        const progress = Math.min(1, elapsed / jumpRef.current.duration);

        let tilt = 0;

        if (progress < 0.5) {
          // Ascending phase to the target (0.0 -> 0.5)
          const tAscent = progress * 2; // 0 to 1
          const easeAscent = 1 - Math.pow(1 - tAscent, 2.2);

          currentDogX = jumpRef.current.startX + (jumpRef.current.targetX - jumpRef.current.startX) * easeAscent;
          currentDogY = jumpRef.current.startY + (jumpRef.current.targetY - jumpRef.current.startY) * Math.sin(tAscent * (Math.PI / 2));

          tilt = Math.sin(tAscent * Math.PI) * 16 * (jumpRef.current.targetX >= jumpRef.current.startX ? 1 : -1);
        } else {
          // Descending phase back to ground (0.5 -> 1.0)
          const tDescent = (progress - 0.5) * 2; // 0 to 1
          const easeDescent = tDescent * tDescent; // Quadratic gravity pull

          currentDogX = jumpRef.current.targetX + (jumpRef.current.landX - jumpRef.current.targetX) * tDescent;
          currentDogY = jumpRef.current.targetY + (GROUND_Y - jumpRef.current.targetY) * easeDescent;

          tilt = Math.sin((1 - tDescent) * Math.PI) * 10 * (jumpRef.current.targetX >= jumpRef.current.startX ? 1 : -1);
        }

        // Clamp so dog never sinks below GROUND_Y
        currentDogY = Math.min(GROUND_Y, currentDogY);

        dogRef.current.x = currentDogX;
        dogRef.current.y = currentDogY;

        setDogPos((prev) => ({
          ...prev,
          x: currentDogX,
          y: currentDogY,
          rotation: tilt,
        }));

        if (progress >= 1) {
          jumpRef.current.active = false;
          dogRef.current.x = jumpRef.current.landX;
          dogRef.current.y = GROUND_Y;
          dogRef.current.isJumping = false;
          setDogPos((prev) => ({
            ...prev,
            x: jumpRef.current.landX,
            y: GROUND_Y,
            rotation: 0,
            isJumping: false,
          }));
          currentDogY = GROUND_Y;
        }
      }

      // Update flying bone trajectory and airborne hit detection
      // User requirements:
      // - "bone shouldn't float at one place in air."
      // - "it should come from left going to right side if dog is in the right side of the screen center"
      // - "and should come from the right side going to the left if dog is in the left side of the screen."
      // - "if the dog could not hit the bone in air then bone doesnt count."
      if (boneFlightRef.current.active) {
        const elapsed = currentTime - boneFlightRef.current.startTime;
        const progress = elapsed / boneFlightRef.current.duration;

        if (progress < 1.0) {
          const startX = boneFlightRef.current.startX;
          const endX = boneFlightRef.current.endX;
          const currentBoneX = startX + (endX - startX) * progress;

          const startY = boneFlightRef.current.startY;
          const endY = boneFlightRef.current.endY;
          const lineY = startY + (endY - startY) * progress;
          const arcLift = (lineY - boneFlightRef.current.peakY) * 4 * progress * (1 - progress);
          const currentBoneY = lineY - Math.max(0, arcLift);

          const rotation = progress * 720 * (boneFlightRef.current.direction === 'left-to-right' ? 1 : -1);

          boneRef.current = {
            x: currentBoneX,
            y: currentBoneY,
            rotation,
            visible: true,
            direction: boneFlightRef.current.direction,
          };

          setBonePos({
            x: currentBoneX,
            y: currentBoneY,
            rotation,
            visible: true,
            direction: boneFlightRef.current.direction,
          });

          // Check if dog intercepts and hits bone in mid-air
          const dogBodyCenterY = currentDogY - 70;
          const distToBone = Math.hypot(currentDogX - currentBoneX, dogBodyCenterY - currentBoneY);

          if (distToBone < 140) {
            // SUCCESSFUL MID-AIR CATCH!
            boneFlightRef.current.active = false;
            boneRef.current.visible = false;
            setBonePos((prev) => ({ ...prev, visible: false }));

            const nextTotal = totalBonesRef.current + 1;
            const nextStack = boneStackRef.current + 1;

            setTotalBones(nextTotal);
            onUpdateHighScore(nextTotal);

            // User requirement: "after 10 bones +1 achievement and reset bone collection stack for the next 10 bones for next achievement."
            // User requirement: "change the dog avatar to new random dog image at each achievement."
            if (nextStack >= BONES_PER_ACHIEVEMENT) {
              // RESET stack to 0 for the next 10 bones!
              setBoneStack(0);

              const nextAch = achievementsRef.current + 1;
              setCurrentAchievements(nextAch);
              onUpdateAchievements(nextAch);

              // User requirement: "generate a new breed at each trophy"
              const { nextAvatar: nextDogAvatar, updatedUsedIds } = getNextUniqueDogAvatar(
                dogAvatarRef.current.id,
                usedAvatarIdsRef.current,
                nextAch
              );
              usedAvatarIdsRef.current = updatedUsedIds;
              setUsedAvatarIds(updatedUsedIds);
              try {
                localStorage.setItem(UNLOCKED_AVATARS_STORAGE_KEY, JSON.stringify(updatedUsedIds));
              } catch {}

              setCurrentDogAvatar(nextDogAvatar);
              dogAvatarRef.current = nextDogAvatar;
              onUpdateDogAvatar?.(nextDogAvatar);

              audioManager.playAchievementSound();
              audioManager.playBarkSound();

              createSparkles(currentBoneX, currentBoneY, true, nextDogAvatar.emoji);

              setAchievementBanner({
                id: Date.now(),
                level: nextAch,
                text: `🏆 +1 ACHIEVEMENT UNLOCKED! (#${nextAch})`,
                dogAvatarId: nextDogAvatar.id,
                dogName: nextDogAvatar.name,
                dogBreed: nextDogAvatar.breed,
                dogEmoji: nextDogAvatar.emoji,
                dogTitle: nextDogAvatar.title,
                dogAccentColor: nextDogAvatar.accentColor,
                collectionCount: updatedUsedIds.length,
                totalBreeds: DOG_AVATARS.length,
              });

              // Trigger AI Generation for new achievement (Full SVG Vector Avatar Body)
              setModalAchievementLevel(nextAch);
              setModalDogAvatar(nextDogAvatar);
              setModalAiSvg(null);
              setIsGeneratingModalAiSvg(true);
              setShowAchievementModal(true);

              // Asynchronously request AI full SVG vector avatar body
              generateDogAchievementSvg(nextDogAvatar, nextAch)
                .then((result) => {
                  setModalAiSvg(result.svg);
                  setIsGeneratingModalAiSvg(false);

                  // Dynamically update the active dog avatar body to the generated vector SVG body
                  const updatedAvatarWithSvgBody: DogAvatar = {
                    ...nextDogAvatar,
                    customSvg: result.svg,
                  };
                  setCurrentDogAvatar(updatedAvatarWithSvgBody);
                  dogAvatarRef.current = updatedAvatarWithSvgBody;
                  onUpdateDogAvatar?.(updatedAvatarWithSvgBody);
                })
                .catch(() => {
                  setIsGeneratingModalAiSvg(false);
                });

              setTimeout(() => {
                setAchievementBanner(null);
              }, 3200);
            } else {
              // Increment stack count toward 10
              setBoneStack(nextStack);
              audioManager.playBoneCollectSound();
              audioManager.playBarkSound();
              createSparkles(currentBoneX, currentBoneY, false);
            }

            setDogPos((prev) => ({ ...prev, barking: true }));
            setTimeout(() => {
              setDogPos((prev) => ({ ...prev, barking: false }));
            }, 450);

            // Throw next bone across the screen after delay
            setTimeout(() => {
              throwNewBone(dogRef.current.x);
            }, 500);
          }
        } else {
          // Bone flew completely across without dog hitting it!
          // User requirement: "if the dog could not hit the bone in air then bone doesnt count."
          boneFlightRef.current.active = false;
          boneRef.current.visible = false;
          setBonePos((prev) => ({ ...prev, visible: false }));

          // Spawn miss indicator and audio effect
          const missX = boneFlightRef.current.direction === 'left-to-right' ? GAME_WIDTH - 220 : 220;
          const newText: FloatingText = {
            id: getUniqueTextId(),
            x: missX,
            y: 420,
            text: '💨 Missed!',
            opacity: 1,
            scale: 1.15,
            vy: -3.0,
          };
          setFloatingTexts((prev) => [...prev, newText]);

          // Automatically launch the next bone
          setTimeout(() => {
            throwNewBone(dogRef.current.x);
          }, 450);
        }
      }

      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.16,
            life: p.life + 1,
            alpha: 1 - p.life / p.maxLife,
            rotation: p.rotation + 4,
          }))
          .filter((p) => p.life < p.maxLife)
      );

      // Update floating texts
      setFloatingTexts((prev) =>
        prev
          .map((t) => ({
            ...t,
            y: t.y + t.vy,
            opacity: t.opacity - 0.02,
            scale: t.scale + 0.01,
          }))
          .filter((t) => t.opacity > 0)
      );

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [onUpdateHighScore, onUpdateAchievements, throwNewBone]);

  const handleRestart = () => {
    setBoneStack(0);
    setTotalBones(0);
    setDogPos({
      x: GAME_WIDTH / 2,
      y: GROUND_Y,
      rotation: 0,
      scaleX: 1,
      isJumping: false,
      barking: false,
    });
    setParticles([]);
    setFloatingTexts([]);
    setAchievementBanner(null);
    setTimeout(() => {
      throwNewBone(GAME_WIDTH / 2);
    }, 350);
  };

  // Requirement 7: Show the score with bone emoji (example: score 3 will show 3 bones)
  // Stack resets every 10 bones for the next achievement
  const renderBoneStackEmojis = () => {
    if (boneStack === 0) {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2 py-0.5 flex-wrap">
          <span className="text-green-900/70 text-[11px] sm:text-xs md:text-sm font-bold">
            {totalBones === 0
              ? 'Tap anywhere to jump & catch bones!'
              : '🎯 Stack reset! Catch 10 bones for next trophy!'}
          </span>
          {/* 10 Empty slot indicators */}
          <div className="flex gap-0.5 sm:gap-1 opacity-30">
            {Array.from({ length: BONES_PER_ACHIEVEMENT }).map((_, i) => (
              <span key={`empty-initial-slot-${i}`} className="text-xs sm:text-sm">⚪</span>
            ))}
          </div>
        </div>
      );
    }

    const bones = Array.from({ length: boneStack });

    return (
      <div className="flex items-center flex-wrap gap-1 sm:gap-2">
        {bones.map((_, i) => (
          <span
            key={`filled-bone-icon-${i}`}
            className="text-xl sm:text-2xl md:text-3xl drop-shadow-sm transform hover:scale-125 transition-transform"
          >
            🦴
          </span>
        ))}
        {/* Remaining slots dots */}
        {boneStack < BONES_PER_ACHIEVEMENT && (
          <div className="flex items-center gap-0.5 sm:gap-1 ml-0.5 opacity-25">
            {Array.from({ length: BONES_PER_ACHIEVEMENT - boneStack }).map((_, i) => (
              <span key={`unfilled-remaining-slot-${i}`} className="text-xs sm:text-sm select-none">⚪</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Requirement: Shadow size and position update according to dog position on screen
  // - Position X follows dog's X coordinate in real time to stay directly beneath the dog
  // - Position Y stays anchored to ground plane (GROUND_Y)
  // - Size decreases when dog is in the air (altitude increases)
  // - Opacity softens and blur increases with altitude for natural perspective
  const altitude = Math.max(0, GROUND_Y - dogPos.y); // 0 when on ground, up to ~750 at high jump peak
  const maxJumpAltitude = GROUND_Y - 180;
  const jumpAltitudeRatio = Math.min(1, altitude / maxJumpAltitude);

  // Shadow scales down from 100% on ground down to 35% at peak leap
  const shadowScale = 1 - jumpAltitudeRatio * 0.65;
  const currentShadowWidth = Math.max(36, 195 * shadowScale);
  const currentShadowHeight = Math.max(7, 28 * shadowScale);

  // Shadow opacity fades as dog jumps higher into the air
  const currentShadowOpacity = Math.max(0.12, 0.55 * (1 - jumpAltitudeRatio * 0.72));

  // Blur softens dynamically as dog rises off the grass
  const currentShadowBlur = 2 + jumpAltitudeRatio * 7;

  return (
    <div
      id="gameplay-container"
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden cursor-crosshair touch-none bg-[#A8D18D]"
      onClick={handleCanvasTouchOrClick}
      onTouchStart={handleCanvasTouchOrClick}
    >
      {/* Geometric Dot Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none geometric-dot-bg" />

      {/* Responsive Viewport Container */}
      <div
        id="game-world"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Geometric Balance Lane Guidelines */}
        <div className="absolute inset-y-0 left-[20%] right-[20%] border-x-4 border-dashed border-green-800/15 pointer-events-none" />

        {/* User Tap/Click Target Ripples */}
        {tapRipples.map((ripple) => (
          <div
            key={`tap-ripple-${ripple.id}`}
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${(ripple.x / GAME_WIDTH) * 100}%`,
              top: `${(ripple.y / GAME_HEIGHT) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Outer expanding ring */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/70 animate-ping" />
            {/* Center target dot */}
            <div className="absolute inset-0 m-auto w-4 h-4 bg-white/90 rounded-full shadow-md" />
          </div>
        ))}

        {/* Ground Floor Visual Strip */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none border-t-4 border-[#8BC34A]/40 bg-[#98C27E]/40"
          style={{
            top: `${(GROUND_Y / GAME_HEIGHT) * 100}%`,
          }}
        >
          {/* Jump Area Indicator Bar */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-black/10 px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black text-green-950/60 uppercase tracking-widest shadow-xs">
              Grass Ground • Tap anywhere to leap
            </div>
          </div>
        </div>

        {/* Flying Bone Target */}
        {bonePos.visible && (
          <>
            {/* Flying Bone Ground Shadow for depth perception */}
            <div
              id="flying-bone-shadow"
              className="absolute z-10 pointer-events-none"
              style={{
                left: `${(bonePos.x / GAME_WIDTH) * 100}%`,
                top: `${(GROUND_Y / GAME_HEIGHT) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '14px',
                backgroundColor: 'rgba(14, 48, 18, 0.35)',
                borderRadius: '50%',
                filter: 'blur(3px)',
                opacity: Math.max(0.1, 0.45 - (GROUND_Y - bonePos.y) / 1200),
              }}
            />

            {/* Flying Bone Airborne Element with Flight Trail and Rotation */}
            <div
              id="bone-target"
              className="absolute z-20 pointer-events-none"
              style={{
                left: `${(bonePos.x / GAME_WIDTH) * 100}%`,
                top: `${(bonePos.y / GAME_HEIGHT) * 100}%`,
                transform: `translate(-50%, -50%) rotate(${bonePos.rotation}deg)`,
              }}
            >
              <div className="relative group flex items-center justify-center">
                {/* Wind / speed streaks behind the bone in flight */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-14 h-5 bg-gradient-to-r from-yellow-300/40 to-transparent rounded-full blur-xs pointer-events-none ${
                    bonePos.direction === 'left-to-right'
                      ? '-left-8 rotate-0'
                      : '-right-8 rotate-180'
                  }`}
                />

                {/* Bone Glow Aura */}
                <div className="absolute -inset-4 bg-[#8BC34A]/35 rounded-full blur-md animate-pulse pointer-events-none" />
                <div className="absolute -inset-2 bg-yellow-300/40 rounded-full blur-xs pointer-events-none" />

                {/* Bone Emoji */}
                <div className="text-6xl sm:text-8xl md:text-9xl drop-shadow-[0_12px_14px_rgba(0,0,0,0.25)] select-none">
                  🦴
                </div>
              </div>
            </div>
          </>
        )}

        {/* Dynamic Dog Shadow: Always directly beneath dog on the ground plane */}
        <div
          id="dog-shadow"
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${(dogPos.x / GAME_WIDTH) * 100}%`,
            top: `${(GROUND_Y / GAME_HEIGHT) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: `${currentShadowWidth}px`,
            height: `${currentShadowHeight}px`,
            backgroundColor: 'rgba(14, 48, 18, 0.55)',
            borderRadius: '50%',
            filter: `blur(${currentShadowBlur}px)`,
            opacity: currentShadowOpacity,
          }}
        />

        {/* Dog Player (Synchronously tracks dog position with zero-lag origin) */}
        <div
          id="dog-player"
          className="absolute z-30 pointer-events-none flex flex-col items-center justify-center"
          style={{
            left: `${(dogPos.x / GAME_WIDTH) * 100}%`,
            top: `${(dogPos.y / GAME_HEIGHT) * 100}%`,
            transform: `translate(-50%, -100%) scaleX(${dogPos.isJumping ? 1 : dogPos.scaleX}) rotate(${dogPos.isJumping ? 0 : dogPos.rotation}deg)`,
            transformOrigin: '50% 100%',
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Bark Speech Bubble with dog-specific bark text */}
            {dogPos.barking && (
              <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 bg-white text-green-950 font-black text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg border-2 border-[#8BC34A] whitespace-nowrap animate-bounce z-40">
                {currentDogAvatar.barkSound}
              </div>
            )}

            {/* Dog Avatar Full Body Image - centered and grounded */}
            <div
              key={currentDogAvatar.id + (currentDogAvatar.customSvg || '') + (currentDogAvatar.customImageUrl || '')}
              className={`w-36 h-30 sm:w-52 sm:h-40 md:w-60 md:h-44 flex items-center justify-center drop-shadow-2xl transition-transform duration-200 ${
                dogPos.isJumping ? 'scale-105' : 'hover:scale-105 animate-in zoom-in-90'
              }`}
            >
              <FullBodyDogImage
                avatarId={currentDogAvatar.id}
                customImageUrl={currentDogAvatar.customImageUrl}
                customSvg={currentDogAvatar.customSvg}
                size={220}
                animated
                jumping={dogPos.isJumping}
              />
            </div>
          </div>
        </div>

        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute z-40 pointer-events-none font-bold select-none"
            style={{
              left: `${(p.x / GAME_WIDTH) * 100}%`,
              top: `${(p.y / GAME_HEIGHT) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              fontSize: `${p.size}px`,
              opacity: p.alpha,
            }}
          >
            {p.char || '✨'}
          </div>
        ))}

        {/* Floating texts (+1 BONE / +1 ACHIEVEMENT) */}
        {floatingTexts.map((t) => (
          <div
            key={t.id}
            className="absolute z-40 pointer-events-none font-black text-green-950 bg-white border-2 border-[#8BC34A] px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-lg whitespace-nowrap select-none text-sm sm:text-base"
            style={{
              left: `${(t.x / GAME_WIDTH) * 100}%`,
              top: `${(t.y / GAME_HEIGHT) * 100}%`,
              transform: `translate(-50%, -50%) scale(${t.scale})`,
              opacity: t.opacity,
            }}
          >
            {t.text}
          </div>
        ))}

        {/* +1 Achievement Unlocked Banner with Full Body Dog Image */}
        {achievementBanner && (
          <div className="absolute top-16 sm:top-20 inset-x-2 sm:inset-x-8 z-50 pointer-events-none flex flex-col items-center animate-bounce">
            <div className="px-4 sm:px-8 py-4 sm:py-6 bg-[#2E7D32] text-white font-black rounded-3xl sm:rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-3 sm:border-4 border-yellow-300 flex flex-col items-center gap-3 sm:gap-4 text-center max-w-sm sm:max-w-xl w-full">
              <div className="flex items-center gap-2 sm:gap-3">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 fill-yellow-300 animate-spin" />
                <span className="text-yellow-300 text-sm sm:text-xl uppercase tracking-widest font-black">
                  Stack 10/10 Completed!
                </span>
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 fill-yellow-300 animate-spin" />
              </div>

              <div className="text-base sm:text-2xl font-black">{achievementBanner.text}</div>

              {/* Requirement: "dog avatar at new achievement must be a full body dog image." */}
              {achievementBanner.dogBreed && (
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/95 text-green-950 p-3 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-yellow-300 shadow-xl w-full max-w-md">
                  {/* Full Body Dog Image Container */}
                  <div className="w-28 h-22 sm:w-36 sm:h-28 bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 border border-green-200 shadow-inner shrink-0 relative overflow-hidden">
                    <div className="absolute -inset-2 bg-yellow-200/30 rounded-full blur-sm" />
                    <FullBodyDogImage
                      avatarId={achievementBanner.dogAvatarId}
                      size={110}
                      animated
                    />
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] sm:text-xs uppercase tracking-wider font-extrabold text-amber-700">
                      <span>🎉</span>
                      <span>Full Body Dog Unlocked!</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-green-950 leading-tight mt-0.5">
                      {achievementBanner.dogName && <span className="text-green-800">{achievementBanner.dogName} the </span>}
                      {achievementBanner.dogBreed}
                    </div>
                    <div className="text-xs text-green-800 font-bold mt-0.5 flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                      <span>{achievementBanner.dogTitle}</span>
                      {achievementBanner.collectionCount && (
                        <span className="bg-yellow-400 text-yellow-950 px-2 py-0.5 rounded-full font-black text-[9px] sm:text-[10px] shadow-xs">
                          Breed #{achievementBanner.collectionCount}/{achievementBanner.totalBreeds}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-green-100 text-[11px] sm:text-sm font-semibold">
                Bone stack reset! Catch next 10 bones for Trophy #{achievementBanner.level + 1}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top HUD Overlay (Score at Top-Left & Controls at Top-Right) */}
      <header className="relative z-50 flex items-start justify-between w-full p-2.5 sm:p-4 md:p-6 pointer-events-auto">
        {/* Score at top-left with bone emoji stack + Achievements + Active Dog Breed */}
        <div
          id="game-score-display"
          className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3.5 shadow-md sm:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b-2 sm:border-b-4 border-green-700/20 flex flex-col items-start gap-1.5 max-w-[72vw] sm:max-w-xl"
        >
          {/* Stack & Achievement & Dog Breed Meta Bar */}
          <div className="flex flex-wrap items-center justify-between w-full gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-green-800">
                Stack ({boneStack}/{BONES_PER_ACHIEVEMENT})
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Active Dog Avatar Badge */}
              <div
                id="active-dog-badge"
                className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black border shadow-xs ${currentDogAvatar.badgeBg}`}
                title={`Active Dog: ${currentDogAvatar.name} the ${currentDogAvatar.breed}`}
              >
                <div className="w-5 h-4 sm:w-6 sm:h-5 flex items-center justify-center overflow-hidden">
                  <FullBodyDogImage avatarId={currentDogAvatar.id} size={24} />
                </div>
                <span className="truncate max-w-[80px] sm:max-w-none">{currentDogAvatar.breed}</span>
              </div>

              {/* Achievements Counter Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-amber-100/80 border border-amber-300 rounded-full text-amber-900 shadow-xs">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 fill-amber-500" />
                <span className="text-[10px] sm:text-xs font-black">
                  {currentAchievements}
                </span>
              </div>
            </div>
          </div>

          {/* Bone Emoji Tray */}
          <div id="bone-emoji-tray" className="w-full">
            {renderBoneStackEmojis()}
          </div>

          {/* Total Bones Subtitle */}
          <div className="text-[9px] sm:text-[10px] text-green-800/70 font-bold tracking-wide">
            Total Caught: <span className="text-green-950 font-black">{totalBones}</span>
          </div>
        </div>

        {/* Top-Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* AI Image Studio Button */}
          <button
            id="gameplay-ai-studio-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              audioManager.playClickSound();
              setShowAiStudioModal(true);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2.5 sm:px-4 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border-b-2 sm:border-b-4 border-purple-900/30 active:translate-y-0.5 sm:active:translate-y-1 active:border-b-0 transition-all cursor-pointer min-h-[40px]"
            title="Dog AI Image Studio"
            aria-label="Dog AI Image Studio"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-spin" />
            <span className="hidden sm:inline text-xs sm:text-sm font-black uppercase tracking-widest text-yellow-200">
              AI Dog Art
            </span>
          </button>

          {/* Quick Map Button */}
          <button
            id="gameplay-map-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              audioManager.playClickSound();
              setShowMapModal(true);
            }}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 sm:px-4 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border-b-2 sm:border-b-4 border-emerald-700/20 active:translate-y-0.5 sm:active:translate-y-1 active:border-b-0 transition-all cursor-pointer min-h-[40px]"
            title="Open High Score Map"
            aria-label="Open High Score Map"
          >
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-pulse" />
            <span className="hidden sm:inline text-xs sm:text-sm font-black text-emerald-700 uppercase tracking-widest">
              Map
            </span>
          </button>

          {/* Sound Toggle */}
          <SoundToggle id="gameplay-sound-toggle" />

          {/* Exit Button */}
          <button
            id="gameplay-exit-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              audioManager.playClickSound();
              setShowExitModal(true);
            }}
            className="group flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border-b-2 sm:border-b-4 border-red-700/20 active:translate-y-0.5 sm:active:translate-y-1 active:border-b-0 transition-all cursor-pointer min-h-[40px]"
            title="Exit Game"
            aria-label="Exit Game"
          >
            <span className="hidden sm:inline text-xs sm:text-sm font-black text-red-600 uppercase tracking-widest">
              Exit
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs">
              ✕
            </div>
          </button>
        </div>
      </header>

      {/* AI Vector Art Body Generation on New Achievement Modal */}
      <AchievementUnlockedModal
        isOpen={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
        achievementLevel={modalAchievementLevel}
        dogAvatar={modalDogAvatar}
        aiSvg={modalAiSvg}
        isGeneratingAiSvg={isGeneratingModalAiSvg}
        collectionCount={usedAvatarIds.length}
        totalBreeds={DOG_AVATARS.length}
        onEquipDogAvatar={(avatar) => {
          setCurrentDogAvatar(avatar);
          dogAvatarRef.current = avatar;
          onUpdateDogAvatar?.(avatar);
        }}
        onRegenerateAiSvg={() => {
          setIsGeneratingModalAiSvg(true);
          generateDogAchievementSvg(modalDogAvatar, modalAchievementLevel)
            .then((result) => {
              setModalAiSvg(result.svg);
              setIsGeneratingModalAiSvg(false);
              const updated = { ...modalDogAvatar, customSvg: result.svg, customImageUrl: undefined };
              setCurrentDogAvatar(updated);
              dogAvatarRef.current = updated;
              onUpdateDogAvatar?.(updated);
            })
            .catch(() => {
              setIsGeneratingModalAiSvg(false);
            });
        }}
      />

      {/* Dog AI Image Studio Modal */}
      <DogAiStudioModal
        isOpen={showAiStudioModal}
        onClose={() => setShowAiStudioModal(false)}
        currentDogAvatar={currentDogAvatar}
        achievements={currentAchievements}
        onSelectDogAvatar={(avatar) => {
          setCurrentDogAvatar(avatar);
          onUpdateDogAvatar?.(avatar);
        }}
      />

      {/* High Score Adventure Map Modal */}
      <HighScoreMapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        userHighScore={Math.max(highScore, totalBones)}
        userAchievements={currentAchievements}
        currentDogAvatar={currentDogAvatar}
      />

      {/* Exit / Pause Modal */}
      <ExitModal
        score={totalBones}
        highScore={highScore}
        achievements={currentAchievements}
        dogEmoji={currentDogAvatar.emoji}
        dogAvatarId={currentDogAvatar.id}
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onRestartGame={handleRestart}
        onConfirmExitToMenu={() => {
          setShowExitModal(false);
          onExitToMenu();
        }}
      />
    </div>
  );
}
