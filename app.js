// Jasim & Ali Car Cooling System - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initMobileMenu();
    initAnimations();
});

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scroll for Navigation Links
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
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-menu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// Send to WhatsApp Function
function sendToWhatsapp(event) {
    event.preventDefault();
    
    // Get form values by IDs
    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const car = document.getElementById('bookingCar').value.trim();
    const service = document.getElementById('bookingService').value;
    const date = document.getElementById('bookingDate').value;
    const notes = document.getElementById('bookingNotes').value.trim();
    
    // Debug: Log values to console
    console.log('Form Data:');
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Car:', car);
    console.log('Service:', service);
    console.log('Date:', date);
    console.log('Notes:', notes);
    
    // Validate required fields
    if (!name || !phone || !car || !service || !date) {
        showNotification('يرجى ملء جميع الحقول المطلوبة!', 'error');
        return;
    }
    
    // Format date for display
    const formattedDate = formatDate(date);
    
    // Create WhatsApp message
    const message = `*طلب حجز موعد - جاسم وعلي لتبريد السيارات*

*الاسم:* ${name}
*الهاتف:* ${phone}
*نوع السيارة:* ${car}
*الخدمة المطلوبة:* ${service}
*الموعد:* ${formattedDate}
*ملاحظات:* ${notes || 'لا توجد ملاحظات'}

---
تم إرسال الطلب من الموقع`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '9647716515909';
    
    // Show success notification
    showNotification('جاري إرسال الطلب عبر واتساب...', 'info');
    
    // Open WhatsApp with message
    setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        showNotification('تم إرسال طلب الحجز بنجاح!', 'success');
    }, 500);
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    return false;
}

// Format date helper function
function formatDate(dateString) {
    if (!dateString) return 'غير محدد';
    
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('ar-SA', options);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .car-card, .step-item, .gallery-item, .info-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #0d1b2a 0%, #1a2634 100%);
            flex-direction: column;
            padding: 20px;
            gap: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            animation: slideDown 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 30px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            font-weight: 600;
            font-family: 'Cairo', sans-serif;
        }
        
        .notification.success .notification-content {
            border-right: 4px solid #28a745;
        }
        
        .notification.success i {
            color: #28a745;
            font-size: 24px;
        }
        
        .notification.error .notification-content {
            border-right: 4px solid #dc3545;
        }
        
        .notification.error i {
            color: #dc3545;
            font-size: 24px;
        }
        
        .notification.info .notification-content {
            border-right: 4px solid #00b4d8;
        }
        
        .notification.info i {
            color: #00b4d8;
            font-size: 24px;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, -10px);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
    }
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Trigger counter animation when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
}

// Lazy Loading Images (if real images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Car Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Call lazy loading
lazyLoadImages();


