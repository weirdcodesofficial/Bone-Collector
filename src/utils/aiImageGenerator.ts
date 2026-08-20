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

// Curated SVG vector generator for each breed celebrating an achievement
export function generateCuratedBreedSvg(avatar: DogAvatar, achievementLevel: number): string {
  const accent = avatar.accentColor || '#F59E0B';
  const id = avatar.id;

  // Render breed-specific visual elements without any ground shadow
  let bodyContent = '';

  if (id === 'corgi') {
    // Welsh Corgi - Long body, very short legs, big erect foxy ears, white chest
    bodyContent = `
      <rect x="74" y="112" width="12" height="24" rx="6" fill="#D97706" />
      <rect x="124" y="112" width="12" height="24" rx="6" fill="#D97706" />
      <!-- Fluffy white butt -->
      <circle cx="64" cy="104" r="16" fill="#FEF3C7" />
      <!-- Low elongated body -->
      <rect x="62" y="90" width="70" height="30" rx="15" fill="#F59E0B" />
      <path d="M 100 94 Q 120 102 115 120 Q 95 120 95 100 Z" fill="#FFFFFF" />
      <!-- Near short legs -->
      <rect x="66" y="115" width="13" height="22" rx="6" fill="#F59E0B" />
      <ellipse cx="72" cy="137" rx="8" ry="4" fill="#FFFFFF" />
      <rect x="114" y="115" width="13" height="22" rx="6" fill="#F59E0B" />
      <ellipse cx="120" cy="137" rx="8" ry="4" fill="#FFFFFF" />
      <!-- Harness & Medal -->
      <path d="M 94 90 L 98 120 L 108 120 L 104 90 Z" fill="#EF4444" />
      <!-- Head with giant perky ears -->
      <polygon points="120,68 126,26 138,58" fill="#D97706" />
      <polygon points="123,62 127,32 134,56" fill="#FDA4AF" />
      <polygon points="144,68 152,28 158,62" fill="#F59E0B" />
      <polygon points="147,64 152,34 156,60" fill="#FDA4AF" />
      <circle cx="140" cy="74" r="18" fill="#F59E0B" />
      <path d="M 136 68 Q 148 64 156 76 Q 146 88 134 82 Z" fill="#FFFFFF" />
      <ellipse cx="156" cy="75" rx="3" ry="2.2" fill="#18181B" />
      <circle cx="138" cy="70" r="3.2" fill="#18181B" /><circle cx="139" cy="69" r="1" fill="#FFFFFF" />
    `;
  } else if (id === 'dachshund') {
    // Dachshund - Super long sausage body, tiny paws, long velvety droopy ears
    bodyContent = `
      <rect x="62" y="118" width="10" height="20" rx="5" fill="#92400E" />
      <rect x="136" y="118" width="10" height="20" rx="5" fill="#92400E" />
      <path d="M 44 100 Q 32 94 36 82 Q 40 84 46 96 Z" fill="#B45309" />
      <!-- Ultra-long sausage body -->
      <rect x="46" y="94" width="94" height="26" rx="13" fill="#B45309" />
      <rect x="56" y="120" width="11" height="19" rx="5" fill="#B45309" />
      <ellipse cx="61" cy="138" rx="7" ry="3.5" fill="#D97706" />
      <rect x="128" y="120" width="11" height="19" rx="5" fill="#B45309" />
      <ellipse cx="133" cy="138" rx="7" ry="3.5" fill="#D97706" />
      <!-- Collar -->
      <rect x="122" y="93" width="7" height="28" rx="2" fill="#EF4444" />
      <!-- Head with long tapering muzzle and long droopy ears -->
      <circle cx="146" cy="84" r="14" fill="#B45309" />
      <path d="M 144 80 L 166 86 Q 166 92 158 94 L 142 92 Z" fill="#B45309" />
      <ellipse cx="166" cy="87" rx="3" ry="2.2" fill="#18181B" />
      <ellipse cx="136" cy="86" rx="8" ry="18" fill="#78350F" transform="rotate(15 136 86)" />
      <circle cx="147" cy="80" r="2.8" fill="#18181B" /><circle cx="148" cy="79" r="0.9" fill="#FFFFFF" />
    `;
  } else if (id === 'poodle') {
    // Poodle - Fluffy pom-pom topknot, puffy curly chest, puff tail and ankle puffs
    bodyContent = `
      <circle cx="46" cy="62" r="10" fill="#F472B6" />
      <path d="M 52 76 Q 50 68 52 64" stroke="#F472B6" stroke-width="4" fill="none" />
      <!-- Slender far legs with ankle puffs -->
      <rect x="68" y="104" width="8" height="34" rx="4" fill="#DB2777" />
      <circle cx="72" cy="134" r="7" fill="#F472B6" />
      <rect x="122" y="104" width="8" height="34" rx="4" fill="#DB2777" />
      <circle cx="126" cy="134" r="7" fill="#F472B6" />
      <!-- Fluffy body & chest puff -->
      <circle cx="70" cy="98" r="18" fill="#F472B6" />
      <circle cx="100" cy="88" r="22" fill="#EC4899" />
      <circle cx="118" cy="80" r="20" fill="#F472B6" />
      <!-- Near slender legs with ankle puffs -->
      <rect x="62" y="106" width="9" height="32" rx="4" fill="#F472B6" />
      <circle cx="66" cy="136" r="8" fill="#FBCFE8" />
      <rect x="114" y="106" width="9" height="32" rx="4" fill="#F472B6" />
      <circle cx="118" cy="136" r="8" fill="#FBCFE8" />
      <!-- Collar -->
      <rect x="114" y="74" width="6" height="24" rx="2" fill="#8B5CF6" />
      <!-- Head with giant pom-pom topknot -->
      <circle cx="136" cy="62" r="14" fill="#F472B6" />
      <circle cx="134" cy="44" r="16" fill="#FBCFE8" />
      <ellipse cx="124" cy="62" rx="7" ry="16" fill="#DB2777" />
      <path d="M 136 60 L 154 64 Q 154 70 146 72 L 134 70 Z" fill="#F472B6" />
      <ellipse cx="154" cy="65" rx="2.5" ry="2" fill="#18181B" />
      <circle cx="138" cy="58" r="2.8" fill="#18181B" /><circle cx="139" cy="57" r="0.9" fill="#FFFFFF" />
    `;
  } else if (id === 'dalmatian') {
    // Dalmatian - Sleek pure white body with crisp scattered black spots
    bodyContent = `
      <path d="M 52 92 Q 36 102 38 120 Q 42 122 46 116 Q 48 104 60 96 Z" fill="#E2E8F0" />
      <rect x="68" y="100" width="11" height="40" rx="5" fill="#CBD5E1" />
      <rect x="122" y="100" width="11" height="40" rx="5" fill="#CBD5E1" />
      <!-- Sleek white torso -->
      <rect x="58" y="86" width="76" height="34" rx="17" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <!-- Black spots on torso -->
      <circle cx="72" cy="96" r="4.5" fill="#0F172A" />
      <circle cx="86" cy="90" r="3.5" fill="#0F172A" />
      <circle cx="98" cy="102" r="5" fill="#0F172A" />
      <circle cx="112" cy="94" r="4" fill="#0F172A" />
      <circle cx="80" cy="108" r="3.5" fill="#0F172A" />
      <rect x="60" y="104" width="12" height="36" rx="5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <circle cx="66" cy="116" r="2.5" fill="#0F172A" />
      <rect x="114" y="104" width="12" height="36" rx="5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <circle cx="120" cy="120" r="2.5" fill="#0F172A" />
      <!-- Bright Red Champion Collar -->
      <rect x="120" y="80" width="7" height="30" rx="2" fill="#EF4444" />
      <!-- Head with spotted floppy ear -->
      <circle cx="140" cy="68" r="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <circle cx="138" cy="62" r="3" fill="#0F172A" />
      <path d="M 140 66 L 158 70 Q 158 76 150 78 L 138 76 Z" fill="#FFFFFF" />
      <ellipse cx="158" cy="71" rx="3" ry="2.2" fill="#0F172A" />
      <ellipse cx="130" cy="70" rx="7" ry="14" fill="#0F172A" transform="rotate(-15 130 70)" />
      <circle cx="140" cy="66" r="3.2" fill="#0F172A" /><circle cx="141" cy="65" r="1" fill="#FFFFFF" />
    `;
  } else if (id === 'pug') {
    // Pug - Chubby round body, spiral curly tail, wrinkled black mask, fold ears
    bodyContent = `
      <!-- Spiral curly tail -->
      <path d="M 48 88 Q 38 76 46 68 Q 54 74 48 82 Z" fill="#D97706" />
      <rect x="66" y="106" width="14" height="32" rx="7" fill="#B45309" />
      <rect x="118" y="106" width="14" height="32" rx="7" fill="#B45309" />
      <!-- Chubby round body -->
      <ellipse cx="94" cy="98" rx="42" ry="26" fill="#FBBF24" />
      <rect x="58" y="110" width="15" height="28" rx="7" fill="#F59E0B" />
      <rect x="110" y="110" width="15" height="28" rx="7" fill="#F59E0B" />
      <!-- Collar -->
      <rect x="112" y="86" width="7" height="28" rx="2" fill="#059669" />
      <!-- Head with dark wrinkles & big expressive eyes -->
      <circle cx="134" cy="74" r="19" fill="#F59E0B" />
      <ellipse cx="138" cy="78" rx="12" ry="10" fill="#18181B" />
      <!-- Wrinkle lines -->
      <path d="M 128 66 Q 134 62 140 66" stroke="#B45309" stroke-width="2" fill="none" />
      <path d="M 130 70 Q 134 67 138 70" stroke="#B45309" stroke-width="2" fill="none" />
      <ellipse cx="144" cy="77" rx="3.5" ry="2.5" fill="#000000" />
      <!-- Fold ears -->
      <polygon points="120,64 124,52 134,60" fill="#18181B" />
      <polygon points="144,60 152,52 148,68" fill="#18181B" />
      <!-- Big glossy pug eye -->
      <circle cx="132" cy="72" r="4.5" fill="#18181B" /><circle cx="133.5" cy="70.5" r="1.5" fill="#FFFFFF" />
    `;
  } else if (id === 'husky') {
    // Husky - Silver/slate coat, wolf face mask, icy blue eyes, bushy curved tail
    bodyContent = `
      <path d="M 48 88 Q 30 72 38 56 Q 44 64 54 80 Z" fill="#64748B" />
      <rect x="66" y="100" width="12" height="40" rx="6" fill="#475569" />
      <rect x="122" y="100" width="12" height="40" rx="6" fill="#475569" />
      <!-- Slate torso with white belly -->
      <ellipse cx="96" cy="96" rx="42" ry="24" fill="#64748B" />
      <path d="M 76 96 Q 100 114 126 96 Q 100 120 76 96 Z" fill="#F8FAFC" />
      <rect x="58" y="104" width="13" height="36" rx="6" fill="#94A3B8" />
      <ellipse cx="64" cy="139" rx="8" ry="4" fill="#F8FAFC" />
      <rect x="114" y="104" width="13" height="36" rx="6" fill="#94A3B8" />
      <ellipse cx="120" cy="139" rx="8" ry="4" fill="#F8FAFC" />
      <!-- Collar -->
      <rect x="116" y="80" width="7" height="28" rx="2" fill="#3B82F6" />
      <!-- Wolf Head with mask & sharp prick ears -->
      <polygon points="122,54 128,26 136,50" fill="#475569" />
      <polygon points="125,50 128,32 133,48" fill="#F1F5F9" />
      <polygon points="142,50 150,26 156,54" fill="#64748B" />
      <circle cx="140" cy="66" r="17" fill="#64748B" />
      <path d="M 134 58 Q 146 54 154 66 Q 144 76 134 74 Z" fill="#F8FAFC" />
      <ellipse cx="156" cy="66" rx="3" ry="2.2" fill="#0F172A" />
      <!-- Icy Sky Blue Eye -->
      <circle cx="138" cy="62" r="3.5" fill="#0EA5E9" /><circle cx="139" cy="61" r="1.2" fill="#FFFFFF" />
    `;
  } else if (id === 'frenchie') {
    // French Bulldog - Bat ears, compact stocky build, flat muzzle
    bodyContent = `
      <circle cx="50" cy="94" r="5" fill="#475569" />
      <rect x="66" y="106" width="14" height="32" rx="7" fill="#334155" />
      <rect x="120" y="106" width="14" height="32" rx="7" fill="#334155" />
      <ellipse cx="94" cy="98" rx="38" ry="24" fill="#64748B" />
      <rect x="58" y="110" width="15" height="28" rx="7" fill="#64748B" />
      <rect x="112" y="110" width="15" height="28" rx="7" fill="#64748B" />
      <!-- Red Bandana/Collar -->
      <rect x="112" y="86" width="7" height="26" rx="2" fill="#EF4444" />
      <!-- Iconic Round Bat Ears -->
      <ellipse cx="122" cy="46" rx="9" ry="18" fill="#475569" />
      <ellipse cx="123" cy="47" rx="6" ry="14" fill="#FDA4AF" />
      <ellipse cx="148" cy="46" rx="9" ry="18" fill="#64748B" />
      <ellipse cx="147" cy="47" rx="6" ry="14" fill="#FDA4AF" />
      <circle cx="136" cy="72" r="18" fill="#64748B" />
      <ellipse cx="144" cy="76" rx="10" ry="7" fill="#1E293B" />
      <ellipse cx="148" cy="75" rx="3" ry="2" fill="#000000" />
      <circle cx="132" cy="68" r="3.5" fill="#18181B" /><circle cx="133.5" cy="66.5" r="1.2" fill="#FFFFFF" />
    `;
  } else if (id === 'shiba') {
    // Shiba Inu - Fox-like face, curled tail over back, white urajiro cheeks
    bodyContent = `
      <path d="M 52 86 Q 40 70 48 60 Q 56 68 54 80 Z" fill="#EA580C" />
      <circle cx="48" cy="62" r="8" fill="#FED7AA" />
      <rect x="68" y="102" width="12" height="38" rx="6" fill="#C2410C" />
      <rect x="122" y="102" width="12" height="38" rx="6" fill="#C2410C" />
      <!-- Red sesame body with white underbelly -->
      <ellipse cx="96" cy="96" rx="40" ry="24" fill="#EA580C" />
      <path d="M 80 96 Q 100 114 120 96 Q 100 120 80 96 Z" fill="#FFF7ED" />
      <rect x="60" y="106" width="13" height="34" rx="6" fill="#EA580C" />
      <ellipse cx="66" cy="139" rx="8" ry="4" fill="#FFF7ED" />
      <rect x="114" y="106" width="13" height="34" rx="6" fill="#EA580C" />
      <ellipse cx="120" cy="139" rx="8" ry="4" fill="#FFF7ED" />
      <!-- Collar -->
      <rect x="116" y="80" width="7" height="26" rx="2" fill="#16A34A" />
      <!-- Fox head & triangular prick ears -->
      <polygon points="124,54 130,28 138,50" fill="#EA580C" />
      <polygon points="127,50 130,34 135,48" fill="#FFF7ED" />
      <polygon points="144,50 152,28 158,54" fill="#EA580C" />
      <circle cx="140" cy="66" r="17" fill="#EA580C" />
      <path d="M 134 60 Q 146 56 156 68 Q 144 78 134 76 Z" fill="#FFF7ED" />
      <ellipse cx="156" cy="67" rx="3" ry="2.2" fill="#18181B" />
      <circle cx="138" cy="62" r="3" fill="#18181B" /><circle cx="139" cy="61" r="1" fill="#FFFFFF" />
    `;
  } else if (id === 'boxer') {
    // Boxer - Muscular athletic tan/fawn coat, black muzzle, cropped alert ears
    bodyContent = `
      <circle cx="50" cy="88" r="5" fill="#92400E" />
      <rect x="68" y="98" width="13" height="42" rx="6.5" fill="#78350F" />
      <rect x="122" y="98" width="13" height="42" rx="6.5" fill="#78350F" />
      <ellipse cx="98" cy="94" rx="42" ry="25" fill="#B45309" />
      <!-- White chest flash -->
      <path d="M 110 88 Q 130 96 122 114 Q 106 112 110 88 Z" fill="#FFFFFF" />
      <rect x="60" y="102" width="14" height="38" rx="7" fill="#D97706" />
      <rect x="114" y="102" width="14" height="38" rx="7" fill="#D97706" />
      <!-- Black collar -->
      <rect x="118" y="78" width="7" height="28" rx="2" fill="#18181B" />
      <!-- Head with strong square jowls and alert ears -->
      <polygon points="126,52 130,28 136,48" fill="#B45309" />
      <polygon points="144,48 150,28 154,52" fill="#D97706" />
      <circle cx="140" cy="64" r="17" fill="#D97706" />
      <ellipse cx="150" cy="68" rx="10" ry="9" fill="#18181B" />
      <ellipse cx="156" cy="67" rx="3.5" ry="2.5" fill="#000000" />
      <circle cx="136" cy="58" r="3.2" fill="#18181B" /><circle cx="137" cy="57" r="1" fill="#FFFFFF" />
    `;
  } else if (id === 'doberman') {
    // Doberman - Sleek black/indigo build, tall prick ears, rust markings
    bodyContent = `
      <circle cx="48" cy="84" r="4" fill="#0F172A" />
      <rect x="68" y="96" width="11" height="44" rx="5.5" fill="#0F172A" />
      <rect x="124" y="96" width="11" height="44" rx="5.5" fill="#0F172A" />
      <ellipse cx="98" cy="92" rx="42" ry="24" fill="#1E293B" />
      <!-- Rust chest marking -->
      <path d="M 112 86 Q 130 94 124 110 Q 110 108 112 86 Z" fill="#B45309" />
      <rect x="60" y="100" width="12" height="40" rx="6" fill="#1E293B" />
      <ellipse cx="66" cy="138" rx="7" ry="3.5" fill="#B45309" />
      <rect x="116" y="100" width="12" height="40" rx="6" fill="#1E293B" />
      <ellipse cx="122" cy="138" rx="7" ry="3.5" fill="#B45309" />
      <!-- Red Collar -->
      <rect x="118" y="74" width="7" height="28" rx="2" fill="#DC2626" />
      <!-- Tall erect cropped ears and noble head -->
      <polygon points="126,50 130,18 136,46" fill="#1E293B" />
      <polygon points="144,46 150,18 154,50" fill="#1E293B" />
      <circle cx="140" cy="62" r="16" fill="#1E293B" />
      <path d="M 138 60 L 160 66 Q 160 72 150 74 L 138 72 Z" fill="#B45309" />
      <ellipse cx="160" cy="67" rx="3" ry="2.2" fill="#0F172A" />
      <circle cx="138" cy="58" r="3" fill="#B45309" /><circle cx="139" cy="57" r="1" fill="#FFFFFF" />
    `;
  } else if (id === 'beagle') {
    // Beagle - Tricolor saddle, white blaze, hound ears, white-tipped tail
    bodyContent = `
      <path d="M 52 88 Q 38 72 44 58 Q 50 62 56 78 Z" fill="#92400E" />
      <circle cx="44" cy="58" r="4" fill="#FFFFFF" />
      <rect x="68" y="102" width="11" height="38" rx="5" fill="#B45309" />
      <rect x="122" y="102" width="11" height="38" rx="5" fill="#B45309" />
      <ellipse cx="96" cy="96" rx="42" ry="24" fill="#D97706" />
      <ellipse cx="94" cy="92" rx="28" ry="16" fill="#18181B" />
      <rect x="60" y="106" width="12" height="34" rx="5" fill="#FFFFFF" />
      <rect x="114" y="106" width="12" height="34" rx="5" fill="#FFFFFF" />
      <rect x="116" y="82" width="7" height="26" rx="2" fill="#0284C7" />
      <circle cx="138" cy="66" r="16" fill="#D97706" />
      <path d="M 136 64 L 158 68 Q 158 74 148 76 L 136 74 Z" fill="#FFFFFF" />
      <ellipse cx="158" cy="69" rx="3" ry="2.2" fill="#18181B" />
      <ellipse cx="126" cy="68" rx="7" ry="16" fill="#78350F" transform="rotate(-15 126 68)" />
      <circle cx="138" cy="62" r="3.2" fill="#18181B" /><circle cx="139" cy="61" r="1" fill="#FFFFFF" />
    `;
  } else if (id === 'samoyed') {
    // Samoyed - Fluffy cloud-like pure white coat, smiling black lips, curved fluffy tail
    bodyContent = `
      <circle cx="48" cy="68" r="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
      <rect x="66" y="100" width="14" height="40" rx="7" fill="#F1F5F9" />
      <rect x="120" y="100" width="14" height="40" rx="7" fill="#F1F5F9" />
      <ellipse cx="96" cy="94" rx="44" ry="26" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <rect x="58" y="104" width="15" height="36" rx="7" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <rect x="112" y="104" width="15" height="36" rx="7" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <rect x="114" y="80" width="7" height="26" rx="2" fill="#06B6D4" />
      <circle cx="140" cy="64" r="19" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <polygon points="126,50 132,24 138,46" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <polygon points="129,46 132,28 135,44" fill="#FDA4AF" />
      <polygon points="144,46 150,24 154,50" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
      <path d="M 138 60 L 158 66 Q 158 72 148 74 L 138 72 Z" fill="#FFFFFF" />
      <ellipse cx="158" cy="67" rx="3.2" ry="2.4" fill="#0F172A" />
      <path d="M 148 70 Q 154 74 158 70" stroke="#0F172A" stroke-width="1.5" fill="none" />
      <circle cx="138" cy="58" r="3.5" fill="#0F172A" /><circle cx="139.5" cy="56.5" r="1.2" fill="#FFFFFF" />
    `;
  } else if (id === 'chihuahua') {
    // Chihuahua - Tiny frame, big expressive deer eyes, giant triangular ears
    bodyContent = `
      <path d="M 60 92 Q 44 80 48 66 Q 52 70 60 84 Z" fill="#D97706" />
      <rect x="74" y="108" width="8" height="32" rx="4" fill="#B45309" />
      <rect x="118" y="108" width="8" height="32" rx="4" fill="#B45309" />
      <ellipse cx="96" cy="100" rx="32" ry="20" fill="#F59E0B" />
      <rect x="68" y="110" width="9" height="30" rx="4.5" fill="#F59E0B" />
      <rect x="112" y="110" width="9" height="30" rx="4.5" fill="#F59E0B" />
      <rect x="112" y="90" width="5" height="20" rx="1.5" fill="#EC4899" />
      <!-- Giant Foxy Ears -->
      <polygon points="120,60 124,18 136,54" fill="#D97706" />
      <polygon points="123,54 125,24 133,50" fill="#FDA4AF" />
      <polygon points="144,54 154,18 158,60" fill="#F59E0B" />
      <polygon points="147,50 153,24 156,54" fill="#FDA4AF" />
      <circle cx="138" cy="72" r="16" fill="#F59E0B" />
      <path d="M 136 70 L 152 74 Q 152 78 144 80 L 134 78 Z" fill="#F59E0B" />
      <ellipse cx="152" cy="75" rx="2.5" ry="1.8" fill="#18181B" />
      <!-- Huge expressive puppy eyes -->
      <circle cx="134" cy="68" r="4.5" fill="#18181B" /><circle cx="136" cy="66" r="1.8" fill="#FFFFFF" />
    `;
  } else if (id === 'rottweiler') {
    // Rottweiler - Heavy muscular black coat, rich mahogany rust markings on muzzle & chest
    bodyContent = `
      <circle cx="50" cy="90" r="5" fill="#0F172A" />
      <rect x="68" y="98" width="14" height="42" rx="7" fill="#0F172A" />
      <rect x="122" y="98" width="14" height="42" rx="7" fill="#0F172A" />
      <ellipse cx="98" cy="94" rx="44" ry="26" fill="#1E293B" />
      <path d="M 112 88 Q 130 96 122 114 Q 106 112 110 88 Z" fill="#B45309" />
      <rect x="60" y="102" width="15" height="38" rx="7" fill="#1E293B" />
      <ellipse cx="67" cy="140" rx="8" ry="4" fill="#B45309" />
      <rect x="114" y="102" width="15" height="38" rx="7" fill="#1E293B" />
      <ellipse cx="121" cy="140" rx="8" ry="4" fill="#B45309" />
      <rect x="118" y="80" width="7" height="28" rx="2" fill="#DC2626" />
      <circle cx="140" cy="66" r="18" fill="#1E293B" />
      <ellipse cx="148" cy="70" rx="10" ry="8" fill="#B45309" />
      <ellipse cx="154" cy="69" rx="3.5" ry="2.5" fill="#000000" />
      <ellipse cx="128" cy="64" rx="6" ry="12" fill="#0F172A" />
      <circle cx="136" cy="60" r="3.5" fill="#B45309" /><circle cx="137" cy="59" r="1.2" fill="#FFFFFF" />
    `;
  } else if (id === 'greatdane') {
    // Great Dane - Tall majestic hound, long muscular limbs, noble deep chest
    bodyContent = `
      <path d="M 50 84 Q 32 100 36 122 Q 40 124 44 116 Z" fill="#64748B" />
      <rect x="68" y="90" width="11" height="52" rx="5.5" fill="#475569" />
      <rect x="124" y="90" width="11" height="52" rx="5.5" fill="#475569" />
      <ellipse cx="98" cy="88" rx="44" ry="25" fill="#64748B" />
      <rect x="60" y="94" width="12" height="48" rx="6" fill="#94A3B8" />
      <rect x="116" y="94" width="12" height="48" rx="6" fill="#94A3B8" />
      <rect x="118" y="68" width="7" height="28" rx="2" fill="#D97706" />
      <circle cx="140" cy="54" r="17" fill="#94A3B8" />
      <path d="M 138 52 L 164 56 Q 164 66 150 68 L 138 66 Z" fill="#94A3B8" />
      <ellipse cx="164" cy="57" rx="3.5" ry="2.6" fill="#1E293B" />
      <ellipse cx="130" cy="54" rx="6" ry="15" fill="#475569" />
      <circle cx="138" cy="48" r="3.2" fill="#1E293B" /><circle cx="139" cy="47" r="1" fill="#FFFFFF" />
    `;
  } else {
    // German Shepherd / Golden / Default athletic silhouette with saddle / coat styling
    const mainTan = id === 'shepherd' ? '#EA8F34' : accent;
    const darkSaddle = id === 'shepherd' ? '#6C3E33' : '#78350F';
    const isErectEar = id === 'shepherd' || id === 'akita' || id === 'terrier' || id === 'bullterrier';

    bodyContent = `
      <path d="M 68 98 Q 74 114 78 124 L 72 140 Q 75 143 81 143 L 83 140 L 87 124 Q 84 110 78 98 Z" fill="#744538" />
      <path d="M 126 102 L 124 140 Q 127 143 133 143 L 135 140 L 136 102 Z" fill="#744538" />
      <!-- Tail -->
      <path d="M 58 88 Q 36 104 39 126 Q 44 130 48 124 Q 52 108 68 96 Z" fill="${mainTan}" />
      <!-- Body -->
      <path d="M 64 92 Q 58 102 68 112 Q 84 124 110 120 Q 130 120 142 102 Q 148 90 142 76 Q 132 74 110 80 Q 84 84 64 92 Z" fill="${mainTan}" />
      <path d="M 64 92 Q 84 84 110 80 Q 132 74 142 76 Q 132 98 106 108 Q 84 108 64 92 Z" fill="${darkSaddle}" />
      <!-- Near Legs -->
      <path d="M 60 88 Q 54 104 64 120 L 58 140 Q 61 143 69 143 L 71 140 L 77 120 Q 80 104 74 92 Z" fill="${mainTan}" />
      <path d="M 60 88 Q 54 104 64 120 L 72 110 Q 77 98 74 92 Z" fill="${darkSaddle}" />
      <path d="M 112 98 L 110 140 Q 113 143 121 143 L 123 140 L 123 98 Z" fill="${mainTan}" />
      <!-- Harness / Vest -->
      <path d="M 90 78 Q 112 75 122 88 Q 116 104 96 104 Q 86 94 90 78 Z" fill="#EF4444" />
      <path d="M 102 78 L 102 118 L 110 118 L 110 78 Z" fill="#374151" />
      <path d="M 110 92 L 132 100 L 132 107 L 110 99 Z" fill="#374151" />
      <!-- Head & Neck -->
      <path d="M 122 82 L 132 58 L 146 62 L 140 92 Z" fill="${mainTan}" />
      ${
        isErectEar
          ? `
          <polygon points="135,52 142,22 149,46" fill="${darkSaddle}" />
          <polygon points="125,52 131,24 141,48" fill="${mainTan}" />
          <polygon points="128,49 133,30 138,46" fill="#FDA4AF" />
          `
          : `
          <ellipse cx="128" cy="56" rx="8" ry="18" fill="${darkSaddle}" transform="rotate(-15 128 56)" />
          <ellipse cx="152" cy="56" rx="8" ry="18" fill="${mainTan}" transform="rotate(15 152 56)" />
          `
      }
      <circle cx="147" cy="62" r="18" fill="${mainTan}" />
      <path d="M 140 56 Q 154 52 168 64 Q 160 78 144 75 Z" fill="${darkSaddle}" />
      <ellipse cx="168" cy="66" rx="3.5" ry="2.8" fill="#18181B" />
      <circle cx="147" cy="58" r="3.5" fill="#18181B" /><circle cx="148" cy="57" r="1.2" fill="#FFFFFF" />
    `;
  }

  return `<svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#FACC15" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
  </defs>

  ${bodyContent}

  <!-- Achievement Trophy Badge stamped on collar/vest -->
  <circle cx="106" cy="94" r="9" fill="url(#goldGrad)" stroke="#B45309" stroke-width="1.2" />
  <text x="106" y="97.5" font-family="sans-serif" font-weight="900" font-size="7" fill="#78350F" text-anchor="middle">★${achievementLevel}</text>
</svg>`;
}

