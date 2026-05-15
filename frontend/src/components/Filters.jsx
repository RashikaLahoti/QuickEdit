import React from 'react'

const sliders = [
  {
    key: 'brightness',
    label: 'Brightness',
    icon: (
      <svg style={{width:'12px',height:'12px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    min: 0.1, max: 3, step: 0.05,
    color: '#fbbf24',
  },
  {
    key: 'contrast',
    label: 'Contrast',
    icon: (
      <svg style={{width:'12px',height:'12px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
      </svg>
    ),
    min: 0.1, max: 3, step: 0.05,
    color: '#818cf8',
  },
  {
    key: 'saturation',
    label: 'Saturation',
    icon: (
      <svg style={{width:'12px',height:'12px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" />
      </svg>
    ),
    min: 0, max: 3, step: 0.05,
    color: '#34d399',
  },
]

function pct(val) {
  return Math.round(val * 100) + '%'
}

export default function Filters({ brightness, contrast, saturation, onChange }) {
  const values = { brightness, contrast, saturation }

  return (
    <div className="glass-card px-3.5 py-3 shrink-0">
      <p className="section-label mb-3">Filters</p>

      <div className="flex flex-col gap-3.5">
        {sliders.map(({ key, label, icon, min, max, step, color }) => {
          const val = values[key]
          const progress = ((val - min) / (max - min)) * 100

          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color }}>
                  {icon}
                  <span className="text-[#94a3b8]">{label}</span>
                </div>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{
                    color,
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {pct(val)}
                </span>
              </div>

              <div className="relative">
                <div
                  className="absolute top-1/2 left-0 h-[4px] -translate-y-1/2 rounded-full pointer-events-none"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}70, ${color})` }}
                />
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
