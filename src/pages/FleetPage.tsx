import { useMemo, useState } from 'react';
import { FleetFilters, FleetVehicleGrid } from '../components/fleet/FleetCatalog';
import { useCart } from '../hooks/useCart';
import { useFleet } from '../hooks/useFleet';
import type { Vehicle } from '../types';

export function FleetPage() {
  const { fleet } = useFleet();
  const { addToCart, rentalDays } = useCart();
  const [category, setCategory] = useState('todos');
  const [manual, setManual] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [notice, setNotice] = useState('');
  const filteredFleet = useMemo(() => fleet.filter((vehicle) => {
    const matchesCategory = category === 'todos' || vehicle.categoria === category;
    const matchesTransmission = (!manual && !automatic) || (manual && vehicle.transmision === 'Manual') || (automatic && vehicle.transmision === 'Automático');
    return matchesCategory && matchesTransmission;
  }), [fleet, category, manual, automatic]);
  const rentVehicle = (vehicle: Vehicle) => { addToCart(vehicle); setNotice(`${vehicle.marca} ${vehicle.modelo} se agregó a tu reserva por ${rentalDays} día(s).`); };
  const resetFilters = () => { setCategory('todos'); setManual(false); setAutomatic(false); };

  return <main className="container py-5 flex-grow-1">
    <header className="page-heading mb-4"><p className="eyebrow mb-2">ENCUENTRA TU PRÓXIMO AUTO</p><h1>Nuestra <span className="text-bgs">flota</span></h1><p className="text-white-50 mb-0">Elige el vehículo que mejor acompaña tu viaje.</p></header>
    {notice && <div className="alert alert-success" role="status">{notice}</div>}
    <div className="row g-4"><aside className="col-12 col-lg-3"><FleetFilters category={category} manual={manual} automatic={automatic} onCategoryChange={setCategory} onManualChange={setManual} onAutomaticChange={setAutomatic} onReset={resetFilters} /></aside>
      <section className="col-12 col-lg-9" aria-label="Vehículos disponibles"><div className="d-flex justify-content-between align-items-center mb-3"><p className="text-white-50 mb-0">{filteredFleet.length} vehículos disponibles</p><span className="small text-white-50">{rentalDays} día(s) de arriendo</span></div>
        {filteredFleet.length ? <FleetVehicleGrid vehicles={filteredFleet} onRent={rentVehicle} /> : <div className="empty-state text-center rounded-3 p-5"><h2 className="h4">No hay vehículos con esos filtros</h2><p className="text-white-50 mb-0">Prueba otra categoría o transmisión.</p></div>}
      </section>
    </div>
  </main>;
}
