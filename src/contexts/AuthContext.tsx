import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authDb, UserSession } from '../lib/database';

interface AuthContextType {
  user: UserSession | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  loginDemo: () => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      const userData = authDb.verifyToken(token);
      if (userData) {
        setUser(userData);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const result = await authDb.login(email, password);
    if (result.success && result.user && result.token) {
      setUser(result.user);
      localStorage.setItem('auth_token', result.token);
    }
    return { success: result.success, message: result.message };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; message: string }> => {
    const result = await authDb.register(email, password, name);
    if (result.success && result.user) {
      // Auto-login after registration
      const loginResult = await login(email, password);
      return loginResult;
    }
    return { success: result.success, message: result.message };
  };

  const loginDemo = async (): Promise<{ success: boolean; message: string }> => {
    const result = await authDb.loginDemo();
    if (result.success && result.user && result.token) {
      setUser(result.user);
      localStorage.setItem('auth_token', result.token);
    }
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    loginDemo,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};