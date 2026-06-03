import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli.ts";

const BANNER_FONT = "ANSI SHADOW";
const SHADOW = chalk.hex("#5e6be0");
const FACE = chalk.hex("#ff89be").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, "").split("\n");

  const termWidth = process.stdout.columns || 120;
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  const leftPad = Math.max(0, Math.floor((termWidth - maxLen) / 2));

  const particles = [
    chalk.hex("#6f2dbd")("·"), // distant star
    chalk.hex("#6f2dbd")("·"),
    chalk.hex("#6f2dbd")("·"),

    chalk.hex("#e500a4")("•"), // brighter sparkle
    chalk.hex("#e500a4")("•"),

    chalk.hex("#ff0a54")("✦"), // hero star
  ];

  const randomParticle = () =>
    particles[Math.floor(Math.random() * particles.length)];

  const skyRow = (count: number, spreadStart: number, spreadEnd: number) => {
    const positions: number[] = [];

    while (positions.length < count) {
      const pos =
        spreadStart + Math.floor(Math.random() * (spreadEnd - spreadStart));

      // keep particles separated
      if (positions.every((existing) => Math.abs(existing - pos) > 8)) {
        positions.push(pos);
      }
    }

    positions.sort((a, b) => a - b);

    let line = "";
    let cursor = 0;

    for (const pos of positions) {
      line += " ".repeat(pos - cursor) + randomParticle();

      cursor = pos + 1;
    }

    console.log(line);
  };

  const skyStart = Math.max(0, leftPad - 25);
  const skyEnd = Math.min(termWidth, leftPad + maxLen + 25);

  // ===== TOP SKY =====
  skyRow(4, skyStart, skyEnd);
  skyRow(5, skyStart, skyEnd);

  console.log();

  // ===== SHADOW =====
  for (const line of bannerLines) {
    console.log(" ".repeat(leftPad + 2) + SHADOW(line.padEnd(rowWidth)));
  }

  process.stdout.write(`\x1b[${bannerLines.length}A`);

  // ===== FACE =====
  for (const line of bannerLines) {
    console.log(" ".repeat(leftPad) + FACE(line.padEnd(rowWidth)));
  }

  console.log();

  // ===== BOTTOM SKY =====
  skyRow(4, skyStart, skyEnd);
  skyRow(5, skyStart, skyEnd);

  console.log();

  const footer = "──── ✦ Burn tokens to generate shitty code ✦ ────";

  console.log(
    " ".repeat(Math.max(0, Math.floor((termWidth - footer.length) / 2))) +
      chalk.hex("#c8a2c8")(footer),
  );

  console.log();
}
export async function runWakeUp() {
  let ascii: string;

  try {
    ascii = figlet.textSync("nyx", { font: BANNER_FONT });
  } catch (error) {
    ascii = figlet.textSync("nyx", { font: "Standard" });
  }

  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Select mode you want to proceed with",
    options: [
      { value: "cli", label: "CLI" },
      { value: "telegram", label: "Telegram" },
      { value: "whatsapp", label: "Whatsapp" },
      { value: "exit", label: "Exit" },
    ],
  });

  if (isCancel(mode || mode === "exit")) {
    console.log(chalk.dim("\n Goodbye. \n"));
    return;
  }

  if (mode === "cli") {
    await runCliMode();
  } else if (mode === "telegram") {
    console.log(chalk.dim("Starting telegram mode"));
  } else if (mode === "whatsapp") {
    console.log(chalk.dim("Starting Whatsapp mode"));
  }
}
