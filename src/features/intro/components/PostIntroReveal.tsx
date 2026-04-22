'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode } from 'react';

import { useIntroLoading } from '@/features/intro/components/IntroLoadingContext';

const CONTENT_FADE_MS = 1000;
const REDUCED_MOTION_FADE_MS = 120;

type PostIntroRevealProps = {
  children: ReactNode;
};

export function PostIntroReveal({ children }: PostIntroRevealProps) {
  const { hasIntroExited } = useIntroLoading();
  const shouldReduceMotion = useReducedMotion();

  const contentDuration = shouldReduceMotion ? REDUCED_MOTION_FADE_MS / 1000 : CONTENT_FADE_MS / 1000;

  return (
    <motion.div
      className="relative will-change-[opacity]"
      initial={false}
      animate={{ opacity: hasIntroExited ? 1 : 0 }}
      transition={{ duration: contentDuration, ease: 'easeOut' }}
      style={{ pointerEvents: hasIntroExited ? 'auto' : 'none' }}>
      {children}
    </motion.div>
  );
}
