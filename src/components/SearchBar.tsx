import { useState, useRef, useEffect } from "react";
import { Search, Calendar } from "lucide-react";

export default function SearchBar() {
  const [showPopup, setShowPopup] = useState(false);

  // Ref untuk klik di luar popup
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
      {/* Search */}
      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg border w-full md:w-2/5">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari laporan berdasarkan No. Resi atau Masalah..."
          className="ml-3 outline-none w-full bg-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Periode Tanggal */}
        <div className="relative" ref={popupRef}>
          <div
            className="flex items-center bg-white rounded-lg border text-sm h-10 w-[180px] px-3 cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}>
            <input
              type="text"
              placeholder="Pilih periode..."
              className="outline-none w-full bg-transparent text-sm cursor-pointer"
              readOnly
            />
            <Calendar size={18} className="text-gray-500 ml-2" />
          </div>

          {/* Popup */}
          {showPopup && (
            <div className="absolute z-20 mt-2 bg-white border rounded-lg shadow-lg p-4 w-[320px]">
              <div className="text-sm font-semibold mb-2">Periode Tanggal</div>

              <div className="grid grid-cols-2 gap-4">
                {/* Dari */}
                <div>
                  <label className="text-xs text-gray-600">Dari</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                  />
                </div>

                {/* Sampai */}
                <div>
                  <label className="text-xs text-gray-600">Sampai</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                  />
                </div>
              </div>

              {/* Quick Select */}
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs">
                  Hari Ini
                </button>
                <button className="px-3 py-1 rounded-lg bg-green-50 text-green-700 text-xs">
                  7 Hari
                </button>
                <button className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs">
                  30 Hari
                </button>
              </div>

              {/* Reset */}
              <button className="mt-3 px-4 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm float-right">
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Status */}
        <select className="px-3 py-2 border rounded-lg text-sm bg-white h-10 w-[140px]">
          <option value="">Semua Status</option>
          <option value="open">Open</option>
          <option value="progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        {/* Show Entries */}
        <select className="px-3 py-2 border rounded-lg text-sm bg-white h-10 w-[120px]">
          <option value="5">Show 5 entries</option>
          <option value="10">10 entries</option>
          <option value="25">25 entries</option>
          <option value="50">50 entries</option>
          <option value="100">100 entries</option>
        </select>
      </div>
    </div>
  );
}
