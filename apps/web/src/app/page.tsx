import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { TOOLS_REGISTRY } from "@/config/tools.registry";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ToolsHubExplorer } from "@/components/tools/tools-hub-explorer";

export default function HomePage() {
  const activeCount = TOOLS_REGISTRY.filter(
    (t) => t.status !== "coming-soon"
  ).length;

  return (
    <div className="space-y-14 py-10 sm:py-14">
      {/* Cabecera Técnica Tools-First */}
      <section className="border-b border-border-subtle pb-10">
        <Container className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent">Ecosistema {siteConfig.brand}</Badge>
            <Badge variant="default">
              {activeCount} herramientas operativas
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="space-y-3 lg:col-span-8">
              <h1 className="text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
                Hub de Herramientas &amp; Utilidades Digitales
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-content-secondary">
                {siteConfig.hero.hubSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
              <Link
                href="/sobre-mi"
                className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-4 py-2 text-xs font-semibold text-content-primary transition-colors hover:bg-elevated"
              >
                Conocer perfil profesional →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Directorio Interactivo de Herramientas */}
      <section id="catalogo" aria-label="Catálogo de herramientas">
        <Container>
          <ToolsHubExplorer tools={TOOLS_REGISTRY} />
        </Container>
      </section>

      {/* Banner de Propuesta Profesional */}
      <section>
        <Container>
          <Card
            padding="lg"
            className="flex flex-col items-start justify-between gap-6 bg-elevated/40 md:flex-row md:items-center"
          >
            <div className="max-w-2xl space-y-1.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {siteConfig.name} · {siteConfig.role}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-content-primary">
                {siteConfig.hero.tagline}
              </h2>
              <p className="text-sm text-content-secondary">
                “{siteConfig.hero.valueProposition}”
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/sobre-mi"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
              >
                Sobre mí y contacto
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}

