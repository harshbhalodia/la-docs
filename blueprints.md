---
layout: default
title: Blueprints & Marketplace - LocalAgents
---

# Blueprints &amp; Marketplace

A **blueprint** is a versioned, distributable package of agent logic — scenarios, system prompts
and orchestration — plus a manifest that says who published it, whether it's free or paid, and
exactly which data it needs. Blueprints always run on the user's own device, against data the user
has explicitly granted.

## Tiers

| Tier | Who publishes | Example |
|---|---|---|
| Free, in-house | The app vendor | `loonie.core_stress_test` — rate shock, job loss, market correction |
| Free, third-party | A bank or advisor, as a brand or lead-gen play | A credit union's first-home readiness check |
| Paid, third-party | A bank or advisor monetizing premium content | `maple_trust.advisory_stress_test` (fictional demo) — five scenarios |

## Create a blueprint in 60 seconds

```bash
pip install -e ".[ollama]"
localagents blueprint init my_bank_stress_test --id my_bank.stress_test --publisher "My Bank"
localagents blueprint validate my_bank_stress_test
localagents blueprint run my_bank_stress_test --config config.yaml
```

`init` scaffolds two files:

```yaml
# blueprint.yaml
id: my_bank.stress_test
name: My Bank Stress Test
version: 0.1.0
publisher: My Bank
tier: free            # or "paid" with a price_usd
category: stress_test
summary: Stress-tests a household against a rate shock and a job loss.
entry: agent:run      # module:function the loader calls
inputs:               # data categories requested — the user must grant each one
  - net_worth
  - liquidity
  - cashflow
```

```python
# agent.py
from localagents.agents import register

@register("my_bank.stress_test")
def run(harness, snapshot=None, **kwargs):
    agent = harness.build_agent(system_prompt="Only reason from the figures you are given.")
    return str(agent(f"Review this data and summarize risks and resilience:\n{snapshot}"))
```

## Data consent, enforced

A manifest's `inputs` are a **request**, never a grant. Apps built on this pattern (like Loonie)
show a consent screen listing each requested category in plain language, and the engine refuses
to run — before gathering any data — unless every requested category has been granted.
Anything the user didn't check is never sent. Every run records exactly which categories it used.

| Scope | What it contains |
|---|---|
| `net_worth` | Total net worth by liquid, investment and personal-asset buckets |
| `liquidity` | Liquid balance, essential monthly spend, months of runway |
| `cashflow` | Monthly income, expenses and net for recent months |
| `diversification` | Allocation across account and asset types |
| `income_forecast` | Historical income trend and projection |
| `goal_feasibility` | Goals, targets, dates and on-track status |

## Licensing paid blueprints

Paid blueprints unlock with an HMAC-signed license token issued at purchase and verified
offline — no phone-home at run time. It proves the marketplace issued the token; it is
deliberately not DRM, in keeping with the local-first, no-lock-in philosophy.

## Feedback without surveillance

Users keep every run locally, with the blueprint version, so they can compare advice across
versions. Publishers get zero automatic visibility. A user may choose to export a single run as
a precision-reduced, de-identified bundle (figures rounded, no identity or account IDs) and send
it to the publisher themselves — the foundation for opt-in, aggregated publisher analytics.

## Security model

- In **Loonie's in-app marketplace**, blueprints are declarative data (manifest + scenarios),
  never third-party executable code.
- The **LocalAgents CLI** loads code-based blueprints in-process with no sandbox yet — only run
  blueprints from publishers you trust. Publisher signing and restricted execution are on the
  roadmap.

Read the full design in the
[architecture doc](https://github.com/harshbhalodia/localagents/blob/main/docs/architecture/blueprint-marketplace.md)
and the [publishing guide](https://github.com/harshbhalodia/localagents/blob/main/docs/guides/publishing-a-blueprint.md).
