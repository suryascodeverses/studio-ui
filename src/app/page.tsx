"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

function DarkModeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex justify-center" style={{ marginBottom: "2rem" }}>
      <button
        onClick={onToggle}
        className="toggle-wrapper"
        aria-label="Toggle dark mode"
      >
        <img
          src="/assets/svg/day.svg"
          alt="Day"
          className={`toggle-svg ${!isDark ? "toggle-svg--visible" : ""}`}
        />
        <img
          src="/assets/svg/night.svg"
          alt="Night"
          className={`toggle-svg ${isDark ? "toggle-svg--visible" : ""}`}
        />
      </button>
    </div>
  );
}

const CTA_STEPS = ["Design", "Develop", "Test"];

function CTASlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLSpanElement>(null);
  const isDragging = useRef(false);
  const animRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  const stepIndex =
    progressRef.current < 33 ? 0 : progressRef.current < 66 ? 1 : 2;
  const CTA_STEPS = ["Design", "Develop", "Test"];

  const applyProgress = (p: number) => {
    progressRef.current = p;
    if (gradientRef.current) {
      gradientRef.current.style.background = `linear-gradient(to right,
        #ffffff 0%,
        #ffffff ${Math.max(0, p - 35)}%,
        #333333 ${Math.max(0, p - 10)}%,
        #111111 ${p}%,
        #444444 ${Math.min(100, p + 15)}%,
        #ffffff ${Math.min(100, p + 40)}%,
        #ffffff 100%)`;
    }
    if (carRef.current) {
      carRef.current.style.left = `calc(${p}% - 18px)`;
    }
  };

  const getProgressFromEvent = (clientX: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100),
    );
  };

  useEffect(() => {
    const duration = 4000;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (isDragging.current) return;
      if (!start) start = ts;
      const p = (((ts - start) % duration) / duration) * 100;
      applyProgress(p);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    applyProgress(getProgressFromEvent(e.clientX));
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      applyProgress(getProgressFromEvent(e.clientX));
    };
    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      let start: number | null = null;
      const animate = (ts: number) => {
        if (isDragging.current) return;
        if (!start) start = ts - (progressRef.current / 100) * 4000;
        const p = (((ts - start) % 4000) / 4000) * 100;
        applyProgress(p);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    applyProgress(getProgressFromEvent(e.touches[0].clientX));
  };
  const onTouchMove = (e: React.TouchEvent) => {
    applyProgress(getProgressFromEvent(e.touches[0].clientX));
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (isDragging.current) return;
      if (!start) start = ts - (progressRef.current / 100) * 4000;
      const p = (((ts - start) % 4000) / 4000) * 100;
      applyProgress(p);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="flex justify-center" style={{ marginBottom: "3rem" }}>
      <div
        ref={containerRef}
        className="cta-slider-container"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ userSelect: "none" }}
      >
        <div
          ref={gradientRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            pointerEvents: "none",
            background:
              "linear-gradient(to right, #ffffff 0%, #111111 0%, #ffffff 40%)",
          }}
        />

        {[
          { text: "Design", left: "12px", top: "10px", right: undefined },
          { text: "Develop", left: "50%", top: "10px", right: undefined },
          { text: "Test", left: undefined, top: "10px", right: "12px" },
        ].map(({ text, left, right, top }) => (
          <span
            key={text}
            style={{
              position: "absolute",
              top,
              left,
              right,
              transform: text === "Develop" ? "translateX(-50%)" : undefined,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#ffffff",
              pointerEvents: "none",
              zIndex: 2,
              mixBlendMode: "difference",
            }}
          >
            {text}
          </span>
        ))}

        {/* Car */}
        <span
          ref={carRef}
          style={{
            position: "absolute",
            left: "0%",
            bottom: "6px",
            fontSize: "20px",
            pointerEvents: "none",
            zIndex: 3,
            filter: "brightness(0) invert(1)",
          }}
        >
          <svg
            width="48"
            height="14"
            viewBox="0 0 48 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.16406 5.31127C6.84766 5.31127 4.97266 7.19048 4.97266 9.51208C4.97266 11.8337 6.84766 13.7129 9.16406 13.7129C11.4805 13.7129 13.3555 11.8337 13.3555 9.51208C13.3555 7.19048 11.4805 5.31127 9.16406 5.31127ZM17.1211 1.95611C17.3516 2.45332 17.5352 3.00925 17.6758 3.61216C17.9961 4.61832 17.5234 4.82973 16.4297 4.41865C15.625 3.93711 14.8203 3.45164 14.0156 2.9701C13.6055 2.68039 13.4102 2.39459 13.4766 2.11271C13.6094 1.55678 14.6797 1.26707 15.5586 1.09481C16.6758 0.871651 16.5977 0.824671 17.1211 1.95611ZM38.6797 7.55849C37.6055 7.55849 36.7305 8.43154 36.7305 9.51208C36.7305 10.5887 37.6016 11.4657 38.6797 11.4657C39.7539 11.4657 40.6289 10.5926 40.6289 9.51208C40.6289 8.43154 39.7578 7.55849 38.6797 7.55849ZM9.16406 7.55849C8.08984 7.55849 7.21484 8.43154 7.21484 9.51208C7.21484 10.5887 8.08594 11.4657 9.16406 11.4657C10.2383 11.4657 11.1133 10.5926 11.1133 9.51208C11.1133 8.43154 10.2422 7.55849 9.16406 7.55849ZM29.9766 4.89237C28.8945 3.72961 27.6445 2.97401 26.1992 2.24582C23.0352 0.648496 21.0977 0.844246 17.7383 0.844246L18.8672 3.7805C19.3398 4.40691 19.875 4.8493 20.6875 4.89237H29.9766ZM38.6797 5.31127C36.3633 5.31127 34.4883 7.19048 34.4883 9.51208C34.4883 11.8337 36.3633 13.7129 38.6797 13.7129C40.9961 13.7129 42.8711 11.8337 42.8711 9.51208C42.8711 7.19048 40.9961 5.31127 38.6797 5.31127ZM32.0547 4.03107C30.6797 3.17368 29.1836 2.40634 27.5273 1.75253C22.4844 -0.240212 18.6289 -0.596478 13.3398 1.00868C11.7461 1.6155 10.1523 2.22233 8.55859 2.59817C6.98438 2.97401 0.167969 3.33419 0 4.48129L1.68359 6.49752C1.07031 7.02996 0.570312 7.68377 0.386719 8.70559C0.4375 9.33591 0.609375 9.86443 0.90625 10.2873C1.41016 11.0115 2.88672 11.7593 3.68359 11.3326C3.9375 11.1955 4.08203 10.9215 4.07812 10.4556C4.05469 1.09872 15.3242 2.16361 14.4766 11.5596H34.1406C30.5 2.14794 46.0312 2.11271 43.2734 11.2347C44.2422 12.2839 46.5273 10.7022 48 7.33925C47.5977 6.93992 47.1562 6.56016 46.6641 6.20781C46.6875 6.18824 46.6406 6.2822 46.7227 6.14126C46.8047 6.00032 46.5234 5.40915 45.9453 5.06854C42.9141 3.28721 35.6055 3.33419 32.0547 4.03107Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

