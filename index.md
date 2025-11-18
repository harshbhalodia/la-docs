---
layout: home
title: LocalAgents.ai - Orchestrate AI Agents Locally
---

# Orchestrate AI Agents **Locally**

Build, deploy, and manage AI agent workflows on your own infrastructure. No cloud dependencies, full control.

```python
from localagents import Orchestrator, Agent

# Create an orchestrator
orchestrator = Orchestrator()

# Define your agents
research_agent = Agent("researcher", model="llama3")
writer_agent = Agent("writer", model="mistral")

# Orchestrate the workflow
result = orchestrator.run([
    research_agent.task("Research AI trends"),
    writer_agent.task("Write summary")
])
```

[Get Started](/quickstart){: .btn .btn-primary}
[View on GitHub](https://github.com/yourusername/repo){: .btn .btn-secondary}

## Why LocalAgents?

<div class="features">
  <div class="feature">
    <h3>🏠 Local-First</h3>
    <p>Run everything on your infrastructure. No API keys, no cloud costs.</p>
  </div>
  
  <div class="feature">
    <h3>🔄 Smart Orchestration</h3>
    <p>Chain agents intelligently with conditional logic and parallel execution.</p>
  </div>
  
  <div class="feature">
    <h3>🐍 Python Native</h3>
    <p>Simple Python SDK with intuitive APIs and full type hints.</p>
  </div>
  
  <div class="feature">
    <h3>🔌 Extensible</h3>
    <p>Bring your own models, tools, and integrations.</p>
  </div>
</div>
