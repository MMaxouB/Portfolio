"use client";

import { useApp } from "@/providers/AppProviders";

export function TerminalHint() {
  const { openTerminal } = useApp();
  return (
    <button
      onClick={openTerminal}
      aria-label="Open terminal"
      className="group flex items-center gap-3 rounded text-left transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="title-block normal-case tracking-[0.1em] text-text-muted transition-colors group-hover:text-accent">
        $ type &quot;help&quot; to explore
      </span>
      <span
        aria-hidden="true"
        className="h-px w-6 bg-border-hover transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-accent-dim"
      />
    </button>
  );
}
