"use client";

import React from "react";
import Link from "next/link";
import type { ToolDefinition } from "@/types/tool.types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolsHubExplorerProps {
  tools: ToolDefinition[];
}

export function ToolsHubExplorer({ tools }: ToolsHubExplorerProps) {
  return (
    <div className="space-y-6">
      {/* Grid directo de tarjetas de herramientas */}
      <div className="grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => {
          const isAvailable = tool.status !== "coming-soon";

          const cardContent = (
            <Card
              padding="md"
              interactive={isAvailable}
              className={`flex h-full flex-col justify-between gap-5 bg-surface/85 backdrop-blur-md border-border-subtle ${
                !isAvailable ? "opacity-75" : ""
              }`}
            >
              <div className="space-y-3">
                {/* Fila superior de metadatos */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isAvailable ? "success" : "muted"}
                      dot={isAvailable}
                    >
                      {isAvailable ? "Disponible" : "En desarrollo"}
                    </Badge>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-content-muted">
                      {tool.category}
                    </span>
                  </div>
                  <Badge variant={isAvailable ? "accent" : "default"}>
                    {tool.techBadge}
                  </Badge>
                </div>

                {/* Título y descripción */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold tracking-tight text-content-primary group-hover:text-accent">
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-content-secondary">
                    {tool.shortDescription}
                  </p>
                </div>
              </div>

              {/* Pie de tarjeta */}
              <div className="flex items-center justify-between gap-2 border-t border-border-subtle pt-3.5 text-xs font-medium">
                <span className="truncate font-mono text-content-muted">
                  /herramientas/{tool.slug}
                </span>
                {isAvailable ? (
                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-accent">
                    Abrir herramienta
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="text-content-muted">Próxima entrega</span>
                )}
              </div>
            </Card>
          );

          return isAvailable ? (
            <Link
              key={tool.slug}
              href={`/herramientas/${tool.slug}`}
              className="group block h-full focus:outline-none"
            >
              {cardContent}
            </Link>
          ) : (
            <div key={tool.slug} className="h-full">
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
