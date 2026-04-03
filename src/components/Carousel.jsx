"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "@/styles/carousel.module.css";

/** @param {string | string[] | undefined | null} image */
function normalizeSlides(image) {
  if (image == null || image === "") return [];
  if (Array.isArray(image)) return image.filter(Boolean);
  return [image];
}

function ChevronLeft() {
  return (
    <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @param {{ image?: string | string[] | null; alt?: string; className?: string }} props
 */
const Carousel = ({ image, alt = "Mural", className }) => {
  const slides = useMemo(() => normalizeSlides(image), [image]);
  const [slide, setSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  /** Índice de la foto ampliada (fijado al abrir; no cambia con el carrusel) */
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  const count = slides.length;
  const showNav = count > 1;

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta) => {
      setSlide((s) => {
        const next = s + delta;
        if (next < 0) return count - 1;
        if (next >= count) return 0;
        return next;
      });
    },
    [count]
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setLightboxIndex(null);
  }, []);

  const openLightbox = useCallback(() => {
    setLightboxIndex(slide);
    setLightboxOpen(true);
  }, [slide]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox]);

  const onRegionKeyDown = useCallback(
    (e) => {
      if (!showNav) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    },
    [showNav, go]
  );

  const rootClass = className ?? styles.carousel;

  const lightboxSrc =
    lightboxIndex !== null && slides[lightboxIndex] ? slides[lightboxIndex] : null;

  const lightboxNode =
    mounted &&
    lightboxOpen &&
    lightboxSrc &&
    createPortal(
      <div
        className={styles.lightboxRoot}
        role="dialog"
        aria-modal="true"
        aria-label={`${alt} ampliada`}
        onClick={closeLightbox}
      >
        <div
          className={styles.lightboxPanel}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Cerrar vista ampliada"
          >
            <span aria-hidden>×</span>
          </button>

          <div className={styles.lightboxFigure}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tamaño dinámico contain en overlay */}
            <img
              src={lightboxSrc}
              alt={alt}
              className={styles.lightboxImg}
              decoding="async"
            />
          </div>
        </div>
      </div>,
      document.body
    );

  if (count === 0) return null;

  return (
    <div
      className={rootClass}
      role="region"
      aria-roledescription="carrusel"
      aria-label={alt}
      tabIndex={showNav ? 0 : undefined}
      onKeyDown={onRegionKeyDown}
    >
      <div
        className={styles.viewport}
        onClick={openLightbox}
        role="presentation"
        title="Ampliar imagen"
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={styles.slideLayer}
            data-active={slide === i ? "true" : "false"}
            aria-hidden={slide !== i}
          >
            <Image
              src={src}
              alt={count > 1 ? `${alt} — ${i + 1} de ${count}` : alt}
              fill
              className={styles.slideImg}
              sizes="(max-width: 900px) 100vw, 900px"
              unoptimized
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {lightboxNode}

      {showNav ? (
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnPrev}`}
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
          >
            <ChevronLeft />
          </button>

          <div className={styles.toolbarCenter}>
            <span className={styles.counter}>
              {slide + 1} / {count}
            </span>
            <div className={styles.dots} aria-label="Seleccionar imagen">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Imagen ${i + 1} de ${count}`}
                  aria-current={slide === i ? "true" : undefined}
                  className={styles.dot}
                  data-active={slide === i ? "true" : "false"}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
          >
            <ChevronRight />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
