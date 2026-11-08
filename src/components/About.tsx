import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, TECH_STACK, TechStackItem } from '../data/portfolioData';

// Animated Count-Up component
const CountUp: React.FC<{ end: number; duration?: number }> = ({ end, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.abs(Math.floor((duration * 1000) / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 16));

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

interface AboutProps {
  language?: 'id' | 'en';
}

export const About: React.FC<AboutProps> = () => {
  const [hoveredTech, setHoveredTech] = useState<TechStackItem | null>(null);

  // Group tech stacks
  const backendTech = TECH_STACK.filter((t) => t.category === 'backend');
  const frontendTech = TECH_STACK.filter((t) => t.category === 'frontend');
  const cloudAiTech = TECH_STACK.filter((t) => t.category === 'cloud_ai');

  // Generate 52 weeks x 7 days GitHub heatmap dummy distribution totaling ~129
  const contributionDays = React.useMemo(() => {
    const days: number[] = [];
    let count = 0;
    // 52 columns x 7 rows = 364 days
    for (let i = 0; i < 364; i++) {
      // Deterministic pseudo-random pattern
      const pseudoVal = (Math.sin(i * 997) + 1) / 2;
      let level = 0;
      if (pseudoVal > 0.85) {
        level = 3;
        count += 3;
      } else if (pseudoVal > 0.72) {
        level = 2;
        count += 2;
      } else if (pseudoVal > 0.58) {
        level = 1;
        count += 1;
      }
      days.push(level);
    }
    return days;
  }, []);

  return (
    <section id="tentang" className="py-24 sm:py-32 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5B6CFF]">
            <span>01</span>
            <span className="text-zinc-400 dark:text-zinc-600">/</span>
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Rekayasa Berperforma Tinggi &amp; Berorientasi Solusi.
          </h2>
        </div>

        {/* Asymmetrical 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Small Code Block (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Saya adalah Software Engineer dengan spesialisasi pada{' '}
                <strong className="font-semibold text-zinc-900 dark:text-zinc-200">
                  arsitektur backend, komputasi awan (GCP),
                </strong>{' '}
                dan integrasi model cerdas AI.
              </p>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Lulusan Teknik Informatika di Universitas Ahmad Dahlan (IPK 3.59) dan alumni program prestisius Bangkit Academy 2024 dari konsorsium Google, GoTo, dan Traveloka. Terbiasa membangun RESTful API yang scalable, microservices cloud, dan sistem cerdas dengan pendekatan engineering yang terukur.
              </p>
            </div>

            {/* IT Touch: One small, clean code block indra_profile.js */}
            <div className="rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#12151C] shadow-sm">
              {/* Code Card Header */}
              <div className="px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode size={14} className="text-[#5B6CFF]" />
                  <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    indra_profile.js
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                  JavaScript
                </span>
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto bg-[#F8FAFC] dark:bg-[#0E1118]">
                <pre className="text-zinc-800 dark:text-zinc-200">
                  <code>
                    <span className="text-zinc-400 dark:text-zinc-500">// Profil profesional singkat</span>
                    {'\n'}
                    <span className="text-[#5B6CFF] font-semibold">const</span>{' '}
                    <span className="text-indigo-600 dark:text-indigo-400">engineer</span> = {'{'}
                    {'\n  '}name: <span className="text-emerald-600 dark:text-emerald-400">'{PERSONAL_INFO.name}'</span>,
                    {'\n  '}focus: [
                    {'\n    '}
                    <span className="text-emerald-600 dark:text-emerald-400">'Backend Architecture'</span>,
                    {'\n    '}
                    <span className="text-emerald-600 dark:text-emerald-400">'Google Cloud Platform'</span>,
                    {'\n    '}
                    <span className="text-emerald-600 dark:text-emerald-400">'Applied AI & NLP'</span>,
                    {'\n  '}],
                    {'\n  '}education: <span className="text-emerald-600 dark:text-emerald-400">'UAD (IPK {PERSONAL_INFO.ipk})'</span>,
                    {'\n  '}status: <span className="text-emerald-600 dark:text-emerald-400">'{PERSONAL_INFO.status}'</span>,
                    {'\n  '}availableForWork: <span className="text-amber-600 dark:text-amber-400">true</span>,
                    {'\n'}
                    {'}'};
                  </code>
                </pre>
              </div>
            </div>

            {/* Core Values / Competencies List */}
            <div className="space-y-2.5 pt-2">
              {[
                'Perancangan RESTful API terstruktur & modular',
                'Deployment scalable di Google Cloud Run & Cloud SQL',
                'Integrasi model Machine Learning / NLP pada produk web',
                'Analisis kode dan pengujian QA menyeluruh',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  <CheckCircle2 size={15} className="text-[#5B6CFF] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tech Stack Grid & GitHub Heatmap (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Grouped Tech Stack */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Keahlian &amp; Perangkat Kerja
                </h3>
                {hoveredTech && (
                  <span className="text-xs font-mono text-[#5B6CFF] animate-fadeIn">
                    {hoveredTech.name} &bull; {hoveredTech.level}
                  </span>
                )}
              </div>

              {/* Backend Stack */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Backend &amp; Sistem
                </span>
                <div className="flex flex-wrap gap-2">
                  {backendTech.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredTech(item)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="group px-3.5 py-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-[#5B6CFF]/40 transition-all duration-150 cursor-default flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-colors"
                        style={{
                          backgroundColor: hoveredTech?.name === item.name ? item.color : undefined,
                        }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend & Mobile Stack */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Frontend &amp; Mobile
                </span>
                <div className="flex flex-wrap gap-2">
                  {frontendTech.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredTech(item)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="group px-3.5 py-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-[#5B6CFF]/40 transition-all duration-150 cursor-default flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-colors"
                        style={{
                          backgroundColor: hoveredTech?.name === item.name ? item.color : undefined,
                        }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud & AI Stack */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Cloud, Data &amp; AI
                </span>
                <div className="flex flex-wrap gap-2">
                  {cloudAiTech.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredTech(item)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="group px-3.5 py-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-[#5B6CFF]/40 transition-all duration-150 cursor-default flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-colors"
                        style={{
                          backgroundColor: hoveredTech?.name === item.name ? item.color : undefined,
                        }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IT Touch: GitHub Contribution Heatmap + Count-Up Metrics */}
            <div className="rounded-xl p-6 bg-white dark:bg-[#12151C] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Aktivitas &amp; Kontribusi GitHub
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                    @Indra-Setya di github.com
                  </p>
                </div>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#5B6CFF] hover:underline"
                >
                  <span>Profil GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

              {/* Count-Up Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-1 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-white">
                    <CountUp end={PERSONAL_INFO.contributions} />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Total Kontribusi
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-white">
                    <CountUp end={PERSONAL_INFO.streak} />
                    <span className="text-xs font-normal text-zinc-500 ml-1">hari</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Streak Saat Ini
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-white">
                    <CountUp end={PERSONAL_INFO.longestStreak} />
                    <span className="text-xs font-normal text-zinc-500 ml-1">hari</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Streak Terpanjang
                  </div>
                </div>
              </div>

              {/* GitHub Heatmap Grid Visualization */}
              <div className="pt-2">
                <div className="overflow-x-auto pb-2">
                  <div className="inline-grid grid-rows-7 grid-flow-col gap-1 w-full max-w-full">
                    {contributionDays.map((lvl, index) => {
                      const bgClasses = [
                        'bg-black/[0.04] dark:bg-white/[0.04]', // 0
                        'bg-[#5B6CFF]/30',                       // 1
                        'bg-[#5B6CFF]/65',                       // 2
                        'bg-[#5B6CFF]',                          // 3
                      ];
                      return (
                        <div
                          key={index}
                          className={`w-2.5 h-2.5 rounded-[2px] ${bgClasses[lvl]} transition-transform hover:scale-125`}
                          title={`Level aktivitas: ${lvl}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Heatmap Legend */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-2">
                  <span>Aktivitas 1 Tahun Terakhir</span>
                  <div className="flex items-center gap-1.5">
                    <span>Sedikit</span>
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-black/[0.04] dark:bg-white/[0.04]" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5B6CFF]/30" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5B6CFF]/65" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5B6CFF]" />
                    <span>Banyak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
