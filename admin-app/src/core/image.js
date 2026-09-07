// ============================================================
// Compresión de imágenes (E6 fase ② §191) — réplica modular de
// AP.compressImage del clásico (admin-state): canvas → WebP.
// Storage rules exigen <5MB e image/*; 1920px @ 0.85 queda muy
// por debajo. Devuelve un Blob image/webp.
// ============================================================

export function compressImage(file, { maxWidth = 1920, quality = 0.85 } = {}) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('No se pudo comprimir la imagen.'));
      }, 'image/webp', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Archivo de imagen inválido.')); };
    img.src = url;
  });
}
