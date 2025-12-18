// src/components/Sidebar.tsx
import { LayoutDashboard, BookOpen, Headphones, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isaAdmin?: boolean;
}

export default function Sidebar({ isaAdmin = false }: SidebarProps) {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-[#E74C3C] text-white flex flex-col h-screen font-sans">
      {/* Profil Section */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-3">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="Profile" 
            className="w-full h-full object-cover bg-gray-300" 
          />
        </div>
        <h2 className="text-xl font-bold tracking-wide">DEKON</h2>
      </div>

      {/* Separator Line */}
      <div className="px-6 mb-6">
        <div className="h-[1px] bg-white/50 w-full"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          to={isaAdmin ? "/admin-dashboard" : "/dashboard"}
          active={pathname === "/dashboard" || pathname === "/admin-dashboard"}
        />

        {/* HANYA MUNCUL JIKA BUKAN ADMIN */}
        {!isaAdmin && (
          <SidebarItem
            icon={<PlusCircle size={20} />}
            label="Ajukan Laporan"
            to="/ajukan-laporan"
            active={pathname === "/ajukan-laporan"}
          />
        )}

        <SidebarItem
          icon={<BookOpen size={20} />}
          label="User Manual"
          // to="/user-manual"
          active={pathname === "/user-manual"}
        />
        <SidebarItem
          icon={<Headphones size={20} />}
          label="Customer Service"
          // to="/customer-service"
          active={pathname === "/customer-service"}
        />
      </nav>

      <button 
        onClick={logout} 
        className="mt-auto w-full rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 transition-colors"
      >
        Logout
      </button>

      {/* Footer */}
      <div className="pb-6 text-center text-xs text-white/70">
        <p>Tokek v1.0</p>
        <p>© 2025 • Kelompok Tes</p>
      </div>
    </div>
  );
}

// Komponen Item Menu
function SidebarItem({ icon, label, to, active }: any) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
        active 
          ? "bg-white/20 text-whiteyb shadow-sm" 
          : "text-white hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}