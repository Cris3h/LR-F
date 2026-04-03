import DonationCards from "@/components/DonationCards";
import { contact } from "@/utils/constants";

import styles from "@/styles/donacionesPage.module.css";

export const metadata = {
  title: "Donaciones | Listón Rosa",
  description:
    "Apoyá Listón Rosa: murales, concientización sobre el cáncer de mama y comunidad. Doná por Cafecito o Matecito o contactanos por correo.",
};

export default function DonacionesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Donaciones</h1>
        <p className={styles.intro}>
          Tu aporte ayuda a sostener murales, difusión y encuentros que visibilizan
          el cáncer de mama y a quienes lo atraviesan. Elegí la plataforma que prefieras;
          cada contribución suma.
        </p>
      </header>

      <section
        className={styles.cardsSection}
        aria-labelledby="donaciones-heading"
      >
        <h2 id="donaciones-heading" className={styles.visuallyHidden}>
          Opciones para donar
        </h2>
        <DonationCards />
      </section>

      <footer className={styles.contactFooter}>
        <p>
          Si preferís no usar estas plataformas, podés escribirnos por correo y
          coordinamos otra forma de apoyo.
        </p>
        <a
          href={`mailto:${contact.email}`}
          className={styles.contactLink}
        >
          {contact.email}
        </a>
      </footer>
    </div>
  );
}