/**
 * Strips out any embedded ground shadows or floor ellipses from generated/cached SVGs
 */
export function stripShadowFromSvg(svg: string): string {
  if (!svg) return svg;
  return svg
    .replace(/<ellipse[^>]*fill=["']#14532D["'][^>]*\/>/gi, '')
    .replace(/<ellipse[^>]*opacity=["']0\.22["'][^>]*\/>/gi, '')
    .replace(/<ellipse[^>]*opacity=["']0\.25["'][^>]*\/>/gi, '')
    .replace(/<!-- Ground Shadow -->/gi, '')
    .replace(/<!-- ground shadow -->/gi, '');
}

export function getSavedGeneratedDogs(): GeneratedAchievementDog[] {
  try {
    const raw = localStorage.getItem(AI_GENERATED_DOGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Sanitize any existing cached dogs that had embedded shadow ellipses
    return parsed.map((item) => ({
      ...item,
      svg: item.svg ? stripShadowFromSvg(item.svg) : item.svg,
    }));
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
        const cleanedSvg = stripShadowFromSvg(data.svg);
        const item: GeneratedAchievementDog = {
          id: `ai-svg-${avatar.id}-${achievementLevel}-${Date.now()}`,
          avatarId: avatar.id,
          breed: avatar.breed,
          name: avatar.name,
          title: avatar.title,
          achievementLevel,
          svg: cleanedSvg,
          avatarType: 'svg',
          createdAt: Date.now(),
        };
        saveGeneratedDog(item);
        return { svg: cleanedSvg, isAiGenerated: true };
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
