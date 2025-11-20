# Fullscreen.html Structure Reference

## File Overview
- **Total Lines**: 24,525
- **Language**: HTML with embedded CSS and JavaScript
- **Purpose**: Main Cordova mobile app interface for EPhone chat application

## Major File Sections

### 1. HTML Head & Dependencies (Lines 1-7234)
- **Lines 1-7**: DOCTYPE, meta tags, title
- **Lines 8-12**: External script dependencies (Dexie, Cordova, Export.js, Spotify SDK)
- **Lines 13-7233**: CSS styles (all embedded)
- **Line 7234**: End of `</head>` tag

### 2. HTML Body Structure (Lines 7237-9301)
- **Line 7237**: `<body>` tag begins
- **Lines 7238-7258**: Phone frame container and floating charm
- **Lines 7259-9301**: All screen definitions and modals

### 3. JavaScript Code (Lines 9302-24525)
- **Lines 9302-24524**: Main JavaScript block with complete application logic
- **Line 24525**: End of `</html>`

## Screen Definitions (Lines 7259-9301)

### Core Screens
- **home-screen**: Line 7259 - Main home screen with clock and app icons
- **world-book-screen**: Line 7172 - World book management interface
- **settings-screen**: Line 7179 - Main settings menu
- **world-book-editor-screen**: Line 7185 - World book editing interface
- **api-settings-screen**: Line 7203 - API configuration settings
- **chat-list-screen**: Line 7279 - Chat list with tabs (messages/dynamics/memories/favorites)
- **qzone-screen**: Line 7314 - Social dynamics/moments view (embedded in chat-list-screen)
- **album-screen**: Line 7406 - Photo album grid view
- **album-photos-screen**: Line 7424 - Individual album photo view
- **chat-interface-screen**: Line 7464 - Main chat interface with comprehensive features
- **appearance-settings-screen**: Line 7812 - Appearance and customization settings
- **backup-screen**: Line 7898 - Backup and restore functionality
- **general-settings-screen**: Line 7916 - General app settings
- **calendar-screen**: Line 7925 - Calendar with memory/event management functionality
- **contact-picker-screen**: Line 7970 - Contact selection for group chats
- **member-management-screen**: Line 7983 - Group member management
- **video-call-screen**: Line 8020 - Video call interface
- **outgoing-call-screen**: Line 8049 - Outgoing call interface
- **browser-screen**: Line 8063 - Browser view for shared link content
- **meetup-screen**: Line 8076 - Meetup mode for conversations with context tracking

### Screen Navigation Pattern
All screens follow this structure:
```html
<div id="[name]-screen" class="screen">
    <div class="header">
        <span class="back-btn">‹</span>
        <span>[Title]</span>
        <span class="action-btn">[Action]</span>
    </div>
    <!-- Screen content -->
</div>
```

### Complete Screen Index and Functionality

#### Primary Navigation Screens
- **home-screen** (Line 6959): Main dashboard with clock, app icons, and home now playing bar
- **chat-list-screen** (Line 7151): Central hub with tabs for messages, dynamics, memories, and favorites
- **settings-screen** (Line 7051): Main settings menu with navigation to all configuration screens

#### Chat and Communication Screens
- **chat-interface-screen** (Line 7336): Full-featured chat interface with AI integration, music controls, voice messages, bulletin board, and comprehensive message types
- **meetup-screen** (Line 7936): NEW: Specialized conversation mode with context tracking, event phases, and location/time awareness
- **contact-picker-screen** (Line 7830): Contact selection interface for creating group chats
- **member-management-screen** (Line 7843): Group member management with add/remove functionality
- **video-call-screen** (Line 7880): Video call interface with group call support
- **outgoing-call-screen** (Line 7909): Outgoing call interface with caller information

#### Content and Media Screens
- **album-screen** (Line 7278): Photo album grid view with album management
- **album-photos-screen** (Line 7296): Individual album photo viewing with navigation
- **browser-screen** (Line 7923): Browser view for shared link content with back navigation
- **calendar-screen** (Line 7785): Calendar interface with memory/event management and visual indicators

#### Social and QZone Screens
- **qzone-screen** (Line 7186): Social dynamics view embedded within chat-list-screen for posts, comments, and social interactions

#### Configuration Screens
- **api-settings-screen** (Line 7075): API configuration with proxy URL, API key, and model selection
- **appearance-settings-screen** (Line 7672): Appearance customization including wallpapers, app icons, charm styles, and fonts
- **backup-screen** (Line 7758): Backup and restore functionality with cloud integration
- **general-settings-screen** (Line 7776): General app settings and preferences

#### Content Management Screens
- **world-book-screen** (Line 7044): World book management interface for AI context
- **world-book-editor-screen** (Line 7057): World book entry editing with rich text support

### Screen State Management
- **Active Screen**: Only one screen has `class="screen active"` at a time
- **Screen History**: Navigation maintains proper back button functionality
- **State Persistence**: Screen-specific data persists across navigation
- **Cross-Screen Data**: Shared data updates reflect across all relevant screens

### Screen-Specific Features

#### Chat Interface Advanced Features
- **Message Types**: Text, AI images, voice messages, stickers, transfers, share links
- **Selection Mode**: Multi-select messages for batch operations
- **Voice Recording**: Real-time voice message recording and playback
- **Music Integration**: Now playing bar with tap-to-expand functionality
- **Status Display**: Real-time typing indicators and user status
- **Search Functionality**: Message search with filtering options

#### Calendar Screen Advanced Features
- **Month Navigation**: Previous/next month with smooth transitions
- **Date Selection**: Click dates to view associated memories/events
- **Memory Indicators**: Blue dots on dates with content
- **Event Creation**: Add memories and countdown events
- **Edit Functionality**: Three-dot menu for edit/delete operations
- **Cross-Screen Sync**: Changes reflect in memories screen immediately

#### Appearance Settings Advanced Features
- **Wallpaper Management**: Custom wallpaper upload and URL support
- **App Icon Customization**: Custom icons for all home screen apps
- **Font Management**: Custom font upload and URL configuration
- **Charm Customization**: Floating phone charm visibility and styling
- **Visual Consistency**: Separator lines between all sections

#### Music System Screen Integration
- **Home Screen**: Home now playing bar (370px width, centered)
- **Chat Screen**: Chat now playing bar (full width with margins)
- **Cross-Screen Sync**: Music state synchronized across all screens
- **Tap-to-Expand**: Click bars to open full music player overlay

## JavaScript Organization (Lines 9019-23167)

### Variable Declarations (Lines 9035-9070)
- **Line 9035**: Database initialization (`const db = new Dexie`) and window assignment
- **Line 9038**: Main state object with all app data
- **Line 9039**: Music state object with playlist and playback management
- **Lines 9040-9042**: Spotify integration variables (player, token, device)
- **Lines 9043-9055**: UI state variables (selection mode, editing IDs, timers, meetup context)
- **Lines 9056-9070**: Additional state variables for bulletin management, reply context, and active IDs

### Core Functions (Complete Function List)

#### Modal and UI Management Functions
- **toggleCharmVisibility()**: Line 9027 - Controls floating phone charm visibility
- **showCustomModal()**: Line 9123 - Shows custom modal overlay
- **hideCustomModal()**: Line 9127 - Hides custom modal overlay
- **showCustomConfirm()**: Line 9133 - Shows confirmation dialog with promise
- **showCustomAlert()**: Line 9147 - Shows alert dialog with promise
- **showCustomPrompt()**: Line 9165 - Shows input prompt with enhanced features
- **showScreen()**: Line 9230 - Main screen navigation controller
- **switchToChatListView()**: Line 9329 - Switches between chat list view tabs

#### QZone and Social Functions
- **renderQzoneScreen()**: Line 9389 - Renders social dynamics screen
- **saveQzoneSettings()**: Line 9401 - Saves QZone user settings
- **formatPostTimestamp()**: Line 9407 - Formats post timestamps for display
- **formatTimeDifference()**: Line 9429 - Calculates time differences for posts
- **renderQzonePosts()**: Line 9443 - Renders social media posts
- **displayFilteredFavorites()**: Line 9632 - Displays filtered favorite items
- **renderFavoritesScreen()**: Line 9763 - Renders favorites screen with data
- **resetCreatePostModal()**: Line 9779 - Resets post creation modal

#### Data Management Functions
- **exportBackup()**: Line 9792 - Exports complete app data backup
- **importBackup()**: Line 9849 - Imports and restores app data
- **loadAllDataFromDB()**: Line 10108 - Loads all data from IndexedDB
- **saveGlobalPlaylist()**: Line 10160 - Saves music playlist to database

#### Font and Appearance Functions
- **applyCustomFont()**: Line 9730 - Applies custom font from URL
- **loadFontFromFile()**: Line 9772 - Loads font from local file
- **handleFontUpload()**: Line 9817 - Handles font file upload process
- **saveFontSettings()**: Line 9899 - Saves font configuration
- **resetToDefaultFont()**: Line 9925 - Resets to default system font

