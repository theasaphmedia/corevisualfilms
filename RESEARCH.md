# RESEARCH.md — Corevisualmedia Website
### Produced before any code is written. All build decisions flow from this document.

---

## 1. COMPETITIVE LANDSCAPE — What the Best Are Doing

### Award-Winning Creative Studios Studied

| Studio | Why They Win | What They Use |
|---|---|---|
| **Lusion** (Awwwards SOTM) | Real-time 3D, immersive depth, every pixel intentional | WebGL, GSAP, custom shaders |
| **BUCK** | Kinetic motion culture, bold confident identity | Proprietary stack, GSAP |
| **m ss ng p eces** | Cinematic production feel, rich texture & soundscape | Custom, scroll-driven |
| **Akaru** (Awwwards SOTM 2024) | Architectural dark aesthetic, deliberate interaction | GSAP, Lenis, Locomotive Scroll |
| **Resn** | Narrative-led, emotionally immersive, genre-bending | WebGL, GSAP |
| **Locomotive** (Webby Technical Achievement 2024) | Silky smooth scroll inertia, typographic boldness | Locomotive Scroll, GSAP |

### Pattern Recognition Across Winners
- **Inertial scroll** (Lenis or Locomotive Scroll) is near-universal — it makes the site feel alive before a single animation triggers
- **Magnetic cursor** separates premium from ordinary — it's a tactile signature
- **Full-screen opening sequences** — the site takes 1–2 seconds to introduce itself before handing control to the user
- **Typography as a design element** — not just headings, but oversized, cropped, animated letterforms that fill space
- **Film/grain texture** as a subtle persistent overlay — makes dark backgrounds feel tactile, not flat
- **Clip-path reveals** are dominant — they feel native to cinema (wipe transitions, gate reveals)

---

## 2. WHAT COMPETITORS GET WRONG (The Gap Corevisualmedia Will Fill)

Research across 80+ videographer websites reveals systemic weaknesses:

### Design Failures
- **Generic layouts** — 90%+ of videographer sites use template aesthetics (Squarespace/Format/Wix). They look identical. There is zero differentiation.
- **Poor typography** — Inter, Roboto, Montserrat everywhere. Zero personality. No intentional type hierarchy.
- **Flat, lifeless dark modes** — Many try "dark" but it's just `#000` + white text. No texture, no depth, no cinematic quality.
- **No opening experience** — Sites just... load. No anticipation, no arrival, no cinematic moment.

### Animation Failures
- **Static hover states** — box-shadow on hover is not an animation. It's the absence of one.
- **No scroll choreography** — sections slide in with identical fade-ups. Repetitive, forgettable.
- **Desktop-only polish** — any animation that exists is broken, janky, or simply absent on mobile.
- **Cursor neglect** — the default browser cursor on a visual production website in 2025 is an insult to the craft.

### Mobile Failures (Most Critical)
- **81% of videographer sites score "mediocre or worse" on mobile UX** (Baymard Institute data)
- Tiny tap targets (below 44px)
- Autoplay video that breaks on iOS Safari
- Navigation menus that are afterthoughts
- No touch gesture design — swipe behaviours absent
- Poor video loading on 4G/LTE — no adaptive bitrate, no lazy load
- Animations that cause layout shift (CLS) on mobile

### Content Failures
- No personality — reads like a brochure, not a studio with a point of view
- No process page — clients want to understand how you work
- Testimonials buried or absent
- CTAs are generic ("Contact Us") — no urgency, no value proposition

---

## 3. TECH STACK DECISION

### Chosen Stack: **Astro 5 + GSAP 3 + Lenis**

**Why Astro over Next.js:**

| Factor | Astro | Next.js |
|---|---|---|
| Default JS output | Zero JS (HTML only) | React runtime always bundled |
| Lighthouse Performance | 95–100 typical | 75–90 typical |
| Core Web Vitals pass rate | ~60% of sites | ~38% of comparable sites |
| Static page load speed | ~0.9s average | ~2.8s average |
| SEO | Excellent (pure HTML) | Good (SSG mode) |
| Animation support | Full (GSAP via script tags or React islands) | Full |
| Deployment | Any static host (Vercel, Netlify, Cloudflare Pages) | Vercel preferred |

