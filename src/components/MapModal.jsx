"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { fetchSingleArtWork } from "@/utils/fetchs";
import Image from "next/image";
import Link from "next/link";
import popupStyles from "@/styles/mapPopupContent.module.css";
import modalStyles from "@/styles/mapModal.module.css";
import { primaryArtworkImage } from "@/utils/artworkImages";

export default function MapModal({ id, details: initialDetails }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(initialDetails);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (initialDetails) return;
    if (!id) return;
    const fetchData = async () => {
      const data = await fetchSingleArtWork(id);
      const [fetchError, obj] = data;
      fetchError ? setDetails(null) : setDetails(obj);
    };
    fetchData();
  }, [id, initialDetails]);

  const max_length = 115;
  const detailsCutter = (str) => {
    if (str == null || str === "") return "";
    return str.length > max_length
      ? str.slice(0, max_length - 1) + "..."
      : str;
  };

  const placeLine = [details?.place?.city, details?.place?.state]
    .filter(Boolean)
    .join(" · ");

  const descriptionPreview = detailsCutter(details?.description);
  const previewImage = primaryArtworkImage(details);

  return details ? (
    <div>
      <div className={popupStyles.card}>
        <span className={popupStyles.accent} aria-hidden />
        <h3 className={popupStyles.title}>
          {details.name ? details.name : "Sin título"}
        </h3>
        {placeLine ? (
          <p className={popupStyles.meta}>{placeLine}</p>
        ) : null}
        <button
          type="button"
          className={popupStyles.cta}
          onClick={handleOpen}
        >
          Ver detalle
          <span className={popupStyles.ctaIcon} aria-hidden>
            →
          </span>
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        scroll="paper"
        aria-labelledby="map-mural-dialog-title"
        aria-describedby="map-mural-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(180deg, #fffefb 0%, #fff8fb 100%)",
            border: "1px solid rgba(251, 132, 171, 0.35)",
            boxShadow: "0 8px 40px rgba(120, 82, 92, 0.12)",
            m: { xs: 1, sm: 2 },
            maxHeight: { xs: "calc(100% - 16px)", sm: "90vh" },
          },
        }}
      >
        <DialogTitle
          id="map-mural-dialog-title"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            pr: 1,
            pt: 2.5,
            pb: 1.5,
            borderBottom: "1px solid rgba(251, 132, 171, 0.22)",
          }}
        >
          <Typography
            component="span"
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "rgb(90, 52, 62)",
              lineHeight: 1.35,
              pr: 1,
            }}
          >
            {details.name ? details.name : "Sin título"}
          </Typography>
          <IconButton
            aria-label="Cerrar"
            onClick={handleClose}
            size="small"
            sx={{ color: "rgb(120, 82, 92)", mt: -0.5 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            borderColor: "rgba(251, 132, 171, 0.15)",
            px: 3,
            py: 2.5,
          }}
        >
          {previewImage ? (
            <div className={modalStyles.imageWrap}>
              <Image
                src={previewImage}
                alt={details.name ? `Mural: ${details.name}` : "Mural"}
                fill
                sizes="(max-width: 600px) 100vw, 504px"
                className={modalStyles.image}
                unoptimized
              />
            </div>
          ) : null}

          <Typography
            id="map-mural-dialog-description"
            component="p"
            className={modalStyles.description}
          >
            {descriptionPreview
              ? descriptionPreview
              : "No hay descripción disponible."}
          </Typography>

          {(details.place?.city || details.place?.state) && (
            <ul className={modalStyles.placeRow}>
              {details.place?.city ? (
                <li className={modalStyles.placeItem}>
                  <span className={modalStyles.placeLabel}>Ciudad</span>
                  {details.place.city}
                </li>
              ) : null}
              {details.place?.state ? (
                <li className={modalStyles.placeItem}>
                  <span className={modalStyles.placeLabel}>Provincia</span>
                  {details.place.state}
                </li>
              ) : null}
            </ul>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
            pt: 2,
            borderTop: "1px solid rgba(251, 132, 171, 0.15)",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            className={modalStyles.secondaryBtn}
            sx={{
              borderColor: "rgba(251, 132, 171, 0.45)",
              "&:hover": {
                borderColor: "rgba(251, 132, 171, 0.7)",
                bgcolor: "rgba(255, 240, 248, 0.5)",
              },
            }}
          >
            Cerrar
          </Button>
          <Button
            component={Link}
            href={`/murales/${id}`}
            variant="contained"
            onClick={handleClose}
            sx={{
              bgcolor: "rgb(193, 136, 145)",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "rgb(210, 155, 168)",
                boxShadow: "0 2px 8px rgba(193, 136, 145, 0.35)",
              },
            }}
          >
            Ver mural completo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : undefined;
}
