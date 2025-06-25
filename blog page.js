// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

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

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

// Apply saved theme on load
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'light-theme') {
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
} else {
    // Default to dark theme if no preference is saved
    body.classList.add('dark-theme'); // Explicitly add dark-theme class
    localStorage.setItem('theme', 'dark-theme');
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
        localStorage.setItem('theme', 'dark-theme');
    }
});

// Function to show the custom modal
function showModal(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'flex'; // Use flex to center content
}

// Function to close the custom modal
function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// *** NEW CODE FOR MAKING "MY WRITINGS" CARDS CLICKABLE ***
document.addEventListener('DOMContentLoaded', () => {
    const myWritingsCards = document.querySelectorAll('.blog-grid > div.blog-post-card');

    // Filter to get only the cards in the "My Writings" section
    // Assuming "My Writings" is the second .blog-grid, or we add specific IDs.
    // A more robust way would be to add a unique class/ID to these cards if they are not already unique.
    // For now, let's assume the last three cards in the HTML are the "My Writings" cards.
    // A better approach would be to give the "My Writings" section a unique ID, like <div id="my-writings-grid" class="blog-grid">
    // And then use document.querySelectorAll('#my-writings-grid .blog-post-card');

    // Given the HTML structure, the last 3 cards are "My Writings"
    // We can select all cards and then get the last three.
    const allCards = document.querySelectorAll('.blog-post-card');
    const startIndex = allCards.length - 3; // Assuming last 3 are "My Writings"
    if (startIndex >= 0) {
        for (let i = startIndex; i < allCards.length; i++) {
            const card = allCards[i];
            // Ensure this doesn't conflict with the new Tech Bytes click handler if elements overlap
            // Only add listener if it's not a Tech Bytes card (no data-url attribute)
            if (!card.hasAttribute('data-url')) {
                card.style.cursor = 'pointer'; // Add pointer cursor to indicate it's clickable
                card.addEventListener('click', () => {
                    window.open('https://merafe-stories.netlify.app/', '_blank');
                });
            }
        }
    }
});
// *** END NEW CODE ***

// *** NEW/MODIFIED CODE for making "Tech Bytes" cards clickable, excluding the button ***
document.addEventListener('DOMContentLoaded', () => {
    // Select all "Tech Bytes" cards using the data-url attribute
    const techBytesCards = document.querySelectorAll('.blog-post-card[data-url]');

    techBytesCards.forEach(card => {
        card.style.cursor = 'pointer'; // Indicate clickability for the entire card

        // Add a click event listener to each "Tech Bytes" card
        card.addEventListener('click', (event) => {
            // Check if the clicked element (or any of its parent elements up to the card) is the button itself
            // If it is the button, let the button's default action (href) handle the navigation
            if (!event.target.closest('.blog-post-button')) {
                const url = card.dataset.url; // Get the URL from the data-url attribute on the card
                if (url) {
                    window.open(url, '_blank'); // Open the URL in a new tab
                }
            }
        });
    });
});