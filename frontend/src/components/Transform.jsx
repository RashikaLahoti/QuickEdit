import React from 'react'

const BUTTONS = [
  {
    id: 'rotate-left',
    label: 'Rotate Left',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
    ),
    action: 'rotate-left',
  },
  {
    id: 'rotate-right',
    label: 'Rotate Right',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 15l6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
      </svg>
    ),
    action: 'rotate-right',
  },
  {
    id: 'flip-h',
    label: 'Flip Horiz.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" />
        <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
        <line x1="12" y1="20" x2="12" y2="4" strokeDasharray="2 2" />
      </svg>
    ),
    action: 'flip-h',
  },
  {
    id: 'flip-v',
    label: 'Flip Vert.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
        <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
        <line x1="4" y1="12" x2="20" y2="12" strokeDasharray="2 2" />
      </svg>
    ),
    action: 'flip-v',
  },
]

export default function Transform({ rotation, flipH, flipV, onRotate, onFlipH, onFlipV }) {
  function handleClick(action) {
    if (action === 'rotate-left')  onRotate(-90)
    if (action === 'rotate-right') onRotate(90)
    if (action === 'flip-h')       onFlipH()
    if (action === 'flip-v')       onFlipV()
  }

  function isActive(action) {
    if (action === 'flip-h') return flipH
    if (action === 'flip-v') return flipV
    return false
  }

  return (
    <div className="glass-card" style={{ padding: '12px 12px 14px' }}>
      {/* Section header */}
      <div className="section-header" style={{ marginBottom: '10px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        Transform
      </div>

      {/* 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {BUTTONS.map(({ id, label, icon, action }) => (
          <button
            key={id}
            id={id}
            onClick={() => handleClick(action)}
            className={`transform-btn ${isActive(action) ? 'active' : ''}`}
            style={{ padding: '10px 4px 8px', gap: '5px' }}
          >
            {icon}
            <span style={{ fontSize: '9.5px', lineHeight: 1.3 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
