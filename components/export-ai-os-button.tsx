"use client";

import { useFormStatus } from "react-dom";
import { Download } from "lucide-react";

export function ExportAiOsButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      <Download className="h-4 w-4" />
      {pending ? "正在写出 AI-OS..." : "写出 AI-OS 文件"}
    </button>
  );
}
