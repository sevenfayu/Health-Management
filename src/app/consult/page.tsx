"use client";
import { useEffect, useState } from "react";
import { DisclaimerBox } from "@/components/DisclaimerBox";

const types = ["西医咨询", "中医咨询", "健康管家", "报告解读", "国际第二意见"];

export default function Page() {
  const [form, setForm] = useState({ consultType: types[0], mainQuestion: "", urgency: "普通", preferredMethod: "图文" });
  const [msg, setMsg] = useState("");
  const [list, setList] = useState<any[]>([]);
  const submit = async () => {
    if (form.mainQuestion.trim().length < 5) return setMsg("主要问题至少5个字");
    const res = await fetch("/api/consult", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    if (!res.ok) return setMsg(json.error || "提交失败");
    setMsg("提交成功");
    setList((v) => [json.consult, ...v]);
  };
  useEffect(() => { fetch("/api/consult/list").then(r=>r.json()).then(d=>setList(d.items||[])).catch(()=>{}); }, []);
  return <div className="space-y-4"><h1 className="text-2xl font-bold">人工咨询入口</h1><DisclaimerBox/><div className="grid gap-2 md:grid-cols-2"><select className="border p-2" value={form.consultType} onChange={(e)=>setForm({...form,consultType:e.target.value})}>{types.map(t=><option key={t}>{t}</option>)}</select><select className="border p-2" value={form.urgency} onChange={(e)=>setForm({...form,urgency:e.target.value})}><option>普通</option><option>加急</option><option>紧急</option></select><select className="border p-2" value={form.preferredMethod} onChange={(e)=>setForm({...form,preferredMethod:e.target.value})}><option>图文</option><option>电话</option><option>视频</option></select></div><textarea className="border rounded p-3 w-full h-32" placeholder="请描述主要问题" value={form.mainQuestion} onChange={(e)=>setForm({...form,mainQuestion:e.target.value})}/><button className="bg-medical-700 text-white px-4 py-2 rounded" onClick={submit}>提交咨询申请</button>{msg&&<p>{msg}</p>}<div className="space-y-2">{list.map(i=><div key={i.id} className="border rounded p-2"><p>{i.consultType} · {i.status}</p><p className="text-sm">{i.mainQuestion}</p></div>)}</div></div>;
}
