export interface DogAvatar {
  id: string;
  name: string;
  breed: string;
  emoji: string;
  barkSound: string;
  title: string;
  accentColor: string;
  badgeBg: string;
  trophyRequired: number; // 0 for initial default, 1 to 29 for trophies 1..30
  customImageUrl?: string;
  customSvg?: string;
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
    trophyRequired: 0,
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
    trophyRequired: 1,
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
    trophyRequired: 2,
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
    trophyRequired: 3,
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
    trophyRequired: 4,
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
    trophyRequired: 5,
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
    trophyRequired: 6,
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
    trophyRequired: 7,
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
    trophyRequired: 8,
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
    trophyRequired: 9,
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
    trophyRequired: 10,
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
    trophyRequired: 11,
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
    trophyRequired: 12,
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
    trophyRequired: 13,
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
    trophyRequired: 14,
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
    trophyRequired: 15,
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
    trophyRequired: 16,
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
    trophyRequired: 17,
  },
  {
    id: 'labrador',
    name: 'Copper',
    breed: 'Chocolate Labrador',
    emoji: '🐕',
    barkSound: 'WOOF-WOOF! 🐕',
    title: 'River Swimmer',
    accentColor: '#78350F',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    trophyRequired: 18,
  },
  {
    id: 'rottweiler',
    name: 'Bruno',
    breed: 'Royal Rottweiler',
    emoji: '🐕‍🦺',
    barkSound: 'BOOF-RUFF! 🐕‍🦺',
    title: 'Gentle Giant',
    accentColor: '#1E293B',
    badgeBg: 'bg-slate-100 text-slate-900 border-slate-300',
    trophyRequired: 19,
  },
  {
    id: 'doberman',
    name: 'Duke',
    breed: 'Sleek Doberman',
    emoji: '🐕‍🦺',
    barkSound: 'RUFF! 🐕‍🦺',
    title: 'Swift Sentinel',
    accentColor: '#312E81',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    trophyRequired: 20,
  },
  {
    id: 'greatdane',
    name: 'Titan',
    breed: 'Gentle Great Dane',
    emoji: '🐕',
    barkSound: 'BOOF! 🐕',
    title: 'Noble Stride',
    accentColor: '#475569',
    badgeBg: 'bg-zinc-100 text-zinc-900 border-zinc-300',
    trophyRequired: 21,
  },
  {
    id: 'chihuahua',
    name: 'Taco',
    breed: 'Spicy Chihuahua',
    emoji: '🐶',
    barkSound: 'YAP! 🐶',
    title: 'Pocket Dynamo',
    accentColor: '#D97706',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    trophyRequired: 22,
  },
  {
    id: 'maltese',
    name: 'Snowball',
    breed: 'Silk Maltese',
    emoji: '🐩',
    barkSound: 'YIP-YIP! 🐩',
    title: 'Fluff Princess',
    accentColor: '#F472B6',
    badgeBg: 'bg-pink-100 text-pink-900 border-pink-300',
    trophyRequired: 23,
  },
  {
    id: 'schnauzer',
    name: 'Watson',
    breed: 'Mustachio Schnauzer',
    emoji: '🐕‍🦺',
    barkSound: 'ARF! 🐕‍🦺',
    title: 'Wise Detective',
    accentColor: '#64748B',
    badgeBg: 'bg-slate-100 text-slate-900 border-slate-300',
    trophyRequired: 24,
  },
  {
    id: 'chowchow',
    name: 'Bear',
    breed: 'Puffy Chow Chow',
    emoji: '🐕',
    barkSound: 'GRUFF-WOOF! 🐕',
    title: 'Lion Mane',
    accentColor: '#C2410C',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    trophyRequired: 25,
  },
  {
    id: 'akita',
    name: 'Kuma',
    breed: 'Noble Akita',
    emoji: '🐕‍🦺',
    barkSound: 'BARK-WOOF! 🐕‍🦺',
    title: 'Mountain Spirit',
    accentColor: '#EA580C',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    trophyRequired: 26,
  },
  {
    id: 'bullterrier',
    name: 'Buster',
    breed: 'Target Bull Terrier',
    emoji: '🐶',
    barkSound: 'SNORT-WOOF! 🐶',
    title: 'Egg-Head Rascal',
    accentColor: '#E11D48',
    badgeBg: 'bg-red-100 text-red-900 border-red-300',
    trophyRequired: 27,
  },
  {
    id: 'basset',
    name: 'Sherlock',
    breed: 'Droopy Basset',
    emoji: '🐕',
    barkSound: 'HOWL-BAY! 🐕',
    title: 'Droopy Sleuth',
    accentColor: '#92400E',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    trophyRequired: 28,
  },
  {
    id: 'goldendoodle',
    name: 'Waffles',
    breed: 'Honey Goldendoodle',
    emoji: '🐩',
    barkSound: 'WOOF-YIP! 🐩',
    title: 'Golden Teddy',
    accentColor: '#F59E0B',
    badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    trophyRequired: 29,
  },
];

