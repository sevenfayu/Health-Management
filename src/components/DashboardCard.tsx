export function DashboardCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="bg-white rounded-lg border p-4"><h3 className="font-semibold mb-2">{title}</h3>{children}</section>;
}
