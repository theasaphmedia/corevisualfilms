# DESIGN_SYSTEM.md — Corevisualmedia
### The complete visual language of the site. Everything defined here.

---

## Colour Palette

| Token | Hex | Use |
|---|---|---|
| `--color-void` | `#080808` | Primary background — near-black |
| `--color-depth` | `#0E0E0E` | Card / secondary section backgrounds |
| `--color-surface` | `#141414` | Elevated elements |
| `--color-border` | `#1E1E1E` | All dividers and borders |
| `--color-amber` | `#C8A96E` | Primary accent — cinematic gold/amber |
| `--color-amber-dim` | `#8B7248` | Hover/muted amber states |
| `--color-amber-glow` | `rgba(200,169,110,0.12)` | Ambient glow backgrounds |
| `--color-white` | `#FFFFFF` | Primary headings, high-contrast |
| `--color-off-white` | `#E8E0D0` | Body text — warm, not stark |
| `--color-muted` | `#6B6B6B` | Metadata, secondary copy |
| `--color-muted-light` | `#4A4A4A` | Borders, very subtle text |

**Rationale:** The amber accent (#C8A96E) is the cinematic differentiator. It evokes tungsten light, film grain warmth, and golden hour — all core to the emotional register of premium videography. Every competitor uses cold blues or neutral greys. This palette is immediately identifiable.

---

## Typography

### Typefaces

**Display / Headlines: Cormorant Garamond**
- Source: Google Fonts
- Use: All `<h1>`–`<h3>`, hero text, section titles, pull quotes, project titles
- Weights used: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold) + Italics
- Character: Dramatic high-contrast letterforms, film poster heritage, editorial authority

**Body / UI: DM Sans**
- Source: Google Fonts
- Use: Navigation, body copy, labels, buttons, form fields, metadata
- Weights: 300, 400 (Regular), 500 (Medium)
- Character: Clean geometric humanist sans — legible at small sizes, warm at large

**Accent / Technical: Space Mono**
- Source: Google Fonts
- Use: Timecodes, section labels, filter tabs, metadata pills, form labels, video slot labels
- Weights: 400, 700
- Character: Monospaced grid, technical precision, contrasts with the elegance of the serifs

### Type Scale (fluid via CSS `clamp()`)

| Token | Value | Usage |
|---|---|---|
| `--text-hero` | `clamp(3.2rem, 9.5vw, 9.5rem)` | Hero headline |
| `--text-display` | `clamp(2.4rem, 6vw, 6rem)` | Section hero titles |
| `--text-h1` | `clamp(1.9rem, 3.8vw, 3.8rem)` | Page titles |
| `--text-h2` | `clamp(1.5rem, 2.8vw, 2.5rem)` | Section headings |
| `--text-h3` | `clamp(1.2rem, 1.8vw, 1.6rem)` | Sub-headings |
| `--text-body` | `clamp(0.95rem, 1.2vw, 1.05rem)` | Body copy |
| `--text-sm` | `clamp(0.75rem, 0.9vw, 0.85rem)` | Labels, captions |
| `--text-xs` | `0.7rem` | Monospace metadata |

All type scales automatically fluid — no breakpoint overrides needed.

---

## Spacing

Based on a 4px base unit:

| Token | Value |
|---|---|
| `--space-1` | 0.25rem (4px) |
| `--space-2` | 0.5rem (8px) |
| `--space-3` | 0.75rem (12px) |
| `--space-4` | 1rem (16px) |
| `--space-5` | 1.5rem (24px) |
| `--space-6` | 2rem (32px) |
| `--space-8` | 3rem (48px) |
| `--space-10` | 4rem (64px) |
| `--space-12` | 5rem (80px) |
| `--space-16` | 7rem (112px) |
| `--space-20` | 9rem (144px) |

Section padding: `--section-pad-y: clamp(4rem, 8vw, 8rem)` — fluid, no breakpoints.

---

## Grid & Layout

- Max content width: `1440px`
- Side gutter: `clamp(1.25rem, 5vw, 4rem)` — scales beautifully across all viewports
- Column grid: 12-column, gap `clamp(1rem, 2vw, 1.5rem)`
- Navigation height: `clamp(3.5rem, 5vw, 5rem)`

---

## Animation System

### Easing Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance animations — quick start, smooth end |
| `--ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exit animations |
| `--ease-inout` | `cubic-bezier(0.85, 0, 0.15, 1)` | Cinematic transitions (letterbox, wipes) |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions, button hover |

### Duration Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 0.1s | State changes (focus, active) |
| `--dur-fast` | 0.22s | Hover transitions |
| `--dur-base` | 0.4s | Standard transitions |
| `--dur-slow` | 0.7s | Section entrances |
| `--dur-xslow` | 1.2s | Cinematic entrances (letterbox, page loads) |

### Signature Animations

1. **Letterbox open** — `#letterbox-top` and `#letterbox-bottom` `scaleY(0)` over 1.2s `ease-inout`. Fires once per session. Defines the first impression.

