// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].classList.toggle('active');
            spans[1].classList.toggle('active');
            spans[2].classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = document.querySelectorAll('.mobile-menu-btn span');
            spans.forEach(span => span.classList.remove('active'));
        });
    });
    
    // Enquiry form submission
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            
            // Create a pre-filled WhatsApp message
            const message = `Hello, I'm ${name} interested in joining ABC Coaching Institute for ${course}. Please share details. My phone: ${phone}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/917093444739?text=${encodedMessage}`;
            
            // Open WhatsApp with the pre-filled message
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            enquiryForm.reset();
            
            // Show success message
            showSuccessMessage('Enquiry sent successfully!');
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            
            // Create a pre-filled WhatsApp message
            const message = `Hello, ${fullName} would like to get in touch with ABC Coaching Institute. Phone: ${phone}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/917093444739?text=${encodedMessage}`;
            
            // Open WhatsApp with the pre-filled message
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showSuccessMessage('Message sent successfully!');
        });
    }
    
    // Add animation to feature cards when they come into view
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    featureCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #3498db, #2c3e50);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Function to show success message
function showSuccessMessage(message) {
    // Remove any existing messages
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'success-message';
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(msgDiv);
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        msgDiv.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            msgDiv.remove();
        }, 300);
    }, 3000);
}

// Countdown Timer for Admissions
function updateCountdown() {
    // Set the date for admissions closing (5 days from now as requested)
    const admissionCloseDate = new Date();
    admissionCloseDate.setDate(admissionCloseDate.getDate() + 5);
    
    const now = new Date().getTime();
    const distance = admissionCloseDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in elements with corresponding IDs
    if (document.getElementById('days')) {
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    }
    if (document.getElementById('hours')) {
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    }
    if (document.getElementById('minutes')) {
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    }
    if (document.getElementById('seconds')) {
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(countdownInterval);
        const timerHeaders = document.querySelectorAll('.admission-timer h3');
        timerHeaders.forEach(header => {
            header.innerHTML = 'Admissions Closed!';
        });
    }
}

// Update the countdown every 1 second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initialize the countdown
updateCountdown();