document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
});

function injectHeader() {
  const container = document.getElementById("hm-header");
  if (!container) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  container.innerHTML = `
    <header class="hm-header">
      <div class="container nav-container">
        <a href="index.html" class="nav-logo">
          <img src="assets/images/logo.jpeg" alt="Human Mirror Logo">
          <span>Human Mirror</span>
        </a>
        <nav>
          <ul class="nav-links">
            <li><a href="about.html" class="nav-link ${currentPath === 'about.html' ? 'active' : ''}">About</a></li>
            <li><a href="categories.html" class="nav-link ${currentPath === 'categories.html' ? 'active' : ''}">Categories</a></li>
            <li><a href="how-it-works.html" class="nav-link ${currentPath === 'how-it-works.html' ? 'active' : ''}">How It Works</a></li>
            <li><a href="global-resources.html" class="nav-link ${currentPath === 'global-resources.html' ? 'active' : ''}">Global Hub</a></li>
            <li><a href="volunteer.html" class="nav-link ${currentPath === 'volunteer.html' ? 'active' : ''}">Volunteer</a></li>
            <li><a href="partner.html" class="nav-link ${currentPath === 'partner.html' ? 'active' : ''}">Partner</a></li>
            <li><a href="contact.html" class="nav-link ${currentPath === 'contact.html' ? 'active' : ''}">Contact</a></li>
            <li><a href="emergency.html" class="btn btn-primary" style="background:#DC2626;color:#fff;border:none;">SOS Emergency</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  // Header transform on vertical scrolling
  window.addEventListener("scroll", () => {
    const headerEl = document.querySelector(".hm-header");
    if (window.scrollY > 20) {
      headerEl.classList.add("scrolled");
    } else {
      headerEl.classList.remove("scrolled");
    }
  });
}

function injectFooter() {
  const container = document.getElementById("hm-footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="hm-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="color:#fff;">
            <img src="assets/images/logo.jpeg" alt="Human Mirror Logo">
            <span>Human Mirror</span>
          </a>
          <p>Global Digital Public Service Infrastructure providing safe, absolute private access to vital human guidance resources.</p>
        </div>
        <div>
          <h4 class="footer-heading">Platform</h4>
          <ul class="footer-links">
            <li><a href="about.html" class="footer-link">Our Vision</a></li>
            <li><a href="categories.html" class="footer-link">Resource Registry</a></li>
            <li><a href="how-it-works.html" class="footer-link">System Mechanics</a></li>
            <li><a href="emergency.html" class="footer-link" style="color:#FCA5A5;">Emergency Access</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Involvement</h4>
          <ul class="footer-links">
            <li><a href="volunteer.html" class="footer-link">Become a Curator</a></li>
            <li><a href="partner.html" class="footer-link">Resource Partnerships</a></li>
            <li><a href="contact.html" class="footer-link">Communications Central</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Security Framework</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Zero-Logs Policy</a></li>
            <li><a href="#" class="footer-link">Data Integrity Protocols</a></li>
            <li><a href="#" class="footer-link">Public Service Charter</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <div>&copy; 2026 Human Mirror Initiative. Engineered as a Public Service Infrastructure. Open Source Core.</div>
        <div style="display:flex;gap:24px;">
          <a href="#" class="footer-link">Privacy Safeguard</a>
          <a href="#" class="footer-link">Terms of Utility</a>
        </div>
      </div>
    </footer>
  `;
}
