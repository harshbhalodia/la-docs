---
layout: default
title: Quickstart Guide
---

# Quickstart Guide

Get up and running with LocalAgents in 5 minutes.

## Installation

```bash
pip install localagents
```

## Your First Agent

```python
from localagents import Agent, Orchestrator

# Initialize orchestrator
orch = Orchestrator()

# Create an agent
agent = Agent(
    name="assistant",
    model="llama3",  # or any local model
    system_prompt="You are a helpful assistant"
)

# Run a simple task
response = orch.run(agent.task("Explain quantum computing"))
print(response)
```

## Multi-Agent Workflow

```python
# Define multiple agents
researcher = Agent("researcher", model="llama3")
analyst = Agent("analyst", model="mistral")
writer = Agent("writer", model="phi3")

# Create a workflow
workflow = orch.workflow([
    researcher.task("Research AI trends in 2024"),
    analyst.task("Analyze the research findings"),
    writer.task("Write an executive summary")
])

# Execute
result = workflow.execute()
```

[Next: Full Documentation →](/docs)

# ============================================
# SETUP INSTRUCTIONS
# ============================================

To set up this theme on GitHub Pages:

1. Create a new repository or use existing one
2. Copy all files to your repository root
3. Update _config.yml with your details:
   - Change url and baseurl
   - Update GitHub links
   - Customize colors if desired
4. Add your content in markdown files
5. Push to GitHub
6. Enable GitHub Pages in repository settings
7. Select main branch as source

Directory structure:
your-repo/
├── _config.yml
├── _layouts/
│   ├── default.html
│   └── home.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── index.md
├── quickstart.md
└── docs.md

The theme features:
- Modern gradient design
- Responsive layout
- Smooth animations
- Code syntax highlighting
- SEO optimized
- Fast loading
- Mobile-friendly
