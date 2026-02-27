# Studio

A modern, animated web experience built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Studio features a salon-style landing page and an interactive Stripe-inspired payment systems diagram, with a shared modular component architecture.

---

## Project Structure

```
studio/
├── public/
│   └── assets/
│       ├── image.png          # Gallery image 1
│       ├── image_2.png        # Gallery image 2
│       ├── image_3.png        # Gallery image 3
│       ├── image_4.png        # Gallery image 4
│       ├── image_5.png        # Gallery image 5
│       ├── image_6.png        # Gallery image 6
│       └── svg/
│           ├── day.svg        # Light mode toggle icon
│           └── night.svg      # Dark mode toggle icon
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout — shared Header + Footer
│   │   ├── globals.css        # Global styles + shared component styles
│   │   ├── page.tsx           # Page 1 — Salon landing page (/)
│   │   └── task2/
│   │       └── page.tsx       # Page 2 — Stripe diagram (/task2)
│   │
│   └── components/
│       ├── Header.tsx         # Sticky nav with active route highlighting
│       ├── Footer.tsx         # Dark footer with links
│       ├── Pill.tsx           # Badge/tag component (dim | bright | cta variants)
│       ├── AnimPath.tsx       # Animated SVG dashed path with SMIL motion
│       ├── AppLogoCard.tsx    # 3D flip card for app logos
│       └── DiagramDotGrid.tsx # Decorative background dot grid
│
├── install.bat                # One-click install + build script (Windows)
├── start.bat                  # One-click start script (Windows)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages

### `/` — Salon Landing Page
The main landing page featuring:
- **Dark mode toggle** — SVG-based day/night toggle with smooth fade transition
- **CTA Slider** — Optimized `requestAnimationFrame` animation (zero React re-renders). Car icon travels across a gradient bar revealing Design → Develop → Test labels. Fully draggable/touch-enabled.
- **Gallery** — Hover-expand image gallery with progressive width decay. Active image expands to full width, right neighbours decay at 50% → 30% → collapsed. On tablet/mobile it becomes a full-screen swiper with touch gestures, dot indicators, and prev/next arrows.
- **Services Section** — Animated service cards
- **Stylists Section** — Team member profiles
- **Join Our Team / Contacts** — Footer sections

### `/task2` — Stripe Diagram
An interactive payment systems architecture diagram featuring:
- **System pills row** — ERP, CRM, Subscriptions, Legacy billing, Booking system
- **Animated branch lines** — Dashed SVG paths with SMIL particle animation converging into Stripe
- **SDK + Event Destinations** — Positioned directly on the branch line endpoints via `foreignObject`
- **Main chain** — App logos (flip cards) → App Marketplace → Stripe → Data Pipeline → External icon
- **Orchestration tree** — Stripe → Orchestration → 4 PSP nodes with fan-out branch lines
- **Entrance animations** — Staggered fade-up on load

---

## What Was Built

| Feature | Details |
|---|---|
| Modular layout | Shared `Header` + `Footer` via `layout.tsx` — all pages inherit automatically |
| TypeScript components | All components fully typed with exported interfaces |
| CSS-only animations | No animation libraries — pure keyframes + SMIL |
| Optimized CTA slider | Direct DOM mutation via `useRef` — 60fps, zero re-renders |
| Responsive gallery | Flex-grow ratio system — fully responsive at all breakpoints |
| Mobile swiper | Touch swipe, dot indicators, prev/next for tablet and below |
| Dark mode | SVG toggle, persisted via React state, applied via `.dark` class |
| Flip cards | CSS 3D `perspective` + `rotateY` with staggered timing |
| Dot grid background | Configurable count + columns, absolute-positioned decorative layer |

---

## Requirements

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- Windows 10/11 (for `.bat` scripts)

---

## Setup & Running

**Steps:**
1. Extract / clone the project folder

---

**1. Install dependencies**
```bash
npm install
```

**run application:**

```bash
# Build for production
npm run build

# Start production server
npm run start

```

### For Development

If you want to run in development mode with hot-reloading:

**2. Run in development mode**
```bash
npm run dev
```

**3. Open in browser**
```
http://localhost:3000
```



---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14 | React framework, file-based routing |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| React | 18 | UI library |
| CSS Animations | — | Keyframes, transitions, SMIL |

---

## Notes

- All images go in `public/assets/` — filenames must match exactly as listed in the structure above
- SVG toggle icons go in `public/assets/svg/`
- The project uses the `@/` path alias for `src/` imports
- Dark mode is toggled via a `.dark` class on the `<html>` element