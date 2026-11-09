import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { CERTIFICATIONS, Certification } from '../data/portfolioData';

interface CertificationsProps {
  language?: 'id' | 'en';
}

export const CertificationsSection: React.FC<CertificationsProps> = () => {
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');

  const groups = [
    { id: 'all', label: 'SEMUA (09)' },
    { id: 'Bangkit', label: 'BANGKIT ACADEMY' },
    { id: 'Google Cloud', label: 'GOOGLE CLOUD' },
    { id: 'Dicoding', label: 'DICODING' },
  ];

  const filteredCerts = selectedIssuer === 'all'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === selectedIssuer);

  return (
    <section id="sertifikasi" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto">
      {/* Matthew Card Container */}
      <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white dark:bg-[#11141C] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-12 lg:p-16 space-y-12 overflow-hidden">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.08] dark:border-white/[0.08] pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#5B6CFF] font-semibold block">
              /03 CREDENTIALS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-zinc-900 dark:text-white leading-tight">
              Sertifikasi &amp; Lisensi Resmi
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EEF0F4] dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.08] rounded-full self-start md:self-auto font-mono text-xs">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedIssuer(group.id)}
                className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                  selectedIssuer === group.id
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert: Certification) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl p-6 sm:p-7 bg-[#F7F8FA] dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:border-[#5B6CFF]/50 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Category & Verified seal */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08] font-semibold">
                      {cert.category}
                    </span>

                    {cert.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                        <CheckCircle2 size={13} />
                        <span>Resmi</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#5B6CFF] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 font-sans">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="space-y-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Masa Berlaku</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {cert.period}
                    </span>
                  </div>

                  {/* Skills Monospace Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-full bg-white dark:bg-white/[0.04] text-[10px] font-mono text-zinc-500 dark:text-zinc-400 border border-black/[0.04] dark:border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
