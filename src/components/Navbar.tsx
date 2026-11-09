import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTheme, onToggleTheme }) => {
  const [activeSection, setActiveSection] = useState('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'BERANDA', href: '#beranda' },
    { id: 'tentang', label: 'TENTANG', href: '#tentang' },
    { id: 'pengalaman', label: 'PENGALAMAN', href: '#pengalaman' },
    { id: 'proyek', label: 'PROYEK', href: '#proyek' },
    { id: 'sertifikasi', label: 'SERTIFIKASI', href: '#sertifikasi' },
    { id: 'kontak', label: 'KONTAK', href: '#kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sectionIds = ['beranda', 'tentang', 'pengalaman', 'proyek', 'sertifikasi', 'kontak'];
      const scrollPos = window.scrollY + 200;
      for (const sId of sectionIds) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-5 px-4 sm:px-6 lg:px-8 ${
          scrolled ? 'backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Capsule Matthew Navbar */}
          <div
            className={`rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between border ${
              scrolled
                ? 'bg-[#FAFAF9]/90 dark:bg-[#0B0D12]/90 border-black/10 dark:border-white/10 shadow-xl'
                : 'bg-white/80 dark:bg-[#12151C]/80 border-black/[0.08] dark:border-white/[0.08] shadow-sm'
            }`}
          >
            {/* Logo Brand: Matthew Style */}
            <a
              href="#beranda"
              onClick={(e) => handleNavClick(e, '#beranda')}
              className="flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-white group"
            >
              <span className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-display text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform">
                IS
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden xs:inline">
                ENGINEER // <strong className="text-zinc-900 dark:text-white">INDRA SETYA</strong>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-colors duration-200 ${
                      isActive
                        ? 'text-zinc-900 dark:text-white font-bold'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="matthewNavPill"
                        className="absolute inset-0 bg-black/[0.06] dark:bg-white/[0.1] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Theme Toggle & Matthew "HIRE ME" Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onToggleTheme}
                aria-label="Toggle Theme"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors border border-black/[0.06] dark:border-white/[0.08]"
              >
                {currentTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <a
                href="#kontak"
                onClick={(e) => handleNavClick(e, '#kontak')}
                className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-200 shadow-sm active:scale-95"
              >
                HIRE ME
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors border border-black/[0.06] dark:border-white/[0.08]"
              >
                {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 inset-x-4 z-50 bg-white dark:bg-[#12151C] border border-black/10 dark:border-white/10 p-6 rounded-3xl shadow-2xl md:hidden space-y-4"
            >
              <div className="flex flex-col space-y-2 font-mono text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`py-3 px-4 rounded-xl flex items-center justify-between transition-colors ${
                      activeSection === link.id
                        ? 'bg-black/5 dark:bg-white/10 text-[#5B6CFF] font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={16} className="text-zinc-400" />
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <a
                  href="#kontak"
                  onClick={(e) => handleNavClick(e, '#kontak')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold tracking-wider uppercase shadow-md active:scale-95 transition-transform"
                >
                  <span>HUBUNGI SAYA / HIRE ME</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
