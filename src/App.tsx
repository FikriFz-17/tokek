// src/App.tsx
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AjukanLaporan from "./pages/AjukanLaporan";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserManual from "./pages/UserManual";
import CustomerService from "./pages/CustomerService"; // <--- 1. Import ini

export default function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {!hideSidebar && <Sidebar />}

      <div className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={["mahasiswa", "pegawai"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/ajukan-laporan" element={
            <ProtectedRoute allowedRoles={["mahasiswa", "pegawai"]}>
              <AjukanLaporan />
            </ProtectedRoute>
          } />

          <Route path="/user-manual" element={
            <ProtectedRoute allowedRoles={["mahasiswa", "pegawai", "admin"]}>
              <UserManual />
            </ProtectedRoute>
          } />

          {/* 2. Tambahkan Route Customer Service */}
          <Route path="/customer-service" element={
            <ProtectedRoute allowedRoles={["mahasiswa", "pegawai", "admin"]}>
              <CustomerService />
            </ProtectedRoute>
          } />
          
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}