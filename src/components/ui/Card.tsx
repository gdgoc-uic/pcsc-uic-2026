import type { ReactNode, CSSProperties } from "react";

export type CardProps = {
  children: ReactNode;
  padding?: number;
  style?: CSSProperties;
};

export function Card({ children, padding = 16, style }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 0,
        padding,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        background: "white",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Card;


