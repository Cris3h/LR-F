/**
 * URLs de imágenes de un mural: prioriza `images[]`, compatible con `image` legacy.
 * @param {{ images?: string[]; image?: string } | null | undefined} detail
 * @returns {string[]}
 */
export function coalesceArtworkImages(detail) {
  if (!detail) return [];
  if (Array.isArray(detail.images) && detail.images.length > 0) {
    return detail.images.filter(Boolean);
  }
  if (detail.image) return [detail.image];
  return [];
}

/**
 * Primera imagen para tarjetas, mapa o vista previa.
 * @param {{ images?: string[]; image?: string } | null | undefined} detail
 * @returns {string | null}
 */
export function primaryArtworkImage(detail) {
  const urls = coalesceArtworkImages(detail);
  return urls[0] ?? null;
}
