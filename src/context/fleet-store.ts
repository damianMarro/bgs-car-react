import { createContext } from 'react';
import type { Vehicle } from '../types';

export interface FleetContextValue {
  fleet: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: number) => void;
}

export const FleetContext = createContext<FleetContextValue | undefined>(undefined);