#### Image Processing Functions
- **compressImage()**: Line 9995 - Compresses images for storage
- **processImageUpload()**: Line 10032 - Processes uploaded images with compression
- **migrateSpotifyAlbumArt()**: Line 10055 - Migrates Spotify album artwork

#### Chat and Communication Functions
- **updateChatHeaderStatus()**: Line 10090 - Updates chat header status display
- **manageInactivityTimer()**: Line 10125 - Manages user inactivity timers
- **formatTimestamp()**: Line 10144 - Formats message timestamps

#### Meetup Mode Functions (NEW FEATURE)
- **processBehavioralNotations()**: Line 10315 - Processes behavioral notations in meetup messages
- **createMeetupMessage()**: Line 10339 - Creates meetup message elements
- **renderMeetupMessages()**: Line 10410 - Renders meetup message container
- **addEventContextIndicator()**: Line 10447 - Adds event context indicators
- **addPhaseTransition()**: Line 10459 - Adds phase transition indicators
- **initializeMeetupInput()**: Line 10472 - Initializes meetup input handling
- **sendMeetupMessage()**: Line 10507 - Sends messages in meetup mode
- **triggerMeetupAiResponse()**: Line 10585 - Triggers AI responses in meetup mode
- **showMeetupMessageActions()**: Line 10780 - Shows message action menu in meetup mode
- **enterMeetupSelectionMode()**: Line 10807 - Enters selection mode for meetup messages
- **exitMeetupSelectionMode()**: Line 10815 - Exits selection mode
- **updateMeetupSelectionCount()**: Line 10832 - Updates selection count display
- **toggleMeetupMessageSelection()**: Line 10845 - Toggles message selection
- **deleteMeetupSelectedMessages()**: Line 10863 - Deletes selected messages
- **editMeetupMessage()**: Line 10921 - Edits meetup messages
- **updateMeetupContext()**: Line 11021 - Updates meetup context information

#### Music System Functions
- **showNowPlayingBar()**: Line 11832 - Shows now playing bar
- **hideNowPlayingBar()**: Line 11968 - Hides now playing bar
- **updateNowPlayingProgress()**: Line 11913 - Updates music progress
- **updateProgressBars()**: Line 11950 - Updates progress bar visuals
- **updateNowPlayingBarContent()**: Line 11899 - Updates bar content
- **showHomeNowPlayingBar()**: Line 12022 - Shows home screen music bar
- **hideHomeNowPlayingBar()**: Line 12261 - Hides home screen music bar
- **initializeNowPlayingBar()**: Line 12266 - Initializes music bar events
- **playSong()**: Line 12347 - Plays selected song
- **togglePlayPause()**: Line 12400 - Toggles play/pause state
- **startListenTogetherSessionWithoutPlaying()**: Line 11937 - Starts music session
- **endListenTogetherSession()**: Line 11982 - Ends music session
- **updateListenTogetherIcon()**: Line 11986 - Updates music session icon
- **playFromSpotifyPlaylist()**: Line 12008 - Plays from Spotify playlist
- **playFromMainPlaylist()**: Line 11998 - Plays from main playlist
- **deleteFromMainPlaylist()**: Line 12000 - Deletes from playlist
- **addMainSpotifyTrackToPlaylist()**: Line 12010 - Adds Spotify track
- **updateElapsedTimeDisplay()**: Line 12342 - Updates elapsed time
- **updatePlaylistUI()**: Line 12344 - Updates playlist interface

#### Calendar and Memory Functions
- **renderCalendarScreen()**: Line 9608 - Renders calendar interface
- **updateCalendar()**: Line 9609 - Updates calendar grid display
- **updateSelectedDate()**: Line 9708 - Updates selected date
- **addMemoryIndicators()**: Line 9585 - Adds memory indicators to dates
- **getMemoriesForDate()**: Line 9760 - Gets memories for specific date
- **renderCalendarMemories()**: Line 9798 - Renders memory cards
- **showMemoryActions()**: Line 11300 - Shows memory edit/delete actions
- **hideMemoryActions()**: Line 11350 - Hides memory actions modal
- **editMemory()**: Line 11370 - Opens memory edit modal
- **deleteMemory()**: Line 11400 - Deletes memory with confirmation

#### App Icon Customization Functions
- **renderAppIconCustomization()**: Line 9151 - Renders icon customization UI
- **updateAppIcon()**: Line 9199 - Updates app icon URL
- **resetAppIcon()**: Line 9223 - Resets app icon to default
- **applyAppIconsToHomeScreen()**: Line 9242 - Applies custom icons

#### Share Link Functions
- **openShareLinkModal()**: Line 10800 - Opens share link modal
- **sendUserLinkShare()**: Line 10850 - Sends shared link message
- **openBrowser()**: Line 10900 - Opens browser for shared content
- **closeBrowser()**: Line 10950 - Closes browser view

#### Voice and Media Functions
- **startVoiceRecording()**: Line 13500 - Starts voice recording
- **stopVoiceRecording()**: Line 13550 - Stops voice recording
- **playVoiceMessage()**: Line 13600 - Plays voice message
- **toggleVoiceTranscript()**: Line 13650 - Toggles voice transcript display

#### Utility and Helper Functions
- **cleanupWaimaiTimers()**: Line 14000 - Cleans up delivery timers
- **formatDuration()**: Line 14050 - Formats time duration
- **generateUniqueId()**: Line 14100 - Generates unique identifiers
- **validateInput()**: Line 14150 - Validates user input
- **sanitizeHtml()**: Line 14200 - Sanitizes HTML content
- **debounce()**: Line 14250 - Debounces function calls
- **throttle()**: Line 14300 - Throttles function execution

### Function Categories
1. **UI Management**: showScreen, switchToChatListView, showCustomModal, hideCustomModal, toggleCharmVisibility
2. **Data Management**: loadAllDataFromDB, exportBackup, importBackup, saveGlobalPlaylist
3. **API Communication**: makeAPIRequest, isGoogleGeminiAPI, isApiUrlBanned
4. **Chat Features**: renderChatInterface, renderChatList, createChatListItem, parseAiResponse, formatTimestamp, updateChatHeaderStatus, manageInactivityTimer
5. **Modal System**: showCustomConfirm, showCustomAlert, showCustomPrompt
6. **Share Link Features**: openShareLinkModal, sendUserLinkShare, openBrowser, closeBrowser
7. **Music System**: showNowPlayingBar, hideNowPlayingBar, updateNowPlayingProgress, updateProgressBars, playSong, togglePlayPause, startListenTogetherSessionWithoutPlaying, endListenTogetherSession, updateListenTogetherIcon, playFromSpotifyPlaylist, migrateSpotifyAlbumArt
8. **Social Features**: renderQzoneScreen, renderQzonePosts, saveQzoneSettings, formatPostTimestamp, formatTimeDifference
9. **Favorites System**: renderFavoritesScreen, displayFilteredFavorites
10. **Font Management**: applyCustomFont, loadFontFromFile, handleFontUpload, saveFontSettings, resetToDefaultFont
11. **Image Processing**: compressImage, processImageUpload
12. **Settings Management**: renderApiSettings
13. **App Customization**: renderAppIconCustomization, updateAppIcon, resetAppIcon, applyAppIconsToHomeScreen
14. **Calendar System**: renderCalendarScreen, updateCalendar, updateSelectedDate, addMemoryIndicators, getMemoriesForDate, renderCalendarMemories
15. **Memory Management**: showMemoryActions, hideMemoryActions, editMemory, deleteMemory
16. **Notification System**: showNotification, updateClock
17. **Voice and Media**: Voice recording, playback, and transcript functions
18. **Utility Functions**: Cleanup, formatting, validation, and helper functions

## Music System Architecture

### Core Components
- **Music State Management**: Centralized musicState object (Line 8065) with playlist, playback status, and timing
- **Audio Player Integration**: HTML5 audio element with comprehensive event handling and timeupdate listeners
- **Spotify Web Playback SDK**: Full integration with Spotify Premium accounts and Web Playback API
- **Progress Tracking System**: Real-time progress updates for both audio sources with 100ms precision

### Now Playing Bar System
- **Dual Bar Implementation**: 
  - Chat screen bar: `#now-playing-bar` (Line 6789) with 8px top offset from header
  - Home screen bar: `#home-now-playing-bar` (Line 6373) with centered 370px width
- **Progress Indicators**: 2px white progress bars (`.np-progress-bar`, Line 2400) with smooth transitions
- **Album Art Display**: Automatic fetching and migration for Spotify tracks via `migrateSpotifyAlbumArt()`
- **Control Integration**: Play/pause, next/previous with proper state management and click-to-expand functionality

### Audio Source Handling
- **Local Files**: Blob URL handling with proper memory management and cleanup
- **Remote URLs**: Direct audio streaming with error handling and fallback
- **Spotify Tracks**: Web Playback SDK integration with state synchronization and getCurrentState() API