2. **Headline line reveals** — `.hero__line-inner` translates from `translateY(110%)` to `0` with stagger. Creates a stamped title-card feel.

3. **Scroll velocity marquee** — Service and client marquees read scroll velocity via GSAP ticker and adjust speed. Feels physical.

4. **SplitType character reveals** — Characters enter with `opacity: 0, y: 0.3em, rotateX: -30deg` stagger. Subtle 3D depth on text entrance.

5. **Clip-path wipes** — Section reveals use `inset(0 100% 0 0)` → `inset(0 0% 0 0)` mimicking film wipe transitions.

6. **3D card tilt** — `data-tilt` cards respond to mousemove with `perspective(600px) rotateX() rotateY()` at low degrees.

7. **Film grain canvas** — 24fps noise rendered to `<canvas>` at 3.8% opacity with `mix-blend-mode: overlay`. Removed at 12fps on mobile.

8. **Magnetic cursor** — GSAP `quickTo` at `duration: 0.35` gives elastic lag. Morphs to PLAY pill on portfolio cards.

---

## Component Library

### Buttons

```html
<!-- Primary: filled amber, transparent on hover -->
<a class="btn btn--amber">View Our Work</a>

<!-- Secondary: transparent with border -->
<a class="btn btn--outline">Explore</a>

<!-- Ghost: inline text link with arrow -->
<a class="btn btn--ghost">View All Work</a>
```

### Video Slot

```html
<div class="vid-slot" data-video-slot="[SLOT_ID]" data-aspect="16:9">
  <div class="vid-slot__bg"></div>
  <div class="vid-slot__corners">
    <span data-corner="tl"></span><span data-corner="tr"></span>
    <span data-corner="bl"></span><span data-corner="br"></span>
  </div>
  <div class="vid-slot__center">
    <div class="vid-slot__icon">
      <svg viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>
    </div>
    <p class="vid-slot__label">[SLOT_LABEL — To Be Supplied]</p>
    <p class="vid-slot__specs">Specs here</p>
  </div>
</div>
```

### Section Label

```html
<p class="section-label">Section Name</p>
<!-- Renders: ─── SECTION NAME in amber mono -->
```

### Filter Button

```html
<button class="filter-btn is-active" data-filter="all">All</button>
<button class="filter-btn" data-filter="weddings">Weddings</button>
```

### Portfolio Card

```html
<a href="work/project-slug/" class="portfolio-card" data-category="weddings" data-tilt>
  <!-- vid-slot inside -->
  <div class="portfolio-card__overlay"></div>
  <div class="portfolio-card__info">
    <p class="portfolio-card__tag">Category</p>
    <h2 class="portfolio-card__title">Title</h2>
    <p class="portfolio-card__year">Year</p>
  </div>
</a>
```

### Work Card (featured)

```html
<a href="work/project-slug/" class="work-card" data-tilt>
  <!-- vid-slot inside -->
  <div class="work-card__overlay"></div>
  <div class="work-card__info">
    <p class="work-card__tag">Category</p>
    <h3 class="work-card__title">Title</h3>
    <p class="work-card__desc">Short description</p>
  </div>
</a>
```

---

## Brand Mark — The Aperture Cross

A registration-mark crosshair element used as a brand signature:
- Four L-shaped corner brackets forming a frame
- Appears on video slot corners, section markers, and in the logo treatment
- References: camera registration marks, film gate corners, lens aperture
- Rendered via `::before`/`::after` pseudo-elements — no external assets

---

## Responsive Strategy

**Mobile-first.** All base CSS targets mobile. Desktop is the enhancement.

| Breakpoint | Width | Description |
|---|---|---|
| Base | 0–480px | Mobile portrait — single column, simplified animations |
| sm | 480–768px | Mobile landscape / small tablet |
| md | 768–1024px | Tablet — 2-column where applicable |
| lg | 1024–1440px | Desktop |
| xl | 1440px+ | Wide desktop — max-width kicks in |

**Key mobile decisions:**
- Magnetic cursor: disabled (`@media (hover: none)`)
- Film grain: 12fps instead of 24fps
- Grid: columns reduce gracefully (3→2→1)
- Navigation: full-screen overlay scales with `clamp()`
- Type: all fluid via `clamp()` — no separate mobile type overrides
- Touch: `data-tilt` replaced with `scale-on-tap` via CSS `:active`
- Video: `playsinline muted autoplay loop` pattern for iOS Safari

---

## SEO Markup Patterns

Every page includes:
- `<title>` — Page name · Corevisualmedia
- `<meta name="description">` — Max 160 chars
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card: `summary_large_image`
- `<link rel="canonical">`
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<section>`, `<article>`, `<footer>`, `<aside>`
- Heading hierarchy: single `<h1>` per page, logical `<h2>`–`<h3>` nesting
- Image `alt` attributes on all meaningful images
- `aria-label` on all interactive elements without visible text labels
- `role` attributes where semantic HTML is insufficient

---

*Design system version 1.0 — built June 2025*
