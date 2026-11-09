import { useContext } from 'react';
import { FleetContext } from '../context/fleet-store';

export function useFleet() {
  const context = useContext(FleetContext);
  if (!context) throw new Error('useFleet debe usarse dentro de FleetProvider');
  return context;
}
