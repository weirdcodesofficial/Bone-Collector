import { DogAvatar } from '../data/dogAvatars';

export interface GeneratedAchievementDog {
  id: string;
  avatarId: string;
  breed: string;
  name: string;
  title: string;
  achievementLevel: number;
  svg: string;
  avatarType: 'svg';
  createdAt: number;
  prompt?: string;
}

const AI_GENERATED_DOGS_STORAGE_KEY = 'bone_collector_ai_generated_dogs';

// Fallback curated SVG vector generator for each breed celebrating an achievement
export function generateCuratedBreedSvg(avatar: DogAvatar, achievementLevel: number): string {
  const accent = avatar.accentColor || '#F59E0B';
  return `<svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyGrad_${avatar.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
    <filter id="glow_${avatar.id}">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${accent}" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Tail with wagging animation styling -->
  <path d="M 45 95 C 20 85, 10 50, 25 35 C 32 30, 42 45, 48 80 Z" fill="url(#bodyGrad_${avatar.id})" />

  <!-- Back Leg & Paw -->
  <ellipse cx="65" cy="120" rx="18" ry="14" fill="#92400E" opacity="0.9" />
  <ellipse cx="60" cy="132" rx="12" ry="6" fill="#78350F" />

  <!-- Main Body -->
  <ellipse cx="100" cy="98" rx="46" ry="32" fill="url(#bodyGrad_${avatar.id})" filter="url(#glow_${avatar.id})" />

  <!-- Chest Fluff Highlight -->
  <path d="M 115 80 C 135 90, 135 110, 118 122 C 105 115, 105 85, 115 80 Z" fill="#FEF3C7" opacity="0.8" />

  <!-- Front Legs & Paws -->
  <rect x="118" y="105" width="14" height="28" rx="7" fill="url(#bodyGrad_${avatar.id})" />
  <ellipse cx="125" cy="133" rx="10" ry="5" fill="#78350F" />

  <rect x="92" y="110" width="14" height="24" rx="7" fill="url(#bodyGrad_${avatar.id})" />
  <ellipse cx="99" cy="134" rx="9" ry="5" fill="#78350F" />

  <!-- Head -->
  <circle cx="140" cy="65" r="30" fill="url(#bodyGrad_${avatar.id})" filter="url(#glow_${avatar.id})" />

  <!-- Fluffy/Perky Ears -->
  <ellipse cx="122" cy="45" rx="12" ry="22" transform="rotate(-25 122 45)" fill="#78350F" />
  <ellipse cx="158" cy="45" rx="12" ry="22" transform="rotate(25 158 45)" fill="url(#bodyGrad_${avatar.id})" />

  <!-- Snout / Muzzle -->
  <ellipse cx="158" cy="74" rx="16" ry="12" fill="#FEF3C7" />
  <!-- Nose -->
  <ellipse cx="166" cy="69" rx="5" ry="4" fill="#18181B" />
  <!-- Happy Mouth & Tongue -->
  <path d="M 158 75 Q 165 82 172 75" stroke="#18181B" stroke-width="2" fill="none" />
  <path d="M 162 77 Q 166 88 170 77 Z" fill="#F43F5E" />

  <!-- Cheerful Sparkling Eyes -->
  <ellipse cx="136" cy="58" rx="5" ry="6" fill="#18181B" />
  <circle cx="138" cy="56" r="2" fill="#FFFFFF" />
  <circle cx="135" cy="60" r="0.8" fill="#FFFFFF" />

  <ellipse cx="150" cy="58" rx="5" ry="6" fill="#18181B" />
  <circle cx="152" cy="56" r="2" fill="#FFFFFF" />
  <circle cx="150" cy="60" r="0.8" fill="#FFFFFF" />

  <!-- Rosy Cheeks -->
  <circle cx="132" cy="68" r="4" fill="#F43F5E" opacity="0.4" />

  <!-- Champion Collar & Shiny Gold Medal -->
  <path d="M 125 86 Q 140 94 155 86" stroke="#DC2626" stroke-width="6" stroke-linecap="round" fill="none" />
  <!-- Gold Medal with Achievement Level -->
  <circle cx="140" cy="98" r="10" fill="url(#goldGrad)" stroke="#B45309" stroke-width="1.5" />
  <text x="140" y="102" font-family="sans-serif" font-weight="900" font-size="9" fill="#78350F" text-anchor="middle">★${achievementLevel}</text>

  <!-- Sparkles -->
  <polygon points="175,35 178,42 185,45 178,48 175,55 172,48 165,45 172,42" fill="#FDE047" opacity="0.9" />
  <polygon points="40,25 42,30 47,32 42,34 40,39 38,34 33,32 38,30" fill="#FDE047" opacity="0.8" />
</svg>`;
}

export function getSavedGeneratedDogs(): GeneratedAchievementDog[] {
  try {
    const raw = localStorage.getItem(AI_GENERATED_DOGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading saved AI dogs:', err);
    return [];
  }
}

export function saveGeneratedDog(dog: GeneratedAchievementDog): void {
  try {
    const existing = getSavedGeneratedDogs();
    const filtered = existing.filter(
      (d) => d.id !== dog.id && !(d.avatarId === dog.avatarId && d.achievementLevel === dog.achievementLevel)
    );
    const updated = [dog, ...filtered].slice(0, 40);
    localStorage.setItem(AI_GENERATED_DOGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error saving generated AI dog:', err);
  }
}

export function getLatestGeneratedDogForAvatar(avatarId: string): GeneratedAchievementDog | null {
  const all = getSavedGeneratedDogs();
  return all.find((d) => d.avatarId === avatarId) || null;
}

/**
 * Generates a full SVG vector avatar body celebrating the achievement.
 */
export async function generateDogAchievementSvg(
  avatar: DogAvatar,
  achievementLevel: number
): Promise<{ svg: string; isAiGenerated: boolean }> {
  try {
    const res = await fetch('/api/generate-dog-svg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        breed: avatar.breed,
        name: avatar.name,
        title: avatar.title,
        achievementLevel,
        accentColor: avatar.accentColor,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.svg && data.svg.startsWith('<svg')) {
        const item: GeneratedAchievementDog = {
          id: `ai-svg-${avatar.id}-${achievementLevel}-${Date.now()}`,
          avatarId: avatar.id,
          breed: avatar.breed,
          name: avatar.name,
          title: avatar.title,
          achievementLevel,
          svg: data.svg,
          avatarType: 'svg',
          createdAt: Date.now(),
        };
        saveGeneratedDog(item);
        return { svg: data.svg, isAiGenerated: true };
      }
    }
  } catch (err) {
    console.warn('Server AI SVG generation notice (using rich vector fallback):', err);
  }

  // Curated vector fallback
  const curatedSvg = generateCuratedBreedSvg(avatar, achievementLevel);
  const item: GeneratedAchievementDog = {
    id: `vector-svg-${avatar.id}-${achievementLevel}-${Date.now()}`,
    avatarId: avatar.id,
    breed: avatar.breed,
    name: avatar.name,
    title: avatar.title,
    achievementLevel,
    svg: curatedSvg,
    avatarType: 'svg',
    createdAt: Date.now(),
  };
  saveGeneratedDog(item);
  return { svg: curatedSvg, isAiGenerated: false };
}
