interface DiagramDotGridProps {
  count?: number;

  columns?: number;
}

export default function DiagramDotGrid({
  count = 480,
  columns = 24,
}: DiagramDotGridProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        padding: "12px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(93,100,254,0.18)",
            margin: "auto",
          }}
        />
      ))}
    </div>
  );
}
