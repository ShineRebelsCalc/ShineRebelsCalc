import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authDb, UserSession, UserSettings } from '../lib/database';

interface AuthContextType {
  user: UserSession | null;
  settings: UserSettings | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  loginDemo: () => Promise<{ success: boolean; message: string }>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<{ success: boolean; settings?: UserSettings }>;
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
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      const userData = authDb.verifyToken(token);
      if (userData) {
        setUser(userData);
        loadUserSettings(userData.id);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const loadUserSettings = (userId: number) => {
    let userSettings = authDb.getUserSettings(userId);
    if (!userSettings) {
      // Create default settings for new user
      userSettings = authDb.createUserSettings(userId, {});
    }
    setSettings(userSettings);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const result = await authDb.login(email, password);
    if (result.success && result.user && result.token) {
      setUser(result.user);
      loadUserSettings(result.user.id);
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
      loadUserSettings(result.user.id);
      localStorage.setItem('auth_token', result.token);
    }
    return { success: result.success, message: result.message };
  };

  const updateSettings = async (updates: Partial<UserSettings>): Promise<{ success: boolean; settings?: UserSettings }> => {
    if (!user) {
      return { success: false };
    }

    const updatedSettings = authDb.updateUserSettings(user.id, updates);
    if (updatedSettings) {
      setSettings(updatedSettings);
      return { success: true, settings: updatedSettings };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    setSettings(null);
    localStorage.removeItem('auth_token');
  };

  const value: AuthContextType = {
    user,
    settings,
    login,
    register,
    loginDemo,
    updateSettings,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};