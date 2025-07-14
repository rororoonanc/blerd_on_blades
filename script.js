// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initMobileMenu();
    initMerchFunctionality();
});

// Merch Section Functionality
function initMerchFunctionality() {
    const colorSelect = document.getElementById('colorSelect');
    const productImage = document.getElementById('productImage');
    
    if (colorSelect && productImage) {
        colorSelect.addEventListener('change', function() {
            // Update product image based on color selection
            if (this.value === 'black') {
                productImage.src = 'images and vids/clothes.jpg';
                productImage.alt = 'Blerd Gang Shirts - Black';
            } else if (this.value === 'white') {
                productImage.src = 'images and vids/clothes.jpg';
                productImage.alt = 'Blerd Gang Shirts - White';
            }
        });
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        let currentValue = parseInt(quantityInput.value) || 1;
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        let currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }
}

function proceedToCheckout() {
    const colorSelect = document.getElementById('colorSelect');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]:checked');
    const quantity = document.getElementById('quantity').value;
    
    // Validation
    if (!colorSelect.value) {
        showNotification('Please select a color option.', 'error');
        return;
    }
    
    if (sizeCheckboxes.length === 0) {
        showNotification('Please select at least one size.', 'error');
        return;
    }
    
    // Collect selected data
    const selectedColor = colorSelect.value;
    const selectedSizes = Array.from(sizeCheckboxes).map(cb => cb.value);
    const selectedQuantity = quantity;
    
    // Calculate price
    const basePrice = selectedColor === 'black' ? 25.00 : 40.00;
    const totalPrice = basePrice * selectedQuantity * selectedSizes.length;
    
    // Create order summary
    const orderSummary = `
        Order Summary:
        Product: Blerd Gang Shirts (${selectedColor})
        Sizes: ${selectedSizes.join(', ')}
        Quantity per size: ${selectedQuantity}
        Total items: ${selectedQuantity * selectedSizes.length}
        Total price: $${totalPrice.toFixed(2)}
    `;
    
    // Show confirmation and redirect
    if (confirm(orderSummary + '\n\nProceed to external checkout?')) {
        // Redirect to external store
        window.open('https://linktr.ee/BlerdGaming', '_blank');
    }
}

// Reel Carousel Functionality
let currentReelIndex = 0;
const totalReels = 6;

function changeReel(direction) {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    const reelItems = document.querySelectorAll('.reel-item');
    
    // Remove active class from current reel and dot
    reelItems[currentReelIndex].classList.remove('active');
    dots[currentReelIndex].classList.remove('active');
    
    // Update index
    currentReelIndex += direction;
    
    // Handle wrapping
    if (currentReelIndex >= totalReels) {
        currentReelIndex = 0;
    } else if (currentReelIndex < 0) {
        currentReelIndex = totalReels - 1;
    }
    
    // Add active class to new reel and dot
    reelItems[currentReelIndex].classList.add('active');
    dots[currentReelIndex].classList.add('active');
    
    // Move the track
    const translateX = -currentReelIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
}

function currentReel(index) {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    const reelItems = document.querySelectorAll('.reel-item');
    
    // Remove active class from current reel and dot
    reelItems[currentReelIndex].classList.remove('active');
    dots[currentReelIndex].classList.remove('active');
    
    // Update index (convert from 1-based to 0-based)
    currentReelIndex = index - 1;
    
    // Add active class to new reel and dot
    reelItems[currentReelIndex].classList.add('active');
    dots[currentReelIndex].classList.add('active');
    
    // Move the track
    const translateX = -currentReelIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
}

// Auto-advance carousel every 8 seconds
setInterval(() => {
    changeReel(1);
}, 8000);

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeReel(-1);
    } else if (event.key === 'ArrowRight') {
        changeReel(1);
    }
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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
}

// Scroll effects
function initScrollEffects() {
    // Navbar background on scroll with animation
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // Add background when scrolled down
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const teachingSection = document.querySelector('#teaching');
            if (teachingSection) {
                const offsetTop = teachingSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Animate scroll indicator
        setInterval(() => {
            scrollIndicator.style.transform = 'translateY(10px)';
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateY(0)';
            }, 500);
        }, 2000);
    }
    
    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100); // Stagger animations
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.teaching-card, .product-showcase, .contact-item, .section-header, .reel-carousel');
    animateElements.forEach(el => {
        el.classList.add('page-transition');
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Add smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real implementation, you would send the data to a server
            // Example: submitFormData(name, email, message);
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Modal Functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.modal-close');
    const bookingForm = document.getElementById('bookingForm');
    
    // Close modal when clicking the X
    closeBtn.addEventListener('click', closeBookingModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeBookingModal();
        }
    });
    
    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const sessionType = formData.get('sessionType');
        const preferredDate = formData.get('preferredDate');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !phone || !sessionType || !preferredDate || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Create email subject and body for Gmail
        const subject = encodeURIComponent('New Skating Lesson Booking Request');
        const emailBody = encodeURIComponent(
            `Hi Darius,\n\n` +
            `I would like to book a skating lesson with the following details:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Session Type: ${sessionType}\n` +
            `Preferred Date: ${preferredDate}\n\n` +
            `Message:\n${message}\n\n` +
            `Please let me know your availability.\n\n` +
            `Best regards,\n${name}`
        );
        
        // Create Gmail compose URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=BlerdOnBlades@gmail.com&su=${subject}&body=${emailBody}`;
        
        // Open Gmail in a new tab
        window.open(gmailUrl, '_blank');
        
        // Show success message and close modal
        showNotification('Opening Gmail to send your booking request!', 'success');
        setTimeout(() => {
            bookingForm.reset();
            closeBookingModal();
        }, 1000);
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#dc2626' : '#991b1b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}



// Smooth scroll for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.textContent = 'Blerd on Blades';
    loaderText.style.cssText = `
        color: #dc2626;
        font-size: 2rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        animation: pulse 1.5s infinite;
    `;
    
    loader.appendChild(loaderText);
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loader after a short delay
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }, 1000);
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);
