import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingView } from './LoadingView';

export interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  fallback = <Navigate to="/login" /> 
}) => {
  const { state } = useAuth();
  
  // Show loading while auth is being restored
  if (state.isLoading) {
    return <LoadingView />;
  }
  
  if (!state.isAuthenticated) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
