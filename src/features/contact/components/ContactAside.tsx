import { cn } from '@/shared/style/utils';

import { CONTACT_EMAIL, GITHUB_URL } from '../data/contact';

type ContactLink = { label: string; value: string; href: string; external?: boolean };

const LINKS: ContactLink[] = [
  { label: 'EMAIL', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'GITHUB', value: 'carokann1945', href: GITHUB_URL, external: true },
];

export function ContactAside() {
  return (
    <aside className="flex flex-col gap-5">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          className={cn(
            'group flex items-center justify-between gap-6 border border-white/10 p-5',
            'transition-colors hover:bg-accent md:p-6',
          )}>
          <div className="flex flex-col gap-2">
            <span
              className={cn(
                'font-jetbrains-mono text-[10px] tracking-[0.24em] text-white/60',
                'group-hover:text-gray-200 md:text-[11px]',
              )}>
              {link.label}
            </span>
            <span className="text-[17px] font-semibold tracking-tight md:text-[20px]">{link.value}</span>
          </div>
          <span
            aria-hidden="true"
            className={cn(
              'font-jetbrains-mono text-[18px] text-white/40 transition-transform',
              'group-hover:translate-x-1 group-hover:text-gray-200',
            )}>
            ↗
          </span>
        </a>
      ))}

      <div className="border border-white/10 p-5 md:p-6">
        <span className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-white/50 md:text-[11px]">
          RESPONSE TIME
        </span>
        <p className="mt-2 text-[15px] leading-[1.8] text-white/75">보통 24시간 이내에 답장드립니다.</p>
      </div>
    </aside>
  );
}
