document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change burger icon to 'X' and back
            if (navLinks.classList.contains('active')) {
                mobileNavToggle.setAttribute('aria-expanded', 'true');
                mobileNavToggle.textContent = '✕'; // Close icon
            } else {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.textContent = '☰'; // Burger icon
            }
        });
    }

    // Smooth scrolling for anchor links (optional, modern browsers handle some of this)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's a valid internal link and not just "#"
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
                // If mobile nav is open, close it after clicking a link
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileNavToggle) {
                        mobileNavToggle.setAttribute('aria-expanded', 'false');
                        mobileNavToggle.textContent = '☰';
                    }
                }
            }
        });
    });

    // Placeholder for other potential JS functionalities:
    // - Testimonial carousel/slider
    // - Animations on scroll (reveal elements)
    // - Dynamic content loading (if applicable)

    // Example: Simple fade-in animation for sections on scroll
    const sections = document.querySelectorAll('main > section');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of section visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

});
