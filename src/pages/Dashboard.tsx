// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { CheckCircle, AlertTriangle, Megaphone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getTickets } from "../api";

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

  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin-dashboard";

  useEffect(() => {
    (async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleView = (item: Ticket) => {
    setSelectedData(item);
    setIsOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <StatsCard count={tickets.filter(t=>t.status==="Selesai").length} label="Selesai" color="bg-green-500" icon={<CheckCircle />} />
        <StatsCard count={tickets.filter(t=>t.status==="Proses").length} label="Progress" color="bg-yellow-500" icon={<AlertTriangle />} />
        <StatsCard count={tickets.filter(t=>t.status==="Pengajuan").length} label="Pengajuan" color="bg-red-500" icon={<Megaphone />} />
      </div>

      <SearchBar />

      <DataTable data={tickets} loading={loading} onView={handleView} isAdmin={isAdmin} />

      <DetailLaporanModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={selectedData} isAdmin={isAdmin} />
    </div>
  );
}
