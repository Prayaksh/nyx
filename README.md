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

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nyx.git
   cd nyx
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Setup

To initialize Nyx and configure your environment, run the `wakeup` command:

```bash
bun run index.ts wakeup
```
*(Follow the interactive prompts to set up your API keys and preferences.)*

## 📖 Usage

Once configured, you can interact with Nyx through its CLI.

### Basic Command Structure
```bash
bun run index.ts [command]
```

### Commands
- `wakeup`: Runs the initial setup and configuration wizard.

## 🏗 Architecture

Nyx is organized into modular components:
- `/ai`: Core AI configuration and SDK integration.
- `/modes`: Different operational modes (Agent, Ask, Plan) each with its own orchestrator.
- `/tui`: Terminal User Interface components for a polished user experience.

## 🛠 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **AI Framework**: [OpenRouter AI SDK](https://openrouter.ai/)
- **CLI Tools**: `commander`, `@clack/prompts`, `chalk`
- **Formatting**: `marked-terminal` for beautiful Markdown rendering in the console.

---
*Developed with 💜 by lumas*
