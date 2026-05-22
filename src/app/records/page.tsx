import { RecordUploadForm } from "@/components/forms";
import { prisma } from "@/lib/prisma";
import { DisclaimerBox } from "@/components/DisclaimerBox";
export default async function Page(){const rows=await prisma.medicalRecord.findMany({orderBy:{createdAt:'desc'}}); return <div className="space-y-4"><h1 className="text-xl font-bold">医疗报告上传</h1><DisclaimerBox/><RecordUploadForm/><ul className="bg-white border rounded p-4">{rows.map(r=><li key={r.id}>{r.fileName} - {r.category}</li>)}</ul></div>}
