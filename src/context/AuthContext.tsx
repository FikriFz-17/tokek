// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../api"; // Pastikan path sesuai
import { useNavigate, useLocation } from "react-router-dom";

// Sesuaikan interface dengan data dari API Anda
interface User {
  identifier: string;
  nama_lengkap: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Cek session saat aplikasi pertama kali dimuat
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const data = await getCurrentUser(); // Panggil API /users/me
      if (data) {
        setUser(data);
        
        // Opsional: Jika user sudah login tapi buka halaman login, redirect otomatis
        if (location.pathname === "/login") {
          if (data.role === "super admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      }
    } catch (error) {
      console.error("Session check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    
    // === LOGIKA REDIRECT BERDASARKAN ROLE ===
    if (userData.role === "super admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Panggil API Logout (hapus cookie)
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children} 
      {/* Render children hanya setelah cek session selesai agar tidak flicker */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}