import Modal from "./Modal";
import { useState } from "react";

interface DetailLaporanModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isAdmin?: boolean;
  onUpdateStatus?: (newStatus: string) => void;
  onEdit?: () => void;
  onUpdateKategori?: (newKategori: string) => void;
}


export default function DetailLaporanModal({
  isOpen,
  onClose,
  data,
  isAdmin = false,
  onUpdateStatus,
  onEdit,
  onUpdateKategori,
}: DetailLaporanModalProps) {
  const [status, setStatus] = useState(data?.status || "");
  const [kategori, setKategori] = useState(data?.kategori || "");

  if (!data) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleUpdate = () => {
    if (onUpdateStatus) onUpdateStatus(status);
  };

  const handleKategoriUpdate = () => {
    if (onUpdateKategori) onUpdateKategori(kategori);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-2xl w-auto space-y-3">
        {/* Data Laporan */}
        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold text-gray-700">Masalah:</span>
          <span className="text-gray-800">{data.masalah}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold text-gray-700">Tanggal Pengajuan:</span>
          <span className="text-gray-800">{data.tanggal}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold text-gray-700">Status:</span>
          <span className="text-gray-800">{data.status}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold text-gray-700">Deskripsi:</span>
          <span className="text-gray-800">{data.deskripsi}</span>
        </div>

        {/* Form admin */}
        {isAdmin && (
          <form
            className="border-t border-gray-300 mt-4 pt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            {/* Update Status */}
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700">
                Update Status:
              </label>
              <select
                className="border border-gray-300 rounded px-2 py-1"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Set
              </button>
            </div>

            {/* Override kategori */}
            <div className="grid grid-cols-2 gap-2">
              <label className="font-semibold text-gray-700">
                Kategori Prediksi:
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
              onClick={handleKategoriUpdate}
            >
              Simpan Kategori
            </button>

            {onEdit && (
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={onEdit}
              >
                Edit Laporan
              </button>
            )}
          </form>
        )}
      </div>
    </Modal>
  );
}
