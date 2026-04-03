import React from "react";
import Link from "next/link";

import styles from "../styles/card.module.css";

function formatPlace(place) {
  if (!place || typeof place !== "object") return "";
  const city = place.city?.toString?.().trim?.() ?? "";
  const state = place.state?.toString?.().trim?.() ?? "";
  if (city && state) return `${city}, ${state}`;
  return city || state;
}

function PinIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        fill="currentColor"
      />
    </svg>
  );
}

const CardList = ({ id, image, name, place, description }) => {
  const locationLine = formatPlace(place);

  return (
    <article className={styles.card}>
      <Link href={`/murales/${id}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          {image ? (
            // URLs dinámicas del backend; next/image implica remotePatterns por host
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden />
          )}
        </div>
        <div className={styles.body}>
          <h2 className={styles.cardTitle}>{name}</h2>
          {locationLine ? (
            <p className={styles.location}>
              <PinIcon className={styles.pin} />
              <span>{locationLine}</span>
            </p>
          ) : null}
          {description ? (
            <p className={styles.excerpt}>{description}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
};

export default CardList;
