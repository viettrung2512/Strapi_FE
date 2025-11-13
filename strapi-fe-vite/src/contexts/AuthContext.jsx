import React, { createContext, useState, useContext, useEffect } from "react";
import {
  checkAuth,
  login as authLogin,
  register as authRegister,
} from "../utils/auth";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
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
        console.log("Token invalid", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authLogin(email, password);

    localStorage.setItem("token", res.jwt);
    setUser(res.user);

    return res.user;
  };
  const register = async (data) => {
    const res = await authRegister(data);

    localStorage.setItem("token", res.jwt);
    setUser(res.user);

    return res.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  // ✅ Update user data
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
