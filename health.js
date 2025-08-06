// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const startCheckupBtn = document.getElementById('start-checkup');
const startJourneyBtn = document.getElementById('start-journey');
const watchDemoBtn = document.getElementById('watch-demo');
const finalCtaBtn = document.getElementById('final-cta');
const playButton = document.getElementById('play-button');
// const playButton1 = document.getElementById('play-button1');
const videoPlaceholder = document.getElementById('video-placeholder');
// const videoPlaceholder1 = document.getElementById('video-placeholder1');
const demoVideo = document.getElementById('demo-video');
// const demoVideo1 = document.getElementById('demo-video1');
const videoContainer = document.getElementById('video-container');
// const videoContainer1 = document.getElementById('video-container1');
const checkupModal = document.getElementById('checkup-modal');
const modalClose = document.getElementById('modal-close');
const heartRateElement = document.getElementById('heart-rate');
const heartCanvas = document.getElementById('heartbeat-canvas');

// Custom cursor elements
let customCursor;
let cursorTrails = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    createCustomCursor();
    initializeParticleSystem();
    initializeAnimations();
    setupEventListeners();
    initializeCharts();
    startCounterAnimations();
    drawHeartbeatLine();
    initializeAdvancedEffects();
});

// Create Custom Cursor
function createCustomCursor() {
    // Main cursor
    customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);
    
    // Cursor trails
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'custom-cursor-trail';
        document.body.appendChild(trail);
        cursorTrails.push({
            element: trail,
            x: 0,
            y: 0,
            delay: i * 50
        });
    }
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        
        // Update trails with delay
        cursorTrails.forEach((trail, index) => {
            setTimeout(() => {
                trail.element.style.left = e.clientX + 'px';
                trail.element.style.top = e.clientY + 'px';
                trail.element.style.opacity = 0.7 - (index * 0.1);
            }, trail.delay);
        });
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('button, a, .dashboard-card, .nav-link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
        });
    });
}

// Initialize Particle System
function initializeParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(particleContainer);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: floatUp ${duration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: ${Math.random() * 0.5 + 0.2};
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createFloatingParticle(container);
    }, (duration + delay) * 1000);
}

// Initialize Advanced Effects
function initializeAdvancedEffects() {
    // Magnetic buttons effect
    initializeMagneticButtons();
    
    // Parallax scrolling
    initializeParallaxScrolling();
    
    // Advanced hover effects
    initializeAdvancedHovers();
    
    // Tilt effects
    initializeTiltEffects();
}

// Magnetic Buttons Effect
function initializeMagneticButtons() {
    const magneticElements = document.querySelectorAll('.primary-button, .secondary-button, .cta-button');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

// Parallax Scrolling
function initializeParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Advanced Hover Effects
function initializeAdvancedHovers() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('.health-dashboard');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger?.addEventListener('click', toggleMobileMenu);
    
    // CTA buttons
    startCheckupBtn?.addEventListener('click', openCheckupModal);
    startJourneyBtn?.addEventListener('click', openCheckupModal);
    finalCtaBtn?.addEventListener('click', openCheckupModal);
    
    // Demo video
    watchDemoBtn?.addEventListener('click', scrollToDemo);
    playButton?.addEventListener('click', playDemoVideo);
    videoPlaceholder?.addEventListener('click', playDemoVideo);
    
    // Modal
    modalClose?.addEventListener('click', closeCheckupModal);
    checkupModal?.addEventListener('click', function(e) {
        if (e.target === checkupModal) {
            closeCheckupModal();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Intersection Observer for animations
    setupIntersectionObserver();
    
    // Advanced interaction effects
    setupAdvancedInteractions();
}

// Setup Advanced Interactions
function setupAdvancedInteractions() {
    // Ripple effect on buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Shake effect on hover for important elements
    const shakeElements = document.querySelectorAll('.logo, .health-icon');
    shakeElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'shake 0.5s ease-in-out';
        });
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    });
}

// Create Ripple Effect
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Add bounce effect
    hamburger.style.animation = 'bounce 0.5s ease';
    setTimeout(() => {
        hamburger.style.animation = '';
    }, 500);
}

// Modal Functions
function openCheckupModal() {
    checkupModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation to modal content
    const modalContent = checkupModal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Create confetti effect
    createConfettiEffect();
}

