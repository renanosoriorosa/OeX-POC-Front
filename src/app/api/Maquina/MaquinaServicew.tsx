import { AxiosError } from "axios";
import dashApi from "../Commom/dashApi";

const MaquinaService = {
    async GetMaquinasFiltro(): Promise<ApiResponse<SelectFiltroDto[]>> {
      try {
        const { data } = await dashApi.get<ApiResponse<SelectFiltroDto[]>>("/api/v1/maquina/GetParaSelectFiltro");
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<SelectFiltroDto[]>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao obter dados, tenta novamente mais tarde"], data: [] };
      }
    }
  };
  
  export default MaquinaService;