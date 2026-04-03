import React, { useState } from "react";
import { images } from "@/utils";
import Image from "next/image";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import styles from "@/styles/carousel.module.css";

const Carousel = () => {
  const [slide, setSlide] = useState(0)

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1)
  }
  const previousSlide = () => {
    setSlide(slide === 0 ? images.length -1 : slide - 1)
  }

  return (
    <div className={styles.carousel}>
      <BsArrowLeftCircleFill
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={previousSlide}
      />
      {images.map((obj, i) => (
        <Image
          src={obj.src}
          width={600}
          height={400}
          alt={obj.alt}
          key={i}
          className={slide === i ? styles.slide : `${styles.slide} ${styles.slideHidden}`}
        />
      ))}
      <BsArrowRightCircleFill
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={nextSlide}
      />
      <span className={styles.indicators}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} className={slide === i ? styles.indicator : `${styles.indicator} ${styles.indicatorInactive}`}></button>
        ))}
      </span>
    </div>
  );
};

export default Carousel;
