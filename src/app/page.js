import Link from "next/link";
import Image from "next/image";
import BChomeImg from "../images/BChomeImg.jpg";
import Sponsors from "@/components/Sponsors";
import styles from "../styles/page.module.css";

export const metadata = {
  title: "Inicio",
  description:
    "Murales con historias sobre el cáncer de mama. Mapa interactivo, QR en la calle y relatos de quienes atraviesan o acompañan la enfermedad.",
};

export default function Home() {
  return (
    <div className={styles.homeMain}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroImageWrap}>
          <Image
            src={BChomeImg}
            alt="Ilustración Listón Rosa"
            width={1200}
            height={800}
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Arte urbano · historias reales</p>
          <h1 id="home-title" className={styles.heroTitle}>
            Listón Rosa
          </h1>
          <p className={styles.heroSubtitle}>
            Cada mural es una persona y su historia: quien vive el cáncer de
            mama o quien acompaña a alguien que lo atraviesa. El mapa te muestra
            dónde están; el QR en la calle te lleva al relato completo.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/mapar" className={styles.btnPrimary}>
              Ver el mapa
            </Link>
            <Link href="/murales" className={styles.btnSecondary}>
              Explorar murales
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.qrStrip} aria-label="Cómo conecta el proyecto">
        <p className={styles.qrStripText}>
          <strong>Calles y pantalla.</strong> Intervenimos la vía pública con
          arte que nombra lo que a menudo se silencia. Escaneá el QR del mural y
          conocé la historia detrás de cada obra.
        </p>
      </section>

      <section
        className={styles.briefing}
        aria-labelledby="por-que-titulo"
      >
        <h2 id="por-que-titulo" className={styles.sectionTitle}>
          Lo que muchas veces no se nombra
        </h2>
        <p className={styles.briefingBody}>
          El cáncer de mama es una enfermedad que sucede con mayor frecuencia en
          mujeres de más de 50 años. Hoy sigue siendo un tabú en nuestra
          sociedad: la enfermedad que se oculta y no se nombra. Listón Rosa
          acompaña, desmitifica y visibiliza — con murales y con relatos que se
          abren desde el muro.
        </p>
      </section>

      <aside className={styles.pullQuote} aria-label="Cita">
        <blockquote className={styles.quoteText}>
          <p>
            &ldquo;Este proyecto es un abrazo a todas ellas y a nosotras
            mismas.&rdquo;
          </p>
        </blockquote>
      </aside>

      <section className={styles.story} aria-labelledby="historia-titulo">
        <h2 id="historia-titulo" className={styles.sectionTitle}>
          El proyecto
        </h2>
        <div className={styles.prose}>
          <p>
            Listón Rosa es un proyecto de concientización sobre el cáncer de
            mama. Buscamos intervenir la vía pública, hablando de aquello
            importante pero que es un tabú en nuestra sociedad, contando sobre la
            enfermedad que se oculta y no se nombra. Nuestro objetivo es generar
            un recorrido que se convierte en un viaje para descubrir la historia
            de una persona que está pasando por esta enfermedad. Esa historia
            busca representar a todas las mujeres que están pasando por esta
            situación, a quienes perdieron a una amiga, una madre, una abuela,
            una hermana, una tía y a quienes todavía no se animan a hacerse un
            chequeo.
          </p>
          <p>
            La visión para Listón Rosa es crecer como canal de difusión en todo
            el país, contar con el apoyo de grandes corporaciones para que la
            información se pueda difundir lo más fácil posible. Aportar a la
            investigación y a la enfermedad en sí, y que sea un proyecto en el
            cual cada persona pueda aportar.
          </p>
        </div>
      </section>

      <aside className={styles.pullQuoteAlt} aria-label="Cita">
        <blockquote className={styles.quoteTextAlt}>
          <p>
            &ldquo;Pero es un tabú en nuestra sociedad. La enfermedad que se
            oculta y no se nombra.&rdquo;
          </p>
        </blockquote>
      </aside>

      <section className={styles.pillars} aria-labelledby="pilares-titulo">
        <h2 id="pilares-titulo" className={styles.sectionTitle}>
          Cómo recorrer Listón Rosa
        </h2>
        <ul className={styles.pillarGrid}>
          <li>
            <Link href="/mapar" className={styles.pillarCard}>
              <span className={styles.pillarKicker}>Eje principal</span>
              <span className={styles.pillarTitle}>Mapa interactivo</span>
              <span className={styles.pillarDesc}>
                Ubicá murales y descubrí las historias georreferenciadas.
              </span>
            </Link>
          </li>
          <li>
            <Link href="/murales" className={styles.pillarCard}>
              <span className={styles.pillarKicker}>Historias</span>
              <span className={styles.pillarTitle}>Murales y relatos</span>
              <span className={styles.pillarDesc}>
                Cada obra enlaza con una persona y su experiencia.
              </span>
            </Link>
          </li>
          <li>
            <Link href="/info" className={styles.pillarCard}>
              <span className={styles.pillarKicker}>Información</span>
              <span className={styles.pillarTitle}>Cáncer de mama</span>
              <span className={styles.pillarDesc}>
                Material para desmitificar y cuidarte. No reemplaza la consulta
                médica.
              </span>
            </Link>
          </li>
          <li>
            <Link href="/donaciones" className={styles.pillarCard}>
              <span className={styles.pillarKicker}>Sumate</span>
              <span className={styles.pillarTitle}>Donaciones</span>
              <span className={styles.pillarDesc}>
                Apoyá la difusión y el crecimiento del proyecto.
              </span>
            </Link>
          </li>
        </ul>
      </section>

      <section className={styles.engage} aria-labelledby="engage-title">
        <h2 id="engage-title" className={styles.engageTitle}>
          Empezá por el mapa o por las historias
        </h2>
        <p className={styles.engageText}>
          El corazón de la app es georeferenciar murales y abrir cada relato.
          Elegí por dónde entrar: explorá el mapa o recorré la galería de obras.
        </p>
        <div className={styles.engageCtas}>
          <Link href="/mapar" className={styles.btnPrimary}>
            Abrir mapa
          </Link>
          <Link href="/murales" className={styles.btnGhost}>
            Ver murales
          </Link>
        </div>
      </section>

      <p className={styles.disclaimer}>
        El contenido informativo de este sitio no sustituye el diagnóstico ni el
        consejo de un equipo de salud. Ante cualquier duda, consultá a tu médica
        o médico.
      </p>

      <section className={styles.support} aria-labelledby="sponsors-title">
        <h2 id="sponsors-title" className={styles.supportHeading}>
          Nos acompañan en la difusión
        </h2>
        <Sponsors />
      </section>
    </div>
  );
}
