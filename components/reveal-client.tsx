"use client";

import { useEffect } from "react";

/**
 * Reveals `.reveal-view` elements as they enter the viewport (IntersectionObserver
 * — works in every browser). Runs per page rather than in the root layout so it
 * re-wires after Next.js client-side navigation.
 */
export default function RevealClient() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll<HTMLElement>(".reveal-view").forEach((el) => {
      if (el.classList.contains("revealed")) return;
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal-pending");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}