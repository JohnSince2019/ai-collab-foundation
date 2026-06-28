import Link from "next/link";
import { ArrowRight, CheckCircle2, FolderKanban, LockKeyhole, Sparkles } from "lucide-react";
import { Card, Pill, PrimaryButton, SectionTag, Shell, TopNav } from "@/components/ui";
import { buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function DiagnosisPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const intake: IntakeInput = {
    role: getFirst(params.role),
    goal: getFirst(params.goal),
    clients: getFirst(params.clients),
    tasks: getFirst(params.tasks),
    concerns: getFirst(params.concerns),
  };

  const diagnosis = buildDiagnosis(intake);
  const configureHref = `/configure?role=${encodeURIComponent(intake.role)}&goal=${encodeURIComponent(intake.goal)}`;

  return (
    <Shell className="pb-12">
      <TopNav />
      <main className="mx-auto mt-8 max-w-7xl space-y-6">
        <Card className="px-6 py-6 md:px-8 md:py-8">
          <SectionTag>Diagnosis Result</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workflow Maturity</div>
              <h1 className="mt-3 text-[34px] leading-[1.08] font-semibold text-slate-950 md:text-[48px]">
                你现在最需要的不是更多 prompt，而是一套统一协作规则。
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">{diagnosis.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Pill active>{diagnosis.roleLabel}</Pill>
                <Pill>{diagnosis.maturityLabel}</Pill>
                <Pill>Score {diagnosis.maturityScore}</Pill>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
              <div className="text-sm font-semibold text-slate-900">本次输入摘要</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div><span className="font-medium text-slate-900">角色：</span>{intake.role || "未填写"}</div>
                <div><span className="font-medium text-slate-900">目标：</span>{intake.goal || "未填写"}</div>
                <div><span className="font-medium text-slate-900">客户端：</span>{intake.clients || "未填写"}</div>
                <div><span className="font-medium text-slate-900">高频任务：</span>{intake.tasks || "未填写"}</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              核心诊断
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">当前瓶颈</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.bottleneck}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">默认推荐理由</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.defaultStackReason}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">权限起点</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.permissionMode}</div>
              </div>
            </div>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <LockKeyhole className="h-4 w-4 text-emerald-600" />
              第一版 AI-OS 关注点
            </div>
            <div className="mt-5 space-y-3">
              {diagnosis.aiOsFocus.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div className="text-sm leading-6 text-slate-600">{item}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FolderKanban className="h-4 w-4 text-sky-600" />
              建议优先生成的工作流模板
            </div>
            <div className="mt-5 space-y-3">
              {diagnosis.workflowTemplates.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="text-sm font-semibold text-slate-900">下一步</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              先进入配置流程，确认主力客户端、MCP 连接层和默认权限，再生成第一版 AI-OS 骨架。
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={configureHref}>
                <PrimaryButton>
                  进入配置流程
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
              <Link
                href="/onboarding"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
              >
                返回修改输入
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </Shell>
  );
}
