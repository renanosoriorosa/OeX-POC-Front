import axios from "axios";
import { getSession } from "next-auth/react";

const dashApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASH_API || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRedirecting = false; // Variável para evitar múltiplos redirecionamentos

// Interceptor para adicionar o token JWT a cada requisição
dashApi.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession(); // Obtém a sessão do NextAuth
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error("Erro ao obter token JWT:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

dashApi.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (!isRedirecting) {
        isRedirecting = true;
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default dashApi;
