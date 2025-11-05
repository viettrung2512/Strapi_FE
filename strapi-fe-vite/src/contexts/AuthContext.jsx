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
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await checkAuth();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("token");
        console.log("Token invalid");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ✅ Login + lưu token
  const login = async (email, password) => {
    const res = await authLogin(email, password);
    
    localStorage.setItem("token", res.jwt);
    setUser(res.user);

    return res.user;
  };

  // ✅ Register + auto login
  const register = async (data) => {
    const res = await authRegister(data);

    localStorage.setItem("token", res.jwt);
    setUser(res.user);

    return res.user;
  };

  // ✅ Logout
  const logout = () => {
    authLogout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
