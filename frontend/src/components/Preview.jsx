import React, { useState } from 'react';

export default function Preview({ file, displayUrl, isProcessing }) {
  const [zoom, setZoom] = useState(100);

  const zoomIn  = () => setZoom(z => Math.min(z + 25, 300));
  const zoomOut = () => setZoom(z => Math.max(z - 25, 25));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080c18', position: 'relative' }}>

      {/* ── Header bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: '46px', flexShrink: 0,
        background: 'rgba(8,12,24,0.85)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', zIndex: 2,
      }}>
        {/* Monitor icon + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Live Preview</span>
        </div>

        {/* Zoom controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={zoomOut}
            style={{
              width: '28px', height: '28px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.05)', color: '#64748b', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#f1f5f9'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#64748b'; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>

          <div style={{
            padding: '0 10px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#94a3b8',
            fontFamily: "'JetBrains Mono', monospace", minWidth: '52px',
          }}>
            {zoom}%
          </div>

          <button
            onClick={zoomIn}
            style={{
              width: '28px', height: '28px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.05)', color: '#64748b', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#f1f5f9'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#64748b'; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>

      {/* ── Body: dot-grid background, centered content ── */}
      <div
        className="dot-grid"
        style={{
          flex: 1, minHeight: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative', zIndex: 1,
        }}
      >
        {/* Ambient glow blobs */}
        <div style={{ position: 'absolute', top: '15%', left: '15%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(99,102,241,0.04)', filter: 'blur(90px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(34,211,238,0.03)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        {!file ? (
          /* ── Empty state — perfectly centered ── */
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 2 }}>

            {/* Glowing icon */}
            <div style={{ position: 'relative' }}>
              {/* Sparkle stars */}
              {[
                { top: '-22px', left: '8px',   delay: '0s',   size: 8 },
                { top: '-10px', right: '-22px', delay: '0.5s', size: 6 },
                { bottom: '-6px', left: '-24px', delay: '0.9s', size: 7 },
                { top: '18px', right: '-32px',  delay: '1.3s', size: 5 },
              ].map((s, i) => (
                <div key={i} className="animate-star" style={{
                  position: 'absolute',
                  top: s.top, left: s.left, right: s.right, bottom: s.bottom,
                  animationDelay: s.delay,
                }}>
                  <svg width={s.size * 2} height={s.size * 2} viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L11.5 8.5L20 10L11.5 11.5L10 20L8.5 11.5L0 10L8.5 8.5L10 0Z" fill="url(#sparkGrad)" />
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#818cf8" /><stop offset="1" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              ))}

              {/* Icon box */}
              <div
                className="animate-float"
                style={{
                  width: '100px', height: '100px', borderRadius: '28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(34,211,238,0.12))',
                  border: '1px solid rgba(99,102,241,0.28)',
                  boxShadow: '0 0 70px rgba(99,102,241,0.22), 0 0 35px rgba(34,211,238,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="imgGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#818cf8" /><stop offset="1" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="url(#imgGrad)" strokeWidth="1.5" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="url(#imgGrad)" />
                  <path d="M21 15l-5-5L5 21" stroke="url(#imgGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Glow underneath */}
              <div style={{
                position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
                width: '80px', height: '20px',
                background: 'rgba(99,102,241,0.35)', filter: 'blur(16px)', borderRadius: '50%',
              }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>No image loaded</p>
              <p style={{ fontSize: '14px', color: '#475569' }}>Upload an image to start editing</p>
            </div>
          </div>

        ) : (
          /* ── Image display ── */
          <div className="animate-fade-up" style={{ position: 'relative', display: 'inline-block', padding: '16px', zIndex: 2 }}>
            {/* Glow halo */}
            <div style={{ position: 'absolute', inset: '-16px', borderRadius: '28px', background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(34,211,238,0.06))', filter: 'blur(20px)', pointerEvents: 'none' }} />

            {/* Frame */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.15)' }}>
              <img
                style={{
                  display: 'block', objectFit: 'contain', maxWidth: '100%',
                  maxHeight: 'calc(100vh - 130px)',
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease',
                }}
                src={displayUrl}
                alt="Preview"
              />

              {/* Processing overlay */}
              {isProcessing && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(8,12,24,0.8)', backdropFilter: 'blur(6px)' }}>
                  <span
                    className="animate-spin-fast"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(99,102,241,0.2)', borderTopColor: '#818cf8', boxShadow: '0 0 18px rgba(99,102,241,0.3)', display: 'block' }}
                  />
                  <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(129,140,248,0.7)' }}>Processing</span>
                </div>
              )}
            </div>

            {/* Corner brackets */}
            {['top:8px;left:8px;border-top:1px;border-left:1px', 'top:8px;right:8px;border-top:1px;border-right:1px', 'bottom:8px;left:8px;border-bottom:1px;border-left:1px', 'bottom:8px;right:8px;border-bottom:1px;border-right:1px'].map((_, i) => {
              const pos = [
                { top: 8, left: 8, borderTop: '1px solid rgba(99,102,241,0.3)', borderLeft: '1px solid rgba(99,102,241,0.3)' },
                { top: 8, right: 8, borderTop: '1px solid rgba(99,102,241,0.3)', borderRight: '1px solid rgba(99,102,241,0.3)' },
                { bottom: 8, left: 8, borderBottom: '1px solid rgba(99,102,241,0.3)', borderLeft: '1px solid rgba(99,102,241,0.3)' },
                { bottom: 8, right: 8, borderBottom: '1px solid rgba(99,102,241,0.3)', borderRight: '1px solid rgba(99,102,241,0.3)' },
              ][i]
              return <span key={i} style={{ position: 'absolute', width: '16px', height: '16px', pointerEvents: 'none', ...pos }} />
            })}
          </div>
        )}
      </div>
    </div>
  );
}
