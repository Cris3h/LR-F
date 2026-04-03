import React from "react";
import styles from "@/styles/donationCards.module.css";
import Image from "next/image";
import cafecitoApp from "@/images/cafecitoApp.jpg";
import matecitoApp from "@/images/matecitoApp.png";
import Link from "next/link";

function DonationCards() {
  return (
    <div className={styles.mainContainer}>


      <div className={styles.mediaContainer}>
        <Link
          href={"https://cafecito.app/listonrosa"}
          target="_blank"
          rel="noopener"
        >
          <div className={styles.imageCafecitoContainer}>
            <Image
              src={cafecitoApp}
              alt="cafecito app icon"
              width={'auto'}
              height={'auto'}
            />
            <p>Dona a Liston Rosa</p>
          </div>
        </Link>
      </div>

      <div className={styles.mediaContainer}>
        <Link
          href={"https://cafecito.app/listonrosa"}
          target="_blank"
          rel="noopener"
        >
          {/* <Link href={'https://www.matecito.co/ .... '} > */}{" "}
          {/* fix account later */}
          <div className={styles.imageContainer}>
            <Image
              src={matecitoApp}
              alt="matecito app icon"
              width={'auto'}
              height={'auto'}
            />
           <p>Dona a Liston Rosa</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DonationCards;
