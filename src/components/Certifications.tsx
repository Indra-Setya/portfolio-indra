import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Award, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS, Certification } from '../data/portfolioData';

interface CertificationsProps {
  language?: 'id' | 'en';
}

export const CertificationsSection: React.FC<CertificationsProps> = () => {
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');

  const groups = [
    { id: 'all', label: 'Semua (9)' },
    { id: 'Bangkit', label: 'Bangkit Academy' },
    { id: 'Google Cloud', label: 'Google Cloud' },
    { id: 'Dicoding', label: 'Dicoding' },
  ];

  const filteredCerts = selectedIssuer === 'all'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === selectedIssuer);

  return (
    <section id="sertifikasi" className="py-24 sm:py-32 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5B6CFF]">
              <span>04</span>
              <span className="text-zinc-400 dark:text-zinc-600">/</span>
              <span>Sertifikasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Sertifikasi &amp; Lisensi Resmi
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] rounded-lg self-start md:self-auto">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedIssuer(group.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  selectedIssuer === group.id
                    ? 'bg-white dark:bg-[#181C26] text-zinc-900 dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Clean Card Grid */}
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
                className="group rounded-2xl p-6 bg-white dark:bg-[#12151C] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-[#5B6CFF]/40 dark:hover:border-[#5B6CFF]/40 transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Top Bar: Category badge & Verified indicator */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]">
                      {cert.category}
                    </span>

                    {cert.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={13} />
                        <span>Terverifikasi</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#5B6CFF] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Bottom Details: Date & Competencies */}
                <div className="space-y-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
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
                        className="px-2 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.03] text-[10px] font-mono text-zinc-500 dark:text-zinc-400 border border-black/[0.04] dark:border-white/[0.06]"
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
