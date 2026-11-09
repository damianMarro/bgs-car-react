import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FleetProvider } from '../src/context/FleetContext';
import { AdminPage } from '../src/pages/AdminPage';

function renderAdmin() {
  return render(<FleetProvider><AdminPage /></FleetProvider>);
}

describe('AdminPage', () => {
  it('renders the initial catalog and count', () => {
    renderAdmin();
    expect(screen.getByRole('heading', { name: 'Panel de control' })).toBeTruthy();
    expect(screen.getAllByText('6 vehículos')).toHaveLength(2);
    expect(screen.getByText('Toyota Camry 2026')).toBeTruthy();
  });

  it('validates required data and positive price', () => {
    renderAdmin();
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: ' ' } });
    fireEvent.change(screen.getByLabelText('Modelo'), { target: { value: 'Civic' } });
    fireEvent.change(screen.getByLabelText('Precio por día (CLP)'), { target: { value: '40000' } });
    fireEvent.change(screen.getByLabelText('Ruta de la imagen'), { target: { value: '/assets/img/camry.png' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar vehículo' }));
    expect(screen.getByRole('status').textContent).toContain('La marca es obligatoria.');
  });

  it('creates a vehicle through the form and persists it', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(123456);
    renderAdmin();
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Honda' } });
    fireEvent.change(screen.getByLabelText('Modelo'), { target: { value: 'Civic' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'suv' } });
    fireEvent.change(screen.getByLabelText('Transmisión'), { target: { value: 'Manual' } });
    fireEvent.change(screen.getByLabelText('Precio por día (CLP)'), { target: { value: '40000' } });
    fireEvent.change(screen.getByLabelText('Ruta de la imagen'), { target: { value: '/assets/img/camry.png' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar vehículo' }));
    expect(await screen.findByText('El vehículo se agregó a la flota.')).toBeTruthy();
    expect(screen.getByText('Honda Civic')).toBeTruthy();
    expect(screen.getAllByText('suv')).toHaveLength(2);
    await waitFor(() => {
      const fleet = JSON.parse(localStorage.getItem('bgs_flota') ?? '[]');
      expect(fleet).toHaveLength(7);
      expect(fleet.at(-1).transmision).toBe('Manual');
    });
  });

  it('edits an existing vehicle', async () => {
    renderAdmin();
    const row = screen.getByText('Toyota Camry 2026').closest('tr');
    fireEvent.click(row!.querySelector('button')!);
    fireEvent.change(screen.getByLabelText('Modelo'), { target: { value: 'Camry editado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    expect(await screen.findByText('Toyota Camry editado')).toBeTruthy();
  });

  it('can cancel an edit and reset the form', () => {
    renderAdmin();
    const row = screen.getByText('Toyota Camry 2026').closest('tr');
    fireEvent.click(row!.querySelector('button')!);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar edición' }));
    expect((screen.getByLabelText('Marca') as HTMLInputElement).value).toBe('');
    expect(screen.getByRole('status').textContent).toBe('Edición cancelada.');
  });

  it('requires confirmation before deleting a vehicle', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderAdmin();
    const row = screen.getByText('Toyota Camry 2026').closest('tr');
    fireEvent.click(row!.querySelectorAll('button')[1]);
    expect(confirm).toHaveBeenCalledOnce();
    expect(screen.getByText('Toyota Camry 2026')).toBeTruthy();
    confirm.mockReturnValue(true);
    fireEvent.click(row!.querySelectorAll('button')[1]);
    await waitFor(() => expect(screen.queryByText('Toyota Camry 2026')).toBeNull());
  });
});
