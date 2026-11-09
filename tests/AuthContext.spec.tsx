import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from '../src/context/AuthContext';
import { useAuth } from '../src/hooks/useAuth';

function AuthHarness() {
  const { name, surname, email, role, signIn, signOut } = useAuth();
  return <div>
    <output aria-label="sesion">{[name, surname, email, role].join('|')}</output>
    <button onClick={() => signIn('Ana', 'Pérez', 'ana@duoc.cl', 'cliente')}>Ingresar</button>
    <button onClick={signOut}>Salir</button>
  </div>;
}

describe('AuthProvider', () => {
  it('carga sesión existente desde localStorage', () => {
    localStorage.setItem('bgs_usuario', 'Luis');
    localStorage.setItem('bgs_usuario_apellido', 'Díaz');
    localStorage.setItem('bgs_correo', 'luis@duoc.cl');
    localStorage.setItem('rol_usuario', 'admin');
    render(<AuthProvider><AuthHarness /></AuthProvider>);
    expect(screen.getByLabelText('sesion').textContent).toBe('Luis|Díaz|luis@duoc.cl|admin');
  });

  it('actualiza la vista y persiste los datos al iniciar sesión', () => {
    render(<AuthProvider><AuthHarness /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByLabelText('sesion').textContent).toBe('Ana|Pérez|ana@duoc.cl|cliente');
    expect(localStorage.getItem('bgs_correo')).toBe('ana@duoc.cl');
  });

  it('cierra sesión y elimina datos persistidos', () => {
    localStorage.setItem('bgs_correo', 'old@example.com');
    render(<AuthProvider><AuthHarness /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Salir' }));
    expect(screen.getByLabelText('sesion').textContent).toBe('|||');
    expect(localStorage.getItem('bgs_correo')).toBeNull();
  });
});
