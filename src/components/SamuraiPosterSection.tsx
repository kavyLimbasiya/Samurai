/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { getAssetUrl } from '../utils/asset';

// Geometric 8-Point Asterisk Star Icon matching reference image
function AsteriskIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
      {/* 4 crossing bars */}
      <rect x="46" y="0" width="8" height="100" rx="4" />
      <rect x="0" y="46" width="100" height="8" rx="4" />
      <rect x="46" y="0" width="8" height="100" rx="4" transform="rotate(45 50 50)" />
      <rect x="46" y="0" width="8" height="100" rx="4" transform="rotate(-45 50 50)" />
    </svg>
  );
}

// Data for all 7 Samurai Poster Cards (s0, s1, s2, s3, s4, s5, s11)
interface SamuraiPoster {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  kanji: string;
  brandMark?: string;
  alt: string;
  aspectClass?: string;
}

const POSTERS: SamuraiPoster[] = [
  {
    id: 's0',
    image: '/images/s0.jpg',
    tag: 'CRIMSON ARMOR',
    title: 'FEED THE\nRIGHT SPIRIT.',
    subtitle: 'Build identities that don’t know how to be defeated and are bold enough to master their fate.',
    kanji: '武士道精神',
    brandMark: 'SAMURAI®',
    alt: 'Crimson Samurai S0'
  },
  {
    id: 's1',
    image: '/images/s1.jpg',
    tag: 'CYBER BUSHIDO',
    title: 'SYNTHETIC\nHONOR.',
    subtitle: 'Forged across centuries. The ancient Kabuto recreated with unyielding cybernetic discipline.',
    kanji: '電脳武者',
    brandMark: 'KABUTO®',
    alt: 'Cyberpunk Samurai S1'
  },
  {
    id: 's2',
    image: '/images/s2.jpg',
    tag: 'LUNAR CREST',
    title: 'WALK IN\nTHE DARK.',
    subtitle: 'Guided solely by the moon’s radiance and the luminescence of razor-folded Tamahagane steel.',
    kanji: '月光抜刀',
    brandMark: 'KATANA®',
    alt: 'Night Desert Samurai S2'
  },
  {
    id: 's3',
    image: '/images/s3.jpg',
    tag: 'IMPERIAL GOLD',
    title: 'NOBILITY &\nDEVOTION.',
    subtitle: 'Ceremonial gold laurel crown honoring supreme shogunate commanders and master tacticians.',
    kanji: '黄金兜冠',
    brandMark: 'SHOGUN®',
    alt: 'Ceremonial Gold Samurai S3'
  },
  {
    id: 's4',
    image: '/images/s4.jpg',
    tag: 'WHITE HANNYA',
    title: 'TERROR &\nDISCIPLINE.',
    subtitle: 'The lacquered Menpo mask: engineered to strike dread into adversaries while protecting life.',
    kanji: '白般若面',
    brandMark: 'MENPO®',
    alt: 'White Demon Mask Samurai S4'
  },
  {
    id: 's5',
    image: '/images/s5.jpg',
    tag: 'SNOWFALL SHRINE',
    title: 'SILENT VOW\nAT DAWN.',
    subtitle: 'Standing resolute before the temple gates as snow blankets the feudal battlefield.',
    kanji: '雪中不屈',
    brandMark: 'RONIN®',
    alt: 'Snowfall Temple Samurai S5'
  },
  {
    id: 's11',
    image: '/images/s11.jpg',
    tag: 'INFERNO KABUTO',
    title: 'TEMPERED BY\nTHE FLAMES.',
    subtitle: 'Raising the standard of warrior courage. The spirit that burns brighter than any forge.',
    kanji: '紅蓮業火',
    brandMark: 'INFERNO®',
    alt: 'Blazing Fire Demon Samurai S11'
  }
];

