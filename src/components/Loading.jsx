"use client";

import styles from "./Loading.module.css";

/**
 * Indicador de carga con círculo animado. Úsalo mientras no haya datos listos.
 * @param {"full" | "inline"} variant — full: área principal; inline: bloque más compacto (p. ej. mapa).
 */
export default function Loading({
  label = "Cargando…",
  variant = "full",
  className,
}) {
  const rootClass =
    variant === "inline"
      ? `${styles.root} ${styles.rootInline} ${className ?? ""}`.trim()
      : `${styles.root} ${className ?? ""}`.trim();

  return (
    <div className={rootClass} role="status" aria-live="polite">
      <span className={styles.visuallyHidden}>{label}</span>
      <div className={styles.spinner} aria-hidden />
    </div>
  );
}
