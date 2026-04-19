/**
 * Kern Programming Language Website
 * Minimal JavaScript for interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const scrollProgress = document.getElementById('scrollProgress');
    const updateScrollProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    };
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.getElementById('backToTop');
    const updateBackToTop = () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // FLOATING SHAPES MOUSE INTERACTION
    // ========================================
    const floatingShapes = document.getElementById('floatingShapes');
    const shapes = document.querySelectorAll('.shape');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.01;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ========================================
    // ENHANCED PARALLAX EFFECT
    // ========================================
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.querySelector('.hero-particles');
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const contentSpeed = 0.3;
        const particleSpeed = 0.7;
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * contentSpeed}px)`;
        }
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * particleSpeed}px)`;
        }
    };
    
    // ========================================
    // COMBINED SCROLL HANDLER
    // ========================================
    let ticking = false;
    const handleScroll = () => {
        updateScrollProgress();
        updateBackToTop();
        updateParallax();
        
        // Update navbar (existing functionality)
        const navbar = document.getElementById('navbar');
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };
    
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
            });
            ticking = true;
        }
    }, { passive: true });
    
    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Press 'h' to go home
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.getElementById('navToggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
    
    // ========================================
    // REDUCED MOTION PREFERENCE
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.style.animation = 'none';
        shapes.forEach(shape => {
            shape.style.animation = 'none';
        });
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Helper function to animate elements on scroll
    const animateOnScroll = (selector, delay = 0.1, stagger = 0.1) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * stagger + delay}s, transform 0.6s ease ${index * stagger + delay}s`;
            observer.observe(el);
        });
    };
    
    // Animate all card types
    animateOnScroll('.feature-card', 0, 0.1);
    animateOnScroll('.download-card', 0, 0.15);
    animateOnScroll('.step-card', 0, 0.15);
    animateOnScroll('.donate-card', 0, 0.1);
    animateOnScroll('.usecase-card', 0, 0.1);
    
    // Code window animation (with scale effect)
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        codeWindow.style.opacity = '0';
        codeWindow.style.transform = 'translateY(40px) scale(0.98)';
        codeWindow.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        codeObserver.observe(codeWindow);
    }
    
    
    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                heroSubtitle.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }
    
    // ========================================
    // INTERACTIVE MOUSE EFFECTS
    // ========================================
    
    // Magnetic button effect (uses CSS custom property for transform)
    document.querySelectorAll('.btn-primary, .btn-download').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
            
            btn.style.setProperty('--magnetic-x', `${x}px`);
            btn.style.setProperty('--magnetic-y', `${y}px`);
            btn.style.transform = `translate(var(--magnetic-x, 0), var(--magnetic-y, 0))`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.removeProperty('--magnetic-x');
            btn.style.removeProperty('--magnetic-y');
            btn.style.transform = '';
        });
    });
    
    // 3D Tilt effect for cards (only if not on touch device)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
        document.querySelectorAll('.feature-card, .step-card, .donate-card, .usecase-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.setProperty('--tilt-x', `${rotateX}deg`);
                card.style.setProperty('--tilt-y', `${rotateY}deg`);
                card.style.transform = `perspective(1000px) rotateX(var(--tilt-x, 0)) rotateY(var(--tilt-y, 0)) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--tilt-x');
                card.style.removeProperty('--tilt-y');
                card.style.transform = '';
            });
        });
    }
    
    // Sparkle trail effect in hero section
    const hero = document.querySelector('.hero');
    let lastSparkle = 0;
    const SPARKLE_INTERVAL = 50; // ms between sparkles
    
    if (hero && !isTouchDevice) {
        hero.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastSparkle < SPARKLE_INTERVAL) return;
            
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
            lastSparkle = now;
        }, { passive: true });
    }
    
    // ========================================
    // DOWNLOAD BUTTON LOADING ANIMATIONS
    // ========================================
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Skip if button is disabled or already loading
            if (btn.disabled || btn.classList.contains('loading')) return;
            
            // Add loading state
            btn.classList.add('loading');
            const originalText = btn.innerHTML;
            
            // Simulate download preparation
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.innerHTML = originalText;
                
                // Show success feedback
                const originalBg = btn.style.background;
                btn.style.background = 'var(--success)';
                btn.innerHTML = '✓ Downloaded';
                
                setTimeout(() => {
                    btn.style.background = originalBg;
                    btn.innerHTML = originalText;
                }, 2000);
            }, 1500);
        });
    });
    
    // Copy to clipboard for donate section
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const address = btn.previousElementSibling.textContent;
            navigator.clipboard.writeText(address).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
    
    // Code tabs functionality
    const tabButtons = document.querySelectorAll('.code-tab-btn');
    const tabContents = document.querySelectorAll('.code-tab-content');
    const codeFilename = document.getElementById('code-filename');
    
    const filenames = {
        'hello': 'hello.kn',
        'functions': 'functions.kn',
        'match': 'match.kn',
        'game': 'game.kn',
        'unsafe': 'unsafe_demo.kn',
        'reference': 'Language Reference'
    };
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update button states
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
            
            // Update filename
            if (codeFilename && filenames[tabId]) {
                codeFilename.textContent = filenames[tabId];
            }
        });
    });
    
    // Download tabs functionality
    const downloadTabButtons = document.querySelectorAll('.download-tab-btn');
    const downloadTabContents = document.querySelectorAll('.download-tab-content');
    
    downloadTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update button states
            downloadTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content visibility
            downloadTabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
});
