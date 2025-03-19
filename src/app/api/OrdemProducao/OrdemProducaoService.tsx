import { AxiosError } from "axios";
import dashApi from "../Commom/dashApi";

const OrdemProducaoService = {
    async GetCountByMonth(month : string, idMaquina: string): Promise<ApiResponse<number>> {
      try {
        const { data } = await dashApi.get<ApiResponse<number>>
                        ("/api/v1/OrdemProducao/GetCountTotalOS",
                            { params: { month, idMaquina } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<number>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: 0 };
      }
    }
  };
  
  export default OrdemProducaoService;