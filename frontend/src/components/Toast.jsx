import React from 'react'

const icons = {
  success: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  ),
}

const styles = {
  success: {
    bg:     'bg-[rgba(52,211,153,0.08)]',
    border: 'border-[rgba(52,211,153,0.25)]',
    icon:   'text-[#34d399]',
    text:   'text-[#6ee7b7]',
    dot:    '#34d399',
  },
  error: {
    bg:     'bg-[rgba(239,68,68,0.08)]',
    border: 'border-[rgba(239,68,68,0.25)]',
    icon:   'text-[#f87171]',
    text:   'text-[#fca5a5]',
    dot:    '#f87171',
  },
  info: {
    bg:     'bg-[rgba(0,229,255,0.06)]',
    border: 'border-[rgba(0,229,255,0.2)]',
    icon:   'text-[#00e5ff]',
    text:   'text-[#7dd3fc]',
    dot:    '#00e5ff',
  },
}

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => {
        const s = styles[t.type] || styles.info
        return (
          <div
            key={t.id}
            className={`
              animate-toast-in pointer-events-auto
              flex items-center gap-3 px-4 py-3 rounded-2xl
              ${s.bg} ${s.border} border
              backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]
              max-w-sm
            `}
          >
            {/* Dot indicator */}
            <span className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_6px_currentColor]" style={{ backgroundColor: s.dot, color: s.dot }} />
            {/* Icon */}
            <span className={s.icon}>{icons[t.type] || icons.info}</span>
            {/* Message */}
            <span className={`text-sm font-medium ${s.text} wrap-break`}>{t.message}</span>
          </div>
        )
      })}
    </div>
  )
}
