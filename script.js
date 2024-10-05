// Add this to your script.js
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.page-section');

    const checkVisibility = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section is in the viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('visible'); // Add the visible class
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
});
