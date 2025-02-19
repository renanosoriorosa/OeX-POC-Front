"use client";

import { useState } from "react";
import { Container, Paper, Typography, Box, TextField, Button, Alert } from "@mui/material";
import Link from "next/link";
import Grid from  "@mui/material/Grid2";
import EmpresaService from "../api/Empresa/EmpresaService";
import ErrorListForm from "../../components/ErrorListForm";

export default function Cadastrar() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        cnpj: "",
        nomeUsuario: "",
        email: "",
        password: "",
        confirmPassword: "",
        tempoTrabalho:0
    });
    const [messageErrors, setMessageErrors] = useState<string[]>([]);
    const [messageSuccess, setmessageSuccess] = useState(false);
    const [errors, setErrors] = useState({
        nomeUsuario: false,
        nome: false,
        email: false,
        password: false,
        confirmPassword: false,
        cnpj: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false }); // Remove erro ao digitar
    };

    const resetForm = () => {
        setForm({
            nome: "",
            cnpj: "",
            nomeUsuario: "",
            email: "",
            password: "",
            confirmPassword: "",
            tempoTrabalho: 0
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setmessageSuccess(false);
        setMessageErrors([]);
        setLoading(true);
        // Validação simples
        const newErrors = {
            nome: form.nome.trim() === "",
            nomeUsuario: form.nomeUsuario.trim() === "",
            email: form.email.trim() === "",
            password: form.password.trim() === "",
            cnpj: form.cnpj.trim() === "",
            confirmPassword: form.confirmPassword.trim() === "" || form.password !== form.confirmPassword,
        };

        setErrors(newErrors);

        // Se não houver erros, processa o envio
        if (!Object.values(newErrors).includes(true)) {
            const result = await EmpresaService.CriarEmpresa(form);
            if(!result.success){
                setMessageErrors(result.messages ?? []);
            }else{
                setmessageSuccess(true);
                resetForm();
                setMessageErrors([]);
            }
            setLoading(false);
        }else{
            setLoading(false);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center min-vh-100"
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    maxWidth: 600,
                    width: "100%",
                    borderRadius: 3,
                    bgcolor: "white",
                }}>
                <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    align="center"
                    gutterBottom 
                    color="#59a68c">
                    Novo Cadastro
                </Typography>
                {messageSuccess && 
                    <Alert style={{marginTop:'15px', marginBottom: '15px'}} severity="success">
                        Cadastro realizado com sucesso!!
                    </Alert>
                }
                
                <ErrorListForm
                    errors={messageErrors} />
                <form onSubmit={handleSubmit}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12}}>
                                <TextField
                                    fullWidth
                                    label="Nome Empresa"
                                    name="nome"
                                    value={form.nome}
                                    onChange={handleChange}
                                    error={errors.nome}
                                    helperText={errors.nome ? "Campo obrigatório" : ""}
                                />
                            </Grid>

                            <Grid size={{ xs: 12}}>
                                <TextField
                                    fullWidth
                                    label="CNPJ"
                                    name="cnpj"
                                    value={form.cnpj}
                                    onChange={handleChange}
                                    error={errors.cnpj}
                                    helperText={errors.cnpj ? "Campo obrigatório" : ""}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6}}>
                                <TextField
                                    fullWidth
                                    label="Seu Nome"
                                    name="nomeUsuario"
                                    value={form.nomeUsuario}
                                    onChange={handleChange}
                                    error={errors.nomeUsuario}
                                    helperText={errors.nomeUsuario ? "Campo obrigatório" : ""}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6}}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    helperText={errors.email ? "Campo obrigatório" : ""}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6}}>
                                <TextField
                                    fullWidth
                                    label="Senha"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    helperText={errors.password ? "Campo obrigatório" : ""}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6}}>
                                <TextField
                                    fullWidth
                                    label="Confirmar Senha"
                                    name="confirmPassword"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                    helperText={errors.confirmPassword ? "Senhas não coincidem" : ""}
                                />
                            </Grid>

                            <Grid size={{ xs: 6, sm: 6}}>
                                <TextField
                                    fullWidth
                                    label="Tempo de Trabalho (Hrs)"
                                    name="tempoTrabalho"
                                    type="number"
                                    value={form.tempoTrabalho}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Link href="/login" passHref>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#000",
                                    "&:hover": { backgroundColor: "#444" },
                                }}
                            >
                                Voltar para Login
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            variant="contained"
                            loading={loading}
                            loadingPosition="start"
                            sx={{
                                backgroundColor: "#59a68c",
                                "&:hover": { backgroundColor: "#a6bf73" },
                            }}
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}
