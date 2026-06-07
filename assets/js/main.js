cat > /mnt/user-data/outputs/human-mirror/assets/js/main.js << 'EOF'
/* ============================================================
   HUMAN MIRROR — MAIN JS v3.0
   ============================================================ */
(function(){
  'use strict';

  function init(){

    /* 1. NAV SCROLL */
    var nav = document.getElementById('hm-navbar');
    if(nav){
      var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 18); };
      window.addEventListener('scroll', onScroll, {passive:true});
      onScroll();
    }

    /* 2. ACTIVE LINK */
    var page = window.location.pathname.replace(/\/$/,'').split('/').pop() || 'index.html';
    document.querySelectorAll('.hm-nav-a, .hm-mob-a').forEach(function(a){
      var h = (a.getAttribute('href')||'').split('#')[0].split('/').pop();
      if(h === page){ a.classList.add('active'); a.setAttribute('aria-current','page'); }
    });

    /* 3. MOBILE MENU */
    var burger  = document.getElementById('hm-burger');
    var mob     = document.getElementById('hm-mob');
    var overlay = document.getElementById('hm-overlay');

    function openMenu(){
      mob.classList.add('open'); overlay.classList.add('open');
      burger.setAttribute('aria-expanded','true');
      mob.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
      var s = burger.querySelectorAll('span');
      s[0].style.transform='rotate(45deg) translate(5px,5px)';
      s[1].style.opacity='0';
      s[2].style.transform='rotate(-45deg) translate(5px,-5px)';
    }
    function closeMenu(){
      mob.classList.remove('open'); overlay.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      mob.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      burger.querySelectorAll('span').forEach(function(s){ s.style.transform=''; s.style.opacity=''; });
    }
    if(burger && mob){
      burger.addEventListener('click', function(){ mob.classList.contains('open') ? closeMenu() : openMenu(); });
      if(overlay) overlay.addEventListener('click', closeMenu);
      mob.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
      document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });
    }

    /* 4. SCROLL REVEAL */
    var revs = document.querySelectorAll('.reveal');
    if(revs.length && 'IntersectionObserver' in window){
      var rObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); rObs.unobserve(e.target); } });
      },{threshold:0.07, rootMargin:'0px 0px -36px 0px'});
      revs.forEach(function(el){ rObs.observe(el); });
    } else { revs.forEach(function(el){ el.classList.add('visible'); }); }

    /* 5. COUNTER ANIMATION */
    document.querySelectorAll('.count-up').forEach(function(el){
      var target = parseInt(el.getAttribute('data-target'),10)||0;
      if(!('IntersectionObserver' in window)){ el.textContent=target.toLocaleString(); return; }
      var obs = new IntersectionObserver(function(entries){
        if(!entries[0].isIntersecting) return;
        obs.unobserve(el);
        var start=null, dur=1800;
        function step(ts){
          if(!start) start=ts;
          var p = Math.min((ts-start)/dur,1);
          var e = 1-Math.pow(1-p,3);
          el.textContent = Math.floor(e*target).toLocaleString();
          if(p<1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(step);
      },{threshold:.5});
      obs.observe(el);
    });

    /* 6. SMOOTH SCROLL (offset for fixed nav) */
    var navH = function(){ var n=document.getElementById('hm-navbar'); return n ? n.offsetHeight+12 : 80; };
    document.querySelectorAll('a[href*="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        var parts=(a.getAttribute('href')||'').split('#');
        var pg=parts[0], hash=parts[1];
        if(!hash) return;
        var sameOrEmpty = !pg || pg===page || pg==='index.html' && (page===''||page==='index.html');
        if(sameOrEmpty){
          var t=document.getElementById(hash);
          if(t){ e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-navH(),behavior:'smooth'}); }
        }
      });
    });

    /* 7. GEOLOCATION HINT */
    var locEl = document.getElementById('loc-hint');
    if(locEl && 'geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        function(){ locEl.textContent='📍 Location detected — showing nearby resources.'; locEl.style.color='var(--green-mid)'; },
        function(){ locEl.textContent='📍 Browse resources by country using our directory.'; },
        {timeout:5000}
      );
    }

    /* 8. SEARCH → CATEGORIES redirect */
    var searchBtn = document.getElementById('searchBtn');
    var searchIn  = document.getElementById('searchInput');
    if(searchBtn && searchIn){
      function doSearch(){
        var q = searchIn.value.trim();
        if(!q){ searchIn.focus(); return; }
        window.location.href='categories.html?q='+encodeURIComponent(q);
      }
      searchBtn.addEventListener('click', doSearch);
      searchIn.addEventListener('keydown', function(e){ if(e.key==='Enter') doSearch(); });
    }

    /* 9. EXAMPLE CHIPS */
    document.querySelectorAll('.chip-example').forEach(function(c){
      c.addEventListener('click', function(){
        var inp=document.getElementById('searchInput');
        if(inp){ inp.value=c.getAttribute('data-q')||''; inp.focus(); }
      });
    });

    /* 10. FAQ ACCORDION */
    document.querySelectorAll('.faq-q').forEach(function(q){
      q.addEventListener('click', function(){
        var item = q.closest('.faq-item');
        if(!item) return;
        var open = item.classList.contains('open');
        item.parentElement.querySelectorAll('.faq-item.open').forEach(function(i){ i.classList.remove('open'); });
        if(!open) item.classList.add('open');
      });
    });

    /* 11. FILTER BUTTONS (categories / global resources) */
    document.querySelectorAll('[data-filter-group]').forEach(function(group){
      var gname = group.getAttribute('data-filter-group');
      group.querySelectorAll('[data-filter]').forEach(function(btn){
        btn.addEventListener('click', function(){
          group.querySelectorAll('[data-filter]').forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          var val = btn.getAttribute('data-filter');
          document.querySelectorAll('[data-filterable="'+gname+'"]').forEach(function(el){
            var cat = el.getAttribute('data-cat')||'';
            el.style.display = (val==='all' || cat===val) ? '' : 'none';
          });
        });
      });
    });

    /* 12. FORM INTERCEPT */
    document.querySelectorAll('form.hm-form').forEach(function(form){
      var btn = form.querySelector('[type="submit"]');
      if(btn) btn.setAttribute('data-orig', btn.textContent);
      form.addEventListener('submit', function(e){
        e.preventDefault();
        if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
        setTimeout(function(){
          var sid = form.getAttribute('data-success');
          var sEl = sid ? document.getElementById(sid) : null;
          if(sEl){ form.style.display='none'; sEl.style.display='flex'; }
          form.reset();
          if(btn){ btn.disabled=false; btn.textContent=btn.getAttribute('data-orig')||'Submit'; }
        }, 1000);
      });
    });

  } /* end init */

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init); }
  else { init(); }
})();
EOF
echo "main.js: $(wc -c < /mnt/user-data/outputs/human-mirror/assets/js/main.js) bytes"
