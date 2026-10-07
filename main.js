// =====================================================
// KITSU STUDIOS — SCRIPT PRINCIPAL
// =====================================================


// =====================================================
// SCROLL SUAVE
// =====================================================

function setupSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (event) {

            const targetId = this.getAttribute('href');

            // Ignorar enlaces vacíos
            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const navbar = document.querySelector('.navbar');

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Actualizar URL sin provocar salto
            history.pushState(null, '', targetId);

        });

    });

}


// =====================================================
// NAVBAR
// =====================================================

function setupNavbar() {

    const navbar = document.querySelector('.navbar');

    if (!navbar) {
        return;
    }

    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled');

        } else {

            navbar.classList.remove('scrolled');

        }

    }

    window.addEventListener('scroll', updateNavbar, {
        passive: true
    });

    // Estado inicial
    updateNavbar();

}


// =====================================================
// ENLACE ACTIVO DE NAVEGACIÓN
// =====================================================

function setupActiveNavLink() {

    const sections = document.querySelectorAll(
        'main section[id]'
    );

    const navLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    if (!sections.length || !navLinks.length) {
        return;
    }

    function updateActiveLink() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;

        let currentSection = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            const href = link.getAttribute('href');

            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }

        });

    }

    window.addEventListener('scroll', updateActiveLink, {
        passive: true
    });

    window.addEventListener('resize', updateActiveLink);

    updateActiveLink();

}


// =====================================================
// MENÚ MÓVIL
// =====================================================

function setupMobileMenu() {

    const menuButton = document.querySelector(
        '.mobile-menu-button'
    );

    const navMenu = document.querySelector(
        '.nav-menu'
    );

    const navCta = document.querySelector(
        '.nav-cta'
    );

    if (!menuButton || !navMenu) {
        return;
    }

    function toggleMenu() {

        const isOpen =
            menuButton.classList.toggle('active');

        navMenu.classList.toggle(
            'mobile-open',
            isOpen
        );

        if (navCta) {

            navCta.classList.toggle(
                'mobile-open',
                isOpen
            );

        }

        document.body.classList.toggle(
            'menu-open',
            isOpen
        );

        menuButton.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );

    }

    menuButton.addEventListener(
        'click',
        toggleMenu
    );


    // Cerrar el menú al seleccionar una sección

    navMenu.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            menuButton.classList.remove('active');

            navMenu.classList.remove(
                'mobile-open'
            );

            if (navCta) {

                navCta.classList.remove(
                    'mobile-open'
                );

            }

            document.body.classList.remove(
                'menu-open'
            );

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

        });

    });


    // Cerrar al hacer click fuera

    document.addEventListener('click', event => {

        const clickedInsideNavbar =
            event.target.closest('.navbar');

        if (
            !clickedInsideNavbar &&
            navMenu.classList.contains('mobile-open')
        ) {

            menuButton.classList.remove('active');

            navMenu.classList.remove(
                'mobile-open'
            );

            if (navCta) {

                navCta.classList.remove(
                    'mobile-open'
                );

            }

            document.body.classList.remove(
                'menu-open'
            );

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

        }

    });

}


// =====================================================
// ANIMACIONES AL ENTRAR EN PANTALLA
// =====================================================

function setupScrollAnimations() {

    const animatedElements =
        document.querySelectorAll(
            '.feature-card, ' +
            '.course-card, ' +
            '.service-card, ' +
            '.project-card, ' +
            '.social-card, ' +
            '.contact-card, ' +
            '.academy-step'
        );

    if (!animatedElements.length) {
        return;
    }


    // Si el navegador no soporta IntersectionObserver,
    // mostramos todo normalmente.

    if (!('IntersectionObserver' in window)) {

        animatedElements.forEach(element => {
            element.classList.add('visible');
        });

        return;
    }


    const observer = new IntersectionObserver(

        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'visible'
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        }

    );


    animatedElements.forEach((element, index) => {

        // Pequeño retraso progresivo
        // para las tarjetas que aparecen juntas.

        element.style.setProperty(
            '--animation-delay',
            `${(index % 4) * 80}ms`
        );

        observer.observe(element);

    });

}


// =====================================================
// EFECTOS PARA TARJETAS
// =====================================================

