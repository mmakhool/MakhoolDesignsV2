import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  fallback = <Navigate to="/login" /> 
}) => {
  // TODO: Implement actual auth check
  const isAuthenticated = false;
  
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
