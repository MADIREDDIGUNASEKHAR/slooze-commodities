'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// import { useMutation } from '@apollo/client';
// import { LOGIN_MUTATION } from '@/lib/graphql/auth';
// import { LoginMutationResponse } from '@/lib/graphql/types';

export type UserRole = 'manager' | 'storekeeper';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
// In production, this would be replaced with actual GraphQL mutations
const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'manager@slooze.com',
    password: 'manager123',
    user: {
      id: '1',
      email: 'manager@slooze.com',
      name: 'Alex Manager',
      role: 'manager',
    },
  },
  {
    email: 'keeper@slooze.com',
    password: 'keeper123',
    user: {
      id: '2',
      email: 'keeper@slooze.com',
      name: 'Sam Keeper',
      role: 'storekeeper',
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Production implementation would use Apollo Client:
  // const [loginMutation] = useMutation<LoginMutationResponse>(LOGIN_MUTATION);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('slooze_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    /* 
    ============================================================
    PRODUCTION IMPLEMENTATION WITH APOLLO CLIENT:
    ============================================================
    
    try {
      const { data } = await loginMutation({
        variables: { email, password }
      });

      if (data?.login) {
        const { accessToken, user: userData } = data.login;
        
        // Store token
        localStorage.setItem('slooze_token', accessToken);
        localStorage.setItem('slooze_user', JSON.stringify(userData));
        
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
    
    ============================================================
    */

    // MOCK IMPLEMENTATION (for demo purposes without backend)
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (mockUser) {
      setUser(mockUser.user);
      localStorage.setItem('slooze_user', JSON.stringify(mockUser.user));
      // In production, would also store the JWT token:
      // localStorage.setItem('slooze_token', accessToken);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('slooze_user');
    localStorage.removeItem('slooze_token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
