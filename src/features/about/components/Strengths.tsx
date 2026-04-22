import { cn } from '@/shared/style/utils';

import { STRENGTHS } from '../data/about';

export function Strengths() {
  return (
    <div className="mt-20 md:mt-28">
      <div
        className={cn(
          'mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-black/50 md:text-[12px]',
        )}>
        <span className="h-px w-8 bg-black" />
        <span>STRENGTHS</span>
      </div>

      <ul className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-3">
        {STRENGTHS.map((strength) => (
          <li key={strength.id} className="flex flex-col gap-3 bg-white p-6 md:p-8">
            <span className="font-mono text-[10px] tracking-[0.24em]">
              <span className="inline-block bg-accent px-1.5 py-0.5 text-black">{strength.id}</span>
            </span>
            <h3 className="text-[20px] font-semibold tracking-tight md:text-[22px]">{strength.title}</h3>
            <p className="text-[14px] leading-[1.8] text-black/70 md:text-[15px]">{strength.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
