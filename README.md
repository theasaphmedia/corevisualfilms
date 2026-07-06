# Corevisualmedia Website

**World-class, award-entry-grade videography website.**  
Cinematic Noir + Amber aesthetic · Pure HTML/CSS/JS · No build step required.

---

## Quick Start

1. Open `index.html` in any modern browser — the site runs immediately, no server required.
2. For best experience, serve from a local server (avoids CORS on CDN scripts):
   ```bash
   # Python (any machine)
   python -m http.server 8000
   # then open http://localhost:8000

   # Node (if installed)
   npx serve .
   ```

---

## File Structure

```
Corevisualmedia Website/
├── index.html                    ← Home page
├── work/
│   ├── index.html                ← Portfolio grid (12 projects, filterable)
│   └── project-template/
│       └── index.html            ← Project detail page (template for all)
├── services/
│   └── index.html                ← All 6 services with video placeholders
├── about/
│   └── index.html                ← Studio story, team, gear, philosophy
├── process/
│   └── index.html                ← 5-step process + FAQ accordion
├── reel/
│   └── index.html                ← Full-screen showreel + category reels
├── contact/
│   └── index.html                ← Inquiry form + contact info
├── css/
│   ├── tokens.css                ← All design tokens (colours, type, spacing)
│   └── global.css                ← Shared styles (nav, footer, cursor, etc.)
├── js/
│   └── core.js                   ← Shared JS (Lenis, GSAP, grain, cursor, nav)
├── RESEARCH.md                   ← Research decisions (read before building)
├── DESIGN_SYSTEM.md              ← Complete design system reference
├── VIDEO_SLOTS.md                ← All 30 video placeholder slots with specs
└── README.md                     ← This file
```

---

## Technology Stack

| Tool | Version | Purpose |
|---|---|---|
| HTML5 | — | Structure. Semantic, accessible. |
| CSS Custom Properties | — | Design tokens, responsive via `clamp()` |
| JavaScript (ES6+) | — | Animations, interactions |
| GSAP | 3.12.5 | ScrollTrigger, SplitType-compatible animations |
| Lenis | 1.0.42 | Silky inertial scroll |
| SplitType | 0.3.4 | Headline character/word split for animation |
| Google Fonts | — | Cormorant Garamond, DM Sans, Space Mono |

All dependencies loaded from CDN — no npm, no build step.

---

## Adding Real Videos

Every video placeholder has a `data-video-slot` attribute. See `VIDEO_SLOTS.md` for the complete list (30 slots total).

**To replace a placeholder with a Vimeo embed:**

1. Find the `.vid-slot` element with `data-video-slot="hero"` (for example)
2. Replace the entire `.vid-slot` div with:

```html
<div style="position:absolute;inset:0;overflow:hidden;">
  <iframe
    src="https://player.vimeo.com/video/YOUR_VIMEO_ID?autoplay=1&muted=1&loop=1&background=1"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:177.78vh;min-width:100%;height:56.25vw;min-height:100%;"
    aria-label="[Describe the video]">
  </iframe>
</div>
```

**For a self-hosted MP4 (background video):**
```html
<video autoplay muted loop playsinline
  style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
  aria-label="[Describe the video]">
  <source src="../assets/videos/hero.mp4" type="video/mp4">
</video>
```

---

## Adding New Portfolio Projects

1. Duplicate `work/project-template/` and rename the folder (e.g. `work/morrisons-wedding/`)
2. Edit `index.html` in the new folder: update title, category, meta, story text, deliverables tags
3. Add a new card to `work/index.html` grid with the correct `data-category` and `href`
4. Register the new video slots in `VIDEO_SLOTS.md`

---

## Customisation

### Changing Colours
Edit `css/tokens.css` — all colour decisions are CSS custom properties. Change `--color-amber` to any colour and the entire site updates.

### Changing Fonts
Edit the Google Fonts `@import` URL in `css/global.css` and update the font-family tokens in `css/tokens.css`.

### Changing Tagline
Search and replace `"Where Vision Becomes Legacy"` across all HTML files.

### Changing Studio Name / Contact Info
The nav logo, footer brand name, and contact details are in each HTML file. Use your editor's global find-and-replace.

---

## Deployment

The site is pure static HTML — deploy anywhere:

**Recommended (free):**
- **Netlify:** Drag the folder into [netlify.com/drop](https://netlify.com/drop). Done.
- **Vercel:** `npx vercel` from the project folder.
- **Cloudflare Pages:** Connect your GitHub repo.

**Production checklist before launch:**
- [ ] Replace all `[PLACEHOLDER]` text with real content
- [ ] Replace all video placeholders with real videos (see VIDEO_SLOTS.md)
- [ ] Replace `hello@corevisualmedia.com` with real email
- [ ] Replace `+1 (555) 000-0000` with real phone
- [ ] Update `[City, State/Country]` in contact page
- [ ] Update all social links (`href="#"`) with real URLs
- [ ] Update `<link rel="canonical">` URLs to match live domain
- [ ] Update `og:url` and `og:image` meta tags
- [ ] Add real `og:image` files (1200×630px)
- [ ] Update copyright year in footer if needed
- [ ] Replace `[CLIENT LOGO]` placeholders with real SVG logos
- [ ] Update tagline if preferred alternative chosen
- [ ] Connect contact form to a backend (Formspree, Netlify Forms, or custom)
- [ ] Add `sitemap.xml` (generate at xml-sitemaps.com)
- [ ] Add `robots.txt`
- [ ] Test on real iPhone and Android devices
- [ ] Run Lighthouse audit (target: 90+ all categories)

---

## Contact Form Backend

The current form has a simulated submit (shows success after 1.2s). To wire it up:

**Formspree (easiest — free tier available):**
1. Sign up at formspree.io
2. Create a form, get your endpoint URL
3. In `contact/index.html`, replace the `setTimeout` mock with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
if (response.ok) { /* show success */ }
```

---

## Performance Notes

- Zero JavaScript frameworks — no React/Vue/Angular runtime overhead
- GSAP and Lenis are loaded `defer` — they don't block page render
- Film grain canvas runs at 24fps desktop / 12fps mobile
- All images should be WebP format (add when real assets arrive)
- Video backgrounds: use Vimeo CDN for adaptive bitrate delivery
- Target: Lighthouse 90+ across all categories

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 100+ | ✅ Full |
| Firefox 100+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Edge 100+ | ✅ Full |
| iOS Safari 15+ | ✅ Full |
| Android Chrome | ✅ Full |

CSS `clamp()`, CSS custom properties, `aspect-ratio`, `clip-path`, and `IntersectionObserver` are all well-supported in these targets.

---

*Built June 2025 · Corevisualmedia*
