# Cowork Build Prompt — Corevisualmedia Website

---

## PROJECT OVERVIEW

Build a **world-class, award-winning videography website** for **Corevisualmedia** — a full-spectrum visual production studio covering Weddings & Events, Commercial & Brand, Music Videos, Real Estate, Documentary & Film, and Corporate & Training.

The site must feel like it belongs on Awwwards, CSS Design Awards, or FWA. It should be visually cinematic, technically excellent, and built to **convert visitors into inquiries** through a portfolio-first experience that commands trust and desire.

---

## STEP 1 — RESEARCH PHASE (Do this before writing a single line of code)

Before choosing any design direction, tech stack, page structure, or visual language, **conduct research**:

1. **Study award-winning videographer and creative agency sites** — look at Awwwards, Behance, and the portfolios of studios like BUCK, Anyways Creative, m ss ng p eces, and similar. Note what makes them memorable.
2. **Analyse the top-performing videographer websites globally** — identify patterns in navigation, hero sections, portfolio presentation, and CTAs that drive conversion.
3. **Research the best tech stack** for a cinematic, animation-rich, SEO-optimised videography site. Consider Next.js, Astro, Nuxt, or plain HTML/CSS/JS with GSAP — choose what gives the best balance of performance, animation capability, and SEO.
4. **Research ideal page structure** for a full-service videographer — what pages do award-winning competitors include? What converts best?
5. **Research visual direction** — what aesthetic language works best for a studio called "Corevisualmedia" covering this range of services? Study cinematic, editorial, and luxury creative aesthetics. Commit to one clear visual direction based on findings.

Document your research decisions in a `RESEARCH.md` file before proceeding.

---

## STEP 2 — DESIGN DIRECTION (Commit after research)

Based on research, commit to a **bold, specific aesthetic direction**. Some possible directions to evaluate (pick the strongest one):

- **Cinematic Dark** — deep blacks, film-grain texture, wide letterboxed hero, dramatic typography
- **Editorial Monochrome** — high-contrast black and white with one sharp accent colour, magazine-layout grid
- **Luxury Minimal** — generous whitespace, refined serif headline font, slow deliberate animations
- **Bold Kinetic** — large expressive type in motion, high-energy transitions, confident and modern

Whatever direction is chosen, it must:
- Use **distinctive, characterful typography** — NO Inter, Roboto, Arial, or system fonts. Choose a pairing that feels intentional and cinematic (e.g., a refined display serif + a clean geometric sans, or a dramatic variable font + a minimal mono)
- Have a **dominant colour palette** — not timid. Deep, committed colours with sharp accents
- Feel **unforgettable** — one thing a visitor will remember when they leave

---

## STEP 3 — PAGE STRUCTURE

Based on research, determine the ideal pages. As a minimum baseline, include:

### `/` — Home
- **Full-screen cinematic hero** — autoplay muted looping video background (placeholder: `[HERO_VIDEO_PLACEHOLDER]`, use a styled div with aspect ratio, gradient overlay, and "Hero Video — To Be Supplied" label). Include headline, sub-headline, and primary CTA button ("View Our Work" → Portfolio).
- **Services overview strip** — 6 service categories as interactive cards or a scrolling marquee: Weddings & Events, Commercial & Brand, Music Videos, Real Estate, Documentary & Film, Corporate & Training
- **Featured work section** — 3–4 portfolio highlight reels as video thumbnail placeholders (each labelled clearly e.g. `[FEATURED_VIDEO_1_PLACEHOLDER]`)
- **Social proof / stats bar** — e.g. "200+ Productions · 6 Continents · 10 Years of Story" (use placeholder numbers)
- **Client logo strip** — placeholder blocks labelled `[CLIENT_LOGO_PLACEHOLDER]`
- **Process teaser** — brief 3-step process (e.g. Consult → Create → Deliver)
- **Testimonial highlight** — 1 featured quote with placeholder
- **Footer CTA** — "Ready to create something unforgettable?" + inquiry button

### `/work` or `/portfolio` — Portfolio
- **Filter tabs** by category: All / Weddings / Commercial / Music Videos / Real Estate / Documentary / Corporate
- **Video grid** — masonry or asymmetric grid of video thumbnail placeholders. Each card: `[VIDEO_THUMBNAIL_PLACEHOLDER]`, project title, category tag, hover state reveals play icon + short description
- At least **12 placeholder cards** distributed across categories
- Each card links to a project detail page (build template)

### `/work/[project-slug]` — Project Detail (Template)
- Full-width video embed area: `[PROJECT_VIDEO_PLACEHOLDER]`
- Project title, category, client (placeholder), year
- Project description / story paragraph (placeholder)
- Deliverables / scope tags
- Related projects grid (3 items)

