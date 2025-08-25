// Browser Compatibility Layer for Cordova App
// This file provides browser-compatible alternatives to Cordova APIs

(function () {
    'use strict';

    // Detect if we're running in a browser vs Cordova
    const isBrowser = !window.cordova && typeof document !== 'undefined';

    if (isBrowser) {
        console.log('🌐 Browser mode detected - initializing compatibility layer');

        // Create mock cordova object
        window.cordova = {
            file: {
                dataDirectory: 'browser-storage://',
                externalRootDirectory: 'browser-downloads://'
            },
            plugins: {
                backgroundMode: {
                    enable: function () {
                        console.log('🌐 Browser: Background mode enable (mock)');
                    }
                }
            }
        };

        // Mock device object
        window.device = {
            platform: 'Browser',
            version: navigator.userAgent,
            uuid: 'browser-' + Date.now(),
            model: 'Browser',
            manufacturer: 'Browser'
        };

        // Create browser-compatible file system
        const BrowserFileSystem = {
            // Storage for "files" using localStorage/IndexedDB
            storage: new Map(),

            // Mock resolveLocalFileSystemURL
            resolveLocalFileSystemURL: function (path, successCallback, errorCallback) {
                console.log('🌐 Browser: resolveLocalFileSystemURL', path);

                try {
                    // Create mock directory entry
                    const mockDirEntry = {
                        isDirectory: true,
                        name: path.split('/').pop() || 'root',
                        fullPath: path,

                        getDirectory: function (dirName, options, successCallback, errorCallback) {
                            console.log('🌐 Browser: getDirectory', dirName);
                            try {
                                const dirPath = path + '/' + dirName;

                                const mockSubDir = {
                                    isDirectory: true,
                                    name: dirName,
                                    fullPath: dirPath,

                                    getFile: function (fileName, options, successCallback, errorCallback) {
                                        console.log('🌐 Browser: getFile', fileName);
                                        try {
                                            const filePath = dirPath + '/' + fileName;

                                const mockFileEntry = {
                                    isFile: true,
                                    name: fileName,
                                    fullPath: filePath,
                                    nativeURL: 'browser-file://' + filePath,

                                    createWriter: function (successCallback, errorCallback) {
                                        console.log('🌐 Browser: createWriter for', fileName);

                                        const mockFileWriter = {
                                            position: 0,
                                            length: 0,

                                            write: function (blob) {
                                                console.log('🌐 Browser: Writing blob to', fileName);

                                                // Convert blob to base64 and store
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    BrowserFileSystem.storage.set(filePath, reader.result);
                                                    console.log('🌐 Browser: File written successfully');
                                                    if (this.onwriteend) this.onwriteend();
                                                };
                                                reader.onerror = () => {
                                                    console.error('🌐 Browser: File write error');
                                                    if (this.onerror) this.onerror(new Error('Write failed'));
                                                };
                                                reader.readAsDataURL(blob);
                                            },

                                            seek: function (position) {
                                                this.position = position;
                                            },

                                            onwriteend: null,
                                            onerror: null
                                        };

                                        successCallback(mockFileWriter);
                                    },

                                    file: function (successCallback, errorCallback) {
                                        console.log('🌐 Browser: Getting file object for', fileName);

                                        try {
                                            // For font files, just return null to skip font loading
                                            if (fileName.includes('font') || filePath.includes('font')) {
                                                console.log('🌐 Browser: Skipping font file access');
                                                if (errorCallback) errorCallback(new Error('Font file access not supported in browser'));
                                                return;
                                            }

                                            // Get stored file data
                                            const storedData = BrowserFileSystem.storage.get(filePath);
                                            if (storedData) {
                                                // Convert base64 back to blob
                                                fetch(storedData)
                                                    .then(res => res.blob())
                                                    .then(blob => {
                                                        const mockFile = new File([blob], fileName, {
                                                            type: blob.type || 'application/octet-stream'
                                                        });
                                                        successCallback(mockFile);
                                                    })
                                                    .catch(err => {
                                                        console.error('🌐 Browser: File conversion failed', err);
                                                        if (errorCallback) errorCallback(err);
                                                    });
                                            } else {
                                                // File not found - create empty file for compatibility
                                                console.log('🌐 Browser: File not found, creating empty file');
                                                const emptyBlob = new Blob([''], { type: 'application/octet-stream' });
                                                const mockFile = new File([emptyBlob], fileName, {
                                                    type: 'application/octet-stream'
                                                });
                                                successCallback(mockFile);
                                            }
                                        } catch (error) {
                                            console.error('🌐 Browser: File method error', error);
                                            if (errorCallback) errorCallback(error);
                                        }
                                    }
                                };

                                            successCallback(mockFileEntry);
                                        } catch (error) {
                                            console.error('🌐 Browser: getFile error', error);
                                            if (errorCallback) errorCallback(error);
                                        }
                                    }
                                };

                                successCallback(mockSubDir);
                            } catch (error) {
                                console.error('🌐 Browser: getDirectory error', error);
                                if (errorCallback) errorCallback(error);
                            }
                        }
                    };

                    successCallback(mockDirEntry);
                } catch (error) {
                    console.error('🌐 Browser: resolveLocalFileSystemURL error', error);
                    if (errorCallback) errorCallback(error);
                }
            }
        };

        // Replace global file system function
        window.resolveLocalFileSystemURL = BrowserFileSystem.resolveLocalFileSystemURL;

        // Enhanced browser file download function with fallbacks
        window.browserDownloadFile = function (content, filename, mimeType = 'application/json') {
            console.log('🌐 Browser: Downloading file', filename);

            try {
                const blob = new Blob([content], { type: mimeType });

                // Method 1: Modern download attribute
                if ('download' in document.createElement('a') && window.URL && window.URL.createObjectURL) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    link.style.display = 'none';

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Clean up
                    setTimeout(() => URL.revokeObjectURL(url), 1000);

                    console.log('🌐 Browser: File download triggered (modern)');
                    return true;
                }

                // Method 2: Fallback for older browsers
                if (window.navigator && window.navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(blob, filename);
                    console.log('🌐 Browser: File download triggered (IE/Edge legacy)');
                    return true;
                }

                // Method 3: Open in new window
                const url = URL.createObjectURL(blob);
                const newWindow = window.open(url, '_blank');
                if (newWindow) {
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                    console.log('🌐 Browser: File opened in new window');
                    return true;
                }

                throw new Error('No download method available');

            } catch (error) {
                console.error('🌐 Browser: Download failed', error);

                // Ultimate fallback - copy to clipboard or show content
                if (content.length < 50000) {
                    try {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(content).then(() => {
                                alert(`Download failed, but content has been copied to clipboard.\nFilename: ${filename}`);
                            }).catch(() => {
                                // Show in alert as last resort
                                alert(`Download failed. Content preview:\n\n${content.substring(0, 1000)}${content.length > 1000 ? '...' : ''}`);
                            });
                        } else {
                            alert(`Download failed. Content preview:\n\n${content.substring(0, 1000)}${content.length > 1000 ? '...' : ''}`);
                        }
                    } catch (clipboardError) {
                        alert('Download failed and content is too large to display.');
                    }
                } else {
                    alert('Download failed and content is too large to display.');
                }
                return false;
            }
        };

        // Browser-compatible font loading
        window.browserLoadFont = function (file, callback) {
            console.log('🌐 Browser: Loading font file', file.name);

            try {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const arrayBuffer = e.target.result;
                    const blob = new Blob([arrayBuffer], {
                        type: file.type || 'font/ttf'
                    });
                    const blobUrl = URL.createObjectURL(blob);

                    // Store in browser storage for persistence
                    const fontKey = 'custom-font-' + Date.now();
                    localStorage.setItem(fontKey, blobUrl);

                    console.log('🌐 Browser: Font loaded successfully');
                    callback(blobUrl, file.name);
                };
                reader.onerror = function () {
                    console.error('🌐 Browser: Font loading failed');
                    callback(null, null);
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error('🌐 Browser: Font loading error', error);
                callback(null, null);
            }
        };

        // Simulate deviceready event for browser
        setTimeout(function () {
            console.log('🌐 Browser: Simulating deviceready event');

            // Set cordova ready flag
            window.cordovaReady = true;

            // Dispatch deviceready event
            const event = new CustomEvent('deviceready');
            document.dispatchEvent(event);
        }, 100);

        // Browser-specific initialization
        document.addEventListener('DOMContentLoaded', function () {
            console.log('🌐 Browser: DOM loaded, initializing browser-specific features');
        });

        // Add global error handler to prevent cascading failures
        window.addEventListener('error', function(event) {
            console.error('🌐 Browser: Global error caught:', event.error);
            // Don't let errors break the entire app - but don't prevent default for null errors
            if (event.error !== null) {
                event.preventDefault();
            }
            return true;
        });

        window.addEventListener('unhandledrejection', function(event) {
            console.error('🌐 Browser: Unhandled promise rejection:', event.reason);
            // Don't let promise rejections break the entire app
            event.preventDefault();
        });

        // Simple browser export function
        window.browserExportData = function(jsonData, filename) {
            console.log('🌐 Browser: Exporting data directly');
            
            try {
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                link.style.display = 'none';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                
                console.log('🌐 Browser: Export completed successfully');
                return true;
            } catch (error) {
                console.error('🌐 Browser: Export failed', error);
                return false;
            }
        };

        // Fix for QZone navigation - ensure hidden nav items can be clicked
        document.addEventListener('DOMContentLoaded', function() {
            // Override the click method for hidden elements to make them work
            const originalClick = HTMLElement.prototype.click;
            HTMLElement.prototype.click = function() {
                // If element is hidden but has a click handler, temporarily show it
                const wasHidden = this.style.display === 'none';
                if (wasHidden) {
                    this.style.display = 'block';
                }
                
                // Call original click
                const result = originalClick.call(this);
                
                // Hide it again if it was hidden
                if (wasHidden) {
                    this.style.display = 'none';
                }
                
                return result;
            };
        });

        // Browser-compatible Spotify OAuth handling
        window.browserSpotifyAuth = {
            // Get browser-compatible redirect URI
            getRedirectUri: function() {
                // Use current page URL for browser OAuth
                const currentUrl = window.location.origin + window.location.pathname;
                return currentUrl;
            },

            // Handle OAuth callback in browser
            handleCallback: function() {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                const error = urlParams.get('error');
                
                if (code || error) {
                    console.log('🌐 Browser: Spotify OAuth callback detected');
                    
                    // Clean up URL
                    const cleanUrl = window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, cleanUrl);
                    
                    // Handle the callback
                    if (error) {
                        if (error === 'access_denied') {
                            alert('Spotify授权被拒绝。请重试并点击"同意"按钮。');
                        } else {
                            alert('Spotify error: ' + error);
                        }
                        return true;
                    }
                    
                    if (code && window.exchangeCodeForToken) {
                        window.exchangeCodeForToken(code);
                    }
                    
                    return true;
                }
                return false;
            }
        };

        // Helper functions for Spotify PKCE
        window.generateCodeVerifier = function() {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            return btoa(String.fromCharCode(...array))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
        };

        window.generateCodeChallenge = function(verifier) {
            const encoder = new TextEncoder();
            const data = encoder.encode(verifier);
            return crypto.subtle.digest('SHA-256', data).then(digest => {
                return btoa(String.fromCharCode(...new Uint8Array(digest)))
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=/g, '');
            });
        };

        // Intercept window.open calls to fix Spotify OAuth redirect
        const originalWindowOpen = window.open;
        window.open = function(url, target, features) {
            console.log('🌐 Browser: window.open called with URL:', url);
            
            // Check if this is a Spotify OAuth URL with custom scheme redirect
            if (url && typeof url === 'string' && url.includes('accounts.spotify.com/authorize')) {
                console.log('🌐 Browser: Detected Spotify OAuth URL');
                
                if (url.includes('lycheephone://')) {
                    console.log('🌐 Browser: Found custom scheme, fixing redirect URI');
                    
                    // Replace the custom scheme redirect with browser-compatible one
                    const browserRedirectUri = window.browserSpotifyAuth.getRedirectUri();
                    const fixedUrl = url.replace(
                        /redirect_uri=[^&]+/,
                        `redirect_uri=${encodeURIComponent(browserRedirectUri)}`
                    );
                    
                    console.log('🌐 Browser: Original URL:', url);
                    console.log('🌐 Browser: Fixed URL:', fixedUrl);
                    
                    return originalWindowOpen.call(this, fixedUrl, target, features);
                } else {
                    console.log('🌐 Browser: Spotify URL already has correct redirect URI');
                }
            }
            
            // For all other URLs, use original function
            return originalWindowOpen.call(this, url, target, features);
        };
        
        // Skip location.href interception to avoid property redefinition errors
        console.log('🌐 Browser: Skipping location.href interception to avoid errors');
        
        // Check for Spotify callback on page load
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                window.browserSpotifyAuth.handleCallback();
            }, 500);
        });

        console.log('🌐 Browser compatibility layer initialized successfully');
    }
})();