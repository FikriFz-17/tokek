// src/App.tsx
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // Tambahkan Navigate
import Dashboard from "./pages/Dashboard";
import AjukanLaporan from "./pages/AjukanLaporan";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Sembunyikan sidebar di halaman login
  const hideSidebar = location.pathname === '/login';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar hanya muncul jika hideSidebar false */}
      {!hideSidebar && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Halaman User Biasa */}
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
          
          {/* Halaman Admin */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* PERBAIKAN DI SINI: Gunakan Navigate agar URL berubah ke /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}