import Carousel from "./Carousel";
import { MdLocationOn } from "react-icons/md";

import { toEmbedUrl } from "@/utils/embedUrl";
import styles from "../styles/artwork.module.css";

const ArtWork = ({ images, name, place, description, videoUrl }) => {
  const embedSrc = videoUrl ? toEmbedUrl(videoUrl) : null;
  const locationLine = [place?.city, place?.state].filter(Boolean).join(", ");
  const slides = Array.isArray(images) ? images.filter(Boolean) : [];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imgContainer}>
        {slides.length > 0 && (
          <Carousel
            image={slides}
            alt={name ? `Mural: ${name}` : "Mural"}
            className={styles.carouselHero}
          />
        )}
      </div>

      <div className={styles.artworkCont}>
        <h1 className={styles.title}>{name}</h1>
        {locationLine ? (
          <div className={styles.location}>
            <MdLocationOn aria-hidden />
            <span>{locationLine}</span>
          </div>
        ) : null}
        <p className={styles.description}>{description}</p>

        {embedSrc ? (
          <section className={styles.backstage}>
            <h4>Cómo nació esta obra</h4>
            <div className={styles.videoWrapper}>
              <iframe
                src={embedSrc}
                title="Backstage del mural"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.iframe}
              />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default ArtWork;
