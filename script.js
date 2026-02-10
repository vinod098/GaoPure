/**
 * GaoPure - Premium Desi Ghee Website JavaScript
 * Minimal vanilla JS for essential interactions
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const faqItems = document.querySelectorAll('.faq-item');
    const productTabs = document.querySelectorAll('.tab-btn');
    const productCategories = document.querySelectorAll('.product-category');

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile nav when clicking a link
    function closeMobileNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ============================================
    // PRODUCT CATEGORY TABS
    // ============================================
    function switchProductCategory(category) {
        // Update tab buttons
        productTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // Update product grids
        productCategories.forEach(grid => {
            grid.classList.remove('active');
            if (grid.id === category) {
                grid.classList.add('active');
            }
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    function toggleFaq(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
        }
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                closeMobileNav();
            }
        }
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.about-card, .process-step, .benefit-card, .use-card, .product-card, .why-card, .testimonial-card, .about-highlight'
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
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

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    function initEventListeners() {
        // Scroll events
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            handleBackToTop();
        }, { passive: true });

        // Mobile nav toggle
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileNav);
        }

        // Back to top button
        if (backToTop) {
            backToTop.addEventListener('click', scrollToTop);
        }

        // Product category tabs
        productTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                switchProductCategory(tab.dataset.category);
            });
        });

        // FAQ accordion
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => toggleFaq(item));
            }
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMobileNav();
            }
        });

        // Keyboard accessibility for FAQ
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFaq(item);
                    }
                });
            }
        });
    }

    // ============================================
    // INITIALIZE
    // ============================================
    function init() {
        // Run initial checks
        handleNavbarScroll();
        handleBackToTop();
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        console.log('🏡 GaoPure website initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
