export type ToolCategoryId = "todas" | "calculadoras" | "sorteos" | "utilidades";

export type ToolStatus = "active" | "beta" | "coming-soon";

export type ToolEngine = "react" | "iframe";

export interface ToolCategory {
  id: ToolCategoryId;
  label: string;
  description: string;
}

export interface ToolDefinition {
  /** Identificador único y ruta en /herramientas/[slug] */
  slug: string;
  /** Nombre visible de la herramienta */
  title: string;
  /** Resumen corto para la tarjeta del Hub */
  shortDescription: string;
  /** Descripción técnica extendida para la cabecera del ToolShell */
  longDescription: string;
  /** Categoría para filtrado en el Hub */
  category: Exclude<ToolCategoryId, "todas">;
  /** Estado actual de disponibilidad */
  status: ToolStatus;
  /** Etiqueta técnica del stack (ej: "React + TypeScript", "Flutter Web") */
  techBadge: string;
  /** Motor de renderizado dentro del ToolShell */
  engine: ToolEngine;
  /** Ruta estática dentro de public/ cuando engine === 'iframe' */
  iframeSrc?: string;
  /** Destacar en la parte superior del Hub */
  featured?: boolean;
  /** Puntos clave o instrucciones breves mostradas en el pie técnico */
  highlights: string[];
}

