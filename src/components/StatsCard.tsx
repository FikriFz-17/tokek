import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  count: number;
  label: string;
  variant: "green" | "yellow" | "red";
  icon: string;
}

export default function StatsCard({ count, label, variant, icon }: StatsCardProps) {
  // 1. Definisikan warna background yang "keras" agar menimpa default putih
  const styles = {
    green: "bg-[#6CC070]/80", // Hijau Cerah
    yellow: "bg-[#F4C542]/80", // Kuning Amber
    red: "bg-[#E53935]/80",    // Merah
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-none shadow-md h-36 flex items-center py-0", 
        styles[variant] // Masukkan class warna di sini
      )}
    >
      {/* Bagian Kiri: Angka & Label */}
      <div className="flex justify-between w-full items-center">
        <div className="z-10 flex flex-col justify-center px-6 text-white">
          <span className="text-5xl font-bold leading-none mb-1">{count}</span>
          <span className="text-xl font-medium opacity-90">{label}</span>
        </div>
        <img src={icon} />
      </div>
      {/* Bagian Kanan: Dekorasi Lingkaran & Icon */}
      {/* Lingkaran transparan di pojok kanan */}
      {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-40 h-40 bg-white/20 rounded-full flex items-center justify-center pointer-events-none"> */}
         {/* Icon di tengah lingkaran */}
         {/* <div className="text-white transform -translate-x-1/4 opacity-80 [&>svg]:w-16 [&>svg]:h-16">
         </div>
      </div> */}
    </Card>
  );
}