# ContentOps Consumption Dry Run

最后更新：2026-06-28

## 1. 目的

这份文档不是伪装成“真实下游系统已经上线”，而是把 `JOH-193` 当前能被证明的最强证据再往前推进一步：

- 上游 7 组 ContentOps 产物已经存在
- 这些产物已经能按既定顺序被消费
- 消费后的结果已经落成一份可读母稿样例
- 样例里仍明确保留了缺失的真实业务证据

## 2. 消费顺序

当前可验证的消费顺序是：

1. `profile`
2. `boundaries`
3. `style-card`
4. `source-map`
5. `draft-context`
6. `mother-draft-prompt`
7. `mother-draft-sample`

这个顺序与 `setup-check` 页面展示一致，也与 `draft-context` 里的 `Draft Flow` 一致。

## 3. 每一步消费了什么

### Step 1: `profile`

输入：

- 用户定位：独立开发者
- North star：建立统一 AI 协作底座
- 目标受众：需要把复杂工作流结构化的开发者与产品型用户

输出到后续链路中的核心值：

- Positioning statement
- Audience
- Content pillars

### Step 2: `boundaries`

输入：

- Hard stops
- Review required
- Disallowed claims

输出到后续链路中的核心值：

- 不得跳过验证
- 不得编造来源
- 不得越过用户明确边界

### Step 3: `style-card`

输入：

- 专业、克制、直接
- 结论先行、工程导向
- 避免空泛宣传感

输出到后续链路中的核心值：

- 先结论后展开
- 保持结构化
- 避免营销腔和过度自信断言

### Step 4: `source-map`

输入：

- 先读 AI-OS 共享规则层
- 再读 PRD、Linear、docs/linear
- 缺少外部证据时不能编造

输出到后续链路中的核心值：

- Pre-draft sources
- Fallback plan
- 可用素材边界

### Step 5: `draft-context`

这是上面四层的压缩结果，已经聚合出：

- Positioning
- Audience
- Content pillars
- Hard stops
- Style tone
- Preferred formats
- Pre-draft sources
- Draft flow
- Review checklist

这一步的意义是：ContentOps 不再需要逐份拼接四个上游文件，可以直接读取一份联动上下文包。

### Step 6: `mother-draft-prompt`

`draft-context` 被继续转译成可执行 prompt，已经包含：

- Goal
- Positioning
- Audience
- Content pillars
- Hard stops
- Style tone
- Required flow
- Review checklist
- Output requirement

这一步的意义是：链路已经从“上下文存在”推进到“可直接驱动母稿生成”。

### Step 7: `mother-draft-sample`

当前样例已经体现：

- 标题、引子、一级结构、关键论点
- 结构与定位一致
- 风格与边界一致
- `Missing Evidence` 被显式保留

这一步的意义是：链路已经从“可生成”推进到“有一份可读、可审的干跑结果”。

## 4. 当前可证明到什么程度

当前可以被证明的是：

1. 上游 4 层上下文已经被压缩成 `draft-context`
2. `draft-context` 已被转译成 `mother-draft-prompt`
3. `mother-draft-prompt` 已生成一份 `mother-draft-sample`
4. 样例没有伪装成最终业务效果，而是显式标注了仍需补充的真实证据

因此，当前链路已经满足：

- 技术联动完成
- 消费顺序可验证
- 母稿干跑结果可阅读
- 业务证据缺口可见

## 5. 当前仍不能证明什么

当前仍不能直接证明的是：

1. 一个真实 ContentOps 下游模块已经在线读取这些文件并产出正式成稿
2. 真实发布场景下，这套链路的内容效果已经优于未注入上下文的方案

这也是为什么 `mother-draft-sample` 里的 `Missing Evidence` 仍然存在。

## 6. 对 JOH-193 的意义

这份 dry run 说明：

- `JOH-193` 不再只是“文件存在”
- 而是已经有一条从上游上下文到母稿样例的可审计消费链

如果验收口径是：

- “证明联动链路已形成，且干跑结果方向正确”

那么当前证据已经足以支持 `passed`。

如果验收口径是：

- “必须先看到真实 ContentOps 下游正式消费后的成稿效果”

那么还需要未来补一轮真实业务证据。