### Key Functions
- `updateNowPlayingProgress()` (Line 11913): Main progress update coordinator with Spotify/audio detection
- `updateProgressBars()` (Line 11950): Visual progress bar updates for both chat and home screens
- `updateNowPlayingBarContent()` (Line 11899): Updates bar content and manages album art rotation
- `showHomeNowPlayingBar()` (Line 12022): Home screen bar management with rotation logic
- `migrateSpotifyAlbumArt()` (Line 9106): Automatic album art migration for existing tracks
- `showNowPlayingBar()` (Line 11832): Screen-aware bar visibility management
- `hideNowPlayingBar()` (Line 11968): Unified bar hiding with proper cleanup
- `initializeNowPlayingBar()` (Line 12031): Event listener setup for tap-to-expand functionality

### Music System Event Handlers
- **Audio Player Events**: `timeupdate`, `play`, `pause`, `ended` events for progress tracking
- **Now Playing Bar Clicks**: Tap-to-expand functionality for opening music player overlay
- **Spotify Player Events**: State change listeners for playback status updates
- **Progress Bar Updates**: Real-time progress updates via `setInterval` timers
- **Screen Navigation**: Automatic bar visibility management on screen changes

### CSS Classes for Music Components
- `.now-playing-bar` (Line 2305): Base now playing bar styling with pill-shaped design (border-radius: 50px)
- `.now-playing-bar.hidden` (Line 2321): Hidden state with transform and opacity transitions
- `.now-playing-content` (Line 2353): Flex container for bar content
- `.np-album-art` (Line 2360): Album art container (40px × 40px, circular)
- `.np-progress-bar` (Line 2472): Progress bar container (left: 28px, right: 28px)
- `.np-progress-fill` (Line 2482): Progress fill element with white background
- `.np-partner-avatar` (Line 2458): AI avatar styling (38px × 38px, no border)
- `.np-control-btn.play-pause` (Line 2446): Play/pause button (40px × 40px)
- `.has-now-playing` (Line 2488): Chat screen modifier when now playing bar is visible
- `.home-screen-bar` (Line 2328): Home screen specific styling (370px width, centered)
- `.np-album-art img.rotating` (Line 2494): Rotating album art animation (16s duration)
- `@keyframes rotate` (Line 2506): CSS animation for album art rotation

### Music System Implementation Status

#### Fully Implemented Features
- **Now Playing Bars**: Both chat screen and home screen bars with synchronized state
- **Progress Tracking**: Real-time progress bars with Spotify and regular audio support
- **Album Art Migration**: Automatic Spotify album art fetching for existing tracks
- **Cross-Screen Synchronization**: Consistent music state across all screens
- **Click-to-Expand**: Tap now playing bar to open full music player overlay
- **Listen Together Sessions**: Music sessions tied to specific chat conversations
- **Spotify Integration**: Full Web Playbook SDK integration with premium accounts
- **Rotating Album Art**: Album artwork rotates (16-second rotation) when music is playing on both bars
- **Modern UI Design**: Pill-shaped bars with circular album art and AI avatars

#### Technical Implementation Details
- **Progress Updates**: 100ms intervals for smooth progress bar animations
- **State Management**: Centralized musicState object with proper cleanup
- **Event Handling**: Comprehensive audio event listeners with error handling
- **Memory Management**: Proper cleanup of timers, intervals, and blob URLs
- **Database Integration**: Persistent playlist storage with migration support

#### User Experience Features
- **Seamless Transitions**: Smooth show/hide animations for now playing bars
- **Visual Consistency**: Spotify-style progress bars matching platform conventions
- **Responsive Design**: Proper positioning and sizing across different screen sizes
- **Error Handling**: Graceful fallbacks for network issues and API failures
- **Rotating Animation**: CSS-based album art rotation with 16-second duration for visual appeal
- **Shortened Progress Bar**: Progress bar is 16px shorter total (8px on each side) for better visual balance

## Key CSS Classes and IDs

### Screen Classes
- `.screen` - Base screen container
- `.screen.active` - Currently visible screen
- `.header` - Screen header bar
- `.back-btn` - Back navigation button
- `.action-btn` - Header action button

### Chat Interface
- `#chat-messages` - Message container
- `#message-input` - Text input field
- `#send-btn` - Send message button
- `.message` - Individual message wrapper
- `.user-message` - User's messages
- `.ai-message` - AI responses

### Share Link Components
- `#share-link-btn` - Share link button in chat input area
- `#share-link-modal` - Modal for entering link details
- `.link-share-card` - Link card display in chat bubbles
- `.is-link-share` - Message bubble class for shared links
- `#browser-screen` - Browser view for reading shared content
- `#browser-content` - Content area in browser view

### Navigation
- `#app-grid` - Home screen app icons
- `#chat-list-bottom-nav` - Chat list tab navigation
- `.nav-item` - Navigation tab items

### Music System Components
- `#now-playing-bar` - Chat screen now playing bar (Line 6925, left: 12px, right: 12px)
- `#home-now-playing-bar` - Home screen now playing bar (Line 6507, width: 370px, centered)
- `.now-playing-bar` - Base now playing bar styling with pill-shaped design (Line 2312, border-radius: 50px)
- `.now-playing-bar.hidden` - Hidden state with transform and opacity transitions (Line 2328)
- `.now-playing-content` - Flex container for bar content
- `.np-album-art` - Album art container (40px × 40px, circular)
- `.np-track-info` - Track title and artist info container
- `.np-playback-controls` - Play/pause button container
- `.np-progress-bar` - Progress bar container (left: 28px, right: 28px for shortened bar)
- `.np-progress-fill` - Progress fill element with white background
- `#np-album-image` - Chat screen album art image (circular, rotating when playing)
- `#home-np-album-image` - Home screen album art image (circular, rotating when playing)
- `#np-progress-fill` - Chat screen progress fill
- `#home-np-progress-fill` - Home screen progress fill
- `.has-now-playing` - Chat screen modifier when bar is visible
- `.np-partner-avatar` - AI avatar (38px × 38px, circular, no border)
- `.np-control-btn.play-pause` - Play/pause button (40px × 40px, circular)
- `.home-screen-bar` - Home screen specific styling modifier
- `.np-album-art img.rotating` - Rotating album art animation (16s duration)
- `@keyframes rotate` - CSS animation for album art rotation

### App Icon Customization Components
- `#app-icon-customization-list` - Container for app icon customization fields
- `.app-icon-item` - Individual app icon customization card
- `.app-icon-preview` - Preview area showing current icon and app name
- `.app-icon-input` - URL input field for custom icons
- `.app-icon-actions` - Container for apply/reset buttons
- `.app-icon-btn` - Action buttons (apply/reset)

### Calendar Components
- `#calendar-screen` - Main calendar screen container
- `#calendar-grid` - Calendar date grid (5 rows × 7 days)
- `.calendar-date` - Individual calendar date cells
- `.memory-indicator` - Blue dots on dates with memories
- `#calendar-events-list` - Scrollable memory/event cards container
- `.calendar-memory-item` - Individual memory/event cards
- `.memory-type` - Pale yellow styling for memories
- `.countdown-type` - Purple gradient styling for events
- `#calendar-add-btn` - Add button in calendar header
- `#add-memory-type-modal` - Modal for choosing memory vs event
- `#create-memory-modal` - Modal for creating memories
- `#create-countdown-modal` - Modal for creating events

## Data Structure

### Main State Object (Line 8263)
```javascript
state = {
    chats: {},           // All chat conversations
    activeChatId: null,  // Currently open chat
    globalSettings: {},  // App-wide settings (includes appIcons, fontUrl, etc.)
    apiConfig: {},       // API configuration
    userStickers: [],    // Custom stickers
    worldBooks: [],      // World book entries
    personaPresets: [],  // Character presets
    qzoneSettings: {},   // Social features settings
    activeAlbumId: null  // Currently viewing album
}
```

### Music State Object (Line 8264)
```javascript
musicState = {
    isActive: false,              // Whether music session is active
    activeChatId: null,           // Chat ID for current music session
    isPlaying: false,             // Current playback state
    playlist: [],                 // Current playlist array
    currentIndex: -1,             // Index of currently playing track
    playMode: 'order',            // Playback mode (order/shuffle/repeat)
    totalElapsedTime: 0,          // Total elapsed time in seconds
    timerId: null,                // Timer for progress updates
    currentSpotifyPlaylist: null, // Current Spotify playlist object
    spotifyPlaylistTracks: [],    // Spotify playlist tracks array
    isPlayingFromPlaylist: false, // Whether playing from Spotify playlist
    mainPlaylist: []              // Main playlist backup
}
```

### Additional Global Variables (Lines 8266-8340)
```javascript
// Spotify Integration
let spotifyPlayer = null;         // Spotify Web Playback SDK player
let spotifyAccessToken = null;    // Spotify API access token
let spotifyDeviceId = null;       // Spotify device ID

// UI State Management
let isSelectionMode = false;      // Message selection mode
let selectedMessages = new Set(); // Selected message timestamps
let editingMemberId = null;       // Currently editing member ID
let editingWorldBookId = null;    // Currently editing world book ID
let editingPersonaPresetId = null; // Currently editing persona preset ID
let editingMemoryId = null;       // Currently editing memory ID

// Timer Management
let inactivityTimers = {};        // User inactivity timers
let focusModeTimers = {};         // Focus mode timers
let waimaiTimers = {};            // Delivery countdown timers

// Photo and Media State
let photoViewerState = {
    isOpen: false,
    photos: [],
    currentIndex: -1
};

// Notification and UI
let notificationTimeout;          // Notification display timeout
let unreadPostsCount = 0;         // Unread social posts count
let simulationIntervalId = null;  // Battery simulation interval
```

