# 🌌 Nyx

**Nyx** is a sophisticated AI-powered agent framework designed to bridge the gap between a command-line interface and external applications. It provides a versatile environment for interacting with AI through various "modes," allowing for everything from simple queries to complex agentic task execution.

## 🚀 Overview

Nyx is built with **Bun** and utilizes the **OpenRouter AI SDK** to provide a flexible, high-performance interface for LLM interaction. Whether you need an autonomous agent to execute code or a simple interface to chat via Telegram or WhatsApp, Nyx provides the orchestration layer to make it happen.

### 🛠 Key Features

- **🤖 Multi-Mode Orchestration**:
  - **Agent Mode**: Full-fledged agentic capabilities with action tracking, diff views, and tool execution.
  - **Ask Mode**: For quick queries and streamlined information retrieval.
  - **Plan Mode**: Strategic planning before execution to ensure accuracy and reliability.
- **📱 Integration Ready**: Built-in support and orchestrators for **Telegram** and **WhatsApp**, extending the AI's reach beyond the terminal.
- **💻 TUI Experience**: A beautiful Terminal User Interface (TUI) with Markdown support and a guided setup process.
- **⚡ High Performance**: Powered by Bun for lightning-fast execution and modern TypeScript support.

## ⚙️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- An OpenRouter API key (or compatible LLM provider).

### Installation

```bash
git clone https://github.com/your-username/nyx.git
cd nyx
bun install
```

### Initial Setup (Configuration Wizard)

Run the bundled `wakeup` command to configure API keys and preferences:

```bash
bun run index.ts wakeup
```

Follow the interactive prompts to store your configuration in `~/.nyx/config.json`.

## 📦 Development Workflow

### Running the Application

```bash
bun run index.ts <mode> [options]
```

Replace `<mode>` with `agent`, `ask`, or `plan` depending on the functionality you want to test.

### Watching for Changes

During development you can use Bun's file watcher to automatically restart on changes:

```bash
bun run --watch index.ts <mode>
```

### Linting & Formatting

The project uses `prettier` and `eslint` (via Bun). Run:

```bash
bunx eslint . --fix
bunx prettier --write .
```

### Testing

*Note: No test suite is included yet.* Add your preferred testing framework (e.g., Vitest) and run:

```bash
bun test
```

## 📦 Build & Distribution

Nyx is primarily a CLI tool, but you can bundle it for distribution:

1. **Compile TypeScript** (Bun handles this automatically, but you can output to `dist`):
   ```bash
   bun build index.ts --outdir=dist --minify
   ```
2. **Create a standalone executable** (optional, using `pkg` or similar):
   ```bash
   bunx pkg . --output nyx
   ```
3. **Publish** the package to npm if desired:
   ```bash
   npm publish
   ```

## 📖 Usage

### Basic Command Structure

```bash
bun run index.ts [command] [options]
```

### Primary Commands

- `wakeup` – Runs the initial setup wizard.
- `agent` – Starts the full‑featured agent mode.
- `ask` – Quick query mode.
- `plan` – Strategic planning mode before execution.

Each mode has its own set of sub‑options; run `bun run index.ts <mode> --help` for details.

## 🏗 Architecture

Nyx is organized into modular components:
- `/ai` – Core AI configuration and SDK integration.
- `/modes` – Different operational modes (Agent, Ask, Plan) each with its own orchestrator.
- `/tui` – Terminal User Interface components for a polished user experience.

## 🛠 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **AI Framework**: [OpenRouter AI SDK](https://openrouter.ai/)
- **CLI Tools**: `commander`, `@clack/prompts`, `chalk`
- **Formatting**: `marked-terminal` for beautiful Markdown rendering in the console.

---
*Developed with 💜 by Lumas*