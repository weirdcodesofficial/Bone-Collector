export interface DogAvatar {
  id: string;
  name: string;
  breed: string;
  emoji: string;
  barkSound: string;
  title: string;
  accentColor: string;
  badgeBg: string;
}

export const DOG_AVATARS: DogAvatar[] = [
  {
    id: 'golden',
    name: 'Buddy',
    breed: 'Golden Retriever',
    emoji: '🐕',
    barkSound: 'WOOF! 🐕',
    title: 'Sunny Explorer',
    accentColor: '#F59E0B',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 'poodle',
    name: 'Coco',
    breed: 'Fluffy Poodle',
    emoji: '🐩',
    barkSound: 'YIP! 🐩',
    title: 'Fancy Dancer',
    accentColor: '#EC4899',
    badgeBg: 'bg-pink-100 text-pink-900 border-pink-300',
  },
  {
    id: 'puppy',
    name: 'Milo',
    breed: 'Joyful Puppy',
    emoji: '🐶',
    barkSound: 'ARF! 🐶',
    title: 'Playful Pup',
    accentColor: '#3B82F6',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    id: 'shiba',
    name: 'Hachi',
    breed: 'Shiba Inu',
    emoji: '🐕‍🦺',
    barkSound: 'BARK! 🐕‍🦺',
    title: 'Legendary Doge',
    accentColor: '#EA580C',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
  },
  {
    id: 'husky',
    name: 'Shadow',
    breed: 'Arctic Husky',
    emoji: '🐺',
    barkSound: 'AWOOO! 🐺',
    title: 'Snow Runner',
    accentColor: '#6366F1',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
  {
    id: 'corgi',
    name: 'Biscuit',
    breed: 'Welsh Corgi',
    emoji: '🐕',
    barkSound: 'YIP YIP! 🐕',
    title: 'Royal Stumpy',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 'dalmatian',
    name: 'Pongo',
    breed: 'Spotted Dalmatian',
    emoji: '🐾',
    barkSound: 'RUFF! 🐾',
    title: 'Firehouse Hero',
    accentColor: '#10B981',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    id: 'beagle',
    name: 'Charlie',
    breed: 'Cheery Beagle',
    emoji: '🐶',
    barkSound: 'BOW-WOW! 🐶',
    title: 'Bone Sniffer',
    accentColor: '#8B5CF6',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
  },
  {
    id: 'boxer',
    name: 'Rocky',
    breed: 'Brave Boxer',
    emoji: '🐕‍🦺',
    barkSound: 'BOOF! 🐕‍🦺',
    title: 'High Jumper',
    accentColor: '#EF4444',
    badgeBg: 'bg-red-100 text-red-900 border-red-300',
  },
  {
    id: 'bernard',
    name: 'Barnaby',
    breed: 'Alpine St. Bernard',
    emoji: '🐕',
    barkSound: 'WOOF WOOF! 🐕',
    title: 'Rescue Legend',
    accentColor: '#059669',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
  },
  {
    id: 'collie',
    name: 'Flash',
    breed: 'Border Collie',
    emoji: '🐕‍🦺',
    barkSound: 'YIP! 🐕‍🦺',
    title: 'Agility Master',
    accentColor: '#2563EB',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
  },
  {
    id: 'dachshund',
    name: 'Noodle',
    breed: 'Wiener Dachshund',
    emoji: '🐕',
    barkSound: 'ARF ARF! 🐕',
    title: 'Long & Speedy',
    accentColor: '#B45309',
    badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  },
  {
    id: 'frenchie',
    name: 'Pierre',
    breed: 'French Bulldog',
    emoji: '🐶',
    barkSound: 'SNORT-BARK! 🐶',
    title: 'Bat-Eared Champ',
    accentColor: '#7C3AED',
    badgeBg: 'bg-violet-100 text-violet-900 border-violet-300',
  },
  {
    id: 'shepherd',
    name: 'Rex',
    breed: 'German Shepherd',
    emoji: '🐕‍🦺',
    barkSound: 'WOOF-RUFF! 🐕‍🦺',
    title: 'Guardian Scout',
    accentColor: '#B91C1C',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
  },
  {
    id: 'pug',
    name: 'Otis',
    breed: 'Chubby Pug',
    emoji: '🐶',
    barkSound: 'GRUFF! 🐶',
    title: 'Curly-Tailed Jester',
    accentColor: '#0284C7',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
  },
  {
    id: 'samoyed',
    name: 'Blizzard',
    breed: 'Smiling Samoyed',
    emoji: '🐺',
    barkSound: 'HOWL-YIP! 🐺',
    title: 'Cloud Hopper',
    accentColor: '#0EA5E9',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    id: 'australian',
    name: 'Ziggy',
    breed: 'Aussie Shepherd',
    emoji: '🐕‍🦺',
    barkSound: 'ARF-WOOF! 🐕‍🦺',
    title: 'Sprint Champion',
    accentColor: '#0D9488',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    id: 'terrier',
    name: 'Jack',
    breed: 'Jack Russell',
    emoji: '🐶',
    barkSound: 'YAP-YAP! 🐶',
    title: 'Super Leaper',
    accentColor: '#CA8A04',
    badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  },
];

export const DEFAULT_DOG_AVATAR: DogAvatar = DOG_AVATARS[0];

export function getDogAvatarById(id?: string | null): DogAvatar {
  if (!id) return DEFAULT_DOG_AVATAR;
  const found = DOG_AVATARS.find((avatar) => avatar.id === id);
  return found || DEFAULT_DOG_AVATAR;
}

/**
 * Selects a new, non-repeating avatar for a new achievement.
 * Filters out all previously unlocked/seen avatar IDs so old avatars do not repeat.
 * If all avatars in the pool have been exhausted, resets history while ensuring
 * the current active avatar is never immediately repeated.
 */
export function getNextUniqueDogAvatar(
  currentId: string,
  usedIds: string[] = []
): { nextAvatar: DogAvatar; updatedUsedIds: string[] } {
  const currentSet = new Set(usedIds);
  currentSet.add(currentId);

  // Find all avatars that have NEVER been used in this achievement cycle
  let availableCandidates = DOG_AVATARS.filter((avatar) => !currentSet.has(avatar.id));

  let newUsedList: string[];

  // If all avatars have been unlocked/seen, start a fresh cycle without repeating current
  if (availableCandidates.length === 0) {
    availableCandidates = DOG_AVATARS.filter((avatar) => avatar.id !== currentId);
    newUsedList = [currentId];
  } else {
    newUsedList = Array.from(currentSet);
  }

  const randomIndex = Math.floor(Math.random() * availableCandidates.length);
  const selectedAvatar = availableCandidates[randomIndex] || DEFAULT_DOG_AVATAR;

  // Add the newly selected avatar to the used list
  if (!newUsedList.includes(selectedAvatar.id)) {
    newUsedList.push(selectedAvatar.id);
  }

  return {
    nextAvatar: selectedAvatar,
    updatedUsedIds: newUsedList,
  };
}

export function getRandomDifferentDogAvatar(currentId: string): DogAvatar {
  const candidates = DOG_AVATARS.filter((avatar) => avatar.id !== currentId);
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex] || DOG_AVATARS[0];
}
