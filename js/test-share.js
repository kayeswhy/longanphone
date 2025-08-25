// Test function to check if file sharing works
function testFileSharing() {
    console.log("Testing file sharing...");
    
    // Make sure Cordova is ready before proceeding
    if (!window.isCordovaReady()) {
        alert("Cordova is not ready yet. Please try again in a moment.");
        return;
    }
    
    // Check if Cordova is available
    if (typeof cordova === 'undefined') {
        alert("Cordova is not available");
        return;
    }
    
    // Check if file plugin is available
    if (!cordova.file) {
        alert("Cordova file plugin is not available");
        return;
    }
    
    // Create a simple text file
    const text = "This is a test file for sharing.";
    const fileName = "test_share.txt";
    
    // Get the cache directory
    const cacheDir = cordova.file.cacheDirectory || cordova.file.dataDirectory;
    
    if (!cacheDir) {
        alert("No valid directory found");
        return;
    }
    
    alert("Using directory: " + cacheDir);
    
    window.resolveLocalFileSystemURL(cacheDir, function(dirEntry) {
        alert("Directory resolved");
        
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
            alert("File entry created");
            
            fileEntry.createWriter(function(fileWriter) {
                alert("File writer created");
                
                fileWriter.onwriteend = function() {
                    alert("File written successfully at: " + fileEntry.toURL());
                    
                    // Try to share the file
                    if (window.plugins && window.plugins.socialsharing) {
                        window.plugins.socialsharing.share(
                            "Test sharing file", // Message
                            "Test Share", // Subject
                            fileEntry.toURL(), // File
                            null, // Link
                            function() { 
                                alert("Share successful");
                            },
                            function(error) { 
                                alert("Share failed: " + JSON.stringify(error));
                            }
                        );
                    } else {
                        alert("Social sharing plugin not available");
                    }
                };
                
                fileWriter.onerror = function(e) {
                    alert("File write error: " + JSON.stringify(e));
                };
                
                const blob = new Blob([text], { type: "text/plain" });
                fileWriter.write(blob);
            }, function(error) {
                alert("Create writer error: " + JSON.stringify(error));
            });
        }, function(error) {
            alert("Get file error: " + JSON.stringify(error));
        });
    }, function(error) {
        alert("Resolve directory error: " + JSON.stringify(error));
    });
}

// Add a test button to the page
window.onCordovaReady(function() {
    console.log("Device ready - adding test button");
    
    // Create a test button
    var button = document.createElement("button");
    button.innerHTML = "Test File Sharing";
    button.className = "form-button";
    button.style.marginTop = "20px";
    button.onclick = testFileSharing;
    
    // Find the export button and add the test button after it
    var exportBtn = document.getElementById("export-data-btn");
    if (exportBtn && exportBtn.parentNode) {
        exportBtn.parentNode.insertBefore(button, exportBtn.nextSibling);
    }
});