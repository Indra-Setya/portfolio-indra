import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';
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
    { id: 'beranda', label: 'Beranda', href: '#beranda' },
    { id: 'tentang', label: 'Tentang', href: '#tentang' },
    { id: 'pengalaman', label: 'Pengalaman', href: '#pengalaman' },
    { id: 'proyek', label: 'Proyek', href: '#proyek' },
    { id: 'sertifikasi', label: 'Sertifikasi', href: '#sertifikasi' },
    { id: 'kontak', label: 'Kontak', href: '#kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['beranda', 'tentang', 'pengalaman', 'proyek', 'sertifikasi', 'kontak'];
      const scrollPos = window.scrollY + 180;
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
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAFAF9]/90 dark:bg-[#0B0D12]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#beranda"
            onClick={(e) => handleNavClick(e, '#beranda')}
            className="flex items-center gap-2.5 font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B6CFF] transition-transform group-hover:scale-125" />
            <span>Indra Setya<span className="text-[#5B6CFF]">.</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] p-1.5 rounded-full border border-black/[0.05] dark:border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-zinc-900 dark:text-white font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-white dark:bg-[#1A1E29] rounded-full shadow-sm border border-black/[0.06] dark:border-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Theme Toggle & Sapa Saya CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
            >
              {currentTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#5B6CFF] text-white hover:bg-[#4A5AE8] text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              <span>Sapa Saya</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-40 bg-white dark:bg-[#12151C] border-b border-black/[0.08] dark:border-white/[0.08] p-6 shadow-2xl md:hidden"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`py-2.5 text-base font-medium flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.04] ${
                      activeSection === link.id
                        ? 'text-[#5B6CFF] font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={16} className="text-zinc-400" />
                  </a>
                ))}

                <div className="pt-3">
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#5B6CFF] text-white font-semibold text-sm shadow-sm"
                  >
                    <span>Sapa Saya (WhatsApp)</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
