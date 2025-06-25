// home page.js

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Get both desktop and mobile theme toggles
    const desktopThemeToggle = document.getElementById('theme-toggle-desktop');
    const mobileThemeToggle = document.getElementById('theme-toggle-mobile');

    // Mobile menu toggle logic
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Function to apply theme and update icons
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        updateThemeIcons();
    }

    // Function to update the icons of BOTH theme toggles
    function updateThemeIcons() {
        const iconClass = document.body.classList.contains('light-theme') ? 'fa-sun' : 'fa-moon';

        // Update desktop icon
        const desktopIcon = desktopThemeToggle ? desktopThemeToggle.querySelector('i') : null;
        if (desktopIcon) {
            desktopIcon.classList.remove('fa-sun', 'fa-moon');
            desktopIcon.classList.add(iconClass);
        }

        // Update mobile icon
        const mobileIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;
        if (mobileIcon) {
            mobileIcon.classList.remove('fa-sun', 'fa-moon');
            mobileIcon.classList.add(iconClass);
        }
    }

    // Initial theme load based on localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Default to dark theme if no preference is saved
        applyTheme('dark');
    }


    // Add click listeners to both theme toggles
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- Your existing Rotating Text Logic (no changes needed here) ---
    const rotatingTextElement = document.getElementById('rotating-text');
    const phrases = ["Graphics Designer ", "Digital marketer ", "Devloper"]; // Add your phrases
    let currentPhraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Speed of typing
    let deletingSpeed = 50; // Speed of deleting
    let pauseTime = 1200; // Time before next phrase

    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        if (isDeleting) {
            rotatingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            rotatingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriter, speed);
    }

    if (rotatingTextElement) {
        typeWriter();
    }

    // --- Your existing Modal Logic (no changes needed here) ---
    function closeModal() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }
    window.closeModal = closeModal; // Expose to global scope for HTML onclick
});