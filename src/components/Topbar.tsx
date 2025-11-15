import { User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full flex justify-end items-center p-4">
      <div className="flex items-center gap-2 cursor-pointer">
        <User size={22} />
        <span className="font-medium">Yoru Sora</span>
      </div>
    </div>
  );
}
