import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/uploads", file.name);
  await writeFile(filePath, buffer);
  const row = await prisma.medicalRecord.create({ data: {
    fileName: file.name, fileType: file.type, category: String(formData.get("category") || "其他"), reportDate: new Date(String(formData.get("reportDate"))), note: String(formData.get("note") || "") || null, storagePath: filePath
  }});
  return NextResponse.json(row);
}
