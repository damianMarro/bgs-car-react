import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'cliente') => {
    login(role);
    // Redirigimos al admin si es admin, a la flota si es cliente
    if (role === 'admin') navigate('/admin');
    else navigate('/flota');
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 fw-bold">Simulacion de Inicio de Sesion</h2>
      <p className="text-muted mb-4">Selecciona un rol para probar las rutas protegidas.</p>
      
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-primary btn-lg" onClick={() => handleLogin('cliente')}>
          Entrar como Cliente
        </button>
        <button className="btn btn-dark btn-lg" onClick={() => handleLogin('admin')}>
          Entrar como Administrador
        </button>
      </div>
    </div>
  );
}