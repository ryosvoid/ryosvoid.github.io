document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('AX9ZtVpZPmydtAaFI');
    
    // Typing Animation
    const typed = new Typed('#typed', {
        strings: ['Tech Enthusiast', 'Problem Solver', 'AI Enthusiast', 'Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
    
    // Animate Skill Bars on Scroll
    const animateSkills = () => {
        const skills = document.querySelectorAll('.bar');
        skills.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    // Check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
    // Handle scroll events
    const handleScroll = () => {
        const aboutSection = document.querySelector('#about');
        if (isInViewport(aboutSection)) {
            animateSkills();
            window.removeEventListener('scroll', handleScroll);
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Create floating particles
    const createParticles = () => {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const color = `hsl(${Math.random() * 60 + 270}, 100%, 70%)`;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;
            
            particlesContainer.appendChild(particle);
        }
    };
    
    createParticles();
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Play sound
        const clickSound = new Audio('./assets/sounds/click-futuristic.mp3');
        clickSound.play();
        
        // Show loading state
        formStatus.innerHTML = '<div class="loading-spinner"></div>';
        
        // Send email
        emailjs.sendForm('ryoscoid', 'template_jai0z9m', this)
            .then(() => {
                // Play success sound
                const successSound = new Audio('./assets/sounds/success-chime.mp3');
                successSound.play();
                
                // Show success modal
                modal.style.display = 'flex';
                
                // Reset form
                contactForm.reset();
                formStatus.innerHTML = '';
            })
            .catch((error) => {
                formStatus.innerHTML = `<p class="error">Error: ${error.text}</p>`;
            });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Play sound
                const clickSound = new Audio('./assets/sounds/modal-open.wav');
                clickSound.play();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('.project-image img');
            img.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.project-image img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Add animation to certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 15px rgba(255, 110, 199, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
    
    // Initialize animations when page loads
    setTimeout(() => {
        document.querySelector('body').classList.add('loaded');
    }, 500);
});
