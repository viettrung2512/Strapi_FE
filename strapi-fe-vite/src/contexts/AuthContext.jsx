import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuth, login as authLogin, register as authRegister, logout as authLogout } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await checkAuth();
        setUser(userData);
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const userData = await authLogin(email, password);
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const newUser = await authRegister(userData);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};