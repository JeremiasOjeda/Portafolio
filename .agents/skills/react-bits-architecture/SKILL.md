---
name: react-bits-architecture
description: >-
  Standardized engineering workflow for adding, adapting, tracking, modifying,
  or removing React Bits animated components in the Next.js App Router project.
  Activate whenever the user mentions React Bits, animations, visual effects,
  or changing/replacing existing animated components.
---

# React Bits Engineering Workflow

Follow this strict architectural workflow so every animation remains modular, theme-aware (Light/Dark Slate), legally compliant, and 100% traceable across the codebase.

## 1. Legal & Variant Selection Rules
1. **Variant**: Always use the **`TS-TW` (TypeScript + Tailwind CSS)** implementation of the React Bits component.
2. **Dependencies**: Prefer components based on pure CSS, HTML5 Canvas, `motion` (Framer Motion), `ogl`, or `three` (all MIT licensed). Avoid proprietary/paid plugins.
3. **Install Scope**: If an animation requires a package (e.g. `motion` or `ogl`), install it specifically inside `apps/web`:
   `pnpm --filter web add <package>`

## 2. Directory Isolation & Barrel Pattern
Never scatter animated components across pages or feature folders.
1. Place the adapted React Bits component file in:
   `apps/web/src/components/animations/react-bits/<kebab-name>.tsx`
2. Re-export it through the central animation barrel:
   `apps/web/src/components/animations/index.ts`
3. Consumer pages/components must ONLY import animations from `@/components/animations`.

## 3. Next.js & Theme Adaptation Checklist (Mandatory before saving)
Every component in `src/components/animations/react-bits/` must comply with:
1. **Client Boundary**: Start the file with `"use client";`. If the component uses WebGL (`ogl` / `three`) or heavy `window` APIs on mount, export a wrapper using `next/dynamic` with `{ ssr: false }`.
2. **Design Token Mapping (Zero Hardcoded Neon)**:
   * Replace hardcoded dark/neon backgrounds (`#000`, `#060010`, `bg-black`) with `bg-surface`, `bg-elevated`, or `var(--bg-surface)`.
   * Replace hardcoded borders with `border-border-subtle` or `var(--border-subtle)`.
   * Replace spotlight/glow/accent colors with `var(--accent-primary)` (or read `resolvedTheme` from `useTheme()` in `@/providers/theme-provider` when passing numeric RGB/Hex colors to a `<canvas>` or WebGL shader so Light and Dark modes both look crisp).
3. **Accessibility**: Respect reduced motion (`motion-reduce:transition-none` or checking `window.matchMedia('(prefers-reduced-motion: reduce)')`).

## 4. Traceability Registry (`apps/web/src/config/animations.registry.ts`)
To guarantee zero forgotten applications when modifying or removing animations later, maintain `apps/web/src/config/animations.registry.ts`.

Whenever you **add**, **update**, or **remove** an animation:
1. Register or update its entry in `ANIMATIONS_REGISTRY`:
   ```ts
   export interface AnimationRegistryItem {
     id: string;                 // e.g. "spotlight-card"
     name: string;               // e.g. "SpotlightCard"
     source: "react-bits" | "custom";
     componentPath: string;      // "src/components/animations/react-bits/spotlight-card.tsx"
     dependencies: string[];     // e.g. ["motion"] or []
     tokensUsed: string[];       // e.g. ["--accent-primary", "--bg-surface"]
     usedIn: string[];           // Exact list of files importing this animation
     description: string;        // Brief note of what it animates
   }
   ```
2. **When modifying or replacing an animation**:
   * First read `apps/web/src/config/animations.registry.ts` to inspect `usedIn` and `dependencies`.
   * Update the single component in `src/components/animations/react-bits/` (or swap its export in `src/components/animations/index.ts`).
   * Verify every file listed in `usedIn`.
   * If removing an animation completely, check if any package in `dependencies` is no longer used by any other entry in `ANIMATIONS_REGISTRY`, and remove unused packages with `pnpm --filter web remove <pkg>`.
   * Run `pnpm run typecheck` to confirm zero broken imports.

