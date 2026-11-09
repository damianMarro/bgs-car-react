import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { CheckoutResultPage } from '../src/pages/CheckoutResultPage';

function renderResult(result: string) {
  return render(<MemoryRouter initialEntries={[`/checkout/resultado/${result}`]}>
    <Routes><Route path="/checkout/resultado/:resultado" element={<CheckoutResultPage />} /></Routes>
  </MemoryRouter>);
}

describe('CheckoutResultPage', () => {
  it('renders an approved receipt and invokes print', () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    localStorage.setItem('bgs_ultima_orden', JSON.stringify({
      code: 'BGS-123', customer: { name: 'Ana', surname: 'Pérez', email: 'ana@duoc.cl' },
      delivery: { method: 'pickup', branch: 'Santiago' }, items: [], total: 0,
    }));
    renderResult('approved');
    expect(screen.getByText('BGS-123')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Imprimir / guardar como PDF' }));
    expect(print).toHaveBeenCalledOnce();
  });

  it('handles malformed result data and displays rejected-payment retry', () => {
    localStorage.setItem('bgs_ultimo_pago', '{invalid');
    renderResult('rejected');
    expect(screen.getByRole('heading', { name: 'No se pudo completar el pago' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Intentar nuevamente' }).getAttribute('href')).toBe('/checkout');
  });
});
