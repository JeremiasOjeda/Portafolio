import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  interactive = false,
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const interactiveClasses = interactive
    ? "transition-all duration-150 hover:border-border-strong hover:shadow-sm"
    : "";

  return (
    <div
      className={`rounded-xl border border-border-subtle bg-surface ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

