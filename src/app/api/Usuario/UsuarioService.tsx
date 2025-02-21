import { AxiosError } from "axios";
import authApi from "../Commom/authApi";


const UsuarioService = {
    async CriarUsuario(dados: UsuarioCreateRequest): Promise<ApiResponse<boolean>> {
      try {
        const { data } = await authApi.post<ApiResponse<boolean>>("/api/v1/usuario/Create", dados);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<boolean>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao salvar dados, tenta novamente mais tarde"], data: false };
      }
    },
    async GetUsuarios(pageSize:number, pageNumber:number ): Promise<ApiResponse<UsuarioDto[]>> {
      try {
        const { data } = await authApi
                              .get<ApiResponse<UsuarioDto[]>>(
                                "/api/v1/usuario/ListagemUsuarios",
                                { params: { pageSize, pageNumber } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<UsuarioDto[]>>;
        return axiosError.response?.data ?? 
                { success: false, 
                  messages: ["Erro ao obter dados, tenta novamente mais tarde"], 
                  data: [] };
      }
    }
  };
  
  export default UsuarioService;