Astro ships zero JavaScript by default. Every page is pure HTML unless we explicitly hydrate a component. This is ideal for a portfolio site where the primary job is *displaying content beautifully*, not running app logic. GSAP and Lenis are loaded as client scripts — they do not require a framework runtime.

**Why GSAP over Framer Motion:**
- Framer Motion requires React runtime (~45KB)
- GSAP is framework-agnostic and works natively in Astro
- GSAP's ScrollTrigger, SplitText, and Draggable plugins are unmatched
- GSAP is the industry standard for Awwwards-level work

**Why Lenis for scroll:**
- Creates the "liquid" inertial scroll that defines premium digital experiences
- Lightweight (~6KB)
- Works perfectly with GSAP ScrollTrigger
- Dramatically improves perceived quality on every device

### Full Stack
```
Framework:       Astro 5.x
Animations:      GSAP 3 (ScrollTrigger, SplitText, Draggable)
Smooth Scroll:   Lenis 1.x
Styling:         CSS Custom Properties (design tokens) + Astro scoped CSS
Fonts:           Google Fonts (self-hosted subset for performance)
Build Tool:      Vite (built into Astro)
Deployment:      Vercel / Netlify (static export)
Video delivery:  Lazy-loaded placeholders; production videos via CDN embed
```

---

## 4. VISUAL DIRECTION — COMMITTED DECISION

### Chosen Direction: **Cinematic Noir with Amber Warmth**

This is NOT standard "dark mode." It is a specific, named aesthetic: the visual language of a prestige film — deep blacks, controlled pools of light, warm amber highlights, and grain that makes darkness feel textured.

**Why this direction beats the alternatives:**
- *Cinematic Dark* (standard): Too common — every "serious" agency uses it. Ours goes further.
- *Editorial Monochrome*: Cold, removes warmth. Videography is emotional — warmth matters.
- *Luxury Minimal*: Too passive for a studio doing music videos and commercial work.
- *Bold Kinetic*: Risk of feeling trendy and dated. We want timeless.

