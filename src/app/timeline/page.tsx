import { prisma } from "@/lib/prisma";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const type = (await searchParams).type || "全部";
  const rows = await prisma.healthTimelineEvent.findMany({ where: type === "全部" ? {} : { eventType: type }, orderBy: { eventTime: "desc" }, take: 100 });
  const filters = ["全部", "每日记录", "症状", "报告", "AI评估", "中医观察", "咨询"];
  return <div className="space-y-4"><h1 className="text-2xl font-bold">健康时间线</h1><DisclaimerBox/><div className="flex gap-2 flex-wrap">{filters.map(f=><a key={f} className={`px-3 py-1 border rounded ${f===type?"bg-medical-700 text-white":""}`} href={`/timeline?type=${f}`}>{f}</a>)}</div><div className="space-y-2">{rows.map(r=><div key={r.id} className={`border rounded p-3 ${r.isUrgent?"border-red-500 bg-red-50":""}`}><p className="font-semibold">[{r.eventType}] {r.title}</p><p className="text-sm">{r.detail}</p><p className="text-xs text-slate-500">{new Date(r.eventTime).toLocaleString("zh-CN")} {r.riskLevel ? `· 风险${r.riskLevel}` : ""}</p></div>)}</div></div>;
}
