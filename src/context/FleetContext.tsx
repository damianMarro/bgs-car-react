import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createVehicle, deleteVehicle, deserializeVehicles, serializeVehicles, updateVehicle as updateVehicleData, vehicles } from '../data/vehicles';
import type { Vehicle } from '../types';
import { FleetContext } from './fleet-store';

const FLEET_KEY = 'bgs_flota';

function normalizeImagePath(image: string) {
  return image.startsWith('/') ? image : `/${image.replace(/^\.\//, '')}`;
}

function readFleet(): Vehicle[] {
  try {
    const parsed = deserializeVehicles(localStorage.getItem(FLEET_KEY));
    return parsed.map((vehicle) => ({
      ...vehicle,
      transmision: vehicle.transmision === 'Manual' ? 'Manual' : 'Automático',
      imagen: normalizeImagePath(vehicle.imagen),
    }));
  } catch {
    return deserializeVehicles(null, vehicles);
  }
}

export function FleetProvider({ children }: { children: ReactNode }) {
  const [fleet, setFleet] = useState<Vehicle[]>(readFleet);

  useEffect(() => {
    localStorage.setItem(FLEET_KEY, serializeVehicles(fleet));
  }, [fleet]);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => setFleet((current) => createVehicle(current, vehicle));
  const updateVehicle = (updated: Vehicle) => setFleet((current) => updateVehicleData(current, updated));
  const removeVehicle = (id: number) => setFleet((current) => deleteVehicle(current, id));

  return (
    <FleetContext.Provider value={{ fleet, addVehicle, updateVehicle, removeVehicle }}>
      {children}
    </FleetContext.Provider>
  );
}
