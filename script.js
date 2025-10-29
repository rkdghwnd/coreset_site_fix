// ==========================================
// Navigation
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect (Apple Style)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// Smooth Scroll with Offset
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Fade-in Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ==========================================
// FAQ Accordion
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// Media Tabs
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can replace this with actual form submission)
        alert('문의가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.');
        
        // Reset form
        contactForm.reset();
        
        // In production, you would send the data to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('문의가 성공적으로 전송되었습니다!');
            contactForm.reset();
        })
        .catch(error => {
            alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        });
        */
    });
}

// ==========================================
// Network Animation Enhancement
// ==========================================
const networkAnimation = document.querySelector('.network-animation');

if (networkAnimation) {
    // Create animated particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        networkAnimation.appendChild(particle);
    }
}

// ==========================================
// Counter Animation for Stats
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        if (target >= 1000000000000) {
            element.textContent = (current / 1000000000000).toFixed(1) + '조원+';
        } else if (element.textContent.includes('$')) {
            element.textContent = '$' + (current / 1000000000000).toFixed(1) + 'T';
        } else if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '-' + (Math.floor(current) + 2) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            
            entry.target.dataset.animated = 'true';
            
            if (text.includes('4,000조원')) {
                animateCounter(h3, 4000);
            } else if (text.includes('$23.4T')) {
                animateCounter(h3, 23.4);
            } else if (text.includes('60+')) {
                animateCounter(h3, 60);
            } else if (text.includes('95-97%')) {
                animateCounter(h3, 95);
            } else if (text.includes('3개')) {
                animateCounter(h3, 3);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card, .fund-circle').forEach(card => {
    statObserver.observe(card);
});

// ==========================================
// Button Click Effects
// ==========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Timeline Animation
// ==========================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transition = 'all 0.6s ease-out';
    
    if (index % 2 === 0) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    
    timelineObserver.observe(item);
});

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ==========================================
// Card Hover 3D Effect
// ==========================================
document.querySelectorAll('.content-card, .patent-card, .start-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==========================================
// Active Navigation Highlight
// ==========================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Loading Animation
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger hero animations
    document.querySelector('.hero-content').style.animation = 'fadeInUp 1s ease-out';
});

// ==========================================
// Scroll to Top Button (Optional)
// ==========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0066FF 0%, #00D4FF 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ==========================================
// Console Message (Easter Egg)
// ==========================================
console.log('%c🚀 CoReset - 데이터 주권과 디지털 자산의 미래', 'color: #0066FF; font-size: 20px; font-weight: bold;');
console.log('%c특허 기반 혁신 솔루션으로 모두가 주인이 되는 디지털 경제', 'color: #00D4FF; font-size: 14px;');
console.log('%c관심 가져주셔서 감사합니다!', 'color: #333; font-size: 12px;');

// ==========================================
// Performance Optimization
// ==========================================
// Lazy load images if any are added later
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

// ==========================================
// Browser Compatibility Check
// ==========================================
if (!window.CSS || !CSS.supports('backdrop-filter', 'blur(10px)')) {
    // Fallback for browsers that don't support backdrop-filter
    document.querySelectorAll('[style*="backdrop-filter"]').forEach(el => {
        el.style.background = 'rgba(255, 255, 255, 0.95)';
    });
}

// ==========================================
// Analytics Event Tracking (Placeholder)
// ==========================================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // In production, integrate with Google Analytics, Mixpanel, etc.
    console.log('Event:', category, action, label);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('Button', 'Click', this.textContent.trim());
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.tracked) {
            trackEvent('Section', 'View', entry.target.id);
            entry.target.dataset.tracked = 'true';
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ==========================================
// Accessibility Enhancements
// ==========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Space or Enter to toggle FAQ items
    if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('faq-question')) {
        e.preventDefault();
        e.target.click();
    }
});

// Add ARIA labels dynamically
navLinks.forEach(link => {
    const text = link.textContent.trim();
    link.setAttribute('aria-label', `${text} 섹션으로 이동`);
});

// ==========================================
// Print Styles Handler
// ==========================================
window.addEventListener('beforeprint', () => {
    // Expand all FAQ items before printing
    faqItems.forEach(item => {
        item.classList.add('active');
    });
});

window.addEventListener('afterprint', () => {
    // Collapse FAQ items after printing
    faqItems.forEach(item => {
        item.classList.remove('active');
    });
});

