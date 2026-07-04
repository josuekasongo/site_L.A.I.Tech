/* ==========================================================================
   L.A.I. TECH - LOGIQUE INTERACTIVE DU SITE WEB
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. GESTION DE LA BARRE DE NAVIGATION (STICKY & RESPONSIVE)
    // ==========================================
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menuBtn');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header au défilement
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu Mobile
    if (menuBtn && primaryNav) {
        menuBtn.addEventListener('click', () => {
            const isOpened = menuBtn.getAttribute('aria-expanded') === 'true';
            
            if (isOpened) {
                // Fermer le menu
                menuBtn.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('open');
                document.body.style.overflow = '';
            } else {
                // Ouvrir le menu
                menuBtn.setAttribute('aria-expanded', 'true');
                primaryNav.classList.add('open');
                document.body.style.overflow = 'hidden'; // Empêcher le défilement arrière
            }
        });
    }

    // Fermer le menu mobile lors d'un clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNav.classList.contains('open')) {
                menuBtn.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Highlight des liens de navigation lors du scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Ajustement pour le header sticky
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });


    // ==========================================
    // 2. GESTION DES FILTRES DE LA BOUTIQUE
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(button => button.classList.remove('active'));
            // Ajouter la classe active sur le bouton cliqué
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const productCategory = card.getAttribute('data-category');

                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    // Animation d'apparition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else if (productCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Cacher après la transition d'opacité
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });


    // ==========================================
    // 3. FORMULAIRE DE CONTACT & SIMULATION D'ENVOI
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Mettre le bouton en mode chargement
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Cacher les anciens retours
            formFeedback.className = 'form-feedback hidden';

            // Récupérer les données du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simulation d'un envoi AJAX (1.5 seconde de délai)
            setTimeout(() => {
                // Succès de l'envoi simulé
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                formFeedback.textContent = `Merci ${name}, votre message a bien été envoyé ! Notre équipe ou M. Josue Kasongo (PDG) vous contactera très rapidement.`;
                formFeedback.className = 'form-feedback success';
                
                // Réinitialiser le formulaire
                contactForm.reset();

                // Faire disparaître le message de succès après 8 secondes
                setTimeout(() => {
                    formFeedback.className = 'form-feedback hidden';
                }, 8000);

            }, 1500);
        });
    }

    // ==========================================
    // 4. ANIMATION DOUCE DES COMPOSANTS (SUR DES SCROLLS)
    // ==========================================
    // Détection d'intersection pour faire apparaître les cartes avec un effet fade-in
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les cartes d'expertises et les cartes à propos
    const animElements = document.querySelectorAll('.expertise-card, .identity-card, .vision-card, .mission-card, .pdg-card, .product-card');
    
    // Configurer le style initial pour ces éléments via JS (si JS est désactivé, les éléments restent visibles)
    animElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Ajouter un délai progressif pour les grilles
        if (el.classList.contains('expertise-card') || el.classList.contains('product-card')) {
            const delay = (index % 3) * 0.15;
            el.style.transitionDelay = `${delay}s`;
        }

        // Ajouter une classe personnalisée pour animer avec l'observateur
        scrollObserver.observe(el);
    });

    // Définir la classe visible dans une feuille de style dynamique ou l'injecter directement
    const style = document.createElement('style');
    style.innerHTML = `
        .expertise-card.visible, 
        .identity-card.visible, 
        .vision-card.visible, 
        .mission-card.visible, 
        .pdg-card.visible, 
        .product-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

/* ==========================================================================
   HERO BACKGROUND SLIDESHOW
   ========================================================================== */
let currentSlide = 0;
const SLIDE_INTERVAL = 5000; // 5 secondes

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.slide-dot');
    if (!slides.length) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide] && dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide] && dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Auto-advance
if (document.querySelector('.hero-slide')) {
    setInterval(nextSlide, SLIDE_INTERVAL);
}

/* ==========================================================================
   TYPEWRITER EFFECT (HERO)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const typeWriterSpeed = 35; // millisecondes par caractère
    
    // Fonction utilitaire pour taper du texte
    async function typeText(element, text) {
        element.innerHTML = '';
        element.appendChild(document.createTextNode(''));
        
        // Ajout du curseur
        const cursor = document.createElement('span');
        cursor.className = 'tw-cursor';
        element.parentNode.insertBefore(cursor, element.nextSibling);
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(r => setTimeout(r, typeWriterSpeed));
        }
        
        // Retirer le curseur après avoir fini si désiré, ou le garder.
        cursor.remove();
    }

    async function runTypewriter() {
        const titleEl = document.querySelector('.hero-title');
        const subtitleEl = document.querySelector('.hero-subtitle');
        const descEl = document.querySelector('.hero-description');

        if (!titleEl) return; // pas sur la page d'accueil

        // Pour le titre, il a deux parties (avec un <br> au milieu)
        const titlePart1 = titleEl.querySelector('.tw-part-1');
        const titlePart2 = titleEl.querySelector('.tw-part-2');
        const t1Text = titleEl.getAttribute('data-text-1');
        const t2Text = titleEl.getAttribute('data-text-2');

        const subText = subtitleEl.getAttribute('data-text');
        const descText = descEl.getAttribute('data-text');

        // On crée un curseur principal qu'on va déplacer
        const cursor = document.createElement('span');
        cursor.className = 'tw-cursor';

        // 1. Taper le titre (partie 1)
        titlePart1.parentNode.insertBefore(cursor, titlePart1.nextSibling);
        for(let i=0; i<t1Text.length; i++) {
            titlePart1.textContent += t1Text.charAt(i);
            await new Promise(r => setTimeout(r, typeWriterSpeed));
        }

        // 2. Déplacer curseur et taper titre (partie 2)
        titlePart2.parentNode.insertBefore(cursor, titlePart2.nextSibling);
        for(let i=0; i<t2Text.length; i++) {
            titlePart2.textContent += t2Text.charAt(i);
            await new Promise(r => setTimeout(r, typeWriterSpeed));
        }
        
        await new Promise(r => setTimeout(r, 400)); // petite pause

        // 3. Sous-titre
        subtitleEl.parentNode.insertBefore(cursor, subtitleEl.nextSibling);
        for(let i=0; i<subText.length; i++) {
            subtitleEl.textContent += subText.charAt(i);
            await new Promise(r => setTimeout(r, typeWriterSpeed));
        }
        
        await new Promise(r => setTimeout(r, 400)); // petite pause

        // 4. Description
        descEl.parentNode.insertBefore(cursor, descEl.nextSibling);
        for(let i=0; i<descText.length; i++) {
            descEl.textContent += descText.charAt(i);
            await new Promise(r => setTimeout(r, 15)); // un peu plus vite pour la description
        }
        
        // Le curseur reste à la fin
    }

    // Lancer après un petit délai
    setTimeout(runTypewriter, 500);
});
