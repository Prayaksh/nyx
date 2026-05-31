#!/usr/bin/env bun

import { Command } from "commander";
import { runWakeUp } from "./tui/wakeup.ts";

const program = new Command();

program
  .name("nyx")
  .description("Openclaw kinda agent working on cli and apps")
  .version("0.0.1");

program
  .command("wakeup")
  .description("Setting up")
  .action(async () => {
    await runWakeUp();
  });

await program.parseAsync(process.argv);
