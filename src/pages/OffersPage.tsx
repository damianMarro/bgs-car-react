import { VehicleCard } from '../components/vehicles/VehicleCard';
import { offers } from '../data/offers';
import { useCart } from '../hooks/useCart';
import { useFleet } from '../hooks/useFleet';
import type { Vehicle } from '../types';

export function OffersPage() {
  const { fleet } = useFleet();
  const { addToCart } = useCart();
  const offerVehicles = offers.flatMap((offer) => {
    const vehicle = fleet.find((item) => item.id === offer.vehicleId);
    return vehicle ? [{ vehicle, price: Math.round(vehicle.precioDia * (1 - offer.discountPercent / 100)) }] : [];
  });

  const handleRent = (vehicle: Vehicle) => addToCart(vehicle);
  return (
    <main className="container py-5 flex-grow-1">
      <header className="page-heading mb-4">
        <p className="eyebrow mb-2">PROMOCIONES DE DEMOSTRACIÓN</p>
        <h1>Ofertas para tu <span className="text-bgs">viaje</span></h1>
        <p className="text-white-50 mb-0">Tarifas especiales disponibles en vehículos seleccionados.</p>
      </header>
      {offerVehicles.length ? <div className="row g-4">
        {offerVehicles.map(({ vehicle, price }) => (
          <div className="col-12 col-md-6 col-lg-4" key={vehicle.id}>
            <VehicleCard vehicle={vehicle} onRent={handleRent} offerPrice={price} />
          </div>
        ))}
      </div> : <p className="text-white-50">Por ahora no hay ofertas disponibles.</p>}
    </main>
  );
}
