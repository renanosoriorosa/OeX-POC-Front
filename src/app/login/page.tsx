"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("Usuário ou senha inválidos!");
      setLoading(false);
    } else {
      router.push("/Dashboard");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100"
      sx={{
        background: "linear-gradient(135deg, #339999)",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#59a68c">
          Bem-Vindo ao OeX
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#a6bf73" },
                  "&:hover fieldset": { borderColor: "#80b380" },
                  "&.Mui-focused fieldset": { borderColor: "#59a68c" },
                },
              }}
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#a6bf73" },
                  "&:hover fieldset": { borderColor: "#80b380" },
                  "&.Mui-focused fieldset": { borderColor: "#59a68c" },
                },
              }}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              loading={loading}
              loadingPosition="start"
              fullWidth
              sx={{
                backgroundColor: "#59a68c",
                "&:hover": { backgroundColor: "#339999" },
              }}
            >
              Entrar
            </Button>
            <Link href="/Cadastrar" passHref>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#999" },
                }}
              >
                Cadastrar-se
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
