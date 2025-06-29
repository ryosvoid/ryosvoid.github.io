// Enhanced Ghibli Animations with Error Handling
function createGhibliElements() {
  try {
    const container = document.getElementById('ghibli-elements');
    if (!container) {
      console.error("Ghibli elements container not found");
      return;
    }

    const elementCount = window.innerWidth < 768 ? 15 : 30;
    
    const elements = [
      { class: 'soot-sprite', emoji: '⚫', color: 'black' },
      { class: 'leaf', emoji: '🍃', color: '#8da67b' },
      { class: 'star', emoji: '✨', color: '#f5d76e' },
      { class: 'cloud', emoji: '☁️', color: '#f8f9fa' }
    ];

    // Clear existing elements first
    container.innerHTML = '';

    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      const type = elements[Math.floor(Math.random() * elements.length)];
      
      element.className = `ghibli-element ${type.class}`;
      element.innerHTML = type.emoji;
      element.style.cssText = `
        color: ${type.color};
        font-size: ${Math.random() * 30 + 20}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${Math.random() * 15 + 10}s;
        opacity: ${Math.random() * 0.6 + 0.4};
        transform: rotate(${Math.random() * 360}deg);
        position: absolute;
        pointer-events: none;
        z-index: -1;
      `;
      
      container.appendChild(element);
    }
  } catch (error) {
    console.error("Error creating Ghibli elements:", error);
  }
}

// Enhanced Navigation with History API
function setupNavigation() {
  try {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    if (!navButtons.length || !pages.length) {
      console.error("Navigation elements not found");
      return;
    }

    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = button.getAttribute('href');
        
        // Add transition
        document.querySelector('.content-container').style.animation = 'ghibliFade 0.5s ease';
        
        setTimeout(() => {
          // Update active states
          navButtons.forEach(btn => btn.classList.remove('active'));
          pages.forEach(page => page.classList.remove('active'));
          
          button.classList.add('active');
          document.querySelector(targetPage).classList.add('active');
          
          // Update URL without reload
          history.pushState(null, '', targetPage);
          
          // Reset animation
          document.querySelector('.content-container').style.animation = '';
          window.scrollTo(0, 0);
        }, 500);
      });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      const currentPage = window.location.hash || '#home';
      const activeButton = document.querySelector(`.nav-btn[href="${currentPage}"]`);
      if (activeButton) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        activeButton.classList.add('active');
        document.querySelector(currentPage).classList.add('active');
      }
    });
  } catch (error) {
    console.error("Error setting up navigation:", error);
  }
}

// Initialize with error handling
document.addEventListener('DOMContentLoaded', () => {
  try {
    createGhibliElements();
    setupNavigation();
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init({
        publicKey: "AX9ZtVpZPmydtAaFI",
        blockHeadless: true
      });
    }
  } catch (error) {
    console.error("Initialization error:", error);
  }
});

// Add animation to CSS dynamically if not present
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes ghibliFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ghibli-element {
      animation: float linear infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
  </style>
`);
