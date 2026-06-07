/* ============================================================
   HUMAN MIRROR — LAYOUT INJECTOR v2.0
   Shared nav + footer for all pages.
   GitHub Pages compatible (relative paths, no trailing slash).
   ============================================================ */

(function () {
  'use strict';

  /* ── Resolve the correct relative path prefix ───────────────
     All pages live at the root, so prefix is always ''.
     If the site is ever moved into a sub-folder, change ROOT.  */
  var ROOT = '';

  /* ── Page definitions (href, label, exact match flag) ───── */
  var NAV_LINKS = [
    { href: 'index.html',           label: 'Home' },
    { href: 'about.html',           label: 'About' },
    { href: 'how-it-works.html',    label: 'How It Works' },
    { href: 'categories.html',      label: 'Categories' },
    { href: 'global-resources.html',label: 'Global Resources' },
    { href: 'volunteer.html',       label: 'Volunteer' },
    { href: 'partner.html',         label: 'Partner' },
    { href: 'contact.html',         label: 'Contact' }
  ];

  /* ── Detect current page ─────────────────────────────────── */
  function currentPage() {
    var p = window.location.pathname.replace(/\/$/, '').split('/').pop();
    return p || 'index.html';
  }

  /* ── Build one nav anchor ────────────────────────────────── */
  function navLink(href, label, extraClass) {
    var active = (href === currentPage()) ? ' active' : '';
    var cls = 'class="hm-nav-link' + active + (extraClass ? ' ' + extraClass : '') + '"';
    return '<a href="' + ROOT + href + '" ' + cls + '>' + label + '</a>';
  }

  /* ── NAV HTML ────────────────────────────────────────────── */
  function buildNav() {
    var links = NAV_LINKS.map(function (l) {
      return navLink(l.href, l.label);
    }).join('\n    ');

    var mobileLinks = NAV_LINKS.map(function (l) {
      return navLink(l.href, l.label, 'hm-mobile-link');
    }).join('\n  ');

    return [
      '<!-- Skip to content (accessibility) -->',
      '<a class="hm-skip-link" href="#hm-main">Skip to main content</a>',
      '',
      '<nav class="hm-nav" id="hm-navbar" role="navigation" aria-label="Main navigation">',
      '  <div class="hm-nav-inner">',
      '',
      '    <!-- Logo -->',
      '    <a href="' + ROOT + 'index.html" class="hm-nav-logo" aria-label="Human Mirror — Home">',
      '      <img class="hm-nav-logo-img" src="' + ROOT + 'assets/images/logo.png" alt="Human Mirror Logo" width="46" height="46"/>',
      '      <div class="hm-nav-brand-wrap">',
      '        <span class="hm-nav-brand"><span class="hm-brand-human">HUMAN </span><span class="hm-brand-mirror">MIRROR</span></span>',
      '        <span class="hm-nav-tagline">Reflect. Learn. Improve.</span>',
      '      </div>',
      '    </a>',
      '',
      '    <!-- Desktop links -->',
      '    <div class="hm-nav-links" role="list">',
      '    ' + links,
      '      <a href="' + ROOT + 'emergency.html" class="hm-nav-link hm-nav-emergency" aria-label="Emergency resources">',
      '        <span aria-hidden="true">🚨</span> Emergency',
      '      </a>',
      '      <a href="' + ROOT + 'index.html#search" class="hm-nav-link hm-nav-cta">Get Help</a>',
      '    </div>',
      '',
      '    <!-- Hamburger -->',
      '    <button class="hm-hamburger" id="hm-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="hm-mobile-menu">',
      '      <span></span><span></span><span></span>',
      '    </button>',
      '  </div>',
      '</nav>',
      '',
      '<!-- Mobile drawer -->',
      '<div class="hm-mobile-menu" id="hm-mobile-menu" role="dialog" aria-label="Mobile navigation" aria-hidden="true">',
      '  <div class="hm-mobile-menu-inner">',
      '  ' + mobileLinks,
      '  <a href="' + ROOT + 'emergency.html" class="hm-mobile-link hm-mobile-emergency">🚨 Emergency</a>',
      '  <a href="' + ROOT + 'index.html#search" class="hm-mobile-link hm-mobile-cta">Get Help Now →</a>',
      '  </div>',
      '</div>',
      '<div class="hm-mobile-overlay" id="hm-mobile-overlay"></div>'
    ].join('\n');
  }

  /* ── FOOTER HTML ─────────────────────────────────────────── */
  function buildFooter() {
    var year = new Date().getFullYear();
    return [
      '<footer class="hm-footer" role="contentinfo">',
      '  <div class="hm-footer-inner">',
      '',
      '    <!-- Brand column -->',
      '    <div class="hm-footer-brand">',
      '      <a href="' + ROOT + 'index.html" aria-label="Human Mirror — Home">',
      '        <img src="' + ROOT + 'assets/images/logo.png" alt="Human Mirror Logo" class="hm-footer-logo" width="64" height="64"/>',
      '      </a>',
      '      <div class="hm-footer-brand-name">HUMAN <span>MIRROR</span></div>',
      '      <div class="hm-footer-rli">Reflect. Learn. Improve.</div>',
      '      <p class="hm-footer-tagline">A Global Digital Public Service Platform connecting every human to the help they need — free, always.</p>',
      '      <div class="hm-footer-socials">',
      '        <a href="https://www.instagram.com/humanmirror.foundation" target="_blank" rel="noopener" class="hm-footer-social" aria-label="Instagram">',
      '          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
      '        </a>',
      '        <a href="https://twitter.com/humanmirrorfyi" target="_blank" rel="noopener" class="hm-footer-social" aria-label="X (Twitter)">',
      '          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
      '        </a>',
      '        <a href="https://linkedin.com/company/humanmirror" target="_blank" rel="noopener" class="hm-footer-social" aria-label="LinkedIn">',
      '          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
      '        </a>',
      '        <a href="https://youtube.com/@humanmirrorfyi" target="_blank" rel="noopener" class="hm-footer-social" aria-label="YouTube">',
      '          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>',
      '        </a>',
      '      </div>',
      '    </div>',
      '',
      '    <!-- Get Help column -->',
      '    <nav class="hm-footer-col" aria-label="Get help links">',
      '      <div class="hm-footer-col-title">Get Help</div>',
      '      <ul class="hm-footer-links">',
      '        <li><a href="' + ROOT + 'categories.html#mental-health">Mental Health</a></li>',
      '        <li><a href="' + ROOT + 'categories.html#child-protection">Child Protection</a></li>',
      '        <li><a href="' + ROOT + 'categories.html#womens-safety">Women\'s Safety</a></li>',
      '        <li><a href="' + ROOT + 'categories.html#legal-assistance">Legal Assistance</a></li>',
      '        <li><a href="' + ROOT + 'emergency.html">Emergency Resources</a></li>',
      '      </ul>',
      '    </nav>',
      '',
      '    <!-- Resources column -->',
      '    <nav class="hm-footer-col" aria-label="Resources links">',
      '      <div class="hm-footer-col-title">Resources</div>',
      '      <ul class="hm-footer-links">',
      '        <li><a href="' + ROOT + 'categories.html#education">Education</a></li>',
      '        <li><a href="' + ROOT + 'categories.html#career-guidance">Career Guidance</a></li>',
      '        <li><a href="' + ROOT + 'categories.html#addiction-recovery">Addiction Recovery</a></li>',
      '        <li><a href="' + ROOT + 'categories.html#community-support">Community Support</a></li>',
      '        <li><a href="' + ROOT + 'global-resources.html">Global Directory</a></li>',
      '      </ul>',
      '    </nav>',
      '',
      '    <!-- Platform column -->',
      '    <nav class="hm-footer-col" aria-label="Platform links">',
      '      <div class="hm-footer-col-title">Platform</div>',
      '      <ul class="hm-footer-links">',
      '        <li><a href="' + ROOT + 'how-it-works.html">How It Works</a></li>',
      '        <li><a href="' + ROOT + 'about.html">Our Mission</a></li>',
      '        <li><a href="' + ROOT + 'global-resources.html">Global Coverage</a></li>',
      '        <li><a href="' + ROOT + 'volunteer.html">Volunteer</a></li>',
      '        <li><a href="' + ROOT + 'partner.html">Partner With Us</a></li>',
      '      </ul>',
      '    </nav>',
      '',
      '    <!-- Organisation column -->',
      '    <nav class="hm-footer-col" aria-label="Organisation links">',
      '      <div class="hm-footer-col-title">Organisation</div>',
      '      <ul class="hm-footer-links">',
      '        <li><a href="' + ROOT + 'about.html">About Us</a></li>',
      '        <li><a href="' + ROOT + 'about.html#values">Core Values</a></li>',
      '        <li><a href="' + ROOT + 'contact.html">Contact Us</a></li>',
      '        <li><a href="' + ROOT + 'contact.html#privacy">Privacy Policy</a></li>',
      '        <li><a href="' + ROOT + 'how-it-works.html#privacy">Accessibility</a></li>',
      '      </ul>',
      '    </nav>',
      '',
      '  </div>',
      '',
      '  <!-- Footer bottom bar -->',
      '  <div class="hm-footer-bottom">',
      '    <div class="hm-footer-bottom-inner">',
      '      <p class="hm-footer-copy">© ' + year + ' Human Mirror. All rights reserved. Reflect. Learn. Improve.</p>',
      '      <div class="hm-footer-badges">',
      '        <span class="hm-footer-badge">🔒 SSL Secured</span>',
      '        <span class="hm-footer-badge">♿ WCAG 2.1 AA</span>',
      '        <span class="hm-footer-badge">🌍 195+ Countries</span>',
      '        <span class="hm-footer-badge">🆓 Always Free</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</footer>'
    ].join('\n');
  }

  /* ── Inject nav and footer ───────────────────────────────── */
  function inject() {
    var navSlot = document.getElementById('hm-nav');
    if (navSlot) {
      var div = document.createElement('div');
      div.innerHTML = buildNav();
      navSlot.parentNode.replaceChild(div, navSlot);
      // Unwrap the wrapper div
      var parent = div.parentNode;
      while (div.firstChild) parent.insertBefore(div.firstChild, div);
      parent.removeChild(div);
    }

    var footerSlot = document.getElementById('hm-footer');
    if (footerSlot) {
      var fdiv = document.createElement('div');
      fdiv.innerHTML = buildFooter();
      footerSlot.parentNode.replaceChild(fdiv, footerSlot);
      var fparent = fdiv.parentNode;
      while (fdiv.firstChild) fparent.insertBefore(fdiv.firstChild, fdiv);
      fparent.removeChild(fdiv);
    }
  }

  /* ── Run on DOM ready ────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