function setupCardEffects() {

    const cards = document.querySelectorAll(
        '.feature-card, ' +
        '.course-card, ' +
        '.service-card, ' +
        '.project-card, ' +
        '.social-card, ' +
        '.contact-card'
    );

    if (!cards.length) {
        return;
    }


    cards.forEach(card => {

        card.addEventListener('mouseenter', () => {

            card.classList.add('is-hovered');

        });


        card.addEventListener('mouseleave', () => {

            card.classList.remove('is-hovered');

        });

    });

}


// =====================================================
// EFECTO DE MOVIMIENTO SUTIL EN HERO
// =====================================================

function setupHeroParallax() {

    const heroBackground =
        document.querySelector('.hero-background');

    if (!heroBackground) {
        return;
    }


    // Desactivarlo en dispositivos pequeños

    if (window.innerWidth <= 768) {
        return;
    }


    let ticking = false;


    function updateParallax() {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                const scrollY = window.scrollY;

                if (scrollY < window.innerHeight) {

                    heroBackground.style.transform =
                        `translateY(${scrollY * 0.15}px)`;

                }

                ticking = false;

            });

            ticking = true;

        }

    }


    window.addEventListener(
        'scroll',
        updateParallax,
        { passive: true }
    );

}


// =====================================================
// BOTONES DE CONTACTO
// =====================================================

function setupContactButtons() {

    const contactButtons =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );

    contactButtons.forEach(button => {

        button.addEventListener('click', () => {

            console.log(
                'Contacto iniciado desde Kitsu Studios'
            );

        });

    });

}


// =====================================================
// ESCAPE — CERRAR MENÚ MÓVIL
// =====================================================

function setupKeyboardControls() {

    document.addEventListener(
        'keydown',
        event => {

            if (event.key !== 'Escape') {
                return;
            }

            const menuButton =
                document.querySelector(
                    '.mobile-menu-button'
                );

            const navMenu =
                document.querySelector(
                    '.nav-menu'
                );

            const navCta =
                document.querySelector(
                    '.nav-cta'
                );


            if (
                menuButton &&
                navMenu &&
                navMenu.classList.contains(
                    'mobile-open'
                )
            ) {

                menuButton.classList.remove(
                    'active'
                );

                navMenu.classList.remove(
                    'mobile-open'
                );

                if (navCta) {

                    navCta.classList.remove(
                        'mobile-open'
                    );

                }

                document.body.classList.remove(
                    'menu-open'
                );

                menuButton.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        }
    );

}


// =====================================================
// MANEJO DE RESIZE
// =====================================================

function setupResponsiveAdjustments() {

    let resizeTimer;


    window.addEventListener(
        'resize',
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                // Si volvemos a desktop,
                // cerramos el menú móvil.

                if (window.innerWidth > 768) {

                    const menuButton =
                        document.querySelector(
                            '.mobile-menu-button'
                        );

                    const navMenu =
                        document.querySelector(
                            '.nav-menu'
                        );

                    const navCta =
                        document.querySelector(
                            '.nav-cta'
                        );


                    if (menuButton) {
                        menuButton.classList.remove(
                            'active'
                        );

                        menuButton.setAttribute(
                            'aria-expanded',
                            'false'
                        );
                    }


                    if (navMenu) {

                        navMenu.classList.remove(
                            'mobile-open'
                        );

                    }


                    if (navCta) {

                        navCta.classList.remove(
                            'mobile-open'
                        );

                    }


                    document.body.classList.remove(
                        'menu-open'
                    );

                }

            }, 150);

        }
    );

}


// =====================================================
// INICIALIZAR APLICACIÓN
// =====================================================

function initializeApp() {

    setupSmoothScroll();

    setupNavbar();

    setupActiveNavLink();

    setupMobileMenu();

    setupScrollAnimations();

    setupCardEffects();

    setupHeroParallax();

    setupContactButtons();

    setupKeyboardControls();

    setupResponsiveAdjustments();


    console.log(
        '🦊 KITSU STUDIOS — Web inicializada correctamente.'
    );

}


// =====================================================
// INICIAR CUANDO EL DOM ESTÉ LISTO
// =====================================================

if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        initializeApp
    );

} else {

    initializeApp();

}


// =====================================================
// CONFIRMAR CARGA COMPLETA
// =====================================================

window.addEventListener('load', () => {

    document.body.classList.add(
        'page-loaded'
    );

    console.log(
        '✨ Kitsu Studios cargado correctamente.'
    );

});
