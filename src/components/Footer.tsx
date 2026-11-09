import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

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
    <footer className="pt-12 sm:pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto select-none overflow-hidden">
      {/* Matthew Finale Giant Condensed Name Typography */}
      <div className="w-full text-center py-6 sm:py-10 border-t border-black/[0.08] dark:border-white/[0.08] overflow-hidden">
        <h2 className="font-display text-[19vw] leading-none uppercase tracking-tight text-zinc-900/[0.95] dark:text-white/[0.95] select-none hover:text-[#5B6CFF] transition-colors duration-500 whitespace-nowrap">
          INDRA SETYA
        </h2>
      </div>

      {/* Matthew Footer Bottom Bar */}
      <div className="pt-6 sm:pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {/* Copyright */}
        <div>
          &copy; {new Date().getFullYear()} DESIGN BY INDRA SETYA. ALL RIGHTS RESERVED.
        </div>

        {/* Social Links (Matthew Style) */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-700 dark:text-zinc-300">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5B6CFF] transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5B6CFF] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5B6CFF] transition-colors"
          >
            WHATSAPP
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[#5B6CFF] transition-colors"
          >
            EMAIL
          </a>
        </div>

        {/* Live WIB Time & Back-to-Top Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300">
            <Clock size={12} className="text-[#5B6CFF]" />
            <span>WIB: {timeStr || '00:00:00'}</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="w-8 h-8 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-[#5B6CFF] hover:text-[#5B6CFF] transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
