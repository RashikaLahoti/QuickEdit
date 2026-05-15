const API_BASE = 'http://localhost:3000/api/image';

/**
 * Build FormData from the current image file + all edit params.
 */
function buildFormData(file, params) {
  const fd = new FormData();
  fd.append('image', file);
  fd.append('brightness', params.brightness);
  fd.append('contrast', params.contrast);
  fd.append('saturation', params.saturation);
  fd.append('rotation', params.rotation);
  fd.append('flipH', params.flipH);
  fd.append('flipV', params.flipV);
  return fd;
}

/**
 * POST /api/image/edit
 * Returns a blob URL of the processed image.
 */
export async function editImage(file, params) {
  const fd = buildFormData(file, params);

  const response = await fetch(`${API_BASE}/edit`, {
    method: 'POST',
    body: fd,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Processing failed');
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

/**
 * POST /api/image/save
 * Uploads the processed image to ImageKit and returns the result object.
 */
export async function saveToImageKit(file, params) {
  const fd = buildFormData(file, params);

  const response = await fetch(`${API_BASE}/save`, {
    method: 'POST',
    body: fd,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Upload failed');
  }

  return response.json();
}
