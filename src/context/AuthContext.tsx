import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type UserRole = 'admin' | 'cliente' | null;

interface AuthContextType {
  role: UserRole;
  login: (role: 'admin' | 'cliente') => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('bgs_role');
    return (savedRole as UserRole) || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('bgs_role', role);
    } else {
      localStorage.removeItem('bgs_role');
    }
  }, [role]);

  const login = (newRole: 'admin' | 'cliente') => setRole(newRole);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}