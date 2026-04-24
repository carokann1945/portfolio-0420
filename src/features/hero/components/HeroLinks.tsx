import { cn } from '@/shared/style/utils';

type HeroLink = {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
};

const LINKS: HeroLink[] = [
  {
    key: 'github',
    label: 'GITHUB',
    value: 'carokann1945',
    href: 'https://github.com/carokann1945',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    ),
  },
  {
    key: 'notion',
    label: '지식 저장고',
    value: 'Dev Notes',
    href: 'https://aquatic-settee-ba6.notion.site/Dev-Notes-1c12f210da34802bb0aae7ae0f96fded',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
        <path d="M8 16V8l8 8V8" />
      </svg>
    ),
  },
];

export function HeroLinks() {
  return (
    <div className={cn('mt-10 md:mt-14')}>
      <div
        className={cn(
          'mb-4 flex items-center gap-3 font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/55 md:text-[12px]',
        )}>
        <span className="h-px w-8 bg-black" />
        <span>03 · LINKS</span>
      </div>
      <ul className={cn('grid grid-cols-1 gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2')}>
        {LINKS.map((link) => (
          <li key={link.key} className="bg-white">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex items-center justify-between gap-6 p-5 transition-colors hover:bg-accent md:p-6',
              )}>
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'flex h-11 w-11 items-center justify-center border border-black/15 bg-white group-hover:border-black',
                  )}>
                  {link.icon}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-black/60 group-hover:text-gray-200 md:text-[11px]">
                    {link.label}
                  </span>
                  <span className="text-[17px] font-semibold tracking-tight group-hover:text-white md:text-[19px]">
                    {link.value}
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  'font-jetbrains-mono text-[18px] text-black/40 transition-transform group-hover:translate-x-1 group-hover:text-white',
                )}
                aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
