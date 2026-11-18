---
marp: true
theme: asago
title: Asago Tech Recap
paginate: true
date: 2026-11-18
---

<!-- _class: title -->

# Asago *Tech Recap*

Updates since November 4.

---

<!-- _class: pipeline sources compact -->

## ADR 0002 · *reporting*

<div class="pipeline">

  <div class="stage">
    <p>Payload envelopes</p>
    <ul>
      <li>Policy Mapper</li>
      <li>Scenario Generator</li>
      <li>Artifact Generator</li>
    </ul>
  </div>

  <div class="arrow">→</div>

  <div class="stage">
    <p>Component handlers</p>
    <ul>
      <li>interpret each payload</li>
      <li>validate schema versions</li>
    </ul>
  </div>

  <div class="arrow">→</div>

  <div class="stage">
    <p>Report content</p>
    <ul>
      <li>sections · tables · metrics</li>
    </ul>
  </div>

  <div class="arrow">→</div>

  <div class="stage">
    <p>Renderers</p>
    <ul>
      <li>HTML · PatternFly</li>
      <li>PDF</li>
      <li>Markdown</li>
    </ul>
  </div>

</div>

- Defines a **stateless, component-aware Report Generator**.
- Produces **PDF, HTML, and Markdown** reports from versioned component payloads.
- Exposes report generation through the **Asago Server REST API** from ADR 0001.


---

<!-- _class: stats sources compact -->

## Policy Mapper · *pipeline fixes and structured output*

Two merged PRs improved extraction reliability and replaced `instructor` with the OpenAI SDK for structured output.

- **−16%**
  tokens in the 27-policy battery with native structured output: 27.8M vs. 33.1M.

- **4 defects fixed**
  on the multi-document and rerank paths, plus a new remote cross-encoder reranker.

> The new default trades a small quality dip for the token saving. The `json` compatibility mode remains available.

[PR #142 · pipeline fixes and remote reranking](https://github.com/asago-ai/asago-policy-mapper/pull/142) · [PR #143 · OpenAI structured-output client](https://github.com/asago-ai/asago-policy-mapper/pull/143)

---

<!-- _class: workmap sources compact -->

## Policy Mapper · *next work*

<div class="stack">
  <span class="stack-label">Refactor stack in flight</span>
  <a class="pr" href="https://github.com/asago-ai/asago-policy-mapper/pull/147">#147 <em>complexity under 15</em></a>
  <span class="link">→</span>
  <a class="pr" href="https://github.com/asago-ai/asago-policy-mapper/pull/155">#155 <em>remaining functions</em></a>
  <span class="link">→</span>
  <a class="pr" href="https://github.com/asago-ai/asago-policy-mapper/pull/156">#156 <em>mutation gaps</em></a>
  <span class="stack-note">602 fast tests<br>output pinned by snapshots</span>
</div>

<div class="stages">
  <div class="stage">
    <span class="stage-name">Query gen</span>
    <span class="issue"><a href="https://github.com/asago-ai/asago-policy-mapper/issues/150">#150</a> · <a href="https://github.com/asago-ai/asago-policy-mapper/issues/153">#153</a></span>
    <p class="why">Makes scores and labels in the output mean what they say. Fixes how the client retries and shortens prompts.</p>
  </div>
  <span class="flow">→</span>
  <div class="stage">
    <span class="stage-name">Judge</span>
    <span class="issue"><a href="https://github.com/asago-ai/asago-policy-mapper/issues/148">#148</a></span>
    <p class="why">Separates the judge's question, the model that answers it, and the keep or drop rule.</p>
  </div>
  <span class="flow">→</span>
  <div class="stage">
    <span class="stage-name">Filter</span>
    <span class="issue"><a href="https://github.com/asago-ai/asago-policy-mapper/issues/149">#149</a></span>
    <p class="why">Opt-in filter that drops unlikely candidates before grounding.</p>
  </div>
  <span class="flow">→</span>
  <div class="stage">
    <span class="stage-name">Grounding</span>
    <span class="issue"><a href="https://github.com/asago-ai/asago-policy-mapper/issues/152">#152</a> · <a href="https://github.com/asago-ai/asago-policy-mapper/issues/145">#145</a></span>
    <p class="why">Checks that evidence quotes appear in the policy. One failed LLM call must not abort the run.</p>
  </div>
  <span class="flow">→</span>
  <div class="stage">
    <span class="stage-name">Run mode</span>
    <span class="issue"><a href="https://github.com/asago-ai/asago-policy-mapper/issues/151">#151</a></span>
    <p class="why">Resolves the run mode once from the flags and records it.</p>
  </div>
</div>

<style>
section.workmap .stack {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface-teal);
  border: 1px solid var(--teal);
  border-radius: 14px;
  padding: 20px 26px;
  margin: 6px 0 34px;
}

