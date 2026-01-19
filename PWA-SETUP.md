# EPhone PWA Setup Guide

## Progressive Web App (PWA) Features

The longan (browser) version of EPhone now supports PWA functionality, allowing users to install it as a native-like app on their devices.

## Features Added

### 1. Web App Manifest (`manifest.json`)
- **App Name**: EPhone - AI Chat Assistant
- **Display Mode**: Fullscreen for native app experience
- **Theme Colors**: Matches EPhone branding (#007AFF)
- **Icons**: Multiple sizes for different devices (36x36 to 512x512)
- **Shortcuts**: Quick access to Chat, Music, and Calendar
- **Orientation**: Portrait mode optimized

### 2. Service Worker (`sw.js`)
- **Offline Support**: App works without internet connection
- **Caching Strategy**: Essential files cached for performance
- **Background Sync**: Sync data when connection restored
- **Push Notifications**: Ready for future notification features
- **Auto-Updates**: Prompts user when new version available

### 3. PWA Installation
- **Install Button**: Appears automatically when PWA criteria met
- **Browser Prompt**: Native browser install prompts
- **Home Screen**: Add to home screen functionality
- **Fullscreen Mode**: Runs without browser UI when installed

## Installation Instructions

### For Users

#### Android Chrome:
1. Open EPhone in Chrome browser
2. Look for "📱 安装应用" button in top-right corner
3. Click the button or use Chrome's menu → "Add to Home screen"
4. Confirm installation
5. App will appear on home screen like a native app

#### iOS Safari:
1. Open EPhone in Safari
2. Tap the Share button (square with arrow)
3. Select "Add to Home Screen"
4. Customize name if desired
5. Tap "Add" to install

#### Desktop Chrome/Edge:
1. Open EPhone in browser
2. Look for install icon in address bar
3. Click install button
4. App will be available in app launcher

### For Developers

#### Testing PWA Features:
1. Serve the app over HTTPS (required for PWA)
2. Open Chrome DevTools → Application tab
3. Check "Manifest" section for manifest validation
4. Check "Service Workers" for SW registration
5. Use "Lighthouse" audit for PWA score

#### Local Development:
```bash
# Start local server with HTTPS
npm start
# or
python -m http.server 8000
```

## PWA Requirements Met

✅ **HTTPS**: Required for service worker registration  
✅ **Web App Manifest**: Complete manifest with all required fields  
✅ **Service Worker**: Registered and functional  
✅ **Responsive Design**: Works on all screen sizes  
✅ **Offline Functionality**: Core features work offline  
✅ **App-like Experience**: Fullscreen mode, no browser UI  

## Browser Support

- **Chrome/Chromium**: Full PWA support
- **Edge**: Full PWA support  
- **Firefox**: Partial support (no install prompt)
- **Safari**: Add to Home Screen support
- **Samsung Internet**: Full PWA support

## Features

### PWA-Specific Enhancements:
- **Install Prompt**: Custom install button with Chinese text
- **Fullscreen Mode**: Automatic detection and styling
- **Safe Area Support**: Handles device notches and rounded corners
- **Double-tap Zoom Prevention**: Native app behavior
- **Shortcut Handling**: Deep links to specific app sections
- **Update Notifications**: Prompts for app updates

### Offline Capabilities:
- **Core App**: Fully functional offline
- **Local Storage**: All data stored locally
- **Cached Resources**: Essential files cached
- **Background Sync**: Sync when online

## Customization

### Manifest Customization:
Edit `manifest.json` to customize:
- App name and description
- Theme colors
- Icon sets
- Shortcuts
- Display mode

### Service Worker Customization:
Edit `sw.js` to customize:
- Cache strategy
- Offline behavior
- Background sync
- Push notifications

## Troubleshooting

### Install Button Not Appearing:
1. Ensure HTTPS is enabled
2. Check service worker registration
3. Verify manifest is valid
4. Clear browser cache and reload

### Service Worker Issues:
1. Check browser console for errors
2. Verify sw.js is accessible
3. Check Application tab in DevTools
4. Unregister and re-register if needed

### Offline Issues:
1. Check cached files in DevTools
2. Verify network requests in offline mode
3. Clear cache and re-cache files

## Future Enhancements

- **Push Notifications**: Real-time message notifications
- **Background Sync**: Sync messages when connection restored
- **Share Target**: Receive shared content from other apps
- **File Handling**: Handle specific file types
- **Shortcuts**: More dynamic shortcuts based on usage

## Technical Details

### Files Added:
- `manifest.json` - Web app manifest
- `sw.js` - Service worker
- `PWA-SETUP.md` - This documentation

### Files Modified:
- `fullscreen.html` - Added PWA meta tags and JavaScript

### Dependencies:
- No additional dependencies required
- Uses native browser PWA APIs
- Compatible with existing EPhone functionality

The PWA implementation is fully backward compatible and doesn't affect the existing browser functionality.