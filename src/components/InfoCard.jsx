"use client";

import styles from "@/styles/infoCard.module.css";

const Chevron = ({ open }) => (
  <svg
    className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoCard = ({
  id,
  q,
  a,
  accordionActive = false,
  isOpen = true,
  onToggle,
}) => {
  const headingId = `info-q-${id}`;
  const answerId = `info-a-${id}`;

  return (
    <article
      className={`${styles.card} ${accordionActive ? styles.cardAccordion : ""} ${
        accordionActive && isOpen ? styles.cardAccordionOpen : ""
      }`}
    >
      <div className={styles.inner}>
        {accordionActive ? (
          <h2 className={styles.accordionTitle} id={headingId}>
            <button
              type="button"
              className={styles.headerButton}
              onClick={onToggle}
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <span className={styles.badge} aria-hidden="true">
                {id}
              </span>
              <span className={styles.questionButtonText}>{q}</span>
              <Chevron open={isOpen} />
            </button>
          </h2>
        ) : (
          <header className={styles.header}>
            <span className={styles.badge} aria-hidden="true">
              {id}
            </span>
            <h2 id={headingId} className={styles.question}>
              {q}
            </h2>
          </header>
        )}

        <div
          id={answerId}
          role="region"
          aria-labelledby={headingId}
          hidden={accordionActive ? !isOpen : undefined}
          className={`${styles.answerRegion} ${accordionActive ? styles.answerRegionAccordion : ""}`}
        >
          <div className={styles.answerWrap}>
            <p className={styles.answer}>{a}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default InfoCard;
