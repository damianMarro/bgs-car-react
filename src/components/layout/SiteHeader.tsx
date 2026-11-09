import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/flota', label: 'Flota' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/ofertas', label: 'Ofertas' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/sucursales', label: 'Sucursales' },
  { to: '/contacto', label: 'Contacto' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { name, role, signOut } = useAuth();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-bgs">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={closeMenu} aria-label="BGS Car, inicio">
            <img src="/assets/img/bgscar.png" alt="BGS Car" className="logo-bgs" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="main-navigation" className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={closeMenu}
                    className={({ isActive }) => `nav-link${isActive ? ' active text-bgs fw-bold' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {role === 'admin' && (
                <li className="nav-item">
                  <NavLink to="/admin" onClick={closeMenu} className="nav-link">Administración</NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/carrito" onClick={closeMenu} className="nav-link text-bgs fw-bold">
                  Reserva <span className="badge rounded-pill bg-bgs ms-1">{cart.length}</span>
                </NavLink>
              </li>
              <li className="nav-item ms-lg-2 py-2 py-lg-0">
                {name ? (
                  <button type="button" className="btn btn-outline-bgs btn-sm" onClick={signOut}>
                    Hola, {name} · Salir
                  </button>
                ) : (
                  <NavLink to="/login" onClick={closeMenu} className="btn btn-outline-bgs btn-sm">
                    Iniciar sesión
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