### Database Tables (Dexie) - Version 22 Schema (Line 9490)
- `chats` - Chat conversations with group support (`&id, isGroup, groupId`)
- `apiConfig` - API configuration settings (`&id`)
- `globalSettings` - App-wide settings including appIcons, fonts (`&id`)
- `userStickers` - Custom sticker collection (`&id, url, name, order, packId`)
- `worldBooks` - World book entries for AI context (`&id, name`)
- `musicLibrary` - Music playlist storage (`&id`)
- `personaPresets` - Character preset templates (`&id`)
- `qzoneSettings` - Social features configuration (`&id`)
- `qzonePosts` - Social media posts (`++id, timestamp, authorId, isPinned`)
- `qzoneAlbums` - Photo album collections (`++id, name, createdAt`)
- `qzonePhotos` - Individual photos in albums (`++id, albumId`)
- `favorites` - Favorited messages and content (`++id, type, timestamp, originalTimestamp`)
- `qzoneGroups` - Social groups management (`++id, name`)
- `memories` - Memory and event entries (`++id, chatId, timestamp, type, targetDate`)
- `bulletins` - Group bulletin/announcement system (`++id, chatId, timestamp, isPinned`)

### App Icon Data Structure
```javascript
state.globalSettings.appIcons = {
    'qq': 'https://files.catbox.moe/janu1z.png',      // QQ app icon URL
    'moments': 'https://files.catbox.moe/65cdyc.png', // 朋友圈 app icon URL
    'settings': 'https://files.catbox.moe/xmo1uf.png' // 设置 app icon URL
}
```

## Common Search Patterns

### Finding Screens
- Search: `id="[name]-screen"`
- Pattern: All screens end with `-screen`
- Screen definitions: Lines 6959-8845

### Finding Functions
- Search: `function [name]` or `async function [name]`
- Major functions start around line 8955+
- Meetup mode functions: Lines 10147-10703

### Finding Event Handlers
- Search: `onclick="[function]"`
- Search: `addEventListener`

### Finding CSS Classes
- Search: `\.[class-name]` in CSS section (lines 13-6933)
- Search: `class="[class-name]"` in HTML section

### Finding Specific Features
- **Meetup Mode**: Search for `meetup` or lines 7936-8000, 10147-10703
- **Bulletin Board**: Search for `bulletin` or lines 6741-6876, 8727-8753
- **Music System**: Search for `now-playing` or `musicState`
- **Calendar System**: Search for `calendar` or line 7785
- **QZone/Social**: Search for `qzone` or line 7186
- **Share Links**: Search for `share-link` or line 7923

## Share Link Feature (New Addition)

### Overview
The share link feature allows users to share articles, links, or any text content with AI characters in a structured format. Shared links appear as interactive cards in chat bubbles and can be clicked to view full content in a browser-like interface.

### Components Added

#### HTML Elements
- **Share Link Button**: Added to `#chat-input-actions-top` - Link icon button to trigger sharing
- **Share Link Modal**: Form modal with fields for title, description, source name, and full content
- **Browser Screen**: New screen (`#browser-screen`) for viewing shared content with back navigation

#### CSS Styles
- **Link Card Styles**: `.link-share-card` with title, description, and footer
- **Browser Styles**: `#browser-screen` and `#browser-content` for article viewing
- **Message Bubble Styles**: `.is-link-share` class for link message bubbles

#### JavaScript Functions
- **openShareLinkModal()**: Opens the share form modal
- **sendUserLinkShare()**: Creates and sends share_link message type
- **openBrowser(timestamp)**: Opens browser view with shared content
- **closeBrowser()**: Returns to chat interface from browser

#### Message Type
- **share_link**: New message type with properties:
  - `title`: Article/link title (required)
  - `description`: Brief summary (optional)
  - `source_name`: Source website name (optional)
  - `content`: Full article content (optional)
  - `timestamp`: For browser navigation

#### Event Handlers
- Share button click → opens modal
- Modal confirm → sends share_link message
- Link card click → opens browser view
- Browser back button → returns to chat

### AI Integration
- AI can see shared links in conversation context
- Shared content is formatted for AI understanding
- AI receives full article content when available

### Usage Flow
1. User clicks share link button (🔗) in chat input
2. Fills out form with title (required) and optional details
3. Clicks "分享" to send link card to chat
4. Link appears as clickable card in chat bubble
5. Clicking card opens browser view with full content
6. Back button returns to chat interface

## App Icon Customization Feature (New Addition)

### Overview
The app icon customization feature allows users to customize the icons for all home screen apps through the 外观设置 (Appearance Settings) screen. Users can set custom URLs for app icons, with persistent storage and automatic application to the home screen.

### Components Added

#### HTML Elements
- **App Icon Customization Section**: Added to `#appearance-settings-screen` in the form container
- **Customization List Container**: `#app-icon-customization-list` - dynamically populated with app icon fields
- **Individual App Cards**: Each app gets a card with preview, URL input, and action buttons

#### CSS Styles (Lines 485-546)
- **Container Styles**: `#app-icon-customization-list` with full-width layout matching other form elements
- **App Icon Cards**: `.app-icon-item` (Line 485) with proper spacing and borders
- **Preview Elements**: `.app-icon-preview` (Line 493) showing current icon and app name
- **Input Styling**: `.app-icon-input` (Line 512) for URL input fields
- **Button Styling**: `.app-icon-btn` (Line 529) with primary/secondary variants

#### JavaScript Functions
- **renderAppIconCustomization()**: Renders the customization interface with current settings
- **updateAppIcon(appId)**: Updates app icon URL and applies changes
- **resetAppIcon(appId, defaultUrl)**: Resets app icon to default
- **applyAppIconsToHomeScreen()**: Applies custom icons to home screen elements

#### Data Structure
- **state.globalSettings.appIcons**: Object storing custom icon URLs by app ID
- **Database Storage**: Persistent storage in IndexedDB under 'appIcons' key
- **Default Icons**: Fallback URLs for QQ, 朋友圈, and 设置 apps

#### App Icon Mappings (Line 9244)
- **qq**: First app icon (QQ) - `div.app-icon:nth-child(2) img`
- **moments**: Second app icon (朋友圈) - `div.app-icon:nth-child(3) img`
- **settings**: Third app icon (设置) - `div.app-icon:nth-child(4) img`

### Usage Flow
1. Navigate to Home → 设置 → 外观设置
2. Scroll to "应用图标自定义" section
3. Enter custom icon URL in any app's input field
4. Click "应用" to update the icon immediately
5. Click "重置" to restore default icon
6. Changes are automatically saved and persist across app restarts

### Technical Implementation
- **Screen Integration**: Integrated with existing `renderWallpaperScreen()` function
- **Global Functions**: `updateAppIcon` and `resetAppIcon` attached to window object
- **Auto-loading**: Icons applied on app startup via `applyAppIconsToHomeScreen()`
- **Error Handling**: Validation for empty URLs with user feedback
- **Extensible Design**: Easy to add new apps by updating the defaultAppIcons array

## Home Screen Dock Positioning (Recent Changes)

### Dock Positioning Update
- **24px Adjustment**: Moved blur dock and app icons 24px closer to bottom edge
- **CSS Change**: Added `margin-bottom: -24px` to `#app-grid`
- **Visual Improvement**: Better visual balance with dock positioned closer to screen bottom
- **Unified Movement**: Both app icons and blur container move together as intended

## Appearance Settings Screen Enhancements

### Separator Lines Addition
- **Visual Consistency**: Added separator lines between all sections to match API settings screen
- **CSS Fix**: Resolved issue where `align-items: center` was hiding `hr` elements
- **Specific Styling**: Added `#appearance-settings-screen hr` rules (Line 4826) to ensure visibility
- **Section Separation**: Clear visual separation between wallpaper, app icons, charm styles, and fonts

### Screen Structure
```
外观设置 Screen:
┌─────────────────────┐
│ 壁纸设置            │
├─────────────────────┤  ← Separator line
│ 应用图标自定义      │
├─────────────────────┤  ← Separator line
│ 自定义挂件样式      │
├─────────────────────┤  ← Separator line
│ 字体设置            │
└─────────────────────┘
```

## UI/UX Modifications (Previous Changes)

### Tap Feedback Removal
All button tap feedback (visual scaling effects) have been removed for cleaner UI:

