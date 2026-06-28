# JOH-193 Review Pack

最后更新：2026-06-28

对应 issue：

- `JOH-193` `M4-05 · 母稿生成上下文注入与联动验收`
- Linear 当前状态：`In Progress`

## 1. 本次要验什么

这次验收只针对 `M4-05` 的母稿生成上下文注入与联动结果。

需要确认的核心点：

1. 上游四层上下文是否已完整注入母稿生成链路：
   - `profile`
   - `boundaries`
   - `style-card`
   - `source-map`
2. 是否已形成可直接被 ContentOps 或下游 LLM 消费的联动上下文包：
   - `draft-context`
   - `mother-draft-prompt`
3. `AI-OS` 页面、导出目录、`setup-check` 页面是否都能看到这套联动产物
4. 自动化回归是否覆盖了这些联动文件与用户侧入口

## 2. 当前结论

当前实现已经满足以上前 3 项的技术与结构要求，且自动化验证已通过。

2026-06-28 更新：

- `AI-OS` 页面已新增：
  - `Draft Context Bundle`
  - `Draft Context 字段说明`
  - `Mother Draft Prompt`
  - `Prompt 字段说明`
- 导出目录已新增：
  - `AI-OS/contentops/draft-context.md`
  - `AI-OS/contentops/draft-context.json`
  - `AI-OS/contentops/mother-draft-prompt.md`
  - `AI-OS/contentops/mother-draft-prompt.json`
- `setup-check` 页面已新增 `ContentOps 联动产物检查`
- `npm run build` / `npm run typecheck` / `npm run test:e2e` 已通过
- 2026-06-28 晚些时候已再次按 `build -> typecheck -> test:e2e` 复跑，结果仍全部通过

当前唯一未跨过的门：

- 这张 issue 仍需要 John 对“跨产品联动与内容效果”给出最终 `passed`

因此当前建议状态是：

- 技术实现：`passed`
- 最终联动验收：`awaiting John passed`

## 3. 关键证据

### 联动文件清单

当前 ContentOps 联动文件已完整导出为：

- `AI-OS/contentops/profile.md`
- `AI-OS/contentops/profile.json`
- `AI-OS/contentops/boundaries.md`
- `AI-OS/contentops/boundaries.json`
- `AI-OS/contentops/style-card.md`
- `AI-OS/contentops/style-card.json`
- `AI-OS/contentops/source-map.md`
- `AI-OS/contentops/source-map.json`
- `AI-OS/contentops/draft-context.md`
- `AI-OS/contentops/draft-context.json`
- `AI-OS/contentops/mother-draft-prompt.md`
- `AI-OS/contentops/mother-draft-prompt.json`
- `AI-OS/contentops/mother-draft-sample.md`
- `AI-OS/contentops/mother-draft-sample.json`

### 当前最关键的导出物

母稿上下文包：

- [draft-context.md](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/contentops/draft-context.md)
- [draft-context.json](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/contentops/draft-context.json)

母稿 prompt 包：

- [mother-draft-prompt.md](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/contentops/mother-draft-prompt.md)
- [mother-draft-prompt.json](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/contentops/mother-draft-prompt.json)

母稿干跑样例：

- [mother-draft-sample.md](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/contentops/mother-draft-sample.md)
- [mother-draft-sample.json](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/contentops/mother-draft-sample.json)

### 页面截图证据

当前本地截图已落盘：

- [ai-os.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-193/ai-os.png)
- [setup-check.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-193/setup-check.png)

### 关键联动逻辑

当前实现已经把：

- 用户定位
- 内容边界
- 表达风格
- 高频素材来源

汇总成两个更接近真实使用的下游入口：

1. `draft-context.*`
   - 用于母稿生成前统一读取关键上下文
2. `mother-draft-prompt.*`
   - 用于直接把这套上下文转成可执行的母稿生成提示
3. `mother-draft-sample.*`
   - 用于干跑检查母稿结构是否合理，以及哪些真实证据仍待补充

### 用户侧验收入口

`setup-check` 页面现在已经可以显式核对：

- ContentOps 联动文件是否存在
- 联动读取顺序是否明确：
  - `profile`
  - `boundaries`
  - `style-card`
  - `source-map`
  - `draft-context`
  - `mother-draft-prompt`

这意味着当前联动结果不再只是“导出了一些 JSON”，而是已经具备面向用户的检查入口。

### 自动化回归

已通过：

- `npm run build`
- `npm run typecheck`
- `npm run test:e2e`

其中 `tests/e2e/smoke.spec.ts` 已覆盖：

- `AI-OS/contentops/*.md/json` 文件可见
- `Draft Context Bundle`
- `Mother Draft Prompt`
- `setup-check` 中的 `ContentOps 联动产物检查`

## 4. Codex 当前验收结论

如果只看“技术联动是否完成”，当前结论已经足够明确：

- 上游上下文已注入
- 下游可消费文件已生成
- 用户侧检查入口已存在
- 自动化验证已通过

所以 Codex 当前给出的结构性判断是：

- `JOH-193` 已达到“可交给 John 做最终 passed / not passed 判断”的状态

## 5. 当前还缺什么

当前唯一缺口不是实现，也不是自动化，而是：

- John 是否认可这套联动结果已经足以代表“ContentOps 真正能消费该上下文”
- John 是否认可这套母稿上下文与 prompt 包已经达到目标中的“联动验收完成”

也就是说，这不是代码 blocker，而是最终业务验收门。

## 5.1 John 最终 passed 只需要看什么

为了避免最终验收再次变成泛化讨论，John 只需要确认三件事：

1. `draft-context` 是否已经把 ContentOps 在母稿生成前真正需要的定位、边界、风格、来源顺序压缩到位
2. `mother-draft-prompt` 是否已经足够作为下游 LLM 的直接输入，而不是还需要大量人工二次改写
3. `mother-draft-sample` 是否已经体现“结构对、方向对、缺失证据有明确标注”，从而可作为联动样例成立

如果以上三项判断均为“是”，则可以给 `JOH-193` 最终 `passed`。

## 6. 下一步唯一允许动作

当前按既定规则，下一步只能是：

1. John 给出 `passed` 或要求补充
2. 若 `passed`：
   - 将 `JOH-193` 更新为 `Done`
   - 将 `M4` 统一收口
   - 再决定是否进入 `M5`
