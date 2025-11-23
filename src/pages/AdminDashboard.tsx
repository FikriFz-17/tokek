// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { CheckCircle, AlertTriangle, Megaphone, Check, AlertCircle } from "lucide-react";
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

  const handleUpdateKategori = async (newKategori: string) => {
    if (!selectedData) return;
    try {
      await updateTicketCategory(selectedData.id, newKategori);
      await fetchData();
      setIsOpen(false);
    } catch (err) {
      console.error("Gagal update kategori:", err);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedData) return;
    try {
      await updateTicketStatus(selectedData.id, newStatus);
      await fetchData();
      setIsOpen(false);
    } catch (err) {
      console.error("Gagal update status:", err);
    }
  };

  // Helper filters
  const doneCount = tickets.filter(t => (t.status ?? "").toLowerCase() === "selesai" || (t.status ?? "").toLowerCase() === "done").length;
  const processCount = tickets.filter(t => (t.status ?? "").toLowerCase() === "proses" || (t.status ?? "").toLowerCase() === "progress").length;
  const openCount = tickets.filter(t => (t.status || "").toLowerCase() === "pengajuan").length || 0;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Header 
        title="Admin Dashboard" 
        subtitle="Kelola tiket dan status laporan masuk" 
      />


      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          count={doneCount}
          label="Selesai"
          variant="green"
          icon="/ceklis.svg" // Ikon Check besar
        />
        <StatsCard
          count={processCount}
          label="In-Progress"
          variant="yellow"
          icon="/tandaseru.svg" // Ikon Tanda Seru besar
        />
        <StatsCard
          count={openCount}
          label="Open"
          variant="red"
          icon="/megaphone.svg"  // Ikon Megaphone besar
        />
      </div>

      <SearchBar />

      <DataTable data={tickets} loading={loading} onView={handleView} isAdmin={isAdmin} />

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