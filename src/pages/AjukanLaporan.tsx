// src/pages/AjukanLaporan.tsx
import {
  User,
  Building,
  Calendar as CalendarIcon, // Rename icon agar tidak bentrok dengan komponen Calendar
  AlertTriangle,
  AlignLeft,
  Send,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { classifyText, createTicket } from "../api";

// Import komponen shadcn & date-fns
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Header from "@/components/Header";

export default function AjukanLaporan() {
  const [form, setForm] = useState({
    nama: "",
    instansi: "",
    tanggal: "", // Disimpan sebagai string "YYYY-MM-DD"
    masalah: "",
    deskripsi: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // State khusus untuk kontrol popover (opsional, biar nutup pas pilih)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Handler input teks biasa
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler khusus untuk Date Picker
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Format ke YYYY-MM-DD agar konsisten dengan backend / state sebelumnya
      setForm({ ...form, tanggal: format(date, "yyyy-MM-dd") });
      setIsCalendarOpen(false); // Tutup popover setelah memilih
    }
  };

  const handleReset = () => {
    setForm({
      nama: "",
      instansi: "",
      tanggal: "",
      masalah: "",
      deskripsi: "",
    });
    setSuccessMsg(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const textForPred = `${form.masalah}. ${form.deskripsi}`;
      const pred = await classifyText(textForPred);

      const payload = {
        ...form,
        category: pred.category,
      };

      const saved = await createTicket(payload);

      setSuccessMsg(`Laporan berhasil dikirim! ID Tiket: #${saved.id}`);
      handleReset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 font-sans">
      {/* Header Section */}
      <Header 
        title="Ajukan Laporan Permasalahan" 
        subtitle="Sampaikan kendala anda disini" 
      />

      {/* Card Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1: Nama, Jenis Keanggotaan, Tanggal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nama */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User size={18} className="mr-2 text-gray-500" /> Nama
              </label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 text-gray-800 outline-none focus:border-[#E74C3C] transition-colors bg-transparent placeholder-gray-300"
                placeholder="Masukkan nama anda"
                required
              />
            </div>

            {/* Jenis Keanggotaan */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Building size={18} className="mr-2 text-gray-500" /> Jenis
                Keanggotaan
              </label>
              <input
                type="text"
                name="instansi"
                value={form.instansi}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 text-gray-800 outline-none focus:border-[#E74C3C] transition-colors bg-transparent placeholder-gray-300"
                placeholder="Mahasiswa / Dosen / Staff"
                required
              />
            </div>

            {/* Tanggal Pengajuan (Shadcn Date Picker) */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <CalendarIcon size={18} className="mr-2 text-gray-500" /> Tanggal
                Pengajuan
              </label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal border-b border-gray-300 rounded-none px-0 py-2 h-auto hover:bg-transparent shadow-none text-gray-800",
                      !form.tanggal && "text-gray-400"
                    )}
                  >
                    {form.tanggal ? (
                      format(new Date(form.tanggal), "PPP")
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.tanggal ? new Date(form.tanggal) : undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Row 2: Permasalahan */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <AlertTriangle size={18} className="mr-2 text-gray-500" />{" "}
              Permasalahan
            </label>
            <input
              type="text"
              name="masalah"
              value={form.masalah}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-2 text-gray-800 outline-none focus:border-[#E74C3C] transition-colors bg-transparent placeholder-gray-300"
              placeholder="Tuliskan inti permasalahan"
              required
            />
          </div>

          {/* Row 3: Deskripsi */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <AlignLeft size={18} className="mr-2 text-gray-500" /> Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={6}
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 outline-none focus:border-[#E74C3C] focus:ring-1 focus:ring-[#E74C3C] transition-all resize-none placeholder-gray-300"
              placeholder="Jelaskan detail kendala yang anda alami..."
              required
            />
          </div>

          {/* Messages */}
          {successMsg && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              {successMsg}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#E74C3C] hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
            >
              <Send size={18} />
              {isLoading ? "Mengirim..." : "Ajukan Laporan"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white border border-[#E74C3C] text-[#E74C3C] hover:bg-red-50 px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <RotateCcw size={18} />
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}