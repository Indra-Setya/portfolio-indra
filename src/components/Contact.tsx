import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Send, CheckCircle2, MessageSquare, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedinIcon, GithubIcon } from './Icons';

interface ContactProps {
  language?: 'id' | 'en';
}

export const ContactSection: React.FC<ContactProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusState, setStatusState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formOpen, setFormOpen] = useState(true);

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
    <section id="kontak" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto">
      {/* Matthew Finale Card */}
      <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#EEF0F4] dark:bg-[#11141C] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-12 lg:p-16 space-y-14 overflow-hidden relative">
        {/* Matthew "LET'S WORK TOGETHER" with Giant Diagonal Arrow */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-black/[0.08] dark:border-white/[0.08] pb-10">
          <div className="flex items-start sm:items-center gap-6">
            {/* Giant Arrow */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-3xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shrink-0 shadow-lg">
              <ArrowUpRight size={44} className="sm:scale-125" />
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5B6CFF] font-semibold block mb-1">
                /04 INITIATE CONTACT
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-zinc-900 dark:text-white leading-[0.95]">
                LET'S WORK TOGETHER
              </h2>
            </div>
          </div>

          {/* Capsule CTA button */}
          <div className="self-start lg:self-auto">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-95"
            >
              <span>SEND ME A MESSAGE</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* 2-Column Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              Siap berkolaborasi untuk posisi rekayasa penuh waktu (full-time), kontrak arsitektur backend &amp; cloud, maupun riset kecerdasan buatan.
            </p>

            {/* Direct Email Card with 1-Click Copy */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>EMAIL RESMI</span>
                {copiedEmail && (
                  <span className="text-[#5B6CFF] font-bold animate-fadeIn">
                    Tersalin ke Clipboard!
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-zinc-900 dark:text-white hover:text-[#5B6CFF] transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/[0.08] hover:bg-[#5B6CFF] hover:text-white text-zinc-600 dark:text-zinc-300 transition-colors shadow-sm shrink-0"
                  aria-label="Salin email"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#5B6CFF] transition-colors group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">WhatsApp</div>
                  <div className="text-[11px] font-mono text-zinc-400">{PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#5B6CFF] transition-colors group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center">
                    <LinkedinIcon size={16} />
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">LinkedIn</div>
                  <div className="text-[11px] font-mono text-zinc-400">Indra Setya Ari Irawan</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
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
                      <h3 className="text-2xl font-display uppercase tracking-wide text-zinc-900 dark:text-white">
                        PESAN BERHASIL TERKIRIM
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-sans">
                        Terima kasih telah menghubungi saya, <strong className="text-zinc-800 dark:text-zinc-200">{formData.name}</strong>. Saya akan meninjau pesan Anda dan membalasnya secepat mungkin.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
                      >
                        KIRIM PESAN LAIN
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-display text-2xl tracking-wide uppercase text-zinc-900 dark:text-white">
                        KIRIM PESAN LANGSUNG
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        Respon cepat dalam 1x24 jam kerja
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Budi Pratama"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#5B6CFF] transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
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
                        className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#5B6CFF] transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                      >
                        Pesan atau Kebutuhan Proyek
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Jelaskan kebutuhan arsitektur sistem, lowongan kerja, atau ruang lingkup proyek Anda..."
                        className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#5B6CFF] transition-all resize-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={statusState === 'loading'}
                      className="w-full py-3.5 rounded-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-60 text-white dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      {statusState === 'loading' ? (
                        <span className="inline-block w-4 h-4 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>KIRIM PESAN SEKARANG</span>
                          <Send size={14} />
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
