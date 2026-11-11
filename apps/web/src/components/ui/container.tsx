import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({
  size = "default",
  className = "",
  children,
  ...props
}: ContainerProps) {
  const maxWidthClass =
    size === "narrow"
      ? "max-w-4xl"
      : size === "wide"
        ? "max-w-7xl"
        : "max-w-6xl";

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

