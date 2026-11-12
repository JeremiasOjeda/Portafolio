/**
 * Barrel central de animaciones (React Bits adaptadas al sistema Técnico / Slate).
 *
 * Regla de arquitectura:
 * Ninguna página o componente debe importar archivos directamente desde
 * `./react-bits/*`. Todo consumo se realiza desde `@/components/animations`
 * y queda registrado en `@/config/animations.registry`.
 */

export { DotGridBackground } from "./dot-grid-background";
export { default as DotGrid } from "./react-bits/dot-grid";
export { default as StrokeText } from "./react-bits/stroke-text";
