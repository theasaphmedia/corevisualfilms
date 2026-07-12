/* ============================================================
   COREVISUALMEDIA — Core JS  v2
   Fixes: double Lenis RAF, cursor transform conflict,
   grain performance, marquee speed, nav reliability.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Lenis smooth scroll ─────────────────────────────── */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      /* GSAP path — use ONLY the ticker, NOT a separate RAF loop */
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      /* No GSAP — manual RAF only */
      (function tick(time) {
        lenis.raf(time);
        requestAnimationFrame(tick);
      })(0);
    }
  } else if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── 2. Film Grain — lightweight, low-res approach ─────── */
  function initGrain() {
    const canvas = document.getElementById('grain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* Render at 1/5 native res — CSS scales it up.
       This cuts pixel operations by ~25× vs full-res.    */
    const SCALE = 0.2;
    const FPS   = 10;  /* Grain doesn't need high fps */
    let w, h, last = 0;

    function resize() {
      w = canvas.width  = Math.ceil(window.innerWidth  * SCALE);
      h = canvas.height = Math.ceil(window.innerHeight * SCALE);
    }

    function renderGrain(ts) {
      requestAnimationFrame(renderGrain);
      if (ts - last < 1000 / FPS) return;
      last = ts;
      const img = ctx.createImageData(w, h);
      const d   = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v    = (Math.random() * 255) | 0;
        d[i] = d[i+1] = d[i+2] = v;
        d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(renderGrain);
  }

  /* ── 3. Cursor — lerp approach avoids GSAP transform conflict */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mx = -300, my = -300;
    let cx = -300, cy = -300;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    /* Lerp loop — no GSAP transform conflict, silky smooth */
    function loop() {
      cx += (mx - cx) * 0.13;
      cy += (my - cy) * 0.13;
      /* Use calc to keep the CSS translate(-50%,-50%) centering */
      cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
      requestAnimationFrame(loop);
    }
    loop();

    /* State — hover, play */
    function addState(el, state) {
      el.addEventListener('mouseenter', () => cursor.classList.add(state));
      el.addEventListener('mouseleave', () => cursor.classList.remove(state));
    }
    function applyStates() {
      document.querySelectorAll('a, button').forEach(el => addState(el, 'cursor--hover'));
      document.querySelectorAll('.portfolio-card, .vid-slot, video').forEach(el => addState(el, 'cursor--play'));
    }
    applyStates();

    const obs = new MutationObserver(applyStates);
    obs.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }

  /* ── 4. Navigation ──────────────────────────────────────── */
  function initNav() {
    const nav     = document.getElementById('nav');
    const toggle  = document.getElementById('navToggle');
    const overlay = document.getElementById('navOverlay');
    if (!nav || !toggle || !overlay) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      /* Force CSS stagger animation to restart on each open */
      overlay.querySelectorAll('.nav__link-item').forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; /* trigger reflow */
        item.style.animation = '';
      });
      nav.classList.add('nav--open');
      overlay.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      try { if (lenis) lenis.stop(); } catch (e) {}
    }

    function closeMenu() {
      isOpen = false;
      nav.classList.remove('nav--open');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      try { if (lenis) lenis.start(); } catch (e) {}
    }

    toggle.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeMenu(); });

    /* Nav links — instant reset so page curtain takes over cleanly.
       No slide-up animation when navigating — curtain covers it. */
    overlay.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        /* Kill overlay transition instantly */
        overlay.style.transition = 'none';
        nav.classList.remove('nav--open');
        overlay.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        try { if (lenis) lenis.start(); } catch (e) {}
        isOpen = false;
        /* Restore transition after paint so next open animates normally */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { overlay.style.transition = ''; });
        });
      });
    });

    /* Nav appearance on scroll */
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── 5. Marquee — velocity-reactive, correct speed ─────── */
  function initMarquee() {
    const marquees = document.querySelectorAll('[data-marquee]');
    if (!marquees.length || typeof gsap === 'undefined') return;

    marquees.forEach(track => {
      const inner = track.querySelector('.marquee__inner');
      if (!inner) return;

      const clone = inner.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);

      const speed     = parseFloat(track.dataset.speed || '0.35');
      const direction = track.dataset.dir === 'right' ? 1 : -1;
      let x        = 0;
      let velocity = 0;
      let lastY    = window.scrollY;
      let W        = inner.scrollWidth || 1;

      /* Re-measure on resize so the cycle width stays accurate */
      window.addEventListener('resize', () => { W = inner.scrollWidth || 1; }, { passive: true });

      gsap.ticker.add(() => {
        const delta = window.scrollY - lastY;
        lastY = window.scrollY;
        /* Low sensitivity — scrolling should nudge, not rocket */
        velocity += (delta * 0.006 - velocity) * 0.06;
        x += direction * (speed + Math.abs(velocity) * 0.03);
        /* Pixel-based seamless loop: both elements share the same x offset.
           inner is naturally at 0, clone is naturally at W (right after inner).
           At looped = W → inner is fully off-left, clone fills position 0. Wrap = invisible. */
        const looped = ((x % W) + W) % W;
        gsap.set(inner, { x: -looped });
        gsap.set(clone, { x: -looped });
      });
    });
  }

  /* ── 6. Scroll reveal ───────────────────────────────────── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-clip').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-clip').forEach(el => io.observe(el));
  }

  /* ── 7. Letterbox cinematic open ────────────────────────── */
  window.initLetterbox = function () {
    const top    = document.getElementById('letterbox-top');
    const bottom = document.getElementById('letterbox-bottom');
    if (!top || !bottom) return;

    if (sessionStorage.getItem('cvf-seen')) {
      top.style.display = bottom.style.display = 'none';
      return;
    }

    if (typeof gsap !== 'undefined') {
      gsap.timeline({ delay: 0.2, onComplete: () => {
        top.style.display = bottom.style.display = 'none';
        sessionStorage.setItem('cvf-seen', '1');
      }})
      .to([top, bottom], { scaleY: 0, duration: 1.1, ease: 'power3.inOut' });
    } else {
      setTimeout(() => {
        [top, bottom].forEach(el => {
          el.style.transition = 'transform 1.1s cubic-bezier(0.85,0,0.15,1)';
          el.style.transform  = 'scaleY(0)';
        });
        setTimeout(() => {
          top.style.display = bottom.style.display = 'none';
          sessionStorage.setItem('cvf-seen', '1');
        }, 1200);
      }, 200);
    }
  };

  /* ── 8. Timecode ────────────────────────────────────────── */
  window.initTimecode = function () {
    const el = document.getElementById('timecode');
    if (!el) return;
    let f = 0;
    const fps = 24;
    const t = setInterval(() => {
      f++;
      const fr = f % fps;
      const s  = Math.floor(f / fps) % 60;
      const m  = Math.floor(f / (fps * 60)) % 60;
      const h  = Math.floor(f / (fps * 3600)) % 24;
      el.textContent = `${p(h)}:${p(m)}:${p(s)}:${p(fr)}`;
    }, 1000 / fps);
    function p(n) { return String(n).padStart(2,'0'); }
    setTimeout(() => clearInterval(t), 600000);
  };

  /* ── 9. SplitType headline animations ───────────────────── */
  window.initSplitHeadlines = function (selector) {
    if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;
    document.querySelectorAll(selector || '[data-split]').forEach(el => {
      const split = new SplitType(el, { types: 'chars,words' });
      gsap.fromTo(split.chars,
        { opacity: 0, y: '0.4em', rotateX: -25 },
        { opacity: 1, y: 0, rotateX: 0,
          duration: 0.65, ease: 'power3.out', stagger: 0.025,
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  };

  /* ── 10. 3D tilt on cards ───────────────────────────────── */
  window.initCardTilt = function () {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -8;
        card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.015,1.015,1.015)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      });
      card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
    });
  };

  /* ── 11. Video autoplay via IntersectionObserver ─────────── */
  function initVideoAutoplay() {
    const videos = document.querySelectorAll('video[autoplay]');
    if (!videos.length) return;
    videos.forEach(v => v.play().catch(() => {}));
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.play().catch(() => {});
          else entry.target.pause();
        });
      }, { threshold: 0.15 });
      videos.forEach(v => obs.observe(v));
    }
  }

  /* ── 12. Page Transitions — cinematic curtain wipe ─────────── */
  function initPageTransitions() {
    const curtain = document.getElementById('page-curtain');
    if (!curtain || typeof gsap === 'undefined') return;

    /* Reveal on load — curtain sweeps up from bottom */
    gsap.set(curtain, { scaleY: 1, transformOrigin: 'top center' });
    gsap.to(curtain, {
      scaleY: 0,
      duration: 0.9,
      ease: 'power3.inOut',
      delay: 0.05,
      onComplete: () => { curtain.style.pointerEvents = 'none'; }
    });

    /* Exit — curtain sweeps in from bottom on internal link click */
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      /* Only intercept internal, non-anchor links */
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || href.startsWith('http') ||
          link.target === '_blank') return;

      e.preventDefault();
      curtain.style.pointerEvents = 'all';
      gsap.set(curtain, { transformOrigin: 'bottom center', scaleY: 0 });
      gsap.to(curtain, {
        scaleY: 1,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => { window.location.href = href; }
      });
    });
  }

  /* ── 13b. Subpage hero entrance ────────────────────────────── */
  function initHeroEntrance() {
    if (typeof gsap === 'undefined') return;
    const title   = document.querySelector('.page-hero__title');
    const eyebrow = document.querySelector('.page-hero__eyebrow');
    const sub     = document.querySelector('.page-hero__sub');
    if (!title) return; /* home page or no subpage hero */
    const delay = sessionStorage.getItem('cvf-seen') ? 0.15 : 0.25;
    const tl = gsap.timeline({ delay });
    if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', clearProps: 'all' });
    tl.from(title, { opacity: 0, y: 52, duration: 1.0, ease: 'power3.out', clearProps: 'all' }, eyebrow ? '-=0.45' : 0);
    if (sub) tl.from(sub, { opacity: 0, y: 28, duration: 0.75, ease: 'power3.out', clearProps: 'all' }, '-=0.55');
  }

  /* ── 14. Sitewide GSAP stagger animations ───────────────────── */
  function initStaggerAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    function stagger(sel, trig, cfg) {
      const els = document.querySelectorAll(sel);
      if (!els.length) return;
      const c = cfg || {};
      const trigEl = trig
        ? document.querySelector(trig)
        : els[0].parentElement;
      if (!trigEl) return;
      gsap.from(els, {
        opacity:    0,
        y:          c.y  !== undefined ? c.y : 65,
        x:          c.x  || 0,
        scale:      c.sc || 1,
        duration:   c.d  || 1.1,
        ease:       'power3.out',
        stagger:    c.s  || 0.15,
        clearProps: 'all',
        scrollTrigger: { trigger: trigEl, start: 'top 85%', once: true }
      });
    }

    /* ── About (team/gear/values handled by page inline script) */
    stagger('.story__body > p',            '.story__body',        { s: 0.1,  y: 30 });

    /* ── Services — each includes-list triggers independently ── */
    document.querySelectorAll('.includes-list').forEach(function(list) {
      var items = list.querySelectorAll('li');
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0, y: 18, x: -14, duration: 0.7, ease: 'power3.out', stagger: 0.07,
        clearProps: 'all',
        scrollTrigger: { trigger: list, start: 'top 88%', once: true }
      });
    });

    /* ── Process (steps handled by page inline; FAQ is ours) ─ */
    stagger('.faq__item',                  '.faq__list',          { s: 0.10, y: 35 });

    /* ── Work ───────────────────────────────────────────────── */
    stagger('.portfolio-card',             '.portfolio__grid',    { s: 0.09, y: 70 });

    /* ── Reel ───────────────────────────────────────────────── */
    stagger('.reel-meta-item',             '.reel-info__meta',    { s: 0.14, y: 35 });

    /* ── Contact ────────────────────────────────────────────── */
    stagger('.contact-info-block',         '.contact-sidebar',    { s: 0.14, y: 50 });
    stagger('.form-field',                 '.contact-form',       { s: 0.08, y: 30 });

    /* ── Packages ───────────────────────────────────────────── */
    stagger('.note-item',                  '.packages-note__grid',{ s: 0.16, y: 45 });

    /* ── Global ─────────────────────────────────────────────── */
    stagger('.manifesto__fact',            null,                  { s: 0.12, y: 45 });
    stagger('.footer__grid > div',         '.footer__grid',       { s: 0.10, y: 30 });
  }

  /* ── 13. Parallax — hero video + poster reel ─────────────── */
  function initParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    /* Hero reel-stage — video drifts up slower than scroll */
    const reelStage = document.querySelector('.hero__reel-video');
    if (reelStage) {
      gsap.to(reelStage, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    /* Poster reel images — subtle upward drift */
    const posterImgs = document.querySelectorAll('.poster-reel__img');
    if (posterImgs.length) {
      gsap.to(posterImgs, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.poster-reel',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  /* ── Init ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initGrain();
    initCursor();
    initNav();
    initMarquee();
    initHeroEntrance();        /* subpage hero — before reveal so GSAP controls these */
    initStaggerAnimations();   /* group stagger — before reveal so GSAP handles groups */
    initReveal();              /* remaining .reveal elements (lone items) */
    initVideoAutoplay();
    initPageTransitions();
    initParallax();
    window.initCardTilt();
    if (document.getElementById('letterbox-top')) window.initLetterbox();
    if (document.getElementById('timecode'))       window.initTimecode();
    window.initSplitHeadlines();
  });

})();
