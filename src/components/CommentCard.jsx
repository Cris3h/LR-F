import Image from "next/image";

import btnB from "../images/btnB.png";

import styles from "../styles/commentCard.module.css";

export default function CommentCard({
  user,
  title,
  body,
  picture,
  commentId,
  isMine = false,
}) {
  const showGoogleAvatar = Boolean(
    picture && typeof picture === "string" && picture.startsWith("http")
  );

  const titleHeadingId = commentId
    ? `comment-title-${commentId}`
    : undefined;

  return (
    <article
      className={`${styles.commentCard} ${isMine ? styles.commentCardMine : ""}`}
      aria-labelledby={titleHeadingId}
      data-comment-own={isMine ? "true" : undefined}
    >
      <header
        className={`${styles.commentHeader} ${isMine ? styles.commentHeaderMine : ""}`}
      >
        <div
          className={`${styles.avatarWrap} ${isMine ? styles.avatarWrapMine : ""}`}
        >
          {showGoogleAvatar ? (
            <Image
              src={picture}
              alt={user ? `Foto de perfil de ${user}` : ""}
              width={48}
              height={48}
              className={styles.avatar}
            />
          ) : (
            <Image
              src={btnB}
              alt=""
              width={48}
              height={48}
              className={styles.btnb}
            />
          )}
        </div>
        <div className={styles.authorBlock}>
          <p className={styles.authorName}>{user}</p>
          <span className={styles.authorHint}>
            {isMine ? (
              <>
                <span className={styles.mineBadge}>Tu comentario</span>
                <span className={styles.authorHintSep}> · </span>
              </>
            ) : null}
            Comunidad Listón Rosa
          </span>
        </div>
      </header>
      <div className={styles.commentBody}>
        <h3 className={styles.commentTitle} id={titleHeadingId}>
          {title}
        </h3>
        <p className={styles.commentText}>
          <span className={styles.typoQuote} aria-hidden="true">
            &#8220;
          </span>
          {body}
          <span
            className={`${styles.typoQuote} ${styles.typoQuoteEnd}`}
            aria-hidden="true"
          >
            &#8221;
          </span>
        </p>
      </div>
    </article>
  );
}
