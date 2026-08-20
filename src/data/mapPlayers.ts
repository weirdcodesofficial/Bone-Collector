export interface MapPlayer {
  id: string;
  name: string;
  score: number;
  achievements: number;
  avatarId: string;
  avatarUrl?: string; // custom profile pic / favicon URL
  countryEmoji?: string;
  title: string;
  isCurrentUser?: boolean;
  color: string;
}

export interface MapMilestoneZone {
  id: string;
  name: string;
  scoreRequirement: number;
  icon: string;
  bgGradient: string;
  description: string;
}

export const MAP_ZONES: MapMilestoneZone[] = [
  {
    id: 'zone-1',
    name: 'Puppy Meadow',
    scoreRequirement: 0,
    icon: '🌿',
    bgGradient: 'from-emerald-500 to-green-600',
    description: 'Where every pup takes their very first leaping steps!',
  },
  {
    id: 'zone-2',
    name: 'Whispering Forest',
    scoreRequirement: 15,
    icon: '🌲',
    bgGradient: 'from-green-600 to-teal-700',
    description: 'Bones fly fast between tall pine trees and mossy logs.',
  },
  {
    id: 'zone-3',
    name: 'Bone Ridge Summit',
    scoreRequirement: 35,
    icon: '🏔️',
    bgGradient: 'from-amber-600 to-orange-600',
    description: 'High altitudes test your dog balance and leap accuracy!',
  },
  {
    id: 'zone-4',
    name: 'Golden Paw Pavilion',
    scoreRequirement: 65,
    icon: '🏰',
    bgGradient: 'from-yellow-500 to-amber-600',
    description: 'A grand sanctuary for dedicated bone collectors.',
  },
  {
    id: 'zone-5',
    name: 'Crystal Bone Cavern',
    scoreRequirement: 100,
    icon: '💎',
    bgGradient: 'from-indigo-500 to-purple-600',
    description: 'Sparkling crystals and master-level aerial acrobats.',
  },
  {
    id: 'zone-6',
    name: 'Canine Olympus',
    scoreRequirement: 150,
    icon: '👑',
    bgGradient: 'from-purple-600 to-rose-600',
    description: 'The celestial realm of legendary Champion pups!',
  },
];

export const BASE_COMMUNITY_PLAYERS: Omit<MapPlayer, 'isCurrentUser'>[] = [
  {
    id: 'player-1',
    name: 'Luna Star',
    score: 184,
    achievements: 18,
    avatarId: 'samoyed',
    countryEmoji: '🇨🇦',
    title: 'Grand Champion',
    color: '#0EA5E9',
  },
  {
    id: 'player-2',
    name: 'Maximus Bone',
    score: 142,
    achievements: 14,
    avatarId: 'husky',
    countryEmoji: '🇺🇸',
    title: 'Acrobat Prodigy',
    color: '#6366F1',
  },
  {
    id: 'player-3',
    name: 'Bella Paws',
    score: 118,
    achievements: 11,
    avatarId: 'poodle',
    countryEmoji: '🇫🇷',
    title: 'Bone Aristocrat',
    color: '#EC4899',
  },
  {
    id: 'player-4',
    name: 'Charlie Arf',
    score: 95,
    achievements: 9,
    avatarId: 'beagle',
    countryEmoji: '🇬🇧',
    title: 'Trail Master',
    color: '#8B5CF6',
  },
  {
    id: 'player-5',
    name: 'Rocky Jumper',
    score: 76,
    achievements: 7,
    avatarId: 'boxer',
    countryEmoji: '🇩🇪',
    title: 'Sky Leaper',
    color: '#EF4444',
  },
  {
    id: 'player-6',
    name: 'Milo Joy',
    score: 62,
    achievements: 6,
    avatarId: 'puppy',
    countryEmoji: '🇦🇺',
    title: 'Meadow Scout',
    color: '#3B82F6',
  },
  {
    id: 'player-7',
    name: 'Hachi Doge',
    score: 48,
    achievements: 4,
    avatarId: 'shiba',
    countryEmoji: '🇯🇵',
    title: 'Much Wow Hunter',
    color: '#EA580C',
  },
  {
    id: 'player-8',
    name: 'Biscuit Stumps',
    score: 36,
    achievements: 3,
    avatarId: 'corgi',
    countryEmoji: '🇬🇧',
    title: 'Royal Sprinter',
    color: '#D97706',
  },
  {
    id: 'player-9',
    name: 'Pongo Dot',
    score: 28,
    achievements: 2,
    avatarId: 'dalmatian',
    countryEmoji: '🇮🇹',
    title: 'Fast Catcher',
    color: '#10B981',
  },
  {
    id: 'player-10',
    name: 'Pierre Bark',
    score: 19,
    achievements: 1,
    avatarId: 'frenchie',
    countryEmoji: '🇧🇪',
    title: 'Snack Patrol',
    color: '#7C3AED',
  },
  {
    id: 'player-11',
    name: 'Noodle Dash',
    score: 12,
    achievements: 1,
    avatarId: 'dachshund',
    countryEmoji: '🇳🇱',
    title: 'Grass Runner',
    color: '#B45309',
  },
  {
    id: 'player-12',
    name: 'Otis Roll',
    score: 6,
    achievements: 0,
    avatarId: 'pug',
    countryEmoji: '🇪🇸',
    title: 'Cute Rookie',
    color: '#0284C7',
  },
];

export const TOTAL_COMMUNITY_PLAYERS_COUNT = 3482;

export const USER_NAME_KEY = 'bone_collector_user_name';
export const USER_AVATAR_URL_KEY = 'bone_collector_user_avatar_url';

export function getUserCustomProfile(): { name: string; avatarUrl: string; isGoogleAccount?: boolean; email?: string } {
  try {
    const googleRaw = localStorage.getItem('bone_collector_google_user');
    if (googleRaw) {
      const parsed = JSON.parse(googleRaw);
      if (parsed?.name) {
        return {
          name: parsed.name,
          avatarUrl: parsed.picture || '',
          isGoogleAccount: true,
          email: parsed.email || '',
        };
      }
    }

    const name = localStorage.getItem(USER_NAME_KEY) || 'You (Player Pup)';
    const avatarUrl = localStorage.getItem(USER_AVATAR_URL_KEY) || '';
    return { name, avatarUrl, isGoogleAccount: false };
  } catch {
    return { name: 'You (Player Pup)', avatarUrl: '', isGoogleAccount: false };
  }
}

export function saveUserCustomProfile(name: string, avatarUrl: string) {
  try {
    localStorage.setItem(USER_NAME_KEY, name.trim() || 'You (Player Pup)');
    localStorage.setItem(USER_AVATAR_URL_KEY, avatarUrl.trim());
  } catch {}
}
