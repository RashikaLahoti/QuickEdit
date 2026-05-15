import React from 'react';

export default function Preview({ file, displayUrl, isProcessing }) {
  return (
    <main className="flex flex-col overflow-hidden" style={{ background: '#030712' }}>
      {/* Ambient glow — purely decorative */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '25%', left: '25%', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(0,229,255,0.03)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '20%', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(59,130,246,0.04)', filter: 'blur(70px)' }} />
      </div>

      {/* Header bar */}
      <div
        className="relative flex items-center justify-between px-5 py-2.5 border-b border-[rgba(0,229,255,0.07)] shrink-0"
        style={{ background: 'rgba(3,7,18,0.6)', backdropFilter: 'blur(8px)', zIndex: 1 }}
      >
        <div className="flex items-center gap-2">
          {/* macOS dots */}
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="text-[10px] font-bold text-[#475569] tracking-[1.5px] uppercase ml-1.5">
            Live Preview
          </span>
        </div>

        {file && (
          <div
            className="flex items-center gap-1.5 text-[10px] text-[#475569]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="truncate max-w-[180px]">{file.name}</span>
            <span className="text-[#1e293b]">·</span>
            <span>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        )}
      </div>

      {/* Body — fills remaining height, centered */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden checkerboard"
        style={{ zIndex: 1 }}
      >
        {!file ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center gap-4 text-[#1e293b] animate-fade-up">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center animate-float"
              style={{ border: '2px dashed rgba(0,229,255,0.1)' }}
            >
              <svg style={{ width: '36px', height: '36px', color: 'rgba(0,229,255,0.18)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#334155] mb-1">No image loaded</p>
              <p className="text-xs text-[#1e293b]">Upload an image to start editing</p>
            </div>
          </div>
        ) : (
          /* ── Image ── */
          <div className="relative inline-block animate-fade-up p-4">
            {/* Glow halo */}
            <div style={{ position: 'absolute', inset: '-12px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(59,130,246,0.05))', filter: 'blur(16px)', pointerEvents: 'none' }} />

            {/* Frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,229,255,0.1)' }}
            >
              <img
                className="block object-contain max-w-full"
                style={{ maxHeight: 'calc(100vh - 130px)' }}
                src={displayUrl}
                alt="Preview"
              />

              {/* Processing overlay */}
              {isProcessing && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  style={{ background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(4px)' }}
                >
                  <span
                    className="w-10 h-10 rounded-full border-2 border-t-[#00e5ff] animate-spin-fast"
                    style={{ borderColor: 'rgba(0,229,255,0.2)', borderTopColor: '#00e5ff', boxShadow: '0 0 18px rgba(0,229,255,0.3)' }}
                  />
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[#00e5ff]/60">Processing</span>
                </div>
              )}
            </div>

            {/* Corner brackets */}
            {[
              'top-2 left-2 border-t border-l',
              'top-2 right-2 border-t border-r',
              'bottom-2 left-2 border-b border-l',
              'bottom-2 right-2 border-b border-r',
            ].map((cls, i) => (
              <span key={i} className={`absolute ${cls} w-4 h-4 pointer-events-none`} style={{ borderColor: 'rgba(0,229,255,0.25)' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
