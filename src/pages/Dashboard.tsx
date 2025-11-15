import { useState } from "react";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DetailLaporanModal from "../components/DetailLaporanModal";
import { CheckCircle, AlertTriangle, Megaphone } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleView = (item: any) => {
    setSelectedData(item);
    setIsOpen(true);
  };

  const { pathname } = useLocation();
  const isaAdmin = pathname === "/admin-dashboard";

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6">
        <StatsCard
          count={10}
          label="Selesai"
          color="bg-green-500"
          icon={<CheckCircle />}
        />
        <StatsCard
          count={1}
          label="Progress"
          color="bg-yellow-500"
          icon={<AlertTriangle />}
        />
        <StatsCard
          count={0}
          label="Pengajuan"
          color="bg-red-500"
          icon={<Megaphone />}
        />
      </div>

      {/* Search & Filters */}
      <SearchBar />

      {/* Table - kirim handleView ke DataTable */}
      <DataTable onView={handleView} isAdmin={isaAdmin} />

      {/* Modal Detail */}
      <DetailLaporanModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedData}
        isAdmin={isaAdmin}
      />
    </div>
  );
}
