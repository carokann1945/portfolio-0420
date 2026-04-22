import { cn } from '@/shared/style/utils';

import { ContactAside } from './ContactAside';
import { ContactForm } from './ContactForm';

export default function Contact() {
  return (
    <section
      id="contact"
      className={cn(
        'relative min-h-dvh scroll-mt-16 overflow-hidden bg-ink px-6 pt-24 pb-16 text-white',
        'md:scroll-mt-20 md:px-10 md:pt-32 xl:scroll-mt-0',
      )}>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px)]',
          'bg-[length:calc(100%/12)_100%]',
        )}
      />

      <div className={cn('relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-[1400px] flex-col')}>
        <div
          className={cn(
            'mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-white/55 md:text-[12px]',
          )}>
          <span className="h-px w-8 bg-accent" />
          <span>06 · CONTACT</span>
        </div>

        <h2
          className="font-semibold tracking-[-0.03em]"
          style={{ fontSize: 'clamp(44px, 9vw, 140px)', lineHeight: 0.9 }}>
          <span className="block">이야기를</span>
          <span className="block">
            <span className="text-accent">시작해볼까요</span>
            <span className="text-white">.</span>
          </span>
        </h2>

        <p className="mt-8 max-w-2xl text-[15px] leading-[1.9] text-white/70 md:text-[17px]">
          새로운 프로젝트, 협업 제안, 또는 가벼운 안부까지 — 아래 폼으로 바로 메일을 보낼 수 있어요.
        </p>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <ContactForm />
          <ContactAside />
        </div>

        <div className="mt-auto pt-16">
          <div
            className={cn(
              'flex flex-col gap-3 border-t border-white/10 pt-6',
              'font-mono text-[11px] tracking-[0.08em] text-white/45',
              'md:flex-row md:items-center md:justify-between md:text-[12px]',
            )}>
            <span>© 2026 YOON DONG JU — ALL RIGHTS RESERVED</span>
            <span>YDJ / PORTFOLIO / 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
