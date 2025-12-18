// src/App.tsx
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AjukanLaporan from "./pages/AjukanLaporan";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
// import { useAuth } from "./context/AuthContext"; // Optional: Jika ingin protect route

export default function App() {
  const location = useLocation();

  // Sembunyikan sidebar hanya di halaman login
  const hideSidebar = location.pathname === '/login';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar otomatis mengecek role user di dalamnya */}
      {!hideSidebar && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Halaman User Biasa */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ajukan-laporan" element={<AjukanLaporan />} />
          
          {/* Halaman Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}