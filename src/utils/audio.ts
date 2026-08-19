/**
 * Audio manager handling both /audio/*.mp3 file playback and Web Audio API synthesized fallbacks
 * for background music loops and game sound effects.
 */

class AudioManager {
  private ctx: AudioContext | null = null;
  private bgmAudioElement: HTMLAudioElement | null = null;
  private isBgmPlaying: boolean = false;
  private isMuted: boolean = false;
  private synthBgmInterval: number | null = null;
  private synthNoteIndex: number = 0;

  constructor() {
    // Attempt to set up html5 audio for /audio/bgm.mp3 if present
    if (typeof window !== 'undefined') {
      try {
        this.bgmAudioElement = new Audio('/audio/bgm.mp3');
        this.bgmAudioElement.loop = true;
        this.bgmAudioElement.volume = 0.4;
      } catch {
        // Fall back to Web Audio synth
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.bgmAudioElement) {
      this.bgmAudioElement.muted = muted;
    }
    if (muted && this.synthBgmInterval) {
      this.stopSynthBgm();
    } else if (!muted && this.isBgmPlaying && !this.synthBgmInterval) {
      this.startSynthBgm();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public startBGM() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // First try playing /audio/bgm.mp3
    if (this.bgmAudioElement && !this.isMuted) {
      const playPromise = this.bgmAudioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Successfully playing mp3
          })
          .catch(() => {
            // If mp3 fails to load or 404s, seamlessly switch to synthesized playful marimba background loop
            this.startSynthBgm();
          });
      } else {
        this.startSynthBgm();
      }
    } else {
      this.startSynthBgm();
    }
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmAudioElement) {
      try {
        this.bgmAudioElement.pause();
        this.bgmAudioElement.currentTime = 0;
      } catch {}
    }
    this.stopSynthBgm();
  }

  private startSynthBgm() {
    if (this.synthBgmInterval !== null || this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Upbeat, cute pentatonic background melody
    const melody = [
      { note: 261.63, dur: 0.18 }, // C4
      { note: 329.63, dur: 0.18 }, // E4
      { note: 392.00, dur: 0.18 }, // G4
      { note: 523.25, dur: 0.22 }, // C5
      { note: 392.00, dur: 0.18 }, // G4
      { note: 440.00, dur: 0.18 }, // A4
      { note: 523.25, dur: 0.28 }, // C5
      { note: 0, dur: 0.15 },      // Rest
      { note: 349.23, dur: 0.18 }, // F4
      { note: 392.00, dur: 0.18 }, // G4
      { note: 440.00, dur: 0.18 }, // A4
      { note: 392.00, dur: 0.22 }, // G4
      { note: 329.63, dur: 0.18 }, // E4
      { note: 293.66, dur: 0.22 }, // D4
      { note: 261.63, dur: 0.35 }, // C4
      { note: 0, dur: 0.25 },      // Rest
    ];

    this.synthNoteIndex = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const item = melody[this.synthNoteIndex % melody.length];
      this.synthNoteIndex++;

      if (item.note > 0) {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(item.note, ctx.currentTime);

          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + item.dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + item.dur);

          // Subtle soft bass pulse on every 4th note
          if (this.synthNoteIndex % 4 === 1) {
            const bass = ctx.createOscillator();
            const bassGain = ctx.createGain();
            bass.type = 'sine';
            bass.frequency.setValueAtTime(item.note / 2, ctx.currentTime);
            bassGain.gain.setValueAtTime(0.05, ctx.currentTime);
            bassGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
            bass.connect(bassGain);
            bassGain.connect(ctx.destination);
            bass.start();
            bass.stop(ctx.currentTime + 0.3);
          }
        } catch {}
      }

      this.synthBgmInterval = window.setTimeout(playNextNote, item.dur * 1000);
    };

    playNextNote();
  }

  private stopSynthBgm() {
    if (this.synthBgmInterval !== null) {
      clearTimeout(this.synthBgmInterval);
      this.synthBgmInterval = null;
    }
  }

  // Sound effect for bone collection (sparkly ding + happy crunch)
  public playBoneCollectSound() {
    if (this.isMuted) return;

    // Try playing mp3 if available
    try {
      const audio = new Audio('/audio/collect.mp3');
      audio.volume = 0.6;
      audio.play().catch(() => {
        this.synthesizeCollectSound();
      });
    } catch {
      this.synthesizeCollectSound();
    }
  }

  // Sound effect for +1 Achievement unlocked (every 10 bones)
  public playAchievementSound() {
    if (this.isMuted) return;

    try {
      const audio = new Audio('/audio/achievement.mp3');
      audio.volume = 0.7;
      audio.play().catch(() => {
        this.synthesizeAchievementFanfare();
      });
    } catch {
      this.synthesizeAchievementFanfare();
    }
  }

  // Sound effect for bone flying past / whoosh
  public playWhooshSound() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  // Sound effect for jumping
  public playJumpSound() {
    if (this.isMuted) return;

    try {
      const audio = new Audio('/audio/jump.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        this.synthesizeJumpSound();
      });
    } catch {
      this.synthesizeJumpSound();
    }
  }

  // Sound effect for dog bark
  public playBarkSound() {
    if (this.isMuted) return;

    try {
      const audio = new Audio('/audio/bark.mp3');
      audio.volume = 0.6;
      audio.play().catch(() => {
        this.synthesizeBarkSound();
      });
    } catch {
      this.synthesizeBarkSound();
    }
  }

  // Sound effect for UI clicks / buttons
  public playClickSound() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  private synthesizeCollectSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Arpeggio chime: G5 -> C6 -> E6
      const notes = [784, 1046.5, 1318.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.12, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.25);
      });

      // Quick happy crunch/pop burst
      const noiseGain = ctx.createGain();
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(450, now);
      osc2.frequency.exponentialRampToValueAtTime(900, now + 0.1);
      noiseGain.gain.setValueAtTime(0.1, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc2.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.12);
    } catch {}
  }

  private synthesizeJumpSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pitch slide up (boing!)
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  private synthesizeBarkSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Bark 'woof' waveform
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }

  private synthesizeAchievementFanfare() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Triumphant rising brass chords: C5, E5, G5, C6 with sustain & sparkle
      const notes = [
        { freq: 523.25, time: 0, dur: 0.18 },
        { freq: 659.25, time: 0.14, dur: 0.18 },
        { freq: 783.99, time: 0.28, dur: 0.22 },
        { freq: 1046.50, time: 0.44, dur: 0.65 },
        { freq: 1318.51, time: 0.50, dur: 0.60 },
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        gain.gain.setValueAtTime(0.18, now + n.time);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur);
      });
    } catch {}
  }
}

export const audioManager = new AudioManager();
