---
layout: default
title: Build an advisor for Loonie
description: Step by step: create an advisor pack, validate it, publish it to Loonie and see it answer inside Pilot.
---

# Build an advisor for Loonie

An **advisor** is one YAML file that teaches Loonie a new skill: a stress test, a plan, a decision aid. You describe it, LocalAgents checks it, and Loonie's Pilot brings it in when someone asks the right question.

<div class="callout"><p>Needs <strong>Loonie 0.4 or later</strong> and Python 3.10+. Nothing you build here runs anywhere but on the user&apos;s own computer.</p></div>

## 1. Install

```bash
pip install git+https://github.com/harshbhalodia/localagents.git
localagents --help
```

## 2. Create a starter pack

```bash
localagents advisor init job_loss.yaml --publisher "Acme Co"
```

This writes a complete, valid pack you can publish as-is, then improve:

```yaml
id: acme_co.job_loss
name: Job Loss
publisher: Acme Co
version: "0.1.0"
kind: stress_test            # stress_test | decision | analysis | plan
summary: Explain in one sentence what this advisor checks and for whom.
triggers:
  - job loss
  - lose my job
examples:
  - What if I lose my job for 3 months?
inputs:
  - net_worth
  - liquidity
  - cashflow
scenarios:
  - id: job_loss_3mo
    description: Primary income drops to zero for 3 months, then fully recovers.
  - id: rate_shock_2pt
    description: Variable interest rates rise by 2 percentage points for a year.
```

## 3. Make it yours

| Field | What to write |
|---|---|
| `summary` | One plain sentence users read. |
| `triggers` | Phrases that make Loonie pick your advisor. Include the words people actually say. |
| `examples` | Questions Loonie suggests while someone types. Two or three is plenty. |
| `inputs` | The numbers it may read (see the table below). Ask for as little as you need. |
| `scenarios` | Each one is analysed on its own, then combined into a single advisory. |
| `disclaimer` | Optional. Your own closing line. |

Optional: `specialist_system_prompt` and `lead_system_prompt` replace Loonie&apos;s default wording if you want a distinct voice. End the lead prompt with `{disclaimer}`.

## 4. Validate

```bash
localagents advisor validate job_loss.yaml
```

Errors stop you from publishing (for example, a missing scenario). Tips are suggestions, such as adding triggers or a disclaimer. A clean run looks like:

```text
OK: Job Loss v0.1.0 (stress_test) with 2 scenario(s)
```

## 5. Publish to Loonie

```bash
localagents advisor publish job_loss.yaml --to loonie
```

This validates again and copies the file into Loonie&apos;s advisors folder:

```text
%LOCALAPPDATA%\com.loonie.app\backend\data\advisors\
```

Running Loonie from a dev checkout? Publish into that folder instead with `--dir <path>\backend\data\advisors`. Check what is installed with `localagents advisor list`.

## 6. Try it in Pilot

Open Loonie, go to **Pilot** and ask one of your example questions. Loonie:

1. recognises your triggers and brings in your advisor,
2. shows the person a plain list of the data it will read and asks permission,
3. runs your scenarios on their own model and answers in the chat,
4. remembers their choice and lets them rate the answer.

People can review or revoke access any time under **Settings &rarr; Advisors**.

If something is wrong with a pack, **Settings &rarr; Advisors** lists the file and the reason.

## Updating and removing

Publish again with a **higher** `version` and Loonie uses the new one straight away. To retire an advisor, delete its file from the advisors folder.

## Inputs you can request

| Input | What Loonie shares |
|---|---|
| `net_worth` | Total net worth by liquid, investment and personal-asset buckets, in the user&apos;s base currency |
| `liquidity` | Liquid balance, essential monthly spend and months of runway |
| `cashflow` | Monthly income, expenses and net for recent months |
| `diversification` | How money is spread across account and asset types |
| `income_forecast` | Income trend and projection |
| `goal_feasibility` | Savings goals and whether each is on track |

Anything else in `inputs` is ignored, and the user only shares what they allow.

## Writing advisors people trust

- **Ask for less.** Every input is a permission prompt. Request only what your scenarios use.
- **Be concrete.** &ldquo;Rates rise 2 points for a year&rdquo; beats &ldquo;interest rates change&rdquo;.
- **Sound like the user.** Triggers and examples should use everyday words.
- **Keep the disclaimer honest.** Advisors inform decisions; they are not licensed advice.

Next: the [quickstart](/quickstart) covers building code-first agents with the harness.
