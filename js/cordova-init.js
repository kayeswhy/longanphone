// This script ensures Cordova is properly initialized
// Flag to track if Cordova is ready
window.cordovaReady = false;

// Listen for the deviceready event
document.addEventListener('deviceready', function() {
    window.cordovaReady = true;
}, false);

// Function to check if Cordova is ready
window.isCordovaReady = function() {
    return window.cordovaReady;
};

// Function to execute when Cordova is ready
window.onCordovaReady = function(callback) {
    if (window.cordovaReady) {
        callback();
    } else {
        document.addEventListener('deviceready', callback, false);
    }
};