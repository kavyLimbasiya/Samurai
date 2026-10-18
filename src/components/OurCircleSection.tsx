/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CardItem {
  id: string;
  artist: string;
  title: string;
  image: string;
  tag: string;
  quote: string;
}

const CARDS: CardItem[] = [
  {
    id: 'art-1',
    artist: 'LEONARDOWORX',
    title: 'Kinetic Geometry',
    image: '/images/s6.jpg',
    tag: 'FLUID SCULPTURE',
    quote: 'Creating environments digital with audiences quality.'
  },
  {
    id: 'art-2',
    artist: 'KHYATI TREHAN',
    title: 'Prismatic Forge',
    image: '/images/s7.jpg',
    tag: 'TACTILE FORMS',
    quote: 'Exploring dimensional tactile forms in digital spaces.'
  },
  {
    id: 'art-3',
    artist: 'AUGUSTE LEFOU',
    title: 'The Mystic Halo',
    image: '/images/s8.jpg',
    tag: 'SURREAL BUSHIDO',
    quote: "Auguste Lefou's work has gained popularity among digital art enthusiasts."
  },
  {
    id: 'art-4',
    artist: 'JONATHAN',
    title: 'Imperial Totem',
    image: '/images/s9.jpg',
    tag: 'DIVINE ARCHITECTURE',
    quote: 'Architectural monuments elevated above digital realms.'
  },
  {
    id: 'art-5',
    artist: 'VICTOR VECTOR',
    title: 'Obsidian Matrix',
    image: '/images/s12.jpg',
    tag: 'CRYSTAL TENSION',
    quote: 'Deconstructing geometric gravity and crystalline lattices.'
  },
  {
    id: 'art-6',
    artist: 'RYAN HAWTHORNE',
    title: 'Liquid Chrome',
    image: '/images/s13.jpg',
    tag: 'MERCURY KINETICS',
    quote: 'Capturing the stillness between liquid metal and motion.'
  },
  {
    id: 'art-7',
    artist: 'OMAR AQIL',
    title: 'Cubist Kabuto',
    image: '/images/s14.jpg',
    tag: 'SURREAL VISOR',
    quote: 'Intersecting classical form with surreal cyber-cubism.'
  },
  {
    id: 'art-8',
    artist: 'ASH THORP',
    title: 'Crimson Mirage',
    image: '/images/s15.jpg',
    tag: 'SPECTRAL BUSHIDO',
    quote: 'Dissolving the boundary between myth and kinetic fury in a crimson blur.'
  }
];

interface OurCircleSectionProps {
  isDarkMode?: boolean;
}

export default function OurCircleSection({ isDarkMode = false }: OurCircleSectionProps) {
  const [activeCardId, setActiveCardId] = useState<string>('art-3');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const activeCard = CARDS.find((c) => c.id === activeCardId) ?? CARDS[2];

  // Duplicate cards for seamless infinite left-to-right marquee loop
  const loopCards = [...CARDS, ...CARDS];

  return (
    <section
      id="our-circle-section"
      className={`relative w-full transition-colors duration-700 overflow-hidden py-14 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-14 selection:bg-red-600 selection:text-white ${isDarkMode ? 'bg-[#0A0B0E] text-white' : 'bg-[#ECEEF0] text-[#0F1012]'
        }`}
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-between min-h-[720px]">

        {/* ──────────────── 1. INFINITE LEFT-TO-RIGHT MARQUEE LOOP CAROUSEL ──────────────── */}
        <div
          className="relative w-full my-6 sm:my-10 overflow-hidden py-4 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle edge fade masks */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-inherit to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-inherit to-transparent" />

          {/* Animated Marquee Container moving left to right */}
          <motion.div
            className="flex items-center gap-5 sm:gap-7 w-max"
            animate={{
              x: isPaused ? undefined : ['-50%', '0%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 28,
                ease: 'linear'
              }
            }}
          >
            {loopCards.map((card, index) => {
              const isSelected = card.id === activeCardId;

              return (
                <motion.div
                  key={`${card.id}-${index}`}
                  onClick={() => setActiveCardId(card.id)}
                  whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.2 } }}
                  className={`group relative flex-shrink-0 w-[160px] sm:w-[210px] md:w-[250px] aspect-[1/1.52] rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl transition-all duration-300 select-none ${isSelected
                    ? 'ring-2 ring-red-500 shadow-red-950/40 scale-[1.03]'
                    : 'hover:shadow-2xl opacity-90 hover:opacity-100'
                    }`}
                >
                  {/* Full Cover Artwork (covers whole card) */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Minimal Bottom Label */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white z-10">
                    <span className="block text-[10px] font-mono tracking-widest uppercase opacity-75 mb-0.5">
                      {card.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold tracking-tight truncate drop-shadow-md">
                      {card.artist}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ──────────────── 2. EDITORIAL NARRATIVE & METRICS ──────────────── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-6 sm:my-10 items-end">
          {/* Left Text */}
          <div className="max-w-md">
            <p className="text-[14px] sm:text-[15px] font-normal leading-snug tracking-tight">
              Creating environments digital
              <br />
              with audiences quality.
            </p>
            <div className="mt-2.5 flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ENDLESS ROTATION &bull; {CARDS.length} ARCHIVES</span>
            </div>
          </div>

          {/* Right Dynamic Artist Bio / Lore Text */}
          <div className="md:text-right flex flex-col md:items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-[13px] sm:text-[14px] font-normal leading-snug tracking-tight">
                  {activeCard.quote}
                </p>
                <div className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase opacity-55">
                  SELECTED ARTWORK: {activeCard.artist} ({cardTitle(activeCard.title)})
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ──────────────── 3. GIANT ICONIC "LIMBASIYA KAVY" BOTTOM TITLE ──────────────── */}
        <div className="w-full pt-6 sm:pt-10 border-t border-black/10 dark:border-white/10">
          {/* Subheading: "made by" */}
          <div className="mb-1.5 sm:mb-2">
            <span className="font-bold-italic text-lg sm:text-2xl md:text-3xl tracking-tight opacity-90 select-none">
              made by
            </span>
          </div>

          {/* Retexted to "LIMBASIYA KAVY" as Samurai Font */}
          <h2 className="font-samurai text-3xl sm:text-5xl md:text-7xl lg:text-[104px] tracking-[0.03em] sm:tracking-[0.05em] leading-none uppercase my-2 drop-shadow-md select-none transition-colors duration-500 break-words">
            LIMBASIYA KAVY
          </h2>
        </div>

      </div>
    </section>
  );
}

function cardTitle(title: string) {
  return title;
}
