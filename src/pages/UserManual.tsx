// src/pages/UserManual.tsx
import {
  BookOpen,
  HelpCircle,
  FileText,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";
import Header from "@/components/Header";

export default function UserManual() {
  return (
    <div className="min-h-screen p-8 font-sans">
      {/* Header Section - Menggunakan komponen yang sama dengan AjukanLaporan */}
      <Header
        title="User Manual & Panduan"
        subtitle="Panduan lengkap penggunaan aplikasi Tokek"
      />

      {/* Card Container - Style yang sama dengan AjukanLaporan */}
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 space-y-8">
        
        {/* Section 1: Pengantar */}
        <div className="border-b border-gray-100 pb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <BookOpen className="text-[#E74C3C]" size={24} />
            Selamat Datang di Tokek
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Aplikasi Tokek (Ticketing & Klasifikasi) memudahkan Anda untuk
            melaporkan permasalahan fasilitas atau layanan. Berikut adalah
            panduan langkah demi langkah untuk menggunakan fitur utama aplikasi.
          </p>
        </div>

        {/* Section 2: Grid Panduan (Mirip grid input di form) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Panduan 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="flex items-center text-md font-medium text-gray-800">
              <FileText size={18} className="mr-2 text-gray-500" /> 
              Cara Mengajukan Laporan
            </h4>
            <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>1. Buka menu <span className="font-semibold text-[#E74C3C]">Ajukan Laporan</span> di sidebar.</p>
              <p>2. Isi data diri (Nama & Jenis Keanggotaan).</p>
              <p>3. Pilih tanggal kejadian masalah.</p>
              <p>4. Deskripsikan masalah secara detail.</p>
              <p>5. Klik tombol <span className="font-semibold">Ajukan Laporan</span>.</p>
            </div>
          </div>

          {/* Panduan 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="flex items-center text-md font-medium text-gray-800">
              <Search size={18} className="mr-2 text-gray-500" /> 
              Melihat Status Tiket
            </h4>
            <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>1. Masuk ke halaman <span className="font-semibold text-[#E74C3C]">Dashboard</span>.</p>
              <p>2. Lihat tabel daftar laporan Anda.</p>
              <p>3. Status tiket akan diperbarui secara real-time:</p>
              <ul className="list-disc list-inside pl-2 pt-1">
                <li><span className="text-red-600">Open</span>: Menunggu verifikasi.</li>
                <li><span className="text-yellow-600">In Progress</span>: Sedang dikerjakan.</li>
                <li><span className="text-green-600">Done</span>: Selesai diperbaiki.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: FAQ / Keterangan Tambahan */}
        <div className="flex flex-col gap-4 pt-4">
          <label className="flex items-center text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            <HelpCircle size={20} className="mr-2 text-gray-500" /> 
            Pertanyaan Umum (FAQ)
          </label>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-red-50 p-2 rounded-full text-[#E74C3C]">
                <Clock size={20} />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">Berapa lama laporan diproses?</h5>
                <p className="text-sm text-gray-500 mt-1">
                  Laporan biasanya akan diverifikasi oleh admin dalam waktu 1x24 jam pada hari kerja.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-red-50 p-2 rounded-full text-[#E74C3C]">
                <CheckCircle size={20} />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">Apakah saya bisa mengedit laporan?</h5>
                <p className="text-sm text-gray-500 mt-1">
                  Saat ini laporan yang sudah disubmit tidak dapat diedit. Silakan hubungi Customer Service jika ada kesalahan fatal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note (Mirip posisi tombol submit) */}
        <div className="pt-4 mt-4 border-t border-gray-100 text-center text-sm text-gray-400">
          Butuh bantuan lebih lanjut? Hubungi Customer Service.
        </div>
      </div>
    </div>
  );
}