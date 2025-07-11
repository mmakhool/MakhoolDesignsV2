import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { type ContactFormData } from '@makhool-designs/shared';

// API Client Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth tokens (future use)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token here if needed
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // localStorage.removeItem('authToken');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const contactApi = {
  submitContact: async (data: ContactFormData) => {
    const response = await apiClient.post('/api/contact', data);
    return response.data;
  },
};

// Future API endpoints can be added here
export const projectsApi = {
  getProjects: async () => {
    const response = await apiClient.get('/api/projects');
    return response.data;
  },
  getProject: async (id: string) => {
    const response = await apiClient.get(`/api/projects/${id}`);
    return response.data;
  },
};

export const reviewsApi = {
  getReviews: async () => {
    const response = await apiClient.get('/api/reviews');
    return response.data;
  },
};

export default apiClient;
