# M5 Linear Seeding Pack

最后更新：2026-06-28

这个文件用于把 `M5 · 多产品上下文中心` 从 PRD 拆成可执行 issue，并作为同步到 Linear 的依据。

## M5 目标

让 video-ops、LLM Gateway 和其他系统接入统一上下文，而不是各自维护一套碎片化配置。

## M5 对应 PRD 交付

- 产品级上下文 API
- SyncTarget 管理
- LLM Gateway 路由准备
- video-ops CreatorProfile 对接

## 建议创建的 Issues

1. `M5-01 · 产品级上下文 API 定义`
2. `M5-02 · SyncTarget 管理模型`
3. `M5-03 · LLM Gateway 路由准备`
4. `M5-04 · video-ops CreatorProfile 对接`

## 建议执行顺序

1. 先定义统一上下文 API
2. 再定义 SyncTarget，明确哪些系统消费哪些上下文
3. 再给 LLM Gateway 做路由准备
4. 最后完成 video-ops 的真实接入验证

## 建议状态

- `M5-01`: Todo
- `M5-02`: Todo
- `M5-03`: Todo
- `M5-04`: Todo

## 为什么 M5 要这样拆

- 先有 API 和 SyncTarget，后面接 video-ops 和 LLM Gateway 才不会反复返工
- 这个拆法也符合“先抽象统一中心，再接具体产品”的系统设计路径
