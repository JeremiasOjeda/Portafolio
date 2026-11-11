"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IframeToolViewerProps {
  title: string;
  src: string;
}

/**
 * Visor estandarizado para aplicaciones compiladas (como Flutter Web).
 * Proporciona indicador de carga, recarga rápida y contenedor responsivo.
 */
export function IframeToolViewer({ title, src }: IframeToolViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setIsLoaded(false);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Barra superior tipo ventana de ingeniería */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-elevated px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2 font-mono text-content-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>runtime: flutter-web-canvaskit</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReload}>
            Reiniciar vista
          </Button>
        </div>
      </div>

      {/* Contenedor del Iframe */}
      <div className="relative h-[680px] w-full bg-slate-950 sm:h-[740px]">
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
          allow="clipboard-write"
        />
      </div>
    </Card>
  );
}

