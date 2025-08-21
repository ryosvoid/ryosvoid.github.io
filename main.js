document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. INITIALIZATION & GLOBAL VARIABLES
    // ============================================
    console.log("Initializing Portfolio...");

    // -- Avatar Reaction System --
    const avatarReaction = document.getElementById('avatarReaction');
    let reactionTimeout; // To control how long reactions are shown

    // -- Skill Terminal --
    const skillTerminal = document.getElementById('skillTerminal');
    const terminalClose = document.querySelector('.terminal-close');
    const terminalOutput = document.getElementById('terminalOutput');

    // Data for the terminal: Fun facts about your skills!
    const skillFacts = {
        "Python": "My go-to for automation and data tasks. Built several games and scripts with it!",
        "C": "Learned to appreciate memory management and low-level logic. The foundation of everything.",
        "HTML": "The skeleton of the web. I enjoy structuring content in a semantic way.",
        "CSS": "Where the magic happens! I love transforming HTML into visually appealing experiences.",
        "JavaScript": "Making websites interactive and dynamic. This portfolio runs on JS!",
        "SQL": "The language of data. I use it to query and manage databases efficiently."
    };

    // ============================================
    // 2. CORE FUNCTIONS
    // ============================================

    /**
     * Controls the avatar's reaction emoji.
     * @param {string} emoji - The emoji to display.
     * @param {number} duration - How long to show it (ms). 0 = permanent until changed.
     */
    function setAvatarReaction(emoji, duration = 3000) {
        // Clear any previous timeout so reactions don't overlap weirdly
        clearTimeout(reactionTimeout);

        // Update the emoji text
        avatarReaction.textContent = emoji;

        // Add the class that triggers the show animation (defined in CSS)
        avatarReaction.classList.add('show');

        // If a duration is set, hide the reaction after that time
        if (duration > 0) {
            reactionTimeout = setTimeout(() => {
                avatarReaction.classList.remove('show');
            }, duration);
        }
    }

    /**
     * "Types" text into the terminal, character by character.
     * @param {string} text - The text to display.
     * @param {HTMLElement} element - The HTML element to type into.
     * @param {number} speed - Typing speed (ms per character).
     * @param {Function} callback - Function to run after typing is done.
     */
    function typeInTerminal(text, element, speed = 40, callback) {
        let i = 0;
        element.innerHTML = ''; // Clear previous text

        function type() {
            if (i < text.length) {
                // Add the next character, use a span to allow for future styling (like blinks)
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                // All text is typed, run the callback function
                setTimeout(callback, 500);
            }
        }
        type();
    }

    /**
     * Opens the terminal and displays info about a skill.
     * @param {string} skillName - The name of the skill to display.
     */
    function openSkillTerminal(skillName) {
        // Play a sound for the terminal opening (beep boop!)
        playSound('./assets/sounds/terminal-open.wav'); // You might need to find a sound for this

        // Show the terminal modal
        skillTerminal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Get the fun fact for this skill
        const fact = skillFacts[skillName] || `> No additional data found for ${skillName}.`;

        // Create the text that will be "typed" out
        const terminalText = `> Initializing skill assessment...\n> Loading data for [${skillName}]...\n\n> ${fact}\n\n> _`;

        // Type the text into the terminal
        typeInTerminal(terminalText, terminalOutput);
    }

    /**
     * Closes the skill terminal.
     */
    function closeSkillTerminal() {
        playSound('./assets/sounds/terminal-close.wav'); // You might need to find a sound for this
        skillTerminal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        // Reset the avatar to default when closing the terminal
        setAvatarReaction('😊', 0); // 0 duration means it stays until another event changes it
    }

    // ============================================
    // 3. EVENT LISTENERS & INTERACTIVITY
    // ============================================

    // -- AVATAR REACTION TRIGGERS --

    // React when hovering over the profile picture itself
    const profileContainer = document.querySelector('.profile-container');
    profileContainer.addEventListener('mouseenter', () => setAvatarReaction('👋', 2000));
    profileContainer.addEventListener('mouseleave', () => setAvatarReaction('😊', 0));

    // React when the user is in the About section (using the existing observer)
    const aboutSection = document.querySelector('#about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setAvatarReaction('🤔', 4000); // Thinker emoji for the about section
                playSound('./assets/sounds/power-up.wav');
                animateSkillBars(); // Keep the original skill bar animation
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutSection);

    // React when hovering over projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => setAvatarReaction('💻', 2000));
    });

    // React when hovering over certificates
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => setAvatarReaction('🎓', 2000));
    });

    // React when interacting with the contact form
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => setAvatarReaction('📧', 0)); // Stays while typing
        input.addEventListener('blur', () => setAvatarReaction('😊', 0)); // Reverts when done
    });

    // -- SKILL TERMINAL TRIGGERS --

    // Listen for clicks on skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skillName = this.getAttribute('data-skill');
            // Change avatar reaction to something "knowledgeable"
            setAvatarReaction('🧠', 0); // Set it until terminal closes
            // Open the terminal with the skill info
            openSkillTerminal(skillName);
        });
    });

    // Close terminal when clicking the X button
    terminalClose.addEventListener('click', closeSkillTerminal);
    // Close terminal when clicking outside of it
    skillTerminal.addEventListener('click', function(e) {
        if (e.target === this) { // If the click is on the modal's backdrop
            closeSkillTerminal();
        }
    });

    // ============================================
    // 4. EXISTING FUNCTIONALITY (KEPT FROM BEFORE)
    // ============================================

    // ... (Keep all your existing code below this point) ...
    // This includes: particlesJS init, typing animation, navigation, 
    // gallery modal, back-to-top button, etc.

    // Make sure the existing animateSkillBars() function is still here
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Make sure the existing playSound() function is still here
    function playSound(soundFile) {
        // ... existing playSound code ...
        const audio = new Audio(soundFile);
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }

    // Initialize the page
    animateSkillBars(); // Animate skill bars on load if in view
});
