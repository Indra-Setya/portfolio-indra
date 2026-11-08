import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronRight, Check } from 'lucide-react';
import { EXPERIENCES, Experience } from '../data/portfolioData';

interface ExperienceProps {
  language?: 'id' | 'en';
}

export const ExperienceSection: React.FC<ExperienceProps> = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');

  const filteredExperiences = filter === 'all'
    ? EXPERIENCES
    : EXPERIENCES.filter((item) => item.type === filter);

  return (
    <section id="pengalaman" className="py-24 sm:py-32 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with Clean Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5B6CFF]">
              <span>02</span>
              <span className="text-zinc-400 dark:text-zinc-600">/</span>
              <span>Jejak Langkah</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Pengalaman Kerja &amp; Pendidikan
            </h2>
          </div>

          {/* Clean Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] rounded-lg self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-[#181C26] text-zinc-900 dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('work')}
              className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                filter === 'work'
                  ? 'bg-white dark:bg-[#181C26] text-zinc-900 dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Pengalaman Kerja
            </button>
            <button
              onClick={() => setFilter('education')}
              className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                filter === 'education'
                  ? 'bg-white dark:bg-[#181C26] text-zinc-900 dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Pendidikan
            </button>
          </div>
        </div>

        {/* Clean Vertical Timeline (Linear aesthetic) */}
        <div className="relative pl-4 sm:pl-8 border-l border-black/[0.08] dark:border-white/[0.08] space-y-12 sm:space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp: Experience, index: number) => {
              const isWork = exp.type === 'work';

              return (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Node Indicator on Left Line */}
                  <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0B0D12] border-2 border-[#5B6CFF] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B6CFF]" />
                  </div>

                  {/* Card Container */}
                  <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#12151C] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-200 space-y-5">
                    {/* Top Row: Date & Type Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium uppercase tracking-wider bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-1.5">
                          {isWork ? (
                            <Briefcase size={12} className="text-[#5B6CFF]" />
                          ) : (
                            <GraduationCap size={12} className="text-[#5B6CFF]" />
                          )}
                          <span>{isWork ? 'Pengalaman Kerja' : 'Pendidikan'}</span>
                        </span>
                      </div>

                      <span className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        {exp.period}
                      </span>
                    </div>

                    {/* Role Title & Organization */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-5 h-5 rounded object-contain"
                          />
                        ) : (
                          <span className="w-5 h-5 rounded bg-black/[0.06] dark:bg-white/[0.08] text-[10px] font-bold font-mono flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                            {exp.logoFallback}
                          </span>
                        )}
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {exp.desc}
                    </p>

                    {/* Highlights / Key Achievements */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-2 space-y-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Capaian &amp; Tanggung Jawab Kunci:
                        </span>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300"
                            >
                              <Check size={14} className="text-[#5B6CFF] shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills Monospace Tags */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded bg-black/[0.02] dark:bg-white/[0.04] text-[11px] font-mono text-zinc-600 dark:text-zinc-400 border border-black/[0.05] dark:border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
