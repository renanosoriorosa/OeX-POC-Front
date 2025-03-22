// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface QualidadeProducaoMensalResponse{
    totalBoas: number,
    totalRuins: number,
    totalPerdas: number,
    mes: string,
    
    [key: string]: string | number;
}