import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

interface TotalCountOPs {
  date: Dayjs | null;
  refresh: boolean;
}
export default function TotalCountOPs({ date, refresh } : TotalCountOPs) {

  useEffect(() => {
    if(refresh){
      console.log(date?.format('DD/MM/YYYY'));
    }
  }, [refresh]); // Sempre que search, recarrega

  return (
    <div style={{
      backgroundColor:'#a6eb72',
      minHeight: '110px',
      borderRadius:'10px',padding:'10px'
    }}>
      <h2>Total OS:</h2>
      <span style={{fontSize:'24px'}}>999999999</span>
    </div>
  );
}
