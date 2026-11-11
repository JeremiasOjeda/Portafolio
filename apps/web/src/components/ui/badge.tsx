import React from "react";

export type BadgeVariant = "default" | "accent" | "success" | "muted";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({
  variant = "default",
  dot = false,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    default:
      "bg-elevated text-content-secondary border-border-subtle",
    accent:
      "bg-accent-subtle text-accent border-accent/20",
    success:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    muted:
      "bg-canvas text-content-muted border-border-subtle",
  };

  const dotColorClasses: Record<BadgeVariant, string> = {
    default: "bg-content-muted",
    accent: "bg-accent",
    success: "bg-emerald-500",
    muted: "bg-content-muted/60",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium tracking-tight ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColorClasses[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

