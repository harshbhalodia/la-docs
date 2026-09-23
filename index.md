---
layout: home
title: LocalAgents - A local-first agent harness
---

# Build AI agents that run **on your own machine**

Thin, local-first glue on top of the [Strands Agents SDK](https://strandsagents.com/) — a
YAML-driven config for wiring up a model provider and local session persistence, a registry for
sharing reusable agent presets, and a real example of composing multiple agents into one
orchestrated review, all without a cloud account or API key.

<div class="terminal-window" aria-label="Terminal demo: install and run a LocalAgents agent">
  <div class="terminal-titlebar">
    <span class="terminal-dot dot-red"></span>
    <span class="terminal-dot dot-yellow"></span>
    <span class="terminal-dot dot-green"></span>
    <span class="terminal-title">zsh &mdash; 80&times;24</span>
  </div>
  <pre class="terminal-body"><code id="terminal-output">$ pip install -e ".[ollama]"
Successfully installed localagents-0.1.0

$ python examples/basic_agent.py
The square root of 1764 is 42.</code></pre>
</div>

[Get Started](/quickstart){: .btn .btn-primary}
[View on GitHub](https://github.com/harshbhalodia/localagents){: .btn .btn-secondary}

## Why LocalAgents?

<div class="features">
  <div class="feature">
    <h3>🏠 Local-First by Default</h3>
    <p>Point it at Ollama, LM Studio, or any OpenAI-compatible local server — no account or API key needed to get a working agent running.</p>
  </div>

  <div class="feature">
    <h3>⚙️ Config, Not Boilerplate</h3>
    <p>One YAML file selects your model provider and session storage. Strands still does the real work — LocalAgents just wires it up sanely.</p>
  </div>

  <div class="feature">
    <h3>🔌 Bring Your Own Endpoint</h3>
    <p>Ships built-in providers for Ollama, OpenAI-compatible servers, Amazon Bedrock, and custom local inference endpoints — extend the registry for anything else.</p>
  </div>

  <div class="feature">
    <h3>🧩 Composable Agents</h3>
    <p>The <code>agents</code> registry lets you share and orchestrate named agent presets — see the <a href="https://github.com/harshbhalodia/localagents/blob/main/localagents/agents/wealth_advisor.py">wealth-advisor example</a>, a multi-specialist review pipeline built entirely on this harness.</p>
  </div>
</div>

## Partners

<div class="features">
  <div class="feature">
    <h3>💰 Loonie</h3>
    <p><strong>Your Life Operating System.</strong> A private, local-first app connecting wealth, health, learning, travel, goals, and habits into one view — LocalAgents' flagship partner and real-world proving ground.</p>
    <p><a href="https://loonie.ai">loonie.ai</a> &bull; <a href="https://github.com/harshbhalodia/loonie">GitHub</a></p>
  </div>

  <div class="feature">
    <h3>🧠 Battle-Tested Pattern</h3>
    <p>Loonie's decision and wealth-insight agents pioneered the grounded, multi-specialist review pattern LocalAgents now ships as a reusable harness — see it live in the <a href="https://github.com/harshbhalodia/localagents/blob/main/localagents/agents/wealth_advisor.py">wealth-advisor example</a>.</p>
  </div>

  <div class="feature">
    <h3>⚡ Digital + Physical AI</h3>
    <p>One harness, two worlds: the same config and agent presets run a desktop app today and scale down to a consumer GPU, NPU, or edge device tomorrow — no cloud round-trip, no per-token bill.</p>
  </div>
</div>

## Built on Strands, opinionated for local-first teams

LocalAgents doesn't reinvent agent execution — [Strands](https://strandsagents.com/) already
does that well, and LocalAgents depends on it as an ordinary pip package rather than vendoring
its source. What LocalAgents adds is the layer most teams end up hand-rolling anyway: a simple
config format, sane local-first defaults, and a place to register and share agent presets across
projects. If you're comfortable wiring up Strands' `Agent`, `Model`, and `SessionManager` classes
yourself, you don't need this. If you'd rather start from a config file and a `Harness`, this is
for you.

LocalAgents is [Apache-2.0 licensed](https://github.com/harshbhalodia/localagents/blob/main/LICENSE).

