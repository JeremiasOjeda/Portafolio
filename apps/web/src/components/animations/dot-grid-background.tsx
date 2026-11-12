"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/theme-provider";

const DotGrid = dynamic(() => import("./react-bits/dot-grid"), {
  ssr: false,
});

interface DotGridBackgroundProps {
  className?: string;
}

/**
 * Fondo interactivo DotGrid adaptado a la estética Slate monocromática y sobria.
 * - Sin azul: utiliza blanco/plata en modo oscuro y grafito en modo claro.
 * - Física ultra-smooth: menor rigidez, retorno gradual, rebote amortiguado y ondas suaves.
 */
export function DotGridBackground({ className = "" }: DotGridBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  // Paleta neutra de ingeniería: blanco/plata en dark, grafito suave en light (sin azul)
  const baseColor = isDark ? "#1e293b" : "#cbd5e1";
  const activeColor = isDark ? "#f8fafc" : "#334155";
  const glow = isDark ? 0.25 : 0.08;
  const opacity = isDark ? 0.65 : 0.55;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`.trim()}
    >
      <DotGrid
        baseColor={baseColor}
        activeColor={activeColor}
        shape="circle"
        dotSize={2.5}
        gap={28}
        proximity={150}
        strength={0.65}
        bounce={0.28}
        tension={0.2}
        returnDuration={1.3}
        shockRadius={300}
        shockStrength={2}
        swell={0.35}
        stretch={0.25}
        glow={glow}
        fade={0}
        opacity={opacity}
        intro={false}
        mouseInteraction={true}
        clickShock={true}
      />
    </div>
  );
}
