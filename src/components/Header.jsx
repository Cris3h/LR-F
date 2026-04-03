import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import ImgListonRosa from "../images/ImgListonRosa.png";

import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Navbar />
      </nav>
      <div className={styles.titleContainer}>
        <Image
          src={ImgListonRosa}
          alt="Liston Rosa logo"
          width={280}
          height={120}
          style={{ width: "auto", height: "auto", maxWidth: "100%" }}
          priority
        />
      </div>
    </header>
  );
}
