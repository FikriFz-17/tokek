// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // Opsional: jika ingin membatasi role tertentu
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Tampilkan loading spinner atau null saat cek session
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  // Jika user tidak ada (cookie hilang/expired), lempar ke Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // (Opsional) Cek Role jika diperlukan
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Jika role tidak sesuai, bisa redirect ke dashboard masing-masing atau 404
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"} replace />;
  }

  return children;
};

export default ProtectedRoute;