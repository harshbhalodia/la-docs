---
layout: home
title: LocalAgents - Local-first agents and blueprints
---

<p class="hero-eyebrow"><span>New</span> Blueprints: publish advisory agents that run on your users' devices</p>

# Build AI agents that run **on your own machine**

LocalAgents is an open, local-first agent harness on top of the [Strands Agents SDK](https://strandsagents.com/).
Wire up a local model in one YAML file, compose specialist agents into grounded reviews, and
package them as **blueprints** — versioned, free or paid, and executed entirely on the user's
device against data they explicitly grant.

<div class="terminal-window" aria-label="Terminal demo: install LocalAgents and run a stress-test blueprint">
  <div class="terminal-titlebar">
    <span class="terminal-dot dot-red"></span>
    <span class="terminal-dot dot-yellow"></span>
    <span class="terminal-dot dot-green"></span>
    <span class="terminal-title">PowerShell &mdash; localagents</span>
  </div>
  <pre class="terminal-body"><code id="terminal-output">$ pip install -e ".[ollama]"
Successfully installed localagents-0.1.0

$ localagents blueprint list --dir examples/blueprints
loonie.core_stress_test           v0.1.0  free   Loonie (in-house)
maple_trust.advisory_stress_test  v0.1.0  $4.99  Maple Trust (demo)

$ localagents blueprint run examples/blueprints/loonie_core_stress_test
Overall resilience: strong. 7.4 months of runway covers a 3-month income loss...</code></pre>
</div>

[Get Started](/quickstart){: .btn .btn-primary}
[Blueprints](/blueprints){: .btn .btn-secondary}
[GitHub](https://github.com/harshbhalodia/localagents){: .btn .btn-secondary}

## Why LocalAgents?

<div class="features">
  <div class="feature">
    <h3>🏠 Local-first by default</h3>
    <p>Point it at Ollama, LM Studio, or any OpenAI-compatible server — no account or API key needed to get a working agent running.</p>
  </div>

  <div class="feature">
    <h3>⚙️ Config, not boilerplate</h3>
    <p>One YAML file selects your model provider and session storage. Strands does the real work — LocalAgents wires it up sanely.</p>
  </div>

  <div class="feature">
    <h3>🧩 Grounded, composable agents</h3>
    <p>Narrow specialists read one slice of pre-computed facts; a lead agent synthesizes. The model explains numbers — it never invents them. See the <a href="https://github.com/harshbhalodia/localagents/blob/main/localagents/agents/wealth_advisor.py">wealth-advisor example</a>.</p>
  </div>

  <div class="feature">
    <h3>📦 Blueprints you can ship</h3>
    <p>Package agent logic as a versioned blueprint with a manifest, tier and price. Scaffold, validate and run with the <code>localagents</code> CLI.</p>
  </div>
</div>

## How blueprints work

<div class="flow">
  <div class="flow-step">
    <span class="flow-num">1</span>
    <h3>Publish</h3>
    <p>A bank, advisor or creator authors a blueprint — scenarios, prompts, declared data inputs — and validates it with the CLI.</p>
  </div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step">
    <span class="flow-num">2</span>
    <h3>Install</h3>
    <p>Users install it from a marketplace. Paid tiers unlock with a signed license token — verified offline.</p>
  </div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step">
    <span class="flow-num">3</span>
    <h3>Consent</h3>
    <p>Before the first run, the user sees every data category the blueprint requests and grants only what they choose.</p>
  </div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step">
    <span class="flow-num">4</span>
    <h3>Run locally</h3>
    <p>The blueprint runs on the user's device against granted data only. Every run is kept with its version for comparison.</p>
  </div>
</div>

<p class="flow-note"><strong>The publisher never receives a single byte of user data.</strong> That's the pitch to a regulated institution: reach every user with your advisory framework, with no data-processing agreement and no PII liability.</p>

## Partners

<div class="features">
  <div class="feature">
    <h3>💰 Loonie</h3>
    <p><strong>Your Life Operating System.</strong> A private, local-first Windows app for wealth, goals and decisions — LocalAgents' flagship partner. Loonie's in-app Blueprint Marketplace ships free and premium stress tests with a per-blueprint consent screen, run history and a no-code Blueprint Studio.</p>
    <p><a href="https://loonie.ai">loonie.ai</a> &bull; <a href="https://github.com/harshbhalodia/loonie">GitHub</a></p>
  </div>

  <div class="feature">
    <h3>🏦 Publish with us</h3>
    <p>Financial institutions and advisors can publish free (brand &amp; acquisition) or paid (premium advisory) blueprints. Read the <a href="/blueprints">blueprint guide</a> or open an issue on <a href="https://github.com/harshbhalodia/localagents/issues">GitHub</a> to get started.</p>
  </div>

  <div class="feature">
    <h3>⚡ Digital + physical AI</h3>
    <p>The same config and agent presets run a desktop app today and scale down to a consumer GPU, NPU, or edge device tomorrow — no cloud round-trip, no per-token bill.</p>
  </div>
</div>

## Built on Strands, opinionated for local-first teams

LocalAgents doesn't reinvent agent execution — [Strands](https://strandsagents.com/) already
does that well, and LocalAgents depends on it as an ordinary pip package. What LocalAgents adds is
the layer most teams end up hand-rolling: a simple config format, sane local-first defaults, a
registry for sharing agent presets, and a blueprint format for distributing them.

LocalAgents is [Apache-2.0 licensed](https://github.com/harshbhalodia/localagents/blob/main/LICENSE).
