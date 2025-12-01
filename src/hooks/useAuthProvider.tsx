import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext, getRoleFromStorage } from './authContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState(getRoleFromStorage);
  useEffect(() => { localStorage.setItem('demo_role', role); }, [role]);
  const setAdmin = useCallback(() => setRole('admin'), []);
  const setViewer = useCallback(() => setRole('viewer'), []);
  const toggle = useCallback(() => setRole(r => r === 'admin' ? 'viewer' : 'admin'), []);
  const value = useMemo(() => ({ role, setAdmin, setViewer, toggle }), [role, setAdmin, setViewer, toggle]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
