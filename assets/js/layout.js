/* ============================================================
   HUMAN MIRROR — LAYOUT INJECTOR v3.0
   Nav + Footer injected on every page. GitHub Pages ready.
   ============================================================ */
(function(){
  'use strict';

  var LOGO = 'assets/images/logo.png';

  var PAGES = [
    {href:'index.html',      label:'Home'},
    {href:'how-it-works.html',label:'How It Works'},
    {href:'categories.html', label:'Categories'},
    {href:'global-resources.html',label:'Global Resources'},
    {href:'emergency.html',  label:'Emergency'},
    {href:'volunteer.html',  label:'Volunteer'},
    {href:'partner.html',    label:'Partner With Us'},
    {href:'about.html',      label:'About'},
    {href:'contact.html',    label:'Contact'}
  ];

  function currentPage(){
    var p = window.location.pathname.replace(/\/$/,'').split('/').pop();
    return p || 'index.html';
  }

  function isActive(href){
    return href.split('#')[0] === currentPage();
  }

  function navLink(href, label, extraClass){
    var a = isActive(href) ? ' active' : '';
    return '<a href="'+href+'" class="hm-nav-a'+a+(extraClass?' '+extraClass:'')+'"'+(a?' aria-current="page"':'')+'>'+label+'</a>';
  }

  function mobLink(href, label, extraClass){
    var a = isActive(href) ? ' active' : '';
    return '<a href="'+href+'" class="hm-mob-a'+a+(extraClass?' '+extraClass:'')+'"'+(a?' aria-current="page"':'')+'>'+label+'</a>';
  }

  function buildNav(){
    var desktopLinks = PAGES.map(function(p){return navLink(p.href,p.label);}).join('');
    var mobLinks = PAGES.map(function(p){return mobLink(p.href,p.label);}).join('');
    return [
      '<a class="skip-link" href="#main-content">Skip to main content</a>',
      '<nav class="hm-nav" id="hm-navbar" role="navigation" aria-label="Main navigation">',
      '  <div class="hm-nav-inner">',
      '    <a href="index.html" class="hm-logo" aria-label="Human Mirror — Home">',
      '      <img src="'+LOGO+'" alt="Human Mirror Logo" width="44" height="44"/>',
      '      <div class="hm-logo-text">',
      '        <span class="hm-logo-name"><span class="h">HUMAN </span><span class="m">MIRROR</span></span>',
      '        <span class="hm-logo-tag">Reflect. Learn. Improve.</span>',
      '      </div>',
      '    </a>',
      '    <div class="hm-nav-links" role="list">',
      desktopLinks,
      '      <a href="emergency.html" class="hm-nav-a hm-nav-emg'+(isActive('emergency.html')?' active':'')+'" aria-label="Emergency resources">🚨 Emergency</a>',
      '      <a href="index.html#search" class="hm-nav-a hm-nav-cta">Get Help</a>',
      '    </div>',
      '    <button class="hm-burger" id="hm-burger" aria-label="Open menu" aria-expanded="false" aria-controls="hm-mob">',
      '      <span></span><span></span><span></span>',
      '    </button>',
      '  </div>',
      '</nav>',
      '<div class="hm-mob" id="hm-mob" aria-hidden="true" role="dialog" aria-label="Mobile navigation">',
      '  <div class="hm-mob-inner">',
      mobLinks,
      '    <a href="emergency.html" class="hm-mob-a hm-mob-emg">🚨 Emergency</a>',
      '    <a href="index.html#search" class="hm-mob-a hm-mob-cta">Get Help Now →</a>',
      '  </div>',
      '</div>',
      '<div class="hm-overlay" id="hm-overlay"></div>'
    ].join('\n');
  }

  function buildFooter(){
    var yr = new Date().getFullYear();
    return [
      '<footer class="hm-footer" role="contentinfo">',
      '  <div class="hm-footer-grid">',
      '    <div class="hm-footer-logo">',
      '      <a href="index.html"><img src="'+LOGO+'" alt="Human Mirror Logo" width="60" height="60"/></a>',
      '      <div class="hm-footer-brand">HUMAN <span>MIRROR</span></div>',
      '      <div class="hm-footer-rli">Reflect. Learn. Improve.</div>',
      '      <p class="hm-footer-mission">Connecting Every Human To The Help They Need.</p>',
      '      <div class="hm-footer-socials">',
      '        <a href="https://instagram.com/humanmirror.fyi" target="_blank" rel="noopener" class="hm-footer-soc" aria-label="Instagram">'+svgInsta()+'</a>',
      '        <a href="https://x.com/HumanMirroryfi" target="_blank" rel="noopener" class="hm-footer-soc" aria-label="X (Twitter)">'+svgX()+'</a>',
      '        <a href="https://wa.me/919133210709" target="_blank" rel="noopener" class="hm-footer-soc" aria-label="WhatsApp">'+svgWA()+'</a>',
      '      </div>',
      '    </div>',
      '    <nav class="hm-footer-col" aria-label="Get Help">',
      '      <div class="hm-footer-col-h">Get Help</div>',
      '      <ul>',
      '        <li><a href="emergency.html">Emergency Resources</a></li>',
      '        <li><a href="categories.html">Child Protection</a></li>',
      '        <li><a href="categories.html">Women\'s Safety</a></li>',
      '        <li><a href="categories.html">Mental Health</a></li>',
      '        <li><a href="categories.html">Legal Assistance</a></li>',
      '      </ul>',
      '    </nav>',
      '    <nav class="hm-footer-col" aria-label="Resources">',
      '      <div class="hm-footer-col-h">Resources</div>',
      '      <ul>',
      '        <li><a href="global-resources.html">India Resources</a></li>',
      '        <li><a href="global-resources.html">UAE Resources</a></li>',
      '        <li><a href="global-resources.html">USA Resources</a></li>',
      '        <li><a href="categories.html">All Categories</a></li>',
      '        <li><a href="global-resources.html">Global Directory</a></li>',
      '      </ul>',
      '    </nav>',
      '    <nav class="hm-footer-col" aria-label="Platform">',
      '      <div class="hm-footer-col-h">Platform</div>',
      '      <ul>',
      '        <li><a href="how-it-works.html">How It Works</a></li>',
      '        <li><a href="about.html">Our Mission</a></li>',
      '        <li><a href="volunteer.html">Volunteer</a></li>',
      '        <li><a href="partner.html">Partner With Us</a></li>',
      '        <li><a href="contact.html">Contact Us</a></li>',
      '      </ul>',
      '    </nav>',
      '    <nav class="hm-footer-col" aria-label="Contact">',
      '      <div class="hm-footer-col-h">Contact</div>',
      '      <ul>',
      '        <li><a href="mailto:hello@humanmirror.fyi">hello@humanmirror.fyi</a></li>',
      '        <li><a href="https://wa.me/919133210709" target="_blank" rel="noopener">WhatsApp Us</a></li>',
      '        <li><a href="https://humanmirror.fyi" target="_blank" rel="noopener">humanmirror.fyi</a></li>',
      '        <li><a href="about.html">About Us</a></li>',
      '        <li><a href="contact.html#privacy">Privacy Policy</a></li>',
      '      </ul>',
      '    </nav>',
      '  </div>',
      '  <div class="hm-footer-bottom">',
      '    <div class="hm-footer-bottom-inner">',
      '      <p class="hm-footer-copy">© '+yr+' Human Mirror. All rights reserved. Reflect. Learn. Improve.</p>',
      '      <div class="hm-footer-badges">',
      '        <span class="hm-footer-badge">🔒 Privacy First</span>',
      '        <span class="hm-footer-badge">♿ Accessible</span>',
      '        <span class="hm-footer-badge">🌍 Global Platform</span>',
      '        <span class="hm-footer-badge">🆓 Always Free</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</footer>'
    ].join('\n');
  }

  function svgInsta(){return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';}
  function svgX(){return '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';}
  function svgWA(){return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';}

  function inject(){
    var navEl = document.getElementById('hm-nav');
    if(navEl){
      var tmp = document.createElement('div');
      tmp.innerHTML = buildNav();
      var parent = navEl.parentNode;
      while(tmp.firstChild) parent.insertBefore(tmp.firstChild, navEl);
      parent.removeChild(navEl);
    }
    var ftEl = document.getElementById('hm-footer');
    if(ftEl){
      var tmp2 = document.createElement('div');
      tmp2.innerHTML = buildFooter();
      var parent2 = ftEl.parentNode;
      while(tmp2.firstChild) parent2.insertBefore(tmp2.firstChild, ftEl);
      parent2.removeChild(ftEl);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else { inject(); }
})();
