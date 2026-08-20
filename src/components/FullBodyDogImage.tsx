import React from 'react';

interface FullBodyDogImageProps {
  avatarId?: string;
  className?: string;
  size?: number | string;
  animated?: boolean;
  jumping?: boolean;
  customImageUrl?: string;
  customSvg?: string;
}

export const FullBodyDogImage: React.FC<FullBodyDogImageProps> = ({
  avatarId = 'golden',
  className = '',
  size = 120,
  animated = false,
  jumping = false,
  customImageUrl,
  customSvg,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const width = typeof size === 'number' ? size : undefined;
  const height = typeof size === 'number' ? size * 0.8 : undefined;

  // Front-Facing Jumping Dog Pose for all breeds (User requirement: "dog should always face front when jump")
  const renderFrontFacingJumpingDog = () => {
    switch (avatarId) {
      case 'golden': // Buddy - Golden Retriever
        return (
          <g>
            {/* Bushy wagging tail behind */}
            <path d="M 60 76 Q 84 84 94 72 Q 88 64 74 68 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            {/* Back Leaping Legs & Paws */}
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#D97706" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#D97706" />
            <ellipse cx="36" cy="87" rx="7" ry="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <ellipse cx="84" cy="87" rx="7" ry="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            {/* Torso facing front */}
            <ellipse cx="60" cy="64" rx="26" ry="21" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Golden chest fur */}
            <path d="M 50 52 Q 60 68 70 52 Q 60 48 50 52 Z" fill="#FEF3C7" />
            {/* Raised Front Paws reaching forward in mid-air */}
            <ellipse cx="36" cy="46" rx="8" ry="11" fill="#F59E0B" stroke="#D97706" strokeWidth="1" transform="rotate(-20 36 46)" />
            <ellipse cx="84" cy="46" rx="8" ry="11" fill="#F59E0B" stroke="#D97706" strokeWidth="1" transform="rotate(20 84 46)" />
            <ellipse cx="33" cy="40" rx="6" ry="4.5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            <ellipse cx="87" cy="40" rx="6" ry="4.5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            {/* Red Collar & Gold Tag */}
            <path d="M 46 47 Q 60 53 74 47" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="60" cy="52" r="3.2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            {/* Floppy Golden Ears (symmetrical left & right) */}
            <path d="M 46 26 C 36 24 30 42 38 52 C 44 54 48 44 48 32 Z" fill="#D97706" stroke="#B45309" strokeWidth="1" />
            <path d="M 74 26 C 84 24 90 42 82 52 C 76 54 72 44 72 32 Z" fill="#D97706" stroke="#B45309" strokeWidth="1" />
            {/* Front-Facing Head */}
            <circle cx="60" cy="34" r="18" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Front Snout with Tongue */}
            <ellipse cx="60" cy="40" rx="9" ry="7" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
            <ellipse cx="60" cy="36" rx="4" ry="2.8" fill="#1F2937" />
            <path d="M 60 41 Q 63 48 60 49 Q 57 48 60 41 Z" fill="#F43F5E" />
            {/* Forward-Facing Sparkly Eyes */}
            <circle cx="52" cy="30" r="3" fill="#1F2937" />
            <circle cx="53" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="30" r="3" fill="#1F2937" />
            <circle cx="69" cy="29" r="1" fill="#FFFFFF" />
          </g>
        );

      case 'poodle': // Coco - Fluffy Poodle
        return (
          <g>
            <path d="M 60 76 Q 78 84 88 74" stroke="#DB2777" strokeWidth="3" />
            <circle cx="88" cy="74" r="6" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
            <ellipse cx="38" cy="80" rx="8" ry="11" fill="#F472B6" />
            <ellipse cx="82" cy="80" rx="8" ry="11" fill="#F472B6" />
            <circle cx="36" cy="86" r="6" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
            <circle cx="84" cy="86" r="6" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
            <ellipse cx="60" cy="64" rx="24" ry="19" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="15" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
            <rect x="30" y="38" width="8" height="15" rx="4" fill="#F472B6" transform="rotate(-25 34 45)" />
            <rect x="82" y="38" width="8" height="15" rx="4" fill="#F472B6" transform="rotate(25 86 45)" />
            <circle cx="31" cy="38" r="6" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
            <circle cx="89" cy="38" r="6" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
            <ellipse cx="38" cy="34" rx="6" ry="12" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
            <ellipse cx="82" cy="34" rx="6" ry="12" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
            <circle cx="60" cy="32" r="16" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.5" />
            <ellipse cx="60" cy="18" rx="10" ry="8" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
            <ellipse cx="60" cy="38" rx="8" ry="6" fill="#FCE7F3" />
            <ellipse cx="60" cy="35" rx="3.5" ry="2.2" fill="#831843" />
            <path d="M 60 38 Q 62 44 60 45 Q 58 44 60 38 Z" fill="#F43F5E" />
            <circle cx="53" cy="29" r="2.8" fill="#831843" />
            <circle cx="54" cy="28.2" r="0.9" fill="#FFFFFF" />
            <circle cx="67" cy="29" r="2.8" fill="#831843" />
            <circle cx="68" cy="28.2" r="0.9" fill="#FFFFFF" />
            <path d="M 48 46 Q 60 50 72 46" stroke="#EC4899" strokeWidth="3" />
          </g>
        );

      case 'puppy': // Milo - Joyful Puppy
        return (
          <g>
            <path d="M 60 76 Q 80 84 90 74" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#60A5FA" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#60A5FA" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#EFF6FF" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#EFF6FF" />
            <ellipse cx="60" cy="64" rx="25" ry="20" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
            <ellipse cx="60" cy="66" rx="16" ry="12" fill="#EFF6FF" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#60A5FA" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#60A5FA" transform="rotate(25 85 46)" />
            <ellipse cx="31" cy="38" rx="6" ry="4.5" fill="#EFF6FF" />
            <ellipse cx="89" cy="38" rx="6" ry="4.5" fill="#EFF6FF" />
            <path d="M 46 26 C 36 24 34 42 42 48 Z" fill="#2563EB" />
            <path d="M 74 26 C 84 24 86 42 78 48 Z" fill="#2563EB" />
            <circle cx="60" cy="34" r="19" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
            <ellipse cx="60" cy="41" rx="9" ry="7" fill="#DBEAFE" />
            <ellipse cx="60" cy="37" rx="4" ry="2.8" fill="#1E3A8A" />
            <path d="M 60 41 Q 64 48 60 49 Q 56 48 60 41 Z" fill="#F43F5E" />
            <circle cx="51" cy="30" r="4" fill="#1E3A8A" />
            <circle cx="52.5" cy="28.5" r="1.3" fill="#FFFFFF" />
            <circle cx="69" cy="30" r="4" fill="#1E3A8A" />
            <circle cx="70.5" cy="28.5" r="1.3" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#3B82F6" strokeWidth="3" />
            <polygon points="60,49 61.5,52.5 65,53 62.5,55.5 63,59 60,57 57,59 57.5,55.5 55,53 58.5,52.5" fill="#FACC15" />
          </g>
        );

      case 'shiba': // Hachi - Shiba Inu
        return (
          <g>
            <path d="M 60 76 C 76 86 86 78 80 68 C 76 64 70 70 74 74 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#EA580C" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#EA580C" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#FFF7ED" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#FFF7ED" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            <ellipse cx="60" cy="66" rx="16" ry="12" fill="#FFF7ED" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#EA580C" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#EA580C" transform="rotate(25 85 46)" />
            <ellipse cx="31" cy="38" rx="6" ry="4.5" fill="#FFF7ED" />
            <ellipse cx="89" cy="38" rx="6" ry="4.5" fill="#FFF7ED" />
            <polygon points="42,28 48,10 54,26" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
            <polygon points="45,26 48,14 52,25" fill="#FFEDD5" />
            <polygon points="66,26 72,10 78,28" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
            <polygon points="68,25 72,14 75,26" fill="#FFEDD5" />
            <circle cx="60" cy="34" r="17" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            <ellipse cx="60" cy="40" rx="10" ry="7" fill="#FFF7ED" />
            <ellipse cx="60" cy="37" rx="3.8" ry="2.6" fill="#1C1917" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <ellipse cx="52" cy="30" rx="3" ry="2.2" fill="#1C1917" />
            <circle cx="52" cy="24" r="1.5" fill="#FFF7ED" />
            <ellipse cx="68" cy="30" rx="3" ry="2.2" fill="#1C1917" />
            <circle cx="68" cy="24" r="1.5" fill="#FFF7ED" />
            <polygon points="50,48 70,48 60,58" fill="#16A34A" />
          </g>
        );

      case 'husky': // Shadow - Arctic Husky
        return (
          <g>
            <path d="M 60 76 Q 84 86 94 72 Q 88 64 74 68 Z" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#475569" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#475569" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#F8FAFC" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#F8FAFC" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
            <ellipse cx="60" cy="66" rx="17" ry="12" fill="#F8FAFC" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#475569" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#475569" transform="rotate(25 85 46)" />
            <ellipse cx="31" cy="38" rx="6" ry="4.5" fill="#F8FAFC" />
            <ellipse cx="89" cy="38" rx="6" ry="4.5" fill="#F8FAFC" />
            <polygon points="42,26 48,8 54,24" fill="#334155" />
            <polygon points="45,24 48,12 52,23" fill="#F1F5F9" />
            <polygon points="66,24 72,8 78,26" fill="#334155" />
            <polygon points="68,23 72,12 75,24" fill="#F1F5F9" />
            <circle cx="60" cy="33" r="18" fill="#334155" stroke="#0F172A" strokeWidth="1.5" />
            <path d="M 48 38 Q 60 20 72 38 Q 60 48 48 38 Z" fill="#F8FAFC" />
            <ellipse cx="60" cy="40" rx="8" ry="6" fill="#F8FAFC" />
            <ellipse cx="60" cy="37" rx="3.5" ry="2.5" fill="#0F172A" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <circle cx="53" cy="30" r="3" fill="#0EA5E9" />
            <circle cx="53.8" cy="29.2" r="1" fill="#FFFFFF" />
            <circle cx="67" cy="30" r="3" fill="#0EA5E9" />
            <circle cx="67.8" cy="29.2" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#6366F1" strokeWidth="3.5" />
          </g>
        );

      case 'corgi': // Biscuit - Welsh Corgi
        return (
          <g>
            <circle cx="82" cy="74" r="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            <ellipse cx="38" cy="80" rx="8" ry="9" fill="#F59E0B" />
            <ellipse cx="82" cy="80" rx="8" ry="9" fill="#F59E0B" />
            <ellipse cx="36" cy="85" rx="6" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="84" cy="85" rx="6" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="60" cy="64" rx="27" ry="19" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <ellipse cx="60" cy="66" rx="17" ry="12" fill="#FFFFFF" />
            <ellipse cx="36" cy="48" rx="6.5" ry="9" fill="#F59E0B" transform="rotate(-25 36 48)" />
            <ellipse cx="84" cy="48" rx="6.5" ry="9" fill="#F59E0B" transform="rotate(25 84 48)" />
            <ellipse cx="32" cy="42" rx="5.5" ry="4" fill="#FFFFFF" />
            <ellipse cx="88" cy="42" rx="5.5" ry="4" fill="#FFFFFF" />
            <polygon points="38,30 42,6 52,24" fill="#D97706" />
            <polygon points="41,28 44,11 50,23" fill="#FEF3C7" />
            <polygon points="68,24 78,6 82,30" fill="#D97706" />
            <polygon points="70,23 76,11 79,28" fill="#FEF3C7" />
            <circle cx="60" cy="35" r="17" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <path d="M 58 22 L 62 22 L 64 38 L 56 38 Z" fill="#FFFFFF" />
            <ellipse cx="60" cy="41" rx="8" ry="6" fill="#FFFFFF" />
            <ellipse cx="60" cy="38" rx="3.5" ry="2.5" fill="#18181B" />
            <path d="M 60 42 Q 63 48 60 49 Q 57 48 60 42 Z" fill="#F43F5E" />
            <circle cx="52" cy="32" r="3" fill="#18181B" />
            <circle cx="53" cy="31" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="32" r="3" fill="#18181B" />
            <circle cx="69" cy="31" r="1" fill="#FFFFFF" />
            <polygon points="48,49 72,49 60,60" fill="#DC2626" />
          </g>
        );

      case 'dalmatian': // Pongo - Dalmatian
        return (
          <g>
            <path d="M 60 76 Q 84 84 94 72" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="36" cy="86" r="4.5" fill="#F8FAFC" />
            <circle cx="84" cy="86" r="4.5" fill="#F8FAFC" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="50" cy="60" r="3.5" fill="#0F172A" />
            <circle cx="68" cy="68" r="4" fill="#0F172A" />
            <circle cx="58" cy="74" r="3" fill="#0F172A" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" transform="rotate(25 85 46)" />
            <circle cx="33" cy="48" r="2.2" fill="#0F172A" />
            <circle cx="87" cy="48" r="2.2" fill="#0F172A" />
            <path d="M 44 26 C 36 24 32 40 40 50 Z" fill="#0F172A" />
            <path d="M 76 26 C 84 24 88 40 80 50 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="78" cy="38" r="2.5" fill="#0F172A" />
            <circle cx="60" cy="34" r="17" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="60" cy="40" rx="9" ry="7" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="60" cy="37" rx="3.5" ry="2.5" fill="#0F172A" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <circle cx="53" cy="30" r="3" fill="#0F172A" />
            <circle cx="54" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="67" cy="30" r="3" fill="#0F172A" />
            <circle cx="68" cy="29" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#EF4444" strokeWidth="3.5" />
            <circle cx="60" cy="53" r="3" fill="#F59E0B" />
          </g>
        );

      case 'beagle': // Charlie - Beagle
        return (
          <g>
            <path d="M 60 76 Q 84 84 94 72" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <circle cx="94" cy="72" r="3" fill="#FFFFFF" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#78350F" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#78350F" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#FFFFFF" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#FFFFFF" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            <ellipse cx="60" cy="60" rx="14" ry="10" fill="#18181B" />
            <ellipse cx="60" cy="68" rx="14" ry="8" fill="#FFFFFF" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" transform="rotate(25 85 46)" />
            <path d="M 44 26 C 34 24 30 46 38 56 C 44 56 46 44 46 32 Z" fill="#451A03" />
            <path d="M 76 26 C 86 24 90 46 82 56 C 76 56 74 44 74 32 Z" fill="#451A03" />
            <circle cx="60" cy="34" r="17" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 58 22 L 62 22 L 64 38 L 56 38 Z" fill="#FFFFFF" />
            <ellipse cx="60" cy="41" rx="8.5" ry="6.5" fill="#FFFFFF" />
            <ellipse cx="60" cy="37" rx="3.8" ry="2.6" fill="#18181B" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <circle cx="53" cy="30" r="3" fill="#451A03" />
            <circle cx="54" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="67" cy="30" r="3" fill="#451A03" />
            <circle cx="68" cy="29" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#8B5CF6" strokeWidth="3" />
          </g>
        );

      case 'frenchie': // Pierre - French Bulldog
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#7E22CE" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#7E22CE" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#F3E8FF" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#F3E8FF" />
            <ellipse cx="60" cy="64" rx="25" ry="20" fill="#9333EA" stroke="#581C87" strokeWidth="1.5" />
            <ellipse cx="60" cy="66" rx="16" ry="10" fill="#F3E8FF" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#7E22CE" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#7E22CE" transform="rotate(25 85 46)" />
            <ellipse cx="44" cy="18" rx="7" ry="13" fill="#7E22CE" stroke="#581C87" strokeWidth="1" />
            <ellipse cx="44" cy="19" rx="4.5" ry="9.5" fill="#F5D0FE" />
            <ellipse cx="76" cy="18" rx="7" ry="13" fill="#7E22CE" stroke="#581C87" strokeWidth="1" />
            <ellipse cx="76" cy="19" rx="4.5" ry="9.5" fill="#F5D0FE" />
            <circle cx="60" cy="35" r="18" fill="#9333EA" stroke="#581C87" strokeWidth="1.5" />
            <ellipse cx="60" cy="43" rx="10" ry="7" fill="#581C87" />
            <ellipse cx="60" cy="39" rx="4" ry="2.8" fill="#000000" />
            <path d="M 60 43 Q 63 49 60 50 Q 57 49 60 43 Z" fill="#F43F5E" />
            <circle cx="51" cy="31" r="3.5" fill="#1E1B4B" />
            <circle cx="52.2" cy="29.8" r="1.1" fill="#FFFFFF" />
            <circle cx="69" cy="31" r="3.5" fill="#1E1B4B" />
            <circle cx="70.2" cy="29.8" r="1.1" fill="#FFFFFF" />
            <path d="M 48 49 Q 60 53 72 49" stroke="#C084FC" strokeWidth="3.5" />
          </g>
        );

      case 'shepherd': // Rex - German Shepherd
        return (
          <g>
            <path d="M 60 76 Q 84 86 94 72" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#B45309" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#B45309" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#D97706" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#D97706" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 48 52 Q 60 62 72 52 Q 74 72 46 72 Z" fill="#18181B" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#B45309" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#B45309" transform="rotate(25 85 46)" />
            <polygon points="42,26 46,6 54,22" fill="#18181B" />
            <polygon points="45,24 47,10 52,21" fill="#FDE68A" />
            <polygon points="66,22 74,6 78,26" fill="#18181B" />
            <polygon points="68,21 73,10 75,24" fill="#FDE68A" />
            <circle cx="60" cy="33" r="18" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 52 24 Q 60 18 68 24 L 70 42 L 50 42 Z" fill="#18181B" />
            <ellipse cx="60" cy="41" rx="8.5" ry="6.5" fill="#18181B" />
            <ellipse cx="60" cy="38" rx="3.8" ry="2.6" fill="#000000" />
            <path d="M 60 42 Q 63 48 60 49 Q 57 48 60 42 Z" fill="#F43F5E" />
            <circle cx="53" cy="29" r="3" fill="#D97706" />
            <circle cx="53.8" cy="28.2" r="1" fill="#FFFFFF" />
            <circle cx="67" cy="29" r="3" fill="#D97706" />
            <circle cx="67.8" cy="28.2" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#DC2626" strokeWidth="3.5" />
          </g>
        );

      case 'pug': // Otis - Chubby Pug
        return (
          <g>
            <circle cx="82" cy="74" r="7" fill="none" stroke="#78350F" strokeWidth="3.5" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#D97706" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#D97706" />
            <ellipse cx="36" cy="86" rx="6.5" ry="4" fill="#D97706" />
            <ellipse cx="84" cy="86" rx="6.5" ry="4" fill="#D97706" />
            <ellipse cx="60" cy="64" rx="27" ry="21" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
            <ellipse cx="35" cy="48" rx="7" ry="10" fill="#D97706" transform="rotate(-25 35 48)" />
            <ellipse cx="85" cy="48" rx="7" ry="10" fill="#D97706" transform="rotate(25 85 48)" />
            <polygon points="44,28 38,36 48,40" fill="#18181B" />
            <polygon points="76,28 82,36 72,40" fill="#18181B" />
            <circle cx="60" cy="35" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
            <path d="M 52 24 Q 60 27 68 24" stroke="#78350F" strokeWidth="1.5" fill="none" />
            <ellipse cx="60" cy="43" rx="10" ry="7" fill="#18181B" />
            <ellipse cx="60" cy="40" rx="4" ry="2.8" fill="#000000" />
            <path d="M 60 44 Q 63 50 60 51 Q 57 50 60 44 Z" fill="#F43F5E" />
            <circle cx="50" cy="32" r="4.2" fill="#0F172A" />
            <circle cx="51.5" cy="30.5" r="1.3" fill="#FFFFFF" />
            <circle cx="70" cy="32" r="4.2" fill="#0F172A" />
            <circle cx="71.5" cy="30.5" r="1.3" fill="#FFFFFF" />
            <path d="M 48 49 Q 60 53 72 49" stroke="#0284C7" strokeWidth="3" />
          </g>
        );

      case 'samoyed': // Blizzard - Samoyed
        return (
          <g>
            <circle cx="82" cy="74" r="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx="36" cy="86" r="6" fill="#FFFFFF" />
            <circle cx="84" cy="86" r="6" fill="#FFFFFF" />
            <ellipse cx="60" cy="64" rx="28" ry="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="48" cy="62" r="12" fill="#F8FAFC" />
            <circle cx="72" cy="62" r="12" fill="#F8FAFC" />
            <ellipse cx="35" cy="46" rx="8" ry="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="8" ry="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" transform="rotate(25 85 46)" />
            <polygon points="42,26 48,8 54,24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="45,24 48,12 52,23" fill="#FCE7F3" />
            <polygon points="66,24 72,8 78,26" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="68,23 72,12 75,24" fill="#FCE7F3" />
            <circle cx="60" cy="33" r="19" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="60" cy="39" rx="8" ry="6" fill="#FFFFFF" />
            <ellipse cx="60" cy="36" rx="3.5" ry="2.4" fill="#0F172A" />
            <path d="M 54 41 Q 60 46 66 41" stroke="#0F172A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <circle cx="53" cy="29" r="3" fill="#0F172A" />
            <circle cx="53.8" cy="28.2" r="1" fill="#FFFFFF" />
            <circle cx="67" cy="29" r="3" fill="#0F172A" />
            <circle cx="67.8" cy="28.2" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#0EA5E9" strokeWidth="3" />
          </g>
        );

      case 'terrier': // Jack - Jack Russell Terrier
        return (
          <g>
            <path d="M 60 76 Q 84 84 92 70" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="36" cy="86" r="5" fill="#FFFFFF" />
            <circle cx="84" cy="86" r="5" fill="#FFFFFF" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="68" cy="64" rx="7" ry="5" fill="#B45309" />
            <ellipse cx="35" cy="46" rx="7.5" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" transform="rotate(-25 35 46)" />
            <ellipse cx="85" cy="46" rx="7.5" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" transform="rotate(25 85 46)" />
            <polygon points="44,28 38,18 48,24" fill="#B45309" />
            <polygon points="76,28 82,18 72,24" fill="#B45309" />
            <circle cx="60" cy="34" r="17" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="52" cy="30" rx="7" ry="8" fill="#B45309" />
            <ellipse cx="60" cy="41" rx="8" ry="6" fill="#FFFFFF" />
            <ellipse cx="60" cy="38" rx="3.5" ry="2.5" fill="#18181B" />
            <path d="M 60 42 Q 63 48 60 49 Q 57 48 60 42 Z" fill="#F43F5E" />
            <circle cx="52" cy="30" r="3" fill="#18181B" />
            <circle cx="52.8" cy="29.2" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="30" r="3" fill="#18181B" />
            <circle cx="68.8" cy="29.2" r="1" fill="#FFFFFF" />
            <polygon points="48,48 72,48 60,58" fill="#EAB308" />
          </g>
        );

      case 'labrador': // Copper - Chocolate Lab
        return (
          <g>
            <path d="M 60 76 Q 84 84 94 72" stroke="#5B21B6" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#582F0E" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#582F0E" />
            <ellipse cx="60" cy="64" rx="27" ry="21" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            <ellipse cx="35" cy="46" rx="8" ry="11" fill="#78350F" transform="rotate(-20 35 46)" />
            <ellipse cx="85" cy="46" rx="8" ry="11" fill="#78350F" transform="rotate(20 85 46)" />
            <path d="M 46 26 C 36 24 30 42 38 52 Z" fill="#451A03" />
            <path d="M 74 26 C 84 24 90 42 82 52 Z" fill="#451A03" />
            <circle cx="60" cy="34" r="18" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            <ellipse cx="60" cy="41" rx="9" ry="7" fill="#92400E" />
            <ellipse cx="60" cy="37" rx="4" ry="2.8" fill="#1C1917" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <circle cx="52" cy="30" r="3.5" fill="#1C1917" />
            <circle cx="53" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="30" r="3.5" fill="#1C1917" />
            <circle cx="69" cy="29" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );

      case 'rottweiler': // Bruno - Royal Rottweiler
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9.5" ry="11" fill="#0F172A" />
            <ellipse cx="82" cy="80" rx="9.5" ry="11" fill="#0F172A" />
            <ellipse cx="36" cy="86" rx="6" ry="4" fill="#B45309" />
            <ellipse cx="84" cy="86" rx="6" ry="4" fill="#B45309" />
            <ellipse cx="60" cy="64" rx="28" ry="22" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <ellipse cx="50" cy="64" rx="7" ry="6" fill="#B45309" />
            <ellipse cx="70" cy="64" rx="7" ry="6" fill="#B45309" />
            <circle cx="60" cy="34" r="18.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <ellipse cx="60" cy="41" rx="9" ry="7" fill="#B45309" />
            <ellipse cx="60" cy="37" rx="4" ry="2.8" fill="#0F172A" />
            <circle cx="52" cy="24" r="2.2" fill="#B45309" />
            <circle cx="68" cy="24" r="2.2" fill="#B45309" />
            <circle cx="52" cy="30" r="3.5" fill="#0F172A" />
            <circle cx="53" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="30" r="3.5" fill="#0F172A" />
            <circle cx="69" cy="29" r="1" fill="#FFFFFF" />
            <path d="M 46 26 C 38 24 34 40 40 50 Z" fill="#0F172A" />
            <path d="M 74 26 C 82 24 86 40 80 50 Z" fill="#0F172A" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );

      case 'doberman': // Duke - Sleek Doberman
        return (
          <g>
            <ellipse cx="38" cy="80" rx="8" ry="11" fill="#1E1B4B" />
            <ellipse cx="82" cy="80" rx="8" ry="11" fill="#1E1B4B" />
            <ellipse cx="60" cy="64" rx="25" ry="20" fill="#312E81" stroke="#1E1B4B" strokeWidth="1.5" />
            <polygon points="44,22 40,6 48,18" fill="#1E1B4B" />
            <polygon points="76,22 80,6 72,18" fill="#1E1B4B" />
            <circle cx="60" cy="33" r="17" fill="#312E81" stroke="#1E1B4B" strokeWidth="1.5" />
            <ellipse cx="60" cy="41" rx="8" ry="6" fill="#B45309" />
            <ellipse cx="60" cy="37" rx="3.5" ry="2.5" fill="#1E1B4B" />
            <circle cx="52" cy="29" r="3" fill="#1E1B4B" />
            <circle cx="68" cy="29" r="3" fill="#1E1B4B" />
            <path d="M 48 47 Q 60 51 72 47" stroke="#F59E0B" strokeWidth="3" />
          </g>
        );

      case 'greatdane': // Titan - Great Dane
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9" ry="12" fill="#334155" />
            <ellipse cx="82" cy="80" rx="9" ry="12" fill="#334155" />
            <ellipse cx="60" cy="64" rx="28" ry="22" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="60" cy="32" r="19" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
            <ellipse cx="60" cy="42" rx="10" ry="8" fill="#334155" />
            <ellipse cx="60" cy="38" rx="4" ry="3" fill="#0F172A" />
            <path d="M 46 24 C 36 24 32 40 38 50 Z" fill="#334155" />
            <path d="M 74 24 C 84 24 88 40 82 50 Z" fill="#334155" />
            <circle cx="52" cy="29" r="3.5" fill="#0F172A" />
            <circle cx="68" cy="29" r="3.5" fill="#0F172A" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#3B82F6" strokeWidth="3.5" />
          </g>
        );

      case 'chihuahua': // Taco - Spicy Chihuahua
        return (
          <g>
            <ellipse cx="38" cy="78" rx="7" ry="9" fill="#D97706" />
            <ellipse cx="82" cy="78" rx="7" ry="9" fill="#D97706" />
            <ellipse cx="60" cy="64" rx="20" ry="16" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <polygon points="38,24 30,4 48,16" fill="#D97706" />
            <polygon points="40,20 34,8 46,15" fill="#FDE68A" />
            <polygon points="82,24 90,4 72,16" fill="#D97706" />
            <polygon points="80,20 86,8 74,15" fill="#FDE68A" />
            <circle cx="60" cy="32" r="16" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <ellipse cx="60" cy="38" rx="6" ry="5" fill="#FEF3C7" />
            <ellipse cx="60" cy="36" rx="2.5" ry="2" fill="#1C1917" />
            <circle cx="51" cy="28" r="4.5" fill="#1C1917" />
            <circle cx="52.5" cy="26.5" r="1.5" fill="#FFFFFF" />
            <circle cx="69" cy="28" r="4.5" fill="#1C1917" />
            <circle cx="70.5" cy="26.5" r="1.5" fill="#FFFFFF" />
            <path d="M 50 44 Q 60 48 70 44" stroke="#DC2626" strokeWidth="2.5" />
          </g>
        );

      case 'maltese': // Snowball - Silk Maltese
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="60" cy="34" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="42" cy="38" rx="6" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="78" cy="38" rx="6" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="60" cy="40" rx="7" ry="5" fill="#F8FAFC" />
            <ellipse cx="60" cy="37" rx="3.5" ry="2.5" fill="#1E293B" />
            <circle cx="52" cy="30" r="3.5" fill="#1E293B" />
            <circle cx="53" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="30" r="3.5" fill="#1E293B" />
            <circle cx="69" cy="29" r="1" fill="#FFFFFF" />
            <path d="M 54 22 Q 60 25 66 22" stroke="#F472B6" strokeWidth="3" />
            <circle cx="60" cy="23" r="2.5" fill="#DB2777" />
          </g>
        );

      case 'schnauzer': // Watson - Mustachio Schnauzer
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#475569" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#475569" />
            <ellipse cx="60" cy="64" rx="26" ry="20" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            <circle cx="60" cy="34" r="17" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            <polygon points="44,24 40,12 50,20" fill="#475569" />
            <polygon points="76,24 80,12 70,20" fill="#475569" />
            <path d="M 50 36 Q 60 48 70 36 Q 60 44 50 36 Z" fill="#E2E8F0" />
            <ellipse cx="60" cy="35" rx="3.5" ry="2.5" fill="#0F172A" />
            <circle cx="53" cy="28" r="3" fill="#0F172A" />
            <circle cx="67" cy="28" r="3" fill="#0F172A" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#0284C7" strokeWidth="3" />
          </g>
        );

      case 'chowchow': // Bear - Puffy Chow Chow
        return (
          <g>
            <ellipse cx="38" cy="80" rx="10" ry="11" fill="#C2410C" />
            <ellipse cx="82" cy="80" rx="10" ry="11" fill="#C2410C" />
            <ellipse cx="60" cy="64" rx="29" ry="23" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
            <circle cx="60" cy="34" r="22" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
            <circle cx="44" cy="20" r="5" fill="#9A3412" />
            <circle cx="76" cy="20" r="5" fill="#9A3412" />
            <ellipse cx="60" cy="40" rx="9" ry="7" fill="#9A3412" />
            <ellipse cx="60" cy="36" rx="4" ry="3" fill="#0F172A" />
            <path d="M 60 40 Q 63 47 60 48 Q 57 47 60 40 Z" fill="#3B0764" />
            <circle cx="52" cy="29" r="3" fill="#0F172A" />
            <circle cx="68" cy="29" r="3" fill="#0F172A" />
          </g>
        );

      case 'akita': // Kuma - Noble Akita
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9.5" ry="11" fill="#EA580C" />
            <ellipse cx="82" cy="80" rx="9.5" ry="11" fill="#EA580C" />
            <ellipse cx="60" cy="64" rx="28" ry="21" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            <ellipse cx="60" cy="66" rx="17" ry="12" fill="#FFF7ED" />
            <polygon points="42,26 48,10 54,24" fill="#EA580C" />
            <polygon points="66,24 72,10 78,26" fill="#EA580C" />
            <circle cx="60" cy="34" r="18" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            <ellipse cx="60" cy="41" rx="10" ry="7" fill="#FFF7ED" />
            <ellipse cx="60" cy="37" rx="4" ry="2.8" fill="#1C1917" />
            <circle cx="52" cy="30" r="3.2" fill="#1C1917" />
            <circle cx="68" cy="30" r="3.2" fill="#1C1917" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#DC2626" strokeWidth="3.5" />
          </g>
        );

      case 'bullterrier': // Buster - Target Bull Terrier
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="60" cy="64" rx="27" ry="21" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="60" cy="34" rx="16" ry="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="46,20 42,4 52,14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="74,20 78,4 68,14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="52" cy="28" rx="6" ry="7" fill="#E11D48" />
            <ellipse cx="60" cy="48" rx="4.5" ry="3" fill="#18181B" />
            <ellipse cx="52" cy="28" rx="2" ry="1.5" fill="#18181B" />
            <ellipse cx="68" cy="28" rx="2" ry="1.5" fill="#18181B" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#E11D48" strokeWidth="3" />
          </g>
        );

      case 'basset': // Sherlock - Basset Hound
        return (
          <g>
            <ellipse cx="38" cy="80" rx="8" ry="10" fill="#78350F" />
            <ellipse cx="82" cy="80" rx="8" ry="10" fill="#78350F" />
            <ellipse cx="60" cy="66" rx="28" ry="18" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="60" cy="36" r="17" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 42 28 C 30 28 24 54 36 64 Z" fill="#78350F" />
            <path d="M 78 28 C 90 28 96 54 84 64 Z" fill="#78350F" />
            <ellipse cx="60" cy="44" rx="9" ry="8" fill="#FEF3C7" />
            <ellipse cx="60" cy="40" rx="4.5" ry="3" fill="#18181B" />
            <circle cx="52" cy="33" r="3.2" fill="#18181B" />
            <circle cx="68" cy="33" r="3.2" fill="#18181B" />
            <path d="M 48 50 Q 60 54 72 50" stroke="#059669" strokeWidth="3" />
          </g>
        );

      case 'goldendoodle': // Waffles - Honey Goldendoodle
      default:
        return (
          <g>
            <ellipse cx="38" cy="80" rx="9" ry="11" fill="#D97706" />
            <ellipse cx="82" cy="80" rx="9" ry="11" fill="#D97706" />
            <ellipse cx="60" cy="64" rx="27" ry="21" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="60" cy="34" r="19" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <ellipse cx="42" cy="36" rx="7" ry="12" fill="#D97706" />
            <ellipse cx="78" cy="36" rx="7" ry="12" fill="#D97706" />
            <ellipse cx="60" cy="41" rx="8.5" ry="6.5" fill="#FEF3C7" />
            <ellipse cx="60" cy="37" rx="3.8" ry="2.7" fill="#18181B" />
            <path d="M 60 41 Q 63 47 60 48 Q 57 47 60 41 Z" fill="#F43F5E" />
            <circle cx="52" cy="30" r="3.5" fill="#18181B" />
            <circle cx="53" cy="29" r="1" fill="#FFFFFF" />
            <circle cx="68" cy="30" r="3.5" fill="#18181B" />
            <circle cx="69" cy="29" r="1" fill="#FFFFFF" />
            <path d="M 48 48 Q 60 52 72 48" stroke="#EC4899" strokeWidth="3.5" />
          </g>
        );
    }
  };

  const renderDogBody = () => {
    // When jumping, strictly render the front-facing jumping pose
    if (jumping) {
      return renderFrontFacingJumpingDog();
    }

    switch (avatarId) {
      case 'golden': // Golden Retriever - Buddy
        return (
          <g>
            {/* Bushy Golden Tail */}
            <g className="dog-tail-idle">
              <path
                d="M 28 58 C 18 52 8 60 12 70 C 16 78 26 72 32 64"
                fill="#F59E0B"
                stroke="#D97706"
                strokeWidth="2"
              />
            </g>
            {/* Back Legs */}
            <ellipse cx="38" cy="74" rx="9" ry="12" fill="#D97706" />
            <ellipse cx="36" cy="84" rx="7" ry="5" fill="#F59E0B" />
            {/* Body */}
            <g className="dog-body-idle">
              <ellipse cx="62" cy="62" rx="30" ry="20" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            </g>
            {/* Front Leg Back */}
            <rect x="74" y="66" width="9" height="22" rx="4.5" fill="#D97706" />
            {/* Front Leg Fore */}
            <rect x="85" y="66" width="9" height="22" rx="4.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            {/* Paws */}
            <ellipse cx="40" cy="86" rx="7" ry="4" fill="#FBBF24" />
            <ellipse cx="80" cy="87" rx="6" ry="4" fill="#FBBF24" />
            <ellipse cx="91" cy="87" rx="6" ry="4" fill="#FBBF24" />
            {/* Chest Fur */}
            <path d="M 76 50 Q 86 62 82 72 Q 72 70 70 56 Z" fill="#FEF3C7" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Head */}
              <circle cx="92" cy="42" r="16" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              {/* Snout */}
              <path d="M 98 42 Q 114 44 112 50 Q 102 54 94 50 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
              <ellipse cx="111" cy="46" rx="3.5" ry="2.5" fill="#1F2937" />
              {/* Floppy Golden Ear */}
              <path d="M 85 34 C 82 28 72 36 74 48 C 76 56 86 52 87 42 Z" fill="#D97706" stroke="#B45309" strokeWidth="1" />
              {/* Eye */}
              <circle cx="96" cy="38" r="2.5" fill="#1F2937" />
              <circle cx="97" cy="37" r="0.8" fill="#FFFFFF" />
              {/* Collar & Gold Tag */}
              <path d="M 82 52 Q 88 56 94 50" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="88" cy="55" r="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            </g>
          </g>
        );

      case 'poodle': // Fluffy Poodle - Coco
        return (
          <g>
            {/* Poodle Pom-pom Tail */}
            <g className="dog-tail-idle">
              <path d="M 28 62 Q 18 54 20 44" stroke="#DB2777" strokeWidth="3" />
              <circle cx="20" cy="42" r="7" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
            </g>
            {/* Back Legs with fluffy boots */}
            <rect x="34" y="64" width="7" height="20" rx="3.5" fill="#F472B6" />
            <circle cx="37" cy="82" r="6.5" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
            {/* Slender Body */}
            <ellipse cx="58" cy="62" rx="22" ry="16" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
            {/* Fluffy Chest Jacket */}
            <circle cx="70" cy="58" r="16" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
            {/* Front Legs with boots */}
            <rect x="76" y="66" width="7" height="18" rx="3.5" fill="#F472B6" />
            <circle cx="79" cy="83" r="6.5" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Poodle Long Neck & Head */}
              <path d="M 72 48 L 84 38 L 88 44 Z" fill="#FDF2F8" />
              <circle cx="86" cy="34" r="13" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
              {/* Topknot Poodle Hair */}
              <ellipse cx="85" cy="24" rx="9" ry="7" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
              {/* Delicate Snout */}
              <path d="M 92 36 Q 106 38 104 42 Q 96 45 90 42 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
              <ellipse cx="103" cy="39" rx="2.5" ry="2" fill="#831843" />
              {/* Fluffy Poodle Ear */}
              <ellipse cx="78" cy="38" rx="6" ry="11" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
              {/* Eye */}
              <circle cx="90" cy="32" r="2" fill="#831843" />
              <circle cx="90.8" cy="31.2" r="0.7" fill="#FFFFFF" />
              {/* Pink Bow Collar */}
              <path d="M 78 45 Q 84 48 88 43" stroke="#EC4899" strokeWidth="3" />
              <circle cx="83" cy="47" r="2.5" fill="#BE185D" />
            </g>
          </g>
        );

      case 'puppy': // Joyful Puppy - Milo
        return (
          <g>
            {/* Wagging Cute Puppy Tail */}
            <g className="dog-tail-idle">
              <path d="M 32 60 Q 18 50 24 38" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Chubby Body */}
            <ellipse cx="58" cy="64" rx="25" ry="19" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
            {/* Puppy White Belly */}
            <ellipse cx="60" cy="68" rx="16" ry="11" fill="#EFF6FF" />
            {/* Cute Puppy Legs */}
            <rect x="40" y="70" width="8" height="16" rx="4" fill="#60A5FA" />
            <rect x="68" y="70" width="8" height="16" rx="4" fill="#60A5FA" />
            <ellipse cx="44" cy="85" rx="6" ry="3.5" fill="#3B82F6" />
            <ellipse cx="72" cy="85" rx="6" ry="3.5" fill="#3B82F6" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Big Expressive Head */}
              <circle cx="86" cy="42" r="18" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
              {/* Puppy Floppy Ears */}
              <path d="M 76 30 C 68 28 66 44 72 50 C 76 52 82 44 80 34 Z" fill="#2563EB" />
              <path d="M 96 30 C 104 28 106 44 100 50 C 96 52 90 44 92 34 Z" fill="#1D4ED8" />
              {/* Snout with sweet tongue */}
              <ellipse cx="88" cy="48" rx="9" ry="7" fill="#DBEAFE" />
              <ellipse cx="88" cy="44" rx="3.5" ry="2.5" fill="#1E3A8A" />
              <path d="M 88 47 Q 92 53 87 54 Q 84 53 88 47 Z" fill="#F43F5E" />
              {/* Big Shiny Eyes */}
              <circle cx="80" cy="38" r="3.5" fill="#1E3A8A" />
              <circle cx="81.5" cy="36.5" r="1.2" fill="#FFFFFF" />
              <circle cx="94" cy="38" r="3.5" fill="#1E3A8A" />
              <circle cx="95.5" cy="36.5" r="1.2" fill="#FFFFFF" />
              {/* Blue Star Collar */}
              <path d="M 76 54 Q 86 58 96 52" stroke="#3B82F6" strokeWidth="3" />
              <polygon points="86,55 87.5,58.5 91,59 88.5,61.5 89,65 86,63 83,65 83.5,61.5 81,59 84.5,58.5" fill="#FACC15" />
            </g>
          </g>
        );

      case 'shiba': // Shiba Inu - Hachi
        return (
          <g>
            {/* Iconic Curled Spiral Tail */}
            <g className="dog-tail-idle">
              <path d="M 34 52 C 26 44 20 54 28 62 C 34 66 38 58 32 52 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            </g>
            {/* Muscular Body */}
            <ellipse cx="62" cy="62" rx="27" ry="18" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            {/* White Urajiro Chest & Underbelly */}
            <path d="M 52 70 Q 72 76 80 62 Q 74 54 58 60 Z" fill="#FFF7ED" />
            {/* Strong Legs */}
            <rect x="42" y="68" width="8" height="19" rx="4" fill="#EA580C" />
            <rect x="74" y="66" width="8" height="21" rx="4" fill="#F97316" />
            <ellipse cx="46" cy="86" rx="5.5" ry="3.5" fill="#FFF7ED" />
            <ellipse cx="78" cy="86" rx="5.5" ry="3.5" fill="#FFF7ED" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Head */}
              <circle cx="88" cy="42" r="16" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
              {/* Pointed Triangle Fox Ears */}
              <polygon points="76,34 82,18 88,32" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
              <polygon points="79,32 82,22 86,31" fill="#FFEDD5" />
              <polygon points="88,32 94,18 100,34" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
              <polygon points="90,31 94,22 98,32" fill="#FFEDD5" />
              {/* Shiba Cheeks & Muzzle */}
              <ellipse cx="88" cy="46" rx="9" ry="7" fill="#FFF7ED" />
              <ellipse cx="88" cy="43" rx="3.5" ry="2.5" fill="#1C1917" />
              {/* Almond Eyes with Shiba Brow Dots */}
              <ellipse cx="81" cy="38" rx="2.5" ry="1.8" fill="#1C1917" />
              <circle cx="81" cy="32" r="1.5" fill="#FFF7ED" />
              <ellipse cx="95" cy="38" rx="2.5" ry="1.8" fill="#1C1917" />
              <circle cx="95" cy="32" r="1.5" fill="#FFF7ED" />
              {/* Green Bandana Collar */}
              <polygon points="78,52 98,52 88,62" fill="#16A34A" />
            </g>
          </g>
        );

      case 'husky': // Arctic Husky - Shadow
        return (
          <g>
            {/* Fluffy Arctic Wolf Tail */}
            <g className="dog-tail-idle">
              <path d="M 30 64 C 14 56 12 40 22 36 C 26 48 34 54 36 60 Z" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            </g>
            {/* Athletic Husky Body */}
            <ellipse cx="64" cy="62" rx="29" ry="19" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
            {/* White Underbelly */}
            <ellipse cx="64" cy="68" rx="22" ry="11" fill="#F8FAFC" />
            {/* Legs */}
            <rect x="42" y="68" width="8" height="20" rx="4" fill="#475569" />
            <rect x="76" y="66" width="8" height="22" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <ellipse cx="46" cy="87" rx="5.5" ry="3.5" fill="#F8FAFC" />
            <ellipse cx="80" cy="87" rx="5.5" ry="3.5" fill="#F8FAFC" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Head with Wolf Mask */}
              <circle cx="90" cy="40" r="17" fill="#334155" stroke="#0F172A" strokeWidth="1.5" />
              {/* Husky Facial Mask (White Blaze) */}
              <path d="M 80 44 Q 90 28 100 44 Q 90 56 80 44 Z" fill="#F8FAFC" />
              {/* Pointed Husky Ears */}
              <polygon points="76,32 82,14 88,30" fill="#334155" />
              <polygon points="78,30 82,18 86,28" fill="#F1F5F9" />
              <polygon points="92,30 98,14 104,32" fill="#334155" />
              <polygon points="94,28 98,18 102,30" fill="#F1F5F9" />
              {/* Piercing Ice Blue Eyes */}
              <circle cx="83" cy="38" r="2.8" fill="#0EA5E9" />
              <circle cx="83.8" cy="37.2" r="0.9" fill="#FFFFFF" />
              <circle cx="97" cy="38" r="2.8" fill="#0EA5E9" />
              <circle cx="97.8" cy="37.2" r="0.9" fill="#FFFFFF" />
              {/* Snout */}
              <ellipse cx="90" cy="46" rx="6.5" ry="4.5" fill="#F8FAFC" />
              <ellipse cx="90" cy="44" rx="3" ry="2" fill="#0F172A" />
              {/* Arctic Collar */}
              <path d="M 80 54 Q 90 58 100 52" stroke="#6366F1" strokeWidth="3.5" />
            </g>
          </g>
        );

      case 'corgi': // Welsh Corgi - Biscuit
        return (
          <g>
            {/* Fluffy Heart-Shaped Corgi Butt & Little Tail */}
            <g className="dog-tail-idle">
              <circle cx="34" cy="62" r="16" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
              <ellipse cx="30" cy="58" rx="8" ry="10" fill="#FEF3C7" />
              <circle cx="26" cy="54" r="3.5" fill="#FFFFFF" />
            </g>
            {/* Extra Long Loaf Body */}
            <ellipse cx="62" cy="62" rx="32" ry="17" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <ellipse cx="64" cy="68" rx="24" ry="9" fill="#FFFFFF" />
            {/* Super Stubby Tiny Legs */}
            <rect x="36" y="72" width="7" height="12" rx="3.5" fill="#F59E0B" />
            <rect x="76" y="72" width="7" height="12" rx="3.5" fill="#F59E0B" />
            <ellipse cx="39.5" cy="83" rx="5" ry="3" fill="#FFFFFF" />
            <ellipse cx="79.5" cy="83" rx="5" ry="3" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Big Corgi Head */}
              <circle cx="90" cy="44" r="16" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
              {/* Enormous Royal Corgi Ears */}
              <polygon points="76,36 80,12 88,32" fill="#D97706" />
              <polygon points="78,34 81,16 86,30" fill="#FEF3C7" />
              <polygon points="90,32 98,12 102,36" fill="#D97706" />
              <polygon points="92,30 97,16 100,34" fill="#FEF3C7" />
              {/* White Blaze Down Face & Snout */}
              <path d="M 88 32 L 92 32 L 94 48 L 86 48 Z" fill="#FFFFFF" />
              <ellipse cx="90" cy="48" rx="7" ry="5" fill="#FFFFFF" />
              <ellipse cx="90" cy="46" rx="3" ry="2" fill="#18181B" />
              {/* Eyes */}
              <circle cx="83" cy="40" r="2.5" fill="#18181B" />
              <circle cx="83.7" cy="39.3" r="0.8" fill="#FFFFFF" />
              <circle cx="97" cy="40" r="2.5" fill="#18181B" />
              <circle cx="97.7" cy="39.3" r="0.8" fill="#FFFFFF" />
              {/* Royal Red Bandana */}
              <polygon points="80,56 100,56 90,66" fill="#DC2626" />
            </g>
          </g>
        );

      case 'dalmatian': // Spotted Dalmatian - Pongo
        return (
          <g>
            {/* Sleek Dalmatian Tail with Spots */}
            <g className="dog-tail-idle">
              <path d="M 28 62 Q 14 54 22 42" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
              <circle cx="20" cy="50" r="2" fill="#0F172A" />
            </g>
            {/* Athletic White Body */}
            <ellipse cx="62" cy="62" rx="28" ry="18" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Dalmatian Spots on Body */}
            <circle cx="48" cy="56" r="3.5" fill="#0F172A" />
            <circle cx="56" cy="68" r="4.5" fill="#0F172A" />
            <circle cx="68" cy="54" r="3" fill="#0F172A" />
            <circle cx="76" cy="66" r="4" fill="#0F172A" />
            <circle cx="42" cy="66" r="2.5" fill="#0F172A" />
            {/* Long Lean Legs */}
            <rect x="40" y="68" width="7" height="20" rx="3.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="74" y="66" width="7" height="22" rx="3.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="43" cy="74" r="2" fill="#0F172A" />
            <circle cx="77" cy="76" r="2.2" fill="#0F172A" />
            <ellipse cx="43.5" cy="87" rx="5.5" ry="3" fill="#F8FAFC" />
            <ellipse cx="77.5" cy="87" rx="5.5" ry="3" fill="#F8FAFC" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Head with Spotted Ears */}
              <circle cx="88" cy="42" r="16" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* Black Patch Ear */}
              <path d="M 76 34 C 70 30 68 46 72 52 C 76 54 82 44 80 36 Z" fill="#0F172A" />
              {/* Snout */}
              <path d="M 92 42 Q 106 44 104 49 Q 96 52 90 49 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              <ellipse cx="103" cy="46" rx="3" ry="2" fill="#0F172A" />
              <circle cx="94" cy="46" r="1.5" fill="#0F172A" />
              {/* Eye */}
              <circle cx="87" cy="38" r="2.8" fill="#0F172A" />
              <circle cx="87.8" cy="37.2" r="0.8" fill="#FFFFFF" />
              {/* Firehouse Red Collar */}
              <path d="M 78 52 Q 86 56 94 50" stroke="#EF4444" strokeWidth="3.5" />
              <circle cx="86" cy="55" r="3" fill="#F59E0B" />
            </g>
          </g>
        );

      case 'beagle': // Cheery Beagle - Charlie
        return (
          <g>
            {/* Hound Tail with iconic white tip */}
            <g className="dog-tail-idle">
              <path d="M 30 62 Q 16 50 20 38" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
              <circle cx="20" cy="38" r="3" fill="#FFFFFF" />
            </g>
            {/* Tricolor Body (Black Saddle, Tan Flanks, White Belly) */}
            <ellipse cx="62" cy="62" rx="27" ry="18" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            <ellipse cx="58" cy="58" rx="16" ry="12" fill="#18181B" />
            <ellipse cx="64" cy="68" rx="18" ry="8" fill="#FFFFFF" />
            {/* Sturdy Hound Legs */}
            <rect x="42" y="68" width="7.5" height="19" rx="3.7" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
            <rect x="74" y="66" width="7.5" height="21" rx="3.7" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
            <ellipse cx="45.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="77.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Beagle Head with Tan Face & White Muzzle */}
              <circle cx="88" cy="42" r="16" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              <path d="M 88 32 L 91 32 L 93 50 L 85 50 Z" fill="#FFFFFF" />
              {/* Big Long Droopy Hound Ears */}
              <path d="M 77 34 C 70 30 68 52 74 58 C 78 60 84 50 82 38 Z" fill="#451A03" />
              {/* Snout with Sniffing Nose */}
              <ellipse cx="93" cy="46" rx="7.5" ry="5.5" fill="#FFFFFF" />
              <ellipse cx="97" cy="45" rx="3.5" ry="2.5" fill="#18181B" />
              {/* Warm Beagle Eyes */}
              <circle cx="85" cy="38" r="2.6" fill="#451A03" />
              <circle cx="85.7" cy="37.3" r="0.8" fill="#FFFFFF" />
              {/* Purple Collar with Bone Tag */}
              <path d="M 78 52 Q 86 56 94 50" stroke="#8B5CF6" strokeWidth="3" />
              <ellipse cx="86" cy="55" rx="3" ry="1.8" fill="#EDE9FE" />
            </g>
          </g>
        );

      case 'boxer': // Brave Boxer - Rocky
        return (
          <g>
            {/* Short High Boxer Tail */}
            <g className="dog-tail-idle">
              <path d="M 32 58 Q 24 50 28 44" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Deep Chested Muscular Body */}
            <ellipse cx="64" cy="60" rx="28" ry="19" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
            {/* White Flash on Chest */}
            <path d="M 72 52 Q 84 64 78 74 Q 68 70 66 58 Z" fill="#FFFFFF" />
            {/* Muscular Strong Legs */}
            <rect x="42" y="66" width="8.5" height="21" rx="4.2" fill="#B45309" />
            <rect x="76" y="64" width="8.5" height="23" rx="4.2" fill="#D97706" stroke="#92400E" strokeWidth="1" />
            <ellipse cx="46" cy="87" rx="6" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="80" cy="87" rx="6" ry="3.5" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Square Powerful Boxer Head */}
              <rect x="76" y="28" width="24" height="24" rx="8" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
              {/* Black Boxer Mask & Muzzle */}
              <ellipse cx="94" cy="44" rx="9" ry="7" fill="#18181B" />
              <ellipse cx="96" cy="41" rx="3.5" ry="2.5" fill="#000000" />
              {/* Folded Ears */}
              <polygon points="76,30 82,22 86,32" fill="#92400E" />
              <polygon points="94,28 100,22 102,34" fill="#92400E" />
              {/* Brave Eyes */}
              <circle cx="84" cy="36" r="2.6" fill="#451A03" />
              <circle cx="84.7" cy="35.3" r="0.8" fill="#FFFFFF" />
              {/* Red Champion Collar */}
              <path d="M 78 52 Q 88 56 96 50" stroke="#EF4444" strokeWidth="4" />
              <circle cx="88" cy="55" r="3.5" fill="#FACC15" />
            </g>
          </g>
        );

      case 'bernard': // Alpine St. Bernard - Barnaby
        return (
          <g>
            {/* Fluffy Heavy Mountain Tail */}
            <g className="dog-tail-idle">
              <path d="M 28 62 C 14 58 10 74 18 80 C 24 82 32 74 34 66 Z" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            </g>
            {/* Massive Fluffy Body */}
            <ellipse cx="64" cy="62" rx="33" ry="22" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
            <path d="M 45 45 C 55 42 75 42 82 52 C 78 68 50 68 45 45 Z" fill="#9A3412" />
            {/* Heavy Paws & Legs */}
            <rect x="42" y="68" width="10" height="20" rx="5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
            <rect x="76" y="66" width="10" height="22" rx="5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
            <ellipse cx="47" cy="87" rx="7" ry="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
            <ellipse cx="81" cy="87" rx="7" ry="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Gentle Giant Head */}
              <circle cx="92" cy="40" r="19" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
              {/* Dark Mask Patches Around Eyes */}
              <ellipse cx="84" cy="36" rx="6" ry="8" fill="#7C2D12" />
              <ellipse cx="102" cy="36" rx="5" ry="8" fill="#7C2D12" />
              {/* Big Mountain Floppy Ears */}
              <path d="M 76 32 C 68 28 66 50 72 56 C 76 58 82 48 80 36 Z" fill="#7C2D12" />
              {/* Droopy Friendly Snout */}
              <ellipse cx="94" cy="46" rx="9" ry="7" fill="#FFFFFF" />
              <ellipse cx="95" cy="44" rx="4" ry="2.8" fill="#18181B" />
              <circle cx="85" cy="36" r="2.2" fill="#FFFFFF" />
              <circle cx="85" cy="36" r="1.5" fill="#000000" />
              {/* Iconic Alpine Rescue Barrel Collar */}
              <path d="M 80 54 Q 92 58 102 52" stroke="#047857" strokeWidth="3" />
              <rect x="88" y="55" width="8" height="6" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />
              <circle cx="92" cy="58" r="1.2" fill="#FDE68A" />
            </g>
          </g>
        );

      case 'collie': // Border Collie - Flash
        return (
          <g>
            {/* Feathered White-Tipped Tail */}
            <g className="dog-tail-idle">
              <path d="M 30 62 Q 12 50 18 36" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="18" cy="36" r="3.5" fill="#FFFFFF" />
            </g>
            {/* Agility Master Body (Sleek Black & White) */}
            <ellipse cx="62" cy="62" rx="28" ry="18" fill="#0F172A" stroke="#000000" strokeWidth="1.5" />
            {/* Lush White Chest Ruff */}
            <path d="M 68 50 Q 86 60 82 74 Q 68 72 64 56 Z" fill="#FFFFFF" />
            {/* Swift Athletic Legs */}
            <rect x="42" y="68" width="7.5" height="19" rx="3.7" fill="#0F172A" />
            <rect x="74" y="66" width="7.5" height="21" rx="3.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="45.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="77.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Collie Head with White Blaze */}
              <circle cx="88" cy="40" r="16" fill="#0F172A" stroke="#000000" strokeWidth="1.5" />
              <polygon points="86,26 90,26 94,48 82,48" fill="#FFFFFF" />
              {/* Semi-Pricked Expressive Collie Ears */}
              <polygon points="76,32 80,16 86,28" fill="#0F172A" />
              <polygon points="80,16 83,22 80,24" fill="#FFFFFF" />
              <polygon points="90,28 96,16 100,32" fill="#0F172A" />
              {/* Snout with Keen Nose */}
              <ellipse cx="88" cy="46" rx="7" ry="5" fill="#FFFFFF" />
              <ellipse cx="88" cy="44" rx="3" ry="2" fill="#000000" />
              {/* Intelligent Amber Eyes */}
              <circle cx="81" cy="36" r="2.5" fill="#D97706" />
              <circle cx="81.7" cy="35.3" r="0.8" fill="#FFFFFF" />
              <circle cx="95" cy="36" r="2.5" fill="#D97706" />
              <circle cx="95.7" cy="35.3" r="0.8" fill="#FFFFFF" />
              {/* Cyan Collar */}
              <path d="M 78 52 Q 88 56 98 50" stroke="#06B6D4" strokeWidth="3" />
            </g>
          </g>
        );

      case 'dachshund': // Wiener Dachshund - Noodle
        return (
          <g>
            {/* Pointy Speedy Tail */}
            <g className="dog-tail-idle">
              <path d="M 24 58 Q 12 52 16 42" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            {/* Ultra Long Sausage Body */}
            <ellipse cx="58" cy="62" rx="36" ry="15" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            {/* Tiny Short Legs */}
            <rect x="30" y="70" width="6" height="12" rx="3" fill="#92400E" />
            <rect x="76" y="70" width="6" height="12" rx="3" fill="#92400E" />
            <ellipse cx="33" cy="82" rx="4.5" ry="2.5" fill="#B45309" />
            <ellipse cx="79" cy="82" rx="4.5" ry="2.5" fill="#B45309" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Long Elegant Snout & Head */}
              <circle cx="90" cy="44" r="14" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              {/* Long Velvety Drooping Ears */}
              <path d="M 78 36 C 70 32 68 56 74 62 C 78 64 84 52 82 40 Z" fill="#78350F" />
              {/* Elongated Snout */}
              <path d="M 94 44 Q 112 47 110 52 Q 100 56 92 52 Z" fill="#92400E" />
              <ellipse cx="109" cy="48" rx="2.5" ry="2" fill="#18181B" />
              {/* Shiny Dark Eye */}
              <circle cx="89" cy="40" r="2.2" fill="#18181B" />
              <circle cx="89.6" cy="39.4" r="0.7" fill="#FFFFFF" />
              {/* Yellow Ribbon Collar */}
              <path d="M 80 52 Q 88 56 94 50" stroke="#FBBF24" strokeWidth="3" />
            </g>
          </g>
        );

      case 'frenchie': // French Bulldog - Pierre
        return (
          <g>
            {/* Stubby Frenchie Tail */}
            <g className="dog-tail-idle">
              <circle cx="32" cy="62" r="3.5" fill="#6B21A8" />
            </g>
            {/* Compact Muscular Body */}
            <ellipse cx="60" cy="62" rx="25" ry="18" fill="#9333EA" stroke="#581C87" strokeWidth="1.5" />
            <ellipse cx="62" cy="68" rx="16" ry="9" fill="#F3E8FF" />
            {/* Stout Frenchie Legs */}
            <rect x="40" y="68" width="8" height="17" rx="4" fill="#7E22CE" />
            <rect x="72" y="66" width="8" height="19" rx="4" fill="#9333EA" stroke="#581C87" strokeWidth="1" />
            <ellipse cx="44" cy="85" rx="5.5" ry="3.5" fill="#F3E8FF" />
            <ellipse cx="76" cy="85" rx="5.5" ry="3.5" fill="#F3E8FF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Signature Big Bat Ears */}
              <ellipse cx="76" cy="24" rx="7" ry="13" fill="#7E22CE" stroke="#581C87" strokeWidth="1" />
              <ellipse cx="76" cy="25" rx="4.5" ry="9.5" fill="#F5D0FE" />
              <ellipse cx="98" cy="24" rx="7" ry="13" fill="#7E22CE" stroke="#581C87" strokeWidth="1" />
              <ellipse cx="98" cy="25" rx="4.5" ry="9.5" fill="#F5D0FE" />
              {/* Round Sturdy Head */}
              <circle cx="87" cy="44" r="17" fill="#9333EA" stroke="#581C87" strokeWidth="1.5" />
              {/* Wrinkly Squishy Muzzle */}
              <ellipse cx="87" cy="50" rx="9" ry="6.5" fill="#581C87" />
              <ellipse cx="87" cy="47" rx="3.5" ry="2.5" fill="#000000" />
              {/* Big Round Dark Eyes */}
              <circle cx="80" cy="40" r="3" fill="#1E1B4B" />
              <circle cx="81.2" cy="38.8" r="1" fill="#FFFFFF" />
              <circle cx="94" cy="40" r="3" fill="#1E1B4B" />
              <circle cx="95.2" cy="38.8" r="1" fill="#FFFFFF" />
              {/* Violet Studded Collar */}
              <path d="M 76 56 Q 87 60 98 54" stroke="#C084FC" strokeWidth="3.5" />
            </g>
          </g>
        );

      case 'shepherd': // German Shepherd - Rex
        return (
          <g>
            {/* Bushy Saber Tail */}
            <g className="dog-tail-idle">
              <path d="M 30 64 C 18 56 12 72 20 80 C 26 82 32 74 34 68 Z" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            </g>
            {/* Strong Black Saddle & Tan Flanks */}
            <ellipse cx="64" cy="62" rx="29" ry="19" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 46 48 C 58 45 74 46 80 58 C 74 68 52 68 46 48 Z" fill="#18181B" />
            {/* Strong Guard Legs */}
            <rect x="42" y="68" width="8" height="20" rx="4" fill="#B45309" />
            <rect x="76" y="66" width="8" height="22" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="1" />
            <ellipse cx="46" cy="87" rx="5.5" ry="3.5" fill="#D97706" />
            <ellipse cx="80" cy="87" rx="5.5" ry="3.5" fill="#D97706" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Noble Standing Head with Black Mask */}
              <circle cx="90" cy="40" r="17" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              <path d="M 84 32 Q 92 26 100 32 L 98 50 L 82 50 Z" fill="#18181B" />
              {/* Tall Upright Shepherd Ears */}
              <polygon points="76,32 80,12 88,28" fill="#18181B" />
              <polygon points="78,30 81,16 85,26" fill="#FDE68A" />
              <polygon points="92,28 100,12 104,32" fill="#18181B" />
              <polygon points="94,26 98,16 101,30" fill="#FDE68A" />
              {/* Snout with Proud Black Nose */}
              <ellipse cx="92" cy="47" rx="7.5" ry="5.5" fill="#18181B" />
              <ellipse cx="93" cy="44" rx="3.5" ry="2.5" fill="#000000" />
              {/* Vigilant Eyes */}
              <circle cx="84" cy="36" r="2.5" fill="#D97706" />
              <circle cx="84.7" cy="35.3" r="0.8" fill="#FFFFFF" />
              {/* Hero Red Collar */}
              <path d="M 80 54 Q 90 58 100 52" stroke="#DC2626" strokeWidth="3.5" />
            </g>
          </g>
        );

      case 'pug': // Chubby Pug - Otis
        return (
          <g>
            {/* Iconic Double Curled Donut Tail */}
            <g className="dog-tail-idle">
              <circle cx="30" cy="56" r="7" fill="none" stroke="#78350F" strokeWidth="3.5" />
            </g>
            {/* Plump Chubby Body */}
            <ellipse cx="60" cy="64" rx="27" ry="20" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
            {/* Little Chubby Legs */}
            <rect x="38" y="72" width="7.5" height="14" rx="3.7" fill="#D97706" />
            <rect x="70" y="70" width="7.5" height="16" rx="3.7" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
            <ellipse cx="41.5" cy="85" rx="5" ry="3" fill="#D97706" />
            <ellipse cx="73.5" cy="85" rx="5" ry="3" fill="#D97706" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Round Pug Head with Wrinkles */}
              <circle cx="86" cy="44" r="17" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
              {/* Forehead Wrinkles */}
              <path d="M 80 32 Q 86 35 92 32" stroke="#78350F" strokeWidth="1.5" fill="none" />
              <path d="M 82 36 Q 86 38 90 36" stroke="#78350F" strokeWidth="1.5" fill="none" />
              {/* Black Velvet Rose Ears */}
              <polygon points="73,36 68,44 78,48" fill="#18181B" />
              <polygon points="98,36 104,44 94,48" fill="#18181B" />
              {/* Black Squished Snout with Tongue */}
              <ellipse cx="86" cy="50" rx="9" ry="6.5" fill="#18181B" />
              <ellipse cx="86" cy="47" rx="3.5" ry="2.5" fill="#000000" />
              <path d="M 86 52 Q 89 57 86 58 Q 83 57 86 52 Z" fill="#F43F5E" />
              {/* Huge Soulful Pug Eyes */}
              <circle cx="78" cy="42" r="4" fill="#0F172A" />
              <circle cx="79.5" cy="40.5" r="1.3" fill="#FFFFFF" />
              <circle cx="94" cy="42" r="4" fill="#0F172A" />
              <circle cx="95.5" cy="40.5" r="1.3" fill="#FFFFFF" />
              {/* Sky Blue Collar */}
              <path d="M 76 56 Q 86 60 96 54" stroke="#0284C7" strokeWidth="3" />
            </g>
          </g>
        );

      case 'samoyed': // Smiling Samoyed - Blizzard
        return (
          <g>
            {/* Cloud Puffy Tail Curled Over Back */}
            <g className="dog-tail-idle">
              <ellipse cx="36" cy="44" rx="14" ry="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="30" cy="48" r="6" fill="#F8FAFC" />
            </g>
            {/* Super Fluffy White Cloud Body */}
            <ellipse cx="64" cy="62" rx="31" ry="21" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="50" cy="60" r="14" fill="#F8FAFC" />
            <circle cx="74" cy="60" r="15" fill="#F8FAFC" />
            {/* Fluffy Snow Boots Legs */}
            <rect x="42" y="68" width="9" height="19" rx="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="76" y="66" width="9" height="21" rx="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="46.5" cy="87" rx="6.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="80.5" cy="87" rx="6.5" ry="3.5" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Smiling Samoyed Head with Puffy Ruff */}
              <circle cx="90" cy="40" r="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              {/* Pointed Fluffy Ears with Pink Tint */}
              <polygon points="76,32 82,14 88,30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="78,30 82,18 86,28" fill="#FCE7F3" />
              <polygon points="92,30 98,14 104,32" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="94,28 98,18 102,30" fill="#FCE7F3" />
              {/* The Famous "Sammy Smile" (Black upturned mouth) */}
              <ellipse cx="90" cy="46" rx="7" ry="5" fill="#FFFFFF" />
              <ellipse cx="90" cy="43" rx="3" ry="2" fill="#0F172A" />
              <path d="M 84 48 Q 90 53 96 48" stroke="#0F172A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Dark Sparkly Eyes */}
              <circle cx="83" cy="37" r="2.5" fill="#0F172A" />
              <circle cx="83.8" cy="36.2" r="0.8" fill="#FFFFFF" />
              <circle cx="97" cy="37" r="2.5" fill="#0F172A" />
              <circle cx="97.8" cy="36.2" r="0.8" fill="#FFFFFF" />
              {/* Cyan Ice Collar */}
              <path d="M 80 54 Q 90 58 100 52" stroke="#0EA5E9" strokeWidth="3" />
            </g>
          </g>
        );

      case 'australian': // Aussie Shepherd - Ziggy
        return (
          <g>
            {/* Natural Bobtail / Short Fluffy Tail */}
            <g className="dog-tail-idle">
              <circle cx="34" cy="60" r="5" fill="#475569" />
            </g>
            {/* Blue Merle Pattern Body (Grey, Black, Copper, White) */}
            <ellipse cx="62" cy="62" rx="28" ry="18" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            {/* Merle Splatters */}
            <circle cx="48" cy="58" r="4" fill="#0F172A" />
            <circle cx="68" cy="56" r="5" fill="#0F172A" />
            <circle cx="56" cy="68" r="3.5" fill="#B45309" />
            <path d="M 66 50 Q 84 62 78 74 Q 66 70 62 56 Z" fill="#FFFFFF" />
            {/* Agile Legs */}
            <rect x="42" y="68" width="7.5" height="19" rx="3.7" fill="#B45309" />
            <rect x="74" y="66" width="7.5" height="21" rx="3.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="45.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="77.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Aussie Head with Copper Points */}
              <circle cx="88" cy="40" r="16" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
              <polygon points="86,26 90,26 94,48 82,48" fill="#FFFFFF" />
              {/* Folded Ears */}
              <polygon points="74,32 80,18 86,30" fill="#475569" />
              <polygon points="90,30 96,18 102,32" fill="#475569" />
              {/* Snout with Copper Cheeks */}
              <ellipse cx="88" cy="46" rx="7" ry="5" fill="#FFFFFF" />
              <ellipse cx="88" cy="44" rx="3" ry="2" fill="#0F172A" />
              <circle cx="80" cy="46" r="2.5" fill="#B45309" />
              <circle cx="96" cy="46" r="2.5" fill="#B45309" />
              {/* Heterochromia Eyes (One Blue, One Amber) */}
              <circle cx="81" cy="36" r="2.5" fill="#0284C7" />
              <circle cx="81.7" cy="35.3" r="0.8" fill="#FFFFFF" />
              <circle cx="95" cy="36" r="2.5" fill="#D97706" />
              <circle cx="95.7" cy="35.3" r="0.8" fill="#FFFFFF" />
              {/* Emerald Collar */}
              <path d="M 78 52 Q 88 56 98 50" stroke="#059669" strokeWidth="3" />
            </g>
          </g>
        );

      case 'terrier': // Jack Russell - Jack
        return (
          <g>
            {/* Upright Cheerful Terrier Tail */}
            <g className="dog-tail-idle">
              <path d="M 30 60 Q 18 46 22 34" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Compact Springy Body */}
            <ellipse cx="60" cy="62" rx="26" ry="17" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="50" cy="58" rx="8" ry="6" fill="#B45309" />
            {/* Spring-Loaded Jump Legs */}
            <rect x="40" y="68" width="7.5" height="18" rx="3.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="72" y="66" width="7.5" height="20" rx="3.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="43.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="75.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            {/* Head and Face Idle Tilting Group */}
            <g className="dog-head-idle">
              {/* Energetic Terrier Head */}
              <circle cx="86" cy="42" r="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* One Brown Eye Patch & Brown Ears */}
              <ellipse cx="80" cy="38" rx="6.5" ry="7.5" fill="#B45309" />
              {/* Button Folded Terrier Ears */}
              <polygon points="74,32 78,18 84,28" fill="#B45309" />
              <polygon points="90,28 96,18 100,32" fill="#B45309" />
              {/* Snout with Eager Whiskers & Nose */}
              <ellipse cx="90" cy="46" rx="6.5" ry="4.5" fill="#FFFFFF" />
              <ellipse cx="93" cy="44" rx="3" ry="2" fill="#18181B" />
              {/* Sparkly Terrier Eyes */}
              <circle cx="80" cy="38" r="2.5" fill="#18181B" />
              <circle cx="80.7" cy="37.3" r="0.8" fill="#FFFFFF" />
              <circle cx="94" cy="38" r="2.5" fill="#18181B" />
              <circle cx="94.7" cy="37.3" r="0.8" fill="#FFFFFF" />
              {/* Yellow Bandana Collar */}
              <polygon points="76,52 96,52 86,62" fill="#EAB308" />
            </g>
          </g>
        );

      case 'labrador': // Chocolate Lab - Copper
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 28 58 Q 14 52 18 66" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
            </g>
            <ellipse cx="62" cy="62" rx="30" ry="20" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            <rect x="42" y="68" width="8" height="20" rx="4" fill="#582F0E" />
            <rect x="74" y="66" width="8" height="22" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="1" />
            <ellipse cx="46" cy="88" rx="6" ry="4" fill="#451A03" />
            <ellipse cx="78" cy="88" rx="6" ry="4" fill="#451A03" />
            <g className="dog-head-idle">
              <circle cx="90" cy="42" r="17" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
              <path d="M 98 42 Q 112 44 110 50 Q 102 54 94 50 Z" fill="#92400E" />
              <ellipse cx="109" cy="46" rx="3.5" ry="2.5" fill="#1C1917" />
              <path d="M 82 34 C 78 28 70 38 72 50 Z" fill="#451A03" />
              <circle cx="95" cy="38" r="2.8" fill="#1C1917" />
              <circle cx="96" cy="37" r="0.8" fill="#FFFFFF" />
              <path d="M 80 52 Q 88 56 96 50" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </g>
        );

      case 'rottweiler': // Royal Rottweiler - Bruno
        return (
          <g>
            <g className="dog-tail-idle">
              <circle cx="32" cy="58" r="4.5" fill="#0F172A" />
            </g>
            <ellipse cx="62" cy="62" rx="30" ry="21" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <ellipse cx="56" cy="70" rx="10" ry="6" fill="#B45309" />
            <rect x="42" y="68" width="9" height="20" rx="4.5" fill="#0F172A" />
            <rect x="74" y="66" width="9" height="22" rx="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
            <ellipse cx="46.5" cy="88" rx="6.5" ry="4" fill="#B45309" />
            <ellipse cx="78.5" cy="88" rx="6.5" ry="4" fill="#B45309" />
            <g className="dog-head-idle">
              <circle cx="90" cy="42" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="86" cy="32" r="1.8" fill="#B45309" />
              <path d="M 96 42 Q 112 44 110 50 Q 102 54 94 50 Z" fill="#B45309" />
              <ellipse cx="109" cy="46" rx="3.5" ry="2.5" fill="#0F172A" />
              <path d="M 82 34 C 76 28 72 38 74 48 Z" fill="#0F172A" />
              <circle cx="94" cy="38" r="2.8" fill="#0F172A" />
              <circle cx="95" cy="37" r="0.8" fill="#FFFFFF" />
              <path d="M 80 52 Q 88 56 96 50" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </g>
        );

      case 'doberman': // Sleek Doberman - Duke
        return (
          <g>
            <g className="dog-tail-idle">
              <circle cx="34" cy="56" r="3.5" fill="#1E1B4B" />
            </g>
            <ellipse cx="62" cy="62" rx="27" ry="18" fill="#312E81" stroke="#1E1B4B" strokeWidth="1.5" />
            <rect x="42" y="68" width="7" height="22" rx="3.5" fill="#1E1B4B" />
            <rect x="74" y="66" width="7" height="24" rx="3.5" fill="#312E81" />
            <ellipse cx="45.5" cy="90" rx="5" ry="3.5" fill="#B45309" />
            <ellipse cx="77.5" cy="90" rx="5" ry="3.5" fill="#B45309" />
            <g className="dog-head-idle">
              <polygon points="76,32 72,12 82,26" fill="#1E1B4B" />
              <circle cx="88" cy="40" r="16" fill="#312E81" stroke="#1E1B4B" strokeWidth="1.5" />
              <path d="M 94 40 Q 110 42 108 48 Q 100 52 92 48 Z" fill="#B45309" />
              <ellipse cx="107" cy="44" rx="3" ry="2" fill="#1E1B4B" />
              <circle cx="92" cy="36" r="2.5" fill="#1E1B4B" />
              <path d="M 80 50 Q 88 54 96 48" stroke="#F59E0B" strokeWidth="3" />
            </g>
          </g>
        );

      case 'greatdane': // Gentle Great Dane - Titan
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 28 58 Q 16 70 12 84" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            </g>
            <ellipse cx="62" cy="60" rx="32" ry="22" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="40" y="66" width="9" height="24" rx="4.5" fill="#334155" />
            <rect x="76" y="64" width="9" height="26" rx="4.5" fill="#475569" stroke="#1E293B" strokeWidth="1" />
            <ellipse cx="44.5" cy="90" rx="6.5" ry="4" fill="#334155" />
            <ellipse cx="80.5" cy="90" rx="6.5" ry="4" fill="#334155" />
            <g className="dog-head-idle">
              <circle cx="92" cy="38" r="19" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 100 38 Q 118 40 116 50 Q 106 56 96 50 Z" fill="#334155" />
              <ellipse cx="114" cy="44" rx="4" ry="3" fill="#0F172A" />
              <path d="M 82 30 C 76 24 72 36 76 48 Z" fill="#334155" />
              <circle cx="96" cy="34" r="3" fill="#0F172A" />
              <path d="M 82 50 Q 92 56 100 48" stroke="#3B82F6" strokeWidth="3.5" />
            </g>
          </g>
        );

      case 'chihuahua': // Spicy Chihuahua - Taco
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 36 60 Q 24 50 28 40" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
            </g>
            <ellipse cx="60" cy="64" rx="20" ry="15" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <rect x="46" y="70" width="5" height="16" rx="2.5" fill="#D97706" />
            <rect x="68" y="68" width="5" height="18" rx="2.5" fill="#F59E0B" />
            <ellipse cx="48.5" cy="86" rx="4" ry="2.5" fill="#FDE68A" />
            <ellipse cx="70.5" cy="86" rx="4" ry="2.5" fill="#FDE68A" />
            <g className="dog-head-idle">
              <polygon points="76,28 66,8 86,22" fill="#D97706" />
              <polygon points="78,26 72,14 84,22" fill="#FDE68A" />
              <circle cx="86" cy="40" r="14" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              <ellipse cx="94" cy="44" rx="5" ry="4" fill="#FEF3C7" />
              <ellipse cx="97" cy="43" rx="2" ry="1.5" fill="#1C1917" />
              <circle cx="84" cy="36" r="3.5" fill="#1C1917" />
              <circle cx="85" cy="35" r="1" fill="#FFFFFF" />
              <path d="M 76 48 Q 84 52 92 46" stroke="#DC2626" strokeWidth="2.5" />
            </g>
          </g>
        );

      case 'maltese': // Silk Maltese - Snowball
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 32 60 Q 20 44 26 34" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
            </g>
            <ellipse cx="60" cy="64" rx="26" ry="19" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="42" y="68" width="7" height="18" rx="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="72" y="66" width="7" height="20" rx="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="45.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="75.5" cy="86" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <g className="dog-head-idle">
              <circle cx="86" cy="40" r="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <ellipse cx="76" cy="42" rx="5" ry="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <ellipse cx="92" cy="44" rx="6" ry="4" fill="#F8FAFC" />
              <ellipse cx="95" cy="43" rx="3" ry="2" fill="#1E293B" />
              <circle cx="82" cy="36" r="3" fill="#1E293B" />
              <circle cx="83" cy="35" r="0.8" fill="#FFFFFF" />
              <path d="M 80 24 Q 86 28 92 24" stroke="#F472B6" strokeWidth="3" />
              <circle cx="86" cy="25" r="2" fill="#DB2777" />
            </g>
          </g>
        );

      case 'schnauzer': // Mustachio Schnauzer - Watson
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 34 58 Q 24 46 28 36" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <ellipse cx="60" cy="62" rx="27" ry="18" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            <rect x="42" y="68" width="7.5" height="18" rx="3.7" fill="#475569" />
            <rect x="72" y="66" width="7.5" height="20" rx="3.7" fill="#64748B" stroke="#334155" strokeWidth="1" />
            <ellipse cx="45.5" cy="86" rx="5.5" ry="3.5" fill="#E2E8F0" />
            <ellipse cx="75.5" cy="86" rx="5.5" ry="3.5" fill="#E2E8F0" />
            <g className="dog-head-idle">
              <polygon points="76,28 72,14 82,24" fill="#475569" />
              <circle cx="86" cy="40" r="16" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
              <path d="M 88 38 Q 106 42 104 48 Q 96 52 86 48 Z" fill="#E2E8F0" />
              <ellipse cx="102" cy="44" rx="3" ry="2" fill="#0F172A" />
              <circle cx="82" cy="34" r="2.5" fill="#0F172A" />
              <path d="M 76 50 Q 86 54 96 48" stroke="#0284C7" strokeWidth="3" />
            </g>
          </g>
        );

      case 'chowchow': // Puffy Chow Chow - Bear
        return (
          <g>
            <g className="dog-tail-idle">
              <circle cx="30" cy="54" r="9" fill="#C2410C" />
            </g>
            <ellipse cx="62" cy="62" rx="30" ry="23" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
            <rect x="40" y="68" width="9" height="20" rx="4.5" fill="#C2410C" />
            <rect x="74" y="66" width="9" height="22" rx="4.5" fill="#EA580C" />
            <ellipse cx="44.5" cy="88" rx="6.5" ry="4" fill="#C2410C" />
            <ellipse cx="78.5" cy="88" rx="6.5" ry="4" fill="#C2410C" />
            <g className="dog-head-idle">
              <circle cx="90" cy="40" r="20" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
              <circle cx="80" cy="24" r="4.5" fill="#9A3412" />
              <ellipse cx="98" cy="44" rx="7" ry="5" fill="#9A3412" />
              <ellipse cx="102" cy="42" rx="3.5" ry="2.5" fill="#0F172A" />
              <circle cx="86" cy="34" r="2.5" fill="#0F172A" />
            </g>
          </g>
        );

      case 'akita': // Noble Akita - Kuma
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 34 52 C 24 44 20 54 28 62 C 34 66 38 58 32 52 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            </g>
            <ellipse cx="62" cy="62" rx="29" ry="20" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            <path d="M 52 70 Q 72 76 80 62 Q 74 54 58 60 Z" fill="#FFF7ED" />
            <rect x="42" y="68" width="8" height="20" rx="4" fill="#EA580C" />
            <rect x="74" y="66" width="8" height="22" rx="4" fill="#F97316" />
            <ellipse cx="46" cy="88" rx="6" ry="4" fill="#FFF7ED" />
            <ellipse cx="78" cy="88" rx="6" ry="4" fill="#FFF7ED" />
            <g className="dog-head-idle">
              <polygon points="76,32 82,16 88,30" fill="#EA580C" />
              <circle cx="88" cy="42" r="17" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
              <ellipse cx="96" cy="46" rx="8" ry="6" fill="#FFF7ED" />
              <ellipse cx="99" cy="44" rx="3.5" ry="2.5" fill="#1C1917" />
              <circle cx="84" cy="36" r="2.8" fill="#1C1917" />
              <path d="M 78 52 Q 88 56 98 50" stroke="#DC2626" strokeWidth="3.5" />
            </g>
          </g>
        );

      case 'bullterrier': // Target Bull Terrier - Buster
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 32 58 Q 18 52 22 42" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
            </g>
            <ellipse cx="60" cy="62" rx="28" ry="19" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="42" y="68" width="8" height="19" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="72" y="66" width="8" height="21" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <ellipse cx="46" cy="87" rx="6" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="76" cy="87" rx="6" ry="3.5" fill="#FFFFFF" />
            <g className="dog-head-idle">
              <polygon points="76,28 72,12 82,22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <ellipse cx="90" cy="42" rx="18" ry="15" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <ellipse cx="84" cy="36" rx="5" ry="6" fill="#E11D48" />
              <ellipse cx="106" cy="48" rx="4" ry="2.8" fill="#18181B" />
              <ellipse cx="84" cy="36" rx="2" ry="1.5" fill="#18181B" />
              <path d="M 78 52 Q 88 56 98 50" stroke="#E11D48" strokeWidth="3" />
            </g>
          </g>
        );

      case 'basset': // Droopy Basset - Sherlock
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 30 62 Q 18 50 24 38" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            </g>
            <ellipse cx="60" cy="64" rx="30" ry="18" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
            <rect x="42" y="68" width="8" height="15" rx="4" fill="#78350F" />
            <rect x="74" y="66" width="8" height="17" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="1" />
            <ellipse cx="46" cy="83" rx="6" ry="3.5" fill="#FEF3C7" />
            <ellipse cx="78" cy="83" rx="6" ry="3.5" fill="#FEF3C7" />
            <g className="dog-head-idle">
              <circle cx="88" cy="44" r="16" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
              <path d="M 76 34 C 64 34 60 62 72 70 Z" fill="#78350F" />
              <ellipse cx="98" cy="48" rx="8" ry="6" fill="#FEF3C7" />
              <ellipse cx="102" cy="47" rx="4" ry="2.8" fill="#18181B" />
              <circle cx="84" cy="40" r="2.8" fill="#18181B" />
              <path d="M 78 54 Q 88 58 98 52" stroke="#059669" strokeWidth="3" />
            </g>
          </g>
        );

      case 'goldendoodle': // Honey Goldendoodle - Waffles
      default:
        return (
          <g>
            <g className="dog-tail-idle">
              <path d="M 28 58 C 18 50 12 60 18 70" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
            </g>
            <ellipse cx="62" cy="62" rx="29" ry="20" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <rect x="42" y="68" width="8" height="20" rx="4" fill="#D97706" />
            <rect x="74" y="66" width="8" height="22" rx="4" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            <ellipse cx="46" cy="88" rx="6" ry="4" fill="#FEF3C7" />
            <ellipse cx="78" cy="88" rx="6" ry="4" fill="#FEF3C7" />
            <g className="dog-head-idle">
              <circle cx="90" cy="42" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
              <ellipse cx="78" cy="40" rx="6" ry="12" fill="#D97706" />
              <ellipse cx="98" cy="46" rx="7.5" ry="5.5" fill="#FEF3C7" />
              <ellipse cx="101" cy="44" rx="3.5" ry="2.5" fill="#18181B" />
              <circle cx="86" cy="36" r="3" fill="#18181B" />
              <circle cx="87" cy="35" r="0.8" fill="#FFFFFF" />
              <path d="M 80 52 Q 88 56 96 50" stroke="#EC4899" strokeWidth="3.5" />
            </g>
          </g>
        );
    }
  };

  if (customSvg) {
    return (
      <div
        className={`inline-flex items-center justify-center select-none relative ${className} ${
          jumping ? 'transform -translate-y-2 scale-105 transition-transform' : animated ? 'transition-all duration-300' : ''
        }`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center relative [&>svg]:w-full [&>svg]:h-full [&>svg]:drop-shadow-lg"
          dangerouslySetInnerHTML={{ __html: customSvg }}
        />
      </div>
    );
  }

  if (customImageUrl && !imageError) {
    return (
      <div
        className={`inline-flex items-center justify-center select-none relative ${className} ${
          jumping ? 'transform -translate-y-2 scale-105 transition-transform' : animated ? 'transition-all duration-300' : ''
        }`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Subtle dynamic glow for AI Dog Avatar Body */}
          <div
            className={`absolute -inset-1 bg-yellow-300/30 rounded-3xl blur-sm transition-all ${
              jumping ? 'scale-110 opacity-90' : 'opacity-40'
            }`}
          />
          <img
            src={customImageUrl}
            alt={avatarId}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover rounded-2xl sm:rounded-3xl border-2 border-yellow-300/90 shadow-lg drop-shadow-xl ${
              jumping ? 'brightness-105' : ''
            }`}
            referrerPolicy="no-referrer"
          />
          {/* AI Trophy Tag */}
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-950 text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full border border-yellow-200 shadow-md flex items-center gap-0.5">
            <span>✨ AI</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className} ${
        jumping ? 'transform -translate-y-1' : ''
      }`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      <svg
        viewBox="0 0 120 96"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderDogBody()}
      </svg>
    </div>
  );
};
