import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérification du token au démarrage
  useEffect(() => {
    const token = localStorage.getItem('account_token');
    if (!token) { setIsLoading(false); return; }

    authApi.me()
      .then(setUser)
      .catch(() => localStorage.removeItem('account_token'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials);
    localStorage.setItem('account_token', data.token);
    setUser(data.user);
    return data;
  }, []);

  const signUp = useCallback(async (payload) => {
    const data = await authApi.signUp(payload);
    localStorage.setItem('account_token', data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try { await authApi.logout(); }
    finally { localStorage.removeItem('account_token'); setUser(null); }
  }, []);

  const updateUser = useCallback((updated) => setUser(updated), []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login, signUp, logout, updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}
