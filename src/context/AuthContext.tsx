import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

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
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapSupabaseUser(supabaseUser: SupabaseUser, profile?: { name?: string; role?: string; avatar?: string; created_at?: string } | null): User {
  return {
    id: supabaseUser.id,
    name: profile?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split("@")[0] || "User",
    email: supabaseUser.email || "",
    role: profile?.role || "Professional",
    createdAt: profile?.created_at || supabaseUser.created_at,
    lastLogin: supabaseUser.last_sign_in_at || new Date().toISOString(),
    avatar: profile?.avatar || (profile?.name || supabaseUser.email || "U").slice(0, 2).toUpperCase(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (supabaseUser: SupabaseUser) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", supabaseUser.id)
      .single();
    return mapSupabaseUser(supabaseUser, profile);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, sess) => {
      setSession(sess);
      if (sess?.user) {
        // Defer profile fetch to avoid deadlock
        setTimeout(async () => {
          const mappedUser = await fetchProfile(sess.user);
          setUser(mappedUser);
          setLoading(false);
        }, 0);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Then get current session
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!sess) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      return false;
    }
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setLoading(false);
      return false;
    }
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
