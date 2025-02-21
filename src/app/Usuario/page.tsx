"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "firstName", headerName: "First name", flex: 1, },
  { field: "lastName", headerName: "Last name",flex: 1,},
  {
    field: "age",
    headerName: "Age",
    type: "number",
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "edit",
    headerName: "Editar",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
        <IconButton color="primary" 
            aria-label="add to shopping cart"
            onClick={() => handleButtonClick(params.row.id)}>
            <EditIcon />
        </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "Deletar",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
        <IconButton color="error" 
            aria-label="add to shopping cart"
            onClick={() => handleButtonClick(params.row.id)}>
            <DeleteIcon />
        </IconButton>
    ),
  },
];

const handleButtonClick = (row: number) => {
  console.log("Clicou em:", row);
};

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Usuario() {
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
      });
    
      const handlePaginationChange = (newPagination: GridPaginationModel) => {
        console.log("Nova página:", newPagination.page);
        console.log("Novo pageSize:", newPagination.pageSize);
        setPaginationModel(newPagination);
      };

  return (
    <>
        <Button 
             sx={{
                mb: 2, 
                color: 'white', 
                borderColor: 'white', 
                '&:hover': { 
                    borderColor: 'white', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                }
            }}
            variant="outlined" 
            endIcon={<AddIcon />}>
            Novo Usuário
        </Button>
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                onPaginationModelChange={handlePaginationChange} // Captura evento de troca de página e pageSize
                pageSizeOptions={[5, 10, 20]}
                sx={{ border: 0 }}
            />
        </Paper>
    </>
  );
}