#### CSS Changes Made:
- **Removed `:active` transform scale effects** from all button types:
  - `.app-icon:active .icon-bg` - removed `transform: scale(0.9)`
  - `#wait-reply-btn:active` - removed `transform: scale(0.9)`
  - `.transfer-actions button:active` - removed `transform: scale(0.95)`
  - `.music-controls button:active` - removed `transform: scale(0.9)`
  - `.call-action-btn:active` - removed `transform: scale(0.9)`
  - `.control-btn:active` - removed `transform: scale(0.9)`
  - `nav a:active` (index.html) - removed `transform: translateY(-2px) scale(0.99)`

- **Removed transform transitions** from button elements:
  - `.app-icon .icon-bg` - removed `transition: transform 0.2s ease`
  - `.music-controls button` - removed `transition: transform 0.2s`
  - `.call-action-btn` - changed to `transition: box-shadow 0.2s` only
  - `.control-btn` - changed to `transition: background-color 0.2s` only
  - `.transfer-actions button` - removed `transition: transform 0.2s`
  - `nav a` (index.html) - changed to `transition: box-shadow 0.25s ease` only

- **Disabled browser tap highlights**:
  - Added `* { -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; }`

### Text Selection Configuration
Implemented selective text selection for optimal UX:

#### Text Selection DISABLED for:
- **UI Elements**: `.header`, `.back-btn`, `.action-btn`, `.save-btn`, `.app-icon`, `.nav-item`, `button`, `.form-button`, `.chat-action-icon-btn`, `.call-action-btn`, `.control-btn`, `.transfer-actions button`, `.music-controls button`
- **Modal Dialogs**: All confirmation popups and modal content
  - `.modal`, `.modal-content`, `.modal-header`, `.modal-body`, `.modal-footer`
  - `#custom-modal-overlay`, `#custom-modal`, `.custom-modal-header`, `.custom-modal-body`, `.custom-modal-footer`
  - Modal content elements: `.custom-modal-body p`, `.custom-modal-body span`, `.custom-modal-body div`, `.modal-body p`, `.modal-body span`, `.modal-body div`

#### Text Selection ENABLED for:
- **Chat Content**: `.message-bubble .content`, `.chat-messages`, `#chat-messages`
- **Content Areas**: `.list-item`, `.world-book-content`, `.qzone-post-content`, `.favorite-item-content`
- **Form Elements**: `input`, `textarea`
- **General Content**: `p`, `span`, `div` (except in modals and UI elements)

### Visual Changes
- **App Icon Backgrounds**: Changed from `rgba(247, 247, 247, 0.4)` to `rgb(247, 247, 247)` - removed 60% transparency for solid backgrounds

### Functional Impact
- **Buttons**: No visual feedback on tap/click, but full functionality preserved
- **Modal Dialogs**: Clean, non-selectable text in confirmation dialogs
- **Chat Messages**: Full text selection and copy functionality maintained
- **Content Areas**: Text selection preserved for all content areas
- **UI Elements**: Clean interface without accidental text selection

## Memory Edit Functionality (Latest Addition)

### Overview
Both the calendar and memories screens now support full edit functionality for memories and events. Users can edit content, dates, and delete items through consistent interfaces across both screens.

### Implementation Details

#### Calendar Screen Edit Interface
- **Three-Dot Menu**: Each memory/event card displays a `…` button using `post-actions-btn` class
- **QZone-Style Button**: Follows existing QZone post card pattern for consistency
- **White Text for Events**: Countdown-type cards show white three-dot button against purple gradient
- **Click Action**: Clicking `…` calls `showMemoryActions(memory.id)`

#### Memories Screen Edit Interface  
- **Long Press Activation**: Existing long press gesture now shows edit/delete options
- **No Visual Changes**: Maintains existing card design without additional UI elements
- **Consistent Modal**: Uses same action modal as calendar screen

#### Shared Action Modal System
- **Modal Reuse**: Uses existing `preset-actions-modal` with dynamic content
- **Dynamic Button Text**: 
  - For memories: "编辑记录" and "删除记录"
  - For presets: "编辑预设" and "删除预设" (original functionality preserved)
- **Context-Aware Actions**: Event listeners detect `editingMemoryId` vs `editingPersonaPresetId`

#### Edit Modal Integration
- **Modal Reuse**: Repurposes existing `create-memory-modal` and `create-countdown-modal`
- **Dynamic Titles**: Changes modal headers to "编辑回忆" or "编辑约定" during edit mode
- **Data Prefilling**: Automatically populates form fields with existing memory data
- **Date Formatting**: Converts timestamps to `datetime-local` input format
- **Save Logic**: Detects edit mode via `editingMemoryId` and uses `db.memories.put()` instead of `add()`

#### Cross-Screen Synchronization
- **Dual Refresh**: All edit operations refresh both `renderMemoriesScreen()` and `renderCalendarScreen()`
- **Consistent Data**: Changes made in either screen immediately reflect in the other
- **Shared Functions**: Both screens use identical `editMemory()` and `deleteMemory()` functions

### Technical Implementation

#### Global Variables
```javascript
let editingMemoryId = null; // Tracks memory being edited (Line 7841)
```

#### Key Functions (Lines 11300-11410)
- **`showMemoryActions(memoryId)`**: Shows action modal with memory-specific buttons
- **`hideMemoryActions()`**: Hides modal and resets editing state
- **`editMemory()`**: Opens appropriate modal with prefilled data based on memory type
- **`deleteMemory()`**: Shows confirmation and deletes memory with dual screen refresh

#### Modal Enhancement Logic
```javascript
// Dynamic modal title setting
if (memory.type === 'countdown') {
    document.querySelector('#create-countdown-modal .modal-header span').textContent = '编辑约定';
} else {
    document.querySelector('#create-memory-modal .modal-header span').textContent = '编辑回忆';
}
```

#### Save Function Modifications
- **Edit Mode Detection**: Both save functions check `if (editingMemoryId)` 
- **Update vs Create**: Uses `db.memories.put(memory)` for edits, `db.memories.add(newMemory)` for creation
- **State Cleanup**: Resets `editingMemoryId = null` and modal titles after save

### CSS Enhancements

#### Countdown Card Button Styling
```css
.calendar-memory-item.countdown-type .post-actions-btn {
    color: white !important;
}
```
- Ensures three-dot button is visible on purple gradient background

#### Navigation Fix
- **Duplicate Event Listener Prevention**: Added `window.calendarInitialized` flag
- **Single Initialization**: Calendar navigation buttons only get event listeners once
- **Fixed 3x Jump Bug**: Eliminated multiple event handlers causing triple navigation

### Usage Patterns

#### Calendar Screen Workflow
1. User clicks three-dot menu (…) on any memory/event card
2. Modal appears with "编辑记录" and "删除记录" options
3. Clicking "编辑记录" opens prefilled create modal
4. User modifies content/date and saves
5. Both calendar and memories screens refresh automatically

#### Memories Screen Workflow  
1. User long presses any memory/event card
2. Same action modal appears with edit/delete options
3. Edit flow identical to calendar screen
4. Cross-screen synchronization maintained

#### Data Validation
- **Date Validation**: Removed arbitrary future-date restrictions for countdowns
- **Content Validation**: Maintains existing required field validation
- **Type Preservation**: Edit operations preserve memory type (ai_generated vs countdown)

### Error Handling & Edge Cases
- **Missing Memory**: Functions check `if (!memory) return` before proceeding
- **Modal State**: Proper cleanup of `editingMemoryId` and modal titles
- **Navigation Prevention**: Calendar initialization flag prevents duplicate listeners
- **Cross-Screen Consistency**: All operations update both screens regardless of origin

## Calendar Memory Management Feature (Major Addition)

### Overview
The calendar app now includes comprehensive memory and event management functionality, allowing users to view, create, and delete memories/events directly from the calendar interface with visual indicators and proper styling.

### Calendar Screen Structure (Line 6856)
```html
<div id="calendar-screen" class="screen">
    <div class="header">
        <span class="back-btn" onclick="showScreen('home-screen')">‹</span>
        <span>日历</span>
        <span class="action-btn" id="calendar-add-btn">+</span>
    </div>
    <div class="form-container">
        <!-- Calendar month view -->
        <div class="calendar-month-view-no-card">
            <div class="calendar-header">
                <!-- Month navigation and display -->
            </div>
            <div class="calendar-grid" id="calendar-grid">
                <!-- Calendar dates populated by JavaScript -->
            </div>
        </div>
        <!-- Events list for selected day -->
        <div class="calendar-events-section">
            <div class="calendar-events-header">
                <!-- Day navigation -->
            </div>
            <div class="calendar-events-list" id="calendar-events-list">
                <!-- Memory/event cards populated by JavaScript -->
            </div>
        </div>
    </div>
</div>
```

### Calendar CSS Components (Lines 4840-5000)

#### Calendar Layout Styles
- **`.calendar-header`** (Line 4840): Month navigation container
- **`.calendar-nav-btn`** (Line 4847): Navigation buttons with hover effects
- **`.calendar-month-year`** (Line 4865): Month/year display styling
- **`.calendar-weekdays`** (Line 4871): Weekday header row
- **`.calendar-grid`** (Line 4877): 5x7 grid for calendar dates
- **`.calendar-date`** (Line 4883): Individual date cell styling
- **`.calendar-date.today`** (Line 4922): Today's date highlighting
- **`.calendar-date.selected`** (Line 4916): Selected date highlighting
- **`.calendar-date.other-month`** (Line 4910): Previous/next month dates

