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
import { Alert, AlertTitle, Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import UsuarioService from '../api/Usuario/UsuarioService';
import LoaderOverlay from '@/components/LoaderOverlay';
import UsuarioCreate from '@/components/Usuario/UsuarioCreate';
import UsuarioDelete from '@/components/Usuario/UsuarioDelete';

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

  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const [idUserDelete, setIdUserDelete] = React.useState(String);
  const [openDeletedSuccess, setOpenDeletedSuccess] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserCreated = () => {
    GetUsersList();
  }

  const handleUserDeleted = () => {
    setOpenDeletedSuccess(true);
    setTimeout(() => setOpenDeletedSuccess(false), 5000);
  }

  const handleDeleteUser = (id : string) => {
    setIdUserDelete(id);
    setOpenModalDelete(true);
  }

  const toogleModalCreate = (open : boolean) => {
    setOpenModalCreate(open);
  }

  const GetUsersList = async () => {
    setLoading(true);
    console.log('page ' +page);
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
  
  useEffect(() => {
    GetUsersList();
  }, [rowsPerPage, page]);
  
  useEffect(() => {
    if (openDeletedSuccess) {
      GetUsersList();
    }
  }, [openDeletedSuccess]);

  return (
    <>
      {openDeletedSuccess && (
        <Alert severity="success" sx={{ mt: 2, marginBottom:'10px' }}>
          <AlertTitle>Sucesso!</AlertTitle>
          Item deletado com sucesso
        </Alert>
      )}
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
                              onClick={() => handleDeleteUser(row.id)}>
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
      <UsuarioCreate 
        open={openModalCreate} 
        setIsOpen={setOpenModalCreate} 
        setCreated={handleUserCreated} />
      <UsuarioDelete 
        open={openModalDelete} 
        setIsOpen={setOpenModalDelete} 
        setDeleted={handleUserDeleted}
        id={idUserDelete} />
    </>
  );
}