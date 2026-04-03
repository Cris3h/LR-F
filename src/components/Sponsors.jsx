"use client";
import React from "react";
import Image from "next/image";

import always from "@/images/brands/always.png";
import chanel from "@/images/brands/chanel.png";
import dove from "@/images/brands/dove.png";
import johnsons from "@/images/brands/johnsons.png";
import kotex from "@/images/brands/kotex.png";
import loreal from "@/images/brands/loreal.png";
import mac from "@/images/brands/mac.png";
import maybelline from "@/images/brands/maybelline.png";
import rexona from "@/images/brands/rexona.png";
import vichy from "@/images/brands/vichy.png";

import styles from "@/styles/sponsors.module.css";

const brands = [
  { src: always, name: "Always" },
  { src: chanel, name: "Chanel" },
  { src: dove, name: "Dove" },
  { src: johnsons, name: "Johnson's" },
  { src: kotex, name: "Kotex" },
  { src: loreal, name: "L'Oréal" },
  { src: mac, name: "MAC" },
  { src: maybelline, name: "Maybelline" },
  { src: rexona, name: "Rexona" },
  { src: vichy, name: "Vichy" },
];

function Sponsors() {
  return (
    <div className={styles.sponsorsContainer}>
      {brands.map(({ src, name }) => (
        <div key={name} className={styles.sponsorCell}>
          <Image
            src={src}
            alt={`Logo ${name}`}
            width={160}
            height={80}
            className={styles.sponsorImg}
            sizes="(max-width: 600px) 33vw, 140px"
          />
        </div>
      ))}
    </div>
  );
}

export default Sponsors;
