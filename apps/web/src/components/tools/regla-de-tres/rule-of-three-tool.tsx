"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProportionMode = "directa" | "inversa";

interface PresetExample {
  label: string;
  mode: ProportionMode;
  a: string;
  b: string;
  c: string;
  unitA: string;
  unitB: string;
  description: string;
}

const PRESET_EXAMPLES: PresetExample[] = [
  {
    label: "Receta de cocina (Directa)",
    mode: "directa",
    a: "4",
    b: "250",
    c: "10",
    unitA: "personas",
    unitB: "gramos de harina",
    description: "Si para 4 personas necesito 250g, ¿cuánto necesito para 10?",
  },
  {
    label: "Cálculo de porcentaje (Directa)",
    mode: "directa",
    a: "100",
    b: "15000",
    c: "21",
    unitA: "%",
    unitB: "ARS",
    description: "Si el 100% es $15.000, ¿cuánto representa el 21%?",
  },
  {
    label: "Tiempos de entrega (Inversa)",
    mode: "inversa",
    a: "2",
    b: "12",
    c: "4",
    unitA: "desarrolladores",
    unitB: "días",
    description: "Si 2 personas tardan 12 días, ¿cuánto tardarán 4 al mismo ritmo?",
  },
];

function parseNumericInput(val: string): number | null {
  const normalized = val.trim().replace(",", ".");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatResult(num: number): string {
  if (Number.isInteger(num)) return num.toString();
  return Number(num.toFixed(4)).toString();
}

export function RuleOfThreeTool() {
  const [mode, setMode] = useState<ProportionMode>("directa");
  const [valueA, setValueA] = useState<string>("100");
  const [valueB, setValueB] = useState<string>("250");
  const [valueC, setValueC] = useState<string>("40");
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => {
    const a = parseNumericInput(valueA);
    const b = parseNumericInput(valueB);
    const c = parseNumericInput(valueC);

    if (a === null || b === null || c === null) {
      return { status: "incomplete" as const };
    }

    if (mode === "directa") {
      if (a === 0) {
        return {
          status: "error" as const,
          message: "El valor A no puede ser 0 en proporción directa (división por cero).",
        };
      }
      const x = (b * c) / a;
      return {
        status: "valid" as const,
        a,
        b,
        c,
        x,
        formattedX: formatResult(x),
        formulaText: `X = (${b} × ${c}) / ${a}`,
        numerator: formatResult(b * c),
        denominator: formatResult(a),
      };
    } else {
      if (c === 0) {
        return {
          status: "error" as const,
          message: "El valor C no puede ser 0 en proporción inversa (división por cero).",
        };
      }
      const x = (a * b) / c;
      return {
        status: "valid" as const,
        a,
        b,
        c,
        x,
        formattedX: formatResult(x),
        formulaText: `X = (${a} × ${b}) / ${c}`,
        numerator: formatResult(a * b),
        denominator: formatResult(c),
      };
    }
  }, [mode, valueA, valueB, valueC]);

  const handleCopy = async () => {
    if (calculation.status !== "valid") return;
    try {
      await navigator.clipboard.writeText(calculation.formattedX);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback silencioso
    }
  };

  const handleClear = () => {
    setValueA("");
    setValueB("");
    setValueC("");
    setCopied(false);
  };

  const applyPreset = (preset: PresetExample) => {
    setMode(preset.mode);
    setValueA(preset.a);
    setValueB(preset.b);
    setValueC(preset.c);
    setCopied(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Panel principal de cálculo (7 columnas en desktop) */}
      <Card padding="lg" className="space-y-6 lg:col-span-7">
        {/* Selector de Modo */}
        <div className="flex flex-col justify-between gap-4 border-b border-border-subtle pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-semibold text-content-primary">
              Tipo de Proporcionalidad
            </h2>
            <p className="text-xs text-content-muted">
              {mode === "directa"
                ? "Directa: Si una magnitud aumenta, la otra también aumenta."
                : "Inversa: Si una magnitud aumenta, la otra disminuye."}
            </p>
          </div>

          <div
            role="group"
            aria-label="Seleccionar modo de regla de tres"
            className="inline-flex rounded-lg border border-border-subtle bg-elevated p-1"
          >
            <button
              type="button"
              onClick={() => setMode("directa")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
                mode === "directa"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-content-secondary hover:text-content-primary"
              }`}
            >
              Directa
            </button>
            <button
              type="button"
              onClick={() => setMode("inversa")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
                mode === "inversa"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-content-secondary hover:text-content-primary"
              }`}
            >
              Inversa
            </button>
          </div>
        </div>

        {/* Matriz de Inputs A -> B y C -> X */}
        <div className="space-y-4">
          {/* Fila 1: A ---> B */}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-11">
            <div className="space-y-1.5 sm:col-span-5">
              <label
                htmlFor="input-a"
                className="flex items-center justify-between text-xs font-medium text-content-secondary"
              >
                <span>Valor A (Referencia)</span>
                <span className="font-mono text-[11px] text-content-muted">A</span>
              </label>
              <input
                id="input-a"
                type="text"
                inputMode="decimal"
                value={valueA}
                onChange={(e) => setValueA(e.target.value)}
                placeholder="Ej: 100"
                className="w-full rounded-lg border border-border-subtle bg-elevated/60 px-3.5 py-2.5 font-mono text-base font-medium text-content-primary placeholder:text-content-muted focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div className="hidden justify-center pt-5 text-content-muted sm:col-span-1 sm:flex">
              <span className="font-mono text-sm">→</span>
            </div>

            <div className="space-y-1.5 sm:col-span-5">
              <label
                htmlFor="input-b"
                className="flex items-center justify-between text-xs font-medium text-content-secondary"
              >
                <span>Valor B (Equivalencia)</span>
                <span className="font-mono text-[11px] text-content-muted">B</span>
              </label>
              <input
                id="input-b"
                type="text"
                inputMode="decimal"
                value={valueB}
                onChange={(e) => setValueB(e.target.value)}
                placeholder="Ej: 250"
                className="w-full rounded-lg border border-border-subtle bg-elevated/60 px-3.5 py-2.5 font-mono text-base font-medium text-content-primary placeholder:text-content-muted focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Fila 2: C ---> X */}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-11">
            <div className="space-y-1.5 sm:col-span-5">
              <label
                htmlFor="input-c"
                className="flex items-center justify-between text-xs font-medium text-content-secondary"
              >
                <span>Valor C (Consulta)</span>
                <span className="font-mono text-[11px] text-content-muted">C</span>
              </label>
              <input
                id="input-c"
                type="text"
                inputMode="decimal"
                value={valueC}
                onChange={(e) => setValueC(e.target.value)}
                placeholder="Ej: 40"
                className="w-full rounded-lg border border-border-subtle bg-elevated/60 px-3.5 py-2.5 font-mono text-base font-medium text-content-primary placeholder:text-content-muted focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div className="hidden justify-center pt-5 text-content-muted sm:col-span-1 sm:flex">
              <span className="font-mono text-sm">→</span>
            </div>

            <div className="space-y-1.5 sm:col-span-5">
              <div className="flex items-center justify-between text-xs font-medium text-accent">
                <span>Incógnita resultante</span>
                <span className="font-mono text-[11px]">X</span>
              </div>
              <div
                aria-live="polite"
                className="flex h-[46px] items-center justify-between rounded-lg border border-accent/40 bg-accent-subtle px-3.5 font-mono text-lg font-bold text-content-primary"
              >
                <span className="truncate">
                  {calculation.status === "valid" ? calculation.formattedX : "—"}
                </span>
                <Badge variant="accent">X</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de error si hay división por cero */}
        {calculation.status === "error" && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-600 dark:text-red-400">
            {calculation.message}
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
          <Button variant="secondary" size="sm" onClick={handleClear}>
            Limpiar campos
          </Button>

          <Button
            variant="primary"
            size="sm"
            disabled={calculation.status !== "valid"}
            onClick={handleCopy}
          >
            {copied ? "✓ Resultado copiado" : "Copiar resultado"}
          </Button>
        </div>
      </Card>

      {/* Panel lateral: Desglose de Fórmula y Ejemplos (5 columnas en desktop) */}
      <div className="space-y-6 lg:col-span-5">
        <Card padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              Resolución paso a paso
            </h3>
            <Badge variant="default">
              {mode === "directa" ? "X = (B · C) / A" : "X = (A · B) / C"}
            </Badge>
          </div>

          {calculation.status === "valid" ? (
            <div className="space-y-3 rounded-lg border border-border-subtle bg-elevated/60 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-content-secondary">
                <span>1. Planteo:</span>
                <span>{calculation.formulaText}</span>
              </div>
              <div className="flex items-center justify-between text-content-secondary">
                <span>2. Producto:</span>
                <span>
                  X = {calculation.numerator} / {calculation.denominator}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border-subtle pt-2.5 text-sm font-bold text-content-primary">
                <span>3. Resultado:</span>
                <span className="text-accent">X = {calculation.formattedX}</span>
              </div>
            </div>
          ) : (
            <p className="rounded-lg border border-border-subtle bg-elevated/40 p-4 text-xs text-content-muted">
              Ingresa valores numéricos en A, B y C para visualizar el desglose algebraico en tiempo real.
            </p>
          )}
        </Card>

        {/* Casos de ejemplo rápidos */}
        <Card padding="md" className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
            Ejemplos rápidos de prueba
          </h3>
          <div className="space-y-2">
            {PRESET_EXAMPLES.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => applyPreset(preset)}
                className="w-full rounded-lg border border-border-subtle bg-elevated/40 p-3 text-left transition-colors hover:border-border-strong hover:bg-elevated"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-content-primary">
                    {preset.label}
                  </span>
                  <span className="font-mono text-[11px] text-accent">
                    Cargar →
                  </span>
                </div>
                <p className="mt-1 text-xs text-content-muted">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