const GALLERY_IMAGES = [
  { id: 1, src: "/assets/image.png", alt: "Gallery image 1" },
  { id: 2, src: "/assets/image_2.png", alt: "Gallery image 2" },
  { id: 3, src: "/assets/image_3.png", alt: "Gallery image 3" },
  { id: 4, src: "/assets/image_4.png", alt: "Gallery image 4" },
  { id: 5, src: "/assets/image_5.png", alt: "Gallery image 5" },
  { id: 6, src: "/assets/image_6.png", alt: "Gallery image 6" },
];

function getFlexGrow(imageId: number, activeId: number): number {
  const diff = imageId - activeId;
  if (diff === 0) return 10;
  if (diff === 1) return 5;
  if (diff === 2) return 3;
  return 1;
}

function GalleryItem({
  image,
  activeId,
  onHover,
}: {
  image: (typeof GALLERY_IMAGES)[0];
  activeId: number;
  onHover: () => void;
}) {
  const flexGrow = getFlexGrow(image.id, activeId);

  return (
    <div
      onMouseEnter={onHover}
      style={{
        flexGrow,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        height: "clamp(280px, 40vw, 520px)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "clamp(8px, 1.2vw, 16px)",
        cursor: "pointer",
        transition: "flex-grow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 680px"
        className="object-cover"
      />
    </div>
  );
}

function Gallery() {
  const [activeId, setActiveId] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(GALLERY_IMAGES.length - 1, index)));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
  };

  if (isMobile) {
    return (
      <section style={{ width: "100%", padding: "0 0 2rem" }}>
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            width: "100%",
            padding: "0 16px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(240px, 55vw, 420px)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <Image
              src={GALLERY_IMAGES[currentIndex].src}
              alt={GALLERY_IMAGES[currentIndex].alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ transition: "opacity 0.3s ease" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "14px",
          }}
        >
          {GALLERY_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === currentIndex ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === currentIndex ? "#111" : "#ccc",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "12px",
          }}
        >
          {[
            { label: "←", dir: -1 },
            { label: "→", dir: 1 },
          ].map(({ label, dir }) => (
            <button
              key={label}
              onClick={() => goTo(currentIndex + dir)}
              disabled={
                (dir === -1 && currentIndex === 0) ||
                (dir === 1 && currentIndex === GALLERY_IMAGES.length - 1)
              }
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1.5px solid #ddd",
                background: "transparent",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity:
                  (dir === -1 && currentIndex === 0) ||
                  (dir === 1 && currentIndex === GALLERY_IMAGES.length - 1)
                    ? 0.3
                    : 1,
                transition: "opacity 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        width: "100%",
        padding: "0 clamp(12px, 3vw, 32px) 2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        onMouseLeave={() => setActiveId(1)}
        style={{
          display: "flex",
          gap: "clamp(6px, 0.8vw, 12px)",
          width: "100%",
        }}
      >
        {GALLERY_IMAGES.map((img) => (
          <GalleryItem
            key={img.id}
            image={img}
            activeId={activeId}
            onHover={() => setActiveId(img.id)}
          />
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: "✦",
    title: "Brand Photography",
    desc: "Curated shoots that tell your brand's story in every pixel.",
  },
  {
    icon: "◈",
    title: "Visual Identity",
    desc: "From logo to lookbook — a cohesive system that stops the scroll.",
  },
  {
    icon: "⬡",
    title: "Campaign Direction",
    desc: "End-to-end art direction for launches that make an impact.",
  },
  {
    icon: "◎",
    title: "Retouching & Post",
    desc: "Color grading and compositing that elevates raw shots to art.",
  },
];

function ServicesSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="services"
      style={{
        padding: "6rem 2rem",
        background: isDark ? "#1a1a1a" : "#f5f4f1",
        transition: "background 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h2 className="section-title">What We Do</h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: isDark ? "#aaa" : "#666",
              maxWidth: "320px",
              lineHeight: 1.6,
              fontSize: "0.95rem",
            }}
          >
            We don't just make things look good. We make them work harder.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="service-card"
              style={{
                animationDelay: `${i * 0.1}s`,
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.7)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: isDark ? "#fff" : "#111",
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "1.3rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  marginBottom: "0.75rem",
                  color: isDark ? "#fff" : "#111",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: isDark ? "#999" : "#555",
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STYLISTS = [
  {
    name: "Aria Chen",
    role: "Creative Director",

    bg: "linear-gradient(160deg, #667eea00 0%, #764ba200 100%)",
    src: "/assets/aria-chain.jpg",
  },
  {
    name: "Marcus Bell",
    role: "Lead Photographer",

    bg: "linear-gradient(160deg, #f093fb 0%, #f5576c 100%)",
    src: "/assets/lead-photographer.jpg",
  },
  {
    name: "Zoe Laurent",
    role: "Visual Stylist",

    bg: "linear-gradient(160deg, #4facfe 0%, #00f2fe 100%)",
    src: "/assets/director.jpg",
  },
];

function StylistsSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="stylists"
      style={{
        padding: "6rem 2rem",
        background: isDark ? "#222" : "#eceae6",
        transition: "background 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          The Team
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {STYLISTS.map((s) => (
            <div
              key={s.name}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
            >
              <img
                src={s.src}
                alt={s.name}
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2rem 1.5rem 1.5rem",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: "1.4rem",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeTicker({ isDark }: { isDark: boolean }) {
  const items = [
    "Brand Photography",
    "✦",
    "Visual Identity",
    "✦",
    "Campaign Direction",
    "✦",
    "Art Direction",
    "✦",
    "Retouching",
    "✦",
    "Editorial",
    "✦",
  ];
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: isDark ? "#111" : "#111",
        color: "#fff",
        padding: "1rem 0",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      <div
        className="animate-marquee"
        style={{
          display: "flex",
          gap: "2rem",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: item === "✦" ? "#f97316" : "#fff",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function JoinSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="join-our-team"
      style={{
        padding: "8rem 2rem",
        background: isDark ? "#111" : "#fff",
        transition: "background 0.4s ease",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#f97316",
            marginBottom: "1rem",
          }}
        >
          We're Hiring
        </p>
        <h2
          className="section-title"
          style={{ marginBottom: "1.5rem", color: isDark ? "#fff" : "#111" }}
        >
          Join Our Team
        </h2>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            color: isDark ? "#aaa" : "#666",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            fontSize: "1rem",
          }}
        >
          We&apos;re always looking for brilliant minds who believe visuals
          should do more than just look good. If that's you, let&apos;s talk.
        </p>
        <button
          style={{
            background: isDark ? "#fff" : "#111",
            color: isDark ? "#111" : "#fff",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 600,
            fontSize: "0.95rem",
            padding: "1rem 2.5rem",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.04)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 24px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          See Open Roles →
        </button>
      </div>
    </section>
  );
}

function ContactsSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="contacts"
      style={{
        padding: "6rem 2rem",
        background: isDark ? "#1a1a1a" : "#f5f4f1",
        transition: "background 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              className="section-title"
              style={{
                marginBottom: "1.5rem",
                color: isDark ? "#fff" : "#111",
              }}
            >
              Let&apos;s Work
            </h2>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                color: isDark ? "#999" : "#666",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Have a project in mind? We&apos;d love to hear about it. Drop us a
              line and we&apos;ll get back to you within 24 hours.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                { label: "Email", value: "hello@studio.com" },
                { label: "Phone", value: "+1 (555) 000-0000" },
                { label: "Location", value: "New York, NY" },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: isDark ? "#666" : "#999",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      color: isDark ? "#ddd" : "#222",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {["Your name", "Email address", "Tell us about your project"].map(
              (placeholder, i) => {
                const isTextarea = i === 2;
                const sharedStyle: React.CSSProperties = {
                  width: "100%",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.95rem",
                  color: isDark ? "#ddd" : "#222",
                  outline: "none",
                  resize: "none" as const,
                  transition: "border-color 0.2s ease",
                };
                return isTextarea ? (
                  <textarea
                    key={placeholder}
                    placeholder={placeholder}
                    rows={5}
                    style={sharedStyle}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor =
                        "#f97316";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor =
                        isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
                    }}
                  />
                ) : (
                  <input
                    key={placeholder}
                    type={i === 1 ? "email" : "text"}
                    placeholder={placeholder}
                    style={sharedStyle}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "#f97316";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)";
                    }}
                  />
                );
              },
            )}
            <button
              style={{
                background: "#f97316",
                color: "#fff",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                padding: "1rem 2rem",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s ease",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
            >
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div>
      <div className="announcement-banner">Join Our Team — We are hiring</div>

      <section
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          transition: "background 0.4s ease",
          paddingTop: "4rem",
          paddingBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="animate-fade-in opacity-0 delay-100"
          style={{ paddingTop: "1rem" }}
        >
          <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        <div
          className="animate-fade-in-up opacity-0 delay-200"
          style={{ padding: "1rem 2rem 2rem" }}
        >
          <h1 className="hero-headline">
            Visuals That Convert
            <br />
            Visitors Into Customers
          </h1>
        </div>

        <div className="animate-fade-in-up opacity-0 delay-400">
          <CTASlider />
        </div>

        <div className="animate-fade-in-up opacity-0 delay-500">
          <Gallery />
        </div>
      </section>

      <MarqueeTicker isDark={isDark} />

      <ServicesSection isDark={isDark} />
      <StylistsSection isDark={isDark} />
      <JoinSection isDark={isDark} />
      <ContactsSection isDark={isDark} />
    </div>
  );
}
