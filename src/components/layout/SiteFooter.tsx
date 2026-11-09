import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="site-footer bg-black border-top border-bgs mt-auto py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <Link to="/" className="footer-brand text-decoration-none">BGS Car</Link>
          <p className="small text-white-50 mb-0">Arriendo de vehículos para cada viaje.</p>
        </div>
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <Link to="/servicios">Servicios</Link>
          <Link to="/sucursales">Sucursales</Link>
          <Link to="/contacto">Contacto</Link>
          <span className="small text-white-50">© 2026 BGS Car</span>
        </div>
      </div>
    </footer>
  );
}
