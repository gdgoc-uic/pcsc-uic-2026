---
name: PCSC-UIC 2026 Conference Website
description: Official design system for the 26th Philippine Computing Science Congress
colors:
  primary: "#c70036"
  primary-deep: "#8b0836"
  accent-rose: "#ff2056"
  brick-red: "#d2334c"
  brick-red-dark: "#460b18"
  tribal-brown: "#7c2d12"
  neutral-bg: "#0a0a0a"
  neutral-surface: "#18181b"
  neutral-text: "#ededed"
typography:
  display:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: "1.25"
  title:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.4"
  body:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.brick-red}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  chip-category:
    backgroundColor: "{colors.brick-red-dark}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: PCSC-UIC 2026 Conference Website

## Overview

**Creative North Star: "The Mindanao Tapestry & Academic Citadel"**

The PCSC-UIC 2026 visual system fuses modern, high-contrast academic congress aesthetics with rich Mindanao and Davao tribal geometric heritage. Built on a deep obsidian foundation (`#0a0a0a`), the interface uses saturated crimson tones (`#8b0836`, `#c70036`) and radiant rose accents (`#ff2056`) to establish authoritative presence while honoring local cultural identity.

The system emphasizes high scanability and structural clarity. Geometric SVG tribal pattern overlays (featuring diamond, zigzag, triangle, and Okir-inspired curves) frame major section transitions, providing authentic regional character without obscuring critical content or academic copy.

**Key Characteristics:**
- **Culture-Infused Dark Mode:** Deep obsidian canvas with vibrant crimson and brick-red structural containers.
- **Mindanao Geometric Motifs:** Authentic SVG tribal patterns (diamond, Okir curves, zigzags) as framing accents.
- **Technical Typography:** Geist Sans for commanding headlines and readable body text, paired with Geist Mono for event dates, paper tracks, and session times.
- **Tonal Glass Architecture:** Subtle backdrop-blur overlays, fine light borders (`border-white/20`), and responsive scale transforms.

## Colors

The color palette is anchored in rich, warm crimson hues balanced by deep neutral obsidian tones.

### Primary
- **Deep Indigenous Crimson** (`#8b0836`): Primary background fill for major containers, cards, and navigation headers.
- **Saturated Brick Red** (`#c70036`): Interactive accent color for primary action buttons, focused states, and callout badges.
- **Radiant Rose Highlight** (`#ff2056`): High-luminance accent for urgent deadline indicators, active navigation indicators, and key focus rings.

### Neutral
- **Obsidian Foundation** (`#0a0a0a`): Global application background providing ultra-high contrast for white typography and crimson containers.
- **Dark Surface Zinc** (`#18181b`): Secondary container background for code blocks, secondary card surfaces, and input fields.
- **Bright Text Off-White** (`#ededed`): High-legibility body text color ensuring WCAG AA contrast against dark backgrounds.
- **Muted Border Slate** (`rgba(255, 255, 255, 0.2)`): Delicate semi-transparent borders defining cards and section dividers.

### Named Rules
**The Mindanao Heritage Rule.** SVG tribal patterns and crimson accents frame major section headers and hero banners, but must never sit directly behind dense paragraph text or data tables.

**The Contrast Hierarchy Rule.** Solid brick-red (`#c70036`) fill is reserved strictly for primary CTA actions. Secondary CTAs and auxiliary controls use ghost or outline treatments with `#ff2056` text accents.

## Typography

**Display Font:** Geist Sans (`var(--font-geist-sans)`, sans-serif)  
**Body Font:** Geist Sans (`var(--font-geist-sans)`, sans-serif)  
**Label/Mono Font:** Geist Mono (`var(--font-geist-mono)`, monospace)  

**Character:** Technical precision meets academic authority. Geist Sans provides clean, highly legible letterforms for titles and body text, while Geist Mono imparts precision for dates, track labels, and submission codes.

### Hierarchy
- **Display** (Bold 700, `clamp(2rem, 5vw, 3.75rem)`, line-height 1.1): Hero headlines and major page titles.
- **Headline** (Bold 700, `clamp(1.5rem, 3.5vw, 2.25rem)`, line-height 1.25): Section headings (`h2`).
- **Title** (SemiBold 600, `1.25rem` / `20px`, line-height 1.4): Card titles, subheadings (`h3`).
- **Body** (Regular 400, `1rem` / `16px`, line-height 1.6): Standard paragraph copy, limited to `65-75ch` max line length for optimal readability.
- **Label** (SemiBold 600, `0.875rem` / `14px`, letter-spacing `0.05em`, uppercase): Monospaced category tags, date badges, and navigation links.

### Named Rules
**The Monospace Context Rule.** Any string representing a calendar date, time window, room number, paper ID, or deadline category must be typeset in Geist Mono with uppercase tracking.

## Layout

The layout uses a fluid 12-column CSS Grid and Flexbox spatial model centered within a maximum container width of `1280px` (`max-w-7xl`).

