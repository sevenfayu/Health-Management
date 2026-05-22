import { detectRedFlags, redFlagMessage } from "./redFlagRules";
import { DISCLAIMER, RiskLevel } from "./types";

export async function assessSymptom(input: { symptomName: string; severity: number; notes?: string; associated?: string; }): Promise<{ riskLevel: RiskLevel; suggestedDepartment: string; offlineVisitSuggested: boolean; followupQuestions: string; prepMaterials: string; redFlagNotice: string; disclaimer: string; }> {
  const text = `${input.symptomName} ${input.notes ?? ""} ${input.associated ?? ""}`;
  const flags = detectRedFlags(text);
  let riskLevel: RiskLevel = "低";
  if (flags.length) riskLevel = "紧急";
  else if (input.severity >= 8) riskLevel = "高";
  else if (input.severity >= 5) riskLevel = "中";
  return { riskLevel, suggestedDepartment: flags.length ? "急诊科" : "全科/内科", offlineVisitSuggested: flags.length || input.severity >= 7, followupQuestions: "症状是否持续加重？是否影响日常活动？是否伴随发热或呕吐？", prepMaterials: "既往检查报告、用药清单、过敏史、症状时间线", redFlagNotice: redFlagMessage(flags), disclaimer: DISCLAIMER };
}

export async function parseDailyCheckIn(rawText: string) {
  return {
    sleep: { durationHours: rawText.includes("5小时") ? 5 : 7, quality: rawText.includes("疲劳") ? 2 : 3, dreams: rawText.includes("多梦"), wakeFatigue: rawText.includes("疲劳") },
    diet: { spicy: rawText.includes("辣"), greasy: rawText.includes("油"), sweet: rawText.includes("甜"), waterIntakeL: 1.5, postMealReaction: rawText.includes("腹胀") ? "饭后腹胀" : "无明显不适" },
    bowel: { texture: rawText.includes("稀") ? "偏稀" : "正常", frequency: 1, abdominalPain: rawText.includes("腹痛") },
    tongue: { thickness: rawText.includes("厚") ? "偏厚" : "中等", coatingColor: "白", tongueColor: "淡红" },
    symptoms: [{ symptomName: rawText.includes("头痛") ? "头痛" : "一般不适", severity: rawText.includes("轻微") ? 3 : 5 }]
  };
}

export async function generateDailyHealthInsight(input: { rawText: string; parsed: Record<string, unknown> }) {
  const matches = detectRedFlags(input.rawText);
  const risk = matches.length ? "紧急" : "中";
  return { todaySummary: "今日记录显示睡眠、消化与轻度不适相关波动。", riskReminder: redFlagMessage(matches), nextStep: "继续记录明日睡眠/饮食/大便变化；若症状持续加重尽快线下就医。", riskLevel: risk, disclaimer: DISCLAIMER };
}

export async function generateTrendInsight(input: { period: "7d" | "30d"; records: unknown[] }) {
  return { period: input.period, summary: `${input.period === "7d" ? "近7天" : "近30天"}整体趋势为轻度波动，建议关注睡眠与消化表现。`, changes: "睡眠时长下降时，腹胀与疲劳更常见。", disclaimer: DISCLAIMER };
}

export async function generateTCMObservation(input: { note: string }) {
  return { clue: "以下为中医观察维度的线索，不构成诊断，需由合格中医师辨证确认。记录提示可能存在脾胃运化与作息失衡相关线索，建议继续观察舌苔/大便/口干口苦变化。", disclaimer: DISCLAIMER, input };
}

export async function generateConsultSummary(input: { recentSummary: string; mainQuestion: string }) {
  return { summary: `咨询主问题：${input.mainQuestion}。附带近30天健康摘要：${input.recentSummary}。建议医生重点查看症状时间线、体征变化与红旗风险。`, disclaimer: DISCLAIMER };
}

export async function generateHealthSummary(input: { profile: unknown; symptoms: unknown[]; lifestyle: unknown[]; records: unknown[]; }) { return { overview: "基于已记录信息，当前处于可持续观察阶段；请持续记录关键指标。", discomfort: "近期有症状记录，建议关注持续时间与严重程度变化。", risks: "存在潜在生活方式与症状相关风险因素，需继续随访。", advice: "若症状持续或加重，请线下就医并携带历史记录。", doctorBrief: "患者有连续健康日志与症状条目，已整理就医资料包。", nextQuestions: "是否需要进一步实验室检查？是否存在需排查的急性风险？", disclaimer: DISCLAIMER }; }
export async function generateVisitPack(input: Record<string, unknown>) { return { markdown: `# 就医资料包\n\n> ${DISCLAIMER}\n\n- 主诉：见近期症状\n- 现病史：见系统汇总\n- 建议科室：全科/内科\n`, disclaimer: DISCLAIMER, input }; }
