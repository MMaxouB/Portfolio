"use client";

import { RefObject, useEffect } from "react";

/**
 * Shared modal chrome for the command palette and the terminal:
 * scroll lock, focus trap and focus restore.
 *
 * Kept in one place so both overlays behave identically — PORTFOLIO_SPEC §17
 * requires either surface to be fully usable from the keyboard alone.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Reference counted so a hand-off between two overlays in the same commit
 * (terminal → palette) cannot leave the page permanently locked.
 */
let scrollLockCount = 0;
let restoreStyles: { overflow: string; paddingRight: string } | null = null;

function lockScroll() {
  if (scrollLockCount === 0) {
    const { body } = document;
    restoreStyles = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    // Compensate for the disappearing scrollbar so the layout does not jump.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
  }
  scrollLockCount += 1;
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0 && restoreStyles) {
    document.body.style.overflow = restoreStyles.overflow;
    document.body.style.paddingRight = restoreStyles.paddingRight;
    restoreStyles = null;
  }
}

export function useDialog(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose?: () => void
) {
  // Lock page scroll while the overlay is up.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  // Return focus to whatever opened the dialog once it closes.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    return () => {
      // The trigger may have unmounted (mobile menu); ignore if it is gone.
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open]);

  // Escape closes, and Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && onClose) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      // Content inside the dialog may claim Tab for itself (terminal completion).
      if (event.defaultPrevented) return;
      const container = containerRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, containerRef, onClose]);
}
