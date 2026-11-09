import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '../src/context/CartContext';
import { useCart } from '../src/hooks/useCart';
import { vehicles } from '../src/data/vehicles';

function CartHarness() {
  const { cart, totalPrice, rentalDays, addToCart, removeFromCart, clearCart, setRentalDays } = useCart();
  return <div>
    <output aria-label="items">{cart.length}</output><output aria-label="total">{totalPrice}</output><output aria-label="dias">{rentalDays}</output>
    <button onClick={() => addToCart(vehicles[0])}>Agregar</button>
    <button onClick={() => addToCart(vehicles[1])}>Agregar otro</button>
    <button onClick={() => setRentalDays(3)}>Tres días</button>
    <button onClick={() => setRentalDays(0)}>Días inválidos</button>
    <button onClick={() => cart[0] && removeFromCart(cart[0].id)}>Quitar</button>
    <button onClick={clearCart}>Vaciar</button>
  </div>;
}

describe('CartProvider', () => {
  it('agrega vehículos, calcula total y persiste el carrito', async () => {
    render(<CartProvider><CartHarness /></CartProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    await waitFor(() => expect(screen.getByLabelText('total').textContent).toBe(String(vehicles[0].precioDia)));
    expect(JSON.parse(localStorage.getItem('bgs_carrito') ?? '[]')[0]).toMatchObject({ id: vehicles[0].id, dias: 1 });
  });

  it('actualiza duración, total y duración persistida', async () => {
    render(<CartProvider><CartHarness /></CartProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tres días' }));
    expect(screen.getByLabelText('dias').textContent).toBe('3');
    await waitFor(() => expect(screen.getByLabelText('total').textContent).toBe(String(vehicles[0].precioDia)));
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    await waitFor(() => expect(screen.getByLabelText('total').textContent).toBe(String(vehicles[0].precioDia * 3)));
  });

  it('al volver a agregar un vehículo conserva otros elementos y actualiza solo el repetido', async () => {
    render(<CartProvider><CartHarness /></CartProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Agregar otro' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tres días' }));
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    await waitFor(() => expect(screen.getByLabelText('total').textContent).toBe(String(vehicles[0].precioDia * 3 + vehicles[1].precioDia)));
  });

  it('normaliza duración inválida a un día', () => {
    render(<CartProvider><CartHarness /></CartProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Días inválidos' }));
    expect(screen.getByLabelText('dias').textContent).toBe('1');
    expect(localStorage.getItem('bgs_dias_reserva')).toBe('1');
  });

  it('lee carrito guardado y adapta datos heredados', () => {
    localStorage.setItem('bgs_carrito', JSON.stringify([{ ...vehicles[0], cantidad: 2, imagen: 'car.png', transmision: 'Manual' }]));
    render(<CartProvider><CartHarness /></CartProvider>);
    expect(screen.getByLabelText('items').textContent).toBe('1');
    expect(screen.getByLabelText('total').textContent).toBe(String(vehicles[0].precioDia * 2));
  });

  it('usa un día por defecto si el registro heredado no tiene duración', () => {
    localStorage.setItem('bgs_carrito', JSON.stringify([{ ...vehicles[0] }]));
    localStorage.setItem('bgs_dias_reserva', '4');
    render(<CartProvider><CartHarness /></CartProvider>);
    expect(screen.getByLabelText('dias').textContent).toBe('4');
    expect(screen.getByLabelText('total').textContent).toBe(String(vehicles[0].precioDia));
  });

  it('recupera carrito vacío ante JSON dañado', () => {
    localStorage.setItem('bgs_carrito', '{bad json');
    render(<CartProvider><CartHarness /></CartProvider>);
    expect(screen.getByLabelText('items').textContent).toBe('0');
    expect(screen.getByLabelText('total').textContent).toBe('0');
  });

  it('quita y vacía elementos del carrito', async () => {
    render(<CartProvider><CartHarness /></CartProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }));
    await waitFor(() => expect(screen.getByLabelText('items').textContent).toBe('0'));
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vaciar' }));
    await waitFor(() => expect(screen.getByLabelText('items').textContent).toBe('0'));
  });
});
