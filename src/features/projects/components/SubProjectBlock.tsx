import { cn } from '@/shared/style/utils';

import type { SubProject } from '../data/projects';
import { ReadmeButton } from './ReadmeModal';

export function SubProjectBlock({ sub }: { sub: SubProject }) {
  const githubHref = sub.links.find((link) => link.label === 'Github')?.href;

  return (
    <div className="relative mt-6 ml-4 md:ml-6">
      <span aria-hidden="true" className="absolute top-0 -left-4 h-full w-px bg-black/25 md:-left-6" />
      <span aria-hidden="true" className="absolute top-5 -left-4 h-px w-3 bg-black/25 md:-left-6 md:w-4" />

      <div className="border border-dashed border-black/25 bg-[#fafafa] p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 bg-black px-1.5 py-0.5 font-jetbrains-mono text-[10px] tracking-[0.24em] text-accent',
            )}>
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true">
              <path d="M6 3v6a3 3 0 0 0 3 3h9" />
              <path d="M15 9l3 3-3 3" />
            </svg>
            SUB-PROJECT
          </span>
          <span className="font-jetbrains-mono text-[11px] tracking-[0.14em] text-black/55">{sub.parentLabel}</span>
        </div>

        <div className="mt-3 flex items-baseline gap-3">
          <h4 className="text-[18px] font-semibold tracking-tight md:text-[20px]">{sub.name}</h4>
          <span className="font-jetbrains-mono text-[11px] text-black/50">{sub.meta}</span>
        </div>

        <p className="mt-2 text-[13px] leading-[1.7] text-black/70 md:text-[14px]">{sub.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 font-semibold">
          {sub.links.map((link) => {
            const linkClassName = cn(
              'inline-flex cursor-pointer items-center gap-1.5 border border-black px-3 py-2 text-[12px]',
              'hover:bg-accent md:text-[13px]',
            );

            if (link.label === 'README') {
              return (
                <ReadmeButton
                  key={link.label}
                  githubHref={githubHref}
                  className={linkClassName}
                  icon={link.icon}
                  label={link.label}
                />
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={linkClassName}>
                {link.icon ? <span aria-hidden="true">{link.icon}</span> : null}
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
