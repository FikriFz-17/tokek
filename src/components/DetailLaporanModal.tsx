import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface DetailLaporanModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isAdmin?: boolean;
  onUpdateStatus?: (newStatus: string) => void;
  onUpdateKategori?: (newKategori: string) => void;
}

export default function DetailLaporanModal({
  isOpen,
  onClose,
  data,
  isAdmin = false,
  onUpdateStatus,
  onUpdateKategori,
}: DetailLaporanModalProps) {
  const [status, setStatus] = useState("");
  const [kategori, setKategori] = useState("");

  // Sync state saat data berubah
  useEffect(() => {
    if (data) {
      setStatus(data.status || "Pengajuan");
      setKategori(data.category || "");
    }
  }, [data]);

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Laporan #{data.resi ?? data.id}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Masalah</Label>
            <div className="col-span-3 text-sm">{data.masalah}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Deskripsi</Label>
            <div className="col-span-3 text-sm text-gray-600">{data.deskripsi}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Tanggal</Label>
            <div className="col-span-3 text-sm">
               {data.created_at ? new Date(data.created_at).toLocaleString() : "-"}
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold">Admin Actions</h3>
            
            <div className="flex items-center gap-4">
              <div className="grid w-full gap-1.5">
                <Label>Update Status</Label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pengajuan">Pengajuan</SelectItem>
                        <SelectItem value="Proses">Proses</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <Button 
                className="mt-5" 
                onClick={() => onUpdateStatus && onUpdateStatus(status)}
              >
                Update
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid w-full gap-1.5">
                <Label>Override Kategori</Label>
                <Input 
                    value={kategori} 
                    onChange={(e) => setKategori(e.target.value)} 
                />
              </div>
              <Button 
                variant="secondary" 
                className="mt-5"
                onClick={() => onUpdateKategori && onUpdateKategori(kategori)}
              >
                Simpan
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}