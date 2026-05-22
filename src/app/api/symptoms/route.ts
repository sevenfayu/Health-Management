import { prisma } from "@/lib/prisma";
import { assessSymptom } from "@/lib/aiService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const symptom = await prisma.symptomEntry.create({ data: {
    symptomName: String(data.symptomName), startTime: new Date(String(data.startTime)), duration: String(data.duration), severity: Number(data.severity), bodyPart: data.bodyPart || null, triggers: data.triggers || null, associated: data.associated || null, relieved: String(data.relieved) === 'true', notes: data.notes || null
  }});
  const ai = await assessSymptom({ symptomName: symptom.symptomName, severity: symptom.severity, notes: symptom.notes ?? undefined, associated: symptom.associated ?? undefined });
  const assessment = await prisma.aiAssessment.create({ data: { symptomEntryId: symptom.id, ...ai } });
  await prisma.auditLog.create({data:{actor:'local-user',action:'CREATE',entityType:'SymptomEntry',entityId:symptom.id}});
  return NextResponse.json({ symptom, assessment });
}
