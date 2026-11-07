import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute() {
  const { role } = useAuth();

  // Si no es admin, lo pateamos al login
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Si es admin, le permitimos ver la pagina (Outlet renderiza el componente hijo)
  return <Outlet />;
}