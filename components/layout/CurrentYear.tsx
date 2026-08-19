"use client";

import { useSyncExternalStore } from "react";

/** The year never changes while the page is open, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();

/**
 * The footer is statically prerendered, so a server-rendered year would freeze
 * at build time. Render the build year, then correct it after hydration.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  return <>{useSyncExternalStore(noopSubscribe, getClientYear, () => buildYear)}</>;
}
