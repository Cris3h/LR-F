import Image from "next/image";
import Link from "next/link";

import cafecitoApp from "@/images/cafecitoApp.jpg";
import matecitoApp from "@/images/matecitoApp.png";
import { donationLinks } from "@/utils/constants";

import styles from "@/styles/donationCards.module.css";

const ARROW_SVG = (
  <svg
    className={styles.ctaArrow}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DONATION_ITEMS = [
  {
    id: "cafecito",
    href: donationLinks.cafecito,
    image: cafecitoApp,
    imageAlt: "Logo de Cafecito",
    title: "Cafecito",
    description:
      "Apoyá el proyecto con un aporte en la plataforma argentina Cafecito.",
    cta: "Donar con Cafecito",
    ariaLabel:
      "Donar a Listón Rosa mediante Cafecito, se abre en una pestaña nueva",
  },
  {
    id: "matecito",
    href: donationLinks.matecito,
    image: matecitoApp,
    imageAlt: "Logo de Matecito",
    title: "Matecito",
    description:
      "Usá este acceso por ahora; actualizaremos el enlace cuando la cuenta Matecito quede activa.",
    cta: "Donar con Matecito",
    ariaLabel:
      "Donar a Listón Rosa mediante Matecito, se abre en una pestaña nueva",
  },
];

function DonationCards() {
  return (
    <ul className={styles.grid}>
      {DONATION_ITEMS.map((item) => (
        <li key={item.id} className={styles.item}>
          <article className={styles.card}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              aria-label={item.ariaLabel}
            >
              <div className={styles.cardBody}>
                <div className={styles.iconWrap}>
                  <Image
                    src={item.image}
                    alt=""
                    width={64}
                    height={64}
                    className={styles.icon}
                    sizes="64px"
                  />
                </div>
                <div className={styles.textBlock}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <span className={styles.ctaRow}>
                    {item.cta}
                    {ARROW_SVG}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default DonationCards;
