import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { demoUsers, roleHomePaths } from '@/lib/demo-users';
import type { DemoUser, UserRole } from '@/lib/demo-users';

const STORAGE_KEY = 'janconnect-auth-user';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
  provider: 'email' | 'google';
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  loginWithGoogle: () => Promise<AuthUser>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<AuthUser>;
  requestPasswordReset: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAuthUser(u: DemoUser, provider: 'email' | 'google' = 'email'): AuthUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatarInitials: u.avatarInitials,
    provider,
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setIsLoading(false);
  }, []);

  const persist = useCallback((u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    await delay(600);
    const match = demoUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) throw new Error('Invalid email or password. Try a demo account below.');
    const authUser = toAuthUser(match);
    persist(authUser);
    return authUser;
  }, [persist]);

  const loginWithGoogle = useCallback(async (): Promise<AuthUser> => {
    await delay(800);
    // Mock: Google sign-in lands on the citizen demo account
    const googleUser = demoUsers.find((u) => u.role === 'citizen')!;
    const authUser = toAuthUser(googleUser, 'google');
    persist(authUser);
    return authUser;
  }, [persist]);

  const register = useCallback(
    async (name: string, email: string, _password: string, role: UserRole): Promise<AuthUser> => {
      await delay(700);
      const existing = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) throw new Error('An account with this email already exists.');
      const newUser: AuthUser = {
        id: `u-${Date.now()}`,
        name,
        email,
        role,
        avatarInitials: name
          .split(' ')
          .map((p) => p[0])
          .slice(0, 2)
          .join('')
          .toUpperCase(),
        provider: 'email',
      };
      persist(newUser);
      return newUser;
    },
    [persist]
  );

  const requestPasswordReset = useCallback(async (email: string): Promise<void> => {
    await delay(600);
    const exists = demoUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
    // For security, don't reveal whether the email exists — but accept any format.
    void exists;
  }, []);

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    loginWithGoogle,
    register,
    requestPasswordReset,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export function getRoleHome(role: UserRole): string {
  return roleHomePaths[role];
}
