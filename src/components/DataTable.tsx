// src/components/DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface Ticket {
  id: number;
  resi?: string;
  masalah: string;
  category?: string;
  deskripsi?: string;
  status?: string;
  created_at?: string;
}

interface DataTableProps {
  data: Ticket[];
  loading: boolean;
  onView: (item: Ticket) => void;
  isAdmin?: boolean; // Tambahkan prop ini
}

export default function DataTable({ data, loading, onView, isAdmin = false }: DataTableProps) {
  if (loading) return <div className="p-6 text-center">Loading...</div>;

  const renderStatusBadge = (status: string) => {
    let styles = "";
    let label = status;

    const s = status?.toLowerCase();
    if (s === "selesai" || s === "done") {
      styles = "bg-[#66BB6A] text-white";
      label = "Selesai";
    } else if (s === "proses" || s === "progress" || s === "in-progress") {
      styles = "bg-[#FBC02D] text-white";
      label = "In-Progress";
    } else {
      styles = "bg-[#E53935] text-white";
      label = "Open";
    }

    return (
      <span className={`px-4 py-1 rounded-full text-xs font-bold ${styles}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="text-gray-600 font-medium">Nomor Resi</TableHead>
            <TableHead className="text-gray-600 font-medium">Masalah</TableHead>
            
            {/* HANYA MUNCUL JIKA ADMIN */}
            {isAdmin && (
              <TableHead className="text-gray-600 font-medium">Kategori</TableHead>
            )}

            <TableHead className="text-center text-gray-600 font-medium">Status</TableHead>
            <TableHead className="text-center text-gray-600 font-medium">Tanggal Pengajuan</TableHead>
            <TableHead className="text-center text-gray-600 font-medium">{isAdmin ? "Tangani" : "View"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-50 h-16">
              <TableCell className="font-medium text-gray-600">
                {row.resi ?? `#TCK-${1020 + row.id}`}
              </TableCell>
              <TableCell className="max-w-[200px]">
                <div className="font-medium text-gray-800 leading-tight">
                  {row.masalah}
                </div>
                <div className="text-xs text-gray-400 mt-1">aplikasi mobile</div>
              </TableCell>
              
              {/* HANYA MUNCUL JIKA ADMIN */}
              {isAdmin && (
                <TableCell className="text-gray-600">{row.category ?? "Hardware"}</TableCell>
              )}

              <TableCell className="text-center">
                {renderStatusBadge(row.status || "Pengajuan")}
              </TableCell>
              <TableCell className="text-center text-gray-500 font-medium">
                {row.created_at ? row.created_at.split('T')[0] : "2025-07-09"}
              </TableCell>
              <TableCell className="text-center">
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="cursor-pointer"
                  // className="bg-black hover:bg-gray-800 text-white rounded-md h-8 w-8"
                  onClick={() => onView(row)}
                >
                  {isAdmin ? <FileText size={14} /> : <Eye size={14} />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-6">
        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={16}/></Button>
        <Button className="h-8 w-8 rounded-full bg-[#E74C3C] hover:bg-red-600 text-white p-0 text-sm">1</Button>
        <Button variant="ghost" className="h-8 w-8 p-0 text-sm font-normal text-gray-500">2</Button>
        <Button variant="ghost" className="h-8 w-8 p-0 text-sm font-normal text-gray-500">3</Button>
        <span className="text-gray-400 text-xs">...</span>
        <Button variant="ghost" className="h-8 w-8 p-0 text-sm font-normal text-gray-500">5</Button>
        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={16}/></Button>
      </div>
    </div>
  );
}