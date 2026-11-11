# Directrices de Ingeniería — SoyJere Portafolio & Hub

## 1. Privacidad y Seguridad en Git
* **Autoría de Commits:** Usar SIEMPRE `JeremiasOjeda <137433109+JeremiasOjeda@users.noreply.github.com>`. NUNCA exponer el correo personal en commits.
* **Control Pre-commit:** Verificar con `git status` y `git add -n .` que no se incluyan `.env*`, credenciales, `.dart_tool/`, `build/` ni `apps/web/public/projects/`.

## 2. Sistema de Diseño Técnico / Slate y Control Centralizado
* **Cero Neón:** Mantener estética sobria de ingeniería de software (paleta Slate, bordes sutiles, acento azul cobalto formal).
* **Tokens Semánticos Obligatorios:** Usar siempre las clases conectadas a `apps/web/src/app/globals.css` (`bg-canvas`, `bg-surface`, `bg-elevated`, `border-border-subtle`, `border-border-strong`, `text-content-primary`, `text-content-secondary`, `text-content-muted`, `bg-accent`) en lugar de colores hardcodeados o clases `dark:` dispersas.
* **Fuentes de Verdad:**
  * Datos personales, textos y stack: `apps/web/src/config/site.config.ts`.
  * Catálogo de herramientas: `apps/web/src/config/tools.registry.ts`.
  * Inventario de animaciones: `apps/web/src/config/animations.registry.ts`.

## 3. Gestión de Animaciones y React Bits
* Cuando el usuario solicite añadir, modificar, reemplazar o eliminar animaciones o componentes de **React Bits**, DEBES leer y seguir estrictamente la skill `react-bits-architecture` (`.agents/skills/react-bits-architecture/SKILL.md`).

