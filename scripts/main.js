/* =======================================
   CALEYE - MAIN JAVASCRIPT
   ======================================= */

// ========================================
// NAVBAR SCROLL DETECTION
// ========================================

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function setMobileMenuState(isOpen) {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.classList.toggle('active', isOpen);
  navMenu.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

document.addEventListener('click', (e) => {
  const hamburger = e.target.closest('.hamburger');
  const navLink = e.target.closest('.nav-menu-items a');

  if (hamburger) {
    const isOpen = !hamburger.classList.contains('active');
    setMobileMenuState(isOpen);
    return;
  }

  if (navLink) {
    setMobileMenuState(false);
    return;
  }

  if (!e.target.closest('.navbar') && !e.target.closest('.nav-menu')) {
    setMobileMenuState(false);
  }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-up, fade-left, fade-right elements
document.querySelectorAll('.fade-up, .fade-left, .fade-right, .stagger-item').forEach(el => {
  observer.observe(el);
});

// ========================================
// DISABLED BUTTON TOOLTIP
// ========================================

const disabledStoreBtn = document.querySelector('.store-btn--apple[disabled]');
if (disabledStoreBtn) {
  // Show tooltip hint
  const existingTooltip = disabledStoreBtn.nextElementSibling;
  if (!existingTooltip || !existingTooltip.classList.contains('tooltip')) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'iOS version launching soon!';
    disabledStoreBtn.parentElement.appendChild(tooltip);
  }
}

// ========================================
// COUNTER ANIMATION (OPTIONAL - for stats)
// ========================================

function animateCounter(element, target, duration = 2000) {
  const start = Date.now();
  const initial = parseInt(element.textContent);

  const timer = setInterval(() => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(initial + (target - initial) * progress);
    element.textContent = current.toLocaleString();

    if (progress === 1) {
      clearInterval(timer);
    }
  }, 50);
}

// ========================================
// UTILITY: GET CURRENT BREAKPOINT
// ========================================

function getCurrentBreakpoint() {
  const width = window.innerWidth;
  if (width < 480) return 'mobile';
  if (width < 768) return 'tablet-sm';
  if (width < 1024) return 'tablet';
  if (width < 1280) return 'desktop';
  return 'desktop-lg';
}

// ========================================
// RESIZE EVENT HANDLER
// ========================================

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle any resize-specific logic
  }, 250);
});

// ========================================
// LAZY LOAD IMAGES (fallback for older browsers)
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// ANALYTICS TRACKING (Placeholder)
// ========================================

// Track button clicks (integrate with your analytics service)
function trackEvent(category, action, label) {
  if (window.gtag) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  // Fallback console logging
  console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track store button clicks
document.querySelectorAll('.store-btn, .btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const text = btn.textContent.trim();
    trackEvent('engagement', 'button_click', text);
  });
});

// ========================================
// UTILITY: TOGGLE DARK MODE (Optional)
// ========================================

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
const darkModePreference = localStorage.getItem('darkMode') === 'true';
if (darkModePreference) {
  document.documentElement.classList.add('dark-mode');
}

// ========================================
// DEVICE DETECTION
// ========================================

const deviceDetection = {
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: /Android/.test(navigator.userAgent),
  isDesktop: !(/iPad|iPhone|iPod|Android/.test(navigator.userAgent)),

  show(platform) {
    const elements = document.querySelectorAll(`[data-show-on="${platform}"]`);
    elements.forEach(el => el.style.display = '');

    const hideElements = document.querySelectorAll(`[data-hide-on="${platform}"]`);
    hideElements.forEach(el => el.style.display = 'none');
  },

  init() {
    if (this.isIOS) this.show('ios');
    else if (this.isAndroid) this.show('android');
    else if (this.isDesktop) this.show('desktop');
  }
};

deviceDetection.init();

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('CalEye Marketing Site Loaded');

  // Any initialization code here
  // Initialize tooltips, modals, etc.
});

// ========================================
// FORM HANDLING (Example for future use)
// ========================================

function handleFormSubmit(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        form.reset();
        // Show success message
        const successMsg = form.querySelector('.success-message');
        if (successMsg) successMsg.style.display = 'block';
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  });
}

// Auto-initialize contact forms
document.querySelectorAll('form[data-type="contact"]').forEach(form => {
  handleFormSubmit(form);
});
