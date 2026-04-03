import Carousel from "./Carousel";

import styles from "../styles/artwork.module.css";

const ArtWork = ({ image, name, place, description }) => {

  return (
    <div className={styles.mainContainer}>

      <div className={styles.imgContainer}>
        {
          image && <Carousel image={image}/>
        }
      </div>

      <div className={styles.artworkCont}>

        <h3>{name}</h3>
        <article>{description}</article>
        <p>provincia: {place?.state}</p>
        <p>ciudad: {place?.city}</p>

      </div>
    </div>
  );
};
export default ArtWork;
