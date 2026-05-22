import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.consultRequest.findMany({ orderBy: { createdAt: "desc" }, take: 30 });
  return NextResponse.json({ items });
}
