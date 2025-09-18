import type { ReactNode } from "react";

type BadgeVariant = "info" | "success" | "warning" | "neutral";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  style?: React.CSSProperties;
};

const styles: Record<BadgeVariant, React.CSSProperties> = {
  info: { background: "#ecfeff", color: "#0d9488", border: "1px solid #99f6e4" },
  success: { background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" },
  warning: { background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" },
  neutral: { background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" },
};

export function Badge({ children, variant = "info", style }: BadgeProps) {
  return (
    <span
      style={{
        ...styles[variant],
        padding: "2px 8px",
        borderRadius: 0,
        fontSize: 12,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Badge;


