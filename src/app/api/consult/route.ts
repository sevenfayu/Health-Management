import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateConsultSummary } from "@/lib/aiService";
import { DISCLAIMER } from "@/lib/types";

export async function POST(req: Request) {
  const data = await req.json();
  const mainQuestion = String(data.mainQuestion || "").trim();
  if (!mainQuestion) return NextResponse.json({ error: "主要问题必填" }, { status: 400 });
  const daily = await prisma.dailyCheckIn.findMany({ take: 30, orderBy: { createdAt: "desc" } });
  const recentSummary = daily.map((d) => d.rawText).join("；").slice(0, 500) || "近30天暂无详细记录";
  const generated = await generateConsultSummary({ recentSummary, mainQuestion });
  const consult = await prisma.consultRequest.create({ data: { consultType: String(data.consultType || "健康管家"), mainQuestion, urgency: String(data.urgency || "普通"), preferredMethod: String(data.preferredMethod || "文字"), status: "待处理", summary: generated.summary, disclaimer: DISCLAIMER } });
  await prisma.healthTimelineEvent.create({ data: { eventType: "咨询", title: `咨询申请：${consult.consultType}`, detail: consult.mainQuestion, riskLevel: consult.urgency === "紧急" ? "高" : "中", isUrgent: consult.urgency === "紧急" } });
  return NextResponse.json({ consult });
}
