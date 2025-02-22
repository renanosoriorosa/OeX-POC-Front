import UsuarioService from "@/app/api/Usuario/UsuarioService";
import { Alert, Box, Button, Drawer, TextField, Typography } from "@mui/material";
import React from "react";
import ErrorListForm from "../ErrorListForm";
import Grid from  "@mui/material/Grid2";

interface UsuarioCreateProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;

  setCreated: (created : boolean) => void;
}

export default function UsuarioCreate({ open, setIsOpen, setCreated  }: UsuarioCreateProps) {
    const [loadingCreate, setLoadingCreate] = React.useState(false);
    const [messageErrorsCreate, setMessageErrorsCreate] = React.useState<string[]>([]);
    const [messageSuccessCreate, setMessageSuccessCreate] = React.useState(false);

    const [formCreate, setformCreate] = React.useState({
        nome: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
  
    const [errorsCreate, setErrorsCreate] = React.useState({
        nome: false,
        email: false,
        password: false,
        confirmPassword: false
    });
  
    const resetFormCreate = () => {
      setformCreate({
          nome: "",
          email: "",
          password: "",
          confirmPassword: ""
      });
    };
  
    const handleChangeCrate = (e: React.ChangeEvent<HTMLInputElement>) => {
      setformCreate({ ...formCreate, [e.target.name]: e.target.value });
      setErrorsCreate({ ...errorsCreate, [e.target.name]: false }); // Remove erro ao digitar
    };

    const handleSubmitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingCreate(true);
        const newErrors = {
          nome: formCreate.nome.trim() === "",
          email: formCreate.email.trim() === "",
          password: formCreate.password.trim() === "",
          confirmPassword: formCreate.confirmPassword.trim() === "" || formCreate.password !== formCreate.confirmPassword,
        };
    
        setErrorsCreate(newErrors);
    
        // Se não houver erros, processa o envio
        if (!Object.values(newErrors).includes(true)) {
            const result = await UsuarioService.CriarUsuario(formCreate);
            if(!result.success){
                setMessageErrorsCreate(result.messages ?? []);
            }else{
                setMessageSuccessCreate(true);
                resetFormCreate();
                setMessageErrorsCreate([]);
                setCreated(true);
            }
          setLoadingCreate(false);
        }else{
          setLoadingCreate(false);
        }
    }

    const ModalCreate = (
        <Box sx={{ width: 500, padding:'15px' }} role="presentation">
          <Typography 
              sx={{
                marginTop:'100px'
              }}
              variant="h5" 
              fontWeight="bold" 
              align="center"
              gutterBottom 
              color="#59a68c">
              Novo Cadastro
          </Typography>
          {messageSuccessCreate && 
              <Alert style={{marginTop:'15px', marginBottom: '15px'}} severity="success">
                  Cadastro realizado com sucesso!!
              </Alert>
          }
          <ErrorListForm errors={messageErrorsCreate} />
          <form onSubmit={handleSubmitCreate}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12}}>
                <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formCreate.nome}
                    onChange={handleChangeCrate}
                    error={errorsCreate.nome}
                    helperText={errorsCreate.nome ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid size={{ xs: 12}}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formCreate.email}
                    onChange={handleChangeCrate}
                    error={errorsCreate.email}
                    helperText={errorsCreate.email ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6}}>
                    <TextField
                        fullWidth
                        label="Senha"
                        name="password"
                        type="password"
                        value={formCreate.password}
                        onChange={handleChangeCrate}
                        error={errorsCreate.password}
                        helperText={errorsCreate.password ? "Campo obrigatório" : ""}
                    />
                </Grid>
    
                <Grid size={{ xs: 12, sm: 6}}>
                    <TextField
                        fullWidth
                        label="Confirmar Senha"
                        name="confirmPassword"
                        type="password"
                        value={formCreate.confirmPassword}
                        onChange={handleChangeCrate}
                        error={errorsCreate.confirmPassword}
                        helperText={errorsCreate.confirmPassword ? "Senhas não coincidem" : ""}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, marginTop: 2 }}>
                <Button
                    onClick={() => setIsOpen(false)}
                    fullWidth
                    sx={{
                      color: 'red', 
                      borderColor: 'red', 
                      '&:hover': { 
                        color:'#fff',
                        backgroundColor: 'red',
                        borderColor: 'rgba(138, 2, 2, 0.1)' 
                      }
                    }}
                    variant="outlined">
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="outlined"
                    loading={loadingCreate}
                    loadingPosition="start"
                    fullWidth
                    sx={{
                      color: 'green', 
                      borderColor: 'green', 
                      '&:hover': { 
                        color:'#fff',
                        backgroundColor: 'green',
                        borderColor: 'green' 
                      }
                    }}
                >
                    Salvar
                </Button>
              </Box>
            </form>
        </Box>
    );

    return (
        <>
            <Drawer open={open} anchor='right'>
                {ModalCreate}
            </Drawer>
        </>
    );
}