#### Memory Indicator Styles (Lines 4928-4942)
- **`.memory-indicator`** (Line 4933): Blue dots on dates with memories
  - 4px circular indicators positioned at bottom center of date cells
  - Uses `var(--accent-color)` for consistent theming

#### Events Section Styles (Lines 4944-5000)
- **`.calendar-events-section`** (Line 4944): Gray background container that bleeds to edges
- **`.calendar-events-header`** (Line 4951): Day navigation header
- **`.calendar-events-list`** (Line 4974): Scrollable container with 8px bottom spacing
- **`.no-events-message`** (Line 4979): Empty state message styling

#### Memory Card Styles (Lines 4985-5030)
- **`.calendar-memory-item`** (Line 4985): Base memory card styling
- **`.calendar-memory-item.memory-type`** (Line 4999): Pale yellow background for memories (`#fffaf0`)
- **`.calendar-memory-item.countdown-type`** (Line 5003): Purple gradient for events with white text
- **`.memory-header`** (Line 5012): Card header with avatar and info
- **`.memory-avatar`** (Line 5018): 40px circular avatar images
- **`.memory-info`** (Line 5024): Name and timestamp container
- **`.memory-nickname`** (Line 5022): Author name styling
- **`.memory-timestamp`** (Line 5028): Date/time and type indicator

### Calendar JavaScript Functions (Lines 9603-9880)

#### Global Calendar Variables (Lines 9603-9607)
```javascript
let calendarToday = new Date();
let currentMonth = calendarToday.getMonth();
let currentYear = calendarToday.getFullYear();
let selectedDate = calendarToday;
```

#### Core Calendar Functions
- **`renderCalendarScreen()`** (Line 9608): Main calendar initialization function
- **`updateCalendar()`** (Line 9609): Renders calendar grid with 35 dates (5 rows)
- **`updateSelectedDate()`** (Line 9708): Updates selected date display and loads memories
- **`addMemoryIndicators()`** (Line 9585): Adds blue dots to dates with memories
- **`getMemoriesForDate(selectedDate)`** (Line 9760): Queries memories for specific date
- **`renderCalendarMemories(memories)`** (Line 9798): Renders memory/event cards

#### Memory Management Functions
- **Three-Dot Menu Actions**: Calendar cards use `post-actions-btn` with `…` character for edit/delete options
- **Long Press Actions**: Memories screen cards use long press to show edit/delete modal
- **Edit Functionality**: Both screens use shared `editMemory()` and `deleteMemory()` functions
- **Modal Reuse**: Uses existing `preset-actions-modal` with dynamic button text
- **Type-specific Styling**: Automatically applies `.memory-type` or `.countdown-type` classes
- **Avatar Handling**: Uses `state.qzoneSettings.avatar` for manual memories, chat avatars for AI memories

### Calendar Event Handlers (Lines 9720-9760)

#### Navigation Event Listeners
- **Month Navigation**: `prev-month-btn` and `next-month-btn` call `updateCalendar()`
- **Day Navigation**: `prev-day-btn` and `next-day-btn` update `selectedDate`
- **Date Selection**: Click handlers on calendar dates update selection and refresh view
- **Add Button**: `calendar-add-btn` opens memory/event creation modal

### Memory Creation Modals (Lines 7530-7580)

#### Add Type Selection Modal (`#add-memory-type-modal`)
- Allows users to choose between creating memories or events
- Two buttons: "📝 添加回忆" and "📅 添加约定/事件"

#### Create Memory Modal (`#create-memory-modal`)
- **Memory Description**: Textarea for memory content
- **Memory Date/Time**: `datetime-local` input with current time default
- **Save Logic**: Creates memory with `chatId: 'manual'` and `type: 'ai_generated'`

#### Create Event Modal (`#create-countdown-modal`)
- **Event Title**: Text input for event name
- **Event Date/Time**: `datetime-local` input for future dates
- **Save Logic**: Creates countdown with `type: 'countdown'` and `targetDate`

### Calendar Integration Points

#### Database Integration
- **Memory Storage**: Uses existing `db.memories` table
- **Memory Types**: 
  - `'ai_generated'` for regular memories (pale yellow cards)
  - `'countdown'` for events/appointments (purple gradient cards)
- **Manual Memory Structure**:
  ```javascript
  {
      chatId: 'manual',
      authorName: '我',
      description: 'memory content',
      timestamp: Date.getTime(),
      type: 'ai_generated'
  }
  ```

#### UI Refresh Logic
- **After Creation**: Calls both `renderMemoriesScreen()` and `renderCalendarScreen()`
- **After Deletion**: Calls `renderCalendarScreen()` to refresh calendar view
- **Memory Indicators**: Automatically updated when calendar refreshes

### Calendar Technical Implementation

#### Date Calculation Logic
- **Calendar Grid**: Generates 35 dates (5 weeks) starting from first Sunday of month view
- **Memory Filtering**: Uses `toDateString()` comparison for exact date matching
- **Cross-month Support**: Properly handles dates from previous/next months in grid

#### Memory Indicator System
- **Database Query**: Fetches all memories and groups by date
- **DOM Manipulation**: Adds `.memory-indicator` divs to calendar date cells
- **Data Attributes**: Stores full date string on each calendar cell for accurate matching

#### Responsive Design
- **Flexible Layout**: Calendar adapts to different screen sizes
- **Touch Interactions**: Long press for deletion, tap for selection
- **Scroll Behavior**: Events section scrolls independently with proper spacing

## Memories Screen Edit Integration

### Overview
The memories screen (回忆) now supports the same edit functionality as the calendar screen, using long press gestures to access edit/delete options.

### Implementation Changes

#### Modified Long Press Handlers
- **createMemoryCard()**: Long press now calls `showMemoryActions(memory.id)` instead of direct delete
- **createCountdownCard()**: Long press now calls `showMemoryActions(countdown.id)` instead of direct delete
- **Consistent Modal**: Uses same `preset-actions-modal` as calendar screen

#### User Experience
- **Familiar Gesture**: Maintains existing long press interaction pattern
- **Enhanced Options**: Users now get edit option in addition to delete
- **Visual Consistency**: Same action modal appearance as calendar screen
- **Cross-Screen Sync**: Edits made in memories screen immediately reflect in calendar

#### Technical Details
- **Function Reuse**: Uses identical `showMemoryActions()`, `editMemory()`, and `deleteMemory()` functions
- **Screen Refresh**: All operations call both `renderMemoriesScreen()` and `renderCalendarScreen()`
- **Modal Integration**: Seamlessly integrates with existing create modal system

### Memories Screen Usage Patterns

#### Common User Flows
1. **View Memories**: Navigate to chat list → memories tab → view chronological list
2. **Create Memory**: Use calendar screen or AI-generated memories
3. **Edit Memory**: Long press memory card → choose "编辑记录" → modify data → save
4. **Delete Memory**: Long press memory card → choose "删除记录" → confirm deletion
5. **View Countdowns**: Active countdowns appear at top with live timers

### Calendar Usage Patterns

#### Common User Flows
1. **View Memories**: Select date → view memory cards in bottom section
2. **Create Memory**: Click + → choose type → fill form → save
3. **Edit Memory**: Click three-dot menu (…) → choose "编辑记录" → modify data → save
4. **Delete Memory**: Click three-dot menu (…) → choose "删除记录" → confirm deletion
5. **Navigate Dates**: Use month/day navigation or tap calendar dates

#### Integration with Memories Screen
- **Shared Database**: Both screens use same `db.memories` table
- **Consistent Styling**: Memory cards use similar design patterns
- **Cross-screen Updates**: Changes in one screen reflect in the other
- **Unified Edit System**: Both screens use identical edit/delete functionality
- **Different Interactions**: Calendar uses three-dot menu, memories screen uses long press
- **Same Modal System**: Both screens share the `preset-actions-modal` for edit/delete options

## Bulletin Board System (New Feature)

### Overview
The bulletin board system allows group chats to have persistent announcements and notices that all members can view. Bulletins can be pinned for priority and support comments like QZone posts.

### Components

#### HTML Elements
- **Bulletin Board Button**: Added to chat interface action bar with bulletin icon
- **Bulletin Board Modal**: Full-screen modal (`#bulletin-board-modal`) for viewing all bulletins
- **Bulletin Actions Modal**: Action menu (`#bulletin-actions-modal`) for pin/delete operations
- **Bulletin Cards**: Individual bulletin display cards with pinned styling

#### CSS Styles (Lines 6741-6876)
- **`.bulletin-card`**: Base bulletin card styling with background and padding
- **`.bulletin-card.pinned`**: Special styling for pinned bulletins with gold left border and pin emoji
- **`.bulletin-actions-btn`**: Three-dot menu button for bulletin actions
- **`.message-bubble.is-bulletin`**: Special styling for bulletin messages in chat

