'use client'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/pt-br';
import  {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MaquinaService from "../api/Maquina/MaquinaServicew";
import React from "react";
import TotalCountOPs from '@/components/TotalCountOPs';
import Grid from '@mui/material/Grid2';
import TotalCountParadas from '@/components/TotalCountParadas';
import TotalCountManutencao from '@/components/TotalCountManutencao';

function DashboardContent() {
  const [mes, setMes] = React.useState('');
  const [maquina, setMaquina] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const [maquinas, setMaquinas] = React.useState<SelectFiltroDto[]>([]);

  const handleSearch = () => {
    // Atualiza o refreshKey para forçar o TotalCount a recarregar
    setSearch(true);

    setTimeout(() => {
      setSearch(false);
    }, 1000);
  };

  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
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
      setMes('1');
  }, []);

  return (
    <>
      <DemoContainer components={['DatePicker']}>
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
                Mês
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
              value={mes}
              onChange={handleChangeMes}
              label="Mês"
            >
              <MenuItem key={1} value={1}>Janeiro</MenuItem>
              <MenuItem key={2} value={2}>Fevereiro</MenuItem>
              <MenuItem key={3} value={3}>Março</MenuItem>
              <MenuItem key={4} value={4}>Abril</MenuItem>
              <MenuItem key={5} value={5}>Maio</MenuItem>
              <MenuItem key={6} value={6}>Junho</MenuItem>
              <MenuItem key={7} value={7}>Julho</MenuItem>
              <MenuItem key={8} value={8}>Agosto</MenuItem>
              <MenuItem key={9} value={9}>Setembro</MenuItem>
              <MenuItem key={10} value={10}>Outubro</MenuItem>
              <MenuItem key={11} value={11}>Novembro</MenuItem>
              <MenuItem key={12} value={12}>Dezembro</MenuItem>
            </Select>
        </FormControl>
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
      <Box sx={{ flexGrow: 1, marginTop:'30px'}} >
        <Grid container spacing={2}>
          <Grid size={{md:2}}>
            <TotalCountOPs month={mes} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            {/* <TotalCountParadas date={} refresh={search} /> */}
          </Grid>
          <Grid size={{md:2}}>
            {/* <TotalCountManutencao date={} refresh={search} /> */}
          </Grid>
          <Grid size={{md:2}}>
          </Grid>
          <Grid size={{md:2}}>
          </Grid>
          <Grid size={{md:2}}>
          </Grid>
        </Grid>
      </Box>
      
  </>
  );
}

export default DashboardContent;
