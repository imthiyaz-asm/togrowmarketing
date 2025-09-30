// ========================================
// NAVIGATION
// ========================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(title, description, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ========================================
// COURSE PURCHASE HANDLER
// ========================================

function handleBuyNow(courseName, price) {
    // Show first toast - redirecting to payment
    showToast(
        'Redirecting to payment',
        `${courseName} - ${price}. Choose from GPay, Paytm, or UPI`,
        3000
    );
    
    // Show second toast after 1 second
    setTimeout(() => {
        showToast(
            'Payment Gateway',
            'In a production app, this would open GPay/Paytm/UPI payment options',
            4000
        );
    }, 1000);
    
    // In a real application, this would integrate with actual payment gateways:
    // - Google Pay (GPay)
    // - Paytm
    // - UPI (Unified Payments Interface)
    // 
    // Example implementation would redirect to payment gateway:
    // window.location.href = `payment-gateway.html?course=${encodeURIComponent(courseName)}&price=${encodeURIComponent(price)}`;
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all course cards, testimonial cards, and feature items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.course-card, .testimonial-card, .feature-item, .contact-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// ========================================
// PREVENT SCROLL JANK
// ========================================

// Passive event listeners for better scroll performance
let supportsPassive = false;
try {
    const opts = Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true;
        }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
} catch (e) {}

const passiveSupported = supportsPassive ? { passive: true } : false;

document.addEventListener('touchstart', function() {}, passiveSupported);
document.addEventListener('touchmove', function() {}, passiveSupported);

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// Apply focus trap when mobile menu is active
const mobileLMenu = document.getElementById('mobileMenu');
if (mobileMenu) {
    trapFocus(mobileMenu);
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%cLearnHub - eLearning Platform', 'color: #4361ee; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8e54e9; font-size: 14px;');
console.log('%cReady to transform your future with quality online learning!', 'color: #ff7340; font-size: 12px;');