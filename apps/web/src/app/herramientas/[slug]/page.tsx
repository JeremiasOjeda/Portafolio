import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveTools, getToolBySlug } from "@/config/tools.registry";
import { ToolShell } from "@/components/layout/tool-shell";
import { IframeToolViewer } from "@/components/tools/iframe-tool-viewer";
import { RuleOfThreeTool } from "@/components/tools/regla-de-tres/rule-of-three-tool";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-genera estáticamente las rutas de todas las herramientas activas.
 */
export async function generateStaticParams() {
  return getActiveTools().map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "Herramienta no encontrada" };
  }

  return {
    title: tool.title,
    description: tool.shortDescription,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || tool.status === "coming-soon") {
    notFound();
  }

  return (
    <ToolShell tool={tool}>
      {tool.engine === "iframe" && tool.iframeSrc ? (
        <IframeToolViewer title={tool.title} src={tool.iframeSrc} />
      ) : tool.slug === "regla-de-tres" ? (
        <RuleOfThreeTool />
      ) : null}
    </ToolShell>
  );
}

