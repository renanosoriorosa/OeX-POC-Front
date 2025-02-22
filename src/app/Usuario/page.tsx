"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Box, Button, Drawer, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import UsuarioService from '../api/Usuario/UsuarioService';
import LoaderOverlay from '@/components/LoaderOverlay';
import Grid from  "@mui/material/Grid2";
import ErrorListForm from '@/components/ErrorListForm';

interface Column {
  id: 'id' | 'nome' | 'email' ;
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'nome', label: 'Nome', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState<UsuarioDto[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openModalCreate, setOpenModalCreate] = React.useState(false);
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
        }
      setLoadingCreate(false);
    }else{
      setLoadingCreate(false);
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    GetUsersList();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    GetUsersList();
  };

  const handleButtonClick = (name : string) => {
    console.log(name);
  }

  const toogleModalCreate = (open : boolean) => {
    resetFormCreate();
    setOpenModalCreate(open);
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
                onClick={() => toogleModalCreate(false)}
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

  const GetUsersList = async () => {
    setLoading(true);
    const result = await UsuarioService.GetUsuarios(rowsPerPage, page);

    if(result.success){
      setUsers(result.data?.usuarios ?? []);
      setTotalCount(result.data?.totalCount ?? 0);
    }else{
      console.log(result.messages);
    }
    setLoading(false);
  }

  useEffect(() => {
    GetUsersList();
  }, []);
  
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button 
          onClick={() => toogleModalCreate(true)}
          sx={{
            color: 'white', 
            borderColor: 'white', 
            '&:hover': { 
              borderColor: 'white', 
              backgroundColor: 'rgba(255, 255, 255, 0.1)' 
            }
          }}
          variant="outlined" 
          endIcon={<AddIcon />}
        >
          Novo Usuário
        </Button>
      </Box>
      <Paper sx={{ width: '100%' }}>
        <LoaderOverlay loading={loading}>
        <TableContainer>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                    key='delete'
                    align='center'
                    style={{ top: 57, }}
                  >
                    Deletar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align='center'>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell key='delete' align='center'>
                            <IconButton 
                              color='error'
                              onClick={() => handleButtonClick(row.nome)}>
                              <DeleteIcon />
                            </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </LoaderOverlay>
      </Paper>
      <Drawer open={openModalCreate} anchor='right'>
        {ModalCreate}
      </Drawer>
    </>
  );
}