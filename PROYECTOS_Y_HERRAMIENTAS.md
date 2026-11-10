# Proyectos y Herramientas Interactivas (Hub)

Este documento describe a fondo cada proyecto y herramienta interactiva que vive dentro del ecosistema **SoyJere**, su lógica de funcionamiento, arquitectura actual y cómo se traducen a **React**.

---

## 🧭 Concepto de "Hub de Herramientas"

En lugar de ser solo un portafolio curricular, `soyjere.com` incluye utilidades reales diseñadas para ser compartidas en historias y publicaciones de Instagram:
* Los seguidores no solo "leen sobre Jeremías", sino que **usan sus creaciones**.
* Demuestra en la práctica habilidad técnica, sentido de diseño y resolución de problemas.

---

## 1. 🧮 Proyecto: Calculadora Regla de 3

* **Ruta original:** `https://soyjere.com/proyectos/regla-de-tres`
* **Tipo original:** Archivo único `index.html` con CSS y JavaScript inline.
* **Propósito:** Calcular proporciones matemáticas directas e inversas de forma inmediata, sin publicidad molesta y con diseño moderno.

### Características y Funcionalidades:
1. **Selector de Modo:**
   * **Directa:** A más, más (o a menos, menos). Fórmula: `X = (B · C) / A`.
   * **Inversa:** A más, menos (o a menos, más). Fórmula: `X = (A · B) / C`.
2. **Entrada de Datos en Tiempo Real:**
   * Tres campos numéricos: `A`, `B`, y `C` con cálculo instantáneo al escribir (sin recargar).
   * Admite números enteros y decimales con coma o punto.
3. **Explicación Paso a Paso:**
   * Desglose visual de la fórmula con los números reales ingresados por el usuario.
4. **Acciones Rápidas:**
   * Botón para **Copiar resultado** al portapapeles con confirmación visual.
   * Botón para **Limpiar campos**.
   * Tarjetas de ejemplos preconfigurados (ej. cálculo de porcentajes, recetas, tiempos de viaje).

### Migración a React:

  ```
* **Ventajas en React:**
  * Componentes reutilizables de Input y Botones Neón.
  * Animaciones fluidas al cambiar entre modo directo e inverso usando Framer Motion (`layoutId` o `AnimatePresence`).
  * Sin necesidad de manipular directamente el DOM (`document.getElementById`).

---

## 2. 🎡 Proyecto: Custom Draw Roulette (Ruleta de Sorteos)

* **Ruta original:** `https://soyjere.com/proyectos/ruleta`
* **Tipo original:** Proyecto completo anidado en **Flutter Web** (`projects/custom-draw-roulette/`).
* **Propósito:** Ruleta interactiva personalizable para sorteos en vivo en Instagram, dinámicas de grupo, selección aleatoria y armado de equipos.

### Características y Funcionalidades:
1. **Dos Modos de Operación:**
   * **Modo Solo (Sorteo clásico):** Gira la ruleta y elige un participante ganador.
   * **Modo Equipos (Team Balancer):** Soporta de 2 a 4 equipos (Verde, Rojo, Azul, Naranja). Cada giro asigna al participante seleccionado al equipo con menor cantidad de miembros de forma balanceada.
2. **Sistema de Pesos y Probabilidades:**
   * Cada participante tiene un peso configurable.
   * Los sectores de la ruleta se dibujan con un ángulo proporcional a su peso relativo:
     $$\text{Ángulo} = \left(\frac{\text{peso\_participante}}{\sum \text{pesos}}\right) \times 360^\circ$$
3. **Descarte de Ganadores:**
   * Posibilidad de descartar participantes que ya ganaron para que la ruleta continúe con los restantes sin recargar.
4. **Física de Giro Fluida:**
   * Animación con aceleración inicial y desaceleración por inercia realista.
   * El puntero superior detecta el sector ganador exacto según el ángulo final.
5. **Modal de Ganador / Celebración:**
   * Diálogo animado con resplandor neón, nombre del ganador y opción de descarte inmediato o continuar.

## 3. 💡 Ideas para Futuros Sub-Proyectos (Expansión para Instagram)

Gracias a la ligereza de React, sumar nuevas herramientas al Hub será tan simple como crear una carpeta en `src/pages/tools/`:

1. **Generador de Enlaces de WhatsApp con Mensaje Predefinido:**
   * Permite a negocios o creadores ingresar su teléfono y texto para obtener un link directo `wa.me` acortado o con código QR.
2. **Calculadora Freelance (Cotizador de Horas):**
   * Herramienta donde el usuario pone sus gastos mensuales, horas deseadas de trabajo y margen para calcular su valor hora de desarrollo o diseño.
3. **Contador de Caracteres y Formateador para Instagram:**
   * Limpia saltos de línea molestos de Instagram, cuenta caracteres para reels/carruseles y sugiere hashtags.
