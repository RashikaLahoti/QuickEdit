import React from 'react'

export default function Actions({ file, displayUrl, isProcessing, isSaving, onDownload, onSaveToImageKit, onReset }) {
  const btnBase = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    padding: '9px 8px',
    borderRadius: '9px',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
  }

  return (
    <div className="glass-card" style={{ padding: '12px 12px 14px' }}>
      {/* Section header */}
      <div className="section-header" style={{ marginBottom: '10px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Actions
      </div>

      {/* Stacked full-width buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>

        {/* Reset */}
        <button
          id="btn-reset"
          onClick={onReset}
          disabled={!file}
          className="btn-neon"
          style={{
            ...btnBase,
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.18)',
            color: '#f87171',
            opacity: !file ? 0.35 : 1,
          }}
          onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.18)'; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Reset
        </button>

        {/* Download */}
        <button
          id="btn-download"
          onClick={onDownload}
          disabled={!displayUrl || isProcessing}
          className="btn-neon"
          style={{
            ...btnBase,
            background: 'rgba(34,211,238,0.07)',
            border: '1px solid rgba(34,211,238,0.18)',
            color: '#22d3ee',
            opacity: (!displayUrl || isProcessing) ? 0.35 : 1,
          }}
          onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = 'rgba(34,211,238,0.13)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.35)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(34,211,238,0.1)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.07)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.18)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {isProcessing ? (
            <span className="animate-spin-fast" style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(34,211,238,0.3)', borderTopColor: '#22d3ee', display: 'block' }} />
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          )}
          Download Image
        </button>

        {/* Save to ImageKit */}
        <button
          id="btn-save-imagekit"
          onClick={onSaveToImageKit}
          disabled={!file || isSaving}
          className="btn-neon"
          style={{
            ...btnBase,
            background: 'rgba(99,102,241,0.07)',
            border: '1px solid rgba(99,102,241,0.18)',
            color: '#818cf8',
            opacity: (!file || isSaving) ? 0.35 : 1,
          }}
          onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = 'rgba(99,102,241,0.13)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(99,102,241,0.1)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.07)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {isSaving ? (
            <span className="animate-spin-fast" style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(129,140,248,0.3)', borderTopColor: '#818cf8', display: 'block' }} />
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          )}
          Save to ImageKit
        </button>
      </div>

    </div>
  )
}
