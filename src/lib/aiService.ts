import { detectRedFlags, redFlagMessage } from "./redFlagRules";
import { DISCLAIMER, RiskLevel } from "./types";

export async function assessSymptom(input: { symptomName: string; severity: number; notes?: string; associated?: string; }): Promise<{ riskLevel: RiskLevel; suggestedDepartment: string; offlineVisitSuggested: boolean; followupQuestions: string; prepMaterials: string; redFlagNotice: string; disclaimer: string; }> {
  const text = `${input.symptomName} ${input.notes ?? ""} ${input.associated ?? ""}`;
  const flags = detectRedFlags(text);
  let riskLevel: RiskLevel = "低";
  if (flags.length) riskLevel = "紧急";
  else if (input.severity >= 8) riskLevel = "高";
  else if (input.severity >= 5) riskLevel = "中";
  return {
    riskLevel,
    suggestedDepartment: flags.length ? "急诊科" : input.symptomName.includes("头") ? "神经内科" : "全科/内科",
    offlineVisitSuggested: flags.length || input.severity >= 7,
    followupQuestions: "症状是否持续加重？是否影响日常活动？是否夜间加重？",
    prepMaterials: "既往检查报告、用药清单、过敏史、症状时间线",
    redFlagNotice: redFlagMessage(flags),
    disclaimer: DISCLAIMER
  };
}

export async function generateHealthSummary(input: { profile: unknown; symptoms: unknown[]; lifestyle: unknown[]; records: unknown[]; }) {
  return {
    overview: "基于已记录信息，当前处于可持续观察阶段；请持续记录关键指标。",
    discomfort: "近期有症状记录，建议关注持续时间与严重程度变化。",
    risks: "存在潜在生活方式与症状相关风险因素，需继续随访。",
    advice: "若症状持续或加重，请线下就医并携带历史记录。",
    doctorBrief: "患者有连续健康日志与症状条目，已整理就医资料包。",
    nextQuestions: "是否需要进一步实验室检查？是否存在需排查的急性风险？",
    disclaimer: DISCLAIMER
  };
}

export async function generateVisitPack(input: Record<string, unknown>) {
  return {
    markdown: `# 就医资料包\n\n> ${DISCLAIMER}\n\n- 主诉：见近期症状\n- 现病史：见系统汇总\n- 建议科室：全科/内科\n`,
    disclaimer: DISCLAIMER,
    input
  };
}
