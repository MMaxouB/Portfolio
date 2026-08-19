"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AppContextValue {
  paletteOpen: boolean;
  terminalOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
}

const AppContext = createContext<AppContextValue>({
  paletteOpen: false,
  terminalOpen: false,
  openPalette: () => {},
  closePalette: () => {},
  openTerminal: () => {},
  closeTerminal: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  // The two overlays are mutually exclusive, so one piece of state describes both.
  const [overlay, setOverlay] = useState<"palette" | "terminal" | null>(null);

  const openPalette = useCallback(() => setOverlay("palette"), []);
  const openTerminal = useCallback(() => setOverlay("terminal"), []);
  const closePalette = useCallback(
    () => setOverlay((current) => (current === "palette" ? null : current)),
    []
  );
  const closeTerminal = useCallback(
    () => setOverlay((current) => (current === "terminal" ? null : current)),
    []
  );

  // Global shortcuts — Cmd/Ctrl + K toggles the palette, Escape closes both
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOverlay((current) => (current === "palette" ? null : "palette"));
        return;
      }
      if (event.key === "Escape") {
        setOverlay(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      paletteOpen: overlay === "palette",
      terminalOpen: overlay === "terminal",
      openPalette,
      closePalette,
      openTerminal,
      closeTerminal,
    }),
    [overlay, openPalette, closePalette, openTerminal, closeTerminal]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
