import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FleetProvider } from '../src/context/FleetContext';
import { useFleet } from '../src/hooks/useFleet';
import { vehicles } from '../src/data/vehicles';

function FleetHarness() {
  const { fleet, addVehicle, updateVehicle, removeVehicle } = useFleet();
  const item = fleet[0];
  return <div>
    <output aria-label="cantidad">{fleet.length}</output>
    <output aria-label="modelo">{item?.modelo ?? ''}</output>
    <button onClick={() => addVehicle({ ...vehicles[0], modelo: 'Nuevo' })}>Agregar</button>
    <button onClick={() => item && updateVehicle({ ...item, modelo: 'Editado' })}>Editar</button>
    <button onClick={() => item && removeVehicle(item.id)}>Eliminar</button>
  </div>;
}

describe('FleetProvider', () => {
  it('inicia el catálogo y persiste la lista en localStorage', async () => {
    render(<FleetProvider><FleetHarness /></FleetProvider>);
    expect(screen.getByLabelText('cantidad').textContent).toBe(String(vehicles.length));
    await waitFor(() => expect(JSON.parse(localStorage.getItem('bgs_flota') ?? '[]')).toHaveLength(vehicles.length));
  });

  it('recupera catálogo persistido y normaliza ruta de imagen/transmisión', () => {
    localStorage.setItem('bgs_flota', JSON.stringify([{ ...vehicles[0], imagen: 'assets/car.png', transmision: 'Otro' }]));
    render(<FleetProvider><FleetHarness /></FleetProvider>);
    expect(screen.getByLabelText('cantidad').textContent).toBe('1');
    expect(JSON.parse(localStorage.getItem('bgs_flota') ?? '[]')[0]).toMatchObject({ imagen: '/assets/car.png', transmision: 'Automático' });
  });

  it('usa datos iniciales si localStorage contiene JSON corrupto', () => {
    localStorage.setItem('bgs_flota', '{bad json');
    render(<FleetProvider><FleetHarness /></FleetProvider>);
    expect(screen.getByLabelText('cantidad').textContent).toBe(String(vehicles.length));
  });

  it('usa el catálogo inicial si la lectura del almacenamiento falla', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('storage unavailable'); });
    render(<FleetProvider><FleetHarness /></FleetProvider>);
    expect(screen.getByLabelText('cantidad').textContent).toBe(String(vehicles.length));
  });

  it('ejecuta create, update y delete en respuesta a eventos del DOM', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(98765);
    render(<FleetProvider><FleetHarness /></FleetProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    await waitFor(() => expect(screen.getByLabelText('cantidad').textContent).toBe('7'));
    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    await waitFor(() => expect(screen.getByLabelText('modelo').textContent).toBe('Editado'));
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    await waitFor(() => expect(screen.getByLabelText('cantidad').textContent).toBe('6'));
  });
});
