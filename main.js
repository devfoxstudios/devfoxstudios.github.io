// SCROLL SUAVE
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
}

// RESALTAR ENLACE ACTIVO
function setupActiveNavLink() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if(window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if(link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Inicializar enlace activo
    window.addEventListener('DOMContentLoaded', function() {
        const inicioLink = document.querySelector('.nav-menu a[href="#inicio"]');
        if(inicioLink && window.scrollY < 100) {
            inicioLink.classList.add('active');
        }
    });
}

// EFECTOS PARA TARJETAS
function setupCardEffects() {
    const enhancedCards = document.querySelectorAll('.enhanced-card');
    
    enhancedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

// BOTÓN DEL HERO
function setupHeroButton() {
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector('#portfolio');
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, '#portfolio');
            }
        });
    }
}

// AJUSTES RESPONSIVE
function setupResponsiveAdjustments() {
    window.addEventListener('resize', function() {
        const cardsContainers = document.querySelectorAll('.cards-container');
        
        cardsContainers.forEach(container => {
            if(window.innerWidth <= 768) {
                container.style.gap = '20px';
            } else {
                container.style.gap = '40px';
            }
        });
    });
}

// INICIALIZAR APLICACIÓN
function initializeApp() {
    setupSmoothScroll();
    setupActiveNavLink();
    setupCardEffects();
    setupHeroButton();
    setupResponsiveAdjustments();
    
    console.log('DEV FOX STUDIOS inicializado');
}

// INICIAR CUANDO EL DOM ESTÉ LISTO
document.addEventListener('DOMContentLoaded', initializeApp);

// CONFIRMAR CARGA
window.addEventListener('load', function() {
    console.log('DEV FOX STUDIOS cargado correctamente');
});
