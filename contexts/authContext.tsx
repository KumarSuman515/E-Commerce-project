"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firestore/firebase"; // Update the path to your auth config

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading: user === undefined }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
