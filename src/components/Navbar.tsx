import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">BGS Car</Link>
      
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/flota">Flota</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin</Link>
          </li>
        </ul>
        
        <Link to="/carrito" className="btn btn-outline-light position-relative">
          Carrito
          {/* Mostramos un badge solo si hay items */}
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}