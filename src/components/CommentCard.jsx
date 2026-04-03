import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import btnB from "../images/btnB.png";

import styles from "../styles/commentCard.module.css";

export default function CommentCard({ user, title, body, picture }) {
  const showGoogleAvatar = Boolean(
    picture && typeof picture === "string" && picture.startsWith("http")
  );

  return (
    <Card
      sx={{
        maxWidth: 550,
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div className={styles.commentHeader}>
        {showGoogleAvatar ? (
          <Image
            src={picture}
            alt=""
            width={40}
            height={40}
            className={styles.avatar}
          />
        ) : (
          <Image
            src={btnB}
            alt=""
            width={40}
            height={40}
            className={styles.btnb}
          />
        )}
        <div className={styles.authorBlock}>
          <p className={styles.authorName}>{user}</p>
          <span className={styles.authorHint}>Comunidad Listón Rosa</span>
        </div>
      </div>
      <CardContent sx={{ pt: 1.5, px: 2, pb: 2 }}>
        <Typography gutterBottom variant="h5" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
