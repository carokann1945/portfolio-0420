import { cn } from '@/shared/style/utils';

import { HeroLinks } from './HeroLinks';
import { HeroStatus } from './HeroStatus';
import { TechStack } from './TechStack';

export default function Hero() {
  return (
    <section
      id="home"
      className={cn(
        'relative mt-16 min-h-dvh scroll-mt-16 overflow-hidden bg-white text-ink',
        'md:mt-20 md:scroll-mt-20 xl:mt-0 xl:scroll-mt-0',
      )}>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[linear-gradient(to_right,rgba(0,0,0,.05)_1px,transparent_1px)]',
          'bg-[length:calc(100%/12)_100%]',
        )}
      />

      <div
        className={cn(
          'absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-6 pt-6',
          'font-jetbrains-mono text-[11px] tracking-[0.08em] text-black/55',
          'md:px-10 md:pt-7 md:text-[12px]',
        )}>
        <span>YDJ — PORTFOLIO / 2026</span>
        <span className="hidden md:inline">FRONTEND ENGINEER</span>
      </div>

      <div
        className={cn(
          'relative z-10 mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col justify-center',
          'px-6 pt-28 pb-24 md:px-10 md:pt-32 md:pb-32 xl:pt-20 xl:pb-24',
        )}>
        <div
          className={cn(
            'mb-6 flex items-center gap-3 font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/55 md:text-[12px]',
          )}>
          <span className="h-px w-8 bg-black" />
          <span>01 · HOME</span>
        </div>

        <h1
          className="font-semibold tracking-[-0.04em] whitespace-nowrap"
          style={{ fontSize: 'clamp(64px, 12vw, 180px)', lineHeight: 0.9 }}>
          윤동주
        </h1>

        <h2
          className="mt-3 font-semibold tracking-[-0.03em] whitespace-nowrap"
          style={{ fontSize: 'clamp(28px, 5vw, 72px)', lineHeight: 0.95 }}>
          <span className="relative inline-block">
            프론트엔드
            <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.1em] -z-10 h-[0.35em] bg-accent" />
          </span>
          <span> 엔지니어</span>
        </h2>

        <HeroStatus />

        <TechStack />
        <HeroLinks />
      </div>
    </section>
  );
}
