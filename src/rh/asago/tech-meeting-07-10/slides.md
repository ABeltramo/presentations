---
marp: true
theme: asago
title: Asago Tech Recap
paginate: true
date: 2026-10-07
---

<!-- _class: title -->

# Asago *Tech Recap*

Quick update on what we've been working on..

---

<!-- _class: api-diagram sources -->

## Asago Server *ADR*

We've created the [architecture-decision-records repository](https://github.com/asago-ai/architecture-decision-records) and started [ADR 0001](https://github.com/asago-ai/architecture-decision-records/pull/1)

> **External caller**\
> CLI / notebook
>
> **Proposed Asago Server: one REST API**
>
> - Policy Mapper
> - Scenario Generator
> - Artifact Generator

- Each component remains **independently usable as a Python package**.
- Stateless server with **versioned API and data contracts**.
- The **caller owns orchestration and storage**. Evaluation remains external.

---

<!-- _class: callout sources -->

## *Automated* repository upkeep

| Change | Current behavior | Merged PR |
| --- | --- | --- |
| **Dependabot + CodeQL** | Dependabot checks `uv` and GitHub Actions weekly. Ruff, format checks, and mypy run in CI. | [#83](https://github.com/asago-ai/asago-policy-mapper/pull/83) |
| **Python dependencies** | The workflow auto-merges patch/minor updates. Major updates require manual review. | [#92](https://github.com/asago-ai/asago-policy-mapper/pull/92) |
| **GitHub Actions** | The workflow auto-merges all update types, including major versions. | [#93](https://github.com/asago-ai/asago-policy-mapper/pull/93) |
| **Ollama integration test** | Inference preflight tests and diagnostic artifacts expose backend failures. | [#94](https://github.com/asago-ai/asago-policy-mapper/pull/94) |

> **Auto-merge requires `test`, `test-slow`, and `Ruff` to pass.**

---

<!-- _class: cards credits teal -->

## Welcome, and *thank you*!

- ### Namit Patel · [@Namit2003](https://github.com/Namit2003)

  **Namit’s first PR in this repository merged on October 2.**

  Undefined precision/recall now uses `None`, not `0.0`.

  [Issue #71](https://github.com/asago-ai/asago-policy-mapper/issues/71) → [Merged PR #81](https://github.com/asago-ai/asago-policy-mapper/pull/81)

- ### Janam Patel · [@janampatel](https://github.com/janampatel)

  **Janam’s first issue in this repository opened on October 4.**

  The proposal adds pluggable decision-model backends for the borderline-risk judge.

  [Issue #95](https://github.com/asago-ai/asago-policy-mapper/issues/95) · Open proposal

**Thanks also to our earlier contributors:**\
[@amott-rh](https://github.com/amott-rh) · [@vanatallin](https://github.com/vanatallin) · [@HadjievK](https://github.com/HadjievK) · [@ljefford2-cmyk](https://github.com/ljefford2-cmyk)

---

## Help shape the *next iteration*

- **Review [ADR 0001](https://github.com/asago-ai/architecture-decision-records/pull/1).** Comment on the API boundary and caller responsibilities.
- **Discuss [Janam’s proposal](https://github.com/asago-ai/asago-policy-mapper/issues/95).** Share feedback on decision-model backends and benchmarks.
- **Test the Policy to Garak [end-to-end demo](https://github.com/asago-ai/asago-examples/pull/35)** and its [hosted web UI](https://muneezaazmat.github.io/asago-examples/demo/)
