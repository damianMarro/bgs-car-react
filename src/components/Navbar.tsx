import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { cart } = useCart();
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">BGS Car</Link>
      
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/flota">Flota</Link></li>
          {role === 'admin' && (
            <li className="nav-item"><Link className="nav-link text-warning" to="/admin">Admin</Link></li>
          )}
        </ul>
        
        <div className="d-flex align-items-center gap-3">
          {role ? (
            <>
              <span className="text-white small text-capitalize">Rol: {role}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
          )}

          <Link to="/carrito" className="btn btn-primary position-relative">
            Carrito
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}