/**
 * Kern Programming Language Website
 * Minimal JavaScript for interactions
 */

document.addEventListener('DOMContentLoaded', () => {
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
    
    // Code copy functionality
    const codeCopyBtn = document.getElementById('code-copy-btn');
    if (codeCopyBtn) {
        codeCopyBtn.addEventListener('click', async () => {
            const activeTab = document.querySelector('.code-tab-content.active');
            if (activeTab) {
                const codeText = activeTab.textContent || activeTab.innerText;
                
                try {
                    await navigator.clipboard.writeText(codeText.trim());
                    
                    // Visual feedback
                    const originalText = codeCopyBtn.querySelector('.copy-text').textContent;
                    codeCopyBtn.querySelector('.copy-text').textContent = 'Copied!';
                    codeCopyBtn.classList.add('copied');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        codeCopyBtn.querySelector('.copy-text').textContent = originalText;
                        codeCopyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            }
        });
    }
    
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
    
    // Code copy functionality
    const codeCopyBtn = document.getElementById('code-copy-btn');
    if (codeCopyBtn) {
        codeCopyBtn.addEventListener('click', async () => {
            const activeTab = document.querySelector('.code-tab-content.active');
            if (activeTab) {
                const codeText = activeTab.textContent || activeTab.innerText;
                
                try {
                    await navigator.clipboard.writeText(codeText.trim());
                    
                    // Visual feedback
                    const originalText = codeCopyBtn.querySelector('.copy-text').textContent;
                    codeCopyBtn.querySelector('.copy-text').textContent = 'Copied!';
                    codeCopyBtn.classList.add('copied');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        codeCopyBtn.querySelector('.copy-text').textContent = originalText;
                        codeCopyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            }
        });
    }
    
    // ========================================
    // THEME TOGGLE
    // ========================================
    
    // Theme management
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme or system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    
    // Set theme
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button icon
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        
        if (theme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };
    
    // Initialize theme
    setTheme(getPreferredTheme());
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // ========================================
    // DYNAMIC CONTENT
    // ========================================
    
    // Fetch GitHub stars count
    const fetchGitHubStars = async () => {
        const githubStarsElement = document.querySelector('.github-stars span');
        if (githubStarsElement) {
            try {
                const response = await fetch('https://api.github.com/repos/entrenchedosx/kern');
                if (response.ok) {
                    const data = await response.json();
                    const stars = data.stargazers_count;
                    githubStarsElement.textContent = `${stars} Stars`;
                }
            } catch (error) {
                console.log('Could not fetch GitHub stars:', error);
                // Keep default text
            }
        }
    };
    
    // Fetch stars on page load
    fetchGitHubStars();
    
    // ========================================
    // KEYBOARD SHORTCUTS & ACCESSIBILITY
    // ========================================
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Only trigger shortcuts when not typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Ctrl/Cmd + K: Focus search (if we add search later)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Future: Focus search input
        }
        
        // Ctrl/Cmd + Shift + T: Toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.click();
            }
        }
        
        // Ctrl/Cmd + C: Copy code when code tab is active
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && e.shiftKey) {
            e.preventDefault();
            const codeCopyBtn = document.getElementById('code-copy-btn');
            if (codeCopyBtn) {
                codeCopyBtn.click();
            }
        }
        
        // Number keys 1-6: Switch code tabs
        if (e.key >= '1' && e.key <= '6' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const tabButtons = document.querySelectorAll('.code-tab-btn');
            const tabIndex = parseInt(e.key) - 1;
            if (tabButtons[tabIndex]) {
                tabButtons[tabIndex].click();
            }
        }
        
        // G: Go to sections
        if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const sections = ['features', 'usecases', 'code', 'download', 'donate'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                return element && element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0;
            });
            
            const currentIndex = currentSection ? sections.indexOf(currentSection) : -1;
            const nextIndex = (currentIndex + 1) % sections.length;
            
            const nextSection = document.getElementById(sections[nextIndex]);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Escape: Close mobile menu if open
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const navToggle = document.getElementById('navToggle');
                if (navToggle) {
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    });
    
    // Add skip to main content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    document.querySelectorAll('.code-tab-btn').forEach((btn, index) => {
        btn.setAttribute('aria-label', `Show code example ${index + 1}`);
    });
    
    document.querySelectorAll('.download-tab-btn').forEach((btn) => {
        btn.setAttribute('aria-label', `Show downloads for ${btn.textContent.trim()}`);
    });
    
    // Improve focus management
    document.querySelectorAll('.btn, .code-tab-btn, .download-tab-btn').forEach(btn => {
        btn.addEventListener('focus', () => {
            btn.style.outline = '2px solid var(--accent-primary)';
            btn.style.outlineOffset = '2px';
        });
        btn.addEventListener('blur', () => {
            btn.style.outline = 'none';
        });
    });
});
