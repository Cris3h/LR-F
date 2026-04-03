import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 35%)",
  // bgcolor: "background.paper",
  bgcolor: "#cf6ba1",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ArtModal({ backstage, title }) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: "center", color: "secondary.contrastText" }}
          >
            ¡No te pierdas el backstage!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ m: 3, color: "secondary.contrastText", textAlign: "center" }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <iframe
              width="inherit"
              height="315"
              src="https://www.youtube.com/embed/CObPyy6UsL0?si=Bcpw1Si_kJOrePEl"
              // src= { backstage }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      </Modal>
      <p>
      </p>
    </div>
  );
}

export default ArtModal;
