import type { Vehicle } from '../../types';
import { formatCLP } from '../../utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onRent: (vehicle: Vehicle) => void;
  featured?: boolean;
  offerPrice?: number;
}

export function VehicleCard({ vehicle, onRent, featured = false, offerPrice }: VehicleCardProps) {
  const price = offerPrice ?? vehicle.precioDia;
  return (
    <article className="card vehicle-card bg-black border-secondary text-light h-100 shadow">
      <img
        src={vehicle.imagen}
        className="card-img-top vehicle-image"
        alt={`${vehicle.marca} ${vehicle.modelo}`}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="badge bg-secondary text-capitalize">{vehicle.categoria}</span>
          {offerPrice !== undefined && <span className="badge bg-bgs">Oferta</span>}
        </div>
        <h3 className={`card-title text-bgs ${featured ? 'h4' : 'h5'}`}>{vehicle.marca} {vehicle.modelo}</h3>
        <p className="card-text small text-white-50">Transmisión: {vehicle.transmision}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center gap-2 pt-3 border-top border-secondary">
          <p className="fs-5 fw-bold mb-0">
            {offerPrice !== undefined && <del className="d-block small text-white-50 fw-normal">{formatCLP(vehicle.precioDia)}</del>}
            {formatCLP(price)}<small className="fs-6 text-white-50">/día</small>
          </p>
          <button type="button" className="btn btn-outline-bgs btn-sm" onClick={() => onRent({ ...vehicle, precioDia: price })}>
            Reservar
          </button>
        </div>
      </div>
    </article>
  );
}
