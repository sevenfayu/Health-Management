"use client";
import { useState } from "react";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export default function DailyPage() {
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setErr("");
    setResult(null);
    if (rawText.trim().length < 10) return setErr("请至少输入10个字");
    setLoading(true);
    try {
      const res = await fetch("/api/daily", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rawText }) });
      const json = await res.json();
      if (!res.ok) return setErr(json.error || "提交失败");
      setResult(json.parsed ?? json);
    } catch (error) {
      console.error("提交每日记录失败", error);
      setErr("网络异常，请稍后重试");
    } finally {
      setLoading(false);
    }
  };
  return <div className="space-y-4"><h1 className="text-2xl font-bold">每日健康记录</h1><DisclaimerBox/><textarea className="w-full border rounded p-3 h-40" value={rawText} onChange={(e)=>setRawText(e.target.value)} placeholder="例如：昨晚睡了5小时..."/><button className="bg-medical-700 text-white px-4 py-2 rounded disabled:opacity-60" onClick={submit} disabled={loading}>{loading ? "提交中..." : "保存并AI拆解"}</button>{err&&<p className="text-red-600">{err}</p>}{result&&<pre className="bg-slate-50 border p-3 text-xs overflow-auto">{JSON.stringify(result,null,2)}</pre>}</div>;
}
