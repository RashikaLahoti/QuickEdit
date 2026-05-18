import React from 'react';
import './index.css';

import useImageEditor from './hooks/useImageEditor';
import Header from './components/Header';
import Toast from './components/Toast';
import Upload from './components/Upload';
import Filters from './components/Filters';
import Transform from './components/Transform';
import Actions from './components/Actions';
import Preview from './components/Preview';

export default function App() {
  const {
    file,
    displayUrl,
    brightness,
    contrast,
    saturation,
    rotation,
    flipH,
    flipV,
    isProcessing,
    isSaving,
    ikResult,
    toasts,
    handleFileChange,
    handleFilterChange,
    handleRotate,
    handleFlipH,
    handleFlipV,
    handleDownload,
    handleSaveToImageKit,
    handleReset,
  } = useImageEditor();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0e1a' }}>
      <Header />

      {/* ── Editor row — fills exactly what's left ── */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>

        {/* ════════════════════════════════════════
            LEFT SIDEBAR  (no scroll, fixed width)
            ┌────────────────────────┐
            │  Upload      flex:0    │
            ├────────────────────────┤
            │  Filters     flex:1    │
            ├────────────┬───────────┤
            │ Transform  │  Actions  │  flex:0
            └────────────┴───────────┘
        ════════════════════════════════════════ */}
        <aside style={{
          width: '320px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',          /* ← no scrollbar ever */
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(10,14,26,0.98)',
        }}>

          {/* Top stack: Upload + Filters — Filters stretches to fill */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px 14px 8px',
            overflow: 'hidden',
          }}>
            <div style={{ flexShrink: 0 }}>
              <Upload file={file} onFileChange={handleFileChange} />
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <Filters
                brightness={brightness}
                contrast={contrast}
                saturation={saturation}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Thin divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 14px', flexShrink: 0 }} />

          {/* Bottom row: Transform + Actions */}
          <div style={{
            flexShrink: 0,
            display: 'flex',
            gap: '8px',
            padding: '8px 14px 12px',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Transform
                rotation={rotation}
                flipH={flipH}
                flipV={flipV}
                onRotate={handleRotate}
                onFlipH={handleFlipH}
                onFlipV={handleFlipV}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Actions
                file={file}
                displayUrl={displayUrl}
                isProcessing={isProcessing}
                isSaving={isSaving}
                onDownload={handleDownload}
                onSaveToImageKit={handleSaveToImageKit}
                onReset={handleReset}
              />
            </div>
          </div>
        </aside>

        {/* ── Preview — fills remaining width ── */}
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Preview file={file} displayUrl={displayUrl} isProcessing={isProcessing} />
        </div>
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}