import Image, { type StaticImageData } from 'next/image';

import githubIcon from '@/shared/assets/images/github.svg';
import notionIcon from '@/shared/assets/images/notion.svg';
import { cn } from '@/shared/style/utils';

type HeroLink = {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: StaticImageData;
};

const LINKS: HeroLink[] = [
  {
    key: 'github',
    label: 'GITHUB',
    value: 'carokann1945',
    href: 'https://github.com/carokann1945',
    icon: githubIcon,
  },
  {
    key: 'notion',
    label: '지식 저장고',
    value: 'Dev Notes',
    href: 'https://aquatic-settee-ba6.notion.site/Dev-Notes-1c12f210da34802bb0aae7ae0f96fded',
    icon: notionIcon,
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
                  <Image src={link.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" unoptimized />
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
