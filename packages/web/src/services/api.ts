import { type AuthResponse, type ContactFormData, type LoginData, type RegisterData } from '@makhool-designs/shared';
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// API Client Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token here if needed
    const storedTokens = localStorage.getItem('auth_tokens');
    if (storedTokens) {
      try {
        const tokens = JSON.parse(storedTokens);
        if (tokens.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
      } catch {
        // Invalid token data, ignore
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - redirect to login or refresh token
      const storedTokens = localStorage.getItem('auth_tokens');
      if (storedTokens) {
        // Clear invalid tokens
        localStorage.removeItem('auth_tokens');
        localStorage.removeItem('auth_user');
        // Redirect to login
        window.location.href = '/login';
      }
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

// Authentication API
export const authApi = {
  login: async (data: LoginData) => {
    const response = await apiClient.post('/api/auth/login', data);
    return response.data as AuthResponse;
  },
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data as AuthResponse;
  },
  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post('/api/auth/refresh', { refreshToken });
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get('/api/auth/profile');
    return response.data;
  },
};

export default apiClient;
