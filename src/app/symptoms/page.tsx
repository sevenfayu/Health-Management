import { SymptomForm } from "@/components/forms";
import { prisma } from "@/lib/prisma";
import { RiskBadge } from "@/components/RiskBadge";
import { DisclaimerBox } from "@/components/DisclaimerBox";
export default async function Page(){const list=await prisma.symptomEntry.findMany({orderBy:{createdAt:'desc'},include:{aiAssessment:true}}); return <div className="space-y-4"><h1 className="text-xl font-bold">症状日记</h1><DisclaimerBox/><SymptomForm/><div className="bg-white border rounded p-4 space-y-2">{list.map(x=><div key={x.id} className="border-b pb-2"><div className="flex gap-2 items-center"><b>{x.symptomName}</b><RiskBadge risk={x.aiAssessment?.riskLevel ?? '低'}/></div><p>{x.aiAssessment?.redFlagNotice}</p></div>)}</div></div>}
