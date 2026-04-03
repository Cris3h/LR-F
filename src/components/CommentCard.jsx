import Image from "next/image";
import { CardActionArea } from "@mui/material";
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
        boxShadow: "1px 2px 3px purple",
        overflowY: "auto",
      }}
    >
      <CardActionArea>
        <div className={styles.commentHeader}>
          <Image src={btnB} alt="user avatar" className={styles.btnb} />
          <p>{user}</p>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
