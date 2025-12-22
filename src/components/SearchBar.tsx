// src/components/SearchBar.tsx
import { Search, RotateCcw } from "lucide-react";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  
  statusFilter: string;
  onStatusChange: (value: string) => void;
  
  startDate: string;
  onStartDateChange: (value: string) => void;
  
  endDate: string;
  onEndDateChange: (value: string) => void;
  
  onReset: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchText, 
  onSearchChange, 
  statusFilter,
  onStatusChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onReset,
  placeholder = "Cari berdasarkan masalah, resi..." 
}: SearchBarProps) {
  
  // Style dasar yang sama persis dengan input sebelumnya agar konsisten
  const baseInputStyle = "border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E74C3C] focus:border-[#E74C3C] text-sm transition-all shadow-sm h-[46px]";

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      
      {/* 1. Kolom Pencarian (Paling Lebar) */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`block w-full pl-10 pr-3 py-3 ${baseInputStyle}`}
          placeholder={placeholder}
        />
      </div>

      {/* 2. Filter Status */}
      <div className="w-full md:w-48">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className={`w-full px-3 py-2 appearance-none ${baseInputStyle}`}
          style={{ backgroundImage: 'none' }} // Hilangkan panah default browser jika ingin custom, tapi biarkan standard agar UX familiar
        >
          <option value="">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Proses">In-Progress</option>
          <option value="Pengajuan">Open / Pengajuan</option>
        </select>
      </div>

      {/* 3. Filter Tanggal (Start - End) */}
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className={`w-full md:w-40 px-3 py-2 ${baseInputStyle} text-gray-600`}
            placeholder="Dari Tanggal"
          />
        </div>
        
        <div className="relative">
           <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className={`w-full md:w-40 px-3 py-2 ${baseInputStyle} text-gray-600`}
            placeholder="Sampai Tanggal"
          />
        </div>
      </div>

      {/* 4. Tombol Reset (Muncul jika ada filter) */}
      {(searchText || statusFilter || startDate || endDate) && (
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 h-[46px] text-red-600 bg-white border border-red-100 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
          title="Reset Filter"
        >
          <RotateCcw size={18} />
          <span className="md:hidden lg:inline">Reset</span>
        </button>
      )}
    </div>
  );
}