import { Home, PlusCircle, BookOpen, Headphones } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps{
    isaAdmin?: boolean;
}

export default function Sidebar({isaAdmin = false}: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <div className="w-64 bg-red-950 text-white flex flex-col py-6 px-4 h-screen">
      <img src="/telkom_logo.svg" alt="Logo" className="w-32 mx-auto mb-6" />

      <h1 className="text-xl font-semibold text-center mb-8">
        Telkom University
      </h1>

      <nav className="space-y-2">
        {isaAdmin ? (
          <SidebarItem
            icon={<Home size={18} />}
            label="Dashboard"
            to="/admin-dashboard"
            active={pathname === "/"}
          />
        ) : (
            <SidebarItem
            icon={<Home size={18} />}
            label="Dashboard"
            to="/"
            active={pathname === "/"}
            />
        )}

        {!isaAdmin && (
          <SidebarItem
            icon={<PlusCircle size={18} />}
            label="Ajukan Laporan"
            to="/ajukan-laporan"
            active={pathname === "/ajukan-laporan"}
          />
        )}

        <SidebarItem
          icon={<BookOpen size={18} />}
          label="User Manual"
          to="#"
          active={pathname === "/user-manual"}
        />
        
        <SidebarItem
          icon={<Headphones size={18} />}
          label="Customer Service"
          to="#"
          active={pathname === "/customer-service"}
        />
      </nav>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

function SidebarItem({ icon, label, to, active = false }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
