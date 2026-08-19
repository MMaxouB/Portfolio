"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { MAIN_NAV, SOCIAL_NAV } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { useDialog } from "@/lib/useDialog";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const close = useCallback(() => setIsOpen(false), []);
  // Same chrome as the palette and the terminal: scroll lock, focus trap, Escape.
  useDialog(isOpen, panelRef, close);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        className="-mr-2 rounded-md p-2 text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Open menu"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border-subtle bg-surface p-6 shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wide text-text-primary">
                  MENU
                </span>
                <button
                  onClick={close}
                  className="-mr-2 rounded-md p-2 text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {MAIN_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="block border-b border-border-subtle/50 py-2 text-lg font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/cyber"
                  onClick={close}
                  className="block border-b border-border-subtle/50 py-2 text-lg font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Cyber / Lab
                </Link>
              </nav>

              <div className="mt-auto flex flex-col gap-6 pt-8">
                <div className="flex gap-4">
                  {SOCIAL_NAV.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded font-mono text-xs text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <Link href="/contact" onClick={close} className="block">
                  <Button variant="primary" className="w-full">
                    Let&apos;s build something.
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
