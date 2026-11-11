"use client";

import React from "react";
import { type ThemeMode, useTheme } from "@/providers/theme-provider";

const OPTIONS: { mode: ThemeMode; label: string; title: string }[] = [
  {
    mode: "system",
    label: "Auto",
    title: "Seguir preferencia del sistema operativo",
  },
  {
    mode: "light",
    label: "Claro",
    title: "Forzar modo claro",
  },
  {
    mode: "dark",
    label: "Oscuro",
    title: "Forzar modo oscuro",
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Selector de tema visual"
      className="inline-flex items-center rounded-lg border border-border-subtle bg-elevated p-0.5"
    >
      {OPTIONS.map((option) => {
        const isActive = theme === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            title={option.title}
            onClick={() => setTheme(option.mode)}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
              isActive
                ? "bg-surface text-content-primary shadow-sm border border-border-subtle"
                : "text-content-muted hover:text-content-primary border border-transparent"
            }`}
          >
            {option.mode === "system" && (
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            )}
            {option.mode === "light" && (
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
            {option.mode === "dark" && (
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

