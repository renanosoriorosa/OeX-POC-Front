import { AxiosError } from "axios";
import dashApi from "../Commom/dashApi";

const OEEService = {
    async GetOEEByMonth(month : string, year : string, idMaquina: string): Promise<ApiResponse<number>> {
      try {
        const { data } = await dashApi.get<ApiResponse<number>>
                        ("/api/v1/OEE/GetOEEByMonth",
                            { params: { month, year, idMaquina } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<number>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: 0 };
      }
    },
    async GetDisponibilidadeByMonth(month : string, year : string, idMaquina: string): Promise<ApiResponse<number>> {
        try {
          const { data } = await dashApi.get<ApiResponse<number>>
                          ("/api/v1/OEE/GetDisponibilidadeByMonth",
                              { params: { month, year, idMaquina } });
          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse<number>>;
          return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: 0 };
        }
      },
      async GetQualidadeByMonth(month : string, year : string, idMaquina: string): Promise<ApiResponse<number>> {
        try {
          const { data } = await dashApi.get<ApiResponse<number>>
                          ("/api/v1/OEE/GetQualidadeByMonth",
                              { params: { month, year, idMaquina } });
          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse<number>>;
          return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: 0 };
        }
      },
      async GetPerformanceByMonth(month : string, year : string, idMaquina: string): Promise<ApiResponse<number>> {
        try {
          const { data } = await dashApi.get<ApiResponse<number>>
                          ("/api/v1/OEE/GetPerformanceByMonth",
                              { params: { month, year, idMaquina } });
          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse<number>>;
          return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: 0 };
        }
      }
  };
  
  export default OEEService;