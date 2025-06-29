// Enhanced Ghibli Animations
function createGhibliElements() {
  const container = document.getElementById('ghibli-elements');
  const elementCount = window.innerWidth < 768 ? 15 : 30;
  
  // Ghibli-inspired elements
  const elements = [
    { class: 'soot-sprite', emoji: '⚫', color: 'black' },
    { class: 'leaf', emoji: '🍃', color: '#8da67b' },
    { class: 'star', emoji: '✨', color: '#f5d76e' },
    { class: 'cloud', emoji: '☁️', color: '#f8f9fa' }
  ];

  for (let i = 0; i < elementCount; i++) {
    const element = document.createElement('div');
    const type = elements[Math.floor(Math.random() * elements.length)];
    
    element.classList.add('ghibli-element', type.class);
    element.innerHTML = type.emoji;
    element.style.color = type.color;
    
    // Random properties
    const size = Math.random() * 30 + 20;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.6 + 0.4;
    
    element.style.fontSize = `${size}px`;
    element.style.left = `${posX}%`;
    element.style.top = `${posY}%`;
    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
    element.style.opacity = opacity;
    element.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(element);
  }
}

// Ghibli-inspired page transitions
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add Ghibli-style transition
      document.querySelector('.content-container').style.animation = 'ghibliFade 0.5s ease';
      
      setTimeout(() => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        button.classList.add('active');
        const pageId = button.getAttribute('href');
        document.querySelector(pageId).classList.add('active');
        
        document.querySelector('.content-container').style.animation = '';
        window.scrollTo(0, 0);
      }, 500);
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  createGhibliElements();
  setupNavigation();
  // Other setup functions...
});

// Add EmailJS and other functionality...