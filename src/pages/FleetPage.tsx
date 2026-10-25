// src/pages/FleetPage.tsx
import { vehicles } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle } from '../types';
import { useCart } from '../hooks/useCart';

export function FleetPage() {
  const { addToCart, cart } = useCart();

  const handleRent = (vehicle: Vehicle) => {
    // Por ahora agregamos 1 dia por defecto
    addToCart(vehicle, 1);
    alert(`Agregado al carrito: ${vehicle.marca} ${vehicle.modelo}`);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Nuestra Flota</h2>
        <span className="badge bg-primary fs-6">
          Autos en carrito: {cart.length}
        </span>
      </div>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {vehicles.map((vehicle) => (
          <div className="col" key={vehicle.id}>
            <VehicleCard vehicle={vehicle} onRent={handleRent} />
          </div>
        ))}
      </div>
    </div>
  );
}