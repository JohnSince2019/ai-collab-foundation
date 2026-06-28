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
});
