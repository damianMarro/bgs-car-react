import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { CheckoutResultPage } from '../src/pages/CheckoutResultPage';
import { vehicles } from '../src/data/vehicles';

function renderCheckout() {
  localStorage.setItem('bgs_usuario', 'Ana');
  localStorage.setItem('bgs_usuario_apellido', 'Pérez');
  localStorage.setItem('bgs_correo', 'ana@duoc.cl');
  localStorage.setItem('rol_usuario', 'cliente');
  localStorage.setItem('bgs_carrito', JSON.stringify([{ ...vehicles[0], dias: 2 }]));
  return render(<MemoryRouter initialEntries={['/checkout']}>
    <AuthProvider><CartProvider><Routes>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout/resultado/:resultado" element={<CheckoutResultPage />} />
    </Routes></CartProvider></AuthProvider>
  </MemoryRouter>);
}

describe('Checkout flow', () => {
  it('prefills customer data from session and shows order summary', () => {
    renderCheckout();
    expect((screen.getByLabelText('Nombre *') as HTMLInputElement).value).toBe('Ana');
    expect((screen.getByLabelText('Apellido *') as HTMLInputElement).value).toBe('Pérez');
    expect((screen.getByLabelText('Correo electrónico *') as HTMLInputElement).value).toBe('ana@duoc.cl');
    expect(screen.getByText('Toyota Camry 2026 · 2 día(s)')).toBeTruthy();
    expect(screen.getAllByText('$119.000')).toHaveLength(2);
  });

  it('switches delivery form based on selected option', () => {
    renderCheckout();
    expect(screen.getByLabelText('Sucursal de retiro *')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Entrega a domicilio'));
    expect(screen.getByLabelText('Calle y número *')).toBeTruthy();
    expect(screen.getByLabelText('Comuna *')).toBeTruthy();
  });

  it('submits home-delivery details and records the address in the receipt', async () => {
    renderCheckout();
    fireEvent.click(screen.getByLabelText('Entrega a domicilio'));
    fireEvent.change(screen.getByLabelText('Calle y número *'), { target: { value: 'Av. Apoquindo 100' } });
    fireEvent.change(screen.getByLabelText('Departamento'), { target: { value: '42' } });
    fireEvent.change(screen.getByLabelText('Región *'), { target: { value: 'Región de Valparaíso' } });
    fireEvent.change(screen.getByLabelText('Comuna *'), { target: { value: 'Las Condes' } });
    fireEvent.change(screen.getByLabelText('Indicaciones para la entrega (opcional)'), { target: { value: 'Conserjería' } });
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
    expect(await screen.findByText('Av. Apoquindo 100, Las Condes')).toBeTruthy();
    const order = JSON.parse(localStorage.getItem('bgs_ultima_orden') ?? '{}');
    expect(order.delivery).toMatchObject({ method: 'home', apartment: '42', region: 'Región de Valparaíso', notes: 'Conserjería' });
  });

  it('shows an empty state if there is no cart to check out', () => {
    render(<MemoryRouter initialEntries={['/checkout']}>
      <AuthProvider><CartProvider><Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes></CartProvider></AuthProvider>
    </MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'No hay una reserva para pagar' })).toBeTruthy();
  });

  it('records successful order and clears cart', async () => {
    renderCheckout();
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
    expect(await screen.findByRole('heading', { name: '¡Gracias por reservar con BGS Car!' })).toBeTruthy();
    const orders = JSON.parse(localStorage.getItem('bgs_ordenes') ?? '[]');
    expect(orders).toHaveLength(1);
    expect(orders[0]).toMatchObject({ status: 'approved', total: vehicles[0].precioDia * 2 });
    await waitFor(() => expect(JSON.parse(localStorage.getItem('bgs_carrito') ?? '[]')).toHaveLength(0));
  });

  it('keeps cart when simulated payment is rejected', async () => {
    renderCheckout();
    fireEvent.click(screen.getByLabelText('Simular un pago rechazado para probar el flujo de error'));
    fireEvent.click(screen.getByRole('button', { name: 'Simular pago rechazado' }));
    expect(await screen.findByRole('heading', { name: 'No se pudo completar el pago' })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('bgs_carrito') ?? '[]')).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('bgs_ultimo_pago') ?? '{}').status).toBe('rejected');
  });
});
