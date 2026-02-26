/* Pi Kappa Alpha — Shared Header & Footer (loads from partials or builds inline) */
(function () {
  const SHIELD_SVG = `<svg class="logo-shield" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,4 94,28 94,82 50,108 6,82 6,28" fill="#6B1A2A" stroke="#B8962E" stroke-width="2.2"/>
    <polygon points="50,14 84,34 84,80 50,99 16,80 16,34" fill="none" stroke="rgba(184,150,46,0.25)" stroke-width="1"/>
    <text x="50" y="59" text-anchor="middle" font-family="serif" font-size="20" font-weight="900" fill="#C4952A" letter-spacing="2">ΠΚΑ</text>
    <line x1="50" y1="65" x2="50" y2="87" stroke="#C4952A" stroke-width="1.8"/>
    <polygon points="50,90 46,79 54,79" fill="#C4952A"/>
    <line x1="42" y1="73" x2="58" y2="73" stroke="#C4952A" stroke-width="1.6"/>
  </svg>`;

  const NAV_LINKS = [
    { href: 'index.html',           label: 'Home' },
    { href: 'about.html',           label: 'About' },
    { href: 'events.html',          label: 'Events' },
    { href: 'accomplishments.html', label: 'Accomplishments' },
    { href: 'exec-board.html',      label: 'Exec Board' },
    { href: 'history.html',         label: 'History' },
    { href: 'connect.html',         label: 'Connect' },
  ];

  function buildHeader() {
    const desktopLinks = NAV_LINKS.map(l =>
      `<a class="nav-link" href="${l.href}" data-page="${l.href}">${l.label}</a>`
    ).join('');
    const mobileLinks = NAV_LINKS.map(l =>
      `<a href="${l.href}" data-page="${l.href}">${l.label}</a>`
    ).join('');
    return `
    <div class="topbar">
      <div class="topbar-left">Gamma Epsilon Chapter &nbsp;·&nbsp; Pi Kappa Alpha &nbsp;·&nbsp; Utah State University</div>
      <div class="topbar-right">
        <a href="rush.html">Rush ΠΚΑ</a>
        <span class="topbar-sep">|</span>
        <a href="connect.html">Contact</a>
        <span class="topbar-sep">|</span>
        <a href="https://pikes.org" target="_blank" rel="noopener">National PIKE ↗</a>
      </div>
    </div>
    <header>
      <div class="header-inner">
        <a class="logo" href="index.html">
          ${SHIELD_SVG}
          <div class="logo-text">
            <span class="logo-chapter">Gamma Epsilon Chapter</span>
            <span class="logo-name">Pi Kappa Alpha</span>
            <span class="logo-school">Utah State University</span>
          </div>
        </a>
        <nav class="main-nav" role="navigation" aria-label="Main navigation">
          ${desktopLinks}
          <a class="nav-rush" href="rush.html" data-page="rush.html">Rush PIKE</a>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        ${mobileLinks}
        <a href="rush.html" class="rush-mobile" data-page="rush.html">Rush PIKE →</a>
      </nav>
    </header>`;
  }

  function buildFooter() {
    return `
    <footer>
      <div class="footer-main">
        <div>
          <div class="footer-org">Pi Kappa Alpha</div>
          <div class="footer-chapter">Gamma Epsilon Chapter &nbsp;·&nbsp; Utah State University</div>
          <p class="footer-tagline">Founded on Friendship, Love &amp; Truth. Committed to Scholarship, Leadership, Athletics, and Gentlemanly Conduct since March 1, 1868.</p>
          <div class="footer-socials">
            <a class="footer-social-btn" href="#" target="_blank" aria-label="Instagram">📸</a>
            <a class="footer-social-btn" href="#" target="_blank" aria-label="TikTok">▶</a>
            <a class="footer-social-btn" href="#" target="_blank" aria-label="Twitter">𝕏</a>
            <a class="footer-social-btn" href="#" target="_blank" aria-label="Facebook">👥</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Chapter</h4>
          <a href="about.html">About Us</a>
          <a href="history.html">History</a>
          <a href="exec-board.html">Executive Board</a>
        </div>
        <div class="footer-col">
          <h4>Chapter Life</h4>
          <a href="events.html">Events</a>
          <a href="accomplishments.html">Accomplishments</a>
          <a href="connect.html">Connect</a>
        </div>
        <div class="footer-col">
          <h4>Recruitment</h4>
          <a href="rush.html">Rush PIKE</a>
          <a href="https://pikes.org" target="_blank" rel="noopener">National ΠΚΑ ↗</a>
          <a href="https://usu.edu" target="_blank" rel="noopener">Utah State Univ. ↗</a>
          <a href="https://usu.edu/greek-life" target="_blank" rel="noopener">USU Greek Life ↗</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Gamma Epsilon Chapter · Pi Kappa Alpha · Utah State University · All Rights Reserved</p>
        <p>Friendship · Love · Truth</p>
      </div>
    </footer>`;
  }

  function getBasePath() {
    const script = document.currentScript && document.currentScript.src;
    if (!script) return '';
    const path = new URL(script).pathname;
    const lastSlash = path.lastIndexOf('/');
    const jsSlash = path.lastIndexOf('/js/');
    if (jsSlash !== -1) return path.slice(0, jsSlash + 1);
    if (lastSlash !== -1) return path.slice(0, lastSlash + 1);
    return '';
  }

  function inject(headerTarget, footerTarget, headerHtml, footerHtml) {
    const h = headerHtml != null ? headerHtml : buildHeader();
    const f = footerHtml != null ? footerHtml : buildFooter();
    if (headerTarget) headerTarget.outerHTML = h;
    if (footerTarget) footerTarget.outerHTML = f;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const headerTarget = document.getElementById('site-header');
    const footerTarget = document.getElementById('site-footer');
    const base = getBasePath();
    const headerUrl = base + 'partials/header.html';
    const footerUrl = base + 'partials/footer.html';

    if (!headerTarget && !footerTarget) return;

    Promise.all([
      fetch(headerUrl).then(r => r.ok ? r.text() : Promise.reject()),
      fetch(footerUrl).then(r => r.ok ? r.text() : Promise.reject()),
    ]).then(([headerHtml, footerHtml]) => {
      inject(headerTarget, footerTarget, headerHtml.trim(), footerHtml.trim());
    }).catch(() => {
      inject(headerTarget, footerTarget, null, null);
    });
  });
})();
