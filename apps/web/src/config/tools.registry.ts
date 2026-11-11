import type { ToolCategory, ToolDefinition } from "@/types/tool.types";

/**
 * Categorías disponibles en el filtro del Hub.
 */
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "todas",
    label: "Todas las herramientas",
    description: "Catálogo completo de utilidades activas y en desarrollo",
  },
  {
    id: "calculadoras",
    label: "Calculadoras",
    description: "Herramientas de cálculo rápido y desglose matemático",
  },
  {
    id: "sorteos",
    label: "Sorteos & Dinámicas",
    description: "Selección aleatoria, ruletas ponderadas y armado de equipos",
  },
  {
    id: "utilidades",
    label: "Utilidades Digitales",
    description: "Herramientas de productividad para creadores y desarrollo",
  },
];

/**
 * Registro central de herramientas del ecosistema SoyJere.
 *
 * Para añadir o modificar cualquier herramienta, edita únicamente esta lista.
 * Tanto el Home (/) como las rutas dinámicas (/herramientas/[slug]) se alimentan
 * automáticamente de este contrato.
 */
export const TOOLS_REGISTRY: ToolDefinition[] = [
  {
    slug: "regla-de-tres",
    title: "Calculadora de Regla de 3",
    shortDescription:
      "Resuelve proporciones directas e inversas en tiempo real con desglose paso a paso de la fórmula.",
    longDescription:
      "Herramienta de cálculo proporcional instantáneo para relaciones directas e inversas. Incluye visualización explícita del planteo matemático, ejemplos precargados de uso cotidiano y copia rápida del resultado.",
    category: "calculadoras",
    status: "active",
    techBadge: "React + TypeScript",
    engine: "react",
    featured: true,
    highlights: [
      "Soporte para proporción directa (A más, más) e inversa (A más, menos).",
      "Cálculo reactivo instantáneo al escribir, admitiendo decimales.",
      "Explicación paso a paso con reemplazo real de variables en la ecuación.",
    ],
  },
  {
    slug: "ruleta",
    title: "Custom Draw Roulette",
    shortDescription:
      "Ruleta interactiva con sistema de pesos probabilísticos, descarte de ganadores y balanceador automático de equipos.",
    longDescription:
      "Aplicación para sorteos en vivo, dinámicas de grupo y distribución equilibrada de equipos (2 a 4 equipos). Permite asignar pesos personalizados a cada participante para ajustar el ángulo relativo de su sector en la rueda.",
    category: "sorteos",
    status: "active",
    techBadge: "Flutter Web",
    engine: "iframe",
    iframeSrc: "/projects/ruleta/index.html",
    featured: true,
    highlights: [
      "Modo Solo (sorteo clásico con descarte) y Modo Equipos (Team Balancer de 2 a 4 grupos).",
      "Ángulo de sector calculado dinámicamente según el peso relativo de cada participante.",
      "Motor de giro con aceleración y desaceleración inercial fluida.",
    ],
  },
  {
    slug: "generador-whatsapp",
    title: "Generador de Links y QR para WhatsApp",
    shortDescription:
      "Crea enlaces directos wa.me con mensaje predefinido codificado y código QR descargable al instante.",
    longDescription:
      "Utilidad pensada para negocios, freelancers y creadores que necesitan compartir un acceso directo de contacto con texto personalizado y código QR listo para imprenta o redes.",
    category: "utilidades",
    status: "coming-soon",
    techBadge: "Próximamente",
    engine: "react",
    highlights: [
      "Validación internacional de código de país y número.",
      "Vista previa del mensaje y generación de QR en formato SVG/PNG.",
    ],
  },
  {
    slug: "cotizador-freelance",
    title: "Calculadora de Valor Hora Freelance",
    shortDescription:
      "Estima tu tarifa por hora y presupuesto por proyecto según costos fijos, horas productivas y margen objetivo.",
    longDescription:
      "Calculadora financiera para profesionales independientes que permite estructurar costos operativos, impuestos, vacaciones y margen de ahorro para definir tarifas sostenibles.",
    category: "calculadoras",
    status: "coming-soon",
    techBadge: "Próximamente",
    engine: "react",
    highlights: [
      "Cálculo de horas facturables reales vs. horas totales.",
      "Desglose de tarifa mínima, tarifa recomendada y cotización por módulo.",
    ],
  },
];

/**
 * Helpers de consulta del registro
 */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((tool) => tool.slug === slug);
}

export function getActiveTools(): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((tool) => tool.status !== "coming-soon");
}

