interface AnimPathProps {
  d: string;

  dur?: string;

  begin?: string;

  stroke?: string;

  particleColor?: string;
}

export default function AnimPath({
  d,
  dur = "2s",
  begin = "0s",
  stroke = "#5D64FE",
  particleColor = "#7B74FF",
}: AnimPathProps) {
  return (
    <>
      <path
        d={d}
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.55"
      />

      <circle r="3" fill={particleColor} opacity="0.9">
        <animateMotion
          dur={dur}
          repeatCount="indefinite"
          begin={begin}
          path={d}
        />
      </circle>
    </>
  );
}
