import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router';

interface AuthContextProps {
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  token: string | null;
  logout: () => void; 
  logoutAllDevices : () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate("/login");
  };

  const logoutAllDevices = async () => {
    await fetch(`${BASE_URL}/logout-all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setToken, token, logout, logoutAllDevices }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
