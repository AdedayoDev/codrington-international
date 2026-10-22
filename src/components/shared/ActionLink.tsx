import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ActionLinkProps = LinkProps & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "outline-light";
};

export function ActionLink({
  children,
  className = "",
  variant = "primary",
  ...linkProps
}: ActionLinkProps) {
  return (
    <Link
      className={`action-link action-link--${variant} ${className}`.trim()}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
