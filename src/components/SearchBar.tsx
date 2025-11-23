// src/components/SearchBar.tsx
import { Search, Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
      {/* Search Input */}
      <div className="relative w-full md:w-[400px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Cari laporan berdasarkan No. Resi atau Masalah"
          className="pl-11 h-12 rounded-xl border-none shadow-sm bg-white text-sm"
        />
      </div>

      {/* Filters Right */}
      <div className="flex gap-3 w-full md:w-auto">
        {/* Fake Date Picker */}
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm text-gray-600 shadow-sm font-medium hover:bg-gray-50">
          <span>Pilih Periode</span>
          <Calendar size={16} />
        </button>

        {/* Fake Status Dropdown */}
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm text-gray-600 shadow-sm font-medium hover:bg-gray-50">
          <span>Semua Status</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}