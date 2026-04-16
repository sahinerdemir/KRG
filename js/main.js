// ===== SMOOTH SCROLL (Lenis) =====
let lenis = null;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.Lenis && !prefersReduced) {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

// ===== NAV SCROLL =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 50);
  lastScroll = y;
}, { passive: true });

// ===== MOBILE MENU =====
const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ===== CUSTOM CURSOR =====
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.matchMedia('(min-width: 901px)').matches) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  const hoverables = 'a, button, .service-card, .industry-row, .trophy-card, .partner, .about-founder, .contact-method, .stat';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// ===== REVEAL ON SCROLL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-row').forEach(el => {
  observer.observe(el);
});

// Hero line animation on load
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-line').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});

// ===== STAT COUNTERS =====
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toString();
  };
  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target.querySelector('.stat-number');
      if (num && !num.dataset.done) {
        num.dataset.done = '1';
        animateCount(num);
      }
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat').forEach(s => statsObserver.observe(s));

// ===== PARALLAX ORBS =====
const orbs = document.querySelectorAll('.gradient-orb');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.15;
    orb.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

// ===== YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== SMOOTH ANCHOR OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length <= 1) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    if (lenis) {
      lenis.scrollTo(target, { offset: -offset, duration: 1.4 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (nav.classList.contains('open')) nav.classList.remove('open');
  });
});
