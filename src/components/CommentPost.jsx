"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Alert, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";

import formStyles from "@/styles/commentsForm.module.css";

const CommentPost = ({ onCommentPosted }) => {
  const { id } = useParams();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "authenticated" || !session?.user) return;

    const t = title.trim();
    const b = body.trim();
    if (!t || !b) {
      setSubmitError("Completá el título y el comentario.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/murales/${encodeURIComponent(id)}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: t, body: b }),
      });

      if (!response.ok) {
        let msg =
          "No pudimos publicar el comentario. Intentá de nuevo más tarde.";
        try {
          const errJson = await response.json();
          if (response.status === 401) {
            msg =
              "Tu sesión expiró o no estás conectado. Volvé a iniciar sesión.";
          } else if (typeof errJson?.message === "string") {
            msg = errJson.message;
          }
        } catch {
          if (response.status === 401) {
            msg =
              "Tu sesión expiró o no estás conectado. Volvé a iniciar sesión.";
          }
        }
        setSubmitError(msg);
        return;
      }

      setTitle("");
      setBody("");
      setSuccessOpen(true);
      await onCommentPosted?.();
    } catch (err) {
      console.error("comment post:", err);
      setSubmitError(
        "No pudimos publicar el comentario. Intentá de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className={formStyles.formRoot}>
        <div className={formStyles.formPanel}>
          <div className={formStyles.loadingInner}>
            <CircularProgress size={24} color="secondary" />
            <Typography variant="body2" color="text.secondary">
              Cargando sesión…
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className={formStyles.formRoot}>
        <div className={formStyles.formPanel}>
          <div className={formStyles.loginInner}>
            <p className={formStyles.loginTitle}>Participá en la conversación</p>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Para sumar tu voz sobre este mural, iniciá sesión con Google.
            </Typography>
            <button
              type="button"
              className={formStyles.loginBtn}
              onClick={() => signIn("google")}
            >
              Ingresar con Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={formStyles.formRoot}>
      <Snackbar
        open={successOpen}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setSuccessOpen(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Se publicó tu comentario.
        </Alert>
      </Snackbar>
      <form className={formStyles.formPanel} onSubmit={handleSubmit} noValidate>
        <p className={formStyles.formTitle}>Dejá tu comentario</p>
        <p className={formStyles.formHint}>
          Comentando como {session?.user?.name || session?.user?.email}
        </p>
        {submitError ? (
          <Alert severity="error" className={formStyles.alertBox}>
            {submitError}
          </Alert>
        ) : null}
        <TextField
          className={formStyles.field}
          rows={1}
          fullWidth
          margin="none"
          variant="outlined"
          label="Título"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <TextField
          className={formStyles.field}
          multiline
          rows={4}
          fullWidth
          margin="none"
          variant="outlined"
          label="Tu comentario"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isLoading}
        />
        <div className={formStyles.formActions}>
          <button
            type="submit"
            className={formStyles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Publicando…" : "Publicar comentario"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentPost;
