import { useState } from 'react';
import { VehicleCard } from '../components/VehicleCard';
import type { Vehicle } from '../types';
import { useCart } from '../hooks/useCart';
import { useFleet } from '../hooks/useFleet';

export function FleetPage() {
  const { fleet } = useFleet(); 
  const { addToCart, cart } = useCart();

  // 1. Estados locales para los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const handleRent = (vehicle: Vehicle) => {
    addToCart(vehicle, 1);
    alert(`Agregado al carrito: ${vehicle.marca} ${vehicle.modelo}`);
  };

  // 2. Estado derivado: calculamos la lista filtrada en cada render
  const filteredFleet = fleet.filter((vehicle) => {
    // Busqueda por texto (marca o modelo)
    const matchesSearch = `${vehicle.marca} ${vehicle.modelo}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    // Filtro por categoria
    const matchesCategory = selectedCategory === 'todas' || vehicle.categoria === selectedCategory;

    // El vehiculo debe cumplir AMBAS condiciones para mostrarse
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Nuestra Flota</h2>
        <span className="badge bg-primary fs-6">
          Autos en carrito: {cart.length}
        </span>
      </div>

      {/* 3. Controles de filtro */}
      <div className="row mb-4 bg-light p-3 rounded shadow-sm">
        <div className="col-md-6 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por marca o modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="todas">Todas las categorias</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="deportivo">Deportivo</option>
            <option value="camioneta">Camioneta</option>
          </select>
        </div>
      </div>
      
      {/* 4. Renderizado de la lista filtrada */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredFleet.length > 0 ? (
          filteredFleet.map((vehicle) => (
            <div className="col" key={vehicle.id}>
              <VehicleCard vehicle={vehicle} onRent={handleRent} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">No se encontraron vehiculos con esos filtros.</h4>
          </div>
        )}
      </div>
    </div>
  );
}