interface HeaderProps {
  title: string;
  subtitle?: string; // Opsional, karena mungkin ada halaman tanpa subtitle
  logoSrc?: string;  // Opsional, defaultnya logo telkom
}

export default function Header({
  title,
  subtitle,
  logoSrc = "/telkom_logo_1.svg", // Default logo jika tidak diisi
}: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      <div>
        <img src={logoSrc} alt="Logo Instansi" className="h-12" />
      </div>
    </div>
  );
}