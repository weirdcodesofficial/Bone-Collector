export type GameState = 'START' | 'PLAYING' | 'PAUSED' | 'EXITED';

export interface Position {
  x: number;
  y: number;
}

export interface DogPlayer {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  jumpProgress: number; // 0 to 1
  isJumping: boolean;
  jumpDuration: number;
  direction: 'left' | 'right';
  scale: number;
  rotation: number;
  state: 'idle' | 'jumping' | 'eating' | 'celebrating';
}

export interface BoneItem {
  id: string;
  x: number;
  y: number;
  collected: boolean;
  spawnTime: number;
  floatOffset: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  char?: string;
  rotation: number;
  life: number;
  maxLife: number;
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  opacity: number;
  scale: number;
  vy: number;
}
