/**
 * REGISTRO CENTRAL DE TRAZABILIDAD DE ANIMACIONES (React Bits & Custom)
 *
 * Cada vez que se añade, modifica o elimina un componente animado de React Bits,
 * se registra aquí junto con sus dependencias y la lista exacta de archivos (`usedIn`)
 * donde fue aplicado. Así puedes modificarlo o reemplazarlo por completo sin olvidar
 * ninguna referencia.
 */

export interface AnimationRegistryItem {
  /** Identificador único en kebab-case (ej: "spotlight-card") */
  id: string;
  /** Nombre del componente exportado en src/components/animations/index.ts */
  name: string;
  /** Origen del componente */
  source: "react-bits" | "custom";
  /** Ruta del archivo fuente aislado dentro de apps/web */
  componentPath: string;
  /** Paquetes npm requeridos exclusivamente por esta animación (ej: ["motion"]) */
  dependencies: string[];
  /** Variables CSS semánticas de globals.css conectadas al componente */
  tokensUsed: string[];
  /** Lista exacta de archivos consumidores que importan esta animación */
  usedIn: string[];
  /** Descripción técnica de su propósito visual */
  description: string;
}

export const ANIMATIONS_REGISTRY: AnimationRegistryItem[] = [
  {
    id: "stroke-text",
    name: "StrokeText",
    source: "react-bits",
    componentPath: "src/components/animations/react-bits/stroke-text.tsx",
    dependencies: ["gsap"],
    tokensUsed: ["--text-primary", "--border-strong"],
    usedIn: ["src/app/page.tsx"],
    description:
      "Animación de trazado tipográfico vectorial SVG con GSAP (dibujado de trazo stroke y relleno wipe progresivo) con re-dibujado al hover para la frase principal del Hero.",
  },
  {
    id: "dot-grid",
    name: "DotGridBackground",
    source: "react-bits",
    componentPath: "src/components/animations/react-bits/dot-grid.tsx",
    dependencies: [],
    tokensUsed: ["--bg-canvas", "--border-subtle"],
    usedIn: ["src/app/page.tsx"],
    description:
      "Malla de puntos monocromática interactiva WebGL2 con física amortiguada ultra-smooth, retorno suave de 1.3s y ondas sutiles. Cubre todo el fondo de la página excluyendo el footer.",
  },
];
