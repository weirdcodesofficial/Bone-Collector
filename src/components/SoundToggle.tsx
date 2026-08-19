import { useState, useEffect, type MouseEvent } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface SoundToggleProps {
  id?: string;
  className?: string;
}

export function SoundToggle({ id = 'sound-toggle-btn', className = '' }: SoundToggleProps) {
  const [isMuted, setIsMuted] = useState(audioManager.getIsMuted());

  useEffect(() => {
    setIsMuted(audioManager.getIsMuted());
  }, []);

  const toggleSound = (e: MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    audioManager.setMuted(next);
    if (!next) {
      audioManager.playClickSound();
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={toggleSound}
      className={`p-3 sm:p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border-b-4 border-green-700/20 text-green-900 active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center cursor-pointer ${className}`}
      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
    >
      {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
    </button>
  );
}
