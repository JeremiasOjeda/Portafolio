import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { TOOLS_REGISTRY } from "@/config/tools.registry";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { ToolsHubExplorer } from "@/components/tools/tools-hub-explorer";
import { StrokeText, DotGridBackground } from "@/components/animations";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-10 sm:pb-14">
      {/* Fondo interactivo DotGrid suave y monocromático que cubre todo el fondo salvo el footer */}
      <DotGridBackground className="absolute inset-0 h-full w-full z-0" />

      {/* Contenido principal dispuesto sobre el fondo */}
      <div className="relative z-10 space-y-12">
        {/* Frase animada con StrokeText (trazado SVG con relleno progresivo sin azul) */}
        <section
          aria-label="Presentación"
          className="pt-10 sm:pt-16 pb-4 text-center select-none"
        >
          <Container size="narrow">
            <h1 className="flex flex-col items-center justify-center font-extrabold tracking-tight text-content-primary">
              <StrokeText
                text="La primera impresión"
                strokeColor="#94a3b8"
                fillColor="currentColor"
                strokeWidth={1.5}
                drawDuration={1.3}
                fillDelay={0.15}
                stagger={0.035}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                wipeFrom="left"
                fontSize={64}
                fontWeight={800}
                letterSpacing={-1.5}
                hoverRedraw={true}
                className="w-full max-w-2xl"
              />
              <div className="mt-1 sm:mt-2 w-full max-w-2xl">
                <StrokeText
                  text="se construye en los detalles."
                  strokeColor="#94a3b8"
                  fillColor="currentColor"
                  strokeWidth={1.4}
                  drawDuration={1.4}
                  fillDelay={0.2}
                  stagger={0.03}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  wipeFrom="left"
                  fontSize={52}
                  fontWeight={800}
                  letterSpacing={-1.2}
                  hoverRedraw={true}
                  className="w-full"
                />
              </div>
            </h1>
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
              className="flex flex-col items-start justify-between gap-6 bg-surface/75 backdrop-blur-md border-border-subtle md:flex-row md:items-center"
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
    </div>
  );
}
