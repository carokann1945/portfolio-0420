'use client';

import { useEffect, useRef, useState } from 'react';

import { useIntroLoading } from '@/features/intro/components/IntroLoadingContext';
import { cn } from '@/shared/style/utils';

type GlitchTextProps = {
  text: string;
  className?: string;
};

export function GlitchText({ text, className }: GlitchTextProps) {
  const { hasIntroExited } = useIntroLoading();
  const textRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const shouldAnimate = hasIntroExited && isInView;

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { threshold: 0.8 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={textRef}
      className={cn('heading-glitch-text', shouldAnimate && 'heading-glitch-once', className)}
      data-text={text}>
      {text}
    </span>
  );
}
