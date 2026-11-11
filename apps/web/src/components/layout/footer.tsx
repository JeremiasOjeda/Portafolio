import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border-subtle bg-surface/60 py-8">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-content-primary">
            <span>{siteConfig.name}</span>
            <span className="text-content-muted">·</span>
            <span className="font-normal text-content-secondary">
              {siteConfig.role}
            </span>
          </div>
          <p className="text-xs text-content-muted">
            © {currentYear} {siteConfig.domain}. Arquitectura modular sobre Next.js &amp; Tailwind Slate.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-content-secondary">
          <Link
            href="/"
            className="transition-colors hover:text-content-primary"
          >
            Hub de Herramientas
          </Link>
          <Link
            href="/sobre-mi"
            className="transition-colors hover:text-content-primary"
          >
            Sobre Mí
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-content-primary"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-content-primary"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-content-primary"
          >
            Instagram
          </a>
        </div>
      </Container>
    </footer>
  );
}

