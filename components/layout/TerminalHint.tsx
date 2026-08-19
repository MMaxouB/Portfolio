"use client";

import { useApp } from "@/providers/AppProviders";

export function TerminalHint() {
  const { openTerminal } = useApp();
  return (
    <button
      onClick={openTerminal}
      aria-label="Open terminal"
      className="text-left text-xs text-text-muted font-mono opacity-50 hover:opacity-100 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
    >
      $ type &quot;help&quot; to explore
    </button>
  );
}
