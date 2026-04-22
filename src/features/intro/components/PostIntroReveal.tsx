'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Children, type ReactNode } from 'react';

import { useIntroLoading } from '@/features/intro/components/IntroLoadingContext';

const CONTENT_FADE_MS = 1000;
const SECTION_FADE_MS = 1000;
const REDUCED_MOTION_FADE_MS = 120;

type PostIntroRevealProps = {
  children: ReactNode;
};

export function PostIntroReveal({ children }: PostIntroRevealProps) {
  const { hasIntroExited } = useIntroLoading();
  const shouldReduceMotion = useReducedMotion();
  const childArray = Children.toArray(children);

  const contentDuration = shouldReduceMotion ? REDUCED_MOTION_FADE_MS / 1000 : CONTENT_FADE_MS / 1000;
  const sectionDuration = shouldReduceMotion ? REDUCED_MOTION_FADE_MS / 1000 : SECTION_FADE_MS / 1000;
  const sectionOffset = shouldReduceMotion ? 0 : 24;

  return (
    <motion.div
      className="relative will-change-[opacity]"
      initial={false}
      animate={{ opacity: hasIntroExited ? 1 : 0 }}
      transition={{ duration: contentDuration, ease: 'easeOut' }}
      style={{ pointerEvents: hasIntroExited ? 'auto' : 'none' }}>
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          className="will-change-[opacity,transform]"
          initial={{ opacity: 0, y: sectionOffset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: sectionDuration, ease: 'easeOut' }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
