---
layout: default
title: Quickstart Guide
---

# Quickstart Guide

Get up and running with LocalAgents in a few minutes.

## Installation

LocalAgents isn't on PyPI yet — install it straight from GitHub:

```bash
git clone https://github.com/harshbhalodia/localagents.git
cd localagents
python -m venv .venv
.venv\Scripts\activate   # Windows; `source .venv/bin/activate` on macOS/Linux
pip install -e ".[ollama]"
```

## Your First Agent

```python
from localagents import Harness

# Reads config.yaml if present, otherwise falls back to local defaults
# (Ollama on http://localhost:11434).
harness = Harness.from_file("config.yaml")

agent = harness.build_agent(session_id="my-session")
result = agent("Explain quantum computing in two sentences.")
print(result)
```

Copy `config.example.yaml` to `config.yaml` to point at a different model provider — Ollama,
any OpenAI-compatible local server (LM Studio, vLLM, ...), Amazon Bedrock, or a custom
`{model, system_prompt, input}`-style endpoint.

## Composing Agents

The `agents` registry is where LocalAgents lets you share and orchestrate named presets across
projects. The `wealth_advisor` example ships a real multi-specialist pipeline: three narrow
specialist agents (cash flow, risk & diversification, goals) each look at one slice of
already-computed data, then a lead-advisor agent synthesizes their notes into one client-facing
recommendation:

```python
from localagents import Harness
from localagents.agents.wealth_advisor import run_wealth_advisor_review

harness = Harness.from_file("config.yaml")
review = run_wealth_advisor_review(harness, snapshot)  # snapshot: your own computed data
print(review)
```

See [`examples/`](https://github.com/harshbhalodia/localagents/tree/main/examples) in the repo
for full runnable scripts.

