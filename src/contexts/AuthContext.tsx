"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  id: string | null;
  name: string | null;
  login: (token: string, id: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedId = localStorage.getItem("userId");
    const savedName = localStorage.getItem("userName");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedId) {
      setId(savedId);
    }
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const login = (newToken: string, id: string, name: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", id);
    localStorage.setItem("userName", name);
    setToken(newToken);
    setId(id);
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, id, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
