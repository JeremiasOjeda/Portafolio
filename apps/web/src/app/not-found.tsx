import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="py-20">
      <Container size="narrow">
        <Card padding="lg" className="space-y-4 text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Error 404
          </span>
          <h1 className="text-2xl font-bold text-content-primary">
            Ruta o herramienta no disponible
          </h1>
          <p className="mx-auto max-w-md text-sm text-content-secondary">
            La página solicitada no existe o corresponde a una herramienta que aún se encuentra en etapa de desarrollo.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Volver al Hub de Herramientas
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}

