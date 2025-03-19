import OrdemProducaoService from '@/app/api/OrdemProducao/OrdemProducaoService';
import React, { useEffect } from 'react';
import LoaderOverlay from './LoaderOverlay';

interface TotalCountOPs {
  month: string;
  idMaquina: string;
  refresh: boolean;
}
export default function TotalCountOPs({ month, idMaquina, refresh } : TotalCountOPs) {
  const [count, setCount] = React.useState('-');
  const [loading, setLoading] = React.useState(false);

  const HandleRefreshComponent = async (month : string) => {
    setLoading(true);
    const result = await OrdemProducaoService.GetCountByMonth(month, idMaquina);

    if(result.success){
      setCount(result.data?.toString() ?? "-");
    }else{
      console.log(result.messages);
    }
    setLoading(false);
  } 

  useEffect(() => {
    if(refresh){
      HandleRefreshComponent(month);
    }
  }, [refresh]); // Sempre que search, recarrega

  return (
    <LoaderOverlay loading={loading}>
      <div style={{
        backgroundColor:'#a6eb72',
        minHeight: '110px',
        borderRadius:'10px',padding:'10px'
      }}>
        <h2>Total OS:</h2>
        <span style={{fontSize:'24px'}}>{count}</span>
      </div>
    </LoaderOverlay>
  );
}
