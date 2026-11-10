import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode, ArrowUpRight, CheckCircle2, Terminal, Code2, Sparkles, Layers, Box, User } from 'lucide-react';
import { PERSONAL_INFO, TECH_STACK, TechStackItem } from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';
import { Interactive3DCore } from './Interactive3DCore';
import { CloudGlobe3D } from './CloudGlobe3D';

// Animated Count-Up component
const CountUp: React.FC<{ end: number; duration?: number }> = ({ end, duration = 1.4 }) => {
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
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  // Group tech stacks
  const backendTech = TECH_STACK.filter((t) => t.category === 'backend');
  const frontendTech = TECH_STACK.filter((t) => t.category === 'frontend');
  const cloudAiTech = TECH_STACK.filter((t) => t.category === 'cloud_ai');

  // Generate 52 weeks x 7 days GitHub heatmap distribution totaling ~129
  const contributionDays = React.useMemo(() => {
    const days: number[] = [];
    for (let i = 0; i < 364; i++) {
      const pseudoVal = (Math.sin(i * 997) + 1) / 2;
      let level = 0;
      if (pseudoVal > 0.85) level = 3;
      else if (pseudoVal > 0.72) level = 2;
      else if (pseudoVal > 0.58) level = 1;
      days.push(level);
    }
    return days;
  }, []);

  return (
    <section id="tentang" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto">
      {/* Matthew Card Container for About */}
      <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#10131B] text-white border border-white/[0.08] shadow-2xl p-6 sm:p-12 lg:p-16 space-y-16 overflow-hidden relative">
        {/* Top Header Row (Matthew /ABOUT) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 font-display text-2xl sm:text-3xl tracking-wider text-zinc-400">
            <span className="text-[#5B6CFF]">/</span>
            <span className="text-white">ABOUT</span>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5B6CFF]" />
            <span>ARSITEK &bull; PEMBANGUN SISTEM &bull; AI ENGINEER</span>
          </div>
        </div>

        {/* Matthew "DEFINE / DESIGN / DELIVER" Core Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Matthew Stacked Giant Typography & Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Stacked Kinetic Words */}
            <div className="space-y-0 select-none">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-white/95"
              >
                ARCHITECT
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[#5B6CFF]"
              >
                BUILD
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-zinc-500"
              >
                SCALE
              </motion.div>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-xl">
              Saya adalah Software Engineer dengan spesialisasi pada arsitektur sistem <strong className="text-white">Backend</strong>, 
              infrastruktur <strong className="text-white">Google Cloud Platform</strong>, dan integrasi kecerdasan buatan terapan. 
              Berkomitmen merancang sistem yang reliabel, modular, dan teruji di bawah beban produksi.
            </p>

            {/* Clean Code Card indra_profile.js */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0A0C12] shadow-xl">
              <div className="px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode size={14} className="text-[#5B6CFF]" />
                  <span className="font-mono text-xs text-zinc-300 font-medium">
                    indra_profile.js
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  JavaScript
                </span>
              </div>

              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-300">
                <pre>
                  <code>
                    <span className="text-zinc-500">// Ringkasan Profil &amp; Kualifikasi</span>
                    {'\n'}
                    <span className="text-[#5B6CFF] font-semibold">const</span>{' '}
                    <span className="text-indigo-400">engineer</span> = {'{'}
                    {'\n  '}name: <span className="text-emerald-400">'{PERSONAL_INFO.name}'</span>,
                    {'\n  '}current: <span className="text-emerald-400">'Backend Intern @ PT SJP (Holding Bengkulu)'</span>,
                    {'\n  '}gpa: <span className="text-emerald-400">'{PERSONAL_INFO.ipk} (Informatika UAD)'</span>,
                    {'\n  '}cohort: <span className="text-emerald-400">'Bangkit Academy Google Cloud \'24'</span>,
                    {'\n  '}focus: [<span className="text-emerald-400">'Backend'</span>, <span className="text-emerald-400">'Cloud GCP'</span>, <span className="text-emerald-400">'AI/NLP'</span>, <span className="text-emerald-400">'HRIS'</span>],
                    {'\n  '}available: <span className="text-amber-400">true</span>,
                    {'\n'}
                    {'}'};
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column: Matthew Editorial Portrait Card or Interactive 3D Core */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            {/* View Switcher: Photo / 3D Pipeline Core */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs flex items-center gap-1.5 transition-all ${
                  viewMode === 'photo'
                    ? 'bg-white text-zinc-900 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <User size={12} />
                <span>Foto Profil</span>
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs flex items-center gap-1.5 transition-all ${
                  viewMode === '3d'
                    ? 'bg-[#5B6CFF] text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Box size={12} />
                <span>3D Data Core</span>
              </button>
            </div>

            {viewMode === 'photo' ? (
              <TiltCard3D maxTilt={10} glareOpacity={0.18} className="w-full max-w-md">
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-transparent p-2 shadow-2xl">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900">
                    <img
                      src="/IMG/STR01416 (1).JPG"
                      alt={PERSONAL_INFO.name}
                      className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Floating pill in portrait */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{PERSONAL_INFO.name}</div>
                        <div className="text-[11px] font-mono text-zinc-400">{PERSONAL_INFO.title}</div>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            ) : (
              <div className="w-full max-w-md rounded-3xl overflow-hidden border border-[#5B6CFF]/40 bg-[#0A0D14] p-3 shadow-2xl relative">
                {/* 3D Core View */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#07090E] border border-white/[0.06] flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 z-10">
                    <span className="text-[#5B6CFF] font-semibold flex items-center gap-1">
                      <Sparkles size={12} />
                      <span>AI &amp; CLOUD 3D PIPELINE</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                      WebGL 60FPS
                    </span>
                  </div>

                  {/* 3D Canvas */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Interactive3DCore className="w-full h-full" theme="dark" />
                  </div>

                  {/* Bottom overlay info */}
                  <div className="z-10 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">Torus Knot + Particle Cloud</div>
                      <div className="text-zinc-500 text-[10px]">Drag mouse to inspect 3D core</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#5B6CFF] animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Tech Stack Grid & GitHub Heatmap with Count-Up */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t border-white/[0.08] items-start">
          {/* Tech Stack Chips (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl tracking-wide text-white uppercase">
                Keahlian &amp; Teknologi
              </h3>
              {hoveredTech && (
                <span className="text-xs font-mono text-[#5B6CFF] animate-fadeIn">
                  {hoveredTech.name} &bull; {hoveredTech.level}
                </span>
              )}
            </div>

            {/* Backend */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Backend &amp; Sistem
              </span>
              <div className="flex flex-wrap gap-2">
                {backendTech.map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredTech(item)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#5B6CFF] hover:bg-white/[0.1] transition-all cursor-default flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-500 transition-colors"
                      style={{
                        backgroundColor: hoveredTech?.name === item.name ? item.color : undefined,
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend & Mobile */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Frontend &amp; Mobile
              </span>
              <div className="flex flex-wrap gap-2">
                {frontendTech.map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredTech(item)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#5B6CFF] hover:bg-white/[0.1] transition-all cursor-default flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-500 transition-colors"
                      style={{
                        backgroundColor: hoveredTech?.name === item.name ? item.color : undefined,
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cloud & AI */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Cloud, Data &amp; AI
              </span>
              <div className="flex flex-wrap gap-2">
                {cloudAiTech.map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredTech(item)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#5B6CFF] hover:bg-white/[0.1] transition-all cursor-default flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-500 transition-colors"
                      style={{
                        backgroundColor: hoveredTech?.name === item.name ? item.color : undefined,
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GitHub Activity & Heatmap (6 Cols) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-[#090B10] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl tracking-wide text-white uppercase">
                  Aktivitas &amp; Kontribusi GitHub
                </h4>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  @Indra-Setya di github.com
                </p>
              </div>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#5B6CFF] hover:underline"
              >
                <span>Profil</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Count-Up Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/[0.08]">
              <div>
                <div className="text-3xl font-display text-white">
                  <CountUp end={PERSONAL_INFO.contributions} />
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">Total Kontribusi</div>
              </div>

              <div>
                <div className="text-3xl font-display text-white">
                  <CountUp end={PERSONAL_INFO.streak} />
                  <span className="text-xs font-sans font-normal text-zinc-500 ml-1">hari</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">Current Streak</div>
              </div>

              <div>
                <div className="text-3xl font-display text-white">
                  <CountUp end={PERSONAL_INFO.longestStreak} />
                  <span className="text-xs font-sans font-normal text-zinc-500 ml-1">hari</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">Longest Streak</div>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="pt-2">
              <div className="overflow-x-auto pb-2">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1 w-full max-w-full">
                  {contributionDays.map((lvl, index) => {
                    const bgClasses = [
                      'bg-white/[0.05]',
                      'bg-[#5B6CFF]/30',
                      'bg-[#5B6CFF]/65',
                      'bg-[#5B6CFF]',
                    ];
                    return (
                      <div
                        key={index}
                        className={`w-2.5 h-2.5 rounded-[2px] ${bgClasses[lvl]} transition-transform hover:scale-125`}
                        title={`Level: ${lvl}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2">
                <span>Aktivitas 1 Tahun Terakhir</span>
                <div className="flex items-center gap-1.5">
                  <span>Sedikit</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.05]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5B6CFF]/30" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5B6CFF]/65" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5B6CFF]" />
                  <span>Banyak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Global Cloud Infrastructure Globe */}
        <CloudGlobe3D className="mt-8" />
      </div>
    </section>
  );
};
