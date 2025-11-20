# AI Date Mode Design Document

## Overview

The AI Date Mode feature creates immersive romantic experiences through a modal-driven workflow that seamlessly integrates with the existing chat and calendar systems. Users can initiate dates directly from AI chat conversations, which automatically creates calendar events to preserve all romantic interactions as lasting memories.

## Architecture

### Core Components

1. **Date Creation Modal System**
   - Modal interface for date setup (location, title)
   - Immediate date mode activation upon confirmation
   - Automatic calendar event creation

2. **Active Date Progress Tracking**
   - Persistent progress bar on home and chat screens
   - Real-time date status display with AI avatar
   - Quick return navigation to active date mode

3. **Date Mode Session Manager**
   - Tracks active date sessions with full message history
   - Manages date context and behavioral notations
   - Handles graceful date ending and data persistence

4. **Calendar Integration & History**
   - Automatic event creation with date mode indicator
   - Read-only history view of completed dates
   - Seamless transition between active and historical dates

## Components and Interfaces

### Date Creation Flow
```javascript
// Date Creation Modal
{
  location: string,        // "咖啡厅, 公园, 家里..."
  title: string,          // "浪漫晚餐, 散步约会..."
  chatId: string,         // Current AI chat context
  startTime: timestamp    // Automatic on modal confirmation
}
```

### Active Date Session
```javascript
{
  id: string,
  chatId: string,
  aiName: string,
  isActive: true,
  startTime: timestamp,
  endTime: null,
  details: {
    location: string,
    title: string,
    visitedLocations: Array<string>  // Future: multiple locations
  },
  messages: Array<DateModeMessage>,
  metadata: {
    duration: number,
    messageCount: number,
    behavioralNotations: Array<string>
  }
}
```

### Calendar Event Integration
```javascript
{
  id: string,
  title: string,           // From date creation modal
  date: timestamp,
  location: string,        // From date creation modal
  type: 'date_mode',
  hasDateModeHistory: true,
  dateModeData: {
    sessionId: string,
    chatId: string,
    aiName: string,
    isCompleted: boolean,
    messages: Array<DateModeMessage>,
    totalDuration: number,
    visitedLocations: Array<string>
  }
}
```

## UI Components and Flow

### 1. Date Initiation (From AI Chat)
- **Trigger**: Calendar icon button in chat header (between listen together and settings)
- **Modal**: Date creation form with location and title fields
- **Action**: "开始约会" button immediately starts date mode and creates calendar event

### 2. Active Date Progress Bar
- **Location**: Top of home screen and chat interface screen
- **Design**: Similar to music now-playing bar but thinner
- **Content**: AI avatar (left) + "约会进行中 - 与 [AI名字] 在 [地点]" text
- **Interaction**: Tap to return to active date mode screen

### 3. Date Mode Screen (Active)
- **Header**: "约会模式" title with back button and menu
- **Context Bar**: Location, time, phase info with "结束约会" button (right side)
- **Messages**: Full chat interface with behavioral notation highlighting
- **Input**: Enhanced input area for romantic expressions

### 4. Date Mode Screen (History View)
- **Header**: "约会回忆 - [Date Title]" with back button
- **Context Bar**: Original date info and all visited locations
- **Messages**: Read-only view of all date interactions (no input bar)
- **Navigation**: Accessed from calendar events with date mode history

### 5. Calendar Integration
- **Event Indicator**: Calendar icon (📅) to the LEFT of three-dot menu for events with date history
- **Event Card**: Standard calendar event display with date mode indicator
- **Interaction**: Tap event with history to open read-only date mode view

## Data Models

### DateModeSession
```javascript
class DateModeSession {
  constructor(chatId, aiName, location, title) {
    this.id = generateUniqueId();
    this.chatId = chatId;
    this.aiName = aiName;
    this.isActive = true;
    this.startTime = Date.now();
    this.endTime = null;
    this.details = {
      location: location,
      title: title,
      visitedLocations: [location]
    };
    this.messages = [];
    this.metadata = {
      duration: 0,
      messageCount: 0,
      behavioralNotations: []
    };
  }
}
```

### DateModeMessage
```javascript
class DateModeMessage {
  constructor(content, isUser, timestamp) {
    this.content = content;
    this.isUser = isUser;
    this.timestamp = timestamp;
    this.behavioralNotations = this.extractNotations(content);
    this.type = 'date_mode';
  }
  
  extractNotations(text) {
    const regex = /\[([^\]]+)\]/g;
    const notations = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      notations.push(match[1]);
    }
    return notations;
  }
}
```

