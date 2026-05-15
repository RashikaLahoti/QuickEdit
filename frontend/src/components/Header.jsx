import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-6 py-3 shrink-0 sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[rgba(3,7,18,0.95)] backdrop-blur-2xl border-[rgba(0,229,255,0.12)] shadow-[0_2px_24px_rgba(0,0,0,0.5)]'
          : 'bg-[rgba(3,7,18,0.7)] backdrop-blur-xl border-[rgba(0,229,255,0.07)]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-xl bg-linear-to-br from-[#00e5ff] to-[#3b82f6] opacity-20 blur-md" />
          <div className="relative w-8 h-8 rounded-xl bg-linear-to-br from-[#00e5ff]/15 to-[#3b82f6]/15 border border-[rgba(0,229,255,0.3)] flex items-center justify-center">
            <svg style={{width:'16px',height:'16px'}} viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7V12C4 16.55 7.41 20.74 12 22C16.59 20.74 20 16.55 20 12V7L12 3Z"
                stroke="url(#gh1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                fill="url(#gh1fill)" />
              <defs>
                <linearGradient id="gh1" x1="4" y1="3" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00e5ff" /><stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="gh1fill" x1="4" y1="3" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00e5ff" stopOpacity="0.12" /><stop offset="1" stopColor="#3b82f6" stopOpacity="0.12" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-[17px] font-extrabold tracking-tight shimmer-text">QuickEdit</span>
          <span className="text-[9px] font-medium text-[#334155] tracking-[1.5px] uppercase">Image Studio</span>
        </div>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#00e5ff]/50 bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.1)] px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
        Powered by ImageKit
      </div>
    </header>
  );
}
