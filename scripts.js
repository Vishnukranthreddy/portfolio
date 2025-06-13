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