### Active Date Progress Bar
```html
<!-- Similar to music now-playing bar but thinner -->
<div id="date-progress-bar" class="date-progress-bar hidden">
    <div class="date-progress-content">
        <div class="date-ai-avatar">
            <img id="date-ai-avatar-img" src="" alt="AI Avatar">
        </div>
        <div class="date-progress-info">
            <span id="date-progress-text">约会进行中 - 与 [AI名字] 在 [地点]</span>
        </div>
    </div>
</div>
```

### Date Creation Modal
```html
<div id="date-creation-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <span>开始约会</span>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="date-location-input">约会地点</label>
                <input type="text" id="date-location-input" placeholder="咖啡厅, 公园, 家里...">
            </div>
            <div class="form-group">
                <label for="date-title-input">约会主题</label>
                <input type="text" id="date-title-input" placeholder="浪漫晚餐, 散步约会...">
            </div>
        </div>
        <div class="modal-footer">
            <button id="cancel-date-btn" class="form-button-secondary">取消</button>
            <button id="start-date-btn" class="form-button">开始约会</button>
        </div>
    </div>
</div>
```

### Date End Confirmation Modal
```html
<div id="date-end-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <span>结束约会</span>
        </div>
        <div class="modal-body">
            <p>确定要结束这次约会吗？所有的美好回忆都会保存到日历中。</p>
        </div>
        <div class="modal-footer">
            <button id="cancel-end-date-btn" class="form-button-secondary">继续约会</button>
            <button id="confirm-end-date-btn" class="form-button">结束约会</button>
        </div>
    </div>
</div>
```

## Error Handling

### Date Creation Errors
- **Empty Fields**: Validate location and title before allowing start
- **Calendar Conflict**: Handle overlapping events with user notification
- **Storage Failure**: Retry mechanism for calendar event creation

### Active Date Management
- **Connection Loss**: Auto-save progress and maintain session state
- **App Backgrounding**: Preserve active date status across app lifecycle
- **Data Corruption**: Validate session data with recovery options

### Calendar Integration Errors
- **Event Creation Failure**: Fallback to local storage with sync retry
- **History Access Failure**: Graceful degradation with error messaging
- **Permission Issues**: Guide user through calendar access setup

## Testing Strategy

### User Flow Tests
- Complete date creation and activation flow
- Progress bar display and navigation functionality
- Date ending confirmation and calendar event finalization
- Historical date viewing from calendar events

### Integration Tests
- Calendar event creation and data persistence
- Message history preservation and retrieval
- Cross-screen navigation and state management
- Behavioral notation processing and display

### UI/UX Tests
- Modal responsiveness and form validation
- Progress bar visibility across different screens
- Date mode screen transitions (active vs history)
- Calendar event indicator display and interaction

## Security and Privacy

### Data Protection
- Encrypt date mode conversations in local storage
- Secure calendar event data with user consent
- Implement data retention controls for romantic content

### User Controls
- Allow complete deletion of date history
- Provide privacy settings for date mode features
- Enable selective sharing of date memories

### Content Safety
- Monitor behavioral notations for appropriateness
- Implement content filtering for sensitive topics
- Provide user reporting mechanisms for issues

## CSS Styling

### Date Progress Bar
```css
.date-progress-bar {
    position: fixed;
    top: 60px; /* Below status bar */
    left: 12px;
    right: 12px;
    height: 40px; /* Thinner than music bar */
    background: linear-gradient(135deg, #ff9a9e, #fecfef);
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    box-shadow: 0 2px 8px rgba(255, 154, 158, 0.3);
    z-index: 1000;
    transition: opacity 0.3s ease;
}

.date-progress-bar.hidden {
    opacity: 0;
    pointer-events: none;
}

.date-ai-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
}

.date-progress-info {
    flex: 1;
    color: white;
    font-size: 14px;
    font-weight: 500;
}
```

### Date Mode Screen Enhancements
```css
#date-mode-screen .context-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.end-date-btn {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
}

.calendar-memory-item .date-mode-indicator {
    margin-right: 8px;
    color: #8e44ad;
}
```

This updated design reflects the new modal-driven workflow with persistent progress tracking and seamless calendar integration, creating a more intuitive and engaging user experience.