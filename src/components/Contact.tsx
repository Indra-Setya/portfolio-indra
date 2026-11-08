import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Copy, Check, Send, CheckCircle2, ArrowUpRight, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedinIcon, GithubIcon } from './Icons';

interface ContactProps {
  language?: 'id' | 'en';
}

export const ContactSection: React.FC<ContactProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusState, setStatusState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatusState('loading');
    setTimeout(() => {
      setStatusState('success');
    }, 700);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatusState('idle');
  };

  return (
    <section id="kontak" className="py-24 sm:py-32 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5B6CFF]">
            <span>05</span>
            <span className="text-zinc-400 dark:text-zinc-600">/</span>
            <span>Kontak</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Mari Membangun Sesuatu yang Berarti.
          </h2>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Saya terbuka untuk peluang kerja penuh waktu (full-time), proyek kontrak rekayasa backend/cloud, maupun diskusi kolaborasi seputar arsitektur sistem dan kecerdasan buatan.
            </p>

            {/* Contact Information Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#12151C] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Saluran Komunikasi Langsung
              </h3>

              {/* Email Copy Box */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span>Alamat Email</span>
                  {copiedEmail && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-fadeIn">
                      Email Tersalin!
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono text-sm sm:text-base font-medium text-zinc-900 dark:text-white hover:text-[#5B6CFF] transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white dark:bg-[#181C26] border border-black/[0.08] dark:border-white/[0.1] hover:border-[#5B6CFF]/40 text-zinc-600 dark:text-zinc-300 hover:text-[#5B6CFF] transition-colors shadow-sm shrink-0"
                    title="Salin email"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Quick Links List */}
              <div className="space-y-2.5">
                {/* WhatsApp */}
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#5B6CFF]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                        WhatsApp Langsung
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        {PERSONAL_INFO.phone}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#5B6CFF]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center text-xs">
                      <LinkedinIcon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                        Profil LinkedIn
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        indra-setya-ari-irawan
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                </a>

                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#5B6CFF]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs">
                      <GithubIcon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                        Repositori GitHub
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        github.com/Indra-Setya
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                </a>
              </div>

              {/* Location Monospace Footer */}
              <div className="pt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.08]">
                <span>Lokasi Kerja</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#12151C] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
              <AnimatePresence mode="wait">
                {statusState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Pesan Berhasil Terkirim
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                        Terima kasih telah menghubungi saya, <strong className="text-zinc-800 dark:text-zinc-200">{formData.name}</strong>. Saya akan meninjau pesan Anda dan membalasnya secepat mungkin.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-[#181C26] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-[#222736] transition-colors"
                      >
                        Kirim Pesan Lain
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Kirimkan Pesan
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Isi form di bawah ini dan saya akan merespon dalam waktu 1x24 jam.
                      </p>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Budi Santoso"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#5B6CFF] focus:ring-1 focus:ring-[#5B6CFF] transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                      >
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. budi@company.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#5B6CFF] focus:ring-1 focus:ring-[#5B6CFF] transition-all"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                      >
                        Pesan / Detail Proyek
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Jelaskan kebutuhan, ruang lingkup proyek, atau tawaran kolaborasi Anda..."
                        className="w-full px-4 py-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#5B6CFF] focus:ring-1 focus:ring-[#5B6CFF] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={statusState === 'loading'}
                      className="w-full py-3 rounded-lg bg-[#5B6CFF] hover:bg-[#4A5AE8] disabled:opacity-60 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      {statusState === 'loading' ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Kirim Pesan</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
