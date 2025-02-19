import { AxiosError } from "axios";
import authApi from "../Commom/authApi";


const EmpresaService = {
    async CriarEmpresa(dados: EmpresaRequest): Promise<ApiResponse<boolean>> {
      try {
        const { data } = await authApi.post<ApiResponse<boolean>>("/api/v1/empresa/Create", dados);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<boolean>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao salvar dados, tenta novamente mais tarde"], data: false };
      }
    }
  };
  
  export default EmpresaService;