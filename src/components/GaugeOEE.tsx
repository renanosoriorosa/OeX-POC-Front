import React from 'react';
import { useEffect } from 'react';
import LoaderOverlay from './LoaderOverlay';
import { TipoGaugeOEE } from '@/app/api/Commom/TipoGaugeOee';
import { Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Grid from '@mui/material/Grid2';
import OEEService from '@/app/api/OEE/OEEService';

interface GaugeOEE {
  tipo: TipoGaugeOEE;
  refresh: boolean; 
  month: string;
  year: string;
  idMaquina: string;
}
export default function GaugeOEE({ tipo, month, year, idMaquina, refresh } : GaugeOEE) {
  const [valor, setValor] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  
  const getGaugeColor = (value: number):string => {
    if (value >= 80) return 'green'; // Acima de 80 → Verde
    if (value >= 50) return 'orange'; // Entre 50 e 79 → Laranja
    return 'red'; // Abaixo de 50 → Vermelho
  };

  const HandleRefreshComponent = async () => {
    setLoading(true);

    let result;

    switch (tipo) {
      case TipoGaugeOEE.OEE:
        result = await OEEService.GetOEEByMonth(month, year, idMaquina);
        break;
      case TipoGaugeOEE.DISPONIBILIDADE:
        result = await OEEService.GetDisponibilidadeByMonth(month, year, idMaquina);
        break;
    case TipoGaugeOEE.QUALIDADE:
        result = await OEEService.GetQualidadeByMonth(month, year, idMaquina);
        break;
      case TipoGaugeOEE.PERFORMANCE:
        result = await OEEService.GetPerformanceByMonth(month, year, idMaquina);
        break;
      default:
        console.error("TipoGaugeOEE inválido:", tipo);
        setLoading(false);
        return;
    }

    if(result.success){
        setValor(result.data ?? 0);
    }else{
      console.log(result.messages);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(refresh){
      HandleRefreshComponent();
    }
  }, [refresh]); // Sempre que search, recarrega

  const TITULO: Record<TipoGaugeOEE, string> = {
    [TipoGaugeOEE.OEE]: "OEE",
    [TipoGaugeOEE.QUALIDADE]: "QUALIDADE",
    [TipoGaugeOEE.DISPONIBILIDADE]: "DISPONIBILIDADE",
    [TipoGaugeOEE.PERFORMANCE]: "PERFORMANCE",
  };

  return (
    <LoaderOverlay loading={loading}>
        <Grid sx={{ 
              backgroundColor: 'white', 
              borderRadius: 3,
              display: 'flex', // Adiciona flexbox
              flexDirection: 'column',
              alignItems: 'center', // Centraliza verticalmente
              justifyContent: 'center', // Centraliza horizontalmente
              }}>
            <Typography variant="h6" style={{marginTop:'10px', fontWeight:'bold'}}>
                {TITULO[tipo] || "-"}
            </Typography>   
            <Gauge
                cornerRadius="50%"
                height={300}
                value={valor} // Valor do gauge
                startAngle={0}
                endAngle={360}
                innerRadius="80%"
                outerRadius="90%"
                sx={() => ({
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: getGaugeColor(valor),
                },
                })}
            />
        </Grid>
    </LoaderOverlay>
  );
}
