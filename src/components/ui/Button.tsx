import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#0d9488",
    color: "white",
    border: "1px solid #0d9488",
  },
  secondary: {
    backgroundColor: "white",
    color: "#0d9488",
    border: "1px solid #0d9488",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#0d9488",
    border: "1px solid transparent",
  },
};

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: "0.4rem 0.75rem", fontSize: 14 },
  md: { padding: "0.6rem 1rem", fontSize: 16 },
  lg: { padding: "0.8rem 1.25rem", fontSize: 18 },
};

export function Button({ children, variant = "primary", size = "md", style, ...rest }: ButtonProps) {
  return (
    <button
      style={{
        borderRadius: 0,
        cursor: "pointer",
        transition: "all 160ms ease",
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;


