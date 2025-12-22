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
  tanggal_pengajuan?: string;
}

interface DataTableProps {
  data: Ticket[];
  loading: boolean;
  onView: (item: Ticket) => void;
  isAdmin?: boolean;
  // Props baru untuk pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function DataTable({ 
  data, 
  loading, 
  onView, 
  isAdmin = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}: DataTableProps) {
  
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

  // Helper untuk membuat array nomor halaman (Contoh: 1, 2, 3 ... 10)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logika sederhana untuk menampilkan halaman di sekitar halaman aktif
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="text-gray-600 font-medium">Nomor Resi</TableHead>
            <TableHead className="text-gray-600 font-medium">Masalah</TableHead>
            
            {isAdmin && (
              <TableHead className="text-gray-600 font-medium">Kategori</TableHead>
            )}

            <TableHead className="text-center text-gray-600 font-medium">Status</TableHead>
            <TableHead className="text-center text-gray-600 font-medium">Tanggal Pengajuan</TableHead>
            <TableHead className="text-center text-gray-600 font-medium">{isAdmin ? "Tangani" : "View"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
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
                
                {isAdmin && (
                  <TableCell className="text-gray-600">{row.category ?? "Hardware"}</TableCell>
                )}

                <TableCell className="text-center">
                  {renderStatusBadge(row.status || "Pengajuan")}
                </TableCell>
                <TableCell className="text-center text-gray-500 font-medium">
                  {row.tanggal_pengajuan ? new Date(row.tanggal_pengajuan).toLocaleDateString() : "2025-07-09"}
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => onView(row)}
                  >
                    {isAdmin ? <FileText size={14} /> : <Eye size={14} />}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={isAdmin ? 6 : 5} className="text-center py-8 text-gray-400">
                Tidak ada data ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Dinamis */}
      {totalPages > 1 && onPageChange && (
        <div className="flex justify-end items-center gap-2 mt-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16}/>
          </Button>

          {getPageNumbers().map((page, index) => (
             typeof page === "number" ? (
              <Button
                key={index}
                className={`h-8 w-8 rounded-full p-0 text-sm ${
                  currentPage === page 
                    ? "bg-[#E74C3C] hover:bg-red-600 text-white" 
                    : "bg-transparent hover:bg-gray-100 text-gray-500 font-normal"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ) : (
              <span key={index} className="text-gray-400 text-xs px-1">...</span>
            )
          ))}

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16}/>
          </Button>
        </div>
      )}
    </div>
  );
}