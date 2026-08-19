"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
import { COMMANDS, Command, CommandAction, CommandGroup } from "@/lib/commands";
import { searchCommands } from "@/lib/search";
import { isExternalHref } from "@/lib/navigation";
import { useApp } from "@/providers/AppProviders";
import { useDialog } from "@/lib/useDialog";

const GROUP_LABELS: Record<CommandGroup, string> = {
  navigation: "Navigation",
  projects: "Projects",
  social: "Connect",
  system: "System",
};

export function CommandPalette() {
  const { paletteOpen, closePalette, openTerminal } = useApp();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useDialog(paletteOpen, panelRef);

  // Reset on open
  useEffect(() => {
    if (!paletteOpen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setActiveIndex(0);
    // Defer focus so the animation doesn't fight it
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [paletteOpen]);

  const results = useMemo(() => searchCommands(COMMANDS, query), [query]);

  // Keep activeIndex in bounds when the list shrinks
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex((index) => Math.min(index, Math.max(results.length - 1, 0)));
  }, [results.length]);

  // Scroll active item into view
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const executeAction = useCallback(
    (action: CommandAction) => {
      closePalette();

      if (action.type === "navigate") {
        // https:, mailto:, tel: … router.push() cannot handle those
        if (isExternalHref(action.href)) {
          window.open(action.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(action.href);
        }
        return;
      }

      // Small delay so the palette exit animation finishes first
      setTimeout(openTerminal, shouldReduceMotion ? 0 : 200);
    },
    [closePalette, openTerminal, router, shouldReduceMotion]
  );

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(results.length - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      executeAction(results[activeIndex].action);
    }
  }

  /**
   * Group for rendering while keeping one flat index per row, so ↑/↓ walk the
   * whole list and `aria-activedescendant` stays in sync with the ranking.
   */
  const sections = useMemo(() => {
    const map = new Map<CommandGroup, { command: Command; index: number }[]>();
    results.forEach((command, index) => {
      const rows = map.get(command.group) ?? [];
      rows.push({ command, index });
      map.set(command.group, rows);
    });
    return Array.from(map.entries());
  }, [results]);

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.97, y: shouldReduceMotion ? 0 : -8 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: shouldReduceMotion ? 0 : -8 },
  };

  return (
    <AnimatePresence>
      {paletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closePalette}
            className="fixed inset-0 z-[100] bg-bg-primary/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="palette-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[20vh] z-[101] mx-auto max-w-xl overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border-subtle px-4">
              <Search size={16} className="shrink-0 text-text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search pages, projects, technologies…"
                className="h-12 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded="true"
                aria-label="Search commands"
                aria-autocomplete="list"
                aria-controls="palette-list"
                aria-activedescendant={
                  results.length > 0 ? `palette-item-${activeIndex}` : undefined
                }
              />
              <button
                onClick={closePalette}
                className="shrink-0 rounded p-1 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close command palette"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Results */}
            <ul
              ref={listRef}
              id="palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-80 overflow-y-auto overscroll-contain py-2"
            >
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-text-muted">
                  No results for &ldquo;{query}&rdquo;
                </li>
              )}

              {sections.map(([group, rows]) => (
                <li key={group} role="presentation">
                  <p
                    id={`palette-group-${group}`}
                    className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted"
                  >
                    {GROUP_LABELS[group]}
                  </p>
                  <ul role="group" aria-labelledby={`palette-group-${group}`}>
                    {rows.map(({ command, index }) => {
                      const isActive = index === activeIndex;
                      return (
                        <li
                          key={command.id}
                          id={`palette-item-${index}`}
                          role="option"
                          aria-selected={isActive}
                          data-index={index}
                          onClick={() => executeAction(command.action)}
                          onMouseMove={() => setActiveIndex(index)}
                          className={`mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors ${
                            isActive
                              ? "bg-accent/10 text-text-primary"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          <span className="truncate text-sm font-medium">
                            {command.label}
                          </span>
                          <div className="flex shrink-0 items-center gap-3">
                            {command.description && (
                              <span className="hidden text-xs text-text-muted sm:block">
                                {command.description}
                              </span>
                            )}
                            {command.hint && (
                              <span className="rounded border border-border-subtle px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                                {command.hint}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Footer hint */}
            <div className="flex items-center gap-4 border-t border-border-subtle px-4 py-2 font-mono text-[10px] text-text-muted">
              <span>
                <kbd>↑↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> select
              </span>
              <span>
                <kbd>Esc</kbd> close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
