import { loadNavbar } from './navbar.js';

console.log("Portfolio loaded.");


document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();

    // Force mailto behavior for contact button
    const emailBtn = document.querySelector('a[href^="mailto:"]');
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            // Force browser to open mail client
            window.location.href = emailBtn.href;
            console.log("Email button clicked: forcing mailto navigation");
        });
    }
});

