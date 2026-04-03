import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import btnB from "../images/btnB.png";

import styles from "../styles/commentCard.module.css";

export default function CommentCard({ user, title, body }) {
  return (
    <Card
      sx={{
        minHeight: 200,
        maxWidth: 550,
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflowY: "auto",
      }}
    >
      <div className={styles.commentHeader}>
        <Image src={btnB} alt="user avatar" className={styles.btnb} />
        <p>{user}</p>
      </div>
      <CardContent sx={{ pt: 2, px: 2, pb: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
