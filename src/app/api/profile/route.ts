import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const created = await prisma.userProfile.create({ data: {
    name: String(data.name), gender: String(data.gender), birthYear: Number(data.birthYear), heightCm: Number(data.heightCm), weightKg: Number(data.weightKg),
    bloodType: data.bloodType || null, countryRegion: String(data.countryRegion), allergies: data.allergies || null, pastHistory: data.pastHistory || null, familyHistory: data.familyHistory || null, longTermMeds: data.longTermMeds || null, surgeries: data.surgeries || null, notes: data.notes || null
  }});
  await prisma.auditLog.create({data:{actor:'local-user',action:'CREATE',entityType:'UserProfile',entityId:created.id}});
  return NextResponse.json(created);
}
