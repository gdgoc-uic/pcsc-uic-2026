import type { ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode;
  maxWidth?: number | string;
};

export function Container({ children, maxWidth = 1200 }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        marginInline: "auto",
        paddingInline: "1rem",
      }}
    >
      {children}
    </div>
  );
}

export default Container;


