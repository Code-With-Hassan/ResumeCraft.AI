'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the user type
interface User {
  uid: string;
  email: string;
  name: string;
  isPremium?: boolean;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock a logged in user
  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or a cookie
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Mock API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && pass === 'password') {
          const mockUser: User = {
            uid: '12345',
            email: 'test@example.com',
            name: 'Test User',
            isPremium: true // Mock premium status
          };
          setUser(mockUser);
          localStorage.setItem('mockUser', JSON.stringify(mockUser));
          setLoading(false);
          resolve();
        } else if (email === 'user@example.com' && pass === 'password') {
           const mockUser: User = {
            uid: '67890',
            email: 'user@example.com',
            name: 'Normal User',
            isPremium: false
          };
          setUser(mockUser);
          localStorage.setItem('mockUser', JSON.stringify(mockUser));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };
  
  const signup = async (name: string, email: string, pass: string) => {
     setLoading(true);
    // Mock API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For mock purposes, signup is always successful unless the user exists
        if (email === 'test@example.com' || email === 'user@example.com') {
          setLoading(false);
          reject(new Error('An account with this email already exists.'));
        } else {
          // We don't log in the user, just create the "account"
          console.log(`Mock signup for ${name} with email ${email}`);
          setLoading(false);
          resolve();
        }
      }, 1000);
    });
  };


  const logout = async () => {
    setLoading(true);
     return new Promise<void>(resolve => {
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem('mockUser');
        setLoading(false);
        resolve();
      }, 500);
    });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
