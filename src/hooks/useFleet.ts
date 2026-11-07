import { useContext } from 'react';
import { FleetContext } from '../context/FleetContext';

export function useFleet() {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleet debe ser usado dentro de un FleetProvider');
  }
  return context;
}