"use client";

import { useSyncExternalStore } from "react";
import { useApp } from "@/providers/AppProviders";

/** The platform never changes at runtime, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};
const isMacClient = () => /mac|iphone|ipad/i.test(navigator.userAgent);

export function PaletteButton() {
  const { openPalette } = useApp();
  // Server renders "Ctrl" and the client swaps it in after hydration — no mismatch.
  const isMac = useSyncExternalStore(noopSubscribe, isMacClient, () => false);
  const modifier = isMac ? "⌘" : "Ctrl";

  return (
    <button
      onClick={openPalette}
      aria-label={`Open command palette (${modifier} K)`}
      className="hidden items-center gap-2 rounded-md border border-border-subtle bg-surface px-3 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-border-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex"
    >
      <span>Search</span>
      <kbd className="rounded border border-border-hover px-1 py-0.5 text-[10px] leading-none">
        {modifier}K
      </kbd>
    </button>
  );
}
