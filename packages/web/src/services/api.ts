import { type ContactFormData, type LoginData, type RegisterData, type CreateRoleData, type UpdateRoleData } from '@makhool-designs/shared';
import axios, { type AxiosError, type AxiosResponse } from 'axios';

// API Client Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Important: sends cookies with requests
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // If we get 401, redirect to login (cookies are handled automatically)
    if (error.response?.status === 401) {
      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
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
    return response.data; // Returns { user, message } - tokens are in HTTP-only cookies
  },
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data; // Returns { user, message } - tokens are in HTTP-only cookies
  },
  refreshToken: async () => {
    const response = await apiClient.post('/api/auth/refresh');
    return response.data; // Returns { message } - new tokens are in HTTP-only cookies
  },
  getProfile: async () => {
    const response = await apiClient.get('/api/auth/profile');
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post('/api/auth/logout');
    return response.data;
  },
};

// Users API
export const usersApi = {
  getAllUsers: async () => {
    const response = await apiClient.get('/api/users');
    return response.data;
  },
  getUser: async (id: string) => {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: async (userData: any) => {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: async (id: string, userData: any) => {
    const response = await apiClient.put(`/api/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  },
  toggleUserActive: async (id: string) => {
    const response = await apiClient.put(`/api/users/${id}/toggle-active`);
    return response.data;
  },
  updateUserRole: async (userId: string, roleId: string) => {
    const response = await apiClient.put(`/api/users/${userId}/role`, { roleId });
    return response.data;
  },
};

// Roles API
export const rolesApi = {
  getAllRoles: async () => {
    const response = await apiClient.get('/api/roles');
    return response.data;
  },
  getActiveRoles: async () => {
    const response = await apiClient.get('/api/roles/active');
    return response.data;
  },
  createRole: async (data: CreateRoleData) => {
    const response = await apiClient.post('/api/roles', data);
    return response.data;
  },
  updateRole: async (id: string, data: UpdateRoleData) => {
    const response = await apiClient.put(`/api/roles/${id}`, data);
    return response.data;
  },
  deleteRole: async (id: string) => {
    const response = await apiClient.delete(`/api/roles/${id}`);
    return response.data;
  },
};

// Permissions API
export const permissionsApi = {
  getAllPermissions: async () => {
    const response = await apiClient.get('/api/permissions');
    return response.data;
  },
};

export default apiClient;