// Create Confetti Effect
function createConfettiEffect() {
    const colors = ['#2563eb', '#0d9488', '#10b981', '#00d4ff', '#00ff88'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                z-index: 10000;
                border-radius: 50%;
                animation: confettiFall 3s ease-out forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

function closeCheckupModal() {
    const modalContent = checkupModal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideOut 0.4s ease-out';
    
    setTimeout(() => {
        checkupModal.classList.remove('show');
        document.body.style.overflow = '';
    }, 400);
}

// Demo Video Functions
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add highlight effect
        demoSection.style.animation = 'highlight 2s ease-out';
        setTimeout(() => {
            demoSection.style.animation = '';
        }, 2000);
    }
}

function playDemoVideo() {
    // Hide placeholder and show video
    videoPlaceholder.style.display = 'none';
    demoVideo.style.display = 'block';
    demoVideo.play();
    
    // Add video play effect
    demoVideo.style.animation = 'videoZoomIn 0.5s ease-out';
    
    // Add event listener for when video ends
    demoVideo.addEventListener('ended', function() {
        videoPlaceholder.style.display = 'flex';
        demoVideo.style.display = 'none';
        demoVideo.currentTime = 0;
        demoVideo.style.animation = '';
    });
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 5px 30px rgba(37, 99, 235, 0.2)';
        header.style.backdropFilter = 'blur(30px) saturate(180%)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(20px) saturate(180%)';
    }
}

// Initialize Animations
function initializeAnimations() {
    // Animate heart rate value
    animateHeartRate();
    
    // Animate wellness score
    animateWellnessScore();
    
    // Animate trend bars
    animateTrendBars();
    
    // Start floating animations
    startFloatingAnimations();
}

// Heart Rate Animation
function animateHeartRate() {
    if (!heartRateElement) return;
    
    let currentRate = 65;
    const targetRate = 72;
    
    const animate = () => {
        if (currentRate < targetRate) {
            currentRate++;
            heartRateElement.textContent = currentRate;
            setTimeout(animate, 100);
        }
    };
    
    setTimeout(animate, 1000);
}

// Wellness Score Animation
function animateWellnessScore() {
    const scoreElement = document.querySelector('.progress-value');
    const circularProgress = document.getElementById('wellness-score');
    
    if (!scoreElement || !circularProgress) return;
    
    let currentScore = 0;
    const targetScore = 85;
    
    const animate = () => {
        if (currentScore < targetScore) {
            currentScore++;
            scoreElement.textContent = currentScore + '%';
            
            // Update circular progress
            const degrees = (currentScore / 100) * 360;
            circularProgress.style.background = `conic-gradient(var(--accent-green) 0deg ${degrees}deg, var(--light-gray) ${degrees}deg)`;
            
            setTimeout(animate, 30);
        }
    };
    
    setTimeout(animate, 1500);
}

// Trend Bars Animation
function animateTrendBars() {
    const trendFills = document.querySelectorAll('.trend-fill');
    
    trendFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.style.width;
            fill.style.width = '0%';
            fill.offsetHeight; // Trigger reflow
            fill.style.width = width;
        }, 2000 + (index * 200));
    });
}

// Floating Animations
function startFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize Charts
function initializeCharts() {
    drawHeartChart();
}

