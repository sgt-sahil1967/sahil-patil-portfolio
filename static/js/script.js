// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoader();
    initNavigation();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initParallax();
});

// Loading Screen
function initLoader() {
    const loader = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const homeSection = document.getElementById('home');
        const homeSectionHeight = homeSection ? homeSection.offsetHeight : 0;
        
        if (window.scrollY > homeSectionHeight - 100) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('navbar-hidden');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('navbar-hidden');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillCard(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animateElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .project-card, .contact-item, .about-content, .section-header'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill Card Animation
function animateSkillCard(card) {
    const skillItems = card.querySelectorAll('.skill-list li');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Timeline Item Animation
function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    const listItems = item.querySelectorAll('.timeline-body li');
    
    content.style.transform = 'translateX(0)';
    content.style.opacity = '1';
    
    listItems.forEach((li, index) => {
        setTimeout(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Project Card Animation
function animateProjectCard(card) {
    const tags = card.querySelectorAll('.tag');
    
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        counter.textContent = Math.floor(current);
        
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Parallax Effect
function initParallax() {
    const heroSection = document.getElementById('home');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
});

// Contact Form Enhancements
function initContactEnhancements() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize contact enhancements
document.addEventListener('DOMContentLoaded', initContactEnhancements);

// Skills hover animation
document.addEventListener('DOMContentLoaded', function() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        category.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
});

// Add floating animation to timeline markers
document.addEventListener('DOMContentLoaded', function() {
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    
    timelineMarkers.forEach((marker, index) => {
        marker.style.animationDelay = `${index * 0.2}s`;
        marker.classList.add('float-animation');
    });
});

// CSS for additional animations (add to style.css if needed)
const additionalCSS = `
.float-animation {
    animation: markerFloat 3s ease-in-out infinite;
}

@keyframes markerFloat {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

.skill-list li {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

.timeline-body li {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

.tag {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
}

.timeline-content {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.6s ease;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Scroll-based functions here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Theme Cube Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeCube = document.getElementById('themeCube');
    let currentThemeIndex = 0;
    let themes = [];
    let isTransitioning = false;
    
    // Load themes from JSON file
    fetch('/static/themes.json')
        .then(response => response.json())
        .then(data => {
            themes = Object.keys(data).map(key => ({
                name: key,
                ...data[key]
            }));
            console.log('Loaded themes:', themes.length);
        })
        .catch(error => {
            console.error('Error loading themes:', error);
            // Bright fallback themes if JSON fails to load
            themes = [
                {
                    name: 'yellow-theme',
                    background: 'static/images/bg-yellow.webp',
                    colors: {
                        dominant: '#ffeb3b',
                        palette: ['#ffeb3b', '#fdd835', '#f9a825', '#ff6f00', '#ff8f00', '#ffa000']
                    }
                },
                {
                    name: 'orange-theme',
                    background: 'static/images/bg-orange.webp',
                    colors: {
                        dominant: '#ff5722',
                        palette: ['#ff5722', '#ff7043', '#ff8a65', '#ffab40', '#ffcc02', '#ffc107']
                    }
                },
                {
                    name: 'purple-theme',
                    background: 'static/images/bg-purple.webp',
                    colors: {
                        dominant: '#e91e63',
                        palette: ['#e91e63', '#f06292', '#f48fb1', '#ce93d8', '#ba68c8', '#9c27b0']
                    }
                },
                {
                    name: 'blue-theme',
                    background: 'static/images/bg-blue.webp',
                    colors: {
                        dominant: '#00e5ff',
                        palette: ['#00e5ff', '#18ffff', '#64ffda', '#1de9b6', '#00bcd4', '#26c6da']
                    }
                },
                {
                    name: 'green-theme',
                    background: 'static/images/bg-green.webp',
                    colors: {
                        dominant: '#d500f9',
                        palette: ['#d500f9', '#e040fb', '#ea80fc', '#f3e5f5', '#ce93d8', '#ba68c8']
                    }
                }
            ];
        });
    
    function switchTheme() {
        if (isTransitioning || themes.length === 0) return;
        
        isTransitioning = true;
        document.body.classList.add('theme-transitioning');
        
        // Move to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        
        console.log(`Switching to ${newTheme.name}`, newTheme.colors.dominant);
        
        // Update CSS custom properties
        const root = document.documentElement;
        const colors = newTheme.colors;
        
        root.style.setProperty('--current-bg', `url('/${newTheme.background}')`);
        root.style.setProperty('--accent-color', colors.dominant);
        root.style.setProperty('--primary-color', colors.dominant);
        root.style.setProperty('--secondary-color', colors.palette[1] || colors.dominant);
        root.style.setProperty('--theme-secondary', colors.palette[2] || colors.palette[1]);
        root.style.setProperty('--theme-tertiary', colors.palette[3] || colors.palette[0]);
        
        // Update gradient colors
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${colors.dominant} 0%, ${colors.palette[1]} 100%)`);
        root.style.setProperty('--gradient-accent', `linear-gradient(135deg, ${colors.dominant} 0%, ${colors.palette[1]} 100%)`);
        
        // Update shadow colors (extract RGB from hex for rgba)
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };
        
        const dominantRgb = hexToRgb(colors.dominant);
        if (dominantRgb) {
            root.style.setProperty('--shadow-light', `0 5px 15px rgba(${dominantRgb.r}, ${dominantRgb.g}, ${dominantRgb.b}, 0.2)`);
            root.style.setProperty('--shadow-medium', `0 10px 30px rgba(${dominantRgb.r}, ${dominantRgb.g}, ${dominantRgb.b}, 0.3)`);
            root.style.setProperty('--shadow-heavy', `0 20px 60px rgba(${dominantRgb.r}, ${dominantRgb.g}, ${dominantRgb.b}, 0.4)`);
        }
        
        // Update navbar toggler icon color
        const togglerSvg = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='${encodeURIComponent(colors.dominant)}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`;
        root.style.setProperty('--navbar-toggler-icon', togglerSvg);
        
        // Update cube colors to match new theme
        const cubes = themeCube.querySelectorAll('.cube-face');
        cubes.forEach(face => {
            face.style.borderColor = colors.dominant;
            face.style.background = `rgba(${dominantRgb?.r || 255}, ${dominantRgb?.g || 105}, ${dominantRgb?.b || 180}, 0.1)`;
            face.style.boxShadow = `0 0 20px rgba(${dominantRgb?.r || 255}, ${dominantRgb?.g || 105}, ${dominantRgb?.b || 180}, 0.3)`;
        });
        
        const dots = themeCube.querySelectorAll('.cube-dot');
        dots.forEach(dot => {
            dot.style.background = colors.dominant;
            dot.style.boxShadow = `0 0 10px rgba(${dominantRgb?.r || 255}, ${dominantRgb?.g || 105}, ${dominantRgb?.b || 180}, 0.6)`;
        });
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
            isTransitioning = false;
        }, 800);
    }
    
    if (themeCube) {
        themeCube.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9) rotateX(180deg) rotateY(180deg)';
            
            setTimeout(() => {
                // Reset transform
                this.style.transform = 'scale(1) rotateX(45deg) rotateY(45deg)';
                
                // Switch theme
                switchTheme();
                
            }, 150);
        });
        
        // Add hover effect
        themeCube.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        themeCube.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});
