// Scroll-friendly long press listener that doesn't interfere with scrolling
function addScrollFriendlyLongPressListener(element, callback) {
    let pressTimer = null;
    let startX = 0;
    let startY = 0;
    let hasMoved = false;
    
    const LONG_PRESS_DURATION = 500; // milliseconds
    const MOVE_THRESHOLD = 10; // pixels
    
    function startPress(e) {
        // Don't prevent default here - allow scrolling to work
        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX;
        startY = touch.clientY;
        hasMoved = false;
        
        pressTimer = setTimeout(() => {
            if (!hasMoved) {
                // Only trigger long press if user hasn't moved (not scrolling)
                callback();
            }
        }, LONG_PRESS_DURATION);
    }
    
    function movePress(e) {
        if (!pressTimer) return;
        
        const touch = e.touches ? e.touches[0] : e;
        const deltaX = Math.abs(touch.clientX - startX);
        const deltaY = Math.abs(touch.clientY - startY);
        
        // If user has moved beyond threshold, they're probably scrolling
        if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
            hasMoved = true;
            clearTimeout(pressTimer);
            pressTimer = null;
        }
    }
    
    function endPress(e) {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }
    }
    
    // Use passive listeners where possible to improve scroll performance
    element.addEventListener('touchstart', startPress, { passive: true });
    element.addEventListener('touchmove', movePress, { passive: true });
    element.addEventListener('touchend', endPress, { passive: true });
    element.addEventListener('touchcancel', endPress, { passive: true });
    
    // Also support mouse events for desktop
    element.addEventListener('mousedown', startPress);
    element.addEventListener('mousemove', movePress);
    element.addEventListener('mouseup', endPress);
    element.addEventListener('mouseleave', endPress);
}

// If you want to keep the original function name, you can alias it:
const addLongPressListener = addScrollFriendlyLongPressListener;