import { prisma } from "@/lib/prisma";
import { generateVisitPack } from "@/lib/aiService";
import { VisitPackPreview } from "@/components/forms";
import { DisclaimerBox } from "@/components/DisclaimerBox";
export default async function Page(){const profile=await prisma.userProfile.findFirst();const symptoms=await prisma.symptomEntry.findMany({take:10,orderBy:{createdAt:'desc'}});const records=await prisma.medicalRecord.findMany(); const result=await generateVisitPack({profile,symptoms,records}); return <div className="space-y-4"><h1 className="text-xl font-bold">就医资料包</h1><DisclaimerBox/><VisitPackPreview markdown={result.markdown}/></div>}
