const sharedHeader = `
<nav class="navbar">
  <div class="container nav-inner">
    <a href="index.html" class="logo">
      <span>CalEye</span>
    </a>

    <button class="hamburger" aria-label="Toggle navigation menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="features.html">Features</a></li>
      <li><a href="how-it-works.html">How It Works</a></li>
    </ul>

    <div class="nav-cta">
      <a href="index.html" class="btn btn--primary btn--small">Download Free</a>
    </div>
  </div>
</nav>

<div class="nav-menu">
  <ul class="nav-menu-items">
    <li><a href="index.html">Home</a></li>
    <li><a href="features.html">Features</a></li>
    <li><a href="how-it-works.html">How It Works</a></li>
    <li><a href="contact.html">Support</a></li>
  </ul>
</div>`;

function getDownloadButtonsHTML(containerClass = "", showLabel = false, labelText = "&#10003; Available now") {
  const normalizedClass = containerClass ? ` ${containerClass}` : "";

  return `
<div class="download-buttons${normalizedClass}">
  <a href="https://play.google.com/store/apps/details?id=com.caleye.caloriescounter" class="store-btn store-btn--google" aria-label="Get it on Google Play">
    <img src="./images/download-button/Store=Google Play, Type=Light, Language=English@2x.png" alt="Get it on Google Play">
  </a>
  <div class="store-btn-wrapper">
    <a href="#" class="store-btn store-btn--apple" style="pointer-events: none; opacity: 0.55;" aria-label="Download on App Store (coming soon)">
      <img src="./images/download-button/Store=App Store, Type=Light, Language=English@2x.png" alt="Download on App Store">
    </a>
    <div class="coming-soon-chip">Coming Soon</div>
  </div>
</div>
${showLabel ? `<p class="cta-label">${labelText}</p>` : ""}`;
}

const sharedFooter = `
<footer>
  <div class="container">
    <div class="footer-content">
      <div>
        <p class="footer-title">CalEye</p>
        <p class="footer-tagline">AI-powered nutrition tracking for everyone</p>
        <div data-download-buttons class="footer-downloads"></div>
      </div>
      <div class="footer-links">
        <a href="index.html" class="footer-link">Home</a>
        <a href="features.html" class="footer-link">Features</a>
        <a href="how-it-works.html" class="footer-link">How It Works</a>
        <a href="privacy.html" class="footer-link">Privacy Policy</a>
        <a href="contact.html" class="footer-link">Contact</a>
        <a href="terms.html" class="footer-link">Terms of Service</a>
      </div>
    </div>
    <p class="footer-bottom">&copy; 2026 CalEye. All rights reserved.</p>
  </div>
</footer>`;

function loadComponents() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = sharedHeader;
  }

  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = sharedFooter;
  }

  document.querySelectorAll("[data-download-buttons]").forEach((placeholder) => {
    const classNames = placeholder.className ? placeholder.className.trim() : "";
    const showLabel = placeholder.dataset.showLabel === "true";
    const labelText = placeholder.dataset.label || "&#10003; Available now";
    placeholder.outerHTML = getDownloadButtonsHTML(classNames, showLabel, labelText);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
