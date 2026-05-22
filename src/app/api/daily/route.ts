import { prisma } from "@/lib/prisma";
import { generateDailyHealthInsight, generateTCMObservation, parseDailyCheckIn } from "@/lib/aiService";
import { NextResponse } from "next/server";
import { DISCLAIMER } from "@/lib/types";

export async function POST(req: Request) {
  const data = await req.json();
  const rawText = String(data.rawText || "").trim();
  if (!rawText) return NextResponse.json({ error: "请填写今日记录" }, { status: 400 });
  const parsed = await parseDailyCheckIn(rawText);
  const insight = await generateDailyHealthInsight({ rawText, parsed });
  const tcm = await generateTCMObservation({ note: rawText });
  const checkIn = await prisma.dailyCheckIn.create({ data: { rawText, parsedJson: JSON.stringify(parsed), riskLevel: insight.riskLevel, riskNotice: insight.riskReminder, disclaimer: DISCLAIMER } });
  await prisma.tCMObservation.create({ data: { clueText: tcm.clue, disclaimer: DISCLAIMER } });
  await prisma.healthInsight.create({ data: { period: "today", summary: insight.todaySummary, riskReminder: insight.riskReminder, nextStep: insight.nextStep, disclaimer: DISCLAIMER } });
  await prisma.healthTimelineEvent.create({ data: { eventType: "每日记录", title: "新增每日健康记录", detail: rawText, riskLevel: insight.riskLevel, isUrgent: insight.riskLevel === "紧急" } });
  return NextResponse.json({ checkIn, parsed, insight, tcm });
}
