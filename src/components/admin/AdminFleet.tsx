import type { Vehicle } from '../../types';
import { formatCLP } from '../../utils';

export function AdminVehicleForm({ form, editing, onChange, onSubmit, onCancel }: {
  form: Omit<Vehicle, 'id'>;
  editing: boolean;
  onChange: (field: keyof Omit<Vehicle, 'id'>, value: string | number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return <section className="col-12 col-lg-4" aria-labelledby="add-vehicle-heading"><div className="card bg-black border-secondary h-100">
    <div className="card-header border-secondary text-bgs fw-bold" id="add-vehicle-heading">{editing ? 'Editar vehículo' : 'Añadir vehículo'}</div><div className="card-body">
      <form onSubmit={onSubmit}>
        <div className="mb-3"><label htmlFor="vehicle-brand" className="form-label small text-white-50">Marca</label><input id="vehicle-brand" className="form-control form-control-sm bg-dark text-light border-secondary" value={form.marca} onChange={(e) => onChange('marca', e.target.value)} required /></div>
        <div className="mb-3"><label htmlFor="vehicle-model" className="form-label small text-white-50">Modelo</label><input id="vehicle-model" className="form-control form-control-sm bg-dark text-light border-secondary" value={form.modelo} onChange={(e) => onChange('modelo', e.target.value)} required /></div>
        <div className="row g-2 mb-3"><div className="col-6"><label htmlFor="vehicle-category" className="form-label small text-white-50">Categoría</label><select id="vehicle-category" className="form-select form-select-sm bg-dark text-light border-secondary" value={form.categoria} onChange={(e) => onChange('categoria', e.target.value)}><option value="sedan">Sedán</option><option value="suv">SUV</option><option value="deportivo">Deportivo</option><option value="camioneta">Camioneta</option></select></div>
          <div className="col-6"><label htmlFor="vehicle-transmission" className="form-label small text-white-50">Transmisión</label><select id="vehicle-transmission" className="form-select form-select-sm bg-dark text-light border-secondary" value={form.transmision} onChange={(e) => onChange('transmision', e.target.value)}><option value="Automático">Automático</option><option value="Manual">Manual</option></select></div></div>
        <div className="mb-3"><label htmlFor="vehicle-price" className="form-label small text-white-50">Precio por día (CLP)</label><input id="vehicle-price" type="number" min="1" className="form-control form-control-sm bg-dark text-light border-secondary" value={form.precioDia || ''} onChange={(e) => onChange('precioDia', Number(e.target.value))} required /></div>
        <div className="mb-4"><label htmlFor="vehicle-image" className="form-label small text-white-50">Ruta de la imagen</label><input id="vehicle-image" className="form-control form-control-sm bg-dark text-light border-secondary" value={form.imagen} onChange={(e) => onChange('imagen', e.target.value)} required /><div className="form-text text-white-50">Usa una ruta como /assets/img/camry.png</div></div>
        <button className="btn btn-bgs btn-sm w-100" type="submit">{editing ? 'Guardar cambios' : 'Guardar vehículo'}</button>{editing && <button className="btn btn-outline-light btn-sm w-100 mt-2" type="button" onClick={onCancel}>Cancelar edición</button>}
      </form>
    </div></div></section>;
}

export function AdminFleetTable({ vehicles, onEdit, onDelete }: { vehicles: Vehicle[]; onEdit: (vehicle: Vehicle) => void; onDelete: (vehicle: Vehicle) => void }) {
  return <section className="col-12 col-lg-8" aria-labelledby="fleet-heading"><div className="card bg-black border-secondary h-100">
    <div className="card-header border-secondary text-bgs fw-bold d-flex justify-content-between align-items-center"><span id="fleet-heading">Flota actual</span><span className="badge bg-secondary">{vehicles.length} vehículos</span></div>
    <div className="card-body p-0 table-responsive"><table className="table table-dark table-hover align-middle mb-0"><thead><tr><th>ID</th><th>Vehículo</th><th>Categoría</th><th>Precio / día</th><th className="text-end">Acciones</th></tr></thead><tbody>
      {vehicles.map((vehicle) => <tr key={vehicle.id}><td className="text-white-50">#{vehicle.id}</td><td><div className="d-flex align-items-center gap-3"><img className="admin-thumb rounded" src={vehicle.imagen} alt="" /><span className="fw-semibold">{vehicle.marca} {vehicle.modelo}</span></div></td><td><span className="badge bg-secondary text-capitalize">{vehicle.categoria}</span></td><td>{formatCLP(vehicle.precioDia)}</td><td className="text-end text-nowrap"><button className="btn btn-outline-bgs btn-sm me-2" type="button" onClick={() => onEdit(vehicle)}>Editar</button><button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onDelete(vehicle)}>Eliminar</button></td></tr>)}
    </tbody></table></div>
  </div></section>;
}
