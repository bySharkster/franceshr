import { useRef } from "react";

interface ScrollToFocusOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  highlightDuration?: number;
  highlightClasses?: string[];
}

const DEFAULT_OPTIONS: ScrollToFocusOptions = {
  behavior: "smooth",
  block: "center",
  highlightDuration: 2000,
  highlightClasses: ["ring-2", "ring-emerald-600", "ring-offset-2", "ring-offset-background"],
};

/**
 * Hook for managing scroll-to-focus functionality with optional highlight effect
 * @returns Object with refs map and scrollToElement function
 */
export function useScrollToFocus<T extends HTMLElement = HTMLDivElement>(
  options: ScrollToFocusOptions = {},
) {
  const refs = useRef<Map<string, T>>(new Map());
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  /**
   * Scrolls to an element and optionally highlights it
   * @param id - The unique identifier for the element
   */
  const scrollToElement = (id: string) => {
    const element = refs.current.get(id);
    if (element) {
      element.scrollIntoView({
        behavior: mergedOptions.behavior,
        block: mergedOptions.block,
      });

      // Add temporary highlight effect
      const classes = mergedOptions.highlightClasses;
      if (classes && classes.length > 0) {
        element.classList.add(...classes);
        setTimeout(() => {
          element.classList.remove(...classes);
        }, mergedOptions.highlightDuration);
      }
    }
  };

  /**
   * Register a ref callback for an element
   * @param id - The unique identifier for the element
   * @returns Ref callback function
   */
  const registerRef = (id: string) => (el: T | null) => {
    if (el) {
      refs.current.set(id, el);
    } else {
      refs.current.delete(id);
    }
  };

  return {
    refs,
    scrollToElement,
    registerRef,
  };
}
