import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { editImage, saveToImageKit } from '../api/imageApi';
import { validateImageFile } from '../utils/imageFile';

export default function useImageEditor() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);

  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);

  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [ikResult, setIkResult] = useState(null);
  const [toasts, setToasts] = useState([]);

  const debounceRef = useRef(null);

  const params = useMemo(
    () => ({ brightness, contrast, saturation, rotation, flipH, flipV }),
    [brightness, contrast, saturation, rotation, flipH, flipV]
  );

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const processImage = useCallback(async (currentFile, currentParams) => {
    if (!currentFile) return;
    setIsProcessing(true);

    try {
      const url = await editImage(currentFile, currentParams);
      setPreviewUrl(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (error) {
      showToast(`Edit error: ${error.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (!file) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => processImage(file, params), 400);

    return () => clearTimeout(debounceRef.current);
  }, [brightness, contrast, saturation, rotation, flipH, flipV, file, processImage, params]);

  const handleFileChange = useCallback((selectedFile) => {
    if (!selectedFile) return;

    if (!validateImageFile(selectedFile)) {
      showToast('Only JPG, PNG, WEBP files are supported', 'error');
      return;
    }

    setFile(selectedFile);
    setIkResult(null);
    setPreviewUrl(null);

    const rawUrl = URL.createObjectURL(selectedFile);
    setOriginalUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return rawUrl;
    });

    processImage(selectedFile, params);
    showToast(`${selectedFile.name} loaded`, 'success');
  }, [params, processImage, showToast]);

  const handleFilterChange = useCallback((key, value) => {
    if (key === 'brightness') setBrightness(value);
    if (key === 'contrast') setContrast(value);
    if (key === 'saturation') setSaturation(value);
  }, []);

  const handleRotate = useCallback((deg) => {
    setRotation(prev => (prev + deg + 360) % 360);
  }, []);

  const handleFlipH = useCallback(() => setFlipH(prev => !prev), []);
  const handleFlipV = useCallback(() => setFlipV(prev => !prev), []);

  const handleDownload = useCallback(() => {
    if (!previewUrl) {
      showToast('Process an image first', 'error');
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = previewUrl;
    anchor.download = `quickkit-edited-${Date.now()}.jpg`;
    anchor.click();
    showToast('Image downloaded!', 'success');
  }, [previewUrl, showToast]);

  const handleSaveToImageKit = useCallback(async () => {
    if (!file) {
      showToast('Please upload an image first', 'error');
      return;
    }

    setIsSaving(true);
    setIkResult(null);

    try {
      const data = await saveToImageKit(file, params);
      setIkResult(data);
      showToast('Saved to ImageKit! 🎉', 'success');
    } catch (error) {
      showToast(`ImageKit error: ${error.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [file, params, showToast]);

  const handleReset = useCallback(() => {
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setIkResult(null);
    showToast('Settings reset', 'info');
  }, [showToast]);

  const displayUrl = previewUrl || originalUrl;

  return {
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
  };
}
