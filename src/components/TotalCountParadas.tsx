import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

interface TotalCountParadas {
  date: Dayjs | null;
  refresh: boolean;
}
export default function TotalCountParadas({ date, refresh } : TotalCountParadas) {

  useEffect(() => {
    if(refresh){
      console.log(date?.format('DD/MM/YYYY'));
    }
  }, [refresh]); // Sempre que search, recarrega

  return (
    <div style={{
      backgroundColor:'#df636f',
      minHeight: '110px',
      borderRadius:'10px',padding:'10px'
    }}>
      <h2>Total Parada:</h2>
      <span style={{fontSize:'24px'}}>999999999</span>
    </div>
  );
}
