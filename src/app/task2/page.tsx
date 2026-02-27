"use client";

import AnimPath from "../../components/animPath";
import AppLogoCard, { LogoPair } from "../../components/appLogoCard";
import DiagramDotGrid from "../../components/diagramDotGrid";
import Pill from "../../components/pill";

const LOGO_PAIRS: LogoPair[] = [
  {
    bg: "#00A1E0",
    content: (
      <span style={{ color: "#fff", fontWeight: 800, fontSize: "11px" }}>
        SF
      </span>
    ),
    bg2: "#FFE01B",
    content2: (
      <span style={{ fontWeight: 800, fontSize: "10px", color: "#000" }}>
        CLAP
      </span>
    ),
  },
  {
    bg: "#05998B",
    content: (
      <span style={{ color: "#fff", fontWeight: 800, fontSize: "11px" }}>
        ⚡
      </span>
    ),
    bg2: "#13B5EA",
    content2: <span style={{ fontSize: "18px", color: "#fff" }}>☁</span>,
  },
  {
    bg: "#FF4A00",
    content: (
      <span style={{ color: "#fff", fontWeight: 800, fontSize: "11px" }}>
        SAP
      </span>
    ),
    bg2: "#50FAAB",
    content2: (
      <span style={{ fontWeight: 800, fontSize: "10px", color: "#000" }}>
        ZAP
      </span>
    ),
  },
  {
    bg: "#FF0000",
    content: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
        <path d="M2 2h6l10 16H12L2 2ZM16 2H10L6 9l5 8h4L16 2Z" fill="white" />
      </svg>
    ),
    bg2: "#2CA01C",
    content2: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
        <path
          d="M3 10a5 5 0 0 0 5 5h1v-2H8a3 3 0 0 1 0-6h2v9.5A1.5 1.5 0 0 0 11.5 18V6H8A5 5 0 0 0 3 10Zm14-4h-1v2h1a3 3 0 0 1 0 6h-2V4.5A1.5 1.5 0 0 0 13.5 3V14H15A5 5 0 0 0 17 6Z"
          fill="white"
        />
      </svg>
    ),
  },
];

const SYSTEM_PILLS = [
  { label: "ERP", delay: "0.10s" },
  { label: "CRM", delay: "0.18s" },
  { label: "Subscriptions", delay: "0.26s" },
  { label: "Legacy billing", delay: "0.34s" },
  { label: "Booking system", delay: "0.42s" },
];

const PSP_ITEMS = [
  { active: false, delay: "0.60s" },
  { active: true, delay: "0.75s" },
  { active: true, delay: "0.90s" },
  { active: false, delay: "1.05s" },
];

const LX = 88;
const RX = 415;
const CX = 250;

const TOP_LEFT = `M${LX} 0 L${LX} 60`;
const TOP_RIGHT = `M${RX} 0 L${RX} 60`;

const CONV_LEFT = `M${LX} 60 L${LX} 74 C${LX} 82 ${LX + 14} 88 ${LX + 22} 88 L${CX - 8} 88 C${CX} 88 ${CX} 92 ${CX} 96 L${CX} 120`;
const CONV_RIGHT = `M${RX} 60 L${RX} 74 C${RX} 82 ${RX - 14} 88 ${RX - 22} 88 L${CX + 8} 88 C${CX} 88 ${CX} 92 ${CX} 96 L${CX} 120`;

const PSP_BRANCH = [
  {
    d: "M130 0 L130 18 C130 24 124 28 118 28 L30  28 C24  28 18  32 18  38 L18  48",
    begin: "0.0s",
  },
  {
    d: "M130 0 L130 18 C130 24 124 28 118 28 L90  28 C84  28 78  32 78  38 L78  48",
    begin: "0.5s",
  },
  {
    d: "M130 0 L130 18 C130 24 136 28 142 28 L170 28 C176 28 182 32 182 38 L182 48",
    begin: "1.0s",
  },
  {
    d: "M130 0 L130 18 C130 24 136 28 142 28 L230 28 C236 28 242 32 242 38 L242 48",
    begin: "1.5s",
  },
];

function StripeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="17"
      fill="none"
      viewBox="0 0 42 17"
      aria-label="Stripe"
    >
      <path
        fill="#fefeff"
        fillRule="evenodd"
        d="M41.751 9.711h-5.643c.129 1.312 1.119 1.733 2.242 1.733 1.145 0 2.067-.249 2.832-.647v2.256c-.783.484-1.818.753-3.196.753-2.807 0-4.775-1.708-4.775-5.085 0-2.852 1.669-5.117 4.411-5.117 2.739 0 4.168 2.23 4.168 5.098 0 .271-.026.858-.039 1.01m-4.147-3.824c-.72 0-1.522.495-1.522 1.757h2.98c0-1.26-.75-1.757-1.458-1.757m-8.936 7.919c-1.008 0-1.625-.414-2.039-.708l-.006 3.146-2.883.596V3.79h2.627l.06.692c.423-.36 1.129-.878 2.259-.878 2.024 0 3.93 1.771 3.93 5.032 0 3.558-1.885 5.17-3.948 5.17m-.671-7.722c-.662 0-1.076.235-1.377.555l.017 4.162c.28.294.684.53 1.36.53 1.066 0 1.78-1.126 1.78-2.634 0-1.465-.726-2.613-1.78-2.613M19.765 3.79h2.894v9.816h-2.894zm0-3.193L22.659 0v2.284l-2.894.597zm-3.021 6.354v6.655h-2.88V3.79h2.58l.092.828c.702-1.205 2.15-.961 2.535-.827v2.574c-.367-.115-1.603-.291-2.327.586m-5.987 3.21c0 1.652 1.82 1.138 2.189.994v2.28c-.385.205-1.081.371-2.023.371-1.711 0-2.995-1.224-2.995-2.882l.013-8.96 2.814-.581.002 2.407h2.19v2.388h-2.19v3.984m-3.435.479c0 2.016-1.617 3.166-4.014 3.166A8 8 0 0 1 .19 13.17v-2.673c.968.51 2.166.894 3.12.894.644 0 1.072-.167 1.072-.685C4.382 9.37 0 9.873 0 6.773c0-1.983 1.593-3.17 3.932-3.17.954 0 1.91.143 2.864.513v2.637c-.877-.46-1.99-.72-2.867-.72-.604 0-1.013.17-1.013.607 0 1.26 4.406.66 4.406 4"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <div className="str-ext-icon">
      <svg
        viewBox="0 0 40 40"
        width="28"
        height="28"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="13"
          stroke="#635bff"
          strokeWidth="1.5"
          fill="rgba(93,100,254,0.15)"
        />
        <circle cx="20" cy="20" r="6" fill="rgba(93,100,254,0.4)" />
        <circle cx="20" cy="20" r="2.5" fill="#635bff" />
        <path
          d="M20 7v26M7 20h26"
          stroke="rgba(99,91,255,0.3)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default function Task2Page() {
  return (
    <div className="str-page">
      <section className="str-section">
        <div className="str-header str-anim str-d0">
          <h2 className="str-heading">
            <strong>Connect to existing systems.</strong>{" "}
            <span className="str-subtext">
              Orchestrate payments across multiple processors, build custom
              workflows, and connect to third parties using APIs, partner apps
              or pre-built integrations.
            </span>
          </h2>
        </div>

        <div className="str-diagram str-anim str-d1">
          <DiagramDotGrid count={480} columns={24} />

          <div className="str-diagram-content">
            <div className="str-systems-row str-anim str-d2">
              {SYSTEM_PILLS.map((s) => (
                <Pill
                  key={s.label}
                  label={s.label}
                  variant="dim"
                  delay={s.delay}
                />
              ))}
            </div>

            <div className="str-top-section str-anim str-d3">
              <svg
                viewBox="0 0 500 120"
                className="str-top-svg"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d={TOP_LEFT}
                  stroke="#152460"
                  strokeDasharray="2 2"
                  fill="none"
                />
                <path
                  d={TOP_RIGHT}
                  stroke="#152460"
                  strokeDasharray="2 2"
                  fill="none"
                />
                <path
                  d={CONV_LEFT}
                  stroke="#152460"
                  strokeDasharray="2 2"
                  fill="none"
                />
                <path
                  d={CONV_RIGHT}
                  stroke="#152460"
                  strokeDasharray="2 2"
                  fill="none"
                />

                <AnimPath d={TOP_LEFT} dur="2.2s" begin="0s" />
                <AnimPath d={TOP_RIGHT} dur="2.2s" begin="1.1s" />
                <AnimPath d={CONV_LEFT} dur="2.2s" begin="0.4s" />
                <AnimPath d={CONV_RIGHT} dur="2.2s" begin="1.5s" />
              </svg>

              <div className="str-sdk-pill">
                <Pill label="SDK" variant="bright" />
              </div>

              <div className="str-evtdst-pill">
                <Pill label="Event Destinations" variant="bright" />
              </div>
            </div>

            <div className="str-middle str-anim str-d3">
              <div style={{ visibility: "hidden", pointerEvents: "none" }}>
                <Pill label="SDK" variant="bright" />
              </div>

              <div className="str-mid-chain">
                <div className="str-apps-panel">
                  {LOGO_PAIRS.map((pair, i) => (
                    <AppLogoCard key={i} pair={pair} index={i} />
                  ))}
                </div>
                <div className="str-hline" />
                <Pill label="App Marketplace" variant="cta" />
                <div className="str-hline" />
                <div className="str-stripe-box text-white">STUDIO</div>
                <div className="str-hline" />
                <Pill label="Data Pipeline" variant="bright" />
                <div className="str-hline" />
                <ExternalIcon />
              </div>

              <div style={{ visibility: "hidden", pointerEvents: "none" }}>
                <Pill label="Event Destinations" variant="bright" />
              </div>
            </div>

            <div className="str-vert str-anim str-d4">
              <svg
                viewBox="0 0 10 36"
                width="10"
                height="36"
                fill="none"
                overflow="visible"
              >
                <path d="M5 0 L5 36" stroke="#152460" strokeDasharray="2 2" />
                <AnimPath d="M5 0 L5 36" dur="1.5s" begin="0s" />
              </svg>
            </div>

            <div
              className="str-anim str-d4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Pill label="Orchestration" variant="bright" />
            </div>

            <div className="str-psp-branch str-anim str-d5">
              <svg
                viewBox="0 0 260 48"
                fill="none"
                className="str-psp-branch-svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {PSP_BRANCH.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    stroke="#152460"
                    strokeDasharray="2 2"
                    fill="none"
                  />
                ))}
                {PSP_BRANCH.map((p, i) => (
                  <AnimPath key={i} d={p.d} dur="2s" begin={p.begin} />
                ))}
              </svg>
            </div>

            <div className="str-psp-row str-anim str-d6">
              {PSP_ITEMS.map((p, i) => (
                <div
                  key={i}
                  className={`str-psp${p.active ? " str-psp--active" : ""}`}
                  style={{ animationDelay: p.delay }}
                >
                  PSP
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
