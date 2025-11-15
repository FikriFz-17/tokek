import {
  User,
  Building,
  Calendar,
  AlertTriangle,
  Menu,
  Paperclip,
  Send,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

export default function AjukanLaporan() {
  // State untuk form (lebih bagus untuk integrasi backend nanti)
  const [form, setForm] = useState({
    nama: "",
    instansi: "",
    tanggal: "",
    masalah: "",
    deskripsi: "",
  });

  const handleReset = () => {
    setForm({
      nama: "",
      instansi: "",
      tanggal: "",
      masalah: "",
      deskripsi: "",
    });
  };

  return (
    <div className="max-w-8xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Ajukan Laporan Permasalahan
      </h2>

      <form className="space-y-8">
        {/* --- Bagian Informasi Dasar (Grid 3 Kolom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nama */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <User size={16} className="mr-2" /> Nama
            </label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Jenis Keanggotaan */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Building size={16} className="mr-2" /> Jenis Keanggotaan
            </label>
            <input
              type="text"
              value={form.instansi}
              onChange={(e) => setForm({ ...form, instansi: e.target.value })}
              className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Tanggal */}
          <div className="relative">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Calendar size={16} className="mr-2" /> Tanggal Pengajuan
            </label>

            <input
              type="date"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
            />
          </div>
        </div>

        {/* Permasalahan */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
            <AlertTriangle size={16} className="mr-2" /> Permasalahan
          </label>
          <input
            type="text"
            value={form.masalah}
            onChange={(e) => setForm({ ...form, masalah: e.target.value })}
            placeholder="Judul atau topik permasalahan"
            className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
            <Menu size={16} className="mr-2" /> Deskripsi
          </label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            placeholder="Jelaskan permasalahan secara detail..."
            rows={5}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition resize-none"
          />
        </div>

        {/* Lampiran */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
            <Paperclip size={16} className="mr-2" /> Lampiran (Opsional)
          </label>

          <div className="w-full border-2 border-dashed border-gray-300 p-8 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <input type="file" className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="cursor-pointer block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 10a5 5 0 01-10 0v-2a3 3 0 013-3h3"
                />
              </svg>

              <p className="mt-2 text-sm text-gray-600">
                Klik untuk upload file
              </p>
              <p className="text-xs text-gray-500">
                Format: JPG, PNG (Max 5MB)
              </p>
            </label>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold shadow-md shadow-red-300 transition">
            <Send size={18} className="mr-2" />
            Ajukan Laporan
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition">
            <RotateCcw size={18} className="mr-2" />
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
