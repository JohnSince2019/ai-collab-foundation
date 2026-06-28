import { expect, test } from "@playwright/test";

test("home and key flows render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("先配置协作系统，再让不同 AI 客户端替你工作。")).toBeVisible();

  await page.goto("/onboarding");
  await expect(page.getByText("先收集最少但最有用的信息。")).toBeVisible();
  await page.getByLabel("你是谁").fill("独立开发者");
  await page.getByLabel("你最重要的目标").fill("建立统一 AI 协作底座");
  await page.getByLabel("你常用哪些 AI 客户端").fill("Codex、Cursor、ChatGPT");
  await page.getByLabel("你最常让 AI 帮你做什么").fill("写 PRD、拆需求、改代码、复盘");
  await page.getByLabel("你最担心 AI 出什么问题").fill("乱改文件、上下文不一致、做完没验证");
  await page.getByRole("button", { name: "生成诊断与推荐" }).click();
  await expect(page.getByText("你现在最需要的不是更多 prompt，而是一套统一协作规则。")).toBeVisible();
  await expect(page.getByText("独立开发者")).toBeVisible();
  await page.getByRole("link", { name: "进入配置流程" }).click();

  await expect(page.getByText("先给出一套默认推荐，再解释为什么。")).toBeVisible();
  await expect(page.getByText("建立统一 AI 协作底座")).toBeVisible();
  await page.getByRole("link", { name: "继续生成 AI-OS" }).click();
  await expect(page.getByText("这是你的第一版 AI-OS，可直接作为后续项目的起点。")).toBeVisible();
  await expect(page.getByText("AI-OS/identity.md").first()).toBeVisible();
  await expect(page.getByText("AI-OS/clients/claude-code.md").first()).toBeVisible();
  await expect(page.getByText("AI-OS/clients/cursor.md").first()).toBeVisible();
  await expect(page.getByText("AI-OS/clients/copilot.md").first()).toBeVisible();
  await expect(page.getByText("AI-OS/install/adapter-setup.md").first()).toBeVisible();
  await expect(page.getByText("AI-OS/install/target-locations.md").first()).toBeVisible();
  await expect(page.getByText("AI-OS/install/verification-checklist.md").first()).toBeVisible();
  await expect(page.getByText("所有客户端共享同一套目标、角色、任务边界与输出标准。").first()).toBeVisible();
  await expect(page.getByText("# Identity")).toBeVisible();
  await expect(page.getByText("# Claude Code Client Profile")).toBeVisible();
  await expect(page.getByText("# Adapter Setup Guide")).toBeVisible();
  await expect(page.getByText("# Target Locations")).toBeVisible();
  await expect(page.getByText("# Verification Checklist")).toBeVisible();
  await expect(page.getByText("# Rules")).toBeVisible();
  await page.getByRole("button", { name: "写出 AI-OS 文件" }).click();
  await expect(page.getByText("AI-OS 已写出到本地目录")).toBeVisible();
  await expect(page.getByText(/generated-ai-os/)).toBeVisible();
});
