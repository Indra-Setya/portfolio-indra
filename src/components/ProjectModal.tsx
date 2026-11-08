import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  language?: 'id' | 'en';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#12151C] text-zinc-900 dark:text-zinc-100 shadow-2xl rounded-2xl border border-black/[0.1] dark:border-white/[0.1] overflow-hidden my-auto z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#5B6CFF]/10 text-[#5B6CFF] border border-[#5B6CFF]/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Peran: {project.role}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors"
              aria-label="Tutup modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-[#5B6CFF]">
                {project.subtitle}
              </p>
            </div>

            {/* Overview Description */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {project.desc}
            </p>

            {/* Case Study Details: Problem, Solution, Impact */}
            <div className="space-y-4 pt-2">
              {/* Problem */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                  <AlertCircle size={14} />
                  <span>Tantangan &amp; Masalah</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5B6CFF] font-semibold">
                  <Lightbulb size={14} />
                  <span>Pendekatan &amp; Solusi Rekayasa</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Impact */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  <TrendingUp size={14} />
                  <span>Hasil &amp; Dampak</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Tech Stack List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Teknologi yang Digunakan
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-black/[0.03] dark:bg-white/[0.05] text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-semibold transition-colors"
            >
              <GithubIcon size={14} />
              <span>Lihat Repositori</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
