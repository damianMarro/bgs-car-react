import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VehicleCard } from '../src/components/vehicles/VehicleCard';
import { vehicles } from '../src/data/vehicles';

describe('VehicleCard', () => {
  it('renderiza información del vehículo y usa alt descriptivo', () => {
    render(<VehicleCard vehicle={vehicles[0]} onRent={() => undefined} />);
    expect(screen.getByRole('heading', { name: 'Toyota Camry 2026' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Toyota Camry 2026' })).toBeTruthy();
    expect(screen.getByText('Transmisión: Automático')).toBeTruthy();
  });

  it('envía el vehículo al callback cuando el usuario reserva', () => {
    const onRent = vi.fn();
    render(<VehicleCard vehicle={vehicles[0]} onRent={onRent} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reservar' }));
    expect(onRent).toHaveBeenCalledOnce();
    expect(onRent).toHaveBeenCalledWith(vehicles[0]);
  });

  it('muestra la tarifa promocional y el precio anterior', () => {
    render(<VehicleCard vehicle={vehicles[0]} onRent={() => undefined} offerPrice={53550} />);
    expect(screen.getByText('Oferta')).toBeTruthy();
    expect(screen.getByText('$53.550')).toBeTruthy();
    expect(screen.getByText('$59.500')).toBeTruthy();
  });

  it('envía al callback el precio promocional recibido por prop', () => {
    const onRent = vi.fn();
    render(<VehicleCard vehicle={vehicles[0]} onRent={onRent} offerPrice={53550} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reservar' }));
    expect(onRent).toHaveBeenCalledWith({ ...vehicles[0], precioDia: 53550 });
  });

  it('aplica variante visual destacada sin alterar el contenido', () => {
    const { container } = render(<VehicleCard vehicle={vehicles[0]} onRent={() => undefined} featured />);
    expect(container.querySelector('h3')?.className).toContain('h4');
  });
});
