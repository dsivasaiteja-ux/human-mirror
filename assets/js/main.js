/* ============================================================
   HUMAN MIRROR — MAIN JS v2.0
   Runs after layout.js has injected nav + footer.
   ============================================================ */

(function () {
  'use strict';

  function init() {

    /* ── 1. NAV SCROLL SHADOW ─────────────────────────────── */
    var navbar = document.getElementById('hm-navbar');
    if (navbar) {
      var onScroll = function () {
        navbar.classList.toggle('hm-nav-scrolled', window.scrollY > 20);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── 2. ACTIVE NAV LINK ───────────────────────────────── */
    var page = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
    document.querySelectorAll('.hm-nav-link, .hm-mobile-link').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href === page) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });

    /* ── 3. MOBILE HAMBURGER ──────────────────────────────── */
    var hamburger = document.getElementById('hm-hamburger');
    var mobileMenu = document.getElementById('hm-mobile-menu');
    var overlay    = document.getElementById('hm-mobile-overlay');

    function openMenu() {
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      var spans = hamburger.querySelectorAll('span');
      spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
    }

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
      });
      if (overlay) overlay.addEventListener('click', closeMenu);
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
    }

    /* ── 4. SCROLL REVEAL ─────────────────────────────────── */
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { revealObs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ── 5. GEOLOCATION HINT ──────────────────────────────── */
    var locText = document.getElementById('locationText');
    if (locText && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function () {
          locText.textContent = '📍 Location detected — showing resources relevant to your area.';
          locText.style.color = '#3A7D23';
        },
        function () {
          locText.textContent = '📍 Enable location for hyper-local resources, or browse all countries.';
        },
        { timeout: 5000 }
      );
    }

    /* ── 6. SEARCH CHIPS ──────────────────────────────────── */
    document.querySelectorAll('.example-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var input = document.getElementById('searchInput');
        if (input) {
          input.value = chip.getAttribute('data-query') || '';
          input.focus();
        }
      });
    });

    /* ── 7. SEARCH BUTTON ─────────────────────────────────── */
    var searchBtn   = document.getElementById('searchBtn');
    var searchInput = document.getElementById('searchInput');
    if (searchBtn && searchInput) {
      function doSearch() {
        var q = searchInput.value.trim();
        if (!q) { searchInput.focus(); return; }
        // In production this navigates to a results page
        window.location.href = 'categories.html?q=' + encodeURIComponent(q);
      }
      searchBtn.addEventListener('click', doSearch);
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doSearch();
      });
    }

    /* ── 8. COUNTER ANIMATION ─────────────────────────────── */
    var counters = document.querySelectorAll('.count-up');
    if (counters.length && 'IntersectionObserver' in window) {
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var obs = new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          obs.unobserve(el);
          var start = null;
          var duration = 1800;
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(ease * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString();
          }
          requestAnimationFrame(step);
        }, { threshold: 0.5 });
        obs.observe(el);
      });
    }

    /* ── 9. FORM INTERCEPT ────────────────────────────────── */
    document.querySelectorAll('form.hm-form').forEach(function (form) {
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.setAttribute('data-label', submitBtn.textContent);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending…';
        }
        setTimeout(function () {
          // Hide form, show success message if present
          var success = document.getElementById(form.getAttribute('data-success'));
          if (success) {
            form.style.display = 'none';
            success.style.display = 'flex';
          } else {
            // Fallback: show inline confirmation
            var conf = form.querySelector('.hm-form-confirmation');
            if (conf) conf.style.display = 'block';
          }
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-label') || 'Submit';
          }
        }, 1000);
      });
    });

    /* ── 10. FAQ ACCORDION ────────────────────────────────── */
    document.querySelectorAll('.faq-q, .faq-mini-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item, .faq-mini-item');
        if (!item) return;
        var isOpen = item.classList.contains('open');
        // Close all in same container
        var container = item.parentElement;
        container.querySelectorAll('.faq-item.open, .faq-mini-item.open').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    });

    /* ── 11. SMOOTH HASH SCROLL (offset for fixed nav) ────── */
    document.querySelectorAll('a[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href) return;
        var parts  = href.split('#');
        var pagePart = parts[0];
        var hash   = parts[1];
        if (!hash) return;
        // Same-page hash
        if (!pagePart || pagePart === page) {
          var target = document.getElementById(hash);
          if (target) {
            e.preventDefault();
            var offset = (navbar ? navbar.offsetHeight : 72) + 16;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        }
      });
    });

    /* ── 12. COUNTRY TAB SWITCHER (global-resources page) ─── */
    document.querySelectorAll('.region-tab, .country-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var group = tab.closest('.region-tabs, .country-tabs');
        if (group) {
          group.querySelectorAll('.region-tab, .country-tab').forEach(function (t) {
            t.classList.remove('active');
          });
        }
        tab.classList.add('active');

        var filter = tab.getAttribute('data-region') || tab.textContent.trim().toLowerCase();
        document.querySelectorAll('.country-card').forEach(function (c) {
          var r = (c.getAttribute('data-region') || '').toLowerCase();
          c.style.display = (filter === 'all' || r === filter) ? '' : 'none';
        });
      });
    });

    /* ── 13. CATEGORY FILTER (categories page) ─────────────── */
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter') || 'all';
        document.querySelectorAll('.cat-full').forEach(function (c) {
          c.style.display = (f === 'all' || c.getAttribute('data-category') === f) ? '' : 'none';
        });
      });
    });

  } /* end init() */

  /* Run after DOM + layout.js injection ─────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
