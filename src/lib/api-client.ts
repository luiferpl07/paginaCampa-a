// src/lib/api-client.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

// Definición de interfaces para errores y respuestas
interface ApiErrorResponse {
  message: string;
  error?: string;
}

// Tipo genérico para las respuestas
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface FileUploadResponse {
  success: boolean;
  message: string;
  url?: string;
  file?: {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
  };
  files?: Array<{
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    url: string;
  }>;
}

// Determine base URL based on environment
const getBaseUrl = () => {
  // En producción, utiliza la URL de la API en producción
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://1nwkr97b-3001.use2.devtunnels.ms';
  }
  // En desarrollo, usa localhost con el puerto adecuado
  return 'http://localhost:3001';
};

// Crear instancia axios con configuración base
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante: permite enviar/recibir cookies
});

// Función para extraer el mensaje de error
const extractErrorMessage = (error: any): string => {
  if (axios.isAxiosError(error)) {
    // Intentamos acceder a la respuesta del error si existe
    const errorData = error.response?.data as ApiErrorResponse | undefined;
    return errorData?.message || error.message || 'Error desconocido';
  }
  
  // Si no es un error de Axios, intentamos convertirlo a string
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Error desconocido';
};

// Interceptor para manejar errores de forma consistente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Si el error es 401 (no autorizado), podríamos redirigir al login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/dashboard/login';
      }
    }
    
    return Promise.reject({
      data: null,
      error: extractErrorMessage(error),
    });
  }
);

// Función para realizar peticiones GET
async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    // Asegúrate de que el endpoint tenga el prefijo '/api'
    const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.get(apiEndpoint);
    return { data: response.data };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
}

// Función para realizar peticiones POST
async function post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
  try {
    const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.post(apiEndpoint, data);
    return { data: response.data };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
}

// Función para realizar peticiones PUT
async function put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
  try {
    const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.put(apiEndpoint, data);
    return { data: response.data };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
}

// Función para realizar peticiones DELETE
async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.delete(apiEndpoint);
    return { data: response.data };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
}

// Función para subir un archivo
async function uploadFile(file: File): Promise<ApiResponse<FileUploadResponse>> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Usar la nueva ruta simplificada
    const response = await axios.post(`${getBaseUrl()}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    
    return { data: response.data };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
}

// Función para subir múltiples archivos
async function uploadMultipleFiles(files: File[]): Promise<ApiResponse<FileUploadResponse>> {
  try {
    const formData = new FormData();
    
    // Añadir cada archivo al FormData
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    // Usar la nueva ruta simplificada con un parámetro para indicar que es multiple
    const response = await axios.post(`${getBaseUrl()}/api/upload?multiple=true`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    
    return { data: response.data };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
}

// Exportamos un objeto con todos los métodos
const apiClient = {
  get,
  post,
  put,
  delete: del,
  uploadFile,
  uploadMultipleFiles
};

// Exportamos como default y también exportamos cada función por separado
export { get, post, put, del as delete, uploadFile, uploadMultipleFiles };
export default apiClient;