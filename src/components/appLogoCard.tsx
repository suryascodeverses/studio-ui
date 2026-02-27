"use client";

import { useEffect, useState } from "react";

export interface LogoPair {
  bg: string;

  content: React.ReactNode;

  bg2: string;

  content2: React.ReactNode;
}

interface AppLogoCardProps {
  pair: LogoPair;

  index: number;

  size?: number;
}

export default function AppLogoCard({
  pair,
  index,
  size = 44,
}: AppLogoCardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => setFlipped((f) => !f), 3600);
      return () => clearInterval(interval);
    }, index * 700);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div style={{ width: size, height: size, perspective: 800 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(.34,1.56,.64,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 8,
            background: pair.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pair.content}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 8,
            background: pair.bg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotateY(180deg)",
          }}
        >
          {pair.content2}
        </div>
      </div>
    </div>
  );
}
