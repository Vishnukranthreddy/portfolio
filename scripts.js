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

// Enhanced mobile-friendly tooltip handling
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
    let currentActiveTooltip = null;
    
    // Function to detect if device supports hover
    function hasHoverSupport() {
        return window.matchMedia('(hover: hover)').matches;
    }
    
    // Function to check if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    // Function to handle tooltip positioning
    function adjustTooltipPosition(link) {
        const nav = document.querySelector('nav');
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const tooltip = window.getComputedStyle(link, '::after');
        
        // Check if tooltip would overflow viewport
        const linkCenter = linkRect.left + linkRect.width / 2;
        const viewportWidth = window.innerWidth;
        
        // Adjust tooltip position classes
        link.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-center');
        
        if (linkCenter < 80) {
            link.classList.add('tooltip-left');
        } else if (linkCenter > viewportWidth - 80) {
            link.classList.add('tooltip-right');
        } else {
            link.classList.add('tooltip-center');
        }
    }
    
    // Function to handle mobile tooltip visibility
    function handleMobileTooltips() {
        if (!hasHoverSupport() && isMobileDevice()) {
            navLinks.forEach(link => {
                // Add touch event listeners for better mobile experience
                link.addEventListener('touchstart', function(e) {
                    // Clear any existing active tooltips
                    if (currentActiveTooltip && currentActiveTooltip !== this) {
                        currentActiveTooltip.classList.remove('touch-active');
                    }
                    
                    // Add active class for touch state
                    this.classList.add('touch-active');
                    currentActiveTooltip = this;
                    
                    // Adjust tooltip position
                    adjustTooltipPosition(this);
                }, { passive: true });
                
                link.addEventListener('touchend', function(e) {
                    // Remove active class after a delay
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                        if (currentActiveTooltip === this) {
                            currentActiveTooltip = null;
                        }
                    }, 2500);
                }, { passive: true });
                
                // Handle focus for keyboard navigation
                link.addEventListener('focus', function() {
                    this.classList.add('tooltip-visible');
                    adjustTooltipPosition(this);
                });
                
                link.addEventListener('blur', function() {
                    this.classList.remove('tooltip-visible');
                });
            });
        }
    }
    
    // Handle orientation changes
    function handleOrientationChange() {
        setTimeout(() => {
            navLinks.forEach(link => {
                adjustTooltipPosition(link);
            });
        }, 300);
    }
    
    // Initialize mobile tooltip handling
    handleMobileTooltips();
    
    // Re-initialize on window resize and orientation change
    window.addEventListener('resize', function() {
        handleMobileTooltips();
        handleOrientationChange();
    });
    
    window.addEventListener('orientationchange', handleOrientationChange);
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
        
        // Alternative: Long press to show tooltip, tap to navigate
        const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
        navLinks.forEach(link => {
            let touchTimeout;
            let longPressTriggered = false;
            
            link.addEventListener('touchstart', function(e) {
                longPressTriggered = false;
                
                // Long press to show tooltip
                touchTimeout = setTimeout(() => {
                    longPressTriggered = true;
                    this.classList.add('show-tooltip');
                    
                    // Haptic feedback if available
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                    
                    // Hide other tooltips
                    navLinks.forEach(otherLink => {
                        if (otherLink !== this) {
                            otherLink.classList.remove('show-tooltip');
                        }
                    });
                    
                    // Auto-hide after 4 seconds
                    setTimeout(() => {
                        this.classList.remove('show-tooltip');
                    }, 4000);
                }, 500); // 500ms long press
            }, { passive: true });
            
            link.addEventListener('touchend', function(e) {
                clearTimeout(touchTimeout);
                
                // If it was a long press, prevent navigation
                if (longPressTriggered) {
                    e.preventDefault();
                    return false;
                }
            }, { passive: false });
            
            link.addEventListener('touchmove', function(e) {
                // Cancel long press if user moves finger
                clearTimeout(touchTimeout);
            }, { passive: true });
        });
    }
    
    // Handle viewport changes for better mobile support
    function handleViewportChange() {
        // Adjust navigation position if tooltips are getting cut off
        const nav = document.querySelector('nav');
        const navRect = nav.getBoundingClientRect();
        
        if (navRect.bottom > window.innerHeight - 50) {
            nav.style.top = '10px';
        }
    }
    
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', function() {
        setTimeout(handleViewportChange, 300);
    });
});