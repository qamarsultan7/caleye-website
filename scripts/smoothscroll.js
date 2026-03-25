/* =======================================
   CALEYE - SMOOTH SCROLL & ANIMATIONS
   ======================================= */

// ========================================
// ENHANCED SCROLL ANIMATIONS
// ========================================

class ScrollAnimationManager {
  constructor(options = {}) {
    this.elements = [];
    this.activeAnimations = new Map();
    this.options = {
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      threshold: options.threshold || 0.1,
      ...options
    };

    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const animationClass = element.dataset.animation;

        if (entry.isIntersecting) {
          this.playAnimation(element, animationClass);
        }
      });
    }, this.options);
  }

  observeElements() {
    // Observe all elements with data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(el => {
      this.observer.observe(el);
    });

    // Also observe standard animation classes
    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .stagger-item').forEach(el => {
      this.observer.observe(el);
    });
  }

  playAnimation(element, animationClass) {
    // Skip if already animated
    if (element.classList.contains('visible')) return;

    // Add visible class to trigger CSS animation
    element.classList.add('visible');

    // Fire custom event
    element.dispatchEvent(new CustomEvent('animationStarted', {
      detail: { animation: animationClass }
    }));

    // Stop observing this element
    this.observer.unobserve(element);
  }

  observe(element) {
    this.observer.observe(element);
  }

  unobserve(element) {
    this.observer.unobserve(element);
  }

  destroy() {
    this.observer.disconnect();
  }
}

// Initialize on page load
let scrollAnimationManager;
document.addEventListener('DOMContentLoaded', () => {
  scrollAnimationManager = new ScrollAnimationManager({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
});

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

class ParallaxEffect {
  constructor(selector, speed = 0.5) {
    this.elements = document.querySelectorAll(selector);
    this.speed = speed;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.update());
  }

  update() {
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = viewportCenter - elementCenter;

      if (Math.abs(distance) < window.innerHeight) {
        const translateY = distance * this.speed;
        element.style.transform = `translateY(${translateY}px)`;
      }
    });
  }

  destroy() {
    window.removeEventListener('scroll', () => this.update());
  }
}

// ========================================
// STAGGER ANIMATION HELPER
// ========================================

class StaggerAnimation {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    this.items = this.container?.querySelectorAll('[data-stagger-item]') || [];
    this.delay = options.delay || 100;
    this.duration = options.duration || 600;
    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      item.style.setProperty('--stagger-delay', `${index * this.delay}ms`);
      item.style.setProperty('--animation-duration', `${this.duration}ms`);
    });
  }

  observe() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stagger-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.items.forEach(item => observer.observe(item));
  }
}

// ========================================
// TEXT REVEAL ANIMATION
// ========================================

class TextReveal {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = text
        .split('')
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      this.animateChars(element.querySelectorAll('.char'));
    });
  }

  animateChars(chars) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((char, index) => {
              char.style.setProperty('--char-index', index);
              char.classList.add('reveal');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(chars[0].closest('.text-reveal'));
  }
}

// ========================================
// COUNTING ANIMATION
// ========================================

class CountingAnimation {
  constructor(selector, options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.duration = options.duration || 2000;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.elements.forEach(el => observer.observe(el));
  }

  animate(element) {
    const target = parseInt(element.dataset.target) || parseInt(element.textContent);
    const suffix = element.dataset.suffix || '';
    const start = new Date().getTime();

    const timer = setInterval(() => {
      const elapsed = new Date().getTime() - start;
      const progress = Math.min(elapsed / this.duration, 1);
      const current = Math.floor(target * progress);

      element.textContent = current.toLocaleString() + suffix;

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 50);
  }
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

class ScrollToTop {
  constructor(selector) {
    this.button = document.querySelector(selector);
    if (!this.button) return;

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    if (window.scrollY > 300) {
      this.button?.classList.add('visible');
    } else {
      this.button?.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ========================================
// PROGRESS BAR
// ========================================

class ProgressBar {
  constructor(selector) {
    this.bar = document.querySelector(selector);
    if (!this.bar) return;

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.update());
  }

  update() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    this.bar.style.width = scrolled + '%';
  }
}

// ========================================
// SCROLL LOCK (for modals, etc)
// ========================================

const ScrollLock = {
  lock() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
  },

  unlock() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
};

// ========================================
// VIEWPORT DETECTION
// ========================================

class ViewportDetector {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;
    this.isTablet = this.width >= 768 && this.width < 1024;
    this.isDesktop = this.width >= 1024;

    window.addEventListener('resize', () => this.update());
  }

  update() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;
    this.isTablet = this.width >= 768 && this.width < 1024;
    this.isDesktop = this.width >= 1024;

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('viewportChanged', {
      detail: {
        width: this.width,
        height: this.height,
        isMobile: this.isMobile,
        isTablet: this.isTablet,
        isDesktop: this.isDesktop
      }
    }));
  }

  getBreakpoint() {
    if (this.isMobile) return 'mobile';
    if (this.isTablet) return 'tablet';
    return 'desktop';
  }
}

// Initialize viewport detector
const viewportDetector = new ViewportDetector();

// ========================================
// EXPORT OR USE GLOBALLY
// ========================================

window.ScrollAnimationManager = ScrollAnimationManager;
window.ParallaxEffect = ParallaxEffect;
window.StaggerAnimation = StaggerAnimation;
window.TextReveal = TextReveal;
window.CountingAnimation = CountingAnimation;
window.ScrollToTop = ScrollToTop;
window.ProgressBar = ProgressBar;
window.ScrollLock = ScrollLock;
window.ViewportDetector = ViewportDetector;
window.viewportDetector = viewportDetector;

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Ready state check
function onReady(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

// Export utilities
window.debounce = debounce;
window.throttle = throttle;
window.onReady = onReady;