#### JavaScript Functions
- **Bulletin Management**: Functions for creating, editing, deleting, and pinning bulletins
- **Modal Integration**: Bulletin board modal with scrollable list and action menus
- **Chat Integration**: "发布到公告板" option in message action menu

#### Database Integration
- **bulletins Table**: Stores bulletin data with chatId, timestamp, and isPinned fields
- **Cross-Chat Support**: Bulletins are scoped to specific group chats
- **Persistent Storage**: Bulletins persist across app sessions

### Usage Flow
1. User long-presses message in group chat → selects "发布到公告板"
2. Message is converted to bulletin and stored in database
3. Users can access bulletin board via bulletin icon in chat interface
4. Bulletins can be pinned/unpinned and deleted via three-dot menu
5. Pinned bulletins appear at top with special gold styling

## AI Date Mode System (Major Feature)

### Overview
AI Date Mode is a comprehensive system for managing real-world meetups and dates with AI characters. It combines calendar events, specialized chat interfaces, and persistent memory storage to create immersive dating experiences.

### Core Components

#### Date Mode Calendar Integration
- **Calendar Events**: Special "meetup" type events in the memories database
- **Event Creation**: Users can create date events with location, time, and context
- **History Storage**: Completed dates are stored with full conversation history
- **Visual Indicators**: Calendar shows dates with special meetup indicators

#### Meetup Screen Interface (Line 8076)
- **Context Bar**: Shows location, time, and current phase information
- **Message Container**: Specialized message rendering with behavioral notation support
- **Input Area**: Enhanced input with date-specific placeholder and actions
- **Selection Mode**: Multi-select functionality for meetup messages
- **Progress Tracking**: Visual progress bars for date duration

#### Key Features
- **Behavioral Notations**: Processes text in parentheses as behavioral descriptions
- **Event Context**: Tracks location, time, and interaction phase
- **Phase Transitions**: Visual indicators for interaction progression
- **Message Actions**: Edit, delete, and selection modes specific to meetup conversations
- **AI Integration**: Specialized AI responses for contextual interactions
- **Persistent History**: All date conversations are permanently stored and reviewable

#### JavaScript Functions (Lines 10315-11021, 18740-19500)
- **Date Creation**: `createDateCalendarEvent()`, `updateExistingCalendarEvent()`
- **Session Management**: `initiateMeetupSession()`, `endMeetupSession()`, `hasActiveMeetupSession()`
- **Message Processing**: `processBehavioralNotations()`, `createMeetupMessage()`, `renderMeetupMessages()`
- **Context Management**: `updateMeetupContext()`, `getMeetupSessionFromEvent()`
- **History Management**: `openMeetupHistory()`, `updateCalendarEventMeetupData()`, `deleteMeetupMessages()`
- **Input Handling**: `initializeMeetupInput()`, `sendMeetupMessage()`, `triggerMeetupAiResponse()`
- **Selection System**: `enterMeetupSelectionMode()`, `toggleMeetupMessageSelection()`, `deleteMeetupSelectedMessages()`

### Database Integration
- **memories Table**: Stores date events with `type: 'meetup'` and `meetupData` object
- **Chat History**: Date conversations stored in regular chat history with `meetup` metadata
- **Event Linking**: Messages linked to calendar events via `eventId` for organization

### Usage Patterns
1. **Date Planning**: User creates calendar event with location and time details
2. **Date Start**: User initiates date mode from calendar or chat interface
3. **Active Dating**: Specialized chat interface with behavioral notations and context tracking
4. **Date End**: System automatically saves conversation history to calendar event
5. **History Review**: Users can revisit past dates through calendar interface
6. **Memory Management**: Edit/delete date messages with specialized tools

### Technical Implementation
- **Session State**: Global variables track active meetup session and event ID
- **Message Metadata**: Date messages include meetup object with event and context data
- **Calendar Sync**: Date events automatically update with conversation summaries
- **Cross-Screen Integration**: Date mode accessible from multiple app screens
- **Error Handling**: Comprehensive error handling for session management and data persistence

## Red Packet System (New Feature - 2025)

### Overview
The red packet (红包) system allows users to send monetary gifts in group chats with two modes: random amount group packets and fixed amount direct packets.

### Components

#### Red Packet Types
- **Group Red Packets (拼手气红包)**: Random amount distribution among multiple recipients
- **Direct Red Packets (专属红包)**: Fixed amount for specific recipients

#### HTML Elements
- **Red Packet Button**: Added to chat interface action bar with red packet icon
- **Red Packet Modal**: Creation modal with tabs for group vs direct packets
- **Red Packet Details Modal**: Shows packet details and claim history
- **Red Packet Cards**: Interactive cards in chat bubbles with claim functionality

#### CSS Styles (Lines 6750-6861)
- **`.message-bubble.is-red-packet`**: Special styling for red packet messages
- **`.rp-details-item`**: Individual claim history items
- **Red packet card styling**: Interactive hover effects and claim buttons

#### JavaScript Functions
- **Red Packet Creation**: Functions for creating group and direct red packets
- **Claim System**: Handle red packet claiming with random amount distribution
- **Details Display**: Show claim history and remaining amounts

### Usage Flow
1. User clicks red packet button in chat interface
2. Selects group or direct packet type
3. Fills amount and recipient details
4. Packet appears as interactive card in chat
5. Recipients can claim packets with random amounts (group) or fixed amounts (direct)

## Voting/Poll System (New Feature - 2025)

### Overview
The voting system allows users to create polls with multiple options and real-time vote tracking in group chats.

### Components

#### Poll Features
- **Multiple Choice Options**: Support for multiple voting options
- **Real-time Results**: Live vote count updates and progress bars
- **Vote Tracking**: Track which users have voted
- **Poll Closure**: Ability to close polls and prevent further voting

#### HTML Elements
- **Poll Button**: Added to chat interface action bar with poll icon
- **Create Poll Modal**: Modal for creating polls with dynamic option inputs
- **Poll Cards**: Interactive voting cards in chat bubbles
- **Progress Visualization**: Visual progress bars showing vote distribution

#### CSS Styles (Lines 6862-7001)
- **`.message-bubble.is-poll`**: Special styling for poll messages
- **`.poll-card`**: Main poll card container with hover effects
- **`.poll-option-item`**: Individual voting options with progress bars
- **`.poll-option-bar`**: Visual progress indicators
- **`.poll-card.closed`**: Styling for closed polls

#### JavaScript Functions
- **Poll Creation**: Functions for creating polls with multiple options
- **Vote Handling**: Process user votes and update counts
- **Results Display**: Real-time vote count and percentage calculations
- **Poll Management**: Close polls and prevent further voting

### Usage Flow
1. User clicks poll button in chat interface
2. Enters poll question and multiple options
3. Poll appears as interactive card in chat
4. Users click options to vote
5. Real-time results show vote distribution
6. Poll creator can close voting when complete

## Recent Changes and Current Features (2024-2025 Updates)

### Complete Feature Set (Current Implementation)

#### AI Date Mode System (Major New Feature - 2025)
- **Calendar Integration**: Special meetup events with location and time tracking
- **Specialized Chat Interface**: Behavioral notation support and context awareness
- **Session Management**: Complete date session lifecycle from planning to history
- **Persistent Memory**: All date conversations permanently stored and reviewable
- **Visual Progress Tracking**: Real-time progress bars and phase indicators
- **Cross-Screen Integration**: Accessible from calendar, chat, and home screens

#### Music System (Fully Implemented)
- **Dual Now Playing Bars**: Chat screen and home screen bars with synchronized state
- **Spotify Integration**: Full Web Playback SDK integration with premium accounts
- **Progress Tracking**: Real-time progress bars with 100ms precision updates
- **Album Art Migration**: Automatic Spotify album art fetching for existing tracks
- **Rotating Album Art**: 16-second CSS rotation animation when music is playing
- **Listen Together Sessions**: Music sessions tied to specific chat conversations
- **Playlist Management**: Main playlist and Spotify playlist support
- **Cross-Screen Sync**: Consistent music state across all screens
- **Modern UI Design**: Pill-shaped bars (border-radius: 50px) with circular elements

#### Calendar and Memory System (Fully Implemented)
- **Calendar Interface**: Full month view with date navigation
- **Memory Indicators**: Blue dots on dates with memories/events
- **Memory Management**: Create, edit, delete memories and events
- **Event Types**: Regular memories (pale yellow) and countdowns (purple gradient)
- **Cross-Screen Editing**: Edit functionality in both calendar and memories screens
- **Three-Dot Menu**: Calendar cards use `…` button for actions
- **Long Press Support**: Memories screen uses long press for actions
- **Dual Screen Refresh**: Changes reflect immediately across both interfaces

#### App Icon Customization (Fully Implemented)
- **Custom Icon URLs**: Users can set custom icons for all home screen apps
- **Persistent Storage**: Icon settings saved in globalSettings.appIcons
- **Preview System**: Real-time preview of icon changes
- **Reset Functionality**: One-click reset to default icons
- **Auto-Application**: Icons applied automatically on app startup
- **Integration**: Seamlessly integrated into appearance settings screen

