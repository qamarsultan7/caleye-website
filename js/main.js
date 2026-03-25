// Smooth scroll for local page sections.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// iOS store listing is not live yet.
document.querySelectorAll('.ios-soon').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Launching soon');
    });
});