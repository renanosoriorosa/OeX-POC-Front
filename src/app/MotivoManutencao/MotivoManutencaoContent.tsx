'use client'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

function MotivoManutencaoContent() {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());
  return <>
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
            value={startDate}
            label={'Mês e Ano'} 
            views={['month', 'year']} />
      </DemoContainer>
    </LocalizationProvider>
  </>;
}

export default MotivoManutencaoContent;
