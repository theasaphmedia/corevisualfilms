/* ============================================================
   COREVISUALMEDIA — Creative Layer   js/creative.js
   Preloader · Progress · Magnetic · Scramble · Orbs ·
   Horizontal Scroll · Card Interactions · Film Counter
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll Progress Bar ─────────────────────────────── */
  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      bar.style.transform = 'scaleX(' + (window.scrollY / max) + ')';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── 2. Branded Preloader (3 → 2 → 1 → wipe) ───────────── */
  function initPreloader() {
    var loader = document.getElementById('preloader');
    if (!loader) return;

    if (sessionStorage.getItem('cvf-seen')) {
      loader.style.display = 'none';
      return;
    }

    /*  Mark as seen NOW so hero/letterbox run in fast (return-visit) mode
        while the preloader plays on top.                                 */
    sessionStorage.setItem('cvf-seen', '1');

    var countEl = loader.querySelector('.preloader__count');
    var barFill  = loader.querySelector('.preloader__bar-fill');
    var n = 3;

    if (countEl) countEl.textContent = n;
    if (barFill)  barFill.style.width = '0%';

    var iv = setInterval(function () {
      n--;
      if (countEl) countEl.textContent = n > 0 ? n : '';
      if (barFill)  barFill.style.width = ((3 - n) / 3 * 100) + '%';

      if (n <= 0) {
        clearInterval(iv);

        /* Morph count into brand name, hold briefly, then wipe */
        if (countEl) {
          countEl.style.transition    = 'all 0.45s cubic-bezier(0.16,1,0.3,1)';
          countEl.style.fontSize      = '0.6rem';
          countEl.style.letterSpacing = '0.32em';
          countEl.style.color         = 'rgba(200,169,110,0.5)';
          countEl.textContent         = 'COREVISUALMEDIA';
        }

        setTimeout(function () {
          loader.style.transition = 'clip-path 0.9s cubic-bezier(0.76,0,0.24,1)';
          loader.style.clipPath   = 'inset(100% 0 0 0)';
          setTimeout(function () { loader.remove(); }, 1000);
        }, 700);
      }
    }, 750);
  }

  /* ── 3. Magnetic Buttons ────────────────────────────────── */
  function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.btn, .nav__logo').forEach(function (btn) {
      var leaveTimer = null;

      btn.addEventListener('mouseenter', function () {
        clearTimeout(leaveTimer);
        btn.style.transition = 'none';
      });

      btn.addEventListener('mousemove', function (e) {
        var r  = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width  / 2)) * 0.26;
        var dy = (e.clientY - (r.top  + r.height / 2)) * 0.26;
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        btn.style.transform  = '';
        leaveTimer = setTimeout(function () {
          btn.style.transition = '';
        }, 650);
      });
    });
  }

  /* ── 4. Text Scramble ───────────────────────────────────── */
  var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789·—';

  function scrambleEl(el) {
    var target = el.dataset.scramble || el.textContent.trim();
    var frames = 22;
    var f      = 0;
    var id     = setInterval(function () {
      el.textContent = target.split('').map(function (ch, i) {
        if (ch === ' ' || ch === '\n') return ch;
        if (f / frames > i / target.length) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      f++;
      if (f > frames) { el.textContent = target; clearInterval(id); }
    }, 36);
  }

  function initScramble() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { scrambleEl(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.65 });
    document.querySelectorAll('[data-scramble]').forEach(function (el) { io.observe(el); });
  }

  /* ── 5. Ambient Glow Orbs ───────────────────────────────── */
  function initAmbientOrbs() {
    document.querySelectorAll('.ambient-orb').forEach(function (orb, i) {
      var t   = i * 2.8;
      var dir = (i % 2 === 0) ? 1 : -1;
      function tick() {
        t += 0.0025;
        var x = 50 + dir * 24 * Math.sin(t);
        var y = 50 + 16 * Math.cos(t * 0.6);
        var r = 58 + 12 * Math.sin(t * 0.38);
        orb.style.background = [
          'radial-gradient(ellipse ' + r + '% 52% at ' + x + '% ' + y + '%,',
          'rgba(200,169,110,0.042) 0%, transparent 72%)'
        ].join('');
        requestAnimationFrame(tick);
      }
      tick();
    });
  }

  /* ── 6. Horizontal Scroll — Extended Work Reel ──────────── */
  function initHorizontalScroll() {
    /* Desktop only — mobile uses native scroll-snap */
    if (window.innerWidth < 768) return;

    var section = document.getElementById('horizontal-work');
    var track   = document.getElementById('horizontal-track');
    if (!section || !track) return;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    var dist = function () { return track.scrollWidth - section.clientWidth; };

    gsap.to(track, {
      x: function () { return -dist(); },
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: function () { return '+=' + dist(); },
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  /* ── 7. Work-card cursor: show PLAY on hover ─────────────── */
  function initCardCursorPlay() {
    var cursor = document.querySelector('.cursor');
    if (!cursor) return;
    document.querySelectorAll('.work-card, .h-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor--play');
      });
      card.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor--play');
      });
    });
  }

  /* ── 8. Film Frame Counter (decorative) ─────────────────── */
  function initFilmCounter() {
    var counters = document.querySelectorAll('.h-card__frame');
    if (!counters.length) return;
    setInterval(function () {
      counters.forEach(function (el) {
        el.textContent = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
      });
    }, 115);
  }

  /* ── 9. Hover-to-play on horizontal cards ────────────────── */
  function initHoverPlay() {
    document.querySelectorAll('.h-card').forEach(function (card) {
      var video = card.querySelector('video');
      if (!video) return;
      /* h-cards use preload=none; load on first hover */
      var loaded = false;
      card.addEventListener('mouseenter', function () {
        if (!loaded) { video.load(); loaded = true; }
        video.play().catch(function () {});
      });
      card.addEventListener('mouseleave', function () {
        video.pause();
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initScrollProgress();
    initScramble();
    initAmbientOrbs();
    initCardCursorPlay();
    initFilmCounter();
    initHoverPlay();
  });

  window.addEventListener('load', function () {
    initMagneticButtons();
    /* Small delay ensures GSAP + ScrollTrigger are fully parsed */
    setTimeout(initHorizontalScroll, 120);
  });

})();
