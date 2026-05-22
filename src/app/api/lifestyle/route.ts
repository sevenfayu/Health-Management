import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const row = await prisma.lifestyleEntry.create({ data: {
    sleepHours: Number(data.sleepHours), diet: String(data.diet), waterIntakeL: Number(data.waterIntakeL), exercise: String(data.exercise), stressLevel: Number(data.stressLevel), smokingAlcohol: String(data.smokingAlcohol), caffeine: String(data.caffeine), notes: data.notes || null
  }});
  return NextResponse.json(row);
}
