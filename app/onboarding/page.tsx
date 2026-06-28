import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  Card,
  InputField,
  Pill,
  PrimaryButton,
  ProgressHeader,
  SectionTag,
  Shell,
  StatLine,
  TextareaField,
  TopNav,
} from "@/components/ui";

export default function OnboardingPage() {
  return (
    <Shell>
      <TopNav />
      <main className="mx-auto mt-8 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-8">
            <SectionTag>Onboarding</SectionTag>
            <ProgressHeader
              eyebrow="Minimal Intake"
              title="先收集最少但最有用的信息。"
              body="这个页面对应轻量单列 onboarding 参考，但在字体颜色、字号和节奏上与配置流程页对齐。目标是用最小输入换来可执行的推荐和配置。"
            />
            <div className="flex flex-wrap gap-2">
              <Pill active>少问</Pill>
              <Pill>快产出</Pill>
              <Pill>可编辑</Pill>
            </div>
            <StatLine title="会要求你输入什么" body="你的主要角色、核心目标、常用 AI 客户端、主要任务类型、风险顾虑。" />
            <StatLine title="你会得到什么" body="诊断结果、推荐客户端矩阵、权限建议、AI-OS 骨架和下游系统接入起点。" />
          </div>

          <Card className="px-5 py-5 md:px-8 md:py-8">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="text-sm font-semibold text-slate-900">开始生成你的 AI 协作底座</div>
                <div className="mt-1 text-sm text-slate-500">回答这几项后，系统会生成第一版协作配置。</div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                默认保守权限
              </div>
            </div>

            <form action="/diagnosis" className="mt-6">
              <div className="space-y-5">
                <InputField
                  name="role"
                  required
                  label="你是谁"
                  placeholder="例如：独立开发者 / 内容创作者 / 技术经理"
                  helper="决定推荐客户端、工作流模板和默认交付链路。"
                />
                <InputField
                  name="goal"
                  required
                  label="你最重要的目标"
                  placeholder="例如：建立稳定 AI 写作和产品开发协作流程"
                  helper="先记录接下来 3-6 个月最想达成的目标。"
                />
                <InputField
                  name="clients"
                  required
                  label="你常用哪些 AI 客户端"
                  placeholder="例如：Codex、ChatGPT、Cursor、Claude Code"
                  helper="系统会据此给出主力组合与替补矩阵。"
                />
                <TextareaField
                  name="tasks"
                  required
                  label="你最常让 AI 帮你做什么"
                  placeholder="例如：写 PRD、拆需求、改代码、内容策划、研究分析、复盘总结。"
                  helper="这里会直接影响生成的高频工作流模板。"
                />
                <TextareaField
                  name="concerns"
                  required
                  label="你最担心 AI 出什么问题"
                  placeholder="例如：乱改文件、误删、上下文不一致、风格跑偏、做完但没验证。"
                  helper="这些担忧会进入默认权限和确认机制。"
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton>
                  生成诊断与推荐
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <Link
                  href="/configure"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
                >
                  直接查看配置流程
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </Shell>
  );
}
