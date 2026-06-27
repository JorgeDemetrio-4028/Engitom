/* ══════════════════════════════════════════
   ENGITOM – main.js
   ══════════════════════════════════════════ */

// ── Header: sombra ao fazer scroll ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Fade-in ao fazer scroll ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade').forEach(el => fadeObserver.observe(el));

// ── Nav: destaca o link da secção ativa ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--brand-accent)' : '';
  });
});

// ── Projetos: filtros de galeria ──
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

const showCategory = (category) => {
  galleryItems.forEach(item => {
    const isVisible = category === 'all' || item.dataset.category === category;
    item.style.display = isVisible ? '' : 'none';
  });
};

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    showCategory(button.dataset.filter);
  });
});

showCategory('all');

// ── Lightbox de projetos ──
const lightbox = document.querySelector('.project-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentItem = null;

const getVisibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

const openLightbox = (item) => {
  const image = item.querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = item.dataset.caption || image.alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  currentItem = item;
};

const closeLightbox = () => {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  currentItem = null;
};

const showLightboxItem = (direction) => {
  const visibleItems = getVisibleItems();
  if (!visibleItems.length || !currentItem) return;

  const currentIndex = visibleItems.indexOf(currentItem);
  let nextIndex = direction === 'next'
    ? currentIndex + 1
    : currentIndex - 1;

  if (nextIndex < 0) nextIndex = visibleItems.length - 1;
  if (nextIndex >= visibleItems.length) nextIndex = 0;

  openLightbox(visibleItems[nextIndex]);
};

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showLightboxItem('prev'));
lightboxNext.addEventListener('click', () => showLightboxItem('next'));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('active')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showLightboxItem('prev');
  if (event.key === 'ArrowRight') showLightboxItem('next');
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'A enviar...';
    btn.disabled = true;
    const FORMSPREE_URL = 'https://formspree.io/f/SEU_ID_AQUI';
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      btn.textContent = res.ok ? 'Mensagem enviada!' : 'Erro — tenta novamente';
      if (res.ok) contactForm.reset();
      else btn.disabled = false;
    } catch {
      btn.textContent = 'Erro — tenta novamente';
      btn.disabled = false;
    }
  });
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


