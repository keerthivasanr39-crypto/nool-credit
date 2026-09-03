import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole, customName?: string, customBusiness?: string) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_MSME_USER: User = {
  id: 'user-msme-1',
  name: 'Karthik Subramanian',
  email: 'msme@noolcredit.com',
  role: 'MSME',
  businessName: 'Sri Lakshmi Knits',
  industry: 'Textile Job Work',
  location: 'Tiruppur, Tamil Nadu',
  token: 'demo-jwt-msme-token-xyz789'
};

const DEMO_LENDER_USER: User = {
  id: 'user-lender-1',
  name: 'Priya Narayanan',
  email: 'lender@noolcredit.com',
  role: 'LENDER',
  businessName: 'Apex FinCorp Capital',
  industry: 'NBFC / Working Capital Partner',
  location: 'Mumbai / Chennai',
  token: 'demo-jwt-lender-token-abc123'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nool_user');
    return saved ? JSON.parse(saved) : DEMO_MSME_USER; // Default logged in as MSME for seamless hackathon demo
  });

  const role = user?.role || 'MSME';
  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('nool_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nool_user');
    }
  }, [user]);

  const login = (email: string, selectedRole: UserRole, customName?: string, customBusiness?: string) => {
    // Derive a clean name from the email/username input
    const cleanInput = (email || '').trim();
    let fallbackName = cleanInput;
    if (fallbackName.includes('@')) {
      fallbackName = fallbackName.split('@')[0].replace(/[._-]/g, ' ');
    }
    fallbackName = fallbackName.replace(/\b\w/g, (l) => l.toUpperCase());

    const finalName =
      customName && customName.trim()
        ? customName.trim()
        : fallbackName && fallbackName.toLowerCase() !== 'demo.msme'
        ? fallbackName
        : selectedRole === 'LENDER'
        ? DEMO_LENDER_USER.name
        : DEMO_MSME_USER.name;

    const finalBusiness =
      customBusiness && customBusiness.trim()
        ? customBusiness.trim()
        : fallbackName && fallbackName.toLowerCase() !== 'demo.msme'
        ? `${finalName} Textiles`
        : selectedRole === 'LENDER'
        ? DEMO_LENDER_USER.businessName
        : DEMO_MSME_USER.businessName;

    if (selectedRole === 'LENDER') {
      setUser({
        ...DEMO_LENDER_USER,
        email: cleanInput,
        name: finalName,
        businessName: finalBusiness,
      });
    } else {
      setUser({
        ...DEMO_MSME_USER,
        email: cleanInput,
        name: finalName,
        businessName: finalBusiness,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'LENDER') {
      setUser(DEMO_LENDER_USER);
    } else {
      setUser(DEMO_MSME_USER);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
