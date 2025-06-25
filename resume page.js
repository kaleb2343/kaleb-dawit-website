document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Get both desktop and mobile theme toggles
    const desktopThemeToggle = document.getElementById('theme-toggle-desktop');
    const mobileThemeToggle = document.getElementById('theme-toggle-mobile');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        // Close mobile menu when a link inside it is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

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

    // Function to show the custom modal (ORIGINAL FROM blog page.js)
    function showModal(message) {
        const modal = document.getElementById('myModal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'flex'; // Use flex to center content
    }
});