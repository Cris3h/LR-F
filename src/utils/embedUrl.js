/**
 * Convierte URLs de YouTube (u otros) a formato embed para iframes.
 * @param {string | null | undefined} url
 * @returns {string | null}
 */
export function toEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.includes("youtube.com/embed") || trimmed.includes("player.vimeo.com")) {
    return trimmed;
  }
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    if (u.hostname === "youtu.be" && u.pathname.length > 1) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
  } catch {
    return trimmed;
  }
  return trimmed;
}
