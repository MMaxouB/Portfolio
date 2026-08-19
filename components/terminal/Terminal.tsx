"use client";

import { FormEvent, useCallback, useEffect, useReducer, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, Terminal as TerminalIcon } from "lucide-react";
import {
  TERMINAL_COMMAND_NAMES,
  TerminalContext,
  TerminalOutputKind,
  commonPrefix,
  resolveCommand,
} from "./TerminalCommands";
import { useApp } from "@/providers/AppProviders";
import { useDialog } from "@/lib/useDialog";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface OutputLine {
  id: number;
  kind: "input" | TerminalOutputKind;
  content: string | string[];
}

interface TerminalState {
  lines: OutputLine[];
  input: string;
  /** Most-recent-first, capped */
  history: string[];
  /** -1 = editing a fresh line, 0 = most recent history entry */
  historyIndex: number;
  nextId: number;
}

type TerminalAction =
  | { type: "PUSH"; kind: OutputLine["kind"]; content: string | string[] }
  | { type: "SET_INPUT"; value: string }
  | { type: "SUBMIT" }
  | { type: "HISTORY_STEP"; delta: 1 | -1 }
  | { type: "CLEAR" }
  | { type: "RESET" };

const HISTORY_LIMIT = 50;

const WELCOME: string[] = [
  "maxime@portfolio — interactive terminal",
  'Type "help" to see available commands.',
];

function push(
  state: TerminalState,
  kind: OutputLine["kind"],
  content: string | string[]
): TerminalState {
  return {
    ...state,
    lines: [...state.lines, { id: state.nextId, kind, content }],
    nextId: state.nextId + 1,
  };
}

function reducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "PUSH":
      return push(state, action.kind, action.content);

    case "SET_INPUT":
      return { ...state, input: action.value };

    case "SUBMIT": {
      const command = state.input.trim();
      const next = push(state, "input", state.input);
      return {
        ...next,
        input: "",
        historyIndex: -1,
        history: command
          ? [command, ...state.history.filter((entry) => entry !== command)].slice(
              0,
              HISTORY_LIMIT
            )
          : state.history,
      };
    }

    case "HISTORY_STEP": {
      if (state.history.length === 0) return state;
      const index = Math.min(
        Math.max(state.historyIndex + action.delta, -1),
        state.history.length - 1
      );
      return {
        ...state,
        historyIndex: index,
        input: index === -1 ? "" : state.history[index],
      };
    }

    case "CLEAR":
      return { ...state, lines: [] };

    // Idempotent, so React's double-invoked effects cannot duplicate the banner
    case "RESET":
      return {
        ...state,
        lines: [{ id: state.nextId, kind: "output", content: WELCOME }],
        nextId: state.nextId + 1,
        input: "",
        historyIndex: -1,
      };

    default:
      return state;
  }
}

