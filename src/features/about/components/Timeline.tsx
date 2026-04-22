import { cn } from '@/shared/style/utils';

import { TIMELINE, type TimelineTone } from '../data/about';

const DOT_BY_TONE: Record<TimelineTone, string> = {
  accent: 'bg-accent',
  solid: 'bg-black',
  muted: 'bg-black/30',
};

export function Timeline() {
  return (
    <div className="mt-20 md:mt-28">
      <div
        className={cn(
          'mb-6 flex items-center gap-3 font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/50 md:text-[12px]',
        )}>
        <span className="h-px w-8 bg-black" />
        <span>TIMELINE</span>
      </div>

      <ol>
        {TIMELINE.map((item, idx) => (
          <li key={item.title} className={cn('relative', idx < TIMELINE.length - 1 && 'pb-8')}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="flex shrink-0 items-center gap-2">
                <span aria-hidden="true" className={cn('h-3 w-3 shrink-0', DOT_BY_TONE[item.tone])} />
                <span className="font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/50">{item.time}</span>
              </span>
              <h4 className="text-[17px] font-semibold md:text-[19px]">{item.title}</h4>
            </div>
            <p className="mt-2 text-[14px] leading-[1.8] text-black/65 md:text-[15px]">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
