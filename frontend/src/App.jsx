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
    /* Lock entire app to viewport — no scroll ever */
    <div className="h-screen flex flex-col overflow-hidden bg-mesh">
      <Header />

      {/* ── Editor Grid ── fills remaining height exactly */}
      <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: '340px 1fr' }}>

        {/* ── Sidebar ─ fixed height, no overflow ── */}
        <aside
          className="flex flex-col gap-2.5 p-3.5 border-r border-[rgba(0,229,255,0.07)] overflow-hidden"
          style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(14px)' }}
        >
          <Upload    file={file} onFileChange={handleFileChange} />
          <Filters   brightness={brightness} contrast={contrast} saturation={saturation} onChange={handleFilterChange} />
          <Transform rotation={rotation} flipH={flipH} flipV={flipV} onRotate={handleRotate} onFlipH={handleFlipH} onFlipV={handleFlipV} />
          <Actions
            file={file}
            displayUrl={displayUrl}
            isProcessing={isProcessing}
            isSaving={isSaving}
            ikResult={ikResult}
            onDownload={handleDownload}
            onSaveToImageKit={handleSaveToImageKit}
            onReset={handleReset}
          />

          {/* Branding footer */}
          <div className="mt-auto text-[9px] text-[#1e293b] text-center tracking-widest uppercase">
            QuickEdit · Image Studio
          </div>
        </aside>

        {/* ── Preview panel ─ fills rest ── */}
        <Preview file={file} displayUrl={displayUrl} isProcessing={isProcessing} />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}