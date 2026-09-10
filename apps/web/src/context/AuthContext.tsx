import { createContext, useContext, useState, type ReactNode } from 'react';
import { api } from '../api';

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // A propósito NO usamos localStorage: si se recarga la página, el admin
  // vuelve a loguearse. Es una decisión consciente de seguridad básica.
  const [token, setToken] = useState<string | null>(null);

  async function login(password: string) {
    const { access_token } = await api.login(password);
    setToken(access_token);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
