document.addEventListener('DOMContentLoaded', function() {
    // ========== TYPING ANIMATION ==========
    const typed = new Typed('#typed', {
        strings: ["Tech Enthusiast", "Problem Solver", "AI Developer", "Creative Coder"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        onStringTyped: () => playSound('terminal-typing')
    });

    // ========== PARTICLES BACKGROUND ==========
    particlesJS('particles-js', {
        /* ... (keep your existing particle config) ... */
    });

    // ========== INTERACTIVE NAVIGATION SYSTEM ==========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.nav-hamburger');
    const navList = document.querySelector('.nav-links');

    // Initialize first section
    showSection('home');

    // Click navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            playSound('click-futuristic');
        });
    });

    // Scroll navigation
    window.addEventListener('scroll', throttle(() => {
        const currentPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
                const sectionId = section.id;
                setActiveNav(sectionId);
            }
        });
    }, 100));

    // Mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        playSound('modal-open');
    });

    // ========== SECTION MANAGEMENT ==========
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add('active');
        
        // Scroll to section
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        
        // Trigger animations
        if (sectionId === 'skills') animateSkillBars();
        if (sectionId === 'projects') initProjectHovers();
    }

    function setActiveNav(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ========== ANIMATED SKILL BARS ==========
    function animateSkillBars() {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const width = bar.getAttribute('data-level');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = `${width}%`;
                playSound('power-up');
            }, 100);
        });
    }

    // ========== INTERACTIVE PROJECT CARDS ==========
    function initProjectHovers() {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.querySelector('.project-overlay').style.opacity = '1';
                playSound('hover-soft');
            });
            
            project.addEventListener('mouseleave', () => {
                project.querySelector('.project-overlay').style.opacity = '0';
            });
            
            // Click to show gallery
            project.addEventListener('click', function() {
                const gallery = this.querySelector('.project-gallery');
                gallery.classList.toggle('active');
            });
        });
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        playSound('modal-open');
        
        // Simulate sending (replace with actual EmailJS code)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            playSound('success-chime');
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.classList.remove('success');
                document.querySelector('.modal-overlay').classList.remove('active');
            }, 2000);
        }, 1500);
    });

    // ========== AUDIO SYSTEM ==========
    function playSound(soundName) {
        const audio = new Audio(`./assets/sounds/${soundName}.mp3`);
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio playback prevented:", e));
    }

    // ========== UTILITY FUNCTIONS ==========
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    }
});
