import type { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 1,
    marca: 'Toyota',
    modelo: 'Camry 2026',
    categoria: 'sedan',
    transmision: 'Automático',
    precioDia: 59500,
    imagen: '/assets/img/camry.png',
  },
  {
    id: 2,
    marca: 'Ford',
    modelo: 'Mustang GT',
    categoria: 'deportivo',
    transmision: 'Manual',
    precioDia: 99900,
    imagen: '/assets/img/mustang.png',
  },
  {
    id: 3,
    marca: 'Tesla',
    modelo: 'Model 3',
    categoria: 'sedan',
    transmision: 'Automático',
    precioDia: 109000,
    imagen: '/assets/img/tesla.png',
  },
  {
    id: 4,
    marca: 'Chevrolet',
    modelo: 'Suburban',
    categoria: 'suv',
    transmision: 'Automático',
    precioDia: 85000,
    imagen: '/assets/img/suburvan.png',
  },
  {
    id: 5,
    marca: 'Volkswagen',
    modelo: 'Passat',
    categoria: 'sedan',
    transmision: 'Manual',
    precioDia: 49000,
    imagen: '/assets/img/passat.png',
  },
  {
    id: 6,
    marca: 'RAM',
    modelo: '1500',
    categoria: 'camioneta',
    transmision: 'Automático',
    precioDia: 75000,
    imagen: '/assets/img/ram.png',
  },
];

export type VehicleInput = Omit<Vehicle, 'id'>;

/** Read the whole in-memory catalog. */
export const readVehicles = (source: Vehicle[] = vehicles): Vehicle[] => [...source];
export const serializeVehicles = (source: Vehicle[]): string => JSON.stringify(source);
export const deserializeVehicles = (raw: string | null, fallback: Vehicle[] = vehicles): Vehicle[] => {
  if (!raw) return readVehicles(fallback);
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as Vehicle[] : readVehicles(fallback);
  } catch {
    return readVehicles(fallback);
  }
};

/** Create a new catalog entry (the provider persists the result to localStorage). */
export const createVehicle = (source: Vehicle[], input: VehicleInput, id = Date.now()): Vehicle[] => [
  ...source,
  { ...input, id },
];

export const validateVehicleInput = (input: VehicleInput): string[] => {
  const errors: string[] = [];
  if (!input.marca.trim()) errors.push('La marca es obligatoria.');
  if (!input.modelo.trim()) errors.push('El modelo es obligatorio.');
  if (!Number.isFinite(input.precioDia) || input.precioDia <= 0) errors.push('El precio diario debe ser mayor que cero.');
  if (!input.imagen.trim()) errors.push('La imagen es obligatoria.');
  return errors;
};

/** Replace the matching catalog entry. */
export const updateVehicle = (source: Vehicle[], updated: Vehicle): Vehicle[] => source.map((vehicle) =>
  vehicle.id === updated.id ? updated : vehicle,
);

/** Delete a catalog entry by id. */
export const deleteVehicle = (source: Vehicle[], id: number): Vehicle[] => source.filter((vehicle) => vehicle.id !== id);
