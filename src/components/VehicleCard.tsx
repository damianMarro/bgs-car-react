import { Vehicle } from '../types';
import { formatCLP } from '../utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onRent: (vehicle: Vehicle) => void; // Callback para avisar al padre
}

export function VehicleCard({ vehicle, onRent }: VehicleCardProps) {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={vehicle.imagen} 
        className="card-img-top" 
        alt={`${vehicle.marca} ${vehicle.modelo}`} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 align-self-start text-uppercase">
          {vehicle.categoria}
        </span>
        <h5 className="card-title">{vehicle.marca} {vehicle.modelo}</h5>
        <p className="card-text text-muted mb-1">
          Transmision: {vehicle.transmision}
        </p>
        <p className="fw-bold fs-5 mb-3">
          {formatCLP(vehicle.precioDia)} <span className="fs-6 text-muted fw-normal">/dia</span>
        </p>
        
        
        <button 
          className="btn btn-dark w-100 mt-auto" 
          onClick={() => onRent(vehicle)}
        >
          Rentar
        </button>
      </div>
    </div>
  );
}