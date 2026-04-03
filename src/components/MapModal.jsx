"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ArtWork from "./ArtWork";
import { fetchSingleArtWork } from "@/utils/fetchs";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 35%)",
  height: "auto",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 100,
  p: 4,
};

export default function MapModal({ id, details: initialDetails }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(initialDetails);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (initialDetails) return;
    if (!id) return;
    const fetchData = async () => {
      const data = await fetchSingleArtWork(id);
      const [fetchError, obj] = data;
      fetchError ? setError(true) : setDetails(obj);
    };
    fetchData();
  }, [id, initialDetails]);


  const max_length = 115;
  const detailsCutter = (str) => {
    return str?.length > max_length
      ? str.slice(0, max_length - 1) + "..."
      : str;
  };

  return details ? (
    <div>
      <Button onClick={handleOpen} style={{display:'flex' , flexDirection: 'row'}}>
        {details.name ? details.name : "missing art title"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Link href={`/murales/${id}`}>
          <Box sx={style}>
            <ArtWork
              id={details._id}
              comments={details.comments}
              description={detailsCutter(details.description)}
              name={details.name}
              place={details.place}
              coordinates={details.coordinates}
            />
          </Box>
        </Link>
      </Modal>
    </div>
  ) : undefined;
}

