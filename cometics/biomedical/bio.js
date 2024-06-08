document.addEventListener('DOMContentLoaded', function() {
    const wrappers = document.querySelectorAll('.card-wrapper');
    let currentIndex = 0;
    const intervalDuration = 5000; // 5 seconds

    function showNextWrapper() {
        wrappers.forEach(wrapper => wrapper.style.opacity = '0');
        
        wrappers[currentIndex].style.opacity = '1';
        wrappers[currentIndex].style.zIndex = 1; // Bring current wrapper to the front
        
        // Set zIndex of the previous wrapper to 0 to send it to the back
        const prevIndex = (currentIndex - 1 + wrappers.length) % wrappers.length;
        wrappers[prevIndex].style.zIndex = 0;

        currentIndex = (currentIndex + 1) % wrappers.length;
    }

    // Check if it's a desktop view (viewport width > 992px)
    function isDesktopView() {
        return window.innerWidth > 992;
    }

    function toggleWrapperClasses() {
        wrappers.forEach((wrapper, index) => {
            if (isDesktopView()) {
                wrapper.classList.add(`wrapper${index + 1}`);
            } else {
                wrapper.classList.remove(`wrapper${index + 1}`);
            }
        });
    }

    // Execute the function only in desktop view
    if (isDesktopView()) {
        showNextWrapper();
        setInterval(showNextWrapper, intervalDuration);
    }

    // Initial check and add event listener for resize
    toggleWrapperClasses();
    window.addEventListener('resize', () => {
        if (isDesktopView()) {
            showNextWrapper();
            setInterval(showNextWrapper, intervalDuration);
        }
        toggleWrapperClasses();
    });
});
