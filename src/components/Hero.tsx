import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, TECH_STACK } from '../data/portfolioData';

interface HeroProps {
  language?: 'id' | 'en';
}

export const Hero: React.FC<HeroProps> = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Subtle parallax calculation (-15 to 15 px)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="beranda"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-subtle-grid border-b border-black/[0.06] dark:border-white/[0.08]"
    >
      {/* Soft Static Light Glow Background (Linear/Vercel style, no WebGL) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5B6CFF]/[0.08] dark:bg-[#5B6CFF]/[0.12] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Bio, CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {PERSONAL_INFO.status} &bull; Yogyakarta, ID
              </span>
            </motion.div>

            {/* Main Headline with line-by-line reveal */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08]"
              >
                Membangun Solusi Digital dengan{' '}
                <span className="text-[#5B6CFF]">Kode &amp; Kecerdasan</span>
              </motion.h1>
            </div>

            {/* Subtitle / Bio Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
            >
              Halo, saya <span className="font-semibold text-zinc-900 dark:text-zinc-200">{PERSONAL_INFO.name}</span>. 
              Software engineer yang berfokus pada arsitektur sistem Backend, infrastruktur Cloud (GCP), 
              dan integrasi model Machine Learning / AI yang handal dan skalabel.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#proyek"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5B6CFF] hover:bg-[#4A5AE8] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-indigo-500/20 hover:shadow-md"
              >
                <span>Lihat Karya Saya</span>
                <ArrowDownRight size={16} />
              </a>

              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-[#12151C] hover:bg-zinc-50 dark:hover:bg-[#181C26] text-zinc-800 dark:text-zinc-200 text-sm font-semibold border border-black/[0.08] dark:border-white/[0.1] transition-all duration-200 shadow-sm"
              >
                <Download size={16} className="text-zinc-500 dark:text-zinc-400" />
                <span>Unduh CV</span>
              </a>
            </motion.div>

            {/* Small Quick Credentials (Monospace) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400"
            >
              <div>
                <span className="text-zinc-400 dark:text-zinc-600 mr-1.5">ALUMNUS</span>
                <span className="text-zinc-800 dark:text-zinc-300 font-medium">Bangkit Google Cloud '24</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
              <div>
                <span className="text-zinc-400 dark:text-zinc-600 mr-1.5">LULUSAN</span>
                <span className="text-zinc-800 dark:text-zinc-300 font-medium">Informatika UAD (IPK 3.59)</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Portrait Photo with subtle mouse parallax (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="relative w-full max-w-sm"
            >
              {/* Outer clean frame */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-black/[0.06] to-black/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] border border-black/[0.08] dark:border-white/[0.1] shadow-2xl backdrop-blur-sm">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-[#151922]">
                  <img
                    src={PERSONAL_INFO.profileImg}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-500"
                    loading="eager"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Clean Bottom Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-white/90 dark:bg-[#0B0D12]/90 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1]">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                      {PERSONAL_INFO.name}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      {PERSONAL_INFO.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Background Depth Ring */}
              <div
                className="absolute -inset-4 rounded-3xl border border-dashed border-[#5B6CFF]/20 -z-10 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee: Monochrome tech stack chips, brand color on hover */}
      <div className="w-full mt-16 sm:mt-20 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Teknologi &amp; Ekosistem
          </span>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            Hover untuk menyorot
          </span>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee space-x-3 py-1">
            {[...TECH_STACK, ...TECH_STACK].map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-[#5B6CFF]/40 transition-all duration-200 cursor-default select-none whitespace-nowrap"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-colors duration-200"
                  style={{
                    backgroundColor: undefined,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                  }}
                />
                <span className="group-hover:text-zinc-900 dark:group-hover:text-white font-medium">
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase">
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
