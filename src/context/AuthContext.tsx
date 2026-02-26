import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: User = {
  id: "user_001",
  name: "Alex Chen",
  email: "alex@flowductive.io",
  role: "Professional",
  createdAt: "2024-01-15",
  lastLogin: new Date().toISOString(),
  avatar: "AC",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("flowductive_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const loggedUser = { ...MOCK_USER, email, lastLogin: new Date().toISOString() };
    setUser(loggedUser);
    localStorage.setItem("flowductive_user", JSON.stringify(loggedUser));
    setLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newUser: User = {
      id: "user_" + Date.now(),
      name,
      email,
      role: "Professional",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar: name.slice(0, 2).toUpperCase(),
    };
    setUser(newUser);
    localStorage.setItem("flowductive_user", JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("flowductive_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
