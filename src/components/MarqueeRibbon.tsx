import React from 'react';

export const MarqueeRibbon: React.FC = () => {
  const items = [
    'BACKEND ARCHITECTURE',
    'GOOGLE CLOUD PLATFORM (GCP)',
    'NATURAL LANGUAGE PROCESSING',
    'INDOBERT & FASTTEXT',
    'RESTFUL MICROSERVICES',
    'DATABASE OPTIMIZATION',
    'KOTLIN ANDROID NATIVE',
    'PHP LARAVEL & NODE.JS',
  ];

  return (
    <div className="w-full overflow-hidden py-4 sm:py-6 border-y border-black/[0.08] dark:border-white/[0.08] bg-[#FAFAF9] dark:bg-[#0E1118] select-none my-6 sm:my-10">
      <div className="animate-marquee-left flex items-center space-x-6 sm:space-x-8 font-display text-2xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-zinc-900/80 dark:text-white/80 whitespace-nowrap">
        {[...items, ...items, ...items].map((text, idx) => (
          <React.Fragment key={idx}>
            <span className="hover:text-[#5B6CFF] transition-colors">{text}</span>
            <span className="text-[#5B6CFF] text-xl sm:text-2xl font-sans">&bull;</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
