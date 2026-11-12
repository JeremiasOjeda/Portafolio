"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface IframeToolViewerProps {
  title: string;
  src: string;
}

/**
 * Visor estandarizado para aplicaciones compiladas (como Flutter Web).
 * Proporciona indicador de carga, controles Liquid Glass (reiniciar y pantalla completa),
 * y contenedor adaptativo.
 */
export function IframeToolViewer({ title, src }: IframeToolViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReload = () => {
    setIsLoaded(false);
    setReloadKey((prev) => prev + 1);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback si la API de fullscreen está restringida por políticas del navegador
      window.open(src, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen bg-slate-950" : ""
      }`}
    >
      <Card
        padding="none"
        className={`h-full w-full overflow-hidden ${
          isFullscreen ? "rounded-none border-0" : ""
        }`}
      >
        {/* Barra superior tipo ventana de ingeniería con estética Liquid Glass */}
        <div className="flex items-center justify-between gap-2 border-b border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs">
          <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] sm:text-xs text-content-muted">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">
              <span className="hidden sm:inline">runtime: </span>flutter-web
              <span className="hidden md:inline">-canvaskit</span>
            </span>
          </div>

          {/* Controles Liquid Glass en el header del runtime */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Botón Reiniciar Vista */}
            <button
              type="button"
              onClick={handleReload}
              title="Reiniciar vista y estado de la aplicación"
              aria-label="Reiniciar vista"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-2.5 py-1 sm:px-3 text-[11px] sm:text-xs font-medium text-content-secondary shadow-sm transition-all duration-200 hover:bg-white/60 dark:hover:bg-slate-900/60 hover:text-content-primary active:scale-95"
            >
              <svg
                className="h-3 w-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
              <span className="hidden sm:inline">Reiniciar vista</span>
              <span className="sm:hidden">Reiniciar</span>
            </button>

            {/* Botón Pantalla Completa */}
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-2.5 py-1 sm:px-3 text-[11px] sm:text-xs font-medium text-content-secondary shadow-sm transition-all duration-200 hover:bg-white/60 dark:hover:bg-slate-900/60 hover:text-content-primary active:scale-95"
            >
              {isFullscreen ? (
                <>
                  <svg
                    className="h-3 w-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                  </svg>
                  <span>Salir</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-3 w-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  <span className="hidden sm:inline">Pantalla completa</span>
                  <span className="sm:hidden">Expandir</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Contenedor del Iframe */}
        <div
          className={`relative w-full bg-slate-950 transition-all ${
            isFullscreen ? "h-[calc(100vh-45px)]" : "h-[560px] sm:h-[680px] lg:h-[740px]"
          }`}
        >
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface text-content-secondary">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-border-strong border-t-accent" />
              <p className="font-mono text-xs text-content-muted">
                Inicializando motor gráfico de {title}...
              </p>
            </div>
          )}
          <iframe
            key={reloadKey}
            src={src}
            title={title}
            onLoad={() => setIsLoaded(true)}
            className="h-full w-full border-0"
            allow="clipboard-write; fullscreen"
          />
        </div>
      </Card>
    </div>
  );
}
