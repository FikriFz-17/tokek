// src/App.tsx
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AjukanLaporan from "./pages/AjukanLaporan";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin-dashboard';
  const location = useLocation();

  const hideSidebar = location.pathname === '/login';

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar Tetap */}
      {!hideSidebar && <Sidebar isaAdmin={isAdmin} />}

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto">
        {/* Tidak perlu Topbar terpisah karena header sudah ada di dalam Dashboard page sesuai desain */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ajukan-laporan" element={<AjukanLaporan />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}