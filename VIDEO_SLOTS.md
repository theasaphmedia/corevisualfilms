# VIDEO_SLOTS.md — Corevisualmedia
### Complete index of every video placeholder in the site. Replace with real videos here.

---

## How to Replace a Placeholder

1. Find the element in the HTML using `data-video-slot="[ID]"` (listed below)
2. Replace the `.vid-slot` div with either:
   - An `<video autoplay muted loop playsinline>` element with your MP4 src
   - An `<iframe>` from Vimeo or YouTube (use Vimeo for quality)
3. Remove the `.vid-slot__bg`, `.vid-slot__corners`, `.vid-slot__center` children
4. Keep outer wrapper dimensions (aspect-ratio, position)

**Vimeo embed pattern:**
```html
<iframe src="https://player.vimeo.com/video/YOUR_ID?autoplay=1&muted=1&loop=1&background=1"
  frameborder="0" allow="autoplay; fullscreen" allowfullscreen
  style="position:absolute;top:0;left:0;width:100%;height:100%;">
</iframe>
```

---

## All Slots

### HOME PAGE — index.html

| Slot ID | Section | Aspect Ratio | Notes |
|---|---|---|---|
| `hero` | Hero background | 16:9 (covers full viewport) | Muted loop autoplay. 4K preferred. Short 15–30s loop. |
| `featured-1` | Featured Work — Card 1 | 16:9 | "The Morrisons" wedding film thumbnail/preview |
| `featured-2` | Featured Work — Card 2 | 16:9 | Apex Brand Campaign thumbnail |
| `featured-3` | Featured Work — Card 3 | 16:9 | "Midnight Signal" music video thumbnail |

---

### PORTFOLIO — work/index.html

| Slot ID | Card Title | Category | Aspect Ratio |
|---|---|---|---|
| `work-1`  | The Morrisons — A Coastal Love Story | Weddings | 9:14 (tall) |
| `work-2`  | Apex Brand Campaign 2024 | Commercial | 16:9 |
| `work-3`  | Lyric — "Midnight Signal" | Music | 1:1 |
| `work-4`  | Harlow Residences — Penthouse Collection | Real Estate | 16:9 |
| `work-5`  | The Last Weavers | Documentary | 9:14 (tall) |
| `work-6`  | Meridian Corp — Annual Report Film | Corporate | 16:9 |
| `work-7`  | Chen & Park — Mountain Ceremony | Weddings | 16:9 |
| `work-8`  | Nova — "Sacred Ground" | Music | 9:14 (tall) |
| `work-9`  | Vantage Tower — Sky Suite | Real Estate | 1:1 |
| `work-10` | Solaris Energy — Launch Film | Commercial | 9:14 (tall) |
| `work-11` | Harbour Lights — Short Film | Documentary | 16:9 |
| `work-12` | Elevate Academy — Training Series | Corporate | 16:9 |

---

### PROJECT TEMPLATE — work/project-template/index.html

| Slot ID | Section | Aspect Ratio | Notes |
|---|---|---|---|
| `project-hero` | Hero video embed | 16:9 (covers full 85vh) | This is the main project video. Autoplay muted on load is fine; user initiates sound. |
| `related-1` | Related Projects — Card 1 | 16:9 | Apex Brand Campaign |
| `related-2` | Related Projects — Card 2 | 16:9 | Lyric — Midnight Signal |
| `related-3` | Related Projects — Card 3 | 16:9 | Chen & Park — Mountain Ceremony |

---

### SERVICES — services/index.html

| Slot ID | Service | Aspect Ratio | Notes |
|---|---|---|---|
| `service-weddings`    | Weddings & Events | 4:3 | Short highlight reel or styled still |
| `service-commercial`  | Commercial & Brand | 16:9 | Brand film excerpt |
| `service-music`       | Music Videos | 9:16 (vertical) | Vertical reel for music section |
| `service-realestate`  | Real Estate | 16:9 | Walkthrough or aerial excerpt |
| `service-documentary` | Documentary & Film | 21:9 (cinemascope) | Wide documentary shot |
| `service-corporate`   | Corporate & Training | 16:9 | Corporate excerpt |

---

### ABOUT — about/index.html

| Slot ID | Section | Aspect Ratio | Notes |
|---|---|---|---|
| `about-hero` | About page hero background | 16:9 (covers 70vh) | Behind-the-scenes studio footage or team on set |

---

### REEL — reel/index.html

| Slot ID | Section | Aspect Ratio | Notes |
|---|---|---|---|
| `showreel`       | Main showreel | 21:9 (or 16:9 fallback) | Primary 2–3 min showreel. Autoplay muted; user unmutes. |
| `reel-weddings`  | Category reels | 16:9 | 60–90s weddings reel |
| `reel-commercial`| Category reels | 16:9 | 60–90s commercial reel |
| `reel-music`     | Category reels | 16:9 | 60–90s music video reel |

---

## Recommended Video Specs

| Use | Resolution | Format | Codec | Max Size |
|---|---|---|---|---|
| Hero backgrounds | 1920×1080 or 3840×2160 | MP4 | H.264 or H.265 | 15MB for loops |
| Portfolio thumbnails | 1280×720 | MP4 | H.264 | 8MB |
| Showreel | 3840×2160 or 1920×1080 | MP4 | H.264 | 500MB |
| Service videos | 1920×1080 | MP4 | H.264 | 50MB |
| Vertical reels | 1080×1920 | MP4 | H.264 | 30MB |

**CDN Recommendation:** Host all videos on Vimeo Pro or Cloudflare Stream for adaptive bitrate delivery. Embed via iframe with `?background=1` for background videos.

---

*Total video slots: 30*
