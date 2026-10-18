/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface TP67SectionProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function TP67Section({
  isDarkMode = false,
  onToggleTheme
}: TP67SectionProps) {
  return (
    <section
      id="tp67-section"
      className={`relative w-full min-h-screen py-10 sm:py-16 px-4 sm:px-8 lg:px-14 flex flex-col justify-between selection:bg-red-600 selection:text-white transition-colors duration-700 ${isDarkMode ? 'bg-[#0D0E11] text-white' : 'bg-white text-black'
        }`}
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-between flex-1">


        {/* ──────────────── 2. GIANT DISPLAY TITLE & METADATA BAR ──────────────── */}
        <div className="w-full text-center mt-6 sm:mt-12 mb-3 sm:mb-6">
          <div className="flex items-center justify-center select-none">
            <h2
              className={`font-samurai tracking-[0.03em] sm:tracking-[0.04em] uppercase text-4xl sm:text-6xl md:text-8xl lg:text-[96px] leading-none transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'
                }`}
            >
              SAMURAI
            </h2>
          </div>

          {/* 3-Column Aligned Samurai Subtitle */}
          <div
            className={`w-full flex items-center justify-between text-[9px] sm:text-[11px] md:text-[13px] font-['Space_Grotesk',sans-serif] font-black tracking-[0.14em] sm:tracking-[0.22em] md:tracking-[0.28em] uppercase pt-2.5 sm:pt-4 px-1 sm:px-3 transition-colors duration-500 ${isDarkMode ? 'text-neutral-400' : 'text-black'
              }`}
          >
            <span className="w-1/3 text-left">KYOTO</span>
            <span className="w-1/3 text-center truncate px-1">WAY OF THE WARRIOR</span>
            <span className="w-1/3 text-right">EDO</span>
          </div>
        </div>

        {/* ──────────────── 3. UPPER HERO CARD: S10 (SAKURA BLOSSOM) ──────────────── */}
        <div className="relative w-full rounded-[20px] sm:rounded-[34px] overflow-hidden aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.3/1] bg-[#141518] shadow-md my-4 sm:my-6 group">
          <img
            src="/images/k7.jpg"
            alt="Samurai Katana"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          {/* Subtle editorial vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Minimalist Watermark Badge in corner */}
          <div className="absolute top-3.5 sm:top-6 left-3.5 sm:left-6 z-10 bg-black/60 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 text-white text-[9px] sm:text-[11px] font-mono tracking-widest uppercase">
            SAKURA &bull; K7 ARCHIVE
          </div>
        </div>

        {/* ──────────────── 4. THREE CARDS GRID: K1, K2, K3 ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-6">
          {/* ──── CARD 1: K1 (OBSIDIAN DIAMOND KATANA) ──── */}
          <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[4/5] sm:aspect-[3.6/4] bg-[#0E0F12] shadow-sm group">
            <img
              src="/images/k1.jpg"
              alt="Obsidian Diamond Katana K1"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

            {/* Bottom Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white text-left font-['Space_Grotesk',sans-serif] leading-snug">
              <span className="block text-[12px] sm:text-[13px] font-bold-italic tracking-[0.16em] uppercase">
                OBSIDIAN KATANA
              </span>
              <span className="block text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white/90">
                TAMAHAGANE STEEL
              </span>
              <span className="block text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase text-neutral-300 mt-0.5">
                BLACK DIAMOND BLADE &bull; K1
              </span>
            </div>
          </div>

          {/* ──── CARD 2: K2 (DAMASCUS SAKURA TSUBA KATANA) ──── */}
          <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[4/5] sm:aspect-[3.6/4] bg-[#0E0F12] shadow-sm group">
            <img
              src="/images/k2.jpg"
              alt="Damascus Sakura Katana K2"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

            {/* Bottom Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white text-left font-['Space_Grotesk',sans-serif] leading-snug">
              <span className="block text-[12px] sm:text-[13px] font-bold-italic tracking-[0.16em] uppercase">
                DAMASCUS FORGE
              </span>
              <span className="block text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white/90">
                SAKURA GOLD TSUBA
              </span>
              <span className="block text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase text-neutral-300 mt-0.5">
                MASTER CRAFTSMANSHIP &bull; K2
              </span>
            </div>
          </div>

          {/* ──── CARD 3: K3 (GREAT WAVE BLUE PORCELAIN KATANA) ──── */}
          <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[4/5] sm:aspect-[3.6/4] bg-[#0E0F12] shadow-sm group">
            <img
              src="/images/k3.jpg"
              alt="Great Wave Porcelain Katana K3"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

            {/* Bottom Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white text-left font-['Space_Grotesk',sans-serif] leading-snug">
              <span className="block text-[12px] sm:text-[13px] font-bold-italic tracking-[0.16em] uppercase">
                GREAT WAVE BLADE
              </span>
              <span className="block text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white/90">
                COBALT PORCELAIN
              </span>
              <span className="block text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase text-neutral-300 mt-0.5">
                LEGENDARY WEAPONS &bull; K3
              </span>
            </div>
          </div>
        </div>

        {/* ──────────────── 5. EDITORIAL SAMURAI MANIFESTO STATEMENT ──────────────── */}
        <div className="w-full my-6 sm:my-8 px-2 sm:px-4">
          <p
            className={`text-[11px] sm:text-[12.5px] md:text-[13.5px] font-bold tracking-[0.06em] text-center max-w-4xl mx-auto uppercase leading-[1.8] transition-colors duration-500 ${isDarkMode ? 'text-neutral-300' : 'text-black'
              }`}
          >
            FORGED IN FIRE, TEMPERED IN HONOR, AND BOUND BY THE UNYIELDING CODE OF BUSHIDO. FROM THE ANCIENT FORGES OF BIZEN TO THE SNOW-COVERED BATTLEFIELDS OF SEKIGAHARA, THE SAMURAI LIVED NOT FOR FAME, BUT FOR ABSOLUTE MASTERY. ONE BLADE. ONE PURPOSE. UNCOMPROMISING RESOLVE. THE WAY OF THE WARRIOR NEVER DIES.
          </p>
        </div>

      </div>
    </section>
  );
}
