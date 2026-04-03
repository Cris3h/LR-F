"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchSingleArtWork } from "@/utils/fetchs";
import ArtWork from "@/components/ArtWork";
import CommentPost from "@/components/CommentPost";
import CommentCard from "@/components/CommentCard";
import ArtModal from "@/components/ArtModal";

import styles from "@/styles/artWorkPage.module.css";

export default function Details() {
  const [details, setDetails] = useState({});
  const [error, setErrorState] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSingleArtWork(id);
      const [error, obj] = data;
      error ? setErrorState(true) : setDetails(obj);
    };
    fetchData();
  }, [id]);

  return (
    <div className="">

      {/* BackStage Modal*/}
      <ArtModal
        backstage={details.backstage ? details.backstage : undefined}
        title={details.name}
      />

      {/* Card */}
      <div className={styles.mainContainer}>
        <ArtWork
          id={details._id}
          comments={details.comments}
          description={details.description}
          image={details.image}
          name={details.name}
          place={details.place}
          coordinates={details.coordinates}
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
