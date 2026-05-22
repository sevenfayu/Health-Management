import { prisma } from "@/lib/prisma";
import { DashboardCard } from "@/components/DashboardCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { RiskBadge } from "@/components/RiskBadge";

export default async function Dashboard() {
  const symptoms = await prisma.symptomEntry.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { aiAssessment: true } });
  const records = await prisma.medicalRecord.count();
  const life = await prisma.lifestyleEntry.findFirst({ orderBy: { createdAt: "desc" } });
  return <div className="space-y-4"><h1 className="text-2xl font-bold">AI全球个人医疗管理系统 MVP</h1><DisclaimerBox/><div className="grid md:grid-cols-3 gap-4"><DashboardCard title="最近症状">{symptoms.map(s=><div key={s.id} className="flex justify-between"><span>{s.symptomName}</span><RiskBadge risk={s.aiAssessment?.riskLevel ?? "低"}/></div>)}</DashboardCard><DashboardCard title="报告数量"><p>{records}</p></DashboardCard><DashboardCard title="最近生活习惯"><p>{life ? `睡眠 ${life.sleepHours}h, 压力 ${life.stressLevel}/10` : "暂无"}</p></DashboardCard></div></div>;
}
