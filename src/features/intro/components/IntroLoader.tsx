'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { useIntroLoading } from '@/features/intro/components/IntroLoadingContext';
import { cn } from '@/shared/style/utils';

type Phase = 'loading' | 'cover' | 'fade' | 'done';

const MAX_PENDING_PROGRESS = 99;
const PRE_READY_PROGRESS_MS = 700;
const FINAL_PROGRESS_MS = 220;
const HOLD_MS = 100;
const COVER_MS = 700;
const FADE_MS = 650;
const YELLOW_HOLD_MS = 300;
const REDUCED_MOTION_FADE_MS = 180;

const TASKS = [
  'Next.js',
  'React components',
  'TypeScript',
  'Responsive UI',
  'Project cards',
  'Motion details',
  'Accessibility check',
];

const pad2 = (n: number) => String(n).padStart(2, '0');
const pad3 = (n: number) => String(n).padStart(3, '0');

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [progressCompleted, setProgressCompleted] = useState(false);
  const { isReady, isTimedOut, pendingCount, totalCount } = useIntroLoading();
  const shouldReduceMotion = useReducedMotion();
  const startedAtRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const finishStartedAtRef = useRef<number | null>(null);
  const finishStartProgressRef = useRef(0);
  const previousOverflow = useRef('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgressCompleted(true);
    }, PRE_READY_PROGRESS_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Lock scroll during loading
  useEffect(() => {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  const shouldFinishLoading = (isReady || isTimedOut) && progressCompleted;
  const completedCount = Math.max(0, totalCount - pendingCount);

  useEffect(() => {
    if (phase !== 'loading' || shouldReduceMotion) return;

    let animationFrame: number | undefined;
    let holdTimer: number | undefined;

    const setProgressValue = (value: number) => {
      const nextProgress = Math.min(100, Math.max(0, value));
      progressRef.current = nextProgress;
      setProgress(nextProgress);
    };

    const tick = (now: number) => {
      if (startedAtRef.current === null) startedAtRef.current = now;

      if (shouldFinishLoading) {
        if (finishStartedAtRef.current === null) {
          finishStartedAtRef.current = now;
          finishStartProgressRef.current = progressRef.current;
        }

        const e = now - finishStartedAtRef.current;
        const amount = Math.min(1, e / FINAL_PROGRESS_MS);
        const easedAmount = 1 - Math.pow(1 - amount, 3);
        const nextProgress = finishStartProgressRef.current + (100 - finishStartProgressRef.current) * easedAmount;

        setProgressValue(nextProgress);

        if (amount >= 1) {
          holdTimer = window.setTimeout(() => {
            setPhase('cover');
          }, HOLD_MS);
          return;
        }
      } else {
        finishStartedAtRef.current = null;

        const e = now - startedAtRef.current;
        const timeProgress = Math.min(MAX_PENDING_PROGRESS, (e / PRE_READY_PROGRESS_MS) * MAX_PENDING_PROGRESS);
        const taskProgress = totalCount > 0 ? (completedCount / totalCount) * MAX_PENDING_PROGRESS : 0;
        const targetProgress = Math.min(MAX_PENDING_PROGRESS, Math.max(timeProgress, taskProgress));
        const nextProgress = progressRef.current + (targetProgress - progressRef.current) * 0.12;

        setProgressValue(nextProgress);
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (holdTimer) window.clearTimeout(holdTimer);
    };
  }, [completedCount, phase, shouldFinishLoading, shouldReduceMotion, totalCount]);

  useEffect(() => {
    if (!shouldReduceMotion || phase !== 'loading' || !shouldFinishLoading) return;

    const timer = window.setTimeout(() => {
      setPhase('fade');
    }, 50);

    return () => window.clearTimeout(timer);
  }, [phase, shouldFinishLoading, shouldReduceMotion]);

  useEffect(() => {
    if (phase !== 'cover') return;

    const timer = window.setTimeout(() => {
      setPhase('fade');
    }, COVER_MS + YELLOW_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fade') return;

    const timer = window.setTimeout(() => setPhase('done'), shouldReduceMotion ? REDUCED_MOTION_FADE_MS : FADE_MS);

    return () => window.clearTimeout(timer);
  }, [phase, shouldReduceMotion]);

  useEffect(() => {
    if (phase === 'done') {
      document.body.style.overflow = previousOverflow.current;
    }
  }, [phase]);

  if (phase === 'done') return null;

  const showLoadingUI = phase === 'loading';
  const showYellowLayer = phase === 'cover' || phase === 'fade';
  const visualProgress = shouldReduceMotion ? (shouldFinishLoading ? 100 : MAX_PENDING_PROGRESS) : progress;
  const displayProgress = Math.round(visualProgress);
  const completedTasks = Math.min(TASKS.length, Math.floor((visualProgress / 100) * TASKS.length));
  const activeIdx = Math.min(TASKS.length - 1, completedTasks);

  const uiFade = {
    animate: { opacity: showLoadingUI ? 1 : 0 },
    transition: { duration: shouldReduceMotion ? 0.1 : 0.3, ease: 'easeOut' as const },
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] overflow-hidden text-white',
        phase === 'fade' ? 'bg-transparent' : 'bg-[#0a0a0a]',
      )}>
      {/* 12-column grid lines */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px)]',
          'bg-[length:calc(100%/12)_100%]',
        )}
      />

      {/* Top bar */}
      <motion.div
        {...uiFade}
        className={cn(
          'absolute top-0 right-0 left-0 z-10 flex items-center justify-between',
          'px-7 py-5 font-mono text-[12px] tracking-[0.08em] text-white/55',
        )}>
        <span>YDJ — PORTFOLIO / 2026</span>
      </motion.div>

      {/* Big type — left-anchored, vertically centred */}
      <motion.div {...uiFade} className={cn('absolute top-1/2 left-[6%] z-10 max-w-[88%] -translate-y-1/2')}>
        <div className={cn('text-[clamp(44px,9vw,156px)]', 'leading-[0.9] font-semibold tracking-[-0.04em]')}>
          <div className={cn('whitespace-nowrap')}>윤동주</div>
          <div className={cn('whitespace-nowrap text-accent')}>
            포트폴리오<span className={cn('text-white')}>.</span>
          </div>
        </div>
        <div
          className={cn(
            'mt-10 flex flex-wrap gap-x-8 gap-y-1',
            'font-mono text-[13px] tracking-[0.04em] text-white/60',
          )}>
          <span>FRONTEND&nbsp;ENGINEER</span>
          <span>INTERACTION · MOTION</span>
          <span>SINCE. 2026</span>
        </div>
      </motion.div>

      {/* Task console — bottom right */}
      <motion.div
        {...uiFade}
        className={cn('absolute right-7 bottom-24 z-10 w-[260px] font-mono text-[12px] leading-[1.9]')}>
        {TASKS.map((task, i) => {
          const done = i < completedTasks;
          const active = i === activeIdx && !done;
          return (
            <div
              key={task}
              className={cn(
                'flex justify-between',
                done && 'text-accent',
                active && 'text-white',
                !done && !active && 'text-white/35',
              )}>
              <span>
                {pad2(i + 1)} · {task}
              </span>
              <span>{done ? 'OK' : active ? '...' : '—'}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Progress bar — pinned to bottom */}
      <motion.div {...uiFade} className={cn('absolute right-7 bottom-7 left-7 z-10')}>
        <div className={cn('mb-3 flex items-baseline justify-between', 'font-mono text-[12px] text-white/55')}>
          <span>LOADING</span>
          <span className={cn('text-[24px] text-white tabular-nums')}>
            <span className={cn('text-accent')}>{pad3(displayProgress)}</span>
            <span className={cn('text-white/35')}> / 100</span>
          </span>
        </div>
        <div className={cn('relative h-[2px] overflow-hidden bg-white/[0.12]')}>
          <motion.div
            className={cn('absolute inset-y-0 left-0 w-full origin-left bg-accent')}
            initial={false}
            animate={{ scaleX: visualProgress / 100 }}
            transition={{ duration: 0 }}
          />
        </div>
      </motion.div>

      {/* Yellow cover: sweeps left → right, then fades */}
      <motion.div
        className={cn(
          'absolute inset-0 z-30 bg-accent',
          'will-change-[transform,opacity] [backface-visibility:hidden]',
        )}
        initial={{ x: '-100%' }}
        animate={{
          x: showYellowLayer ? '0%' : '-100%',
          opacity: phase === 'fade' ? 0 : 1,
        }}
        transition={{
          x: {
            duration: shouldReduceMotion ? 0 : COVER_MS / 1000,
            ease: [0.6, 0, 0.5, 0],
          },
          opacity: {
            duration: shouldReduceMotion ? REDUCED_MOTION_FADE_MS / 1000 : FADE_MS / 1000,
            ease: 'easeOut',
          },
        }}
      />
    </div>
  );
}
