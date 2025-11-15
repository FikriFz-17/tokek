import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AjukanLaporan from "./pages/AjukanLaporan";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const {pathname} = useLocation();
  const isaAdmin = pathname === '/admin-dashboard';

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar tetap */}
      <Sidebar isaAdmin={isaAdmin} />

      {/* Bagian Konten scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        <Topbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ajukan-laporan" element={<AjukanLaporan />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
