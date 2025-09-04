import { type LoginData, type RegisterData, type User } from '@makhool-designs/shared';
import React, { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { AuthContext } from './auth-context';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to prevent premature redirects
  error: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const authRestoredRef = useRef(false); // Prevent multiple restoration attempts

  // Check authentication status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Prevent multiple restoration attempts
      if (authRestoredRef.current) {
        console.log('🔒 Auth check already attempted, skipping...');
        return;
      }
      
      authRestoredRef.current = true;
      console.log('🔄 Checking authentication status...');
      dispatch({ type: 'AUTH_START' });
      
      try {
        // Try to get user profile - if cookies are valid, this will succeed
        const user = await authApi.getProfile();
        console.log('✅ User authenticated, cookies valid');
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user },
        });
      } catch {
        console.log('👤 User not authenticated or cookies expired');
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.login(data);
      console.log('✅ Login successful, cookies set');
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.register(data);
      console.log('✅ Registration successful, cookies set');
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call backend logout endpoint to clear cookies
      if (state.isAuthenticated) {
        await authApi.logout();
      }
      console.log('🗑️ Logout successful, cookies cleared');
    } catch (error) {
      // Even if logout fails on backend, clear local state
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      // Navigate to home page after logout
      navigate('/');
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const refreshToken = async (): Promise<void> => {
    try {
      await authApi.refreshToken();
      console.log('🔄 Token refresh successful');
      // Get updated user profile after refresh
      const user = await authApi.getProfile();
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user },
      });
    } catch (error) {
      console.log('❌ Token refresh failed');
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        clearError,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
