import About from '@/features/about/components/About';
import Contact from '@/features/contact/components/Contact';
import Hero from '@/features/hero/components/Hero';
import { PostIntroReveal } from '@/features/intro/components/PostIntroReveal';
import Projects from '@/features/projects/components/Projects';

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
