# AI Collab Foundation Project SOP

Last updated: 2026-06-28

## 1. Purpose

This document is the high-level operating flow for `ai-collab-foundation`.
It compresses the current authoritative SOP and the AI collaboration foundation product plan into one execution-ready summary.

It answers one question:

How do we go from an idea to a stable AI collaboration product using the Solutions workspace delivery system?

## 2. Core Principle

The system is not built by casually prompting AI.
It is built by chaining five things together:

1. document-first definition
2. Linear-driven execution
3. local evidence tracking
4. AI-managed implementation
5. human validation only at critical review gates

In short:

```text
Define -> Organize -> Execute -> Verify -> Compound
```

## 3. The Delivery SOP

Every new project or major feature follows the same upstream delivery sequence:

1. Turn the request into a written problem definition.
2. Produce a roadmap.
3. Produce a PRD.
4. Split the work into milestones and issues.
5. Sync milestones and issues to Linear.
6. Mirror active execution into local `docs/linear/`.
7. Let AI execute issue-by-issue with tests, validation, and evidence.
8. Require human `passed` only when the rules say manual validation is necessary.
9. Close the current issue fully before moving to the next one.

This means the project is not managed by chat history, memory, or git commits.
It is managed by:

- `roadmap`
- `PRD`
- `Linear`
- local `docs/linear/`
- code + tests + evidence

## 4. The Working Rules

### 4.1 Source of truth

Priority order:

1. latest PRD / roadmap
2. Linear issue
3. local `docs/linear/`
4. current code state

If they disagree, update the documents or issue first.
Do not guess.

### 4.2 Execution ownership

AI owns default execution:

- reading code and docs
- making changes
- running tests
- checking browser flows
- collecting evidence
- updating execution notes

John only needs to step in for:

- subjective product judgment
- UI/UX acceptance
- content quality judgment
- external account / platform confirmation
- real blockers that AI cannot clear

### 4.3 Issue lifecycle

Every issue must be completed in this order:

1. fill Business / Technical / AC / Test Plan / Manual Validation / Evidence
2. move to `In Progress`
3. implement
4. test
5. validate
6. record evidence
7. wait for `passed` if manual validation is required
8. move to `Done`
9. continue to the next issue

### 4.4 Serial execution rule

Execution must follow the active Linear issue list in order.

Rules:

1. start from the first not-yet-finished issue
2. complete the current issue fully before moving to the next one
3. set the issue to `In Progress` when implementation begins
4. run the planned tests after implementation
5. if UI or subjective validation is required, stop and wait for John's confirmation before moving the issue to `Done`
6. only after the current issue is confirmed `Done` may execution continue to the next issue
7. when all issues in the active batch are `Done`, stop and report completion to John instead of continuing automatically into new scope

## 5. The Product Flow Of AI Collab Foundation

`ai-collab-foundation` itself is an upstream system.
It is not a content tool, not a coding IDE, and not just a prompt layer.

Its job is:

```text
user context
  -> client recommendation
  -> MCP recommendation
  -> permissions and boundaries
  -> AI-OS generation
  -> workflow templates
  -> reusable rules
  -> downstream product reuse
```

### 5.1 Product goal

Help users configure a reusable AI collaboration system that can:

- work across Codex, Claude Code, Cursor, Copilot, ChatGPT, and others
- recommend the right default stack
- optionally connect external systems through MCP
- generate reusable workflow rules
- compound through real usage and retrospectives

### 5.2 User-facing flow

The user flow is:

1. AI workflow diagnosis
2. recommended client + model combination
3. optional MCP recommendations
4. permissions and risk boundaries
5. AI-OS generation
6. client adapter generation
7. real use in work
8. retrospective and rule capture
9. reuse in future projects and downstream products

## 6. The Default Product Path

The default recommended setup is:

```text
Codex
+ current recommended GPT-5 series high-reasoning model
+ Full Access
+ Goal Mode
+ Linear
+ local docs/linear mirror
```

Why this is the default:

- best fit for document-driven product work
- strongest path from PRD to implementation to test evidence
- good fit for Vibe Coding with real project control
- supports durable repo rules through `AGENTS.md`, config, skills, and MCP

This is a recommendation, not a lock-in.
Other clients are still supported through adaptation.

## 7. The MCP Layer

MCP is an option layer, not a startup requirement.

Users should be able to start without MCP.
But advanced users should be able to add real context and tool connectivity through MCP.

Priority MCP types:

1. project management MCP
   Linear and similar systems
2. database MCP
   schema, queries, debugging
3. knowledge index MCP
   custom knowledge retrieval
4. design reference MCP
   Mobbin, Figma, or equivalent reference context
5. developer docs MCP
   docs and API references

The product rule is:

- recommend only 1-3 highest-value MCPs first
- explain user value, not protocol details
- clearly state permission and fallback behavior

## 8. The UI/UX Flow

The UI is implemented through high-fidelity reference restoration, not a heavy design-system-first workflow.

Default build path:

```text
reference screenshots
  + PRD / roadmap
  + Codex
  + GPT
  + Playwright screenshot validation
```

Current visual structure:

### 8.1 Onboarding

Use the lightweight single-column onboarding reference.

Purpose:

- collect minimal required input
- keep pressure low
- move the user into diagnosis quickly

### 8.2 Configuration wizard

Use the stepper-and-card configuration reference.

Purpose:

- configure recommended stack
- configure GPT Token
- configure permissions
- configure MCP connections
- generate and sync AI-OS

### 8.3 Alignment rule

The onboarding screen may keep the lighter structure,
but its typography must align with the configuration flow:

- font color
- font size
- font weight
- heading hierarchy
- layout rhythm

## 9. The Output Chain

The product should generate:

- AI workflow diagnosis report
- recommended client and model report
- MCP recommendation report
- permissions and risk boundary rules
- AI-OS directory
- client adapter files
- workflow templates
- retrospective-driven rule candidates

These outputs then feed downstream systems such as:

- `ContentOps`
- `video-ops`
- `llm-gateway-provider`
- future energy or life-management systems

## 10. The Compounding Loop

The system only becomes valuable long-term if it compounds.

That loop is:

```text
diagnose
  -> configure
  -> use
  -> review
  -> extract rules
  -> sync updates
  -> improve future work
```

This means the product is not finished when setup is complete.
It becomes more useful when:

- rules are captured
- preferences are confirmed
- MCP choices are refined
- downstream products read the same context

## 11. One-Line Summary

`ai-collab-foundation` uses the Solutions delivery SOP to build an upstream AI collaboration system: define the work with roadmap and PRD, execute through Linear and local evidence, generate client + MCP + permission + workflow configuration for users, then let real usage and retrospectives continuously improve every future task.
