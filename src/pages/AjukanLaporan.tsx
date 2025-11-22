import {
  User,
  Building,
  Calendar,
  AlertTriangle,
  Menu,
  Send,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { classifyText, createTicket } from "../api"; // <-- Dari form baru

export default function AjukanLaporan() {
  // --- State dari form baru ---
  const [form, setForm] = useState({
    nama: "",
    instansi: "",
    tanggal: "",
    masalah: "",
    deskripsi: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [predKategori, setPredKategori] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // --- Handler dari form baru ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      nama: "",
      instansi: "",
      tanggal: "",
      masalah: "",
      deskripsi: "",
    });
    setPredKategori(null);
    setSuccessMsg(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setPredKategori(null);
    setIsLoading(true);

    try {
      // 1) Gabungkan text untuk prediksi
      const textForPred = `${form.masalah}. ${form.deskripsi}`;
      const pred = await classifyText(textForPred);

      setPredKategori(pred.category);

      // 2) Simpan tiket ke backend
      const payload = {
        ...form,
        category: pred.category,
      };

      const saved = await createTicket(payload);

      setSuccessMsg(`Tiket berhasil disimpan! ID: ${saved.id}`);
      handleReset(); // Gunakan handleReset yang sudah diupdate
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX/UI dari form lama ---
  return (
    <div className="max-w-8xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Ajukan Laporan Permasalahan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Bagian Informasi Dasar (Grid 3 Kolom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nama */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <User size={16} className="mr-2" /> Nama
            </label>
            <input
              type="text"
              name="nama" // <-- Diperlukan untuk handleChange
              value={form.nama}
              onChange={handleChange} // <-- Gunakan handler terpadu
              className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
              required
            />
          </div>

          {/* Jenis Keanggotaan */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Building size={16} className="mr-2" /> Jenis Keanggotaan
            </label>
            <input
              type="text"
              name="instansi" // <-- Diperlukan untuk handleChange
              value={form.instansi}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
              required
            />
          </div>

          {/* Tanggal */}
          <div className="relative">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Calendar size={16} className="mr-2" /> Tanggal Pengajuan
            </label>
            <input
              type="date"
              name="tanggal" // <-- Diperlukan untuk handleChange
              value={form.tanggal}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
              required
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
            name="masalah" // <-- Diperlukan untuk handleChange
            value={form.masalah}
            onChange={handleChange}
            placeholder="Judul atau topik permasalahan"
            className="w-full border-b border-gray-300 pb-1 outline-none focus:border-red-500 transition"
            required
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
            <Menu size={16} className="mr-2" /> Deskripsi
          </label>
          <textarea
            name="deskripsi" // <-- Diperlukan untuk handleChange
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Jelaskan permasalahan secara detail..."
            rows={5}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition resize-none"
            required
          />
        </div>

        <div className="space-y-3">

          {/* SUCCESS */}
          {successMsg && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg">
              {successMsg}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading} // <-- Dari form baru
            className="flex items-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold shadow-md shadow-red-300 transition disabled:bg-red-400"
          >
            <Send size={18} className="mr-2" />
            {isLoading ? "Memproses..." : "Ajukan Laporan"}
          </button>

          <button
            type="button"
            onClick={handleReset} // <-- Menggunakan handler baru
            disabled={isLoading} // <-- Nonaktifkan saat loading
            className="flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition disabled:bg-gray-300"
          >
            <RotateCcw size={18} className="mr-2" />
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}