import ManutencaoService from '@/app/api/Manutencao/ManutencaoService';
import React from 'react';
import { useEffect } from 'react';
import LoaderOverlay from './LoaderOverlay';

interface TotalCountManutencao {
  month: string;
  year: string;
  idMaquina: string;
  refresh: boolean;
}
export default function TotalCountManutencao({ month, year, idMaquina, refresh } : TotalCountManutencao) {
  const [count, setCount] = React.useState('-');
  const [loading, setLoading] = React.useState(false);
  
  const HandleRefreshComponent = async () => {
    setLoading(true);
    const result = await ManutencaoService.GetCountByMonth(month, year, idMaquina);

    if(result.success){
      setCount(result.data?.toString() ?? "-");
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

  return (
    <LoaderOverlay loading={loading}>
      <div style={{
        backgroundColor:'#63abdf',
        minHeight: '110px',
        borderRadius:'10px',padding:'10px'
      }}>
        <h2>Total Manutenção:</h2>
        <span style={{fontSize:'24px'}}>{count}</span>
      </div>
    </LoaderOverlay>
  );
}
