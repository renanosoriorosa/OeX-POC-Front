import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRedirecting = false; // Variável para evitar múltiplos redirecionamentos

authApi.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!isRedirecting) {
        isRedirecting = true;
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
