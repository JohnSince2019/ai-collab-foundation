import Link from "next/link";
import { ArrowRight, BookOpenText, FolderTree, RefreshCcw, ShieldCheck } from "lucide-react";
import { Card, Pill, PrimaryButton, SectionTag, Shell, TopNav } from "@/components/ui";
import { buildAiOsArtifact, buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function buildQuery(input: IntakeInput) {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
}

export default async function AiOsPage({
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
  const artifact = buildAiOsArtifact(intake, diagnosis);
  const query = buildQuery(intake);

  return (
    <Shell className="pb-12">
      <TopNav />
      <main className="mx-auto mt-8 max-w-7xl space-y-6">
        <Card className="px-6 py-6 md:px-8 md:py-8">
          <SectionTag>AI-OS Output</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Reusable Operating Layer</div>
              <h1 className="mt-3 text-[34px] leading-[1.08] font-semibold text-slate-950 md:text-[48px]">
                这是你的第一版 AI-OS，可直接作为后续项目的起点。
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">{artifact.northStar}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Pill active>{artifact.workspaceName}</Pill>
                <Pill>{diagnosis.maturityLabel}</Pill>
                <Pill>{diagnosis.recommendedClients[0]?.name ?? "Recommended Stack"}</Pill>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
              <div className="text-sm font-semibold text-slate-900">推荐落地方式</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div><span className="font-medium text-slate-900">主力客户端：</span>{diagnosis.recommendedClients[0]?.name}</div>
                <div><span className="font-medium text-slate-900">默认权限：</span>{diagnosis.permissionMode}</div>
                <div><span className="font-medium text-slate-900">优先 MCP：</span>{diagnosis.recommendedMcp.slice(0, 2).map((item) => item.name).join("、")}</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              全局 operating rules
            </div>
            <div className="mt-5 space-y-3">
              {artifact.operatingRules.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FolderTree className="h-4 w-4 text-indigo-600" />
              建议创建的 AI-OS 文件
            </div>
            <div className="mt-5 space-y-3">
              {artifact.starterFiles.map((item) => (
                <div key={item.path} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">{item.path}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.purpose}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <BookOpenText className="h-4 w-4 text-sky-600" />
              客户端角色分工
            </div>
            <div className="mt-5 space-y-3">
              {artifact.clientProfiles.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.mission}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-500">{item.usage}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <RefreshCcw className="h-4 w-4 text-violet-600" />
              复利机制
            </div>
            <div className="mt-5 space-y-3">
              {artifact.memoryLoop.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">建议立刻执行的 5 个动作</div>
              <div className="mt-3 space-y-2">
                {artifact.firstActions.map((item) => (
                  <div key={item} className="text-sm leading-6 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FolderTree className="h-4 w-4 text-indigo-600" />
            AI-OS 文件内容预览
          </div>
          <div className="mt-5 space-y-4">
            {artifact.fileContents.map((item) => (
              <div key={item.path} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-sm font-semibold text-slate-900">{item.path}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.purpose}</div>
                </div>
                <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-slate-700 whitespace-pre-wrap">{item.content}</pre>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-slate-900">下一步</div>
              <div className="mt-1 text-sm text-slate-500">
                现在你已经有了第一版 AI-OS 骨架。下一步可以继续把它同步到客户端适配文件、MCP 勾选和真实项目目录。
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/configure?${query}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
              >
                返回配置
              </Link>
              <Link href={`/onboarding?${query}`}>
                <PrimaryButton>
                  重新生成
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </Shell>
  );
}
