# AI全球个人医疗管理系统（MVP）

> 合规声明：本系统**不提供医学诊断、治疗方案或处方**。仅用于健康记录、风险提示与就医准备。

## 技术栈
- Next.js 14 + TypeScript + Tailwind CSS
- Prisma + SQLite
- API: Next.js Route Handlers
- AI: `src/lib/aiService.ts`（默认 mock）

## 功能
- 健康档案 `/profile`
- 症状日记 + AI 风险提示 `/symptoms`
- 生活习惯记录 `/lifestyle`
- 报告上传与元信息管理 `/records`
- AI 健康摘要 `/summary`
- 就医资料包 `/visit-pack`
- Dashboard `/`

## 快速开始
1. 安装依赖
```bash
npm install
```
2. 环境变量
```bash
cp .env.example .env
```
3. 初始化数据库
```bash
npx prisma generate
npx prisma migrate dev --name init
```
4. 启动
```bash
npm run dev
```

## 数据与安全（v1）
- 本地 SQLite 存储敏感健康数据。
- 预留 `AuditLog`、AI 服务抽象接口（后续可接鉴权、加密、审计增强）。
- `redFlagRules.ts` 内置红旗规则引擎，不依赖大模型。

## 后续接入真实 AI API
1. 在 `src/lib/aiService.ts` 内保留函数签名：
   - `assessSymptom(input)`
   - `generateHealthSummary(input)`
   - `generateVisitPack(input)`
2. 根据 `AI_MODE` 切换 mock/real。
3. 新增 provider 适配层（OpenAI/其他）并统一输出结构。

## 合规边界
- 不能输出诊断结论、治疗方案、处方。
- 必须展示免责声明。
- 红旗症状只给紧急就医提示，不下诊断。
