/* Pi Kappa Alpha — Gamma Epsilon | Shared JS */
(function () {
  'use strict';

  /* Active nav */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === page) el.classList.add('active');
  });

  /* Scroll shadow */
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Hamburger */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-nav');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      const open = mob.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
      const [s1,,s3] = ham.querySelectorAll('span');
      const s2 = ham.querySelectorAll('span')[1];
      if (open) {
        s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        s2.style.opacity = '0';
        s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.setAttribute('aria-expanded', false);
      ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }));
  }

  /* Scroll fade-in */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
})();
