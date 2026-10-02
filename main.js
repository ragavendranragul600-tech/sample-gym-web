/* ========================================
   IRONFORGE FITNESS - MAIN SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Testimonials Carousel
    initCarousel();
    
    // Billing Toggle
    initBillingToggle();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Active Navigation Link
    initActiveNavLink();
    
    // Lazy Loading
    initLazyLoading();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = toggle.contains(event.target) || nav.contains(event.target);
        if (!isClickInside && nav.classList.contains('active')) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

/**
 * Testimonials Carousel
 */
function initCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Show first slide
    showSlide(0);
    
    // Dot indicators
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
    }
    
    // Auto advance (optional)
    // setInterval(() => showSlide(currentSlide + 1), 8000);
}

/**
 * Billing Toggle (Monthly/Annual)
 */
function initBillingToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    if (toggleBtns.length === 0) return;
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const billingType = this.dataset.billing;
            
            // Toggle active state
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update all prices and durations
            updatePrices(billingType);
        });
    });
}

function updatePrices(billingType) {
    const amounts = document.querySelectorAll('.plan-price .amount');
    const durations = document.querySelectorAll('.plan-price .period');
    const commitments = document.querySelectorAll('.plan-engagement .duration');
    
    amounts.forEach(amount => {
        if (billingType === 'annual') {
            amount.textContent = amount.dataset.annual;
        } else {
            amount.textContent = amount.dataset.monthly;
        }
    });
    
    durations.forEach(duration => {
        if (billingType === 'annual') {
            duration.textContent = '/year';
        } else {
            duration.textContent = '/month';
        }
    });
    
    commitments.forEach(commitment => {
        if (billingType === 'annual') {
            commitment.textContent = commitment.dataset.annual;
        } else {
            commitment.textContent = commitment.dataset.monthly;
        }
    });
}

/**
 * Smooth Scrolling
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Active Navigation Link
 */
function initActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        // Find which section is in view
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading if not already loaded
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Utility: Show Toast Message
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#4CAF50' : '#FF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Validate Email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate Phone Number (basic)
 */
function validatePhone(phone) {
    // Remove spaces and special characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it has at least 10 digits
    return cleaned.length >= 10;
}

/**
 * Format Phone Number
 */
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    if (value.length > 10) {
        input.value = value.slice(0, 10);
    }
}

/**
 * Analytics - Page View Tracking (Optional)
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID');
    }
}

/**
 * Add styles for animations
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        img.loaded {
            animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

addAnimationStyles();

// Expose utility functions globally for use in other scripts
window.IronForge = {
    showToast,
    validateEmail,
    validatePhone,
    formatPhoneNumber,
    isInViewport
};