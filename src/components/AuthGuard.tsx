
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is authenticated via localStorage (matching AdminLoginPage logic)
    const isAuthenticated = localStorage.getItem('admin-auth') === 'true';
    
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);
  
  // Check authentication status
  const isAuthenticated = localStorage.getItem('admin-auth') === 'true';
  
  return isAuthenticated ? <>{children}</> : null;
}
