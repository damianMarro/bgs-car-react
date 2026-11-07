import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Vehicle } from '../types';
import { vehicles as initialVehicles } from '../data/vehicles';

interface FleetContextType {
  fleet: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: number) => void;
}

export const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function FleetProvider({ children }: { children: ReactNode }) {
  // Inicializamos el estado global con los datos estaticos
  const [fleet, setFleet] = useState<Vehicle[]>(initialVehicles);

  const addVehicle = (vehicle: Vehicle) => {
    setFleet((prev) => [...prev, vehicle]);
  };

  const deleteVehicle = (id: number) => {
    setFleet((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <FleetContext.Provider value={{ fleet, addVehicle, deleteVehicle }}>
      {children}
    </FleetContext.Provider>
  );
}