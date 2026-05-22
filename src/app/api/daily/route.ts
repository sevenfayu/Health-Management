import { prisma } from "@/lib/prisma";
import { generateDailyHealthInsight, generateTCMObservation, parseDailyCheckIn } from "@/lib/aiService";
import { NextResponse } from "next/server";
import { DISCLAIMER } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const rawText = String(data.rawText || "").trim();
    if (!rawText) return NextResponse.json({ error: "请填写今日记录" }, { status: 400 });

    const parsed = await parseDailyCheckIn(rawText);
    const insight = await generateDailyHealthInsight({ rawText, parsed });
    const tcm = await generateTCMObservation({ note: rawText });

    const notesPayload = {
      structuredData: parsed?.structuredData,
      sleep: parsed?.sleep,
      diet: parsed?.diet,
      bowel: parsed?.bowel,
      tcm: parsed?.tcm,
      symptoms: parsed?.symptoms,
      disclaimer: DISCLAIMER,
    };

    const checkIn = await prisma.dailyCheckIn.create({
      data: {
        rawText,
        riskLevel: insight.riskLevel,
        notes: JSON.stringify(notesPayload),
        aiSummary: JSON.stringify({
          parsed,
          insight,
          tcm,
        }),
      },
    });

    await prisma.tCMObservation.create({ data: { clueText: tcm.clue, disclaimer: DISCLAIMER } });
    await prisma.healthInsight.create({ data: { period: "today", summary: insight.todaySummary, riskReminder: insight.riskReminder, nextStep: insight.nextStep, disclaimer: DISCLAIMER } });
    await prisma.healthTimelineEvent.create({ data: { eventType: "每日记录", title: "新增每日健康记录", detail: rawText, riskLevel: insight.riskLevel, isUrgent: insight.riskLevel === "紧急" } });

    return NextResponse.json({
      success: true,
      dailyCheckIn: checkIn,
      parsed,
    });
  } catch (error) {
    console.error("POST /api/daily failed", error);
    return NextResponse.json({ error: "保存失败，请稍后再试" }, { status: 500 });
  }
}
