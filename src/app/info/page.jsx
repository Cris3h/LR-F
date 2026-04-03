import Link from "next/link";

import InfoFaqSection from "@/components/InfoFaqSection";
import info from "@/utils/info.json";

import styles from "@/styles/infoPage.module.css";

export const metadata = {
  title: "Información",
  description:
    "Preguntas frecuentes sobre cáncer de mama: antecedentes, mamografías, síntomas y más.",
};

const page = () => {
  const breastCancerInfo = info;

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backLink}>
        <svg
          className={styles.backIcon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver al inicio
      </Link>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Preguntas frecuentes</p>
        <h1 className={styles.title}>Información</h1>
        <p className={styles.lede}>
          Respuestas breves para despejar dudas habituales. Siempre conviene
          consultar con un profesional de salud ante cualquier inquietud
          personal.
        </p>
      </header>
      <p className={styles.faqLabel}>Contenido</p>
      <InfoFaqSection items={breastCancerInfo} />
    </div>
  );
};

export default page;
