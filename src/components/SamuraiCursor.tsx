/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

type CursorType = 'none' | 'clickable' | 'media' | 'image';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

interface SamuraiCursorProps {
  isDarkMode?: boolean;
}

export default function SamuraiCursor({ isDarkMode = false }: SamuraiCursorProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cursorType, setCursorType] = useState<CursorType>('none');
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const rippleIdRef = useRef<number>(0);

  // Raw instantaneous mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring-interpolated smooth trailing position (matching portfolio physics)
  const springConfig = { stiffness: 380, damping: 24, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only active on desktop fine pointer devices
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    document.body.classList.add('samurai-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('video, [data-cursor="media"], .media-preview')) {
          setCursorType('media');
        } else if (target.closest('img, [data-cursor="image"], .image-expand')) {
          setCursorType('image');
        } else if (
          target.closest(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-clickable="true"]'
          )
        ) {
          setCursorType('clickable');
        } else {
          setCursorType('none');
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const newRipple: ClickRipple = {
        id: ++rippleIdRef.current,
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('samurai-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Self-cleaning ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isVisible) return null;

  const isInteractive = cursorType !== 'none';
  const isMediaOrImage = cursorType === 'media' || cursorType === 'image';

  // Responsive target box size
  const targetSize = isMediaOrImage ? 52 : isInteractive ? 36 : 20;

  // Adaptive colors for dark & light modes
  const defaultBorderColor = isDarkMode
    ? 'rgba(255, 255, 255, 0.75)'
    : 'rgba(15, 16, 18, 0.7)';
  const defaultBgColor = isDarkMode
    ? 'rgba(255, 255, 255, 0.02)'
    : 'rgba(0, 0, 0, 0.02)';

  return (
    <>
      {/* ──────────────── 1. CLICK EXPANDING RIPPLE SQUARES ──────────────── */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.2, opacity: 0.85, borderWidth: '2px' }}
          animate={{ scale: 2.8, opacity: 0, borderWidth: '1px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none fixed z-[9998] rounded-none border border-[#FF3E14] -translate-x-1/2 -translate-y-1/2 w-8 h-8 hidden md:block"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        />
      ))}

      {/* ──────────────── 2. SPRING-FOLLOWING RETICLE BOX ──────────────── */}
      <motion.div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
        style={{ left: smoothX, top: smoothY }}
      >
        <motion.div
          animate={{
            width: targetSize,
            height: targetSize,
            rotate: isInteractive ? 45 : 0,
            scale: isMouseDown ? 0.8 : 1,
            borderColor: isInteractive ? '#FF3E14' : defaultBorderColor,
            backgroundColor: isInteractive ? 'rgba(255, 62, 20, 0.12)' : defaultBgColor
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 24, mass: 0.3 }}
          className="relative border backdrop-blur-[1px] flex items-center justify-center transition-colors shadow-sm"
        >
          {/* 4 Precision Corner Brackets in Portfolio Red [#FF3E14] */}
          <motion.span
            animate={{ opacity: isInteractive ? 1 : 0.45 }}
            className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#FF3E14]"
          />
          <motion.span
            animate={{ opacity: isInteractive ? 1 : 0.45 }}
            className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[#FF3E14]"
          />
          <motion.span
            animate={{ opacity: isInteractive ? 1 : 0.45 }}
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[#FF3E14]"
          />
          <motion.span
            animate={{ opacity: isInteractive ? 1 : 0.45 }}
            className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#FF3E14]"
          />

          {/* Contextual Action Labels */}
          <AnimatePresence>
            {cursorType === 'media' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: -45 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[8px] font-mono font-bold text-[#FF3E14] tracking-widest uppercase select-none"
              >
                PLAY
              </motion.span>
            )}

            {cursorType === 'image' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: -45 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className={`text-[8px] font-mono font-bold tracking-widest uppercase select-none ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                VIEW
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ──────────────── 3. INSTANT CENTER PIXEL DOT ──────────────── */}
      <motion.div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ left: mouseX, top: mouseY }}
      >
        <motion.div
          animate={{
            scale: isMouseDown ? 1.6 : isInteractive ? 0 : 1,
            backgroundColor: isInteractive
              ? '#FF3E14'
              : (isDarkMode ? '#FFFFFF' : '#0F1012')
          }}
          transition={{ duration: 0.1 }}
          className="w-1.5 h-1.5 rounded-none shadow-sm"
        />
      </motion.div>
    </>
  );
}
