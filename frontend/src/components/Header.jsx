import React from 'react';

export default function Header() {
  return (
    <header
      className="flex items-center justify-between px-6 shrink-0 z-50 border-b"
      style={{
        background: 'rgba(8, 12, 24, 0.95)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.07)',
        minHeight: '48px',
      }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            boxShadow: '0 0 16px rgba(99,102,241,0.45)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M13 2L4.09 12.97H11L10 22L20.91 11.03H14L13 2Z" />
          </svg>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-[18px] font-bold text-white tracking-tight">QuickEdit</span>
          <span className="text-[13px] font-medium" style={{ color: 'rgba(148,163,184,0.65)' }}>
            Image Studio
          </span>
        </div>
      </div>

      {/* ── Center: All changes saved ── */}
      <div
        className="flex items-center gap-2 text-[13px] font-medium"
        style={{ color: '#4ade80' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        All changes saved
      </div>

      {/* ── Right: empty placeholder to keep center balanced ── */}
      <div style={{ width: '160px' }} />
    </header>
  );
}
