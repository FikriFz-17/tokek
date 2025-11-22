// src/components/DataTable.tsx
import { Eye, FilePenLine } from "lucide-react";

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
  isAdmin?: boolean;
}

export default function DataTable({ data, loading, onView, isAdmin }: DataTableProps) {
  if (loading) {
    return (
      <div className="mt-4 p-6 bg-white rounded-lg shadow text-center">
        Loading data...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-4 p-6 bg-white rounded-lg shadow text-center">
        Belum ada tiket.
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-center align-middle">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-3">No Resi</th>
            <th className="p-3">Masalah</th>
            {isAdmin && <th className="p-3">Kategori</th>}
            <th className="p-3">Status</th>
            <th className="p-3">Tanggal Pengajuan</th>
            {!isAdmin ? (
              <th className="p-3">View</th>
            ) : (
              <th className="p-3">Tangani</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 align-middle">{row.resi ?? row.id}</td>
              <td className="p-3 align-middle">{row.masalah}</td>

              {isAdmin && <td className="p-3">{row.category ?? "-"}</td>}

              <td className="p-3 align-middle">
                <span
                  className={`px-2 py-1 rounded-md ${
                    row.status === "Pengajuan" || row.status === "pending"
                      ? "bg-red-100 text-red-700"
                      : row.status === "Proses" || row.status === "progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {row.status ?? "Pengajuan"}
                </span>
              </td>

              <td className="p-3 align-middle">{row.created_at ? new Date(row.created_at).toLocaleString() : "-"}</td>

              <td
                className="p-3 text-blue-600 cursor-pointer flex justify-center items-center"
                onClick={() => onView(row)}
              >
                {!isAdmin ? <Eye size={20} /> : <FilePenLine size={20} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
