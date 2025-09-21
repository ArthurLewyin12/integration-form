import axios from "axios";

// Configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur simple pour les logs en développement
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log(` ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log(
        ` ${response.config.method?.toUpperCase()} ${response.config.url}`,
      );
      return response;
    },
    (error) => {
      console.error(
        ` ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.message,
      );
      return Promise.reject(error);
    },
  );
}

// Fonctions utilitaires simples
export const request = {
  get: async <T>(url: string): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
  },
};

// Helper pour créer des clés de cache TanStack Query
export const createQueryKey = (...parts: (string | number)[]): string[] => {
  return parts.map((part) => String(part));
};
