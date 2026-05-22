import { prisma } from "@/lib/prisma";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { generateTrendInsight } from "@/lib/aiService";

export default async function Page() {
  const daily = await prisma.dailyCheckIn.findMany({ take: 30, orderBy: { createdAt: "desc" } });
  const trend7 = await generateTrendInsight({ period: "7d", records: daily.slice(0, 7) });
  const trend30 = await generateTrendInsight({ period: "30d", records: daily });
  const today = await prisma.healthInsight.findFirst({ where: { period: "today" }, orderBy: { createdAt: "desc" } });
  return <div className="space-y-4"><h1 className="text-2xl font-bold">AI健康管家</h1><DisclaimerBox/><div className="grid md:grid-cols-2 gap-4"><div className="border rounded p-3"><h2 className="font-semibold">今日健康摘要</h2><p>{today?.summary || "暂无"}</p><p className="text-sm">西医风险提醒：{today?.riskReminder || "暂无"}</p><p className="text-sm">下一步建议：{today?.nextStep || "暂无"}</p></div><div className="border rounded p-3"><h2 className="font-semibold">最近7天趋势</h2><p>{trend7.summary}</p><p className="text-sm">{trend7.changes}</p><h2 className="font-semibold mt-2">最近30天趋势</h2><p>{trend30.summary}</p><p className="text-sm">{trend30.changes}</p></div></div></div>;
}
