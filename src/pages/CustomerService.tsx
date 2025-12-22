// src/pages/CustomerService.tsx
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  MapPin
} from "lucide-react";
import Header from "@/components/Header";

export default function CustomerService() {
  return (
    <div className="min-h-screen p-8 font-sans">
      {/* WRAPPER UTAMA: Agar konten berada di tengah dan tidak terlalu lebar */}
      <div className="space-y-8">
        
        {/* Header Section */}
        <Header
          title="Customer Service"
          subtitle="Hubungi kami melalui saluran layanan di bawah ini"
        />

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          
          {/* Section: Kontak Utama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Card WhatsApp */}
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl border border-green-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-white p-4 rounded-full mb-4 shadow-sm text-green-600">
                <MessageCircle size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">WhatsApp</h4>
              <p className="text-sm text-gray-500 mb-5">Chat Only • 08:00 - 17:00</p>
              <button className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm text-sm">
                +62 812-3456-7890
              </button>
            </div>

            {/* Card Email */}
            <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl border border-blue-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-white p-4 rounded-full mb-4 shadow-sm text-blue-600">
                <Mail size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">Email Support</h4>
              <p className="text-sm text-gray-500 mb-5">Respon maks. 1x24 Jam</p>
              <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm">
                help@tokek.id
              </button>
            </div>

            {/* Card Call Center */}
            <div className="flex flex-col items-center p-6 bg-orange-50 rounded-xl border border-orange-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-white p-4 rounded-full mb-4 shadow-sm text-orange-600">
                <Phone size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">Call Center</h4>
              <p className="text-sm text-gray-500 mb-5">Layanan Darurat 24 Jam</p>
              <button className="w-full py-2.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors shadow-sm text-sm">
                (022) 756-4108
              </button>
            </div>
          </div>

          {/* Section: Informasi Tambahan */}
          <div className="border-t border-gray-100 pt-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Jam Operasional */}
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 text-base">Jam Operasional Kantor</h5>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Senin - Jumat: 08:00 - 17:00 WIB<br />
                    Sabtu - Minggu: Libur (Hanya Call Center)
                  </p>
                </div>
              </div>

              {/* Lokasi */}
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 text-base">Lokasi Kantor Pusat</h5>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Gedung Telkom University, <br/>
                    Jl. Telekomunikasi No. 1, Bandung, Jawa Barat
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}