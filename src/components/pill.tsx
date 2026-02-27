import React from "react";

export type PillVariant = "dim" | "bright" | "cta";

interface PillProps {
  label: string;
  variant?: PillVariant;
  delay?: string;
}

const VARIANT_STYLES: Record<PillVariant, React.CSSProperties> = {
  dim: {
    background: "#122054",
    border: "1px solid rgba(93,100,254,0.3)",
    color: "#b8c8e0",
  },
  bright: {
    background: "#1b2f6b",
    border: "1px solid rgba(93,100,254,0.5)",
    color: "#c8d4f0",
  },
  cta: {
    background: "#635bff",
    border: "1px solid #7b74ff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default function Pill({
  label,
  variant = "dim",
  delay = "0s",
}: PillProps) {
  return (
    <div
      style={{
        ...VARIANT_STYLES[variant],
        borderRadius: 6,
        fontSize: "0.78rem",
        fontWeight: 500,
        padding: "0.42rem 0.85rem",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: 5,
        animationName: "strPillIn",
        animationDuration: "0.6s",
        animationFillMode: "both",
        animationDelay: delay,
      }}
    >
      {label}
      {variant === "cta" && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.25 3a.75.75 0 0 0-.75.75v6c0 .41.34.75.75.75h6c.41 0 .75-.34.75-.75v-1.5a.75.75 0 1 1 1.5 0v1.5c0 1.24-1 2.25-2.25 2.25h-6C1.01 12 0 11 0 9.75v-6C0 2.51 1 1.5 2.25 1.5h1.5a.75.75 0 1 1 0 1.5h-1.5Z"
            fill="#F2F7FE"
          />
          <path
            d="M7 0a.75.75 0 1 0 0 1.5h2.44L3.72 7.22a.75.75 0 0 0 1.06 1.06l5.72-5.72V5A.75.75 0 0 0 12 5V.75a.75.75 0 0 0-.75-.75H7Z"
            fill="#F2F7FE"
          />
        </svg>
      )}
    </div>
  );
}
