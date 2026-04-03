"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";

const CommentPost = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState({
    user: "",
    title: "",
    body: "",
  });

  const userName =
    status === "authenticated"
      ? session?.user?.name || session?.user?.email || "Usuario"
      : "Invitado";

  const handleOnChange = (e) => {
    setComment({
      ...comment,
      user: userName,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...comment, user: userName }),
        }
      );
      response.ok
        ? setTimeout(() => router.refresh(), 1000)
        : console.error("error: --> ", response.statusText);
    } catch (error) {
      console.error("solicitud: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ margin: "25px 0" }}>
      <Card>
        <CardContent>
          <Typography variant="h6">Comenta!</Typography>
          <TextField
            rows={1}
            fullWidth
            variant="outlined"
            label="Titulo"
            name="title"
            onChange={handleOnChange}
          />
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Tu comentario acá"
            name="body"
            onChange={handleOnChange}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentPost;
