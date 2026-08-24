// Reveal on scroll, applied at section/block level and not on every child node.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Theme toggle: light by default, dark on request. Preference saved in
// localStorage, the inline script in <head> applies it before first paint
// so the page never flashes the wrong theme.
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function syncToggleLabel() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (themeToggle) {
    themeToggle.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

if (themeToggle) {
  syncToggleLabel();
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', next);
    syncToggleLabel();
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form: no backend is wired up yet, so this opens the visitor's
// mail client with the message pre-filled instead of silently failing.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    const subject = encodeURIComponent(`Contact portfolio, message de ${name}`);
    const body = encodeURIComponent(`${message}\n\nEnvoyé par ${name} (${email})`);
    window.location.href = `mailto:tyldenhounsa@gmail.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = 'Ton client mail va s\'ouvrir avec le message prérempli.';
      formNote.classList.add('active');
    }
  });

  // Theme toggle: light by default, dark on request. Preference saved in
  // localStorage, the inline script in <head> applies it before first paint
  // so the page never flashes the wrong theme.
  (function () {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
  })();
}
