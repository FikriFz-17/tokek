// src/components/Topbar.tsx
import { User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full flex justify-end items-center p-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-2 rounded-full">
            <User size={20} className="text-gray-600" />
          </div>
          <div className="flex flex-col text-right">
             <span className="font-medium text-sm text-gray-800">
              {user ? user.nama_lengkap || user.identifier : "Guest"}
            </span>
             <span className="text-xs text-gray-500 capitalize">
              {user ? user.role : ""}
            </span>
          </div>
        </div>
        
        {/* Tombol Logout */}
        <button 
          onClick={logout}
          className="p-2 hover:bg-red-50 rounded-full text-gray-500 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}