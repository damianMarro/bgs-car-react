import { useState } from 'react';
import { vehicles as initialVehicles } from '../data/vehicles';
import type { Vehicle } from '../types';
import { formatCLP } from '../utils';

export function AdminPage() {
  const [fleet, setFleet] = useState<Vehicle[]>(initialVehicles);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    categoria: 'sedan' as Vehicle['categoria'],
    transmision: 'Automático' as Vehicle['transmision'],
    precioDia: 0,
  });

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'precioDia' ? Number(value) : value,
    }));
  };

  // Manejador del envio del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validacion basica
    if (!formData.marca || !formData.modelo || formData.precioDia <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    // Creamos el nuevo vehiculo generando un ID con la fecha actual
    const newVehicle: Vehicle = {
      ...formData,
      id: Date.now(), 
      imagen: '/placeholder.jpg', // Imagen por defecto
    };

    // Inmutabilidad: creamos un nuevo arreglo con el nuevo vehiculo
    setFleet((prev) => [...prev, newVehicle]);
    
    // Limpiamos el formulario
    setFormData({
      marca: '',
      modelo: '',
      categoria: 'sedan',
      transmision: 'Automatico',
      precioDia: 0,
    });
    
    alert('Vehiculo agregado exitosamente');
  };

  // Manejador para eliminar un vehiculo
  const handleDelete = (id: number) => {
    // Confirmacion antes de eliminar
    if (window.confirm('¿Estas seguro de eliminar este vehiculo?')) {
      setFleet((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Panel de Administrador</h2>

      <div className="row">
        {/* Columna izquierda: Formulario */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Agregar Vehiculo</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Marca</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="marca" 
                    value={formData.marca} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Modelo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="modelo" 
                    value={formData.modelo} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange}>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="deportivo">Deportivo</option>
                    <option value="camioneta">Camioneta</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio por Dia</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="precioDia" 
                    value={formData.precioDia || ''} 
                    onChange={handleChange} 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Guardar Vehiculo
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna derecha: Tabla de vehiculos */}
        <div className="col-md-8">
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle bg-white mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Vehiculo</th>
                  <th>Precio / Dia</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {fleet.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>
                      <strong>{vehicle.marca} {vehicle.modelo}</strong>
                      <br />
                      <small className="text-muted text-capitalize">{vehicle.categoria}</small>
                    </td>
                    <td>{formatCLP(vehicle.precioDia)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}