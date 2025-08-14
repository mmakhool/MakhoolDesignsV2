import { type LoginData, type RegisterData } from '@makhool-designs/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { useAuth } from './useAuth';

// API Hook for login
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: () => {
      // Success handling is done in the AuthContext
      toast.success('Successfully logged in!');
      
      // Invalidate queries that might need fresh data
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message?: string })?.message || 'Login failed';
      toast.error(message);
    },
  });
};

// API Hook for registration
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const { register } = useAuth();
  
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: () => {
      // Success handling is done in the AuthContext
      toast.success('Account created successfully!');
      
      // Invalidate queries that might need fresh data
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message?: string })?.message || 'Registration failed';
      toast.error(message);
    },
  });
};

// API Hook for getting user profile
export const useProfileQuery = () => {
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => authApi.getProfile(),
    enabled: !!localStorage.getItem('auth_tokens'), // Only fetch if logged in
    retry: false, // Don't retry on auth failures
  });
};

// API Hook for refreshing token
export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.refreshToken(refreshToken),
    onSuccess: (response) => {
      // Update stored tokens
      const currentTokens = localStorage.getItem('auth_tokens');
      if (currentTokens) {
        const tokens = JSON.parse(currentTokens);
        localStorage.setItem('auth_tokens', JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: tokens.refreshToken,
        }));
      }
    },
    onError: () => {
      // Refresh failed, clear auth data and redirect
      localStorage.removeItem('auth_tokens');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    },
  });
};

// Utility hook to check if user is authenticated
export const useIsAuthenticated = () => {
  try {
    if (typeof window === 'undefined') return false; // SSR safety
    const tokens = localStorage.getItem('auth_tokens');
    return !!tokens;
  } catch {
    return false;
  }
};

// Utility hook to get current user
export const useCurrentUser = () => {
  try {
    if (typeof window === 'undefined') return null; // SSR safety
    const userData = localStorage.getItem('auth_user');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

// Logout utility
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_tokens');
        localStorage.removeItem('auth_user');
      }
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
};
