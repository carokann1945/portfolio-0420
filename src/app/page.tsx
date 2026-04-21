import About from '@/features/about/components/About';
import Contact from '@/features/contact/components/Contact';
import Hero from '@/features/hero/components/Hero';
import Projects from '@/features/projects/components/Projects';

export default function Home() {
  return (
    <div>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}
