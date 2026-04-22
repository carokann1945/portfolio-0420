import type { Metadata } from 'next';

import About from '@/features/about/components/About';
import Contact from '@/features/contact/components/Contact';
import Hero from '@/features/hero/components/Hero';
import { PostIntroReveal } from '@/features/intro/components/PostIntroReveal';
import Projects from '@/features/projects/components/Projects';

export const metadata: Metadata = {
  openGraph: {
    title: '윤동주 | 포트폴리오',
    description: '윤동주 포트폴리오',
    images: [{ url: '/images/ydj-portfolio-ogimage.png', width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <PostIntroReveal>
        <Projects />
        <About />
        <Contact />
      </PostIntroReveal>
    </div>
  );
}
