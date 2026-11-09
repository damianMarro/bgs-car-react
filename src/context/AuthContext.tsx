import { useState } from 'react';
import type { ReactNode } from 'react';
import type { UserRole } from '../types';
import { AuthContext } from './auth-store';

function readUser() {
  return {
    name: localStorage.getItem('bgs_usuario') ?? '',
    surname: localStorage.getItem('bgs_usuario_apellido') ?? '',
    email: localStorage.getItem('bgs_correo') ?? '',
    role: (localStorage.getItem('rol_usuario') as UserRole) ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(readUser);

  const signIn = (name: string, surname: string, email: string, role: Exclude<UserRole, null>) => {
    localStorage.setItem('bgs_usuario', name);
    localStorage.setItem('bgs_usuario_apellido', surname);
    localStorage.setItem('bgs_correo', email);
    localStorage.setItem('rol_usuario', role);
    setUser({ name, surname, email, role });
  };
  const signOut = () => {
    localStorage.removeItem('bgs_usuario');
    localStorage.removeItem('bgs_usuario_apellido');
    localStorage.removeItem('bgs_correo');
    localStorage.removeItem('rol_usuario');
    setUser({ name: '', surname: '', email: '', role: null });
  };

  return <AuthContext.Provider value={{ ...user, signIn, signOut }}>{children}</AuthContext.Provider>;
}
