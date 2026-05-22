import { prisma } from "@/lib/prisma";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export default async function Page() {
  const obs = await prisma.tCMObservation.findMany({ take: 20, orderBy: { createdAt: "desc" } });
  const tongues = await prisma.tongueEntry.findMany({ take: 20, orderBy: { createdAt: "desc" } });
  const bowels = await prisma.bowelEntry.findMany({ take: 20, orderBy: { createdAt: "desc" } });
  return <div className="space-y-4"><h1 className="text-2xl font-bold">中医观察</h1><DisclaimerBox/><p className="text-sm bg-amber-50 border border-amber-300 p-2">以下为中医观察维度的线索，不构成诊断，需由合格中医师辨证确认。</p><div className="border rounded p-3"><h2 className="font-semibold">观察线索</h2>{obs.map(o=><p key={o.id} className="text-sm mt-2">{o.clueText}</p>)}</div><div className="grid md:grid-cols-2 gap-4"><div className="border rounded p-3"><h3 className="font-semibold">舌苔记录</h3>{tongues.map(t=><p key={t.id} className="text-sm">{t.tongueColor}/{t.coatingColor}/{t.thickness}</p>)}</div><div className="border rounded p-3"><h3 className="font-semibold">大便记录</h3>{bowels.map(b=><p key={b.id} className="text-sm">{b.texture} 颜色:{b.color || "未填"}</p>)}</div></div></div>;
}
