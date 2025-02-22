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
    async GetUsuarios(pageSize:number, pageNumber:number )
        : Promise<ApiResponse<UsuarioGetListResponse>> {
      try {
        const { data } = await authApi
                              .get<ApiResponse<UsuarioGetListResponse>>(
                                "/api/v1/usuario/ListagemUsuarios",
                                { params: { pageSize, pageNumber } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<UsuarioGetListResponse>>;
        return axiosError.response?.data ?? 
                { success: false, 
                  messages: ["Erro ao obter dados, tenta novamente mais tarde"] };
      }
    },
    async DeletarUsuario(id: string): Promise<ApiResponse<boolean>> {
      try {
        const { data } = await authApi
                              .delete<ApiResponse<boolean>>("/api/v1/usuario/delete",
                                { params: { id } });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<boolean>>;
        return axiosError.response?.data ?? { success: false, messages: ["Erro ao salvar dados, tenta novamente mais tarde"], data: false };
      }
    },
  };
  
  export default UsuarioService;