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
import CardMTTR from '@/components/CardMTTR';
import GaugeOEE from '@/components/GaugeOEE';
import { TipoGaugeOEE } from '../api/Commom/TipoGaugeOee';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import ErrorListForm from '@/components/ErrorListForm';
import ChartBarQualidadeProducaoMensal from '@/components/ChartBarQualidadeProducaoMensal';

dayjs.locale('pt-br');

function DashboardContent() {
  const [mesAno, setMesAno] = React.useState<Dayjs | null>(dayjs());
  const [mes, setMes] = React.useState('');
  const [ano, setAno] = React.useState('');
  const [maquina, setMaquina] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const [maquinas, setMaquinas] = React.useState<SelectFiltroDto[]>([]);
  const [messageErrorsCreate, setMessageErrorsCreate] = React.useState<string[]>([]);

  const handleSearch = () => {
    if (
      mes === '' || 
      mes == 'Invalid Date' ||
      ano == 'Invalid Date' ||
      ano === '' ) {
      setMessageErrorsCreate(["Informe um mês e ano válido."]);
    } else {
      setMessageErrorsCreate([]);
      setSearch(true);
      
      setTimeout(() => {
        setSearch(false);
      }, 1000);
    }
  };

  const handleChangeMes = (filtro: Dayjs | null) => {
    setMes(filtro?.format("MM") ?? '');
    setAno(filtro?.format("YYYY") ?? '');
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMaquina(event.target.value);
  };

  const GetMaquinaList = async () => {
    const result = await MaquinaService.GetMaquinasFiltro();

    if(result.success){
      const data = result.data ?? [];
      const listaComTodos: SelectFiltroDto[] = [{ id: '-1', value: 'TODOS' }, ...data];
      setMaquinas(listaComTodos);
      setMaquina(listaComTodos[0].id ?? '');
    }else{
      console.log(result.messages);
    }
  }

  React.useEffect(() => {
      GetMaquinaList();
      setMesAno(dayjs());
      handleChangeMes(dayjs());
  }, []);
  
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
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
            value={mesAno}
            onChange={(newValue) => handleChangeMes(newValue)}
            label={'Mês e Ano'} 
            views={['month', 'year']} />
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
      <ErrorListForm errors={messageErrorsCreate} />
      <Box sx={{ flexGrow: 1, marginTop:'30px'}} >
        <Grid container spacing={2}>
          <Grid size={{md:2}}>
            <TotalCountOPs month={mes} year={ano} idMaquina={maquina} refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountParadas 
              month={mes} 
              year={ano} 
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <TotalCountManutencao 
              month={mes} 
              year={ano} 
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
            <CardMTTR 
              month={mes} 
              year={ano} 
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
          <Grid size={{md:2}}>
          </Grid>
          <Grid size={{md:2}}>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop:'30px'}} >
        <Grid container spacing={2}>
          <Grid size={{md:3}}>
            <GaugeOEE 
              tipo={TipoGaugeOEE.OEE} 
              month={mes} 
              year={ano} 
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
          <Grid size={{md:3}}>
            <GaugeOEE 
              tipo={TipoGaugeOEE.QUALIDADE} 
              month={mes} 
              year={ano}
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
          <Grid size={{md:3}}>
            <GaugeOEE 
              tipo={TipoGaugeOEE.DISPONIBILIDADE} 
              month={mes} 
              year={ano}
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
          <Grid size={{md:3}}>
            <GaugeOEE 
              tipo={TipoGaugeOEE.PERFORMANCE} 
              month={mes} 
              year={ano}
              idMaquina={maquina} 
              refresh={search} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop:'30px'}} >
        <Grid container spacing={2}>
          <Grid size={{md:6}}>
            <ChartBarQualidadeProducaoMensal 
              year={ano}
              idMaquina={maquina} 
              refresh={search}
            />
          </Grid>
          <Grid size={{md:6}}>
              
          </Grid>
        </Grid>
      </Box>
  </>
  );
}

export default DashboardContent;