const INITIAL_STATE: TerminalState = {
  lines: [],
  input: "",
  history: [],
  historyIndex: -1,
  nextId: 0,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Terminal() {
  const { terminalOpen, closeTerminal, openPalette } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useDialog(terminalOpen, panelRef, closeTerminal);

  // Fresh session on every open; history survives so ↑ still works.
  useEffect(() => {
    if (!terminalOpen) return;
    dispatch({ type: "RESET" });
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [terminalOpen]);

  // Pin the view to the newest line without scrolling the page behind us.
  useEffect(() => {
    const output = outputRef.current;
    if (!terminalOpen || !output) return;
    output.scrollTo({
      top: output.scrollHeight,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [state.lines, terminalOpen, shouldReduceMotion]);

  const buildContext = useCallback(
    (args: string[]): TerminalContext => ({
      args,
      pathname,
      history: state.history,
      // Navigating means the user wants to see that page, not the overlay on top of it.
      navigate: (href) => {
        router.push(href);
        closeTerminal();
      },
      openExternal: (href) => window.open(href, "_blank", "noopener,noreferrer"),
      openPalette,
      closeTerminal,
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [pathname, state.history, router, openPalette, closeTerminal]
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const raw = state.input;
    dispatch({ type: "SUBMIT" });

    const [name, ...args] = raw.trim().split(/\s+/).filter(Boolean);
    if (!name) return;

    const command = resolveCommand(name);
    if (!command) {
      dispatch({
        type: "PUSH",
        kind: "error",
        content: `Unknown command: "${name}". Type "help" to see available commands.`,
      });
      return;
    }

    const result = command.run(buildContext(args));
    if (result?.output !== undefined && result.output !== "") {
      dispatch({
        type: "PUSH",
        kind: result.kind ?? "output",
        content: result.output,
      });
    }
  }

  /** Tab: complete to the longest unambiguous prefix, or list the candidates. */
  function handleComplete() {
    const [name, ...rest] = state.input.split(/\s+/);
    // Only the command name completes — arguments are free-form.
    if (rest.length > 0) return;

    const partial = name.toLowerCase();
    if (!partial) return;

    const matches = TERMINAL_COMMAND_NAMES.filter((candidate) =>
      candidate.startsWith(partial)
    );
    if (matches.length === 0) return;

    const completion = commonPrefix(matches);
    if (completion.length > partial.length) {
      dispatch({ type: "SET_INPUT", value: completion });
    } else if (matches.length > 1) {
      dispatch({ type: "PUSH", kind: "output", content: matches.join("   ") });
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({ type: "HISTORY_STEP", delta: 1 });
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      dispatch({ type: "HISTORY_STEP", delta: -1 });
    } else if (event.key === "Tab") {
      // Tab completes the command instead of moving focus out of the prompt.
      event.preventDefault();
      event.stopPropagation();
      handleComplete();
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      dispatch({ type: "CLEAR" });
    }
  }

  /** Clicking the transcript hands focus back to the prompt, unless selecting text. */
  function handleTranscriptClick() {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.97, y: shouldReduceMotion ? 0 : 16 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: shouldReduceMotion ? 0 : 16 },
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeTerminal}
            className="fixed inset-0 z-[100] bg-bg-primary/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="terminal-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-8 z-[101] mx-auto max-w-2xl overflow-hidden rounded-xl border border-border-subtle bg-bg-primary font-mono text-sm shadow-2xl"
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-border-subtle bg-surface px-4 py-3">
              <TerminalIcon size={14} className="text-accent" aria-hidden="true" />
              <span className="flex-1 text-xs text-text-muted">
                maxime@portfolio ~ $
              </span>
              <button
                onClick={closeTerminal}
                className="rounded p-1 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close terminal"
              >
                <X size={13} aria-hidden="true" />
              </button>
            </div>

            {/* Transcript */}
            <div
              ref={outputRef}
              onClick={handleTranscriptClick}
              className="flex h-64 flex-col gap-1 overflow-y-auto overscroll-contain p-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {state.lines.map((line) => {
                const rows = Array.isArray(line.content)
                  ? line.content
                  : [line.content];
                return (
                  <div key={line.id} className="flex flex-col gap-0.5">
                    {rows.map((text, index) => (
                      <p
                        key={index}
                        className={
                          line.kind === "input"
                            ? "text-text-primary"
                            : line.kind === "error"
                            ? "text-red-400"
                            : "whitespace-pre-wrap text-text-secondary"
                        }
                      >
                        {line.kind === "input" ? (
                          <>
                            <span className="mr-2 text-accent">$</span>
                            {text}
                          </>
                        ) : (
                          text
                        )}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Prompt */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border-subtle px-4 py-3"
            >
              <span className="select-none text-accent" aria-hidden="true">
                $
              </span>
              <input
                ref={inputRef}
                value={state.input}
                onChange={(event) =>
                  dispatch({ type: "SET_INPUT", value: event.target.value })
                }
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-base text-text-primary caret-accent outline-none placeholder:text-text-muted md:text-sm"
                placeholder="type a command…"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
