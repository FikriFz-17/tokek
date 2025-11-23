import { useState } from "react";
import { Search, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fungsi untuk tombol preset (Hari Ini, 7 Hari, 30 Hari)
  const handlePreset = (days: number) => {
    const today = new Date();
    if (days === 0) {
      setDateRange({ from: today, to: today });
    } else {
      setDateRange({ from: subDays(today, days), to: today });
    }
  };

  const handleReset = () => {
    setDateRange({ from: undefined, to: undefined });
  };

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
        
        {/* --- POPOVER PERIODE TANGGAL (Sesuai Gambar) --- */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <button className={cn(
                "flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm text-gray-600 shadow-sm font-medium hover:bg-gray-50 transition-colors",
                (dateRange.from || dateRange.to) && "text-black ring-1 ring-gray-200"
              )}>
              <span>
                {dateRange.from 
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${dateRange.to ? format(dateRange.to, "dd/MM/yyyy") : "..."}`
                  : "Pilih Periode"}
              </span>
              <CalendarIcon size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[340px] p-5 rounded-xl shadow-xl border-gray-100" align="end">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-sm">Periode Tanggal</h4>
              
              {/* Input Tanggal Dari - Sampai */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium ml-1">Dari</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"
                      value={dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDateRange(prev => ({...prev, from: e.target.value ? new Date(e.target.value) : undefined}))}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium ml-1">Sampai</label>
                  <div className="relative">
                     <input 
                      type="date" 
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"
                      value={dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDateRange(prev => ({...prev, to: e.target.value ? new Date(e.target.value) : undefined}))}
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Preset Warna-warni */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handlePreset(0)}
                  className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  Hari Ini
                </button>
                <button 
                   onClick={() => handlePreset(7)}
                   className="px-3 py-1.5 rounded-md bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  7 Hari
                </button>
                <button 
                   onClick={() => handlePreset(30)}
                   className="px-3 py-1.5 rounded-md bg-purple-50 text-purple-600 text-xs font-semibold hover:bg-purple-100 transition-colors"
                >
                  30 Hari
                </button>
              </div>

              {/* Tombol Reset di Kanan Bawah */}
              <div className="flex justify-end pt-2">
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleReset}
                    className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 h-8 px-4 rounded-lg font-medium"
                 >
                    Reset
                 </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Status Dropdown (Placeholder) */}
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm text-gray-600 shadow-sm font-medium hover:bg-gray-50">
          <span>Semua Status</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}