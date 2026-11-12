"use client";

import React, { useEffect, useState } from "react";
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
  // El header solo aparece cuando el usuario está arriba del todo de la página
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Arriba del todo (con un pequeño margen de 25px)
      setIsAtTop(window.scrollY <= 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-border-subtle/30 bg-canvas/30 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isAtTop
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <Container className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
        {/* Identidad de marca y navegación */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-6">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap text-xs sm:text-sm font-semibold tracking-tight text-content-primary"
          >
            {siteConfig.name}
          </Link>

          {/* Navegación principal */}
          <nav
            aria-label="Navegación principal"
            className="flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname.startsWith("/herramientas")
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-medium transition-colors ${
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
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
