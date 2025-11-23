// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { Check, AlertCircle, Megaphone } from "lucide-react"; // Gunakan icon yang pas
import { useLocation } from "react-router-dom";
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
  // const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
        // Fallback dummy data jika API mati, supaya UI terlihat
        setTickets([
            { id: 1, resi: "#TCK-1021", masalah: "Login gagal pada aplikasi", category: "Hardware", status: "Selesai", created_at: "2025-07-09" },
            { id: 2, resi: "#TCK-1022", masalah: "Login gagal pada aplikasi", category: "Software", status: "Proses", created_at: "2025-07-09" },
            { id: 3, resi: "#TCK-1023", masalah: "Login gagal pada aplikasi", category: "IT Support", status: "Selesai", created_at: "2025-07-09" },
            { id: 4, resi: "#TCK-1024", masalah: "Login gagal pada aplikasi", category: "Hardware", status: "Pengajuan", created_at: "2025-07-09" },
            { id: 5, resi: "#TCK-1025", masalah: "Login gagal pada aplikasi", category: "Cloud Services", status: "Pengajuan", created_at: "2025-07-09" },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleView = (item: Ticket) => {
    setSelectedData(item);
    setIsOpen(true);
  };

  // Hitung jumlah untuk stats
  const doneCount = tickets.filter(t => (t.status || "").toLowerCase() === "selesai").length || 0;
  const processCount = tickets.filter(t => (t.status || "").toLowerCase() === "proses").length || 0;
  const openCount = tickets.filter(t => (t.status || "").toLowerCase() === "pengajuan").length || 0;

  return (
    <div className="min-h-screen p-8 font-sans">
      {/* Header Section */}
      <Header 
        title="Ticket Dashboard" 
        subtitle="Lihat status tiket dan daftar tiket aktif"
      />

      {/* Stats Cards */}
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

      {/* Search & Filter */}
      <SearchBar />

      {/* Table Section */}
      <DataTable data={tickets} loading={loading} onView={handleView} />

      {/* Modal */}
      <DetailLaporanModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedData}
      />
    </div>
  );
}