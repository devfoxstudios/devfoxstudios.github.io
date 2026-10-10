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

   // Carrusel automático de los servicios principales.
  const heroCarousel = document.querySelector('.hero-carousel');

  if (heroCarousel) {
    const slides = [...heroCarousel.querySelectorAll('.hero-slide')];
    const dots = [...heroCarousel.querySelectorAll('.hero-dot')];
    const prevButton = heroCarousel.querySelector('.hero-prev');
    const nextButton = heroCarousel.querySelector('.hero-next');
    const counter = heroCarousel.querySelector('.hero-counter');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const INTERVAL = 6000;
    let current = 0;
    let timer = null;
    let paused = false;

    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        const active = i === current;

        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
      });

      dots.forEach((dot, i) => {
        const active = i === current;

        dot.classList.toggle('is-active', active);

        if (active) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });

      if (counter) {
        counter.textContent =
          `${String(current + 1).padStart(2, '0')} / ` +
          `${String(slides.length).padStart(2, '0')}`;
      }
    };

    const stopTimer = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };

    const startTimer = () => {
      stopTimer();

      if (
        paused ||
        reduceMotion.matches ||
        document.hidden ||
        slides.length < 2
      ) return;

      timer = setInterval(() => {
        showSlide(current + 1);
      }, INTERVAL);
    };

    const goTo = (index) => {
      showSlide(index);
      startTimer();
    };

    if (slides.length) {
      showSlide(0);
      startTimer();
    }

    prevButton?.addEventListener('click', () => {
      goTo(current - 1);
    });

    nextButton?.addEventListener('click', () => {
      goTo(current + 1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goTo(index));
    });

    heroCarousel.addEventListener('mouseenter', () => {
      paused = true;
      stopTimer();
    });

    heroCarousel.addEventListener('mouseleave', () => {
      paused = false;
      startTimer();
    });

    heroCarousel.addEventListener('focusin', () => {
      paused = true;
      stopTimer();
    });

    heroCarousel.addEventListener('focusout', (event) => {
      if (!heroCarousel.contains(event.relatedTarget)) {
        paused = false;
        startTimer();
      }
    });

    document.addEventListener('visibilitychange', startTimer);

    reduceMotion.addEventListener?.('change', startTimer);
  }

  // Ayuda para revisar la carga durante el desarrollo.
  document.documentElement.classList.add('js-ready');
})();
