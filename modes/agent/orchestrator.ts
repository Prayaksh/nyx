import chalk from "chalk";
import { isCancel, text } from "@clack/prompts";
import { defaultAgentConfig } from "./types.ts";
import { ActionTracker } from "./actionTracker.ts";
import { ToolExecutor } from "./executor.ts";
import { createAgentTools } from "./agentTools.ts";
import { stepCountIs, ToolLoopAgent } from "ai";
import { getAgentModel } from "../../ai/ai.config.ts";
import { renderTerminalMarkdown } from "../../tui/terminalMd.ts";
import { runApprovalFlow } from "./approval.ts";
import { setTimeout as sleep } from "node:timers/promises";
import { spinner } from "@clack/prompts";

export async function runAgentMode() {
  console.log(chalk.bold("\n Agent mode \n"));

  const goal = await text({
    message: "What do u want to build today?",
    placeholder: "generate something shitty",
  });

  if (isCancel(goal) || !goal.trim()) return;

  const agentSpinner = spinner();
  agentSpinner.start(chalk.dim("Initializing agent"));

  const config = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = createAgentTools(executor);
  const agent = new ToolLoopAgent({
    model: getAgentModel(),
    stopWhen: stepCountIs(40),
    instructions: [
      `Workspace root: ${config.codebasePath}`,
      "All mutations are staged until approval.",
    ].join("\n"),
    tools,
  });

  try {
    const result = await agent.generate({
      prompt: goal.trim(),
      onStepFinish: ({ toolCalls }) => {
        const lastTool = toolCalls[toolCalls.length - 1];
        if (lastTool) {
          agentSpinner.message(
            chalk.dim(`Executing: ${String(lastTool.toolName)}...\n`),
          );
        }

        for (const tc of toolCalls) {
          const preview = JSON.stringify(tc.input).slice(0, 160);
          console.log(
            chalk.green("  ✓"),
            chalk.bold(String(tc.toolName)),
            chalk.dim(preview + (preview.length >= 160 ? "..." : "")),
          );
        }
      },
    });
    agentSpinner.stop(chalk.green("\n✓ Agent finished thinking"));
    if (result.text?.trim()) console.log(renderTerminalMarkdown(result.text));
  } catch (error) {
    agentSpinner.stop(chalk.red.dim("\n✗ Agent failed"));
    console.error(error);
    return;
  }

  const ok = await runApprovalFlow(tracker);
  if (!ok) return executor.clearStaging();

  const { errors } = executor.applyApprovedFromTracker();

  if (errors.length) {
    console.log(chalk.red("\nSome operations reported errors:\n"));
    for (const e of errors) console.log(chalk.red(`  • ${e}`));
  } else {
    console.log(chalk.green("\n✓ Applied.\n"));
  }

  executor.clearStaging();
}
