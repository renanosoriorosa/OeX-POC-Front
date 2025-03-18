import { useEffect } from 'react';

interface TotalCountOPs {
  month: string;
  refresh: boolean;
}
export default function TotalCountOPs({ month, refresh } : TotalCountOPs) {

  useEffect(() => {
    if(refresh){
      console.log(month);
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
