import { prisma } from "@/lib/prisma";
import { DashboardCard } from "@/components/DashboardCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export default async function Dashboard() {
  const [today, urgent, last7, tcm] = await Promise.all([
    prisma.dailyCheckIn.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.healthTimelineEvent.count({ where: { isUrgent: true } }),
    prisma.dailyCheckIn.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) } } }),
    prisma.tCMObservation.findFirst({ orderBy: { createdAt: "desc" } })
  ]);
  return <div className="space-y-4"><h1 className="text-2xl font-bold">个人健康中控台</h1><DisclaimerBox/><div className="grid md:grid-cols-3 gap-4"><DashboardCard title="今日记录入口"><a className="text-medical-700 underline" href="/daily">去记录今天状态</a></DashboardCard><DashboardCard title="今日风险提醒"><p>{urgent > 0 ? `发现 ${urgent} 条高风险/紧急事件` : "暂无紧急事件"}</p></DashboardCard><DashboardCard title="7天趋势卡片"><p>近7天记录天数：{last7}</p></DashboardCard><DashboardCard title="中医观察卡片"><p className="text-sm">{tcm?.clueText.slice(0, 60) || "暂无观察线索"}</p></DashboardCard><DashboardCard title="人工咨询入口"><a className="text-medical-700 underline" href="/consult">发起咨询申请</a></DashboardCard><DashboardCard title="最近每日记录"><p className="text-sm">{today?.rawText || "暂无"}</p></DashboardCard></div></div>;
}
