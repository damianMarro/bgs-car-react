import { describe, expect, it } from 'vitest';
import {
  createVehicle,
  deleteVehicle,
  deserializeVehicles,
  readVehicles,
  serializeVehicles,
  updateVehicle,
  validateVehicleInput,
  vehicles,
} from '../src/data/vehicles';

describe('vehicle data source and CRUD', () => {
  it('read returns a copy of the complete catalog', () => {
    const result = readVehicles();
    expect(result).toEqual(vehicles);
    expect(result).not.toBe(vehicles);
  });

  it('read accepts an injected fixture', () => {
    const fixture = [{ ...vehicles[0], id: 101 }];
    expect(readVehicles(fixture)).toEqual(fixture);
  });

  it('serializes and restores catalog records', () => {
    expect(deserializeVehicles(serializeVehicles(vehicles))).toEqual(vehicles);
  });

  it('falls back for empty, malformed, or non-array stored data', () => {
    expect(deserializeVehicles(null)).toEqual(vehicles);
    expect(deserializeVehicles('{invalid')).toEqual(vehicles);
    expect(deserializeVehicles('{"vehicle":true}')).toEqual(vehicles);
  });

  it('validates all required fields and positive finite price', () => {
    expect(validateVehicleInput(vehicles[0])).toEqual([]);
    expect(validateVehicleInput({ ...vehicles[0], marca: ' ', modelo: '', precioDia: 0, imagen: '' })).toHaveLength(4);
    expect(validateVehicleInput({ ...vehicles[0], precioDia: Number.NaN })).toContain('El precio diario debe ser mayor que cero.');
  });

  it('creates an entry with a deterministic identifier', () => {
    const input = { ...vehicles[0], marca: 'Honda' };
    expect(createVehicle([], input, 42)).toEqual([{ ...input, id: 42 }]);
  });

  it('creates immutably without changing the original array', () => {
    const source = [vehicles[0]];
    const result = createVehicle(source, vehicles[1], 99);
    expect(source).toHaveLength(1);
    expect(result).toHaveLength(2);
  });

  it('updates only a matching identifier', () => {
    const updated = { ...vehicles[0], modelo: 'Camry actualizado' };
    expect(updateVehicle(vehicles, updated)).toEqual([updated, ...vehicles.slice(1)]);
  });

  it('leaves records unchanged when update identifier is unknown', () => {
    expect(updateVehicle(vehicles, { ...vehicles[0], id: 9000 })).toEqual(vehicles);
  });

  it('deletes only the requested identifier', () => {
    expect(deleteVehicle(vehicles, vehicles[0].id)).toEqual(vehicles.slice(1));
  });

  it('leaves records unchanged when delete identifier is unknown', () => {
    expect(deleteVehicle(vehicles, 9000)).toEqual(vehicles);
  });

  it('does not mutate the original catalog during deletion', () => {
    expect(deleteVehicle(vehicles, vehicles[0].id)).toHaveLength(5);
    expect(vehicles).toHaveLength(6);
  });

  it('contains all four vehicle categories', () => {
    expect([...new Set(vehicles.map((vehicle) => vehicle.categoria))].sort()).toEqual([
      'camioneta', 'deportivo', 'sedan', 'suv',
    ]);
  });

  it('has unique identifiers and positive daily prices', () => {
    expect(new Set(vehicles.map((vehicle) => vehicle.id)).size).toBe(vehicles.length);
    expect(vehicles.every((vehicle) => vehicle.precioDia > 0)).toBe(true);
  });
});
