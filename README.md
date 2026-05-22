# AI全球个人医疗管理系统（V2）

> 合规声明：本系统仅用于健康记录、风险提示和就医准备，不能替代医生诊疗；如有严重或持续症状，请及时线下就医或拨打急救电话。

## 技术栈
- Next.js 14 + TypeScript + Tailwind CSS
- Prisma + SQLite
- API: Next.js Route Handlers
- AI: `src/lib/aiService.ts`（mock，未训练模型）

## V2核心页面
- 个人健康中控台 `/`
- 每日健康记录 `/daily`
- 健康时间线 `/timeline`
- AI健康管家 `/insights`
- 中医观察 `/tcm`
- 人工咨询入口 `/consult`
- 保留 V1 页面：`/profile` `/symptoms` `/lifestyle` `/records` `/summary` `/visit-pack`

## Prisma 模型（V2新增）
- DailyCheckIn
- DietEntry
- SleepEntry
- ExerciseEntry
- WeightEntry
- VitalSignEntry
- BowelEntry
- TongueEntry
- MoodEntry
- MedicationEntry
- TCMObservation
- ConsultRequest
- HealthInsight
- HealthTimelineEvent

保留：UserProfile、SymptomEntry、LifestyleEntry、MedicalRecord、AiAssessment、AuditLog。

## AI mock 能力
`src/lib/aiService.ts` 新增：
- `parseDailyCheckIn(rawText)`
- `generateDailyHealthInsight(input)`
- `generateTrendInsight(input)`
- `generateTCMObservation(input)`
- `generateConsultSummary(input)`

## 红旗规则
`src/lib/redFlagRules.ts` 扩展识别胸痛、呼吸困难、意识模糊、卒中样症状、持续高热、严重腹痛、黑便/便血、大量出血、严重过敏反应、喉头水肿、孕产相关严重不适、儿童严重症状等，并统一输出谨慎提示。

## 快速开始
```bash
npm install
npx prisma generate
npx prisma migrate dev --name v2
npm run dev
```

## 构建检查
```bash
npm run build
```

若遇到 npm 网络问题，请在本地完成 `npm install` 后再执行 `npm run build` 验证；不要删除功能代码。

## 合规边界
- 不做真实诊断、治疗方案或处方。
- 不接真实医院系统。
- 不做真实医生聊天和支付。
- 所有页面展示免责声明。