#### Share Link System (Fully Implemented)
- **Link Sharing Modal**: Form for title, description, source, and content
- **Interactive Cards**: Clickable link cards in chat bubbles
- **Browser View**: Full-screen browser for reading shared content
- **AI Integration**: Shared content visible to AI in conversation context
- **Message Type**: Dedicated `share_link` message type with structured data

#### Social Features (QZone System)
- **Dynamic Posts**: Social media-style post creation and viewing
- **Image Support**: Photo uploads with AI descriptions
- **Comment System**: Threaded comments on posts
- **Favorites Integration**: Favorite posts and messages
- **Group Management**: Social groups and friend organization
- **Bulletin System**: Group announcements and pinned messages
- **Red Packet System**: Group and direct red packet sending with random amounts
- **Voting/Poll System**: Create polls with multiple options and real-time voting

#### Voice and Media Features
- **Voice Messages**: Recording, playback, and transcript display
- **Image Compression**: Automatic image optimization for storage
- **Photo Albums**: Album creation and photo management
- **Video Calls**: Video call interface with group support
- **Media Viewer**: Full-screen photo and media viewing

#### Advanced UI Features
- **Modal System**: Comprehensive modal dialogs (confirm, alert, prompt)
- **Selection Mode**: Multi-select for messages and content
- **Notification System**: In-app notifications with avatars
- **Font Customization**: Custom font upload and URL support
- **Theme System**: Appearance customization and wallpaper management
- **Floating Charm**: Customizable floating phone charm widget

#### Data Management
- **Complete Backup/Restore**: Full app data export/import
- **Database Migration**: Automatic schema updates and data migration
- **Cross-Platform Sync**: Cordova-compatible file system integration
- **Memory Management**: Proper cleanup of timers, intervals, and resources

### Technical Improvements (Latest Updates)

#### Performance Optimizations
- **Function Deduplication**: Removed duplicate functions and cleaned up code
- **Event Handler Optimization**: Proper event listener management
- **Memory Leak Prevention**: Timer cleanup and resource management
- **Database Indexing**: Optimized database queries with proper indexes

#### UI/UX Enhancements
- **Tap Feedback Removal**: Eliminated visual scaling effects for cleaner UI
- **Text Selection Control**: Selective text selection for optimal UX
- **Separator Lines**: Visual consistency across settings screens
- **Component Sizing**: Standardized component dimensions and spacing

#### Code Organization
- **Comprehensive Function Documentation**: All functions properly documented
- **Consistent Naming**: Standardized function and variable naming
- **Error Handling**: Robust error handling throughout the application
- **Code Comments**: Detailed comments for complex functionality

### Current File Statistics
- **Total Lines**: 24,525 (updated from 23,167)
- **JavaScript Functions**: 150+ documented functions
- **CSS Classes**: 700+ styled components
- **Database Tables**: 15 tables with proper indexing
- **Screen Definitions**: 20 complete screen interfaces (including meetup-screen)
- **Feature Completeness**: All documented features fully implemented including bulletin board, meetup mode, red packets, and voting system

## Development Guidelines and Best Practices

### Code Architecture Principles
- **Single File Structure**: All code contained in one HTML file for Cordova compatibility
- **Embedded CSS**: All styles defined in `<head>` section for performance
- **Global State Management**: Centralized state objects for data consistency
- **Event-Driven Architecture**: Comprehensive event handling for user interactions
- **Database-First Design**: IndexedDB as primary data storage with proper indexing

### Code Order Requirements
- **CSS Loading**: CSS must load before HTML elements reference classes
- **Variable Declaration**: JavaScript variables declared before function definitions
- **Screen Definitions**: HTML screens defined before JavaScript showScreen() calls
- **Database Initialization**: Dexie setup completed before data operations
- **Global Variables**: Cross-function variables declared in global scope

### Function Organization Standards
- **Modal Functions**: All modal-related functions grouped together (Lines 8343-8449)
- **Screen Management**: Navigation and rendering functions centralized
- **Data Operations**: Database functions grouped by functionality
- **UI Updates**: Rendering functions follow consistent naming patterns
- **Event Handlers**: Event listeners properly scoped and cleaned up

### Modification Best Practices

#### Structural Changes
- **Preserve Line Order**: Maintain relative positioning when making changes
- **Test Navigation**: Verify screen transitions after structural modifications
- **Backup State**: Create state backups before modifying data structures
- **Verify Dependencies**: Check CSS class and function dependencies before renaming

#### UI and UX Guidelines
- **Consistent Styling**: Follow established design patterns for new components
- **Text Selection**: Maintain selective text selection rules (content vs UI elements)
- **Modal Behavior**: Ensure proper modal state cleanup and event handling
- **Cross-Screen Sync**: Update all relevant screens when data changes

#### Music System Guidelines
- **Timer Management**: Proper cleanup of intervals and timeouts
- **State Synchronization**: Keep musicState consistent across all components
- **Progress Updates**: Optimize DOM manipulation for smooth animations
- **Spotify Integration**: Handle network failures and API errors gracefully
- **Bar Visibility**: Synchronize now playing bar across screen transitions

#### Calendar and Memory System
- **Global Variables**: Maintain calendar variables in global scope
- **Dual Screen Refresh**: Update both calendar and memories screens on changes
- **Memory Indicators**: Refresh requires database query + DOM manipulation
- **Edit Functionality**: Proper state cleanup after edit operations
- **Event Listeners**: Prevent duplicate event listener registration

#### Database Operations
- **Schema Versioning**: Increment version number for schema changes
- **Index Optimization**: Use proper indexes for query performance
- **Data Migration**: Handle schema upgrades gracefully
- **Transaction Safety**: Use transactions for multi-table operations

### Performance Considerations
- **Function Deduplication**: Remove duplicate functions and consolidate logic
- **Event Handler Optimization**: Prevent memory leaks with proper cleanup
- **DOM Manipulation**: Batch DOM updates for better performance
- **Image Processing**: Implement compression for storage efficiency
- **Timer Management**: Clean up all timers and intervals on component destruction

### Error Handling Standards
- **API Failures**: Graceful degradation for network issues
- **Database Errors**: Proper error messages and recovery options
- **User Input Validation**: Client-side validation with user feedback
- **Resource Loading**: Fallback options for failed resource loads

### Testing and Validation
- **Cross-Screen Testing**: Verify functionality across all screens
- **Data Persistence**: Test backup/restore functionality
- **Music Playback**: Test both local and Spotify audio sources
- **Memory Management**: Verify proper cleanup of resources
- **UI Responsiveness**: Test on different screen sizes and orientations
- **Meetup Mode Testing**: Verify context tracking and behavioral notation processing
- **Bulletin Board Testing**: Test pin/unpin functionality and cross-chat isolation

### Code Documentation Requirements
- **Function Comments**: Document purpose, parameters, and return values
- **Complex Logic**: Explain non-obvious code sections
- **API Integration**: Document external service dependencies
- **State Management**: Document state object properties and usage
- **Event Handling**: Document event flow and dependencies

### Maintenance Patterns
- **Regular Cleanup**: Remove unused functions and variables
- **Code Review**: Check for potential memory leaks and performance issues
- **Documentation Updates**: Keep steering document synchronized with code
- **Version Control**: Track changes with meaningful commit messages
- **Feature Testing**: Comprehensive testing before feature completion

## Quick Reference for AI Development

### Key Global Variables (Lines 8870-8900)
```javascript
state = { chats: {}, activeChatId: null, globalSettings: {}, ... }
musicState = { isActive: false, playlist: [], currentIndex: -1, ... }
spotifyPlayer = null; // Spotify Web Playback SDK player
isSelectionMode = false; // Message selection state
editingMemoryId = null; // Currently editing memory
activeBulletinId = null; // Currently editing bulletin
previousScreen = null; // For meetup navigation
```

### Essential Functions for Common Tasks
- **Screen Navigation**: `showScreen(screenId)` (Line 9062)
- **Modal Dialogs**: `showCustomConfirm(title, message)` (Line 8965)
- **Database Operations**: `loadAllDataFromDB()` (Line 9940)
- **Chat Rendering**: `renderChatInterface()` (search for this function)
- **Music Control**: `togglePlayPause()` (search for this function)
- **Meetup Mode**: `sendMeetupMessage()` (Line 10308)
- **Bulletin Management**: Search for `bulletin` functions

### Database Schema Quick Reference
```javascript
db.version(21).stores({
    chats: '&id, isGroup, groupId',
    memories: '++id, chatId, timestamp, type, targetDate',
    bulletins: '++id, chatId, timestamp, isPinned',
    qzonePosts: '++id, timestamp, authorId, isPinned',
    // ... see full schema at Line 9040
});
```

### Screen ID Reference
- Main screens: `home-screen`, `chat-list-screen`, `settings-screen`
- Chat screens: `chat-interface-screen`, `meetup-screen`
- Media screens: `album-screen`, `calendar-screen`, `browser-screen`
- Settings screens: `api-settings-screen`, `appearance-settings-screen`
- Management screens: `contact-picker-screen`, `member-management-screen`