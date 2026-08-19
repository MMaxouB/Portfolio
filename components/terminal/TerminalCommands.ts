/**
 * Terminal command registry.
 *
 * The registry is the single source of truth: `help` is generated from it, so
 * the listed commands and the executable ones can never drift apart. Nothing
 * here touches the OS — every command is a pure description of an in-app
 * intent, resolved by the caller through the injected context.
 */

import { ALL_ROUTES, getSocialHref } from "@/lib/navigation";
import { getProjects } from "@/lib/projects";

export type TerminalOutputKind = "output" | "error";

/** Everything a command is allowed to do, injected by the Terminal component. */
export interface TerminalContext {
  /** Whitespace-split arguments, excluding the command name itself */
  args: string[];
  /** Current app route, for `pwd` */
  pathname: string;
  /** Most-recent-first command history */
  history: readonly string[];
  navigate: (href: string) => void;
  openExternal: (href: string) => void;
  openPalette: () => void;
  closeTerminal: () => void;
  clear: () => void;
}

export interface TerminalResult {
  output?: string | string[];
  kind?: TerminalOutputKind;
}

export interface TerminalCommandDef {
  cmd: string;
  description: string;
  /** Alternative spellings, resolvable but absent from `help` */
  aliases?: string[];
  /** Executable but not listed by `help` — jokes and shell muscle memory */
  hidden?: boolean;
  run: (ctx: TerminalContext) => TerminalResult | void;
}

/** Build a command that just navigates and reports where it went. */
function navigateTo(
  cmd: string,
  href: string,
  description: string
): TerminalCommandDef {
  return {
    cmd,
    description,
    run: ({ navigate }) => {
      navigate(href);
      return { output: `Navigating to ${href}…` };
    },
  };
}

export const TERMINAL_COMMANDS: TerminalCommandDef[] = [
  {
    cmd: "help",
    description: "List available commands",
    run: () => ({ output: buildHelp() }),
  },
  {
    cmd: "whoami",
    description: "A brief introduction",
    run: () => ({
      output: [
        "Maxime",
        "Software Engineer with a security mindset.",
        "Builds backend systems, automation pipelines and AI tools.",
      ],
    }),
  },
  {
    cmd: "ls",
    description: "List the pages of this site",
    run: () => ({ output: ALL_ROUTES.join("   ") }),
  },
  {
    cmd: "open",
    description: "Open a project by slug — open <slug>",
    run: ({ args, navigate }) => {
      const slugs = getProjects().map((project) => project.slug);
      const slug = args[0];

      if (!slug) {
        return {
          output: ["Usage: open <slug>", "", `Available: ${slugs.join(", ")}`],
          kind: "error",
        };
      }
      if (!slugs.includes(slug)) {
        return {
          output: [
            `No project named "${slug}".`,
            `Available: ${slugs.join(", ")}`,
          ],
          kind: "error",
        };
      }

      navigate(`/projects/${slug}`);
      return { output: `Opening ${slug}…` };
    },
  },

  navigateTo("projects", "/projects", "Navigate to projects"),
  navigateTo("about", "/about", "Navigate to about"),
  navigateTo("skills", "/expertise", "Navigate to expertise / skills"),
  navigateTo("timeline", "/timeline", "Navigate to timeline"),
  navigateTo("cyber", "/cyber", "Navigate to cyber / lab"),
  navigateTo("contact", "/contact", "Navigate to contact"),

  {
    cmd: "github",
    description: "Open GitHub profile",
    run: ({ openExternal }) => {
      const href = getSocialHref("GitHub");
      if (!href) {
        return { output: "No GitHub link configured.", kind: "error" };
      }
      openExternal(href);
      return { output: "Opening GitHub…" };
    },
  },
  {
    cmd: "palette",
    description: "Open the command palette",
    run: ({ openPalette }) => {
      openPalette();
      return { output: "Opening command palette…" };
    },
  },
  {
    cmd: "clear",
    description: "Clear the terminal",
    run: ({ clear }) => {
      clear();
    },
  },
  {
    cmd: "exit",
    description: "Close the terminal",
    aliases: ["close", "quit", "q"],
    run: ({ closeTerminal }) => {
      closeTerminal();
    },
  },

  // ---------------------------------------------------------------------
  // Hidden — shell muscle memory and a couple of sober jokes
  // ---------------------------------------------------------------------
  {
    cmd: "pwd",
    description: "Print the current route",
    hidden: true,
    run: ({ pathname }) => ({ output: pathname }),
  },
  {
    cmd: "echo",
    description: "Echo the arguments back",
    hidden: true,
    run: ({ args }) => ({ output: args.join(" ") }),
  },
  {
    cmd: "history",
    description: "Show recent commands",
    hidden: true,
    run: ({ history }) =>
      history.length === 0
        ? { output: "No history yet." }
        : {
            output: [...history]
              .reverse()
              .map((entry, i) => `  ${String(i + 1).padStart(3)}  ${entry}`),
          },
  },
  {
    cmd: "sudo",
    description: "Elevate privileges",
    hidden: true,
    run: () => ({
      output: "Nice try. This incident has been logged.",
      kind: "error",
    }),
  },
  {
    cmd: "cd",
    description: "Change directory",
    hidden: true,
    run: () => ({ output: 'Only one directory here. Try "ls".' }),
  },
  {
    cmd: "man",
    description: "Read the manual",
    hidden: true,
    run: () => ({ output: 'No manual entry. Try "help".' }),
  },
];

/** `help` output, generated from the registry so it can never go stale. */
function buildHelp(): string[] {
  const visible = TERMINAL_COMMANDS.filter((command) => !command.hidden);
  const width = Math.max(...visible.map((command) => command.cmd.length)) + 2;

  return [
    "Available commands:",
    "",
    ...visible.map(
      ({ cmd, description }) => `  ${cmd.padEnd(width)}${description}`
    ),
    "",
    "Tab completes · ↑ ↓ browse history · Esc closes",
  ];
}

/** Every name the terminal answers to, including aliases — used by Tab completion. */
export const TERMINAL_COMMAND_NAMES: string[] = TERMINAL_COMMANDS.flatMap(
  (command) => [command.cmd, ...(command.aliases ?? [])]
).sort();

export function resolveCommand(name: string): TerminalCommandDef | undefined {
  const needle = name.toLowerCase();
  return TERMINAL_COMMANDS.find(
    (command) =>
      command.cmd === needle || command.aliases?.includes(needle)
  );
}

/**
 * Longest prefix shared by every candidate — what Tab completes to when the
 * input is ambiguous ("c" → "c", "cl" → "clear").
 */
export function commonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}
