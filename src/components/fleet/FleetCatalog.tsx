import type { Vehicle } from '../../types';

interface FleetFiltersProps {
  category: string;
  manual: boolean;
  automatic: boolean;
  onCategoryChange: (value: string) => void;
  onManualChange: (value: boolean) => void;
  onAutomaticChange: (value: boolean) => void;
  onReset: () => void;
}

export function FleetFilters({ category, manual, automatic, onCategoryChange, onManualChange, onAutomaticChange, onReset }: FleetFiltersProps) {
  return <div className="filter-panel bg-black border border-secondary rounded-3 p-4">
    <h2 className="h5 text-bgs border-bottom border-secondary pb-3 mb-4">Filtra la flota</h2>
    <fieldset className="mb-4"><legend className="h6">Transmisión</legend>
      <div className="form-check"><input className="form-check-input" type="checkbox" id="filter-manual" checked={manual} onChange={(event) => onManualChange(event.target.checked)} /><label className="form-check-label" htmlFor="filter-manual">Manual</label></div>
      <div className="form-check"><input className="form-check-input" type="checkbox" id="filter-automatic" checked={automatic} onChange={(event) => onAutomaticChange(event.target.checked)} /><label className="form-check-label" htmlFor="filter-automatic">Automático</label></div>
    </fieldset>
    <div className="mb-4"><label className="form-label fw-semibold" htmlFor="filter-category">Categoría</label><select id="filter-category" className="form-select bg-dark text-light border-secondary" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
      <option value="todos">Todas las categorías</option><option value="sedan">Sedán</option><option value="suv">SUV</option><option value="deportivo">Deportivo</option><option value="camioneta">Camioneta</option>
    </select></div>
    <button className="btn btn-outline-bgs w-100" type="button" onClick={onReset}>Limpiar filtros</button>
  </div>;
}

export function FleetVehicleGrid({ vehicles, onRent }: { vehicles: Vehicle[]; onRent: (vehicle: Vehicle) => void }) {
  return <div className="row g-4">{vehicles.map((vehicle) => <div className="col-12 col-md-6 col-xl-4" key={vehicle.id}><article data-testid="fleet-item"><VehicleSummary vehicle={vehicle} onRent={onRent} /></article></div>)}</div>;
}

function VehicleSummary({ vehicle, onRent }: { vehicle: Vehicle; onRent: (vehicle: Vehicle) => void }) {
  return <div className="fleet-row-slot"><FleetCard vehicle={vehicle} onRent={onRent} /></div>;
}

import { VehicleCard as FleetCard } from '../vehicles/VehicleCard';
