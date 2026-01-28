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

    // Scroll Animation Observer with Stagger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a small stagger delay if multiple items trigger at once
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((el, index) => {
        // Automatically assign staggered delays to grid items or lists
        const parent = el.parentElement;
        if (parent.classList.contains('projects-grid') ||
            parent.classList.contains('cert-grid') ||
            parent.classList.contains('education-wrapper')) {
            const gridItems = Array.from(parent.children);
            const itemIndex = gridItems.indexOf(el);
            el.dataset.delay = itemIndex * 100; // 100ms stagger
        }
        observer.observe(el);
    });

    // Certificate Modal Logic
    const modal = document.getElementById('certModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');

    // Get all certificate images and links
    const certImages = document.querySelectorAll('a[href*="cert.jpg"], a[href*="scalar java certificate.png"], img[src*="cert.jpg"], img[src*="scalar java certificate.png"]');
    const certPDFs = document.querySelectorAll('a[href$=".pdf"]');

    // Handle certificate image clicks
    certImages.forEach(cert => {
        cert.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = cert.href || cert.src;
            modalBody.innerHTML = `<img src="${imgSrc}" alt="Certificate">`;
            modal.classList.add('active');
        });
    });

    // Handle certificate PDF clicks
    certPDFs.forEach(pdf => {
        const parentCard = pdf.closest('.timeline-content, .cert-card');
        if (parentCard) {
            pdf.addEventListener('click', (e) => {
                e.preventDefault();
                const pdfSrc = pdf.href;
                modalBody.innerHTML = `<iframe src="${pdfSrc}"></iframe>`;
                modal.classList.add('active');
            });
        }
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    });

    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modalBody.innerHTML = '';
            }, 300);
        }
    });
});