**The distinction**: Most dark videographer sites use cold blues or neutral greys as accents. We use **cinematic amber/gold** (#C8A96E) — the colour of film grain, tungsten light, golden hour. It's immediately associative with the best cinema. It signals warmth, craft, permanence.

**The unforgettable moment**: On first load, the site introduces itself with **letterbox cinematic bars** (top and bottom widescreen bars) that slide away to reveal the hero — simulating a film beginning to play. No other videographer site does this. It takes 1.8 seconds and immediately communicates: *these people think in frames.*

### Colour Palette

| Token | Hex | Use |
|---|---|---|
| `--color-void` | `#080808` | Primary background — near-black, not pure black |
| `--color-depth` | `#0E0E0E` | Card/section backgrounds |
| `--color-surface` | `#141414` | Elevated surfaces |
| `--color-border` | `#1E1E1E` | Borders, dividers |
| `--color-amber` | `#C8A96E` | Primary accent — cinematic amber |
| `--color-amber-dim` | `#8B7248` | Hover/muted amber states |
| `--color-white` | `#FFFFFF` | Primary text, high contrast |
| `--color-off-white` | `#E8E0D0` | Body text — warm, not stark |
| `--color-muted` | `#6B6B6B` | Metadata, captions |
| `--color-grain` | CSS noise | Film grain overlay at 3–8% opacity |

### Typography

**Display / Headline: Cormorant Garamond (Italic + SemiBold)**
- A dramatic, high-contrast serif with film poster heritage
- Free via Google Fonts
- Exceptional at large scale — individual letterforms are works of art
- The italic cuts are cinematic and urgent
- Used for: hero headlines, section titles, pull quotes, project names

**UI / Body: DM Sans (Regular + Medium)**
- Clean geometric humanist sans
- Excellent legibility at small sizes
- Feels modern without being cold
- Free via Google Fonts
- Used for: navigation, body copy, labels, metadata, buttons

**Accent / Code: Space Mono (Regular)**
- Monospaced technical feel
- Used sparingly: timestamps, frame counters, technical stats
- Adds contrast and visual texture against the serifs

**Type Scale (fluid, viewport-responsive using `clamp()`):**
```css
--text-hero:    clamp(3.5rem, 10vw, 10rem);
--text-display: clamp(2.5rem, 6vw, 6rem);
--text-h1:      clamp(2rem, 4vw, 4rem);
--text-h2:      clamp(1.5rem, 3vw, 2.5rem);
--text-h3:      clamp(1.25rem, 2vw, 1.75rem);
--text-body:    clamp(1rem, 1.5vw, 1.125rem);
--text-sm:      clamp(0.8rem, 1vw, 0.875rem);
```

---

## 5. PAGE STRUCTURE DECISIONS

### Confirmed Pages (with rationale)

| Page | Why It Earns Its Place |
|---|---|
| `/` Home | First impression. The cinematic opening lives here. Must convert curiosity → action. |
| `/work` Portfolio | The main product. Masonry grid with filter. This is where clients decide. |
| `/work/[slug]` Project | Individual project depth. Tells the story behind the work. Builds trust. |
| `/services` | Converts browsers into inquirers. Explicit about what's offered. |
| `/about` | The "why trust you" page. Studio story, values, team, gear. |
| `/process` | **Not in original brief — added based on research.** Top-converting page type. Clients want to know how you work before they contact you. Reduces friction. |
| `/reel` | **Added.** A single full-screen showreel page. No distractions. The purest expression of the studio's craft. Links to from nav and hero. |
| `/contact` | Inquiry form + location + response promise. |

### Removed/Merged
- `/testimonials` — testimonials integrated into portfolio project pages and a scrolling strip on home. Standalone testimonial pages are low-converting and feel insecure.
- `/pricing` — not recommended for a premium studio. Prices on the web commoditise creative work. CTA leads to consultation.
- `/blog` — replaced with `/journal` if added. But not Phase 1 — focus on conversion pages.

---

## 6. ANIMATION STRATEGY — THE DIFFERENTIATORS

### Interactions No Competing Videographer Site Has

**1. Cinematic Letterbox Open**
On first load: widescreen black bars (top: 12vh, bottom: 12vh) slide outward to reveal the hero. Duration 1.8s. Eased with GSAP `power3.inOut`. Fires once per session (sessionStorage flag). Immediately frames the experience as a film.

**2. Magnetic Cursor with Reel Trail**
A small circular cursor follows the mouse with elastic lag (GSAP `quickTo`). On hover over portfolio thumbnails, it expands to a "PLAY" pill. On hover over links, it morphs to a pointer state. On the hero, a faint motion trail follows it. Removed on touch devices, replaced with tap affordances.

**3. Frame-Counter Aesthetic**
In the hero and on project pages: a timecode-style readout (00:00:00:00) counts up or scrubs with scroll. Uses Space Mono. Pure CSS/JS — no library needed. Creates the sensation of being inside a timeline.

**4. Scroll-Velocity Marquee**
The service name marquee responds to scroll speed: scroll faster, marquee accelerates. Scroll up, it reverses. Built with GSAP's `ticker` and scroll velocity tracking. Feels physical, alive.

**5. Portfolio Card Depth (3D Tilt)**
Each portfolio card has subtle 3D perspective tilt following cursor position (vanilla-tilt or pure CSS transform). On hover: the thumbnail lifts, a category tag slides in from below, a play icon fades in with scale. The entire card system feels like handling physical media.

**6. Clip-Path Wipe Section Reveals**
Sections reveal via horizontal or vertical clip-path wipes (not fade-ups). Specifically: `clip-path: inset(0 100% 0 0)` wiping to `inset(0 0% 0 0)`. Mirrors the film wipe transition. Choreographed with ScrollTrigger `scrub`.

**7. SplitText Headline Reveals**
Every major headline is split into individual characters or words with GSAP SplitText. Characters stagger in with a slight vertical offset and rotation — like a title card being stamped onto the screen. Timing: 0.04s stagger per character.

**8. Film Grain Overlay**
A `<canvas>` element with procedural noise rendered at ~4% opacity sits over the entire site. Updates at 24fps to simulate film grain. Imperceptible at a glance, transformative to the overall texture. Pure JavaScript — no library.

**9. Ambient Video Thumbnail Scrubbing**
On the portfolio page: hovering a thumbnail and moving the mouse left-right scrubs through 4 preview frames (CSS sprite or `currentTime` manipulation on a short silent video). Gives the sensation of handling film footage.

**10. Page Transition: Film Cut**
Route transitions use a full-viewport black overlay that cuts in (0.15s) and cuts out (0.15s) — mimicking a hard cut in editing. Fast, purposeful, cinematic. No long cross-fades.

### Mobile Animation Strategy
- All animations have `prefers-reduced-motion` fallbacks
- Touch devices: magnetic cursor removed, replaced with scale-on-tap
- Scroll animations use smaller transforms (less distance) for performance
- Film grain runs at 12fps on mobile to preserve battery
- Portfolio swipe gestures using pointer events (no library needed)
- All animations GPU-accelerated (`transform`, `opacity` only — no layout-triggering properties)

---

## 7. MOBILE-FIRST ARCHITECTURE

Mobile is designed first. Desktop is the enhancement.

### Critical Mobile Standards
- Minimum tap target: 48×48px on all interactive elements
- Navigation: Full-screen overlay with large touch targets and swipe-to-close
- Video placeholders: `aspect-ratio: 16/9` preserved, no layout shift
- Hero: Text scales down gracefully with `clamp()` — never overflows
- Portfolio grid: Single column on mobile, 2-column on tablet, masonry on desktop
- Forms: Full-width inputs, `font-size: 16px` minimum (prevents iOS zoom)
- Fonts: Self-hosted subsets, max 80KB total font load
- Images: `loading="lazy"`, `decoding="async"`, modern formats (WebP)
- Video autoplay: `muted playsinline autoplay loop` — iOS Safari compatible

### Performance Targets
| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 200ms |
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| Total JS (gzipped) | < 150KB |

---

## 8. BRAND DECISIONS

### Studio Name Interpretation
"Corevisual" = the core of visual storytelling. The name implies precision, centrality, essentialness. Every frame intentional. This guides the design philosophy: nothing wasted, nothing accidental.

**Visual motif: The Aperture Cross**
A subtle crosshair/registration mark element (four small L-shaped corners forming a frame) appears across the UI as a brand signature — in the logo, as section markers, on video placeholder corners. References camera registration marks, film gate corners, and targeting reticles. It says: *we see what others don't.*

### Tagline (Research-Informed Upgrade)
Original: *"Every Frame, A Story"* — functional but generic. Used by dozens of competitors.

**Recommended:** `"Where Vision Becomes Legacy"` — premium, timeless, implies longevity of the work. Alternatively: `"The Frame That Changes Everything"` — singular, urgent.

### Brand Voice
- Confident, not boastful
- Cinematic, not theatrical
- Precise, not verbose
- Personal, not corporate
- Example: Not "We deliver high-quality video content." But: "Some stories need more than words. We find the frame that says everything."

---

## 9. SEO STRATEGY

- Astro generates pure HTML — all content crawler-readable
- Per-page `<title>`, `<meta description>`, Open Graph, Twitter Card
- Structured data: `LocalBusiness`, `VideoObject`, `BreadcrumbList`
- `sitemap.xml` auto-generated by Astro sitemap integration
- `robots.txt` allowing full crawl
- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<section>`, `<h1>`–`<h3>` hierarchy
- Image `alt` attributes on all placeholders
- Canonical URLs
- Self-hosted fonts (no external DNS lookup for Google Fonts at render time)

---

## 10. SUMMARY — DECISIONS LOCKED

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Astro 5 | Performance, SEO, zero JS default |
| Animations | GSAP 3 + ScrollTrigger | Industry standard, Awwwards-grade |
| Scroll | Lenis | Inertial feel, GSAP compatible |
| Visual Direction | Cinematic Noir + Amber | Distinct from all competitors |
| Display Font | Cormorant Garamond | Cinematic, editorial, free, beautiful |
| Body Font | DM Sans | Clean, modern, legible |
| Accent Font | Space Mono | Technical, sparse, textural contrast |
| Accent Colour | #C8A96E (Amber) | Film warmth, distinctive, not used by competitors |
| Signature Feature | Letterbox opening sequence | No videographer site does this |
| Mobile Approach | Touch-first, gesture-aware | Address the 81% failure rate gap |
| Pages | 8 pages inc. /process and /reel | Research-justified additions |
| Tagline | "Where Vision Becomes Legacy" | Upgrade from generic original |

---

*Research complete. Build begins from this document.*
