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
    <div className="glass-card px-3.5 py-3 shrink-0">
      <p className="section-label mb-2.5">Upload Image</p>

      {/* Drop zone — compact height */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl py-3.5 px-4 flex items-center gap-3 cursor-pointer transition-all duration-300 group ${
          dragging
            ? 'drag-active'
            : 'border-[rgba(0,229,255,0.15)] hover:border-[rgba(0,229,255,0.35)] hover:bg-[rgba(0,229,255,0.03)]'
        }`}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files[0])}
        />

        {/* Icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          dragging
            ? 'bg-[rgba(0,229,255,0.15)] shadow-[0_0_14px_rgba(0,229,255,0.2)]'
            : 'bg-[rgba(0,229,255,0.06)] group-hover:bg-[rgba(0,229,255,0.1)]'
        }`}>
          <svg className="w-4.5 h-4.5 text-[#00e5ff]" style={{width:'18px',height:'18px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#e2e8f0] leading-tight">
            {file ? 'Click to replace' : 'Drop or click to upload'}
          </p>
          <p className="text-[10px] text-[#475569] mt-0.5">JPG, PNG, WEBP</p>
        </div>
      </div>

      {/* Selected file badge */}
      {file && (
        <div className="mt-2 flex items-center gap-2 text-[10px] bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.12)] rounded-lg px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0 shadow-[0_0_5px_#00e5ff]" />
          <span className="text-[#94a3b8] truncate">{file.name}</span>
          <span className="ml-auto text-[#475569] shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
        </div>
      )}
    </div>
  )
}
