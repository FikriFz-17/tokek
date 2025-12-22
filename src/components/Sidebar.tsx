import { useState } from "react";
import { LayoutDashboard, BookOpen, Headphones, PlusCircle, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isaAdmin?: boolean;
}

export default function Sidebar({ isaAdmin = false }: SidebarProps) {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Tentukan apakah user adalah admin
  const isUserAdmin = user?.role === "admin" || isaAdmin;
  
  // LOGIKA DINAMIS: Prioritaskan Nama Lengkap -> Identifier (Username) -> "Pengguna"
  const displayName = user?.nama_lengkap || user?.identifier || "Pengguna";
  
  // Avatar otomatis digenerate berdasarkan displayName (Seed)
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`;

  return (
    <div className="w-64 bg-[#E74C3C] text-white flex flex-col h-screen font-sans">
      
      {/* Profil Section - Dinamis sesuai User Login */}
      <div 
        className="flex flex-col items-center pt-8 pb-4 cursor-pointer hover:bg-white/5 transition-colors duration-200"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-3 bg-white">
          <img 
            src={avatarUrl}
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="flex items-center gap-2 px-4">
          <h2 className="text-xl font-bold tracking-wide text-center break-words select-none">
            {displayName}
          </h2>
          {isProfileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        <p className="text-xs text-white/70 uppercase tracking-wider mt-1 select-none">
          {user?.role || "Guest"}
        </p>
      </div>

      {/* Menu Logout */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProfileOpen ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
        <div className="px-4">
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            onClick={logout}
            active={false}
            className="bg-red-900/50 hover:bg-red-900 border border-red-800"
          />
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="h-[1px] bg-white/50 w-full"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          to={isUserAdmin ? "/admin-dashboard" : "/dashboard"}
          active={pathname === "/dashboard" || pathname === "/admin-dashboard"}
        />

        {!isUserAdmin && (
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
          to="/user-manual" 
          active={pathname === "/user-manual"}
        />
        <SidebarItem
          icon={<Headphones size={20} />}
          label="Customer Service"
          to="/customer-service" 
          active={pathname === "/customer-service"}
        />
      </nav>

      <div className="pb-6 text-center text-xs text-white/70 mt-auto">
        <p>Tokek v1.0</p>
        <p>© 2025 • Kelompok Tes</p>
      </div>
    </div>
  );
}

// Komponen Item Menu
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

function SidebarItem({ icon, label, to, active, onClick, className = "" }: SidebarItemProps) {
  const baseClasses = `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium w-full text-left ${
    active 
      ? "bg-white/20 text-white shadow-sm" 
      : "text-white hover:bg-white/10"
  } ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Link to={to || "#"} className={baseClasses}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}