### `/services` — Services
- Individual section per service with: icon/visual, title, description, what's included, and CTA
- Services: Weddings & Events, Commercial & Brand, Music Videos, Real Estate, Documentary & Film, Corporate & Training
- Each service has a video/visual placeholder: `[SERVICE_VIDEO_PLACEHOLDER_WEDDINGS]` etc.

### `/about` — About
- Cinematic full-width image/video placeholder: `[ABOUT_HERO_PLACEHOLDER]`
- Studio story / founder bio (placeholder text — keep it compelling and real-feeling)
- Team section with avatar placeholders: `[TEAM_PHOTO_PLACEHOLDER]`
- Gear & equipment section (placeholder — list typical pro videography gear)
- Values / philosophy section

### `/contact` — Contact & Booking
- **Inquiry form** with fields: Full Name, Email, Phone, Service Type (dropdown), Event/Project Date, Budget Range (dropdown), Project Description, How did you hear about us?
- Map or studio location placeholder
- Response time promise ("We respond within 24 hours")
- Social links

### (Optional based on research) `/testimonials`, `/blog`, `/pricing`

---

## STEP 4 — VIDEO PLACEHOLDER SYSTEM

Since all videos will be supplied later, build a **consistent, beautiful placeholder system**:

```
Every video placeholder must be:
- A styled <div> or <section> with correct aspect ratio (16:9 for most, 9:16 for mobile/reel)
- Filled with a gradient or subtle animated noise texture (on-brand colours)
- Labelled clearly in the centre: e.g. "[HERO_VIDEO — To Be Supplied]"
- Has a play button icon overlaid (non-functional, decorative)
- Has a data attribute: data-video-slot="hero" for easy replacement later
```

Build a `VIDEO_SLOTS.md` file listing every placeholder slot with its ID, location (page + section), and recommended video specs.

---

## STEP 5 — ANIMATIONS & INTERACTIONS

The site must feel **alive**. Include:

- **Page load animation** — logo or site name reveals on first load
- **Scroll-triggered reveals** — sections animate in as user scrolls (fade up, clip reveal, or scale in — pick what fits the aesthetic)
- **Cursor** — custom cursor if it fits the direction (e.g. a dot that scales on hover over interactive elements)
- **Portfolio hover states** — video thumbnails lift, overlay appears, play icon animates in
- **Navigation** — smooth, with active state indicators. Consider a full-screen menu overlay for a cinematic feel
- **Page transitions** — if using a framework that supports it, add smooth route transitions
- **Marquee/ticker** — for service names or client list
- **Parallax** — subtle parallax on hero or section backgrounds

Use GSAP, Framer Motion, or CSS animations — whichever fits the chosen stack.

---

## STEP 6 — PERFORMANCE & SEO

- **Lighthouse score target**: 90+ across all categories
- Lazy-load all video placeholders and images
- Use `next/image` (or equivalent) for all images
- Proper semantic HTML — `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`
- Meta tags per page — title, description, Open Graph, Twitter Card
- `sitemap.xml` and `robots.txt`
- Mobile-first responsive — flawless on iPhone, Android, tablet, and desktop
- Smooth 60fps animations — no jank

---

## STEP 7 — FILE STRUCTURE & DOCUMENTATION

Produce a clean, well-organised codebase with:

- `README.md` — setup instructions, how to run, how to deploy
- `RESEARCH.md` — your research findings and decisions
- `VIDEO_SLOTS.md` — complete list of every video placeholder and specs
- `DESIGN_SYSTEM.md` — colours, typography, spacing scale, component library
- Comments in code where non-obvious decisions were made

---

## DELIVERABLES SUMMARY

| Item | Status |
|---|---|
| Research documentation | Required before build |
| Tech stack decision + rationale | Required |
| Visual direction commitment | Required |
| All pages built and linked | Required |
| Video placeholder system | Required |
| Animation & interaction layer | Required |
| Mobile responsive | Required |
| SEO setup | Required |
| VIDEO_SLOTS.md | Required |
| DESIGN_SYSTEM.md | Required |
| README.md | Required |

---

## BRAND BASICS

- **Studio Name:** Corevisualmedia
- **Tagline (placeholder — suggest a better one based on research):** *"Every Frame, A Story"*
- **Services:** Weddings & Events · Commercial & Brand · Music Videos · Real Estate · Documentary & Film · Corporate & Training
- **Primary CTA:** View Portfolio → Reach Out / Book a Call
- **Tone:** Premium, confident, cinematic, creative — NOT corporate or generic

---

## IMPORTANT NOTES

- Do NOT use stock photography or stock video — placeholders only, clearly labelled
- Do NOT use generic AI aesthetics (purple gradients, Inter font, cookie-cutter layouts)
- Every design decision should feel **deliberate and specific** to a visual production studio
- The site should make a visitor think: *"These people are serious artists."*
- Build as if this is entering an Awwwards competition

**Start with RESEARCH.md. Then proceed page by page.**
