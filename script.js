// 1. Initial Setup & Console Message
window.onload = () => {
    console.log("Welcome to Math&Poli Nerd - Professional Blog Shell Loaded.");
};

// 2. Select Elements
const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

// 3. Mobile Menu Toggle Logic (Merged into one listener)
menu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menu.classList.toggle('is-active'); // This triggers the "X" morph
});

// 4. Close Menu & Smooth Scroll when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Prevent default only if it's an anchor link to a section
        const href = item.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Close the mobile menu automatically after clicking
        navLinks.classList.remove('active');
        menu.classList.remove('is-active');
    });
});

// 5. Dynamic "Active" State on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.6 // Highlights the tab when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.remove('active');
                // If the link's href matches the ID of the section in view
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Tell the observer to watch every <section> on your page
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});