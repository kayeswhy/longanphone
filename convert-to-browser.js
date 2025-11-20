#!/usr/bin/env node

/**
 * Script to convert Cordova app to browser-compatible version
 * Run with: node convert-to-browser.js
 */

const fs = require('fs');
const path = require('path');

function convertToBrowser() {
    console.log('🔄 Converting Cordova app to browser-compatible version...');
    
    try {
        // Read the original fullscreen.html
        const originalPath = path.join(__dirname, 'www', 'fullscreen.html');
        const browserPath = path.join(__dirname, 'www', 'fullscreen-browser.html');
        
        if (!fs.existsSync(originalPath)) {
            console.error('❌ Original fullscreen.html not found');
            return;
        }
        
        let content = fs.readFileSync(originalPath, 'utf8');
        
        // 1. Update the title
        content = content.replace('<title>EPhone</title>', '<title>EPhone - Browser Version</title>');
        
        // 2. Add browser compatibility script before cordova.js
        const scriptInsert = `    <!-- Browser Compatibility Layer - Load BEFORE Cordova scripts -->
    <script src="js/browser-compatibility.js"></script>
    
    <!-- Conditional Cordova loading -->
    <script>
        // Only load cordova.js if we're actually in Cordova environment
        if (window.cordova || (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Cordova') > -1)) {
            document.write('<script src="cordova.js"><\\/script>');
        } else {
            console.log('🌐 Browser mode - skipping cordova.js');
        }
    </script>`;
        
        content = content.replace('<script src="cordova.js"></script>', scriptInsert);
        
        // 3. Add browser-specific CSS
        const browserCSS = `
        /* Browser-specific styles */
        .browser-notice {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 123, 255, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            z-index: 10000;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        .browser-notice.fade-out {
            opacity: 0;
        }

        /* Ensure proper scrolling in browser */
        body {
            overflow: auto;
        }

        #phone-screen {
            overflow: auto;
        }
        `;
        
        // Insert browser CSS after the existing styles
        content = content.replace('</style>', browserCSS + '\n    </style>');
        
        // 4. Add browser notice HTML
        const browserNoticeHTML = `
            <!-- Browser mode indicator -->
            <div id="browser-notice" class="browser-notice">
                🌐 Browser Mode Active
            </div>`;
        
        // Insert after the floating charm
        content = content.replace(
            '<div id="floating-phone-charm" class="floating-phone-charm"></div>',
            '<div id="floating-phone-charm" class="floating-phone-charm"></div>' + browserNoticeHTML
        );
        
        // 5. Modify font upload functionality for browser compatibility
        const fontUploadFix = `
        // Browser-compatible font upload
        function handleFontUpload() {
            const fileInput = document.getElementById('font-file-input');
            const file = fileInput.files[0];
            
            if (!file) {
                alert('请选择字体文件');
                return;
            }
            
            // Use browser compatibility layer
            if (window.browserLoadFont) {
                window.browserLoadFont(file, function(blobUrl, fileName) {
                    if (blobUrl) {
                        // Preview the font
                        loadFontFromFile(blobUrl, true);
                        
                        // Store for saving
                        window.uploadedFontData = blobUrl;
                        window.uploadedFontName = fileName;
                        
                        document.getElementById('font-file-name').textContent = fileName;
                    } else {
                        alert('字体文件加载失败');
                    }
                });
            } else {
                // Fallback to original method
                console.log('Browser compatibility layer not available, using fallback');
            }
        }`;
        
        // Replace the original handleFontUpload function
        content = content.replace(
            /function handleFontUpload\(\) {[\s\S]*?^        }/m,
            fontUploadFix.trim()
        );
        
        // Write the browser-compatible version
        fs.writeFileSync(browserPath, content);
        
        console.log('✅ Browser-compatible version created: www/fullscreen-browser.html');
        console.log('');
        console.log('📋 Next steps:');
        console.log('1. Open www/fullscreen-browser.html in your browser');
        console.log('2. The app will automatically detect browser mode');
        console.log('3. File operations will use browser-compatible alternatives');
        console.log('4. Export/import will use browser download/upload');
        console.log('');
        console.log('🔧 Features adapted for browser:');
        console.log('- File system operations → localStorage/IndexedDB');
        console.log('- Font uploads → blob URLs');
        console.log('- Data export → browser downloads');
        console.log('- Cordova APIs → browser alternatives');
        
    } catch (error) {
        console.error('❌ Conversion failed:', error.message);
    }
}

// Run the conversion
convertToBrowser();