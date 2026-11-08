import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceSection } from './components/Experience';
import { ProjectsSection } from './components/Projects';
import { CertificationsSection } from './components/Certifications';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Default to dark mode as requested
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Theme Toggle with View Transition API fallback
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    const changeThemeDOM = () => {
      setTheme(nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    if ('startViewTransition' in document) {
      // @ts-ignore
      document.startViewTransition(changeThemeDOM);
    } else {
      changeThemeDOM();
    }
  };

  // Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Reading Progress Line at the very top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[100] pointer-events-none">
        <div
          className="h-full bg-[#5B6CFF] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(91,108,255,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle Custom Cursor */}
      <CustomCursor />

      {/* Main Page Layout */}
      <div className="relative min-h-screen flex flex-col font-sans bg-[#FAFAF9] dark:bg-[#0B0D12] text-[#0F172A] dark:text-[#F1F5F9] transition-colors duration-200">
        <Navbar currentTheme={theme} onToggleTheme={toggleTheme} />

        <main className="flex-1">
          <Hero />
          <About />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
