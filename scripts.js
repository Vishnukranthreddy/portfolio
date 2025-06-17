// Example: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Scroll smoothly to the target section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function checkDarkTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode || prefersDarkScheme) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Run on page load
checkDarkTheme();

// Mobile-friendly tooltip handling
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
    
    // Function to detect if device supports hover
    function hasHoverSupport() {
        return window.matchMedia('(hover: hover)').matches;
    }
    
    // Function to handle mobile tooltip visibility
    function handleMobileTooltips() {
        if (!hasHoverSupport()) {
            navLinks.forEach(link => {
                // Add touch event listeners for better mobile experience
                link.addEventListener('touchstart', function(e) {
                    // Add active class for touch state
                    this.classList.add('touch-active');
                }, { passive: true });
                
                link.addEventListener('touchend', function(e) {
                    // Remove active class after a delay
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 2000);
                }, { passive: true });
                
                // Handle focus for keyboard navigation
                link.addEventListener('focus', function() {
                    this.classList.add('tooltip-visible');
                });
                
                link.addEventListener('blur', function() {
                    this.classList.remove('tooltip-visible');
                });
            });
        }
    }
    
    // Initialize mobile tooltip handling
    handleMobileTooltips();
    
    // Re-initialize on window resize (in case orientation changes)
    window.addEventListener('resize', handleMobileTooltips);
});

// Enhanced mobile touch handling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        // Add mobile-specific class to body for CSS targeting
        document.body.classList.add('mobile-device');
        
        // Handle navigation link touches
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('touchstart', function(e) {
                // Clear any existing active states
                navLinks.forEach(l => l.classList.remove('mobile-active'));
                // Add active state to current link
                this.classList.add('mobile-active');
            }, { passive: true });
            
            // Optional: Remove active state after navigation
            link.addEventListener('click', function() {
                setTimeout(() => {
                    this.classList.remove('mobile-active');
                }, 300);
            });
        });
    }
    
    // Fallback for devices that don't support hover properly
    if (!window.matchMedia('(hover: hover)').matches) {
        document.body.classList.add('no-hover');
        
        // Alternative: Click/tap to toggle tooltip visibility
        const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
        navLinks.forEach(link => {
            let tooltipTimeout;
            
            link.addEventListener('click', function(e) {
                // Only prevent default if it's not navigating to a different page
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                }
                
                // Toggle tooltip visibility
                this.classList.toggle('show-tooltip');
                
                // Auto-hide after 3 seconds
                clearTimeout(tooltipTimeout);
                if (this.classList.contains('show-tooltip')) {
                    tooltipTimeout = setTimeout(() => {
                        this.classList.remove('show-tooltip');
                    }, 3000);
                }
                
                // Hide other tooltips
                navLinks.forEach(otherLink => {
                    if (otherLink !== this) {
                        otherLink.classList.remove('show-tooltip');
                    }
                });
            });
        });
    }
});

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});