const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  mobileNav.hidden = true;
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  mobileNav.hidden = isOpen;
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 800) closeMenu();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealItems = document.querySelectorAll(
    '.intro .section-index, .intro-main, .section-heading-row, .project-card, ' +
    '.details-heading, .detail-card, .manifesto-photo, .manifesto-copy, ' +
    '.services-intro, .service-item, .process > .container > .section-index, ' +
    '.process-heading, .step, .contact-top, .contact h2, .contact-bottom'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  revealItems.forEach((item) => {
    if (item.matches('.detail-card, .step')) {
      const siblings = [...item.parentElement.children];
      item.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(item), 3) * 90}ms`);
    }
    item.classList.add('reveal');
    observer.observe(item);
  });

  document.documentElement.classList.add('motion-ready');
}
