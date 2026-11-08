import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { GenerativeThumbnail } from './GenerativeThumbnail';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

interface ProjectsProps {
  language?: 'id' | 'en';
}

export const ProjectsSection: React.FC<ProjectsProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'Backend', label: 'Backend' },
    { id: 'AI', label: 'AI & ML' },
    { id: 'Mobile', label: 'Mobile' },
    { id: 'Full Stack', label: 'Full Stack' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (selectedCategory === 'Backend') {
          return p.category === 'Backend' || p.category === 'Software';
        }
        return p.category === selectedCategory;
      });

  return (
    <section id="proyek" className="py-24 sm:py-32 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5B6CFF]">
              <span>03</span>
              <span className="text-zinc-400 dark:text-zinc-600">/</span>
              <span>Karya Pilihan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Proyek &amp; Rekayasa Terpilih
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] rounded-lg self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-[#181C26] text-zinc-900 dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => {
              const isLarge = project.featured;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative rounded-2xl bg-white dark:bg-[#12151C] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-[#5B6CFF]/40 dark:hover:border-[#5B6CFF]/40 transition-all duration-300 flex flex-col overflow-hidden ${
                    isLarge ? 'lg:col-span-6' : 'lg:col-span-6'
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-[#0D1017] cursor-pointer"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <GenerativeThumbnail type={project.id} />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                    {/* Category pill on top of image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 dark:bg-black/70 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Role badge top right */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 dark:bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/10">
                        {project.role}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      {/* Project Title & Subtitle */}
                      <div>
                        <h3
                          onClick={() => setActiveModalProject(project)}
                          className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#5B6CFF] transition-colors cursor-pointer"
                        >
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    {/* Footer: Tech tags + Links */}
                    <div className="space-y-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                      {/* Monospace Tech Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-black/[0.02] dark:bg-white/[0.04] text-[11px] font-mono text-zinc-600 dark:text-zinc-400 border border-black/[0.05] dark:border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2 py-1 rounded text-[11px] font-mono text-zinc-400">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6CFF] hover:underline"
                        >
                          <span>Studi Kasus</span>
                          <ArrowUpRight size={14} />
                        </button>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors"
                        >
                          <GithubIcon size={13} />
                          <span>Repositori</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
