import Image from 'next/image';

import { cn } from '@/shared/style/utils';

import type { Project } from '../data/projects';
import { ReadmeButton } from './ReadmeModal';
import { SubProjectBlock } from './SubProjectBlock';

export function ProjectCard({ project }: { project: Project }) {
  const githubHref = project.links.find((link) => link.label === 'Github')?.href;

  return (
    <article
      className={cn('group grid gap-8 border-t border-black/10 pt-8', 'md:grid-cols-[1fr_1.2fr] md:gap-12 md:pt-12')}>
      <div className="flex flex-col">
        <span className="font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/45 md:text-[12px]">
          PROJECT · {project.index}
        </span>
        <h3
          className="mt-5 font-semibold tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1 }}>
          {project.name}
        </h3>
        <p className="mt-5 text-[15px] leading-[1.8] text-black/75 md:text-[16px] md:leading-[1.9]">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'inline-flex items-center border border-black/15 bg-white px-2 py-1',
                'font-jetbrains-mono text-[11px] md:text-[12px]',
              )}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2 font-semibold">
          {project.links.map((link) => {
            const linkClassName = cn(
              'inline-flex cursor-pointer items-center gap-1.5 border border-black px-3 py-2 text-[13px]',
              'hover:bg-accent hover:text-white md:text-[14px]',
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

        {project.subProject ? <SubProjectBlock sub={project.subProject} /> : null}
      </div>

      <div className="relative">
        <figure className="relative aspect-[16/10] w-full overflow-hidden bg-[#f3f4f2] ring-1 ring-black/10">
          <Image
            src={project.image.src}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(min-width: 768px) 60vw, 100vw"
          />
        </figure>
        <div className="absolute -top-2 -left-2 hidden h-6 w-6 bg-accent md:block" aria-hidden="true" />
      </div>
    </article>
  );
}
