'use client';

import { useIntroLoading } from '@/features/intro/components/IntroLoadingContext';
import { cn } from '@/shared/style/utils';

const STATUS_TEXT = '상태 : 신입';

export function HeroStatus() {
  const { hasIntroExited } = useIntroLoading();

  return (
    <div className="mt-8 font-medium text-black/75" style={{ fontSize: 'clamp(16px, 2.2vw, 28px)' }}>
      <span className={cn('status-glitch-text', hasIntroExited && 'status-glitch-once')} data-text={STATUS_TEXT}>
        {STATUS_TEXT}
      </span>
      <span aria-hidden="true" className="ml-2 inline-block h-[0.9em] w-[3px] animate-pulse bg-black align-middle" />
    </div>
  );
}
