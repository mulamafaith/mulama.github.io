// Theme Toggle Functionality
const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'bx bx-sun';
        } else {
            themeIcon.className = 'bx bx-moon';
        }
    }
};

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
};

// Smooth scrolling for navigation links
const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Contact Form Handling
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form
            contactForm.reset();
        });
    }
};

// Add scroll animation to elements
const initScrollAnimations = () => {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item, .tool-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    animateSkillBars();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
});