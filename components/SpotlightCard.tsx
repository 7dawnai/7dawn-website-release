"use client";

import { useRef, useState, ReactNode } from "react";

// Adapted from react-bits SpotlightCard: sharp corners, low-intensity white
// light to match the FogCanvas mouse-glow language. All surface styling
// (border, bg, padding) comes from className so each section keeps its own look.
export default function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
  spotlightColor = "rgba(255, 255, 255, 0.08)",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove: React.MouseEventHandler = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </Tag>
  );
}
