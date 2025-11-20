// Simple direct test for the file plugin
console.log("File test script loaded");

// Function to test file operations
function testFileOperations() {
    console.log("Testing file operations");
    
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
    
    // Try to write a file to the cache directory
    const cacheDir = cordova.file.cacheDirectory;
    if (!cacheDir) {
        alert("Cache directory is not available");
        return;
    }
    
    alert("Using cache directory: " + cacheDir);
    
    // Create a simple text file
    const text = "This is a test file.";
    const fileName = "test_file.txt";
    
    window.resolveLocalFileSystemURL(cacheDir, function(dirEntry) {
        alert("Cache directory resolved");
        
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
            alert("File entry created");
            
            fileEntry.createWriter(function(fileWriter) {
                alert("File writer created");
                
                fileWriter.onwriteend = function() {
                    alert("File written successfully at: " + fileEntry.toURL());
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
document.addEventListener('DOMContentLoaded', function() {
    console.log("Adding file test button");
    
    // Create a test button
    var button = document.createElement("button");
    button.innerHTML = "Test File Operations";
    button.className = "form-button";
    button.style.marginTop = "20px";
    button.style.backgroundColor = "#4caf50";
    button.style.color = "white";
    button.onclick = testFileOperations;
    
    // Find the export button and add the test button after it
    var exportBtn = document.getElementById("export-data-btn");
    if (exportBtn && exportBtn.parentNode) {
        exportBtn.parentNode.insertBefore(button, exportBtn.nextSibling);
    }
});