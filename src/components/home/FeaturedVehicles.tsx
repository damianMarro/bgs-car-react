import { Link } from 'react-router-dom';
import type { Vehicle } from '../../types';
import { VehicleCard } from '../vehicles/VehicleCard';

export function FeaturedVehicles({ vehicles, onRent }: { vehicles: Vehicle[]; onRent: (vehicle: Vehicle) => void }) {
  return <section className="container py-5 py-lg-6">
    <div className="section-heading d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
      <div><p className="eyebrow mb-2">ESCOGIDOS PARA TI</p><h2 className="mb-0">Vehículos destacados</h2></div>
      <Link to="/flota" className="text-bgs fw-semibold text-decoration-none">Ver toda la flota <span aria-hidden="true">→</span></Link>
    </div>
    <div className="row g-4">{vehicles.map((vehicle) => <div className="col-12 col-md-6 col-lg-4" key={vehicle.id}><VehicleCard vehicle={vehicle} onRent={onRent} featured /></div>)}</div>
  </section>;
}
