import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronRight, Check, ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, Experience } from '../data/portfolioData';

interface ExperienceProps {
  language?: 'id' | 'en';
}

export const ExperienceSection: React.FC<ExperienceProps> = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('sjp-holding');

  const filteredExperiences = filter === 'all'
    ? EXPERIENCES
    : EXPERIENCES.filter((item) => item.type === filter);

  return (
    <section id="pengalaman" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto">
      {/* Matthew Card Container */}
      <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#EEF0F4] dark:bg-[#11141C] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-12 lg:p-16 space-y-12 overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.08] dark:border-white/[0.08] pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#5B6CFF] font-semibold block">
              /02 TIMELINE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-zinc-900 dark:text-white leading-tight">
              Jejak Langkah &amp; Karier
            </h2>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] rounded-full self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('work')}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                filter === 'work'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Pengalaman
            </button>
            <button
              onClick={() => setFilter('education')}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                filter === 'education'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Pendidikan
            </button>
          </div>
        </div>

        {/* Interactive Milestone Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp: Experience, index: number) => {
              const isWork = exp.type === 'work';
              const isExpanded = expandedId === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm hover:border-[#5B6CFF]/40 transition-all cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Logo or Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/[0.06] p-2 flex items-center justify-center shrink-0 border border-black/[0.06] dark:border-white/[0.08]">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                            {exp.logoFallback}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400">
                            {isWork ? 'Karier' : 'Pendidikan'}
                          </span>
                          <span className="font-mono text-xs text-zinc-400">
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="self-end sm:self-auto flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <span>{isExpanded ? 'Tutup' : 'Detail'}</span>
                      <div className={`w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] space-y-4"
                      >
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                          {exp.desc}
                        </p>

                        {/* Highlights */}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <div className="space-y-2">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                              Capaian Kunci:
                            </span>
                            <ul className="space-y-2">
                              {exp.highlights.map((h, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                                  <Check size={14} className="text-[#5B6CFF] mt-0.5 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-[11px] font-mono text-zinc-600 dark:text-zinc-400 border border-black/[0.04] dark:border-white/[0.06]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
