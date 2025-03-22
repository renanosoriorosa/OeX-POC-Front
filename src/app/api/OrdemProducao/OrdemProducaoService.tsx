import { AxiosError } from "axios";
import dashApi from "../Commom/dashApi";

const OrdemProducaoService = {
    async GetCountByMonth(month : string, year : string, idMaquina: string): Promise<ApiResponse<number>> {
      try {
        const { data } = await dashApi.get<ApiResponse<number>>
                        ("/api/v1/OrdemProducao/GetCountTotalOS",
                            { params: { month, year, idMaquina } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<number>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: 0 };
      }
    },
    async GetQualidadeProducaoMensal(year : string, idMaquina: string): Promise<ApiResponse<QualidadeProducaoMensalResponse[]>> {
      try {
        const { data } = await dashApi.get<ApiResponse<QualidadeProducaoMensalResponse[]>>
                        ("/api/v1/OrdemProducao/GetQualidadeProducaoMensal",
                            { params: { year, idMaquina } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<QualidadeProducaoMensalResponse[]>>;
        return axiosError.response?.data ?? 
                { success: false, 
                  messages: ["Erro ao obter dados, tenta novamente mais tarde"], 
                  data: [] };
      }
    }
  };
  
  export default OrdemProducaoService;