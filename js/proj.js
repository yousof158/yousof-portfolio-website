// ── 1. Bilingual Toggle (EN / AR) ──
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  const isAr = currentLang === 'ar';

  document.documentElement.dir  = isAr ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  document.body.className = isAr ? 'font-ar dark-theme' : 'font-en dark-theme';

  const btn = document.querySelector('.lang-text');
  if (btn) btn.textContent = isAr ? 'EN' : 'العربية';

  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-${currentLang}`);
  });
}

// ── 2. High-Performance Cursor (translate3d, no outline, no lag) ──
const cursorDot = document.querySelector('.cursor-dot');

if (cursorDot) {
  window.addEventListener('mousemove', e => {
    // Instant GPU-accelerated positioning — zero lag
    cursorDot.style.transform =
      `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  // Expand to 40px translucent cyan on hover
  document.querySelectorAll('a, button, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
  });
}

// ── 3. Mobile Hamburger Menu ──
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ── 4. 3D Tilt Effect on Cards ──
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });

  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -8;
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * 8;
    card.style.transform =
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .5s ease';
    card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  });
});

// ── 5. Scroll Reveal with Stagger ──
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stagger children cards inside sections
document.querySelectorAll('.cards-grid, .honors-grid, .certs-grid, .leadership-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.09}s`;
  });
});

// ── 6. Smooth Navbar Scroll Highlight ──
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--cyan)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
