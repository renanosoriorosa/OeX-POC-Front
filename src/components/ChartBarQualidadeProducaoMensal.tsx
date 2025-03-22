import OrdemProducaoService from '@/app/api/OrdemProducao/OrdemProducaoService';
import React, { useEffect } from 'react';
import LoaderOverlay from './LoaderOverlay';
import Grid from '@mui/material/Grid2';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

interface TotalCountOPs {
  year: string;
  idMaquina: string;
  refresh: boolean;
}
export default function ChartBarQualidadeProducaoMensal({ idMaquina, year, refresh } : TotalCountOPs) {
  const [data, setData] = React.useState<QualidadeProducaoMensalResponse[]>([]);
  const [loading, setLoading] = React.useState(false);

  const HandleRefreshComponent = async () => {
    setLoading(true);
    const result = await OrdemProducaoService.GetQualidadeProducaoMensal(year, idMaquina);

    if(result.success){
        setData(result.data ?? []);
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

  const valueFormatter = (value: number | null) => {
    return `${value} qtd.`;
  }

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
                Qualidade produção mensal
            </Typography>
            <BarChart
                dataset={data ?? []}
                yAxis= {[
                {
                    label: 'Quantidade',
                },
                ]}
                xAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'mes' 
                    }]}
                series={[
                { dataKey: 'totalBoas', label: 'Prod. Boa', color:'green', valueFormatter },
                { dataKey: 'totalRuins', label: 'Prod. Ruim', color:'orange', valueFormatter},
                { dataKey: 'totalPerdas', label: 'Perdas', color:'red', valueFormatter },
                ]}
                height={300}
                bottomAxis={{
                tickLabelStyle: {
                    angle: 20,
                    textAnchor: 'start',
                    fontSize: 12,
                },
                }}
            />
        </Grid>
    </LoaderOverlay>
  );
}
