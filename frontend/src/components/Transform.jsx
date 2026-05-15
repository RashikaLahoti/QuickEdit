import React from 'react'

export default function Transform({ rotation, flipH, flipV, onRotate, onFlipH, onFlipV }) {
  const btnBase =
    'btn-neon flex items-center justify-center gap-1 py-2 px-2 rounded-lg border text-[11px] font-semibold transition-all duration-200'
  const btnIdle =
    'border-[rgba(0,229,255,0.12)] bg-[rgba(0,229,255,0.04)] text-[#64748b] hover:border-[rgba(0,229,255,0.35)] hover:text-[#00e5ff] hover:bg-[rgba(0,229,255,0.08)] hover:shadow-[0_0_12px_rgba(0,229,255,0.1)]'

  return (
    <div className="glass-card px-3.5 py-3 shrink-0">
      <p className="section-label mb-2.5">Transform</p>

      {/* All 4 buttons in one row */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        <button id="rotate-left" onClick={() => onRotate(-90)} className={`${btnBase} ${btnIdle}`} title="Rotate −90°">
          <svg style={{width:'13px',height:'13px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          <span className="hidden sm:inline">−90°</span>
        </button>

        <button id="rotate-right" onClick={() => onRotate(90)} className={`${btnBase} ${btnIdle}`} title="Rotate +90°">
          <svg style={{width:'13px',height:'13px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
          </svg>
          <span className="hidden sm:inline">+90°</span>
        </button>

        <button
          id="flip-h"
          onClick={onFlipH}
          title="Flip Horizontal"
          className={`${btnBase} ${flipH ? 'toggle-active' : btnIdle}`}
        >
          <svg style={{width:'13px',height:'13px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
          </svg>
          <span>Flip H</span>
        </button>

        <button
          id="flip-v"
          onClick={onFlipV}
          title="Flip Vertical"
          className={`${btnBase} ${flipV ? 'toggle-active' : btnIdle}`}
        >
          <svg style={{width:'13px',height:'13px',transform:'rotate(90deg)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
          </svg>
          <span>Flip V</span>
        </button>
      </div>

      {/* State strip */}
      <div
        className="flex items-center gap-3 text-[9px] text-[#334155] bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.06)] rounded-lg px-2.5 py-1.5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span>rot: <span className="text-[#00e5ff]/50">{rotation}°</span></span>
        <span className="text-[#1e293b]">·</span>
        <span>flip: <span className="text-[#00e5ff]/50">{[flipH && 'H', flipV && 'V'].filter(Boolean).join('+') || 'none'}</span></span>
      </div>
    </div>
  )
}
