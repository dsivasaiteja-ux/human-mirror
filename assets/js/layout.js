document.addEventListener("DOMContentLoaded", () => {
  injectGlobalHeader();
  injectGlobalFooter();
});

function injectGlobalHeader() {
  const target = document.getElementById("hm-header");
  if (!target) return;

  const currentSegment = window.location.pathname.split("/").pop() || "index.html";

  target.innerHTML = `
    <header class="hm-header">
      <div class="container nav-container">
        <a href="index.html" class="nav-logo">
          <img src="assets/images/logo.jpeg" alt="Human Mirror">
          <span>Human Mirror</span>
        </a>
        <nav>
          <ul class="nav-links">
            <li><a href="about.html" class="nav-link ${currentSegment === 'about.html' ? 'active' : ''}">About</a></li>
            <li><a href="categories.html" class="nav-link ${currentSegment === 'categories.html' ? 'active' : ''}">Categories</a></li>
            <li><a href="how-it-works.html" class="nav-link ${currentSegment === 'how-it-works.html' ? 'active' : ''}">How It Works</a></li>
            <li><a href="global-resources.html" class="nav-link ${currentSegment === 'global-resources.html' ? 'active' : ''}">Global Hub</a></li>
            <li><a href="volunteer.html" class="nav-link ${currentSegment === 'volunteer.html' ? 'active' : ''}">Volunteer</a></li>
            <li><a href="partner.html" class="nav-link ${currentSegment === 'partner.html' ? 'active' : ''}">Partner</a></li>
            <li><a href="contact.html" class="nav-link ${currentSegment === 'contact.html' ? 'active' : ''}">Contact</a></li>
            <li><a href="emergency.html" class="btn" style="background:#DC2626; color:#fff; font-weight:600; padding:10px 20px;">SOS Emergency</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".hm-header");
    if (header) {
      window.scrollY > 40 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
    }
  });
}

function injectGlobalFooter() {
  const target = document.getElementById("hm-footer");
  if (!target) return;

  target.innerHTML = `
    <footer class="hm-footer">
      <div class="container" style="display:grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap:64px; margin-bottom:80px;">
        <div>
          <a href="index.html" class="nav-logo" style="color:#fff;">
            <img src="assets/images/logo.jpeg" alt="Human Mirror">
            <span>Human Mirror</span>
          </a>
          <p style="margin-top:20px; font-size:14px; line-height:1.7; max-width:300px; font-weight:300; color:rgba(255,255,255,0.4);">Decentralized public infrastructure providing safe, privacy-first linkages to localized critical aid frameworks.</p>
        </div>
        <div>
          <h4 style="color:#fff; font-size:12px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:24px;">Platform</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:14px;">
            <li><a href="about.html" style="color:inherit; text-decoration:none; font-size:14px;" class="footer-hover">Our Philosophy</a></li>
            <li><a href="categories.html" style="color:inherit; text-decoration:none; font-size:14px;" class="footer-hover">Registry Index</a></li>
            <li><a href="how-it-works.html" style="color:inherit; text-decoration:none; font-size:14px;" class="footer-hover">System Mechanics</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#fff; font-size:12px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:24px;">Involvement</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:14px;">
            <li><a href="volunteer.html" style="color:inherit; text-decoration:none; font-size:14px;" class="footer-hover">Become a Curator</a></li>
            <li><a href="partner.html" style="color:inherit; text-decoration:none; font-size:14px;" class="footer-hover">Resource Entities</a></li>
            <li><a href="contact.html" style="color:inherit; text-decoration:none; font-size:14px;" class="footer-hover">Communications</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#fff; font-size:12px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:24px;">Privacy Protocol</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:14px;">
            <li><span style="font-size:14px; color:rgba(255,255,255,0.4);">Zero-Logs Operational</span></li>
            <li><span style="font-size:14px; color:rgba(255,255,255,0.4);">RAM-Only Pipelines</span></li>
          </ul>
        </div>
      </div>
      <div class="container" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:40px; display:flex; justify-content:between; align-items:center; font-size:13px; font-weight:300; color:rgba(255,255,255,0.3);">
        <div>&copy; 2026 Human Mirror Initiative. Engineered as open source digital public infrastructure.</div>
        <div style="display:flex; gap:32px;">
          <a href="#" style="color:inherit; text-decoration:none;">Privacy Safeguard</a>
          <a href="#" style="color:inherit; text-decoration:none;">Terms of Infrastructure</a>
        </div>
      </div>
    </footer>
  `;
}