export default function SamuraiPosterSection() {
  return (
    <section
      id="samurai-gallery-section"
      className="relative w-full bg-white text-black py-12 sm:py-20 px-4 sm:px-8 lg:px-14 selection:bg-black selection:text-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* ──────────────── 1. SECTION TOP HEADER (MATCHING REFERENCE IMAGE) ──────────────── */}
        <div className="w-full flex items-center justify-between pb-8 sm:pb-12 border-b border-black/15">
          {/* Left: Star Asterisk Logo */}
          <div className="flex items-center gap-3">
            <AsteriskIcon className="w-8 h-8 sm:w-11 sm:h-11 text-black" />
          </div>

          {/* Right: Copyright & Archive Label */}
          <div className="text-[10px] sm:text-[12px] font-mono font-bold tracking-[0.22em] uppercase text-black/85">
            2026 &bull; ALL RIGHTS RESERVED - SAMURAI ARCHIVE
          </div>
        </div>

        {/* ──────────────── 2. POSTER CARDS GRID (S0, S1, S2, S3, S4, S5, S11) ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 my-8 sm:my-14">
          {POSTERS.map((poster, index) => {
            const isFullWidthBanner = index === 6; // S11 is the 7th image: featured spanning card
            return (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative rounded-[22px] sm:rounded-[28px] overflow-hidden bg-black shadow-lg group ${
                  isFullWidthBanner
                    ? 'sm:col-span-2 lg:col-span-3 aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1]'
                    : 'aspect-[9/15] sm:aspect-[9/14]'
                }`}
              >
                {/* Poster Background Image */}
                <img
                  src={getAssetUrl(poster.image)}
                  alt={poster.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Editorial Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

                {/* Top Corner Badge & Asterisk */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-2">
                    <AsteriskIcon className="w-5 h-5 text-white drop-shadow-md" />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-white/80">
                      {poster.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-serif tracking-widest text-white/70">
                    {poster.kanji}
                  </span>
                </div>

                {/* Middle / Bottom Content Overlay (Matching Reference Typography) */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10 flex flex-col justify-end text-white">
                  {/* Asterisk Accent */}
                  <AsteriskIcon className="w-4 h-4 text-white/90 mb-2 drop-shadow-sm" />

                  {/* Main Uppercase Headline */}
                  <h3 className="font-['Space_Grotesk',sans-serif] font-black text-2xl sm:text-3xl lg:text-[34px] leading-[1.05] tracking-tight uppercase text-white mb-2 whitespace-pre-line drop-shadow-md">
                    {poster.title}
                  </h3>

                  {/* Description Subtitle */}
                  <p className="text-[11px] sm:text-[12.5px] font-normal leading-snug text-white/80 max-w-sm mb-4 drop-shadow-sm">
                    {poster.subtitle}
                  </p>

                  {/* Bottom Brand Mark & Index */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-white/70">
                    <span className="font-bold text-white tracking-widest">{poster.brandMark}</span>
                    <span>ARCHIVE {poster.id.toUpperCase()}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ──────────────── 3. BOTTOM EDITORIAL METADATA GRID (MATCHING REFERENCE EXACTLY) ──────────────── */}
        <div className="w-full pt-8 sm:pt-12 border-t border-black/15 text-black">
          {/* Top Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-[10px] sm:text-[11.5px] font-mono font-bold leading-relaxed tracking-wider uppercase">
            <div>
              <span className="block text-black/50 text-[9px]">ITEM:</span>
              <span>SAMURAI SERVICE</span>
              <span className="block text-black/50 text-[9px] mt-2">SCOPE:</span>
              <span>BUSHIDO IDENTITY</span>
            </div>

            <div>
              <span className="block text-black/50 text-[9px]">REGISTRY:</span>
              <span className="text-sm font-black tracking-widest">777777</span>
            </div>

            <div>
              <span className="block text-black/50 text-[9px]">VISUAL SYSTEM:</span>
              <span>EDO / SENGOKU ERA</span>
              <span className="block text-black/50 text-[9px] mt-2">CRAFT:</span>
              <span>ART DIRECTION</span>
            </div>

            <div>
              <span className="block text-black/50 text-[9px]">ARMOR PIECES:</span>
              <span>KABUTO &bull; MENPO</span>
              <span className="block text-black/50 text-[9px] mt-2">WEAPONRY:</span>
              <span>TAMAHAGANE KATANA</span>
            </div>

            <div>
              <span className="block text-black/50 text-[9px]">BRAND IDENTITY:</span>
              <span>FOR AMBITIOUS WARRIORS</span>
              <span className="block text-black/50 text-[9px] mt-2">ARCHIVE:</span>
              <span>LIMITED EDITION 2026</span>
            </div>
          </div>

          {/* Bottom Sub-row */}
          <div className="mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[9.5px] sm:text-[11px] font-mono font-extrabold tracking-[0.18em] uppercase text-black/75">
            <span>SAMURAI LAB</span>
            <span>LIMITED EDITION BRAND EXPERIENCE</span>
            <span>STRATEGY, DESIGN AND ART DIRECTION</span>
            <span>&copy; 2026 ALL RIGHTS RESERVED</span>
          </div>
        </div>

      </div>
    </section>
  );
}
