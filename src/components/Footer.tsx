import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedinIcon, GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  // Live WIB (Asia/Jakarta) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('id-ID', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white dark:bg-[#0B0D12] border-t border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="text-center md:text-left space-y-1">
            <div className="font-bold text-base tracking-tight text-zinc-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5B6CFF]" />
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {PERSONAL_INFO.title} &bull; Yogyakarta, Indonesia
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-[#5B6CFF] border border-black/[0.06] dark:border-white/[0.08] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-[#5B6CFF] border border-black/[0.06] dark:border-white/[0.08] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Local WIB Time & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] font-mono text-xs text-zinc-600 dark:text-zinc-400">
              <Clock size={13} className="text-[#5B6CFF]" />
              <span>WIB: {timeStr || '00:00:00'}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08] transition-colors flex items-center justify-center"
              aria-label="Kembali ke atas"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
          <p>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="font-mono text-[11px]">
            Dirancang &amp; Dikembangkan dengan Presisi.
          </p>
        </div>
      </div>
    </footer>
  );
};
