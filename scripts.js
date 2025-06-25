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
    
    // Enhanced Mobile Tooltip Functionality
    initializeMobileTooltips();
});

// Mobile Tooltip Enhancement
function initializeMobileTooltips() {
    const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
    let activeTooltip = null;
    let tooltipTimeout;
    
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add touch event listeners for mobile devices
        navLinks.forEach(link => {
            // Touch start - show tooltip
            link.addEventListener('touchstart', function(e) {
                e.preventDefault(); // Prevent default touch behavior
                
                // Clear any existing timeout
                clearTimeout(tooltipTimeout);
                
                // Hide any currently active tooltip
                if (activeTooltip && activeTooltip !== this) {
                    activeTooltip.classList.remove('show-mobile-tooltip', 'touch-active');
                }
                
                // Show current tooltip
                this.classList.add('show-mobile-tooltip', 'touch-active');
                activeTooltip = this;
                
                // Auto-hide tooltip after 2 seconds
                tooltipTimeout = setTimeout(() => {
                    this.classList.remove('show-mobile-tooltip', 'touch-active');
                    if (activeTooltip === this) {
                        activeTooltip = null;
                    }
                }, 2000);
            });
            
            // Touch end - navigate to link
            link.addEventListener('touchend', function(e) {
                e.preventDefault();
                
                // Small delay to allow tooltip to be seen
                setTimeout(() => {
                    if (this.href && this.href !== '#') {
                        window.location.href = this.href;
                    }
                }, 300);
            });
            
            // Long press support (for better UX)
            let longPressTimeout;
            link.addEventListener('touchstart', function(e) {
                longPressTimeout = setTimeout(() => {
                    // Show tooltip on long press
                    this.classList.add('show-mobile-tooltip', 'touch-active');
                    activeTooltip = this;
                    
                    // Vibrate if supported (subtle feedback)
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                }, 500);
            });
            
            link.addEventListener('touchend', function() {
                clearTimeout(longPressTimeout);
            });
            
            link.addEventListener('touchcancel', function() {
                clearTimeout(longPressTimeout);
            });
        });
        
        // Hide tooltip when touching outside
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('nav ul li a[data-tooltip]')) {
                if (activeTooltip) {
                    activeTooltip.classList.remove('show-mobile-tooltip', 'touch-active');
                    activeTooltip = null;
                }
                clearTimeout(tooltipTimeout);
            }
        });
    }
    
    // Enhanced keyboard navigation support
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.classList.add('show-mobile-tooltip');
        });
        
        link.addEventListener('blur', function() {
            this.classList.remove('show-mobile-tooltip');
        });
        
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.classList.add('show-mobile-tooltip');
                setTimeout(() => {
                    this.classList.remove('show-mobile-tooltip');
                }, 1500);
            }
        });
    });
}

// Responsive tooltip positioning for different screen orientations
function adjustTooltipPosition() {
    const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
    const isLandscape = window.orientation === 90 || window.orientation === -90;
    const isShortScreen = window.innerHeight < 500;
    
    navLinks.forEach(link => {
        if (isLandscape && isShortScreen) {
            link.style.setProperty('--tooltip-position', 'side');
        } else {
            link.style.setProperty('--tooltip-position', 'bottom');
        }
    });
}

// Listen for orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(adjustTooltipPosition, 100);
});

// Listen for resize events
window.addEventListener('resize', adjustTooltipPosition);

// Initialize on load
window.addEventListener('load', adjustTooltipPosition);