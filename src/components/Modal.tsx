interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "> 
      <div className="bg-white rounded-lg shadow-lg w-[750px] p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detail Laporan</h2>

          <button
            className="text-gray-600 hover:text-black text-xl cursor-pointer"
            onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Isi Modal */}
        {children}
      </div>
    </div>
  );
}
