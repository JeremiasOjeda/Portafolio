"use client";

import React, { useEffect, useRef, useState } from "react";
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
  // Se convierte en tuerca en cuanto el usuario hace scroll y NO se vuelve a quitar
  const [hasConvertedToGear, setHasConvertedToGear] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewportAndScroll = () => {
      // En móviles (< 640px) usamos directamente la tuerca para no saturar ni encimar el header
      if (window.innerWidth < 640 || window.scrollY > 25) {
        setHasConvertedToGear(true);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 25) {
        setHasConvertedToGear(true);
        setIsMenuOpen(false);
      }
    };

    checkViewportAndScroll();
    window.addEventListener("resize", checkViewportAndScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkViewportAndScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cerrar al hacer clic fuera del menú flotante
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Botón Tuerca Liquid Glass (siempre visible en móvil, o en desktop una vez scrolleado) */}
      <button
        type="button"
        onClick={() => {
          setHasConvertedToGear(true);
          setIsMenuOpen((prev) => !prev);
        }}
        title="Configuración de tema visual"
        aria-label="Abrir selector de tema"
        aria-expanded={isMenuOpen}
        className={`${
          hasConvertedToGear ? "flex" : "flex sm:hidden"
        } h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-sm text-content-secondary hover:text-content-primary hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-300 ${
          isMenuOpen ? "ring-2 ring-accent/30 scale-105" : ""
        }`}
      >
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${
            isMenuOpen ? "rotate-90 text-accent" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Selector Liquid Glass (Visible al inicio en desktop antes de scrollear, o a la izquierda de la tuerca al activarla) */}
      <div
        role="group"
        aria-label="Selector de tema visual"
        className={`inline-flex items-center rounded-full p-1 border transition-all duration-300 ${
          hasConvertedToGear
            ? "absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap shadow-2xl bg-white/95 dark:bg-slate-900/95 sm:bg-white/75 sm:dark:bg-slate-900/75 backdrop-blur-3xl animate-in fade-in slide-in-from-right-3 zoom-in-95"
            : "relative hidden sm:inline-flex bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl shadow-[0_4px_24px_-1px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.4)]"
        } ${
          !hasConvertedToGear || isMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none hidden"
        } border-white/50 dark:border-white/10`}
      >
        {OPTIONS.map((option) => {
          const isActive = theme === option.mode;
          return (
            <button
              key={option.mode}
              type="button"
              title={option.title}
              onClick={() => {
                setTheme(option.mode);
                if (hasConvertedToGear) setIsMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                isActive
                  ? "bg-white/80 dark:bg-white/15 text-content-primary shadow-sm border border-white/60 dark:border-white/15"
                  : "text-content-muted hover:text-content-primary hover:bg-white/20 dark:hover:bg-white/10 border border-transparent"
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
    </div>
  );
}