section.workmap .stack-label {
  color: var(--teal);
  font-size: 0.55em;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-right: 6px;
  white-space: nowrap;
}

section.workmap .pr,
section.workmap a.pr {
  display: inline-flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 0.72em;
  font-weight: 700;
  color: var(--text);
  line-height: 1.35;
  white-space: nowrap;
}

section.workmap .pr em {
  font-style: normal;
  font-weight: 400;
  font-size: 0.72em;
  color: var(--muted);
}

section.workmap .pr:hover,
section.workmap .issue a:hover {
  text-decoration: underline;
}

section.workmap .issue a,
section.workmap .pr em {
  font-style: normal;
}

section.workmap .issue a {
  color: inherit;
  text-decoration: none;
}

section.workmap .link {
  color: var(--teal);
  font-size: 0.8em;
}

section.workmap .stack-note {
  margin-left: auto;
  font-size: 0.55em;
  line-height: 1.5;
  color: var(--teal);
  text-align: right;
}

section.workmap .stages {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
  align-items: stretch;
  column-gap: 8px;
}

section.workmap .stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 30px 14px;
  text-align: center;
}

section.workmap .stage-name {
  color: var(--blue);
  font-size: 0.62em;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

section.workmap .issue {
  background: var(--blue-tint);
  border: 1px solid var(--blue);
  border-radius: 7px;
  padding: 3px 12px;
  color: var(--blue);
  font-size: 0.52em;
  font-weight: 700;
  white-space: nowrap;
}

section.workmap .why {
  margin: 0;
  font-size: 0.55em;
  line-height: 1.5;
  color: var(--muted);
}

section.workmap .flow {
  align-self: center;
  color: var(--muted);
  font-size: 0.8em;
}

section.workmap .takeaway {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  font-size: 0.68em;
  color: var(--muted);
}

section.workmap .legend {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: 0.85em;
  color: var(--teal);
  white-space: nowrap;
}

section.workmap .swatch {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--teal-tint);
  border: 1px solid var(--teal);
}
</style>


---

<!-- _class: pipeline sources compact -->

## OpenShell recommender · *design taking shape*

[Issue #12](https://github.com/asago-ai/asago-guardrails-recommender/issues/12) now has a proposed design for policy generation from attack evidence and agent context.

<div class="pipeline">
  <div class="stage">
    <p>Inputs</p>
    <ul>
      <li>attack evidence</li>
      <li>agent use case</li>
      <li>deployment facts</li>
    </ul>
  </div>
  <div class="arrow">→</div>
  <div class="stage">
    <p>Find control gaps</p>
    <ul>
      <li>map attacks to capabilities</li>
      <li>propose restrictions</li>
    </ul>
  </div>
  <div class="arrow">→</div>
  <div class="stage">
    <p>Build and test</p>
    <ul>
      <li>compile OpenShell policy</li>
      <li>check with Policy Prover</li>
    </ul>
  </div>
</div>

- Open questions: the base policy, the Policy Prover boundary, and whether the input is raw attack evidence or the scenario generator's control structure.

---

<!-- _class: cards credits teal -->

## Help shape the *next iteration*

- ### Test non-English policies

  Run the mapper on a policy in [your language](https://github.com/asago-ai/asago-policy-mapper/issues/122) and report the results.

- ### Review the refactor stack

  Comment on the open [pipeline refactors](https://github.com/asago-ai/asago-policy-mapper/pull/147) and their snapshot-verification approach.

- ### Shape OpenShell support

  Review the proposed design for the [OpenShell policy recommender](https://github.com/asago-ai/asago-guardrails-recommender/issues/12).

- ### Follow the Asago Server

  Track the implementation of [ADR 0001 and ADR 0002](https://github.com/asago-ai/architecture-decision-records/issues/3).