// Heart Chart Drawing
function drawHeartChart() {
    const canvas = document.getElementById('heart-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2; // High DPI
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    const realWidth = width / 2;
    const realHeight = height / 2;
    
    // Generate heart rate data
    const dataPoints = [];
    for (let i = 0; i < 50; i++) {
        const baseValue = 0.5;
        const variation = Math.sin(i * 0.3) * 0.2 + Math.random() * 0.1;
        dataPoints.push(baseValue + variation);
    }
    
    // Draw the chart
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    dataPoints.forEach((point, index) => {
        const x = (index / (dataPoints.length - 1)) * realWidth;
        const y = realHeight - (point * realHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Animate the chart
    let animationProgress = 0;
    const animateChart = () => {
        ctx.clearRect(0, 0, realWidth, realHeight);
        
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const visiblePoints = Math.floor(dataPoints.length * animationProgress);
        
        for (let i = 0; i <= visiblePoints; i++) {
            const point = dataPoints[i];
            const x = (i / (dataPoints.length - 1)) * realWidth;
            const y = realHeight - (point * realHeight);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        if (animationProgress < 1) {
            animationProgress += 0.02;
            requestAnimationFrame(animateChart);
        }
    };
    
    setTimeout(animateChart, 2500);
}

// Heartbeat Line Animation
function drawHeartbeatLine() {
    if (!heartCanvas) return;
    
    const ctx = heartCanvas.getContext('2d');
    const width = heartCanvas.width = window.innerWidth;
    const height = heartCanvas.height = window.innerHeight;
    
    let time = 0;
    
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Draw animated heartbeat line
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < width; x += 2) {
            const baseY = height * 0.7;
            let y = baseY;
            
            // Create heartbeat pattern
            const heartbeatX = (x + time) % 200;
            if (heartbeatX > 50 && heartbeatX < 70) {
                y += Math.sin((heartbeatX - 50) * Math.PI / 20) * 30;
            } else if (heartbeatX > 70 && heartbeatX < 90) {
                y -= Math.sin((heartbeatX - 70) * Math.PI / 20) * 50;
            }
            
            // Add some noise
            y += Math.sin(x * 0.01 + time * 0.02) * 5;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        time += 2;
        requestAnimationFrame(animate);
    };
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        heartCanvas.width = window.innerWidth;
        heartCanvas.height = window.innerHeight;
    });
}

// Counter Animations
function startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .demo-content, .section-header');
    animateElements.forEach(el => observer.observe(el));
}

// Utility Functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(handleHeaderScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px) rotate(-2deg); }
        75% { transform: translateX(5px) rotate(2deg); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes highlight {
        0%, 100% { 
            box-shadow: none;
        }
        50% { 
            box-shadow: 0 0 50px rgba(37, 99, 235, 0.5);
        }
    }
    
    @keyframes videoZoomIn {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes modalSlideOut {
        from {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        to {
            transform: scale(0.7) translateY(-100px);
            opacity: 0;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
        background: linear-gradient(45deg, var(--primary-blue), var(--neon-blue));
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
        background: linear-gradient(45deg, var(--primary-blue), var(--neon-blue));
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
            padding: 1rem;
            gap: 1rem;
            border-radius: 0 0 1rem 1rem;
            animation: mobileMenuSlide 0.3s ease-out;
        }
    }
    
    @keyframes mobileMenuSlide {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add loading states for interactive elements
function addLoadingState(element) {
    element.classList.add('loading');
    setTimeout(() => {
        element.classList.remove('loading');
    }, 2000);
}

// Error handling for video
if (demoVideo) {
    demoVideo.addEventListener('error', function() {
        console.warn('Video failed to load, showing fallback content');
        videoPlaceholder.innerHTML = `
            <div class="video-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Demo Video Coming Soon</h3>
                <p>We're preparing an amazing AI-generated walkthrough for you!</p>
            </div>
        `;
    });
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && checkupModal.classList.contains('show')) {
        closeCheckupModal();
    }
    
    // Space bar to play video
    if (e.key === ' ' && document.activeElement === playButton) {
        e.preventDefault();
        playDemoVideo();
    }
});

// Add focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Initialize focus trap when modal opens
const originalOpenModal = openCheckupModal;
openCheckupModal = function() {
    originalOpenModal();
    setTimeout(() => trapFocus(checkupModal), 100);
};

// Console welcome message
console.log(`
🩺 Welcome to VitalView - AI-Enhanced Health Platform
───────────────────────────────────────────────────
Created with modern web technologies and smooth animations.
For support, visit our help center or contact our team.
`);
// /** @jsxImportSource vue */
// import { motion } from 'motion-v'
// import { ref } from 'vue'

// const activeDirection = ref<'x' | 'y' | null>(null)


// function Line(props: { direction: 'x' | 'y', activeDirection: 'x' | 'y' | null }) {
//     return (
//         <motion.div
//             initial={false}
//             animate={{ opacity: props.activeDirection === props.direction ? 1 : 0.3 }}
//             transition={{ duration: 0.1 }}
//             style={{rotate: props.direction === 'y' ? 90 : 0 }}
//             class="line"
//         />
//     )
// }
