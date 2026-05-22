const redFlags = ["胸痛", "呼吸困难", "意识模糊", "突发肢体无力", "言语不清", "突发剧烈头痛", "人生最严重头痛", "持续高热", "严重腹痛", "黑便", "便血", "大量出血", "严重过敏反应", "喉头水肿", "孕产", "儿童严重症状"];

export function detectRedFlags(text: string): string[] {
  return redFlags.filter((f) => text.includes(f));
}

export function redFlagMessage(matches: string[]): string {
  if (!matches.length) return "未发现规则级红旗症状。";
  return `检测到可能需要紧急处理的风险信号（${matches.join("、")}）。系统不能诊断疾病，建议尽快线下就医或拨打急救电话。`;
}
