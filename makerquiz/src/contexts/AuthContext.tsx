import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, { AuthContextType } from '../services/AuthService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const storedToken = AuthService.getToken();
    const storedUsername = AuthService.getUsername();
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
    // Finaliza o carregamento após verificar o storage
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);
    AuthService.setToken(response.access);
    AuthService.setRefreshToken(response.refresh);
    AuthService.setUsername(username);
    
    setToken(response.access);
    setUsername(username);
    setIsAuthenticated(true);
  };

  const register = async (username: string, password: string, password2: string, email: string) => {
    await AuthService.register(username, password, password2, email);
  };

  const logout = () => {
    AuthService.clearTokens();
    setToken(null);
    setUsername(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
