import { useState } from 'react';
import type { FormEvent } from 'react';
import { AdminFleetTable, AdminVehicleForm } from '../components/admin/AdminFleet';
import { validateVehicleInput } from '../data/vehicles';
import { useFleet } from '../hooks/useFleet';
import type { Vehicle } from '../types';

const blankForm = { marca: '', modelo: '', categoria: 'sedan' as Vehicle['categoria'], transmision: 'Automático' as Vehicle['transmision'], precioDia: 0, imagen: '/assets/img/camry.png' };
type VehicleForm = Omit<Vehicle, 'id'>;

export function AdminPage() {
  const { fleet, addVehicle, updateVehicle, removeVehicle } = useFleet();
  const [form, setForm] = useState<VehicleForm>(blankForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [notice, setNotice] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateVehicleInput(form);
    if (validationErrors.length) { setNotice(validationErrors.join(' ')); return; }
    const vehicleData = { ...form, marca: form.marca.trim(), modelo: form.modelo.trim() };
    if (editingId === null) { addVehicle(vehicleData); setNotice('El vehículo se agregó a la flota.'); }
    else { updateVehicle({ ...vehicleData, id: editingId }); setNotice('Los cambios del vehículo se guardaron.'); }
    setForm(blankForm); setEditingId(null);
  };
  const deleteVehicle = (vehicle: Vehicle) => {
    if (window.confirm(`¿Eliminar ${vehicle.marca} ${vehicle.modelo} de la flota?`)) {
      removeVehicle(vehicle.id);
      if (editingId === vehicle.id) { setEditingId(null); setForm(blankForm); }
    }
  };
  const editVehicle = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setForm({ marca: vehicle.marca, modelo: vehicle.modelo, categoria: vehicle.categoria, transmision: vehicle.transmision, precioDia: vehicle.precioDia, imagen: vehicle.imagen });
    setNotice(`Editando ${vehicle.marca} ${vehicle.modelo}.`);
  };
  const changeField = (field: keyof VehicleForm, value: string | number) => setForm((current) => ({ ...current, [field]: value }) as VehicleForm);
  const cancelEdit = () => { setEditingId(null); setForm(blankForm); setNotice('Edición cancelada.'); };

  return <main className="container-fluid admin-page py-4 px-3 px-lg-4 flex-grow-1">
    <header className="admin-heading bg-black border border-danger rounded-3 p-4 mb-4 d-flex flex-column flex-sm-row justify-content-between gap-2"><div><p className="eyebrow text-danger mb-2">BGS CAR · ADMINISTRACIÓN</p><h1 className="h2 mb-0">Panel de control</h1></div><span className="badge bg-secondary align-self-sm-center">{fleet.length} vehículos</span></header>
    {notice && <div className="alert alert-info" role="status">{notice}</div>}
    <div className="row g-4"><AdminVehicleForm form={form} editing={editingId !== null} onChange={changeField} onSubmit={submit} onCancel={cancelEdit} /><AdminFleetTable vehicles={fleet} onEdit={editVehicle} onDelete={deleteVehicle} /></div>
  </main>;
}
