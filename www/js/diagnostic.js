// Diagnostic tool to help identify Cordova plugin issues
console.log("Diagnostic script loaded");

// Create a global object to store diagnostic information
window.diagnosticInfo = {
    cordovaAvailable: false,
    deviceReady: false,
    filePluginAvailable: false,
    directories: {},
    plugins: {},
    errors: []
};

// Function to log diagnostic information
function logDiagnostic(key, value) {
    console.log("DIAGNOSTIC: " + key + " = " + JSON.stringify(value));
    window.diagnosticInfo[key] = value;
}

// Function to show diagnostic information
function showDiagnosticInfo() {
    let message = "Diagnostic Information:\n\n";
    
    message += "Cordova Available: " + window.diagnosticInfo.cordovaAvailable + "\n";
    message += "Device Ready: " + window.diagnosticInfo.deviceReady + "\n";
    message += "File Plugin Available: " + window.diagnosticInfo.filePluginAvailable + "\n\n";
    
    message += "Plugins:\n";
    for (const plugin in window.diagnosticInfo.plugins) {
        message += "- " + plugin + ": " + window.diagnosticInfo.plugins[plugin] + "\n";
    }
    
    message += "\nDirectories:\n";
    for (const dir in window.diagnosticInfo.directories) {
        message += "- " + dir + ": " + window.diagnosticInfo.directories[dir] + "\n";
    }
    
    if (window.diagnosticInfo.errors.length > 0) {
        message += "\nErrors:\n";
        window.diagnosticInfo.errors.forEach(function(error, index) {
            message += (index + 1) + ". " + error + "\n";
        });
    }
    
    alert(message);
}

// Check if Cordova is available
if (typeof cordova !== 'undefined') {
    logDiagnostic("cordovaAvailable", true);
} else {
    logDiagnostic("cordovaAvailable", false);
    window.diagnosticInfo.errors.push("Cordova is not available");
}

// Listen for deviceready event
document.addEventListener('deviceready', function() {
    logDiagnostic("deviceReady", true);
    
    // Check if file plugin is available
    if (window.cordova && window.cordova.file) {
        logDiagnostic("filePluginAvailable", true);
        
        // Log available directories
        for (const key in cordova.file) {
            window.diagnosticInfo.directories[key] = cordova.file[key];
        }
    } else {
        logDiagnostic("filePluginAvailable", false);
        window.diagnosticInfo.errors.push("File plugin is not available");
    }
    
    // Check available plugins
    if (window.cordova && window.cordova.plugins) {
        for (const plugin in cordova.plugins) {
            window.diagnosticInfo.plugins[plugin] = true;
        }
    }
    
    if (window.plugins) {
        for (const plugin in window.plugins) {
            window.diagnosticInfo.plugins[plugin] = true;
        }
    }
    
    // Add diagnostic button
    addDiagnosticButton();
}, false);

// Function to add diagnostic button
function addDiagnosticButton() {
    console.log("Adding diagnostic button");
    
    // Create a diagnostic button
    var button = document.createElement("button");
    button.innerHTML = "Show Diagnostic Info";
    button.className = "form-button";
    button.style.marginTop = "20px";
    button.style.backgroundColor = "#ff5722";
    button.style.color = "white";
    button.onclick = showDiagnosticInfo;
    
    // Find the export button and add the diagnostic button after it
    var exportBtn = document.getElementById("export-data-btn");
    if (exportBtn && exportBtn.parentNode) {
        exportBtn.parentNode.insertBefore(button, exportBtn.nextSibling);
    }
}

// Add diagnostic button even if deviceready doesn't fire
window.addEventListener('load', function() {
    setTimeout(function() {
        if (!window.diagnosticInfo.deviceReady) {
            logDiagnostic("deviceReady", false);
            window.diagnosticInfo.errors.push("deviceready event did not fire after 3 seconds");
            addDiagnosticButton();
        }
    }, 3000);
}, false);