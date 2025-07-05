// Main Application Controller
class CyberpunkPortfolio {
    constructor() {
        // Initialize all components
        this.initTypedJS();
        this.initEmailJS();
        this.initParticlesJS();
        this.initGSAPAnimations();
        this.initModals();
        this.initGallery();
        this.initSoundSystem();
        this.initScrollEffects();
        this.initMobileMenu();
        this.initBackToTop();
        this.initHoverEffects();
        this.initFormValidation();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Mark as initialized
        this.initialized = true;
        
        console.log('Cyberpunk Portfolio initialized!');
    }
    
    initTypedJS() {
        this.typed = new Typed('#typed-text', {
            strings: [
                "TECH_ENthusiast",
                "PROBLEM_SOLVER",
                "AI_DEVELOPER",
                "CREATIVE_CODER",
                "GAMER_🎮"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: false,
            onStringTyped: () => {
                this.playSound('terminal-typing.wav', 0.2);
            }
        });
    }
    
    initEmailJS() {
        emailjs.init('AX9ZtVpZPmydtAaFI');
        
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const submitText = submitBtn.querySelector('#submit-text');
                const spinner = submitBtn.querySelector('#loading-spinner');
                const checkmark = submitBtn.querySelector('#success-check');
                
                // Show loading state
                submitText.style.display = 'none';
                spinner.style.display = 'block';
                checkmark.style.display = 'none';
                
                emailjs.sendForm('ryoscoid', 'template_jai0z9m', contactForm)
                    .then(() => {
                        // Success state
                        spinner.style.display = 'none';
                        checkmark.style.display = 'block';
                        this.playSound('success-chime.mp3');
                        
                        setTimeout(() => {
                            checkmark.style.display = 'none';
                            submitText.style.display = 'inline';
                            contactForm.reset();
                            
                            // Close modal if in modal
                            const modal = contactForm.closest('.modal');
                            if (modal) {
                                this.closeModal(modal);
                            }
                        }, 2000);
                    }, (error) => {
                        console.error('Failed:', error);
                        spinner.style.display = 'none';
                        submitText.style.display = 'inline';
                        alert('Message failed to send. Please try again.');
                    });
            });
        }
    }
    
    initParticlesJS() {
        particlesJS('neon-particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#ff9ff3", "#48dbfb", "#feca57"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    initGSAPAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('.section').forEach((section, i) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });
        
        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1)"
            });
        });
        
        // Animate skill bars on scroll
        document.querySelectorAll('.cyber-skill-card').forEach((card, i) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top 80%",
                onEnter: () => {
                    const percent = card.querySelector('.skill-percent').getAttribute('data-target');
                    const progressBar = card.querySelector('.skill-progress');
                    
                    gsap.to(progressBar, {
                        width: `${percent}%`,
                        duration: 1.5,
                        ease: "power3.out",
                        onStart: () => {
                            this.playSound('power-up.wav', 0.2);
                            
                            // Animate the percentage counter
                            let currentPercent = 0;
                            const targetPercent = parseInt(percent);
                            const increment = targetPercent / 50;
                            
                            const counter = card.querySelector('.skill-percent');
                            
                            const animateCounter = () => {
                                if (currentPercent < targetPercent) {
                                    currentPercent += increment;
                                    counter.textContent = Math.round(currentPercent) + '%';
                                    requestAnimationFrame(animateCounter);
                                } else {
                                    counter.textContent = targetPercent + '%';
                                }
                            };
                            
                            animateCounter();
                        }
                    });
                }
            });
        });
        
        // Animate language bubbles
        const languageBubbles = document.querySelectorAll('.language-bubbles .bubble');
        languageBubbles.forEach(bubble => {
            ScrollTrigger.create({
                trigger: bubble,
                start: "top 80%",
                onEnter: () => {
                    gsap.from(bubble, {
                        scale: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        delay: 0.1 * Array.from(languageBubbles).indexOf(bubble)
                    });
                }
            });
        });
    }
    
    initModals() {
        this.modals = {
            contact: document.getElementById('contact-modal'),
            gallery: document.getElementById('gallery-modal'),
            details: document.getElementById('details-modal'),
            mobileContact: document.getElementById('mobile-contact-modal')
        };
        
        // Close modals when clicking outside content
        Object.values(this.modals).forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
        });
        
        // Close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });
        
        // Contact buttons
        document.querySelectorAll('[data-modal="contact"]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.openModal(this.modals.contact);
            });
        });
    }
    
    openModal(modal) {
        if (!modal) return;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        document.body.style.overflow = 'hidden';
        this.playSound('modal-open.wav');
    }
    
    closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        document.body.style.overflow = '';
        this.playSound('click-futuristic.mp3');
    }
    
    initGallery() {
        this.gallery = {
            currentProject: null,
            currentIndex: 0,
            images: []
        };
        
        // Set up gallery buttons
        const viewGalleryBtns = document.querySelectorAll('.view-gallery');
        viewGalleryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectCard = e.target.closest('.project-card');
                const projectName = projectCard.dataset.project;
                this.openGallery(projectName);
            });
        });
        
        // Navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.navigateGallery(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.navigateGallery(1);
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modals.gallery.classList.contains('show')) {
                if (e.key === 'ArrowLeft') {
                    this.navigateGallery(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateGallery(1);
                } else if (e.key === 'Escape') {
                    this.closeModal(this.modals.gallery);
                }
            }
        });
    }
    
    openGallery(projectName) {
        this.gallery.currentProject = projectName;
        this.gallery.currentIndex = 0;
        
        // Load images based on project
        switch (projectName) {
            case 'memory':
                this.gallery.images = [
                    './assets/images/projects/memory game/memory1.jpeg',
                    './assets/images/projects/memory game/memory2.jpeg',
                    './assets/images/projects/memory game/memory3.jpeg',
                    './assets/images/projects/memory game/memory4.jpeg',
                    './assets/images/projects/memory game/memory5.jpeg',
                    './assets/images/projects/memory game/memory6.jpeg',
                    './assets/images/projects/memory game/memory7.jpeg'
                ];
                break;
            case 'maths':
                this.gallery.images = [
                    './assets/images/projects/maths game/pyramid_equation1.png',
                    './assets/images/projects/maths game/pyramid_equation2.png',
                    './assets/images/projects/maths game/pyramid_equation3.png'
                ];
                break;
            default:
                return;
        }
        
        // Update modal title
        const titleMap = {
            'memory': 'MEMORY_GAME_GALLERY',
            'maths': 'MATHS_PYRAMID_GALLERY'
        };
        document.getElementById('gallery-title').textContent = titleMap[projectName] || 'PROJECT_GALLERY';
        
        // Update pagination
        document.getElementById('total-slides').textContent = this.gallery.images.length;
        
        // Show first image
        this.showGalleryImage(0);
        
        // Generate thumbnails
        this.generateThumbnails();
        
        // Open modal
        this.openModal(this.modals.gallery);
    }
    
    showGalleryImage(index) {
        if (index < 0 || index >= this.gallery.images.length) return;
        
        this.gallery.currentIndex = index;
        const image = document.querySelector('.gallery-image');
        image.src = this.gallery.images[index];
        
        // Update pagination
        document.getElementById('current-slide').textContent = index + 1;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    navigateGallery(direction) {
        const newIndex = this.gallery.currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.gallery.images.length) {
            this.showGalleryImage(newIndex);
            this.playSound('hover-soft.mp3');
        } else {
            // Optional: loop around
            // this.showGalleryImage(direction > 0 ? 0 : this.gallery.images.length - 1);
        }
    }
    
    generateThumbnails() {
        const container = document.querySelector('.gallery-thumbnails');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.gallery.images.forEach((imgSrc, i) => {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${i === this.gallery.currentIndex ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${i + 1}">`;
            
            thumb.addEventListener('click', () => {
                this.showGalleryImage(i);
                this.playSound('click-futuristic.mp3');
            });
            
            container.appendChild(thumb);
        });
    }
    
    initSoundSystem() {
        this.audioElements = {
            hover: document.getElementById('hover-sound'),
            click: document.getElementById('click-sound'),
            modal: document.getElementById('modal-sound'),
            success: document.getElementById('success-sound'),
            typing: document.getElementById('typing-sound'),
            powerup: document.getElementById('powerup-sound')
        };
        
        // Set default volumes
        Object.values(this.audioElements).forEach(audio => {
            if (audio) audio.volume = 0.3;
        });
    }
    
    playSound(soundName, volume = 0.3) {
        let audio;
        
        switch (soundName) {
            case 'hover-soft.mp3':
                audio = this.audioElements.hover;
                break;
            case 'click-futuristic.mp3':
                audio = this.audioElements.click;
                break;
            case 'modal-open.wav':
                audio = this.audioElements.modal;
                break;
            case 'success-chime.mp3':
                audio = this.audioElements.success;
                break;
            case 'terminal-typing.wav':
                audio = this.audioElements.typing;
                break;
            case 'power-up.wav':
                audio = this.audioElements.powerup;
                break;
            default:
                return;
        }
        
        if (!audio) return;
        
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    initScrollEffects() {
        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            ScrollTrigger.create({
                trigger: bar,
                start: "top 80%",
                onEnter: () => {
                    const percent = bar.parentElement.parentElement.dataset.percent;
                    gsap.to(bar, {
                        width: `${percent}%`,
                        duration: 1.5,
                        ease: "power3.out",
                        onStart: () => {
                            this.playSound('power-up.wav', 0.2);
                        }
                    });
                }
            });
        });
        
        // Animate language bubbles
        const languageBubbles = document.querySelectorAll('.language-bubbles .bubble');
        languageBubbles.forEach(bubble => {
            ScrollTrigger.create({
                trigger: bubble,
                start: "top 80%",
                onEnter: () => {
                    gsap.from(bubble, {
                        scale: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        delay: 0.1 * Array.from(languageBubbles).indexOf(bubble)
                    });
                }
            });
        });
    }
    
    initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                
                if (navLinks.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                this.playSound('click-futuristic.mp3');
            });
        }
    }
    
    initHoverEffects() {
        // Add hover effects to elements with data-sound attribute
        document.querySelectorAll('[data-sound="hover"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.playSound('hover-soft.mp3', 0.2);
                
                // Add visual feedback
                if (el.classList.contains('nav-link')) {
                    gsap.to(el, {
                        y: -2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Add click effects
        document.querySelectorAll('[data-sound="click"]').forEach(el => {
            el.addEventListener('click', () => {
                this.playSound('click-futuristic.mp3');
                
                // Add visual feedback
                gsap.to(el, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            });
        });
        
        // Add modal open effects
        document.querySelectorAll('[data-sound="modal"]').forEach(el => {
            el.addEventListener('click', () => {
                this.playSound('modal-open.wav');
            });
        });
    }
    
    initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValid = true;
                
                // Validate required fields
                form.querySelectorAll('[required]').forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Add error message if not exists
                        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                            const errorMsg = document.createElement('span');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'This field is required';
                            field.parentNode.insertBefore(errorMsg, field.nextSibling);
                        }
                    } else {
                        field.classList.remove('error');
                        
                        // Remove error message if exists
                        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                            field.nextElementSibling.remove();
                        }
                    }
                });
                
                // Validate email format
                const emailField = form.querySelector('input[type="email"]');
                if (emailField && emailField.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(emailField.value)) {
                        isValid = false;
                        emailField.classList.add('error');
                        
                        if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
                            const errorMsg = document.createElement('span');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Please enter a valid email';
                            emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
                        }
                    }
                }
                
                if (!isValid) {
                    e.preventDefault();
                    this.playSound('click-futuristic.mp3', 0.5);
                }
            });
        });
    }
    
    setupEventListeners() {
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const menuBtn = document.querySelector('.mobile-menu-btn');
                const navLinks = document.querySelector('.nav-links');
                
                if (menuBtn && navLinks && navLinks.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectCard = e.target.closest('.project-card');
                const projectName = projectCard.dataset.project;
                this.showProjectDetails(projectName);
            });
        });
    }
    
    showProjectDetails(projectName) {
        const detailsModal = this.modals.details;
        if (!detailsModal) return;
        
        const detailsContent = detailsModal.querySelector('.details-content');
        if (!detailsContent) return;
        
        // Clear previous content
        detailsContent.innerHTML = '';
        
        // Project data
        const projects = {
            'memory': {
                title: 'MEMORY_GAME',
                description: 'An interactive card matching game with user accounts and score tracking. Players can create accounts, track their progress, and compete for high scores. The game features multiple difficulty levels and themes.',
                features: [
                    'User authentication system',
                    'Score tracking and leaderboards',
                    'Multiple game difficulty levels',
                    'Customizable card themes',
                    'Responsive design for all devices'
                ],
                tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'SQLite'],
                github: 'https://github.com/ryosvoid/memory_game',
                image: './assets/images/projects/memory game/memory3.jpeg'
            },
            'maths': {
                title: 'MATHS_PYRAMID',
                description: 'A challenging math puzzle game where players solve pyramid equations by memorizing and calculating number patterns. The game helps improve mental math skills and memory through progressively difficult levels.',
                features: [
                    'Progressive difficulty system',
                    'Timer and score tracking',
                    'Multiple pyramid sizes',
                    'Custom equation generators',
                    'Interactive tutorial'
                ],
                tech: ['Python', 'JavaScript', 'HTML', 'CSS'],
                github: 'https://github.com/ryosvoid/maths-pyramid-game',
                image: './assets/images/projects/maths game/pyramid_equation1.png'
            }
        };
        
        const project = projects[projectName];
        if (!project) return;
        
        // Update modal title
        detailsModal.querySelector('#details-title').textContent = project.title;
        
        // Create content HTML
        detailsContent.innerHTML = `
            <div class="details-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="details-text">
                <h3>ABOUT_THE_PROJECT</h3>
                <p>${project.description}</p>
                
                <div class="details-features">
                    <h4>KEY_FEATURES</h4>
                    <ul>
                        ${project.features.map(feat => `<li>${feat}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="details-tech">
                    <h4>TECHNOLOGIES_USED</h4>
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                
                <div class="details-links">
                    <a href="${project.github}" class="cyber-button" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i> VIEW_ON_GITHUB
                    </a>
                </div>
            </div>
        `;
        
        // Open modal
        this.openModal(detailsModal);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new CyberpunkPortfolio();
    
    // Make app available globally for debugging
    window.app = app;
});
