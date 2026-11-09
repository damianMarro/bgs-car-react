import { createContext } from 'react';
import type { UserRole } from '../types';

export interface AuthContextValue {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  signIn: (name: string, surname: string, email: string, role: Exclude<UserRole, null>) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
