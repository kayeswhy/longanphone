# CSS/UI Feature Differences: Lycheephone vs Longan

## Missing Screens in Longan

### 1. Lock Screen (`#lock-screen`)
- **Location in lycheephone**: Lines 7514-7600 (CSS), Lines 8685-8750 (HTML)
- **Features**:
  - Full-screen lock interface with background image
  - Large clock display (80px font)
  - Date display below clock
  - "向上轻扫以解锁" unlock hint with pulse animation
  - Swipe-up gesture to unlock
- **CSS Classes**: `#lock-clock-container`, `#lock-main-time`, `#lock-main-date`, `#unlock-hint`
- **Animation**: `@keyframes hint-pulse` - pulsing unlock hint

---

## Missing CSS Components in Longan

### 2. Toggle Switch Component (`.switch`, `.slider`)
- **Location in lycheephone**: Lines 439-490
- **Features**:
  - iOS-style toggle switch (50px × 24px)
  - Smooth sliding animation (0.4s transition)
  - Accent color when checked
  - Circular slider knob (18px)
- **CSS Classes**: `.switch`, `.slider`, `.slider:before`
- **States**: `input:checked+.slider`, `input:checked+.slider:before`

### 3. Border Preview Component
- **Location in lycheephone**: Lines 1194-1220
- **Features**:
  - Preview container for avatar borders (60px × 60px)
  - Border preview image display (50px × 50px)
  - "No border" text placeholder
- **CSS Classes**: `.border-preview-container`, `.border-preview`, `.no-border-text`
- **Usage**: Shows avatar border preview in chat settings

### 4. Numpad Component
- **Location in lycheephone**: Lines 1800-1870
- **Features**:
  - Numeric keypad grid (3×4 layout)
  - Circular buttons (70px diameter)
  - Dot indicators for password entry
  - Glassmorphism effect (backdrop-filter blur)
  - Transparent modal styling for numpad
- **CSS Classes**: 
  - `.numpad-dots` - Password dots display
  - `.numpad-grid` - 3-column grid layout
  - `.numpad-btn` - Circular number buttons
  - `.numpad-clear-btn` - Clear button styling
  - `.numpad-dot` - Individual password dot
  - `.numpad-dot.filled` - Filled password dot
- **Special Modal Styling**: 
  - `#custom-modal:has(.numpad-grid)` - Transparent modal
  - `#custom-modal-overlay:has(.numpad-grid)` - Top-aligned overlay

---

## Missing Modals in Longan

### 5. Chat Search Modal (`#chat-search-modal`)
- **Purpose**: Search within chat messages
- **Status**: Present in lycheephone, missing in longan

### 6. QZone Avatar Modal (`#qzone-avatar-modal`)
- **Purpose**: QZone avatar editing/selection
- **Status**: Present in lycheephone, missing in longan

### 7. Sticker Edit Modal (`#sticker-edit-modal`)
- **Purpose**: Edit sticker packs and custom stickers
- **Status**: Present in lycheephone, missing in longan

---

## CSS Class Count Comparison

- **Lycheephone**: 267 unique CSS classes
- **Longan**: 257 unique CSS classes
- **Difference**: 10 missing CSS classes in longan

---

## File Size Comparison

- **Lycheephone**: 26,743 lines
- **Longan**: 24,658 lines
- **Difference**: ~2,085 lines (7.8% smaller)

---

## Summary of Missing Features

### High Priority (UI/UX Impact)
1. ⏳ **Lock Screen** - Complete screen with animations (NOT YET ADDED)
2. ✅ **Toggle Switch Component** - Used throughout settings (ADDED)
3. ✅ **Border Preview** - Avatar border customization (ADDED)
4. ⏳ **Numpad Component** - Password/PIN entry (NOT YET ADDED)

### Medium Priority (Functionality)
5. ⏳ **Chat Search Modal** - Message search functionality
6. ⏳ **QZone Avatar Modal** - QZone profile customization
7. ⏳ **Sticker Edit Modal** - Sticker management

### Already Fixed - Avatar Borders
- ✅ Chat message avatar borders (40px, centered)
- ✅ QZone post avatar frames (67px, centered)
- ✅ QZone profile avatar (92px with borders-enabled)
- ✅ QZone status text below username

### Already Fixed - CSS Styling Parity
- ✅ Header padding: Changed from 20px to 12px (matches lycheephone)
- ✅ QZone header padding: Changed from 20px to 12px (matches lycheephone)
- ✅ QZone back button: Added 8px left margin for proper spacing
- ✅ Toggle Switch Component: Added iOS-style switches (50px × 24px)
- ✅ Border Preview Component: Added avatar border preview containers

---

## Recommendations

### Immediate Actions
1. Add lock screen functionality for app security
2. Implement toggle switch component for settings screens
3. Add border preview for avatar customization
4. Implement numpad for password/PIN features

### Future Enhancements
1. Add chat search modal for message searching
2. Implement QZone avatar modal for profile editing
3. Add sticker edit modal for sticker pack management

---

## Notes
- All CSS differences are purely visual/UI components
- No functional JavaScript differences identified yet
- Longan appears to be a simplified version of lycheephone
- Browser compatibility layer exists in longan root file


---

## CSS Styling Comparison Results

### ✅ Verified Identical
- **CSS Variables** (`:root`): All color and theme variables match
- **Font Sizes**: Distribution matches (except lock screen 80px font)
- **Border Radius**: All values match
- **Gap Spacing**: Minor differences only from missing lock screen
- **Transitions**: All match except lock screen hint-pulse animation
- **Chat List Items**: Styling is identical
- **Message Bubbles**: Styling is identical
- **App Icons**: Styling is identical

### ✅ Fixed Differences
1. **Header Padding**: `15px 20px` → `15px 12px`
2. **QZone Header Padding**: `15px 20px` → `15px 12px`
3. **QZone Back Button**: Added `margin-left: 8px`

### ⏳ Remaining Differences (From Missing Features)
1. **Lock Screen Animations**: `@keyframes hint-pulse` (not added yet)
2. **Lock Screen Fonts**: 80px font size (not added yet)
3. **Numpad Styling**: Glassmorphism effects (not added yet)

---

## Completion Status

### Phase 1: Avatar Borders ✅ COMPLETE
- All avatar border positioning fixed
- QZone profile avatar properly sized
- Status text added

### Phase 2: CSS Components ✅ COMPLETE
- Toggle Switch component added
- Border Preview component added
- Header padding standardized

### Phase 3: CSS Styling Parity ✅ COMPLETE
- All common CSS verified identical
- Minor spacing differences fixed
- No visual inconsistencies remaining

### Phase 4: Advanced Features ⏳ PENDING
- Lock Screen (requires JavaScript)
- Numpad Component (requires JavaScript)
- Missing Modals (requires HTML + JavaScript)

---

## Next Steps Recommendation

1. **Add Numpad Component** - Self-contained, low risk
2. **Add Lock Screen** - Requires gesture handling
3. **Add Missing Modals** - Requires full implementation

**Current Status**: Longan now has complete CSS/UI parity with lycheephone for all existing features. Only missing features are lock screen, numpad, and three modals.
