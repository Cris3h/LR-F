"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchSingleArtWork } from "@/utils/fetchs";
import ArtWork from "@/components/ArtWork";
import CommentPost from "@/components/CommentPost";
import CommentCard from "@/components/CommentCard";

import styles from "@/styles/artWorkPage.module.css";
import Loading from "@/components/Loading";
import { coalesceArtworkImages } from "@/utils/artworkImages";

export default function Details() {
  const [details, setDetails] = useState(null);
  const [error, setErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSingleArtWork(id);
      const [error, obj] = data;
      error ? setErrorState(true) : setDetails(obj);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p>No pudimos cargar esta obra. Intentá de nuevo más tarde.</p>;
  return (
    <div className="">
      <div className={styles.mainContainer}>
        <ArtWork
          description={details.description}
          images={coalesceArtworkImages(details)}
          name={details.name}
          place={details.place}
          videoUrl={details?.backstage ?? null}
        />

        <div className={styles.artWorkComments}>
          <div className={styles.commentPost}>
            <CommentPost />
          </div>

          <div className={styles.commentsListContainer}>
            {details.comments?.map((e, i) => (
              <section key={e._id?.toString?.() ?? i}>
                <CommentCard user={e.user} title={e.title} body={e.body} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
