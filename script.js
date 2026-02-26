document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader transition
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            revealContent(); // Content disclosure
        }, 500);
    }, 1500);

    // 2. Reveal text animations
    function revealContent() {
        const revealElements = document.querySelectorAll('.reveal-text');
        revealElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
            }, index * 150);
        });
    }

    // 3. Simple parallax on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Blobs movement
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.1;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Hero content parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // 4. Smooth hover for work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Can add more logic here for custom cursors or details
        });
    });

    // 5. Video play simulation
    const playButton = document.querySelector('.video-placeholder');
    if (playButton) {
        playButton.addEventListener('click', () => {
            alert('Loading 4K Showcase...');
        });
    }
});

// Optimization: Debounce scroll events if logic gets heavy
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
