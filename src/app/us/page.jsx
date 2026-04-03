import React from "react";
import boys from "@/images/boys.jpg";
import girls from "@/images/girls.jpg";
import Image from "next/image";
import recovery from "@/images/recovery.jpg"
import styles from "@/styles/us.module.css";

export const metadata = {
  title: "Quienes somos",
};
function page() {
  return (
    <div className={styles.mainContainer}>
      <section className={styles.storyTellingContainer}>
        <h2> Conocé quiénes están detrás </h2>
        <p>
          Somos un grupo de personas perteneciente a la facultad de XXXXX, que
          para la materia XXXXX tuvimos que crear e idear un gran proyecto que
          abarcara una problematica actual. De acá nacio no solamente Liston
          Rosa como lo conocemos, también nació una gran amistad entre el grupo
        </p>
      </section>

      <h3>El grupo: </h3>
      <div className={styles.members}>
        <div className={styles.membContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={boys}
              width={"auto"}
              height={"auto"}
              alt="foto integrantes liston rosa"
            />
          </div>
          <div className={styles.descripContainer}>
            <p className={styles.membName}>Juan P.</p>
            <ul>
              <li>Cantautor</li>
              <li>Filosofo</li>
              <li>musico</li>
              <li>Facha</li>
            </ul>
          </div>
        </div>

        <div className={styles.membContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={girls}
              width={"auto"}
              height={"auto"}
              className={styles.membImg}
              alt="foto integrantes liston rosa"
            />
          </div>
          <div className={styles.descripContainer}>
            <p className={styles.membName}>Hurberta L.</p>
            <ul>
              <li>Psicologa</li>
              <li>Lashista</li>
              <li>Modelo</li>
            </ul>
          </div>
        </div>

        <div className={styles.membContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={girls}
              width={"auto"}
              height={"auto"}
              className={styles.membImg}
              alt="foto integrantes liston rosa"
            />
          </div>
          <div className={styles.descripContainer}>
            <p className={styles.membName}>Zacarina I.</p>
            <ul>
              <li>Psicologa</li>
              <li>Lashista</li>
              <li>Modelo</li>
            </ul>
          </div>
        </div>

        <div className={styles.membContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={girls}
              width={"auto"}
              height={"auto"}
              className={styles.membImg}
              alt="foto integrantes liston rosa"
            />
          </div>
          <div className={styles.descripContainer}>
            <p className={styles.membName}>Koala Y.</p>
            <ul>
              <li>Psicologa</li>
              <li>Lashista</li>
              <li>Modelo</li>
            </ul>
          </div>
        </div>

        <div className={styles.membContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={girls}
              width={"auto"}
              height={"auto"}
              className={styles.membImg}
              alt="foto integrantes liston rosa"
            />
          </div>
          <div className={styles.descripContainer}>
            <p className={styles.membName}>Ruperta A.</p>
            <ul>
              <li>Psicologa</li>
              <li>Lashista</li>
              <li>Modelo</li>
            </ul>
          </div>
        </div>
      </div>
      <section className={styles.finalSection}>
        <aside>
          Nuestra misión es llegar a cada punto del país con un pedacito de arte
          que represente a todes los que esten pasando por un momento dificil
          con esta enfermedad que tanto nos aqueja, un cariño al alma, un abrazo
          al corazón.
        </aside>
        <div className={styles.muralImage}>
          <Image
            src={recovery}
            alt="mural generado AI"
            width={'auto'}
            height={'auto'}
          />
        </div>
        <aside>
          No dudes en mandarnos un e-mail contandonos tu historia, no dudes en
          contactarte con nosotres para que seamos el pulmón de tu lucha. Te
          queremos
        </aside>
      </section>
    </div>
  );
}

export default page;
