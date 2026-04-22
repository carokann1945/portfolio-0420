import { GlitchText } from '@/shared/components/GlitchText';
import { cn } from '@/shared/style/utils';

import { AboutLead } from './AboutLead';
import { Strengths } from './Strengths';
import { Timeline } from './Timeline';

export default function About() {
  return (
    <section
      id="about"
      className={cn(
        'relative min-h-dvh scroll-mt-16 bg-white px-6 pt-24 pb-24 text-ink',
        'md:scroll-mt-20 md:px-10 md:pt-32 md:pb-32 xl:scroll-mt-0',
      )}>
      <div className="mx-auto w-full max-w-[1400px]">
        <div
          className={cn(
            'mb-6 flex items-center gap-3 font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/50 md:text-[12px]',
          )}>
          <span className="h-px w-8 bg-black" />
          <span>05 · ABOUT</span>
        </div>

        <h2
          className="mb-10 font-semibold tracking-[-0.03em] md:mb-14"
          style={{ fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.95 }}>
          <GlitchText text="About" />
          <span className="text-accent">.</span>
        </h2>

        <AboutLead />
        <Strengths />
        <Timeline />
      </div>
    </section>
  );
}
