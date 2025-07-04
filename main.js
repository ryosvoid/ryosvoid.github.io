document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
        strings: ["Tech Enthusiast", "Problem Solver", "AI Enthusiast", "Developer"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: false
    });

    // Initialize EmailJS
    emailjs.init('AX9ZtVpZPmydtAaFI');

    // Contact Modal
    const modal = document.getElementById('contact-modal');
    const contactBtn = document.getElementById('contact-btn');
    const closeModal = document.querySelector('.close-modal');

    contactBtn.addEventListener('click', () => {
        playSound('modal-open.wav');
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('#contact-form button');
        const spinner = document.getElementById('loading-spinner');
        const checkmark = document.getElementById('success-check');
        const submitText = document.getElementById('submit-text');
        
        // Show loading state
        submitText.style.display = 'none';
        spinner.style.display = 'block';
        
        emailjs.sendForm('ryoscoid', 'template_jai0z9m', this)
            .then(() => {
                // Success state
                spinner.style.display = 'none';
                checkmark.style.display = 'block';
                playSound('success-chime.mp3');
                
                setTimeout(() => {
                    checkmark.style.display = 'none';
                    submitText.style.display = 'inline';
                    contactForm.reset();
                    modal.style.display = 'none';
                }, 2000);
            }, (error) => {
                console.error('Failed:', error);
                spinner.style.display = 'none';
                submitText.style.display = 'inline';
                alert('Message failed to send. Please try again.');
            });
    });

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill');
    window.addEventListener('scroll', () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const percent = bar.getAttribute('data-percent');
                bar.querySelector('.skill-progress').style.width = percent + '%';
                if (!bar.classList.contains('animated')) {
                    playSound('power-up.wav');
                    bar.classList.add('animated');
                }
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playSound('hover-soft.mp3');
    });

    // Hover Sound Effects
    const hoverElements = document.querySelectorAll('.cyber-button, .nav-link, .project-card, .contact-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover-soft.mp3'));
        el.addEventListener('click', () => playSound('click-futuristic.mp3'));
    });

    // Play Sound Function
    function playSound(soundFile) {
        const audio = new Audio(`./assets/sounds/${soundFile}`);
        audio.volume = 0.3;
        audio.play();
    }

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ff9ff3" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
});
