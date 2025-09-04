import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  fallback = <Navigate to="/login" /> 
}) => {
  const { state } = useAuth();
  
  if (!state.isAuthenticated) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
