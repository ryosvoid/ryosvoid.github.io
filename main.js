document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ff9ff3", "#48dbfb", "#feca57"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#48dbfb",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const words = ["Tech Enthusiast", "Problem Solver", "AI Enthusiast", "Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Play sound if available
            const soundFile = this.getAttribute('data-sound');
            if (soundFile) {
                playSound(`./assets/sounds/${soundFile}`);
            }

            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId.substring(1)) {
                    section.classList.add('active');
                }
            });

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }

            // Scroll to top of section
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        playSound('./assets/sounds/click-futuristic.mp3');
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Animate skill bars when About section is visible
    const aboutSection = document.querySelector('#about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                playSound('./assets/sounds/power-up.wav');
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Project gallery modal
    const viewGalleryBtns = document.querySelectorAll('.view-gallery');
    const galleryModal = document.querySelector('.gallery-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-title');
    const galleryCurrent = document.querySelector('.gallery-current');
    const galleryThumbs = document.querySelector('.gallery-thumbs');

    // Gallery data
    const galleries = {
        memory: {
            title: "Memory Game",
            images: [
                './assets/images/projects/memory game/memory1.jpeg',
                './assets/images/projects/memory game/memory2.jpeg',
                './assets/images/projects/memory game/memory3.jpeg',
                './assets/images/projects/memory game/memory4.jpeg',
                './assets/images/projects/memory game/memory5.jpeg',
                './assets/images/projects/memory game/memory6.jpeg',
                './assets/images/projects/memory game/memory7.jpeg'
            ]
        },
        maths: {
            title: "Maths Pyramid Game",
            images: [
                './assets/images/projects/maths game/pyramid_equation1.png',
                './assets/images/projects/maths game/pyramid_equation2.png',
                './assets/images/projects/maths game/pyramid_equation3.png'
            ]
        }
    };

    // Open gallery modal
    viewGalleryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const project = this.getAttribute('data-project');
            const gallery = galleries[project];
            
            playSound('./assets/sounds/modal-open.wav');
            
            // Set modal title
            modalTitle.textContent = gallery.title;
            
            // Clear previous thumbnails
            galleryThumbs.innerHTML = '';
            
            // Set first image as current
            galleryCurrent.src = gallery.images[0];
            galleryCurrent.alt = gallery.title;
            
            // Create thumbnails
            gallery.images.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img;
                thumb.alt = `${gallery.title} - Image ${index + 1}`;
                
                if (index === 0) {
                    thumb.classList.add('active');
                }
                
                thumb.addEventListener('click', function() {
                    galleryCurrent.src = this.src;
                    document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active'));
                    this.classList.add('active');
                });
                
                galleryThumbs.appendChild(thumb);
            });
            
            // Show modal
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close gallery modal
    modalClose.addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);

    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Language bubbles hover effect
    const languageBubbles = document.querySelectorAll('.language-bubble');

    languageBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            const lang = this.getAttribute('data-lang');
            let tooltipText = '';
            
            switch(lang) {
                case 'EN':
                    tooltipText = 'Fluent';
                    break;
                case 'FR':
                    tooltipText = 'Fluent';
                    break;
                case 'AR':
                    tooltipText = 'Native';
                    break;
            }
            
            const tooltip = document.createElement('div');
            tooltip.className = 'language-tooltip';
            tooltip.textContent = tooltipText;
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
        });
        
        bubble.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.language-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => tooltip.remove(), 300);
            }
        });
    });

    // Play sound function
    function playSound(soundFile) {
        const audio = new Audio(soundFile);
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
    // Add this to the DOMContentLoaded event listener

// EmailJS Integration
(function() {
    // Initialize EmailJS with your public key
    emailjs.init('AX9ZtVpZPmydtAaFI');

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Play sound
            playSound('./assets/sounds/modal-open.wav');
            
            // Show loading state
            formStatus.innerHTML = '<div class="loading-spinner"></div>Sending message...';
            
            // Send form data via EmailJS
            emailjs.sendForm('ryoscoid', 'template_jai0z9m', this)
                .then(function() {
                    // Success message
                    formStatus.innerHTML = '<div class="success-message">✓ Message sent successfully!</div>';
                    playSound('./assets/sounds/success-chime.mp3');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Clear status after 5 seconds
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                }, function(error) {
                    // Error message
                    formStatus.innerHTML = `<div class="error-message">✗ Failed to send message. Please try again.</div>`;
                    console.error('EmailJS error:', error);
                });
        });
    }

    // Add loading spinner styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: var(--secondary);
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
            vertical-align: middle;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();

    // Initialize animations when page loads
    animateSkillBars();
});
