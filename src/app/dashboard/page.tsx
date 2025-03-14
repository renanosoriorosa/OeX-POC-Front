'use client'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';
import  {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MaquinaService from "../api/Maquina/MaquinaServicew";
import React from "react";
import TotalCountOPs from '@/components/TotalCountOPs';
import Grid from '@mui/material/Grid2';
import TotalCountParadas from '@/components/TotalCountParadas';
import TotalCountManutencao from '@/components/TotalCountManutencao';

dayjs.locale('pt-br');

function Dashboard() {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());
  const [maquina, setMaquina] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const [maquinas, setMaquinas] = React.useState<SelectFiltroDto[]>([]);

  const handleSearch = () => {
    // Atualiza o refreshKey para forçar o TotalCount a recarregar
    setSearch(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMaquina(event.target.value);
  };

  const GetMaquinaList = async () => {
    const result = await MaquinaService.GetMaquinasFiltro();

    if(result.success){
      const data = result.data ?? [];
      const listaComTodos: SelectFiltroDto[] = [{ id: '0', value: 'TODOS' }, ...data];
      setMaquinas(listaComTodos);
      setMaquina(listaComTodos[0].id ?? '');
    }else{
      console.log(result.messages);
    }
  }

  React.useEffect(() => {
      GetMaquinaList();
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            sx={{input: { color: 'white' }, // Texto preto (pode trocar se quiser outra cor)
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Cor da borda se quiser customizar
              },
              '& .MuiSvgIcon-root': {
                color: 'white', // Ícone branco
                transition: 'color 0.3s', // Suavizar a transição
              },
              '& .MuiFormLabel-root':{
                color: 'white', // branco
                transition: 'color 0.3s',
              }
            }}
            label="Data Início"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format="DD/MM/YYYY"
          />
          <DatePicker
            sx={{
            input: { color: 'white' }, // Texto preto (pode trocar se quiser outra cor)
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Cor da borda se quiser customizar
            },
            '& .MuiSvgIcon-root': {
              color: 'white', // Ícone branco
              transition: 'color 0.3s', // Suavizar a transição
            },
            '& .MuiFormLabel-root':{
              color: 'white', // branco
              transition: 'color 0.3s',
            },
          }}
            label="Data Fim"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="DD/MM/YYYY"
          />
          <FormControl 
            sx={{ 
              minWidth: 120,
              color: 'white', // Cor do texto do Select
              '& .MuiInputLabel-root': {
                color: 'white', // Cor do rótulo
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Cor da borda
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Cor da borda no hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Cor da borda quando focado
                },
                '&.Mui-disabled fieldset': {
                  borderColor: 'gray', // Cor da borda quando desabilitado (opcional)
                },
              },}}>
            <InputLabel 
              id="demo-simple-select-label">
                Máquina
            </InputLabel>
            <Select
              sx={{
                color: 'white', // Cor do texto do Select
                '& .MuiInputLabel-root': {
                  color: 'white', // Cor do rótulo
                },
                '& .MuiSvgIcon-root': {
                  color: 'white', // Cor do ícone (seta)
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={maquina}
              label="Máquina"
              onChange={handleChange}
            >
              {maquinas.map((maquina) => (
                <MenuItem key={maquina.id} value={maquina.id}>
                  {maquina.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            sx={{
              color: 'white', 
              borderColor: 'white', 
              '&:hover': { 
                borderColor: 'white', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              }
            }}
            variant="outlined" 
            endIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Pesquisar
          </Button>
        </DemoContainer>
      </LocalizationProvider>
      <Box sx={{ flexGrow: 1, marginTop:'30px'}} >
        <Grid container spacing={2}>
          <Grid size={{md:2}}>
            <TotalCountOPs date={startDate} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountParadas date={startDate} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountManutencao date={startDate} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountOPs date={startDate} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountOPs date={startDate} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountOPs date={startDate} refresh={search} />
          </Grid>
        </Grid>
      </Box>
      
  </>
  );
}

export default Dashboard;
