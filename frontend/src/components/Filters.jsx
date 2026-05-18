import React from 'react'

const sliders = [
  {
    key: 'brightness',
    label: 'Brightness',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    min: 0.1, max: 3, step: 0.05,
  },
  {
    key: 'contrast',
    label: 'Contrast',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
      </svg>
    ),
    min: 0.1, max: 3, step: 0.05,
  },
  {
    key: 'saturation',
    label: 'Saturation',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" />
      </svg>
    ),
    min: 0, max: 3, step: 0.05,
  },
]

function displayPct(val) {
  return Math.round(val * 100) + '%'
}

export default function Filters({ brightness, contrast, saturation, onChange }) {
  const values = { brightness, contrast, saturation }

  return (
    <div className="glass-card" style={{
      padding: '14px 14px 16px',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Section header */}
      <div className="section-header" style={{ marginBottom: '14px', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
          <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        Filters
      </div>

      {/* Sliders — evenly distributed in remaining height */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}>
        {sliders.map(({ key, label, icon, min, max, step }) => {
          const val = values[key]
          const progress = ((val - min) / (max - min)) * 100

          return (
            <div key={key}>
              {/* Label row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', fontWeight: 500, color: '#94a3b8' }}>
                  <span style={{ color: '#64748b' }}>{icon}</span>
                  <span>{label}</span>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 600, color: '#e2e8f0',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '5px', padding: '1px 6px',
                  fontFamily: "'JetBrains Mono', monospace",
                  minWidth: '38px', textAlign: 'center',
                }}>
                  {displayPct(val)}
                </span>
              </div>

              {/* Slider */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: '50%', left: 0,
                  height: '4px', transform: 'translateY(-50%)',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #22d3ee, #818cf8)',
                  borderRadius: '10px', pointerEvents: 'none',
                }} />
                <input
                  type="range"
                  min={min} max={max} step={step}
                  value={val}
                  onChange={(e) => onChange(key, Number(e.target.value))}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
