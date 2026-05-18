import React, { useState, useRef } from 'react'

export default function Upload({ file, onFileChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFileChange(dropped)
  }

  return (
    <div className="glass-card" style={{ padding: '14px 14px 12px' }}>
      {/* Section header */}
      <div className="section-header" style={{ marginBottom: '10px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Upload Image
      </div>

      {/* Drop zone — compact */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={dragging ? 'drag-active' : ''}
        style={{
          border: '2px dashed',
          borderColor: dragging ? '#22d3ee' : 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
          padding: '14px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          background: dragging ? 'rgba(34,211,238,0.04)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.25s',
        }}
        onMouseEnter={e => {
          if (!dragging) {
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'
            e.currentTarget.style.background = 'rgba(99,102,241,0.04)'
          }
        }}
        onMouseLeave={e => {
          if (!dragging) {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
          }
        }}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          style={{ display: 'none' }}
          onChange={(e) => onFileChange(e.target.files[0])}
        />

        {/* Icon */}
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#uploadGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="uploadGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" /><stop offset="1" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
        </div>

        {/* Text */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {file ? file.name : 'Drag & drop or click to browse'}
          </p>
          <p style={{ fontSize: '10px', color: '#475569' }}>
            {file ? `${(file.size / 1024).toFixed(0)} KB` : 'JPG, PNG, WEBP · Max 10MB'}
          </p>
        </div>
      </div>
    </div>
  )
}
