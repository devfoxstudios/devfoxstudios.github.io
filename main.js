// DATOS DEL EQUIPO
const teamData = [
    {
        id: 0,
        name: "MATY DEV",
        role: "CEO & FUNDADOR",
        country: "ARGENTINA",
        skills: ["Diseño de Juegos", "Gestión Creativa", "Desarrollo de Negocio"],
        largeImage: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        panelImage: "Images/Equipo_Panel_Data.png",
        thumbImage: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 1,
        name: "MARÍA CHEN",
        role: "LEAD DEVELOPER",
        country: "ARGENTINA / CHINA",
        skills: ["Programación C#", "Unity Engine", "Arquitectura de Software"],
        largeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        panelImage: "Images/Equipo_Panel_Data.png",
        thumbImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 2,
        name: "SAMUEL KIM",
        role: "ART DIRECTOR",
        country: "COREA DEL SUR",
        skills: ["Modelado 3D", "Concept Art", "Animación de Personajes"],
        largeImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        panelImage: "Images/Equipo_Panel_Data.png",
        thumbImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 3,
        name: "LENA WAGNER",
        role: "SOUND DESIGNER",
        country: "ALEMANIA",
        skills: ["Composición Musical", "Diseño de SFX", "Audio 3D"],
        largeImage: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        panelImage: "Images/Equipo_Panel_Data.png",
        thumbImage: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 4,
        name: "CARLOS MÉNDEZ",
        role: "QA LEAD",
        country: "COLOMBIA",
        skills: ["Testing de Jugabilidad", "Análisis de UX", "Control de Calidad"],
        largeImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        panelImage: "Images/Equipo_Panel_Data.png",
        thumbImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
];

// ELEMENTOS DEL DOM
let selectorItems, verticalCharacterImg, panelImage, panelOverlay;
let currentMemberIndex = 1;
let autoRotateInterval;

// FUNCIÓN PARA ACTUALIZAR LA VISTA DEL EQUIPO
function updateTeamView(index) {
    const member = teamData[index];
    
    // Actualizar imagen vertical izquierda
    verticalCharacterImg.src = member.largeImage;
    verticalCharacterImg.alt = member.name;
    
    // Actualizar imagen del panel derecho
    panelImage.src = member.panelImage;
    panelImage.alt = `Panel ${member.name}`;
    
    // Actualizar información sobrepuesta en el panel
    panelOverlay.innerHTML = `
        <div class="panel-content">
            <div class="panel-name">${member.name}</div>
            <div class="panel-role">${member.role}</div>
            <div class="character-country">
                <span class="country-label">PAÍS</span>
                <div class="country-value">${member.country}</div>
            </div>
            <div class="character-skills">
                <span class="skills-label">HABILIDADES</span>
                <ul class="skills-list">
                    ${member.skills.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Actualizar selector
    selectorItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Animación de transición
    verticalCharacterImg.style.opacity = '0';
    panelImage.style.opacity = '0';
    panelOverlay.style.opacity = '0';
    
    setTimeout(() => {
        verticalCharacterImg.style.opacity = '1';
        panelImage.style.opacity = '1';
        panelOverlay.style.opacity = '1';
    }, 200);
    
    currentMemberIndex = index;
}

// FUNCIÓN PARA CONFIGURAR EVENTOS DEL SELECTOR
function setupSelectorEvents() {
    selectorItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updateTeamView(index);
        });
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// NAVEGACIÓN POR TECLADO
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            const newIndex = currentMemberIndex > 0 ? currentMemberIndex - 1 : teamData.length - 1;
            updateTeamView(newIndex);
        } else if (e.key === 'ArrowRight') {
            const newIndex = currentMemberIndex < teamData.length - 1 ? currentMemberIndex + 1 : 0;
            updateTeamView(newIndex);
        }
    });
}

// CARRUSEL AUTOMÁTICO
function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        const nextIndex = (currentMemberIndex + 1) % teamData.length;
        updateTeamView(nextIndex);
    }, 7000);
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

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

// INICIALIZAR TODO
function initializeApp() {
    // Obtener elementos del DOM
    selectorItems = document.querySelectorAll('.selector-item');
    verticalCharacterImg = document.getElementById('largeCharacter');
    panelImage = document.getElementById('panelImage');
    panelOverlay = document.getElementById('panelOverlay');
    
    // Verificar que los elementos existan
    if (!verticalCharacterImg || !panelImage || !panelOverlay) {
        console.error('No se encontraron elementos del equipo');
        return;
    }
    
    // Configurar eventos del selector
    setupSelectorEvents();
    
    // Configurar navegación por teclado
    setupKeyboardNavigation();
    
    // Configurar scroll suave
    setupSmoothScroll();
    
    // Configurar navegación activa
    setupActiveNavLink();
    
    // Configurar efectos de tarjetas
    setupCardEffects();
    
    // Configurar botón del hero
    setupHeroButton();
    
    // Configurar ajustes responsive
    setupResponsiveAdjustments();
    
    // Inicializar vista del equipo
    updateTeamView(1);
    
    // Iniciar carrusel automático
    startAutoRotate();
    
    // Controlar carrusel con hover
    const equipoSection = document.getElementById('equipo');
    if (equipoSection) {
        equipoSection.addEventListener('mouseenter', stopAutoRotate);
        equipoSection.addEventListener('mouseleave', startAutoRotate);
    }
}

// INICIAR LA APLICACIÓN CUANDO EL DOM ESTÉ LISTO
document.addEventListener('DOMContentLoaded', initializeApp);

// Manejar recargas de la página
window.addEventListener('load', function() {
    console.log('DEV FOX STUDIOS cargado correctamente');
});
