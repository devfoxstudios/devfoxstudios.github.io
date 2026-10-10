/* KITSU STUDIOS — interacciones del sitio */
(() => {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const menuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const closeMenu = () => {
    if (!menuButton || !navMenu) return;
    menuButton.classList.remove('active');
    navMenu.classList.remove('mobile-open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = !navMenu.classList.contains('mobile-open');
      navMenu.classList.toggle('mobile-open', isOpen);
      menuButton.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
      if (navMenu.classList.contains('mobile-open') &&
          !event.target.closest('.navbar')) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Estado visual del encabezado al desplazarse.
  const updateNavbar = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Enlaces de navegación activos según la sección visible.
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.15, 0.4] });
    sections.forEach(section => observer.observe(section));
  }

  // Animación progresiva, con contenido visible como fallback.
  const animated = document.querySelectorAll('.service-card, .project-card, .why-item');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animated.forEach(el => el.classList.add('will-animate'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    animated.forEach(el => revealObserver.observe(el));
  }

  // Evita que el menú móvil quede abierto al pasar a escritorio.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  }, { passive: true });

  // Ayuda para revisar la carga durante el desarrollo.
  document.documentElement.classList.add('js-ready');
})();
