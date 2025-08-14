import { type AuthResponse, type AuthTokens, type LoginData, type RegisterData, type User } from '@makhool-designs/shared';
import React, { useEffect, useReducer, type ReactNode } from 'react';
import { authApi } from '../services/api';
import { AuthContext } from './auth-context';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
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
        tokens: action.payload.tokens,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        tokens: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
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
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load auth data from localStorage on app start
  useEffect(() => {
    const loadAuthFromStorage = async () => {
      try {
        const storedTokens = localStorage.getItem('auth_tokens');
        const storedUser = localStorage.getItem('auth_user');
        
        if (storedTokens && storedUser) {
          const tokens: AuthTokens = JSON.parse(storedTokens);
          const user: User = JSON.parse(storedUser);
          
          // Immediately set the auth state from localStorage
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, tokens },
          });

          // Then verify token is still valid by making a profile request
          try {
            const profileData = await authApi.getProfile();
            // Update user data with fresh data from server
            dispatch({
              type: 'SET_USER',
              payload: profileData,
            });
          } catch {
            // Token is invalid, clear storage and logout
            localStorage.removeItem('auth_tokens');
            localStorage.removeItem('auth_user');
            dispatch({ type: 'LOGOUT' });
          }
        }
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem('auth_tokens');
        localStorage.removeItem('auth_user');
        dispatch({ type: 'LOGOUT' });
      }
    };

    loadAuthFromStorage();
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.tokens) {
      localStorage.setItem('auth_tokens', JSON.stringify(state.tokens));
      localStorage.setItem('auth_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('auth_tokens');
      localStorage.removeItem('auth_user');
    }
  }, [state.isAuthenticated, state.user, state.tokens]);

  const login = async (data: LoginData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response: AuthResponse = await authApi.login(data);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          tokens: response.tokens,
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
      const response: AuthResponse = await authApi.register(data);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          tokens: response.tokens,
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
      // Call backend logout endpoint if user is authenticated
      if (state.isAuthenticated) {
        await authApi.logout();
      }
    } catch (error) {
      // Even if logout fails on backend, clear local state
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('auth_tokens');
      localStorage.removeItem('auth_user');
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const refreshToken = async (): Promise<void> => {
    if (!state.tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await authApi.refreshToken(state.tokens.refreshToken);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: state.user!,
          tokens: response,
        },
      });
    } catch (error) {
      dispatch({ type: 'LOGOUT' });
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
