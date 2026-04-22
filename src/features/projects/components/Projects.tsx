import { cn } from '@/shared/style/utils';

import { PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export default function Projects() {
  return (
    <section
      id="projects"
      className={cn(
        'relative min-h-dvh scroll-mt-16 bg-white px-6 pt-24 pb-24 text-ink',
        'md:scroll-mt-20 md:px-10 md:pt-32 md:pb-32 xl:scroll-mt-0',
      )}>
      <div className="mx-auto w-full max-w-[1400px]">
        <div
          className={cn(
            'mb-6 flex items-center gap-3 font-jetbrains-mono text-[11px] tracking-[0.24em] text-black/50 md:text-[12px]',
          )}>
          <span className="h-px w-8 bg-black" />
          <span>04 · SELECTED WORK</span>
        </div>

        <h2
          className="mb-12 font-semibold tracking-[-0.03em] md:mb-16"
          style={{ fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.95 }}>
          Projects<span className="text-accent">.</span>
        </h2>

        <div className="flex flex-col gap-20 md:gap-28">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
