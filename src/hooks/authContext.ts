import React, { useContext } from 'react';

export type Role = 'admin' | 'viewer';
export type AuthState = { role: Role; setAdmin: () => void; setViewer: () => void; toggle: () => void };

const KEY = 'demo_role';
export function getRoleFromStorage(): Role { return (typeof window !== 'undefined' && localStorage.getItem(KEY) === 'admin') ? 'admin' : 'viewer'; }

export const AuthContext = React.createContext<AuthState | undefined>(undefined);

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx) return ctx;
  return { role: getRoleFromStorage(), setAdmin: () => {}, setViewer: () => {}, toggle: () => {} };
}