- **Grid Rhythm:** 4-column layout on desktop (`lg:grid-cols-4`), 2-column on tablet (`md:grid-cols-2`), and single column on mobile (`grid-cols-1`).
- **Section Spacing:** Generous vertical padding (`py-16` / `64px` to `py-20` / `80px`) between section blocks to create breatheable academic rhythm.
- **Gaps:** Standardized `gap-8` (`32px`) between major grid items; `gap-4` (`16px`) for sub-cards and date stacks.
- **Responsive Breakpoints:** Mobile (`< 640px`), Tablet (`640px - 1024px`), Desktop (`> 1024px`).

## Elevation & Depth

PCSC-UIC 2026 relies primarily on **tonal layering and glass backdrop blur** rather than traditional drop shadows.

- **Surface Layering:** Elements elevate visually through contrasting background fills (`bg-brick-red-950` over `#0a0a0a`) paired with `backdrop-blur-sm`.
- **Border Definition:** Fine 1px semi-transparent white borders (`border-white/20` or `border-brick-red-400/30`) cleanly separate overlapping cards.
- **Hover Micro-Lifts:** Interactive cards perform a subtle scale transform (`scale: 1.03`, `y: -4px`) via GSAP animations rather than casting deep drop shadows.

### Named Rules
**The Flat-Glass Rule.** Surfaces are flat at rest. Depth is expressed through background tone and backdrop blur; elevation on hover is indicated by subtle micro-scaling (`y: -4px`) and luminous border highlight rather than shadow blur.

## Shapes

Form language balances crisp modern geometric rectangles with soft corner radii and traditional Mindanao diamond geometries.

- **Card Radius:** Medium rounded corners (`rounded-lg` / `8px`) for feature cards, program blocks, and date containers.
- **Button Radius:** Small to medium rounded corners (`rounded` / `4px` or `rounded-md` / `6px`) for structured CTAs.
- **Badge/Chip Radius:** Pill shape (`rounded-full` / `9999px`) for date tags, deadline status chips, and category labels.
- **Tribal Geometry:** SVG patterns incorporate sharp 45° diamond angles, 60° zigzags, and Mindanao Okir-inspired bezier curves.

## Components

### Buttons
- **Shape:** Rounded rectangle (`4px` - `6px` radius).
- **Primary:** `bg-brick-red-600` (`#d2334c`), text `#ffffff`, uppercase font-semibold, `px-5 py-2`.
- **Hover / Focus:** Transition to `bg-brick-red-700` with ring offset `focus:ring-2 focus:ring-brick-red-300`.
- **Secondary / Ghost:** Transparent background with white text and `border border-white/40`, hover `bg-white/10`.

### Chips & Category Badges
- **Style:** Pill shape (`rounded-full`), `px-3 py-1`, text-xs font-semibold uppercase.
- **Urgent / Deadline:** `bg-brick-red-500` fill with `#ffffff` text and leading dot indicator.
- **Conference / General:** `bg-brick-red-800` with subtle border `border-brick-red-400/30`.

### Cards & Program Containers
- **Style:** `bg-brick-red-950` or `bg-zinc-900/80` with `backdrop-blur-sm` and `border border-white/10`.
- **Hover:** GSAP smooth lift (`y: -4px`, `scale: 1.03`), border brightens to `border-rose-400/50`.
- **Padding:** `p-6` (`24px`) internal padding.

### Navigation Header
- **Style:** Absolute header with semi-transparent `bg-brick-red-800` bar, `h-20`, `border-b border-white`.
- **Links:** Upper-case monospaced navigation text (`px-2 py-1`), hover color `text-brick-red-300`.
- **Announcement Banner:** Top bar (`bg-rose-700/90`), `py-2 px-4`, text-xs with arrow link `View Papers →`.

### TribalPattern (Signature Component)
- **Style:** Full-width SVG pattern container (`h-32`), integrating diamond, zigzag, triangle, and Okir curve sub-patterns with `#991b1b` border lines.

## Do's and Don'ts

### Do:
- **Do** maintain high contrast between body text (`#ededed`) and dark background containers (`#0a0a0a` / `#460b18`).
- **Do** use Geist Mono (`var(--font-geist-mono)`) for all dates, times, room numbers, and paper submission IDs.
- **Do** incorporate the `TribalPattern` component as a visual divider above or below key section headings.
- **Do** use GSAP `ScrollTrigger` and `gsap.context()` for smooth, accessible entrance animations.

### Don't:
- **Don't** apply light or white background canvases; the application design system is strictly dark-mode-first.
- **Don't** place heavy SVG tribal pattern overlays directly behind body text blocks.
- **Don't** use generic blue or green accent colors for primary CTAs; adhere strictly to the brick-red/rose color family.
- **Don't** hardcode heavy drop shadows (`shadow-2xl`); rely on tonal layering and luminous borders for depth.
