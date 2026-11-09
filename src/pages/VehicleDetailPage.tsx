import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useFleet } from '../hooks/useFleet';
import { formatCLP } from '../utils';

export function VehicleDetailPage() {
  const { id } = useParams();
  const { fleet } = useFleet();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const vehicle = fleet.find((item) => item.id === Number(id));

  if (!vehicle) {
    return <main className="container py-5 flex-grow-1"><h1>Vehículo no disponible</h1><Link to="/flota" className="text-bgs">Volver a la flota</Link></main>;
  }

  return (
    <main className="container py-5 flex-grow-1">
      <p className="eyebrow mb-3"><Link to="/flota" className="text-bgs">VOLVER A LA FLOTA</Link></p>
      {added && <div className="alert alert-success" role="status">Vehículo agregado a tu reserva.</div>}
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-7"><img className="vehicle-detail-image rounded-3 w-100" src={vehicle.imagen} alt={`${vehicle.marca} ${vehicle.modelo}`} /></div>
        <div className="col-12 col-lg-5">
          <span className="badge bg-secondary text-capitalize mb-3">{vehicle.categoria}</span>
          <h1 className="display-5 fw-bold">{vehicle.marca} <span className="text-bgs">{vehicle.modelo}</span></h1>
          <p className="text-white-50">Conoce los datos principales y añade este vehículo a tu reserva.</p>
          <dl className="vehicle-specs row mt-4">
            <dt className="col-6">Transmisión</dt><dd className="col-6">{vehicle.transmision}</dd>
            <dt className="col-6">Categoría</dt><dd className="col-6 text-capitalize">{vehicle.categoria}</dd>
            <dt className="col-6">Tarifa diaria</dt><dd className="col-6 text-bgs fw-bold">{formatCLP(vehicle.precioDia)}</dd>
          </dl>
          <button className="btn btn-bgs fw-bold px-4" type="button" onClick={() => { addToCart(vehicle); setAdded(true); }}>Agregar a la reserva</button>
        </div>
      </div>
    </main>
  );
}
