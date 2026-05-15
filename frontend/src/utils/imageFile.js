export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImageFile(file) {
  return file && SUPPORTED_IMAGE_TYPES.includes(file.type);
}
