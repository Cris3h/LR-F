"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

/** Mismo margen que antes, bloque centrado en el ancho disponible */
const sectionWrap = {
  margin: "25px 0",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const CommentPost = ({ onCommentPosted }) => {
  const { id } = useParams();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitError, setSubmitError] = useState(null);

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
      <div style={sectionWrap}>
        <Card sx={{ width: "100%" }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              py: 3,
            }}
          >
            <CircularProgress size={22} color="secondary" />
            <Typography variant="body2" color="text.secondary">
              Cargando sesión…
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div style={sectionWrap}>
        <Card sx={{ width: "100%" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Comentá
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Para sumar tu voz sobre este mural, iniciá sesión con Google.
            </Typography>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => signIn("google")}
            >
              Ingresar con Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div style={sectionWrap}>
      <Card component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Comentá
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1 }}>
            Comentando como {session?.user?.name || session?.user?.email}
          </Typography>
          {submitError ? (
            <Alert severity="error" sx={{ mb: 1 }}>
              {submitError}
            </Alert>
          ) : null}
          <TextField
            rows={1}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Título"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Tu comentario"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            disabled={isLoading}
            sx={{ mt: 1 }}
          >
            {isLoading ? "Enviando…" : "Enviar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentPost;
