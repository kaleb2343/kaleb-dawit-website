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


    // Function to show the custom modal (simplified as no close button)
    function showModal(message) {
        const modal = document.getElementById('myModal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'flex'; // Use flex to center content
        // Automatically hide modal after a few seconds if no explicit close button
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000); // Hide after 3 seconds
    }

    // Lightbox functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    // Get the new caption element
    const lightboxCaption = document.getElementById('lightboxCaption'); 

    let currentImages = []; // This will now store objects {src: "...", caption: "..."}
    let currentIndex = 0;

    function openLightbox(images, startIndex = 0) {
        currentImages = images;
        currentIndex = startIndex;
        if (currentImages.length > 0) {
            lightboxImage.src = currentImages[currentIndex].src; // Access .src property
            lightboxCaption.textContent = currentImages[currentIndex].caption; // Set the caption text
            lightboxModal.style.display = 'flex';
            updateLightboxNav();
            updateLightboxCounter();
        }
    }

    function closeLightbox() {
        lightboxModal.style.display = 'none';
        lightboxCaption.textContent = ''; // Clear caption when closing
    }

    function updateLightboxNav() {
        if (currentImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        }
    }

    function updateLightboxCounter() {
        lightboxCounter.textContent = `${currentIndex + 1} of ${currentImages.length}`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex].src; // Access .src property
        lightboxCaption.textContent = currentImages[currentIndex].caption; // Update caption
        updateLightboxCounter();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex].src; // Access .src property
        lightboxCaption.textContent = currentImages[currentIndex].caption; // Update caption
        updateLightboxCounter();
    }

    // Event Listeners for Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Store intervals for each card to manage them independently
    const cardIntervals = new Map();

    // Project Card Slideshow (Flashcard effect) and Click Handlers
    document.querySelectorAll('.project-card').forEach(card => {
        const imageContainer = card.querySelector('.project-image-container');
        const mainImage = imageContainer.querySelector('img');
        const imagesData = card.getAttribute('data-lightbox-images');
        const githubRepoLink = card.getAttribute('data-github-repo'); // Get the GitHub link

        let cardImages = [];
        if (imagesData) {
            try {
                cardImages = JSON.parse(imagesData);
            } catch (e) {
                console.error("Error parsing data-lightbox-images:", e);
            }
        }

        let currentCardImageIndex = 0;

        const updateCardImage = () => {
            if (cardImages.length > 0) {
                mainImage.src = cardImages[currentCardImageIndex].src;
                // ADDED: Ensure the image is visible
                mainImage.classList.add('active-card-image'); 
                currentCardImageIndex = (currentCardImageIndex + 1) % cardImages.length;
            }
        };

        // Only apply slideshow to cards that have lightbox images (graphic design cards)
        if (cardImages.length > 0) {
            updateCardImage(); // Initial image set and visibility applied
            // COMMENTED OUT: Removed the automatic image slideshow
            // const intervalId = setInterval(updateCardImage, 3000); // Change image every 3 seconds
            // cardIntervals.set(card, intervalId);
        }

        // Add click listener for ALL project cards
        card.addEventListener('click', () => {
            if (githubRepoLink) {
                window.open(githubRepoLink, '_blank'); // Open GitHub link in a new tab
            } else if (cardImages.length > 0) {
                // Find the index of the currently displayed image in the cardImages array
                // We use (currentCardImageIndex - 1 + cardImages.length) % cardImages.length
                // because updateCardImage increments the index *after* setting the src.
                const initialLightboxIndex = (currentCardImageIndex - 1 + cardImages.length) % cardImages.length;
                openLightbox(cardImages, initialLightboxIndex);
            }
        });
    });
});