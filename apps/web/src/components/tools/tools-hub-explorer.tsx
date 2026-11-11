"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { ToolCategoryId, ToolDefinition } from "@/types/tool.types";
import { TOOL_CATEGORIES } from "@/config/tools.registry";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolsHubExplorerProps {
  tools: ToolDefinition[];
}

export function ToolsHubExplorer({ tools }: ToolsHubExplorerProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ToolCategoryId>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "todas" || tool.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.shortDescription.toLowerCase().includes(query) ||
        tool.techBadge.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [tools, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Barra de controles: Filtros de categoría + Buscador */}
      <div className="flex flex-col justify-between gap-4 border-b border-border-subtle pb-5 md:flex-row md:items-center">
        <div
          role="tablist"
          aria-label="Filtrar herramientas por categoría"
          className="flex flex-wrap items-center gap-1.5"
        >
          {TOOL_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-elevated text-content-secondary hover:text-content-primary"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Buscador rápido */}
        <div className="relative w-full md:w-72">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar herramienta o stack..."
            aria-label="Buscar herramienta"
            className="w-full rounded-lg border border-border-subtle bg-surface py-1.5 pl-9 pr-3 text-sm text-content-primary placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {/* Grid de tarjetas de herramientas */}
      {filteredTools.length === 0 ? (
        <Card padding="lg" className="text-center">
          <p className="text-sm font-medium text-content-secondary">
            No se encontraron herramientas que coincidan con tu búsqueda.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("todas");
              setSearchQuery("");
            }}
            className="mt-3 text-xs font-medium text-accent hover:underline"
          >
            Restablecer filtros
          </button>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filteredTools.map((tool) => {
            const isAvailable = tool.status !== "coming-soon";

            const cardContent = (
              <Card
                padding="md"
                interactive={isAvailable}
                className={`flex h-full flex-col justify-between gap-5 ${
                  !isAvailable ? "opacity-75" : ""
                }`}
              >
                <div className="space-y-3">
                  {/* Fila superior de metadatos */}
                  <div className="flex items-center justify-between gap-2">
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
                <div className="flex items-center justify-between border-t border-border-subtle pt-3.5 text-xs font-medium">
                  <span className="font-mono text-content-muted">
                    /herramientas/{tool.slug}
                  </span>
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-accent">
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
      )}
    </div>
  );
}

