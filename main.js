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

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill');
    window.addEventListener('scroll', () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const percent = bar.getAttribute('data-percent');
                bar.querySelector('.skill-progress').style.width = percent + '%';
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ff9ff3" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { 
                enable: true, 
                speed: 2, 
                direction: "none", 
                random: true, 
                straight: false, 
                out_mode: "out" 
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
