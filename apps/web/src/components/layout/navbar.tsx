"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV_ITEMS = [
  { href: "/", label: "Herramientas" },
  { href: "/sobre-mi", label: "Sobre Mí" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Identidad de marca */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-content-primary"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border-strong bg-surface font-mono text-xs font-bold text-accent transition-colors group-hover:border-accent">
              SJ
            </span>
            <span>{siteConfig.brand}</span>
            <span className="hidden rounded border border-border-subtle bg-elevated px-1.5 py-0.5 font-mono text-[11px] font-normal text-content-muted sm:inline-block">
              hub
            </span>
          </Link>

          {/* Navegación principal */}
          <nav aria-label="Navegación principal" className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname.startsWith("/herramientas")
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-elevated text-content-primary"
                      : "text-content-secondary hover:bg-elevated/60 hover:text-content-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Estado y control de tema */}
        <div className="flex items-center gap-3">
          {siteConfig.availability.isAvailable && (
            <Link href="/sobre-mi#contacto" className="hidden md:inline-flex">
              <Badge variant="success" dot>
                {siteConfig.availability.label}
              </Badge>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

