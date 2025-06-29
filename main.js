document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init({
    publicKey: "AX9ZtVpZPmydtAaFI",
    blockHeadless: true
  });

  // Create Ghibli-style clouds
  function createClouds() {
    const container = document.querySelector('.clouds-container');
    const cloudCount = window.innerWidth < 768 ? 5 : 10;
    
    for (let i = 0; i < cloudCount; i++) {
      const cloud = document.createElement('div');
      cloud.classList.add('cloud');
      
      // Random properties
      const size = Math.random() * 150 + 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 100 + 100;
      const delay = Math.random() * -50;
      
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size/2}px`;
      cloud.style.top = `${posY}%`;
      cloud.style.animationDuration = `${duration}s`;
      cloud.style.animationDelay = `${delay}s`;
      
      container.appendChild(cloud);
    }
  }

  // Navigation functionality
  function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons and pages
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding page
        const pageId = button.getAttribute('href');
        document.querySelector(pageId).classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
      });
    });
  }

  // Modal functionality
  function setupModals() {
    // Generic modal setup
    const setupModal = (modalId, closeId, triggerId) => {
      const modal = document.getElementById(modalId);
      const close = document.getElementById(closeId);
      const trigger = document.getElementById(triggerId);

      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }

      close.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    };

    // Project modals
    setupModal('memory-modal', 'memory-close', 'memory-game');
    setupModal('pyramid-modal', 'pyramid-close', 'pyramid-game');
    
    // Contact modal
    setupModal('contact-modal', 'contact-close', 'contact-btn');
    
    // Success message close
    document.getElementById('success-close')?.addEventListener('click', () => {
      document.getElementById('contact-modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Lightbox functionality
  function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-image');

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Form submission
  function setupForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    const submitText = submitBtn?.querySelector('.submit-text');
    const loadingIcon = submitBtn?.querySelector('.loading-icon');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      submitText.style.display = 'none';
      loadingIcon.style.display = 'inline-block';
      submitBtn.disabled = true;

      // Send form using EmailJS
      emailjs.sendForm('ryoscoid', 'template_jai0z9m', this)
        .then(() => {
          // Success
          contactForm.style.display = 'none';
          successMessage.style.display = 'block';
          contactForm.reset();
        }, (error) => {
          // Error
          alert('Failed to send message. Please try again later.');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          // Reset button state
          submitText.style.display = 'inline-block';
          loadingIcon.style.display = 'none';
          submitBtn.disabled = false;
        });
    });
  }

  // Close modals with ESC key
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.project-modal.active, .contact-modal.active').forEach(modal => {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
        });
        
        if (document.getElementById('lightbox').classList.contains('active')) {
          document.getElementById('lightbox').classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      }
    });
  }

  // Initialize everything
  createClouds();
  setupNavigation();
  setupModals();
  setupLightbox();
  setupForm();
  setupKeyboardShortcuts();
});
