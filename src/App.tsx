/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Shield,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';
import heroVideo from './lv_0_20261010112733.mp4';
import TP67Section from './components/TP67Section';
import EgoLabPosterSection from './components/EgoLabPosterSection';
import OurCircleSection from './components/OurCircleSection';
import SamuraiCursor from './components/SamuraiCursor';
import SamuraiLoadingScreen from './components/SamuraiLoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Global Theme: Dark / Light Mode with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return false; // Default clean gallery light mode
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', next);
      }
      return next;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  // References for video & smooth scrubbing
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgress = useRef<number>(0.2);
  const currentProgress = useRef<number>(0.2);
  const animationFrameId = useRef<number | null>(null);
  const isSeeking = useRef<boolean>(false);



  // High-performance Video Scrubbing Engine (retains 3D rotation on cursor move without UI badge)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const onSeeked = () => {
      isSeeking.current = false;
    };

    video.addEventListener('seeked', onSeeked);

    const renderLoop = () => {
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const diff = targetProgress.current - currentProgress.current;
        if (Math.abs(diff) > 0.0008) {
          currentProgress.current += diff * 0.16;
          const normalized = Math.min(Math.max(currentProgress.current, 0), 1);
          const targetTime = normalized * video.duration;
          if (!isSeeking.current && Math.abs(video.currentTime - targetTime) > 0.018) {
            isSeeking.current = true;
            video.currentTime = Math.min(Math.max(0, targetTime), video.duration - 0.001);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
      } else {
        return;
      }

      const progress = Math.min(Math.max(clientX / window.innerWidth, 0), 1);
      targetProgress.current = progress;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      video.removeEventListener('seeked', onSeeked);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen transition-colors duration-700 font-sans antialiased overflow-x-hidden selection:bg-red-600 selection:text-white scroll-smooth ${
        isDarkMode ? 'bg-[#0A0B0E] text-white dark' : 'bg-white text-black'
      }`}
    >
      {/* ──────────────── SPLIT FLAP SAMURAI LOADING SCREEN ──────────────── */}
      {isLoading && (
        <SamuraiLoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* ──────────────── CUSTOM SAMURAI BLADE CURSOR (DESKTOP) ──────────────── */}
      <SamuraiCursor isDarkMode={isDarkMode} />
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION (MINIMALIST FULL BLEED STUDIO)                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[100dvh] lg:h-screen overflow-hidden flex flex-col justify-between bg-[#18191c] text-white">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            src={heroVideo}
            className="w-full h-full object-cover object-center opacity-100 scale-100 transition-opacity duration-700"
          >
            <source src={heroVideo} type="video/mp4" />
            <source src="/lv_0_20261010112733.mp4" type="video/mp4" />
          </video>

          {/* Micro-wash gradient for crisp contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />
        </div>

        {/* Clean Top Navigation Bar */}
        <header className="relative z-30 w-full px-4 sm:px-8 lg:px-16 pt-5 sm:pt-8 flex items-center justify-between">
          {/* Brand Wordmark with Custom Samurai Font */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveModal('discover')}
              className="font-samurai text-[18px] sm:text-[22px] md:text-[25px] font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white hover:text-white/80 transition-opacity cursor-pointer drop-shadow-md select-none"
            >
              SAMURAI
            </button>
          </div>

          {/* Header Actions: Portfolio Link & Dark/Light Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              id="portfolio-header-btn"
              href="https://kavylimbasiya.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Kavy Limbasiya Portfolio"
              className="flex items-center gap-1.5 sm:gap-2 bg-black/40 hover:bg-black/70 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-white/20 hover:border-white/40 text-white text-[10px] sm:text-[12px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 group"
            >
              <span>PORTFOLIO</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark and light mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 transition-transform duration-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-300" />
              )}
            </button>
          </div>
        </header>

        {/* Main Hero Content */}
        <main className="relative z-20 w-full px-4 sm:px-8 lg:px-16 pt-6 pb-6 sm:pb-10 lg:pb-12 flex-1 flex flex-col justify-end">
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 lg:gap-16">
            {/* Bottom-Left Area */}
            <div className="flex flex-col max-w-2xl">
              {/* Giant 2-line Headline with Custom Samurai Font */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-samurai text-3xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-[0.03em] sm:tracking-[0.04em] text-white leading-[1.1] mb-4 sm:mb-6 drop-shadow-lg uppercase"
              >
                Master the blade.
                <br />
                Walk your path.
              </motion.h1>

              {/* Left Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-white/85 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed max-w-lg drop-shadow-md font-normal"
              >
                The samurai were the legendary elite warrior nobility of premodern Japan, bound by the sacred code of Bushido. Renowned for their mastery of the katana, rigorous mental discipline, and elaborate Kabuto armor, their indomitable spirit and unwavering devotion to honor continue to define the cultural soul of Japan across centuries.
              </motion.p>
            </div>

            {/* Bottom-Right Area */}
            <div className="flex flex-col items-start lg:items-end max-w-md self-start lg:self-end">
              {/* Right Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="text-white/80 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed max-w-sm drop-shadow-md text-left lg:text-left font-normal"
              >
                From disciplined Zen meditation to explosive martial mastery, the warrior’s soul was said to dwell within their blade. Every contour of the lacquered crest and menacing Menpo mask was engineered to strike awe into adversaries while protecting life.
              </motion.p>
            </div>
          </div>


        </main>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. SECTION 2: T-P67 SAMURAI EDITORIAL INTERFACE                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TP67Section isDarkMode={isDarkMode} />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. SECTION 3: EGO LAB 6-POSTER BRUTALIST RED GRID (NEW)          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <EgoLabPosterSection isDarkMode={isDarkMode} />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. LAST SECTION: OUR CIRCLE LUXURY PLAYING CARDS ART GALLERY      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <OurCircleSection isDarkMode={isDarkMode} />

      {/* ──────────────── FLOATING QUICK THEME TOGGLE (BOTTOM RIGHT) ──────────────── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* ──────────────── MODAL DIALOGS FOR RICH SAMURAI LORE ──────────────── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md text-white"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#141518] border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-white/90" />
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">
                      Samurai Heritage Archive
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white capitalize">
                      The Legacy of the Samurai
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="mt-6 space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-white/80">
                <p>
                  The <strong>Samurai</strong> (武士, bushi) were the military nobility and officer caste of medieval and early-modern Japan from the late 12th century until their abolition in the late 1870s.
                </p>
                <p>
                  More than mere combatants, samurai were educated patrons of the arts, practicing calligraphy, the tea ceremony (Chado), poetry, and rock gardening alongside lethal mastery of archery, horsemanship, and swordsmanship (Kenjutsu).
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2 mt-4 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-white/50">Historic Era:</span>
                    <span className="text-white">Kamakura &bull; Muromachi &bull; Edo (1185–1868)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Primary Weapon:</span>
                    <span className="text-white">Katana &bull; Wakizashi (Daisho Pair)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Core Philosophy:</span>
                    <span className="text-white">Zen Buddhism &bull; Neo-Confucian Duty</span>
                  </div>
                </div>
              </div>

              {/* Close Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Close & Continue Exploring
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
