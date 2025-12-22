// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { useLocation } from "react-router-dom";
import { getTickets, updateTicketCategory, updateTicketStatus } from "../api";
import Header from "@/components/Header";

interface Ticket {
  id: number;
  resi?: string;
  masalah: string;
  category?: string;
  deskripsi?: string;
  status?: string;
  created_at?: string;
  tanggal_pengajuan?: string;
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin-dashboard";

  // Filter States
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTickets(0, 1000); 
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedData) return;
    try {
      await updateTicketStatus(selectedData.id, newStatus);
      await fetchData();
      setIsOpen(false);
    } catch (err) { console.error(err); }
  };

  const handleUpdateKategori = async (newKategori: string) => {
    if (!selectedData) return;
    try {
      await updateTicketCategory(selectedData.id, newKategori);
      await fetchData();
      setIsOpen(false);
    } catch (err) { console.error(err); }
  };

  // Logic Filter
  const filteredTickets = tickets.filter((item) => {
    const query = searchText.toLowerCase();
    const matchText = 
      (item.masalah?.toLowerCase() || "").includes(query) ||
      (item.resi?.toLowerCase() || "").includes(query) ||
      (item.category?.toLowerCase() || "").includes(query);

    let matchStatus = true;
    if (statusFilter) {
      const s = (item.status || "").toLowerCase();
      const f = statusFilter.toLowerCase();
      if (f === "selesai") matchStatus = s === "selesai" || s === "done";
      else if (f === "proses") matchStatus = s === "proses" || s === "in-progress" || s.includes("progress");
      else if (f === "pengajuan") matchStatus = s === "pengajuan" || s === "open";
      else matchStatus = s.includes(f);
    }

    let matchDate = true;
    if (startDate || endDate) {
      const ticketDate = item.tanggal_pengajuan ? item.tanggal_pengajuan.split('T')[0] : "";
      if (!ticketDate) matchDate = false;
      else {
        if (startDate && ticketDate < startDate) matchDate = false;
        if (endDate && ticketDate > endDate) matchDate = false;
      }
    }

    return matchText && matchStatus && matchDate;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Stats
  const doneCount = tickets.filter(t => (t.status ?? "").toLowerCase().includes("selesai") || (t.status ?? "").toLowerCase() === "done").length;
  const processCount = tickets.filter(t => (t.status ?? "").toLowerCase().includes("proses") || (t.status ?? "").toLowerCase() === "progress").length;
  const openCount = tickets.filter(t => (t.status || "").toLowerCase() === "pengajuan").length;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Header title="Admin Dashboard" subtitle="Kelola tiket dan status laporan masuk" />

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
        placeholder="Cari tiket, kategori..."
      />

      <DataTable 
        data={currentTickets} 
        loading={loading} 
        onView={handleView} 
        isAdmin={isAdmin}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DetailLaporanModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedData}
        isAdmin={isAdmin}
        onUpdateStatus={handleUpdateStatus}
        onUpdateKategori={handleUpdateKategori}
      />
    </div>
  );
}