import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Sparkles, MapPin, Terminal, Globe2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';

interface HeroProps {
  language?: 'id' | 'en';
}

export const Hero: React.FC<HeroProps> = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 28;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="beranda"
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto overflow-hidden"
    >
      {/* Matthew Container Card with Rounded 3xl/4xl Border */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#EEF0F4] dark:bg-[#11141C] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl overflow-hidden min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none"
      >
        {/* Matthew Delicate SVG Orbital Lines in Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="40%"
            cy="45%"
            rx="450"
            ry="400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-zinc-400 dark:text-zinc-600"
            strokeDasharray="4 6"
          />
          <circle
            cx="25%"
            cy="18%"
            r="4"
            className="fill-zinc-400 dark:fill-zinc-500 animate-pulse"
          />
          <ellipse
            cx="65%"
            cy="60%"
            rx="520"
            ry="460"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-zinc-300 dark:text-zinc-700"
          />
          <circle
            cx="78%"
            cy="35%"
            r="3.5"
            className="fill-[#5B6CFF]"
          />
        </svg>

        {/* Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#5B6CFF]/[0.08] dark:bg-[#5B6CFF]/[0.15] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Info Bar within Hero Card (Matthew Style) */}
        <div className="relative z-20 flex items-start justify-between gap-4">
          {/* Left Title Label */}
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
              Software Engineer &bull; Indonesia
            </span>
            <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-tight">
              Backend, AI &amp; Cloud Architecture
            </h2>
          </div>

          {/* Right Status Badge & 3D Interactive Anchor */}
          <div className="flex items-center gap-2.5">
            <a
              href="#tentang"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-[#5B6CFF]/30 text-xs font-mono text-[#5B6CFF] hover:bg-[#5B6CFF]/10 transition-all group"
            >
              <Sparkles size={12} className="text-[#5B6CFF] animate-pulse" />
              <span>3D Cloud Globe &amp; Core</span>
            </a>

            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {PERSONAL_INFO.status}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER COMPOSITION: Giant Condensed Text + Cutout Portrait Layering */}
        <div className="relative flex-1 flex items-center justify-center my-4 sm:my-8 overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          {/* Matthew Giant Background Typography */}
          <motion.div
            style={{
              transform: `translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0)`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <h1 className="font-display text-[19vw] sm:text-[18vw] lg:text-[17vw] leading-none tracking-tight font-black uppercase text-zinc-900/[0.95] dark:text-white/[0.92] select-none whitespace-nowrap text-center">
              INDRA SETYA
            </h1>
          </motion.div>

          {/* Centered Cutout Portrait: Overlapping in Front of the Giant Typography */}
          <motion.div
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y * 0.7}px, 0)`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className="relative z-10 w-[240px] sm:w-[320px] lg:w-[390px] aspect-[4/5] flex items-end justify-center filter drop-shadow-2xl"
          >
            <img
              src="/IMG/Profile.png"
              alt="Indra Setya Ari Irawan"
              className="w-full h-full object-contain object-bottom filter contrast-[1.04] brightness-[1.02] hover:scale-105 transition-transform duration-500 pointer-events-auto"
            />
          </motion.div>

          {/* Floating Monospace Badges with 3D Tilt */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-2 sm:left-8 bottom-6 sm:bottom-12 z-20 hidden md:block"
          >
            <TiltCard3D maxTilt={14} glareOpacity={0.25}>
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-[#0E1118]/90 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-lg space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  LULUSAN / KEAHLIAN
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">
                  Informatika UAD &bull; IPK 3.59
                </div>
              </div>
            </TiltCard3D>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-2 sm:right-8 top-8 sm:top-16 z-20 hidden md:block"
          >
            <TiltCard3D maxTilt={14} glareOpacity={0.25}>
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-[#0E1118]/90 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-lg space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#5B6CFF] font-semibold">
                  ALUMNI BANGKIT '24
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">
                  Google Cloud Certified
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* Bottom Hero Bar: Bio text, Action Buttons, and Matthew Scroll Down */}
        <div className="relative z-20 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
          {/* Bio statement & Action CTAs */}
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              Membangun infrastruktur backend skalabel di <strong className="text-zinc-900 dark:text-zinc-200">Google Cloud Platform</strong>, 
              sistem microservices performa tinggi, dan integrasi kecerdasan buatan NLP untuk solusi digital nyata.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#proyek"
                className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span>Lihat Karya</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white dark:bg-black/40 text-zinc-900 dark:text-white border border-black/10 dark:border-white/10 font-mono text-xs font-bold uppercase tracking-wider hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-2"
              >
                <Download size={14} className="text-zinc-500" />
                <span>Unduh CV</span>
              </a>
            </div>
          </div>

          {/* Matthew "Scroll down" with Bouncing Down Arrow */}
          <div className="flex flex-col items-center md:items-end gap-2 text-zinc-600 dark:text-zinc-400 cursor-pointer group">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              Scroll down
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-9 h-9 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center group-hover:border-[#5B6CFF] group-hover:text-[#5B6CFF] transition-colors"
            >
              <ArrowDown size={15} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
