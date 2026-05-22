const redFlags = ["胸痛", "呼吸困难", "意识模糊", "突发肢体无力", "言语不清", "人生最严重头痛", "持续高热", "严重腹痛", "黑便", "便血", "大量出血", "严重过敏", "喉头水肿", "孕", "儿童严重症状"];

export function detectRedFlags(text: string): string[] {
  return redFlags.filter((f) => text.includes(f));
}

export function redFlagMessage(matches: string[]): string {
  if (!matches.length) return "未发现规则级红旗症状。";
  return `检测到红旗关键词：${matches.join("、")}。请尽快急诊或线下就医，本系统不提供诊断。`;
}
