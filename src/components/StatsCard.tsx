interface StatsCardProps {
  count: number;
  label: string;
  color: string; // tailwind color class
  icon: React.ReactNode;
}

export default function StatsCard({
  count,
  label,
  color,
  icon,
}: StatsCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-6 rounded-lg shadow text-white font-semibold ${color}`}>
      <div>
        <p className="text-3xl">{count}</p>
        <p className="opacity-90">{label}</p>
      </div>
      <div className="text-4xl opacity-80">{icon}</div>
    </div>
  );
}
