import { cn } from '@/shared/style/utils';

type TechIcon = { key: string; label: string; svg: React.ReactNode };

const TECH_STACK: TechIcon[] = [
  {
    key: 'next',
    label: 'Next.js',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12c2.3 0 4.45-.65 6.27-1.77L7.3 7.82v9.06H5.7V6.1h1.99l10.95 14.64A11.95 11.95 0 0 0 24 12C24 5.37 18.63 0 12 0Zm4.78 15.9V6.1h1.6v12l-1.6-2.2Z" />
      </svg>
    ),
  },
  {
    key: 'react',
    label: 'React',
    svg: (
      <svg viewBox="-11 -10 22 20" className="h-4 w-4" aria-hidden="true" fill="none" stroke="#61DAFB" strokeWidth={1}>
        <circle r="2" fill="#61DAFB" stroke="none" />
        <ellipse rx="10" ry="4.5" />
        <ellipse rx="10" ry="4.5" transform="rotate(60)" />
        <ellipse rx="10" ry="4.5" transform="rotate(120)" />
      </svg>
    ),
  },
  {
    key: 'ts',
    label: 'TypeScript',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <rect width="24" height="24" rx="2" fill="#3178C6" />
        <path
          fill="#fff"
          d="M13.1 11.03v2.1h3.04v8.1h2.36v-8.1h3.04v-2.1H13.1Zm-1.3 7.2c-.48-.22-1.08-.55-1.73-1.1l-1.13 1.4c.65.6 1.4 1.05 2.23 1.33.84.28 1.77.42 2.8.42.8 0 1.55-.12 2.23-.37.68-.25 1.23-.62 1.63-1.1.4-.48.6-1.06.6-1.74 0-.56-.11-1.03-.34-1.42a2.76 2.76 0 0 0-.96-.98 8 8 0 0 0-1.74-.77l-1.53-.52c-.5-.17-.86-.34-1.1-.52a.83.83 0 0 1-.35-.7c0-.34.16-.6.48-.78.33-.19.78-.28 1.36-.28.45 0 .9.08 1.34.23.44.15.88.38 1.32.68l.96-1.48a5.9 5.9 0 0 0-1.7-.85 6.74 6.74 0 0 0-1.97-.29c-.77 0-1.48.12-2.12.36-.64.24-1.15.59-1.53 1.05-.38.46-.57 1-.57 1.63 0 .55.12 1.02.35 1.4.23.38.55.7.97.95.42.25.98.5 1.7.74l1.55.54c.5.18.87.36 1.1.54.23.19.35.43.35.74 0 .38-.17.67-.5.87-.34.2-.83.3-1.48.3a4.6 4.6 0 0 1-1.56-.28Z"
        />
      </svg>
    ),
  },
  {
    key: 'tailwind',
    label: 'Tailwind CSS',
    svg: (
      <svg viewBox="0 0 32 20" className="h-4 w-4" aria-hidden="true" fill="#06B6D4">
        <path d="M16 0c-4.27 0-6.93 2.13-8 6.4C9.6 4.27 11.47 3.47 13.6 4c1.22.3 2.1 1.18 3.07 2.17C18.25 7.77 20.07 9.6 24 9.6c4.27 0 6.93-2.13 8-6.4-1.6 2.13-3.47 2.93-5.6 2.4-1.22-.3-2.1-1.18-3.07-2.17C21.75 1.83 19.93 0 16 0ZM8 9.6c-4.27 0-6.93 2.13-8 6.4 1.6-2.13 3.47-2.93 5.6-2.4 1.22.3 2.1 1.18 3.07 2.17C10.25 17.37 12.07 19.2 16 19.2c4.27 0 6.93-2.13 8-6.4-1.6 2.13-3.47 2.93-5.6 2.4-1.22-.3-2.1-1.18-3.07-2.17C13.75 11.43 11.93 9.6 8 9.6Z" />
      </svg>
    ),
  },
  {
    key: 'node',
    label: 'Node.js',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="#539E43">
        <path d="M12 1.75 2.6 7.2v9.6L12 22.25l9.4-5.45V7.2L12 1.75Zm0 2.3 7.2 4.18v8.34L12 20.75 4.8 16.57V8.23L12 4.05Zm-.1 3.2c-2.15 0-3.4 1-3.4 2.67 0 1.6 1.1 2.4 3.15 2.63l1 .11c1.3.15 1.72.4 1.72.95 0 .63-.5.93-1.75.93-1.3 0-1.83-.33-1.9-1.16h-1.72c.08 1.78 1.27 2.67 3.6 2.67 2.33 0 3.56-.9 3.56-2.6 0-1.6-1.05-2.43-3.22-2.67l-1-.1c-1.2-.14-1.66-.38-1.66-.88 0-.57.5-.9 1.57-.9 1.12 0 1.6.34 1.72 1.1h1.7c-.1-1.72-1.23-2.75-3.37-2.75Z" />
      </svg>
    ),
  },
];

export function TechStack() {
  return (
    <div className={cn('mt-12 md:mt-16')}>
      <div
        className={cn(
          'mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-black/55 md:text-[12px]',
        )}>
        <span className="h-px w-8 bg-black" />
        <span>02 · TECH STACK</span>
      </div>
      <ul className="flex flex-wrap gap-2 md:gap-2.5">
        {TECH_STACK.map((tech) => (
          <li
            key={tech.key}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-[13px] font-medium text-black md:px-4 md:py-2 md:text-[14px]',
            )}>
            <span className="inline-flex h-4 w-4 items-center justify-center">{tech.svg}</span>
            <span className="tracking-tight">{tech.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
