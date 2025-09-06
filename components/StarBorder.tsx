import "./StarBorder.css";
import React from "react";

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

const StarBorder = ({
  as: Component = "div",
  className = "",
  color = "#763cac",
  speed = "6s",
  thickness = 4,
  children,
  style = {},
  ...rest
}: StarBorderProps) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content" style={{ border: `${thickness}px solid ${color}` }}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder; 