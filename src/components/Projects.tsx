import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { GenerativeThumbnail } from './GenerativeThumbnail';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

interface ProjectsProps {
  language?: 'id' | 'en';
}

export const ProjectsSection: React.FC<ProjectsProps> = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth floating image position following cursor globally
  const springX = useSpring(0, { stiffness: 220, damping: 22 });
  const springY = useSpring(0, { stiffness: 220, damping: 22 });

  useEffect(() => {
    const onWindowMove = (e: MouseEvent) => {
      springX.set(e.clientX + 30);
      springY.set(e.clientY - 80);
    };
    window.addEventListener('mousemove', onWindowMove);
    return () => window.removeEventListener('mousemove', onWindowMove);
  }, [springX, springY]);

  return (
    <section id="proyek" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto">
      {/* Matthew Container Card */}
      <div
        className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white dark:bg-[#11141C] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-12 lg:p-16 space-y-16 overflow-hidden"
      >
        {/* Top Header Row with Rotating Circular Badge (Matthew Signature) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-black/[0.08] dark:border-white/[0.08] pb-10">
          {/* Statement Bio */}
          <div className="max-w-xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#5B6CFF] font-semibold block">
              PORTFOLIO // KARYA PILIHAN
            </span>
            <p className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug">
              Membangun arsitektur backend andal, komputasi awan scalable, dan kecerdasan terapan yang melebihi standar industri.
            </p>
          </div>

          {/* Matthew Signature Rotating Circular Badge */}
          <div className="self-end md:self-auto shrink-0">
            <a
              href="#kontak"
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center group hover:scale-110 hover:border-[#5B6CFF] transition-all duration-300 shadow-sm"
              aria-label="Diskusikan Proyek"
            >
              {/* Rotating Circular Text SVG */}
              <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono text-[9.5px] uppercase tracking-[0.24em] fill-zinc-600 dark:fill-zinc-300 font-semibold">
                    <textPath href="#circlePath" startOffset="0%">
                      &bull; DISCUSS PROJECT &bull; GET IN TOUCH &bull;
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center Icon */}
              <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center group-hover:bg-[#5B6CFF] group-hover:text-white transition-colors">
                <ArrowUpRight size={18} />
              </div>
            </a>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            SELECTED WORKS ({PROJECTS.length.toString().padStart(2, '0')})
          </h3>
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 hidden sm:inline">
            Arahkan kursor untuk pratinjau &bull; Klik untuk studi kasus
          </span>
        </div>

        {/* Matthew Project Rows with Dashed Lines */}
        <div className="relative space-y-0">
          {PROJECTS.map((project: Project, index: number) => {
            const isHovered = hoveredProject?.id === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setActiveModalProject(project)}
                className="group relative border-t border-dashed border-black/15 dark:border-white/15 py-8 sm:py-10 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Project Number & Big Condensed Title */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-medium">
                    {(index + 1).toString().padStart(2, '0')}.
                  </span>

                  <h4 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-[#5B6CFF] group-hover:translate-x-3 transition-all duration-300">
                    {project.title}
                  </h4>
                </div>

                {/* Right: Category, Tech & Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-6 pl-8 md:pl-0">
                  <div className="text-right">
                    <span className="font-sans text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-300 block">
                      {project.role}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                      {project.category} &bull; {project.tech[0]}, {project.tech[1]}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-[#5B6CFF] group-hover:border-[#5B6CFF] transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-b border-dashed border-black/15 dark:border-white/15" />
        </div>

        {/* Matthew Signature Interactive Floating Image Preview (Follows Cursor) */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                x: springX,
                y: springY,
              }}
              className="pointer-events-none fixed top-0 left-0 z-30 hidden lg:block w-[360px] h-[220px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-zinc-900"
            >
              {hoveredProject.image ? (
                <img
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <GenerativeThumbnail type={hoveredProject.id} />
              )}
              {/* Subtle badge on preview */}
              <div className="absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-[10px] flex items-center justify-between border border-white/10">
                <span>{hoveredProject.subtitle}</span>
                <span className="text-[#5B6CFF] font-bold">STUDI KASUS &bull; KLIK</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
