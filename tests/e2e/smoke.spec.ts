import { expect, test } from "@playwright/test";

test("home and key flows render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("先配置协作系统，再让不同 AI 客户端替你工作。")).toBeVisible();

  await page.goto("/onboarding");
  await expect(page.getByText("先收集最少但最有用的信息。")).toBeVisible();

  await page.goto("/configure");
  await expect(page.getByText("先给出一套默认推荐，再解释为什么。")).toBeVisible();
});
