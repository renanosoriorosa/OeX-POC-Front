import ParadaService from '@/app/api/Parada/ParadaService';
import React from 'react';
import { useEffect } from 'react';
import LoaderOverlay from './LoaderOverlay';

interface TotalCountParadas {
  month: string;
  idMaquina: string;
  refresh: boolean;
}
export default function TotalCountParadas({ month, idMaquina, refresh } : TotalCountParadas) {
  const [count, setCount] = React.useState('-');
  const [loading, setLoading] = React.useState(false);

  const HandleRefreshComponent = async () => {
    setLoading(true);
    const result = await ParadaService.GetCountByMonth(month, idMaquina);

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
        backgroundColor:'#df636f',
        minHeight: '110px',
        borderRadius:'10px',padding:'10px'
      }}>
        <h2>Total Parada:</h2>
        <span style={{fontSize:'24px'}}>{count}</span>
      </div>
    </LoaderOverlay>
  );
}
