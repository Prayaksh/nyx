import { tool } from "ai";
import { z } from "zod";
import type { ToolExecutor } from "./executor.ts";

export function createAgentTools(executor: ToolExecutor) {
  return {
    read_file: tool({
      description:
        "Read a text file from the workspace. Use a path relative to the project root.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
      }),
      execute: async ({ path: p }) => executor.readFile(p),
    }),

    create_file: tool({
      description:
        "Stage creation of a new file (not written until the user approves).",
      inputSchema: z.object({
        path: z.string(),
        content: z.string(),
      }),
      execute: async ({ path: p, content }) => executor.createFile(p, content),
    }),

    modify_file: tool({
      description:
        "Stage a full-file replacement for an existing file (pending approval).",
      inputSchema: z.object({
        path: z.string(),
        content: z.string().describe("Complete new file contents"),
      }),
      execute: async ({ path: p, content }) => executor.modifyFile(p, content),
    }),

    write_partial_file: tool({
      description:
        "Stage partial modifications by replacing a exact matching search block inside a file.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
        search: z.string().describe("The exact text block to locate"),
        replace: z
          .string()
          .describe("The replacement text to put instead of the search block"),
      }),
      execute: async ({ path: p, search, replace }) =>
        executor.writePartialFile(p, search, replace),
    }),

    insert_after: tool({
      description:
        "Find a specific block of text in a file and stage an insertion immediately following it.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
        search: z.string().describe("The exact text anchor to look for"),
        contentToInsert: z
          .string()
          .describe("The content to add right after the search block"),
      }),
      execute: async ({ path: p, search, contentToInsert }) =>
        executor.insertAfter(p, search, contentToInsert),
    }),

    insert_before: tool({
      description:
        "Find a specific block of text in a file and stage an insertion immediately preceding it.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
        search: z.string().describe("The exact text anchor to look for"),
        contentToInsert: z
          .string()
          .describe("The content to add right before the search block"),
      }),
      execute: async ({ path: p, search, contentToInsert }) =>
        executor.insertBefore(p, search, contentToInsert),
    }),

    append_file: tool({
      description:
        "Stage an addition of text contents directly onto the absolute end of a file.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
        contentToAppend: z
          .string()
          .describe("Text content to append to the end"),
      }),
      execute: async ({ path: p, contentToAppend }) =>
        executor.appendFile(p, contentToAppend),
    }),

    prepend_file: tool({
      description:
        "Stage an addition of text contents directly onto the absolute start of a file.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
        contentToPrepend: z
          .string()
          .describe("Text content to prepend to the start"),
      }),
      execute: async ({ path: p, contentToPrepend }) =>
        executor.prependFile(p, contentToPrepend),
    }),

    find_symbol: tool({
      description:
        "Scan the workspace to locate which file defines a given class, interface, function, or variable name.",
      inputSchema: z.object({
        symbolName: z
          .string()
          .describe("The name of the target identifier to locate"),
      }),
      execute: async ({ symbolName }) => executor.findSymbol(symbolName),
    }),

    find_references: tool({
      description:
        "Find all text references, mentions, or usages of a specific word or symbol name throughout the codebase.",
      inputSchema: z.object({
        symbolName: z
          .string()
          .describe("The explicit symbol/word to cross-reference"),
      }),
      execute: async ({ symbolName }) => executor.findReferences(symbolName),
    }),

    rename_symbol: tool({
      description:
        "Stage a global search-and-replace modification updating a target symbol name across all workspace source files.",
      inputSchema: z.object({
        symbolName: z.string().describe("The original name of the symbol"),
        newName: z.string().describe("The new name to apply everywhere"),
      }),
      execute: async ({ symbolName, newName }) =>
        executor.renameSymbol(symbolName, newName),
    }),

    get_exports: tool({
      description:
        "Quickly scan and return explicit module signatures and names exported by a specific file without reading full code contents.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
      }),
      execute: async ({ path: p }) => executor.getExports(p),
    }),

    get_imports: tool({
      description:
        "Quickly extract and list dependency lines and file path import tracks initialized inside a specified file.",
      inputSchema: z.object({
        path: z.string().describe("Relative file path"),
      }),
      execute: async ({ path: p }) => executor.getImports(p),
    }),

    dependency_graph: tool({
      description:
        "Build and output a comprehensive link summary map illustrating project-wide import dependencies across source structures.",
      inputSchema: z.object({}),
      execute: async () => executor.dependencyGraph(),
    }),

    delete_file: tool({
      description: "Stage deletion of a file (pending approval).",
      inputSchema: z.object({
        path: z.string(),
      }),
      execute: async ({ path: p }) => executor.deleteFile(p),
    }),

    create_folder: tool({
      description:
        "Stage creation of a directory tree (pending approval). Uses mkdir -p on apply.",
      inputSchema: z.object({
        path: z.string().describe("Relative directory path"),
      }),
      execute: async ({ path: p }) => executor.createFolder(p),
    }),

    list_files: tool({
      description: "List files and directories under a path.",
      inputSchema: z.object({
        path: z.string(),
        recursive: z.boolean().optional().default(false),
      }),
      execute: async ({ path: p, recursive }) =>
        executor.listFiles(p, recursive),
    }),

    search_files: tool({
      description:
        'Find files matching a glob pattern (e.g. "*.ts", "**/*.md"). Optional content substring filter.',
      inputSchema: z.object({
        root: z.string().describe("Directory to search, relative to root"),
        pattern: z
          .string()
          .describe("Glob-like pattern using * and ** (forward slashes)"),
        content_contains: z.string().optional(),
      }),
      execute: async ({ root, pattern, content_contains }) =>
        executor.searchFiles(root, pattern, content_contains),
    }),

    analyze_codebase: tool({
      description:
        "Summarize structure: file counts, size, extensions. Read-only.",
      inputSchema: z.object({
        path: z.string().default("."),
      }),
      execute: async ({ path: p }) => executor.analyzeCodebase(p),
    }),

    git_status: tool({
      description:
        "Fetch a condensed porcelain summary status detailing current unstaged/staged working directory alterations.",
      inputSchema: z.object({}),
      execute: async () => executor.gitStatus(),
    }),

    git_diff: tool({
      description:
        "Retrieve standard terminal formatting tracking raw line changes within uncommitted modified items.",
      inputSchema: z.object({}),
      execute: async () => executor.gitDiff(),
    }),

    git_commit: tool({
      description:
        "Atomically stage active files and lock tracking records forward with a descriptive commit entry log statement.",
      inputSchema: z.object({
        message: z
          .string()
          .describe("The formal summary detailing changes committed"),
      }),
      execute: async ({ message }) => executor.gitCommit(message),
    }),

    git_branch: tool({
      description:
        "Provide a raw text readout tracking active code paths along with localized or upstream project branches.",
      inputSchema: z.object({}),
      execute: async () => executor.gitBranch(),
    }),

    git_checkout: tool({
      description:
        "Switch historical execution paths to a localized tracking head, reference hash, or independent branch line.",
      inputSchema: z.object({
        branchOrCommit: z
          .string()
          .describe("The name of the branch or commit hash value target"),
      }),
      execute: async ({ branchOrCommit }) =>
        executor.gitCheckout(branchOrCommit),
    }),

    git_log: tool({
      description:
        "Fetch a historical chronological stream outline tracking localized repository changes.",
      inputSchema: z.object({
        limit: z
          .number()
          .optional()
          .default(10)
          .describe("Max count of historic records to return"),
      }),
      execute: async ({ limit }) => executor.gitLog(limit),
    }),

    revert_changes: tool({
      description:
        "Discard all pending uncommitted alterations on physical disk along with current tool state staging memory trackers entirely.",
      inputSchema: z.object({}),
      execute: async () => executor.revertChanges(),
    }),

    execute_shell: tool({
      description:
        "Queue a shell command to run in the workspace after user approval. Use with care.",
      inputSchema: z.object({
        command: z.string().describe("Single command; runs with shell: true"),
      }),
      execute: async ({ command }) => executor.queueShell(command),
    }),

    list_skills: tool({
      description:
        "List absolute paths to SKILL.md files under configured skill directories (Cursor / Claude).",
      inputSchema: z.object({}),
      execute: async () => executor.listSkills(),
    }),

    read_skill: tool({
      description:
        "Read a SKILL.md file. Path must be absolute and under skill roots, or use a path returned by list_skills.",
      inputSchema: z.object({
        path: z.string(),
      }),
      execute: async ({ path: p }) => executor.readSkill(p),
    }),
  };
}
