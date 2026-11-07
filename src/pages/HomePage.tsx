import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center text-center text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        width: '100%'
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold mb-4">Bienvenido a BGS Car</h1>
        <p className="lead fs-4 mb-5">
          Encuentra el vehiculo perfecto para tu proximo viaje. Calidad, comodidad y los mejores precios.
        </p>
        <Link to="/flota" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
          Ver Flota Disponible
        </Link>
      </div>
    </div>
  );
}