export const DEFAULT_DOG_AVATAR: DogAvatar = DOG_AVATARS[0];

export function getDogAvatarById(id?: string | null): DogAvatar {
  if (!id) return DEFAULT_DOG_AVATAR;
  const found = DOG_AVATARS.find((avatar) => avatar.id === id);
  return found || DEFAULT_DOG_AVATAR;
}

/**
 * Checks if a dog avatar is unlocked given the player's trophy/achievement count and unlocked list.
 */
export function isDogAvatarUnlocked(
  avatarId: string,
  userAchievements: number = 0,
  unlockedList: string[] = []
): boolean {
  const avatar = getDogAvatarById(avatarId);
  if (!avatar) return false;
  if (avatar.trophyRequired === 0) return true;
  if (userAchievements >= avatar.trophyRequired) return true;
  return unlockedList.includes(avatarId);
}

/**
 * Selects a new, non-repeating avatar for a new achievement.
 * Filters out all previously unlocked/seen avatar IDs so old avatars do not repeat.
 * If all avatars in the pool have been exhausted, resets history while ensuring
 * the current active avatar is never immediately repeated.
 */
export function getNextUniqueDogAvatar(
  currentId: string,
  usedIds: string[] = [],
  achievementLevel?: number
): { nextAvatar: DogAvatar; updatedUsedIds: string[] } {
  const currentSet = new Set(usedIds);
  currentSet.add(currentId);

  let selectedAvatar: DogAvatar;

  if (achievementLevel !== undefined && achievementLevel > 0) {
    // Determine the target avatar index based on achievement level
    // Trophy 1 -> DOG_AVATARS[1], Trophy 2 -> DOG_AVATARS[2], ... Trophy 29 -> DOG_AVATARS[29], Trophy 30 -> DOG_AVATARS[1]
    const availablePool = DOG_AVATARS.slice(1); // Exclude default golden (Buddy) for unlocks
    const targetIndex = (achievementLevel - 1) % availablePool.length;
    const targetCandidate = availablePool[targetIndex];

    if (targetCandidate && targetCandidate.id !== currentId) {
      selectedAvatar = targetCandidate;
    } else {
      // Pick next candidate that isn't current
      const nextCandidates = availablePool.filter((a) => a.id !== currentId);
      selectedAvatar = nextCandidates.length > 0 ? nextCandidates[0] : (targetCandidate || DEFAULT_DOG_AVATAR);
    }
  } else {
    // Filter out all avatars in the used set
    let availableCandidates = DOG_AVATARS.filter((avatar) => !currentSet.has(avatar.id));
    if (availableCandidates.length === 0) {
      availableCandidates = DOG_AVATARS.filter((avatar) => avatar.id !== currentId);
    }
    const randomIndex = Math.floor(Math.random() * availableCandidates.length);
    selectedAvatar = availableCandidates[randomIndex] || DEFAULT_DOG_AVATAR;
  }

  const newUsedList = Array.from(currentSet);
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
