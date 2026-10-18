/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

// Geometric 8-Point Asterisk Star Icon matching reference image
function AsteriskIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
      <rect x="46" y="0" width="8" height="100" rx="4" />
      <rect x="0" y="46" width="100" height="8" rx="4" />
      <rect x="46" y="0" width="8" height="100" rx="4" transform="rotate(45 50 50)" />
      <rect x="46" y="0" width="8" height="100" rx="4" transform="rotate(-45 50 50)" />
    </svg>
  );
}

interface SamuraiProfileItem {
  id: string;
  image: string;
  name: string;
  role: string;
  description: string;
}

const SAMURAI_PROFILES: SamuraiProfileItem[] = [
  {
    id: 's1',
    image: '/images/s1.jpg',
    name: 'Kabuto Vanguard',
    role: 'Cybernetic Armor Craft',
    description: 'Forged across centuries with unyielding discipline and synthetic honor.'
  },
  {
    id: 's2',
    image: '/images/s2.jpg',
    name: 'Lunar Ronin',
    role: 'Silent Night Bladesmith',
    description: 'Guided by the moon’s radiance and razor-folded Tamahagane steel.'
  },
  {
    id: 's3',
    image: '/images/s3.jpg',
    name: 'Imperial Crown',
    role: 'Grand Tactician',
    description: 'Ceremonial shogunate commanders honoring divine heritage and duty.'
  },
  {
    id: 's4',
    image: '/images/s4.jpg',
    name: 'White Hannya',
    role: 'Visor & Menpo Master',
    description: 'Engineered to strike psychological dread while shielding the soul.'
  },
  {
    id: 's5',
    image: '/images/s5.jpg',
    name: 'Snowfall Sentinel',
    role: 'Temple Guardian',
    description: 'Standing resolute before ancient temple gates blanketed in winter frost.'
  },
  {
    id: 's6',
    image: '/images/s6.jpg',
    name: 'Crimson Steed',
    role: 'Cavalry Commander',
    description: 'Galloping through blazing ember fields with unwavering martial focus.'
  }
];

interface EgoLabPosterSectionProps {
  isDarkMode?: boolean;
}

export default function EgoLabPosterSection({ isDarkMode = false }: EgoLabPosterSectionProps) {
  return (
    <section
      id="ego-lab-section"
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-14 selection:bg-red-600 selection:text-white transition-colors duration-700 ${
        isDarkMode ? 'bg-[#0A0B0E] text-white' : 'bg-[#F4F5F7] text-[#0F1012]'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* ──────────────── 1. SECTION TOP HEADER ──────────────── */}
        <div
          className={`w-full flex items-center justify-between pb-6 sm:pb-8 border-b transition-colors duration-500 ${
            isDarkMode ? 'border-white/15' : 'border-black/15'
          }`}
        >
          {/* Left: Star Asterisk Logo */}
          <div className="flex items-center gap-3">
            <AsteriskIcon
              className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            />
          </div>
        </div>

        {/* ──────────────── 2. 6-CARD GRID (S1 TO S6 FROSTED GLASS PROFILES) ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 my-6 sm:my-12">
          {SAMURAI_PROFILES.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`group relative rounded-[22px] sm:rounded-[34px] overflow-hidden aspect-[1/1.42] shadow-xl border select-none transition-all duration-500 ${
                isDarkMode
                  ? 'bg-[#121316] border-white/10 hover:border-white/25 hover:shadow-2xl hover:shadow-red-950/20'
                  : 'bg-white border-black/10 hover:border-black/25 hover:shadow-2xl'
              }`}
            >
              {/* Full-Bleed Profile Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle top-vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Frosted Glass Card Panel */}
              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 z-20">
                <div
                  className={`rounded-[18px] sm:rounded-[26px] p-3.5 sm:p-5 backdrop-blur-xl border transition-all duration-500 ${
                    isDarkMode
                      ? 'bg-black/60 border-white/15 text-white shadow-2xl'
                      : 'bg-white/85 border-white/60 text-black shadow-lg'
                  }`}
                >
                  {/* Category / Role */}
                  <span className="block text-[10px] sm:text-[11px] font-mono tracking-widest uppercase opacity-65 mb-1">
                    {profile.role}
                  </span>

                  {/* Name */}
                  <h3 className="font-bold text-base sm:text-[18px] tracking-tight leading-tight mb-2">
                    {profile.name}
                  </h3>

                  {/* Bio / Description */}
                  <p
                    className={`text-[12px] sm:text-[12.5px] leading-relaxed line-clamp-2 font-normal transition-colors duration-500 ${
                      isDarkMode ? 'text-white/80' : 'text-neutral-700'
                    }`}
                  >
                    {profile.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
