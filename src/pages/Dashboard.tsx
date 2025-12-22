// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { getTickets } from "../api";
import Header from "@/components/Header";

interface Ticket {
  id: number;
  resi?: string;
  masalah: string;
  category?: string;
  deskripsi?: string;
  status?: string;
  created_at?: string;
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE UNTUK FILTER ---
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
        // Fallback Data
        setTickets([
            { id: 1, resi: "#TCK-1021", masalah: "Login gagal pada aplikasi", category: "Hardware", status: "Selesai", created_at: "2025-07-01" },
            { id: 2, resi: "#TCK-1022", masalah: "Server down saat akses", category: "Software", status: "Proses", created_at: "2025-07-05" },
            { id: 3, resi: "#TCK-1023", masalah: "Printer tidak terdeteksi", category: "IT Support", status: "Selesai", created_at: "2025-07-09" },
            { id: 4, resi: "#TCK-1024", masalah: "Wifi lambat di gedung A", category: "Hardware", status: "Pengajuan", created_at: "2025-07-10" },
            { id: 5, resi: "#TCK-1025", masalah: "Lupa password email", category: "Cloud Services", status: "Pengajuan", created_at: "2025-07-12" },
            { id: 6, resi: "#TCK-1026", masalah: "Layar monitor blank", category: "Hardware", status: "Pengajuan", created_at: "2025-07-15" },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Reset pagination saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, statusFilter, startDate, endDate]);

  const handleReset = () => {
    setSearchText("");
    setStatusFilter("");
    setStartDate("");
    setEndDate("");
  };

  const handleView = (item: Ticket) => {
    setSelectedData(item);
    setIsOpen(true);
  };

  // --- LOGIKA FILTER UTAMA ---
  const filteredTickets = tickets.filter((item) => {
    // 1. Text Search
    const query = searchText.toLowerCase();
    const matchText = 
      (item.masalah?.toLowerCase() || "").includes(query) ||
      (item.resi?.toLowerCase() || "").includes(query);

    // 2. Status Filter
    let matchStatus = true;
    if (statusFilter) {
      const s = (item.status || "").toLowerCase();
      const f = statusFilter.toLowerCase();
      if (f === "selesai") matchStatus = s === "selesai" || s === "done";
      else if (f === "proses") matchStatus = s === "proses" || s === "in-progress" || s.includes("progress");
      else if (f === "pengajuan") matchStatus = s === "pengajuan" || s === "open";
      else matchStatus = s.includes(f);
    }

    // 3. Date Filter
    let matchDate = true;
    if (startDate || endDate) {
      const ticketDate = item.created_at ? item.created_at.split('T')[0] : "";
      if (!ticketDate) matchDate = false; 
      else {
        if (startDate && ticketDate < startDate) matchDate = false;
        if (endDate && ticketDate > endDate) matchDate = false;
      }
    }

    return matchText && matchStatus && matchDate;
  });

  // --- LOGIKA PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Stats Counters
  const doneCount = tickets.filter(t => (t.status || "").toLowerCase() === "selesai").length;
  const processCount = tickets.filter(t => (t.status || "").toLowerCase() === "proses").length;
  const openCount = tickets.filter(t => (t.status || "").toLowerCase() === "pengajuan").length;

  return (
    <div className="min-h-screen p-8 font-sans">
      <Header 
        title="Ticket Dashboard" 
        subtitle="Lihat status tiket dan daftar tiket aktif"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard count={doneCount} label="Selesai" variant="green" icon="/ceklis.svg" />
        <StatsCard count={processCount} label="In-Progress" variant="yellow" icon="/tandaseru.svg" />
        <StatsCard count={openCount} label="Open" variant="red" icon="/megaphone.svg" />
      </div>

      <SearchBar 
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onReset={handleReset}
      />

      <DataTable 
        data={currentTickets}
        loading={loading} 
        onView={handleView}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DetailLaporanModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedData}
      />
    </div>
  );
}