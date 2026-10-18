/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplitFlapText from './SplitFlapText';

interface SamuraiLoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

const SAMURAI_WORDS = [
  'SAMURAI READY',
  'WAY OF WARRIOR',
  'KATANA UNLEASHED',
  'LIMBASIYA KAVY'
];

const STATUS_MESSAGES = [
  'FORGING TAMAHAGANE BLADE...',
  'CALIBRATING KABUTO TELEMETRY...',
  'SYNCHRONIZING BUSHIDO PROTOCOLS...',
  'MASTER THE BLADE. WALK YOUR PATH.'
];

export default function SamuraiLoadingScreen({
  onComplete,
  minDuration = 3200
}: SamuraiLoadingScreenProps) {
  const [percent, setPercent] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(44);
  const completedRef = useRef<boolean>(false);

  // Responsive font size adjustment for SplitFlapText
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setFontSize(19);
      } else if (w < 768) {
        setFontSize(26);
      } else if (w < 1024) {
        setFontSize(36);
      } else {
        setFontSize(44);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const finishLoading = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsDone(true);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  // Progress simulation
  useEffect(() => {
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      setPercent(progress);

      if (progress > 85) {
        setStatusIndex(3);
      } else if (progress > 55) {
        setStatusIndex(2);
      } else if (progress > 25) {
        setStatusIndex(1);
      } else {
        setStatusIndex(0);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(finishLoading, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [minDuration]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#07080A] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-pointer"
          onClick={finishLoading}
        >
          {/* Subtle Cyber-Feudal Background Grid & Ambient Red Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

          {/* ──────────────── 1. HEADER TELEMETRY ──────────────── */}
          <div className="relative z-10 w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-400">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF3E14] animate-pulse shadow-sm shadow-red-500/50" />
              <span className="text-white font-bold tracking-[0.2em] uppercase font-['Space_Grotesk',sans-serif]">
                LIMBASIYA KAVY // SYSTEM BOOT
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-neutral-500">
              <span>EDO // KYOTO PROTOCOL</span>
              <span className="text-neutral-400">BUILD 2026.10</span>
            </div>
          </div>

          {/* ──────────────── 2. CENTER SPLIT FLAP BOARD ──────────────── */}
          <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center my-auto py-8">
            {/* Top Kanji / Brand Mon */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-5 h-[1px] bg-red-500/60" />
              <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.3em] uppercase text-[#FF3E14]">
                武士道 &bull; BUSHIDO TELEMETRY
              </span>
              <span className="w-5 h-[1px] bg-red-500/60" />
            </motion.div>

            {/* Split Flap Display Board */}
            <div className="w-full flex justify-center py-2 sm:py-4 overflow-x-auto no-scrollbar">
              <SplitFlapText
                words={SAMURAI_WORDS}
                flipDuration={0.09}
                stagger={0.045}
                cycleDelay={2000}
                charset="alphanumeric"
                flipsPerChar={6}
                order="left"
                align="center"
                tileStyle="board"
                tileColor="#101216"
                textColor="#FFFFFF"
                glare={0.3}
                depth={0.6}
                tileRadius={8}
                gap={fontSize > 30 ? 6 : 3.5}
                fontSize={fontSize}
                fontFamily="'SamuraiWarrior', 'Space Grotesk', monospace"
                loop
                padTo={16}
                intro
                className="drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
              />
            </div>

            {/* Animated Status Message Log */}
            <div className="h-6 mt-8 sm:mt-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase text-neutral-400 text-center"
                >
                  &gt; {STATUS_MESSAGES[statusIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Sleek Red Progress Line */}
            <div className="w-full max-w-md mt-6 bg-neutral-900 h-1.5 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-[#FF3E14] to-red-400"
                style={{ width: `${percent}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* ──────────────── 3. FOOTER CONTROLS ──────────────── */}
          <div className="relative z-10 w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-500">
            <span className="hidden sm:inline">RAJKOT - KYOTO - GLOBAL</span>
            <span className="text-neutral-400">MAINFRAME HERO STUDIO</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finishLoading();
              }}
              className="text-white/80 hover:text-white px-3 py-1 rounded border border-white/15 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all cursor-pointer uppercase text-[10px]"
            >
              SKIP [SPACE]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
