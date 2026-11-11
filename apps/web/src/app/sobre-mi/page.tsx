import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `Sobre Mí — ${siteConfig.name}`,
  description: siteConfig.about.primaryBio,
};

export default function AboutPage() {
  return (
    <div className="space-y-14 py-10 sm:py-14">
      {/* Encabezado de Perfil */}
      <section className="border-b border-border-subtle pb-10">
        <Container className="space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent">{siteConfig.role}</Badge>
            {siteConfig.availability.isAvailable && (
              <Badge variant="success" dot>
                {siteConfig.availability.label}
              </Badge>
            )}
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="text-lg font-medium text-content-primary">
              {siteConfig.hero.tagline}
            </p>
            <p className="text-sm leading-relaxed text-content-secondary sm:text-base">
              {siteConfig.about.primaryBio}
            </p>
            <p className="text-sm leading-relaxed text-content-secondary sm:text-base">
              {siteConfig.about.productVision}
            </p>
          </div>
        </Container>
      </section>

      {/* Metodología de Trabajo */}
      <section>
        <Container className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              Metodología de trabajo
            </h2>
            <p className="text-lg font-semibold text-content-primary">
              “{siteConfig.hero.valueProposition}”
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {siteConfig.about.methodology.map((item) => (
              <Card key={item.step} padding="md" className="space-y-2.5">
                <span className="font-mono text-xs font-bold text-accent">
                  PASO {item.step}
                </span>
                <h3 className="text-base font-semibold text-content-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-content-secondary">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Stack y Capacidades Técnicas */}
      <section>
        <Container className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              Tecnologías y Enfoque
            </h2>
            <p className="text-lg font-semibold text-content-primary">
              Stack Técnico por Capas
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {siteConfig.stack.map((group) => (
              <Card key={group.category} padding="md" className="space-y-4">
                <h3 className="text-sm font-semibold text-content-primary">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contacto y Redes Oficiales */}
      <section id="contacto">
        <Container>
          <Card padding="lg" className="space-y-6 bg-elevated/40">
            <div className="max-w-2xl space-y-2">
              <Badge variant="success" dot>
                {siteConfig.availability.details}
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight text-content-primary">
                {siteConfig.contact.title}
              </h2>
              <p className="text-sm leading-relaxed text-content-secondary">
                {siteConfig.contact.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
              >
                Conectar en LinkedIn
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-xs font-semibold text-content-primary transition-colors hover:bg-elevated"
              >
                Instagram (@jereeojeda)
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border-subtle bg-surface px-4 py-2.5 text-xs font-semibold text-content-secondary transition-colors hover:text-content-primary"
              >
                GitHub
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg px-3 py-2.5 text-xs font-medium text-content-muted transition-colors hover:text-content-primary"
              >
                ← Volver al Hub de Herramientas
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}

