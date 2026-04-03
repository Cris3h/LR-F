import React from "react";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import styles from "../styles/card.module.css";


const CardList = ({ id, image, name, place, description }) => {
  return (
    <div className={styles.mainContainer}>
      <Link href={`/murales/${id}`} className={styles.cardLink}>
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 400 },
            width: "100%",
            mx: "auto",
          }}
        >
          <CardMedia
            sx={{ height: { xs: 160, sm: 180 } }}
            image={image}
            title={name || "Mural"}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              maxHeight={"75px"}
              overflow-y={"hidden"}
            >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
export default CardList;
