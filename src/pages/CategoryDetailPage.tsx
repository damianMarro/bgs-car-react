import { Link, useParams } from 'react-router-dom';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { categories } from '../data/categories';
import { useCart } from '../hooks/useCart';
import { useFleet } from '../hooks/useFleet';
import type { Vehicle } from '../types';

export function CategoryDetailPage() {
  const { categoria } = useParams();
  const { fleet } = useFleet();
  const { addToCart } = useCart();
  const category = categories.find((item) => item.id === categoria);
  const vehicles = fleet.filter((vehicle) => vehicle.categoria === categoria);

  if (!category) {
    return <main className="container py-5 flex-grow-1"><h1>Categoría no encontrada</h1><Link to="/categorias" className="text-bgs">Ver categorías</Link></main>;
  }

  const handleRent = (vehicle: Vehicle) => addToCart(vehicle);
  return (
    <main className="container py-5 flex-grow-1">
      <p className="eyebrow mb-2"><Link to="/categorias" className="text-bgs">CATEGORÍAS</Link></p>
      <header className="page-heading mb-4">
        <h1>{category.name} <span className="text-bgs">BGS Car</span></h1>
        <p className="text-white-50">{category.description}</p>
      </header>
      {vehicles.length ? <div className="row g-4">
        {vehicles.map((vehicle) => <div className="col-12 col-md-6 col-lg-4" key={vehicle.id}><VehicleCard vehicle={vehicle} onRent={handleRent} /></div>)}
      </div> : <p className="text-white-50">No hay vehículos en esta categoría en este momento.</p>}
    </main>
  );
}
