import { Eye, FilePenLine } from "lucide-react";

interface DataTableProps{
    onView: (item:any) => void;
    isAdmin?: boolean;
}

export default function DataTable({onView, isAdmin}: DataTableProps) {
  const data = [
    {
      resi: "040725-01",
      masalah: "Printer Tidak Terdeteksi di Jaringan",
      kategori: "Hardware",
      deskripsi:"Printer Canon di ruang TU yang sebelumnya dishare ke 5 komputer kini tidak terdeteksi di jaringan. Sudah dicoba install ulang driver dan restart komputer, namun tetap tidak berhasil.",
      status: "Pengajuan",
      tanggal: "2025-07-09",
    },
    {
      resi: "040725-02",
      masalah: "Website Resmi Tidak Bisa Diakses",
      kategori: "Software",
      deskripsi: "Pada tanggal 28 Juni 2025 pukul 09.00 WIB, website resmi Diskominfo tidak bisa diakses oleh publik. Pengunjung hanya melihat pesan 504 Gateway Timeout",
      status: "Pengajuan",
      tanggal: "2025-07-30",
    },
  ];

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
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 align-middle">{row.resi}</td>
                <td className="p-3 align-middle">{row.masalah}</td>
                {isAdmin && <td className="p-3">{row.kategori}</td>}
                <td className="p-3 align-middle">
                  <span
                    className={`px-2 py-1 rounded-md ${
                      row.status === "Pengajuan"
                        ? "bg-red-100 text-red-700"
                        : row.status === "Proses"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-3 align-middle">{row.tanggal}</td>
                <td
                  className="p-3 text-blue-600 cursor-pointer flex justify-center items-center"
                  onClick={() => onView(row)}>
                  {!isAdmin ? <Eye size={20} /> : <FilePenLine size={20} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

}
