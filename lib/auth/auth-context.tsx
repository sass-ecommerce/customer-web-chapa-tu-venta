"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut, type AuthUser } from "aws-amplify/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  logOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  logOut: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshUser() {
    try {
      const u = await getCurrentUser();
      setUser(u);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function logOut() {
    await signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
