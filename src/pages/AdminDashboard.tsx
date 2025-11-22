// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { CheckCircle, AlertTriangle, Megaphone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getTickets, updateTicketCategory, updateTicketStatus } from "../api";

interface Ticket {
  id: number;
  resi?: string;
  masalah: string;
  category?: string;
  deskripsi?: string;
  status?: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin-dashboard";

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTickets();
      // data di-return oleh backend sebagai array langsung
      setTickets(data);
    } catch (err) {
      console.error("Gagal fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (item: Ticket) => {
    setSelectedData(item);
    setIsOpen(true);
  };

  // Callback untuk update kategori dari modal
  const handleUpdateKategori = async (newKategori: string) => {
    if (!selectedData) return;
    try {
      const updated = await updateTicketCategory(selectedData.id, newKategori);
      // refresh lokal -> atau panggil fetchData() lagi
      await fetchData();
      setIsOpen(false);
    } catch (err) {
      console.error("Gagal update kategori:", err);
    }
  };

  // Callback untuk update status dari modal
  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedData) return;
    try {
      const updated = await updateTicketStatus(selectedData.id, newStatus);
      await fetchData();
      setIsOpen(false);
    } catch (err) {
      console.error("Gagal update status:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6">
        <StatsCard
          count={tickets.filter(t => (t.status ?? "Pengajuan").toLowerCase() === "selesai" || (t.status ?? "").toLowerCase() === "done").length}
          label="Selesai"
          color="bg-green-500"
          icon={<CheckCircle />}
        />
        <StatsCard
          count={tickets.filter(t => (t.status ?? "").toLowerCase() === "proses" || (t.status ?? "").toLowerCase() === "progress").length}
          label="Progress"
          color="bg-yellow-500"
          icon={<AlertTriangle />}
        />
        <StatsCard
          count={tickets.filter(t => (t.status ?? "").toLowerCase() === "pengajuan" || (t.status ?? "").toLowerCase() === "pending").length}
          label="Pengajuan"
          color="bg-red-500"
          icon={<Megaphone />}
        />
      </div>

      {/* Search & Filters */}
      <SearchBar />

      {/* Table - kirim handleView ke DataTable */}
      <DataTable data={tickets} loading={loading} onView={handleView} isAdmin={isAdmin} />

      {/* Modal Detail */}
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
