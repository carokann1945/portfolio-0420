'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { useIntroLoading } from '@/features/intro/IntroLoadingContext';

type Phase = 'loading' | 'cover' | 'fade' | 'done';

const MAX_PENDING_PROGRESS = 99;
const PRE_READY_PROGRESS_MS = 700;
const FINAL_PROGRESS_MS = 220;
const HOLD_MS = 100; // 100%에서 잠깐 멈춤
const COVER_MS = 700; // 노란 화면이 왼쪽에서 오른쪽으로 덮는 시간
const FADE_MS = 650; // 노란 화면이 투명해지는 시간
const YELLOW_HOLD_MS = 300; //노란 화면이 덮은 이후 투명해지기 전 잠깐 멈출 시간
const REDUCED_MOTION_FADE_MS = 180;

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

  // 로딩 중에는 스크롤 잠금
  useEffect(() => {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  const shouldFinishLoading = (isReady || isTimedOut) && progressCompleted;
  const completedCount = Math.max(0, totalCount - pendingCount);

  // 준비 전에는 94%까지만 자연스럽게 차고, 준비되면 100%로 마무리
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
      if (startedAtRef.current === null) {
        startedAtRef.current = now;
      }

      if (shouldFinishLoading) {
        if (finishStartedAtRef.current === null) {
          finishStartedAtRef.current = now;
          finishStartProgressRef.current = progressRef.current;
        }

        const elapsed = now - finishStartedAtRef.current;
        const amount = Math.min(1, elapsed / FINAL_PROGRESS_MS);
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

        const elapsed = now - startedAtRef.current;
        const timeProgress = Math.min(MAX_PENDING_PROGRESS, (elapsed / PRE_READY_PROGRESS_MS) * MAX_PENDING_PROGRESS);
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

  // 움직임 최소화 환경에서는 실제 준비 상태만 기다리고 긴 진행 애니메이션은 생략
  useEffect(() => {
    if (!shouldReduceMotion || phase !== 'loading' || !shouldFinishLoading) return;

    const timer = window.setTimeout(() => {
      setPhase('fade');
    }, 50);

    return () => window.clearTimeout(timer);
  }, [phase, shouldFinishLoading, shouldReduceMotion]);

  // 노란 화면이 위로 덮고
  useEffect(() => {
    if (phase !== 'cover') return;

    const timer = window.setTimeout(() => {
      setPhase('fade');
    }, COVER_MS + YELLOW_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  // 투명해지며 종료
  useEffect(() => {
    if (phase !== 'fade') return;

    const timer = window.setTimeout(
      () => {
        setPhase('done');
      },
      shouldReduceMotion ? REDUCED_MOTION_FADE_MS : FADE_MS,
    );

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
  const progressLabelLeft = `clamp(3rem, ${visualProgress}%, calc(100% - 3rem))`;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* 검은 배경 */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        transition={{
          duration: phase === 'fade' ? 0 : shouldReduceMotion ? 0.1 : 0.35,
          ease: 'easeOut',
        }}
      />

      {/* 타이틀 */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          opacity: showLoadingUI ? 1 : 0,
          y: showLoadingUI ? 0 : 16,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.24,
          ease: 'easeOut',
        }}>
        <div className="absolute top-[30%] left-1/2 w-full max-w-[calc(100vw_-_48px)] -translate-x-1/2 -translate-y-1/2 text-center text-[32px] font-semibold text-white sm:text-[40px]">
          윤동주 포트폴리오
        </div>
      </motion.div>

      {/* 진행 바 + 숫자 */}
      <motion.div
        className="absolute inset-0 z-20"
        animate={{
          opacity: showLoadingUI ? 1 : 0,
          y: showLoadingUI ? 0 : 16,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.24,
          ease: 'easeOut',
        }}>
        <div className="absolute top-[64%] left-1/2 w-[min(880px,calc(100vw_-_48px))] -translate-x-1/2 -translate-y-1/2">
          <div className="relative pb-10">
            <div className="h-[26px] overflow-hidden">
              <div
                className="h-full origin-left bg-accent will-change-transform"
                style={{
                  transform: `scaleX(${visualProgress / 100})`,
                }}
              />
            </div>

            <div
              className="absolute top-[42px] -translate-x-1/2 text-center text-[36px] text-accent tabular-nums will-change-[left]"
              style={{
                left: progressLabelLeft,
              }}>
              {displayProgress}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* 노란 화면: 왼쪽 -> 오른쪽 */}
      <motion.div
        className="absolute inset-0 z-30 bg-accent"
        initial={{ x: '-100%' }}
        style={{
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
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
