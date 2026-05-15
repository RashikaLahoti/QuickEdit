import React from 'react'

export default function Actions({ file, displayUrl, isProcessing, isSaving, ikResult, onDownload, onSaveToImageKit, onReset }) {
  return (
    <div className="glass-card px-3.5 py-3 shrink-0">
      <p className="section-label mb-2.5">Actions</p>

      <div className="flex flex-col gap-2">
        {/* Download */}
        <button
          id="btn-download"
          onClick={onDownload}
          disabled={!displayUrl || isProcessing}
          className="btn-neon flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[12px] font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]
            bg-linear-to-r from-[#00e5ff]/20 to-[#3b82f6]/20 border border-[rgba(0,229,255,0.25)] text-[#00e5ff]
            hover:from-[#00e5ff]/30 hover:to-[#3b82f6]/30 hover:border-[rgba(0,229,255,0.5)] hover:shadow-[0_0_20px_rgba(0,229,255,0.18)]"
        >
          {isProcessing ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-[#00e5ff]/30 border-t-[#00e5ff] rounded-full animate-spin-fast shrink-0" />
              Processing…
            </>
          ) : (
            <>
              <svg style={{width:'14px',height:'14px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Image
            </>
          )}
        </button>

        {/* Save to ImageKit */}
        <button
          id="btn-save-imagekit"
          onClick={onSaveToImageKit}
          disabled={!file || isSaving}
          className="btn-neon flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[12px] font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]
            bg-linear-to-r from-[#34d399]/15 to-[#059669]/15 border border-[rgba(52,211,153,0.2)] text-[#34d399]
            hover:from-[#34d399]/25 hover:to-[#059669]/25 hover:border-[rgba(52,211,153,0.4)] hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]"
        >
          {isSaving ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-[#34d399]/30 border-t-[#34d399] rounded-full animate-spin-fast shrink-0" />
              Uploading…
            </>
          ) : (
            <>
              <svg style={{width:'14px',height:'14px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              Save to ImageKit
            </>
          )}
        </button>

        {/* Reset — smaller, outlined only */}
        <button
          id="btn-reset"
          onClick={onReset}
          disabled={!file}
          className="btn-neon flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-[11px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]
            border border-[rgba(239,68,68,0.18)] text-[#f87171] bg-[rgba(239,68,68,0.04)]
            hover:border-[rgba(239,68,68,0.4)] hover:bg-[rgba(239,68,68,0.09)] hover:shadow-[0_0_14px_rgba(239,68,68,0.1)]"
        >
          <svg style={{width:'13px',height:'13px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Reset All
        </button>
      </div>

      {/* ImageKit result */}
      {ikResult && (
        <div className="mt-2.5 bg-[rgba(52,211,153,0.05)] border border-[rgba(52,211,153,0.15)] rounded-xl p-2.5 animate-fade-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_5px_#34d399]" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#34d399]">Saved to ImageKit</p>
          </div>
          <a
            href={ikResult.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#00e5ff]/60 hover:text-[#00e5ff] underline break-all transition-colors"
          >
            {ikResult.url}
          </a>
        </div>
      )}
    </div>
  )
}
