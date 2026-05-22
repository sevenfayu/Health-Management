export function RiskBadge({ risk }: { risk: string }) {
  const color = risk === "紧急" ? "bg-red-100 text-red-700" : risk === "高" ? "bg-orange-100 text-orange-700" : risk === "中" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700";
  return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{risk}</span>;
}
