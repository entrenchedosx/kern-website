/**
 * Kern Programming Language Website
 * Minimal JavaScript for interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    alert('JavaScript is loading! You should see this message.');
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                // Open GitHub docs search with query
                window.open(`https://github.com/entrenchedosx/kern/search?q=${encodeURIComponent(query)}&type=code`, '_blank');
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
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
    
    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    };
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
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
    
    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
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
