import React from "react";
import Link from "next/link";
import type { ToolDefinition } from "@/types/tool.types";
import { getActiveTools } from "@/config/tools.registry";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ToolShellProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

/**
 * Contenedor estandarizado para todas las herramientas del ecosistema.
 * Garantiza que cualquier utilidad (React nativo o Iframe) comparta la misma
 * estructura de navegación, contexto técnico y accesibilidad.
 */
export function ToolShell({ tool, children }: ToolShellProps) {
  const otherTools = getActiveTools().filter((item) => item.slug !== tool.slug);

  return (
    <div className="py-8 sm:py-10">
      <Container className="space-y-8">
        {/* Barra de navegación contextual (Breadcrumb) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-5">
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-2 text-xs font-medium text-content-muted"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-content-secondary transition-colors hover:text-content-primary"
            >
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
                <path d="m15 18-6-6 6-6" />
              </svg>
              Hub de Herramientas
            </Link>
            <span>/</span>
            <span className="capitalize">{tool.category}</span>
            <span>/</span>
            <span className="text-content-primary">{tool.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="accent">{tool.techBadge}</Badge>
            {tool.engine === "iframe" && tool.iframeSrc && (
              <a
                href={tool.iframeSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-surface px-2.5 py-1 text-xs font-medium text-content-secondary transition-colors hover:border-border-strong hover:text-content-primary"
              >
                <span>Pantalla completa</span>
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Cabecera técnica de la herramienta */}
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
            {tool.title}
          </h1>
          <p className="text-sm leading-relaxed text-content-secondary sm:text-base">
            {tool.longDescription}
          </p>
        </div>

        {/* Área de trabajo principal de la herramienta */}
        <section aria-label={`Área interactiva de ${tool.title}`}>
          {children}
        </section>

        {/* Especificaciones técnicas y navegación cruzada */}
        <div className="grid gap-6 border-t border-border-subtle pt-8 lg:grid-cols-3">
          <Card padding="md" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              Características técnicas de esta herramienta
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-content-secondary">
              {tool.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {otherTools.length > 0 && (
            <Card padding="md" className="flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                  Otras herramientas activas
                </h2>
                <div className="space-y-2">
                  {otherTools.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/herramientas/${other.slug}`}
                      className="block rounded-lg border border-border-subtle bg-elevated/50 p-3 transition-colors hover:border-border-strong hover:bg-elevated"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-content-primary">
                          {other.title}
                        </span>
                        <Badge variant="default">{other.techBadge}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-content-muted">
                        {other.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}

