'use client';

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export const INTRO_MINIMUM_DURATION_MS = 500;
export const INTRO_FAILSAFE_TIMEOUT_MS = 6000;

type CompleteIntroTask = () => void;

type IntroLoadingContextValue = {
  pendingCount: number;
  totalCount: number;
  isReady: boolean;
  isTimedOut: boolean;
  registerTask: (label?: string) => CompleteIntroTask;
};

const IntroLoadingContext = createContext<IntroLoadingContextValue | null>(null);

export function IntroLoadingProvider({ children }: { children: ReactNode }) {
  const [pendingCount, setPendingCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMinimumElapsed, setHasMinimumElapsed] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const acceptingTasksRef = useRef(true);
  const activeTasksRef = useRef(new Set<number>());
  const nextTaskIdRef = useRef(0);

  useEffect(() => {
    const minimumTimer = window.setTimeout(() => {
      setHasMinimumElapsed(true);
    }, INTRO_MINIMUM_DURATION_MS);

    const failsafeTimer = window.setTimeout(() => {
      acceptingTasksRef.current = false;
      setIsTimedOut(true);
    }, INTRO_FAILSAFE_TIMEOUT_MS);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(failsafeTimer);
    };
  }, []);

  const isReady = hasMinimumElapsed && (pendingCount === 0 || isTimedOut);

  useEffect(() => {
    if (isReady) {
      acceptingTasksRef.current = false;
    }
  }, [isReady]);

  const registerTask = useCallback<IntroLoadingContextValue['registerTask']>(() => {
    if (!acceptingTasksRef.current) {
      return () => {};
    }

    const taskId = nextTaskIdRef.current;
    nextTaskIdRef.current += 1;
    activeTasksRef.current.add(taskId);
    setPendingCount((count) => count + 1);
    setTotalCount((count) => count + 1);

    let isComplete = false;

    return () => {
      if (isComplete) return;

      isComplete = true;

      if (!activeTasksRef.current.delete(taskId)) return;

      setPendingCount((count) => Math.max(0, count - 1));
    };
  }, []);

  const value = useMemo(
    () => ({
      pendingCount,
      totalCount,
      isReady,
      isTimedOut,
      registerTask,
    }),
    [isReady, isTimedOut, pendingCount, registerTask, totalCount],
  );

  return <IntroLoadingContext.Provider value={value}>{children}</IntroLoadingContext.Provider>;
}

export function useIntroLoading() {
  const context = useContext(IntroLoadingContext);

  if (!context) {
    throw new Error('useIntroLoading must be used within IntroLoadingProvider.');
  }

  return context;
}
