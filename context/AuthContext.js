// context/AuthContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token here
      setUser({ email: localStorage.getItem('userEmail') || 'user@example.com' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication - in a real app, you'd call an API
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (email && password.length >= 6) {
          // Generate a mock JWT token
          const token = `mock_jwt_${Math.random().toString(36).substring(2)}`;
          localStorage.setItem('token', token);
          localStorage.setItem('userEmail', email);
          setUser({ email });
          resolve(true);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);