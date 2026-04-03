"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import MessageRounded from "@mui/icons-material/MessageRounded";

import { fetchSingleArtWork } from "@/utils/fetchs";
import ArtWork from "@/components/ArtWork";
import CommentPost from "@/components/CommentPost";
import CommentCard from "@/components/CommentCard";

import styles from "@/styles/artWorkPage.module.css";
import Loading from "@/components/Loading";
import { coalesceArtworkImages } from "@/utils/artworkImages";

const COMMENTS_HEADING_ID = "mural-comments-heading";

/** El API guarda `user` como name o email de la sesión (ver route de comments). */
function isCommentFromSession(commentUser, session) {
  if (!session?.user) return false;
  const cu = typeof commentUser === "string" ? commentUser.trim() : "";
  if (!cu) return false;
  const name = session.user.name?.trim() ?? "";
  const email = session.user.email?.trim() ?? "";
  return cu === name || cu === email;
}

/** Oculta comentarios sin título o sin texto (solo espacios cuentan como vacío). */
function isCommentNonEmpty(c) {
  const title = typeof c?.title === "string" ? c.title.trim() : "";
  const body = typeof c?.body === "string" ? c.body.trim() : "";
  return title.length > 0 && body.length > 0;
}

export default function Details() {
  const [details, setDetails] = useState(null);
  const [error, setErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { data: session } = useSession();

  const refetchArtwork = useCallback(async () => {
    const data = await fetchSingleArtWork(id);
    const [err, obj] = data;
    if (!err && obj) setDetails(obj);
  }, [id]);

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

  const comments = (
    Array.isArray(details.comments) ? details.comments : []
  ).filter(isCommentNonEmpty);
  const hasComments = comments.length > 0;

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

        <section
          className={styles.commentsBand}
          aria-labelledby={COMMENTS_HEADING_ID}
        >
          <div className={styles.commentsHeader}>
            <span className={styles.titleIconBox} aria-hidden>
              <MessageRounded className={styles.titleIcon} />
            </span>
            <div className={styles.commentsTitleBlock}>
              <h2 className={styles.commentsTitle} id={COMMENTS_HEADING_ID}>
                Comentarios
              </h2>
              <p className={styles.commentsLead}>
                Opiniones y reflexiones sobre este mural. Los comentarios son de
                la comunidad.
              </p>
            </div>
          </div>

          <div className={styles.commentsLayout}>
            <CommentPost onCommentPosted={refetchArtwork} />

            {hasComments ? (
              <ul className={styles.commentsList}>
                {comments.map((e, i) => (
                  <li key={e._id?.toString?.() ?? i}>
                    <CommentCard
                      commentId={e._id?.toString?.() ?? String(i)}
                      user={e.user}
                      title={e.title}
                      body={e.body}
                      picture={e.picture}
                      isMine={isCommentFromSession(e.user, session)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyComments} role="status">
                Todavía no hay comentarios. Sé el primero en contar qué te
                inspira esta obra.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
