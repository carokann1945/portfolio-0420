import Image, { type StaticImageData } from 'next/image';

import nextIcon from '@/shared/assets/images/nextjs.svg';
import nodeIcon from '@/shared/assets/images/nodejs.svg';
import reactIcon from '@/shared/assets/images/react.svg';
import tailwindIcon from '@/shared/assets/images/tailwind.svg';
import typescriptIcon from '@/shared/assets/images/typescript.svg';
import { cn } from '@/shared/style/utils';

type TechIcon = { key: string; label: string; icon: StaticImageData };

const TECH_STACK: TechIcon[] = [
  { key: 'next', label: 'Next.js', icon: nextIcon },
  { key: 'react', label: 'React', icon: reactIcon },
  { key: 'ts', label: 'TypeScript', icon: typescriptIcon },
  { key: 'tailwind', label: 'Tailwind CSS', icon: tailwindIcon },
  { key: 'node', label: 'Node.js', icon: nodeIcon },
];

export function TechStack() {
  return (
    <div className={cn('mt-12 md:mt-16')}>
      <div
        className={cn(
          'mb-4 flex items-center gap-3 font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/55 md:text-[12px]',
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
            <span className="inline-flex h-4 w-4 items-center justify-center">
              <Image src={tech.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" unoptimized />
            </span>
            <span className="tracking-tight">{tech.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
