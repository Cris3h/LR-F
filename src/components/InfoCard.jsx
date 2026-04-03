import styles from "@/styles/infoCard.module.css";

const InfoCard = ({ id, q, a }) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.title}>
        <em>{q}</em>
      </div>
      <div className={styles.body}>
        <p>{a}</p>
      </div>
    </div>
  );
};

export default InfoCard;
