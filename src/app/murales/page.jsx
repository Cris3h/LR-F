'use client'
import React, { useContext } from "react";
import { GlobalContext } from "@/AppContext/AppContext";
import CardList from "@/components/Card";
import Loading from "@/components/Loading";
import styles from '@/styles/murales.module.css'

export default function Murales() {
  const { artWork, isLoading } = useContext(GlobalContext);

  if (isLoading) {
    return (
      <div className={styles.loadingWrap}>
        <Loading />
      </div>
    );
  }

  const list = Array.isArray(artWork) ? artWork : [];
  const total = list.length;

  return (
    <div className={styles.listContainer}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Catálogo de obras</p>
        <h1 className={styles.headline}>Tenemos una historia para contarte</h1>
        <p className={styles.intro}>
          Cada mural en la vía pública es una persona y su relato: quien atraviesa
          el cáncer de mama o quien acompaña. Acá podés recorrer las historias antes
          de abrir la ficha completa o seguir el camino desde el mapa.
        </p>
        {total > 0 ? (
          <p className={styles.count}>
            <strong>{total}</strong>
            {total === 1 ? " mural" : " murales"}
            {" "}para explorar
          </p>
        ) : null}
        <hr className={styles.rule} aria-hidden />
      </header>

      {total === 0 ? (
        <div className={styles.emptyState}>
          <p>Todavía no hay murales cargados. Volvé pronto.</p>
        </div>
      ) : (
        <div className={styles.artworkContainer}>
          {list.map((a) => (
            <CardList
              key={a._id}
              id={a._id}
              image={a.image}
              name={a.name}
              place={a.place}
              description={a.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
