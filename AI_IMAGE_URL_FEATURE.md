# AI Image URL Customization Feature

## Overview
This feature allows users to customize the image URL for AI-generated photos instead of always showing the hardcoded placeholder image.

## Changes Made

### 1. Display Logic Update (`renderChatInterface`)
**File:** `www/fullscreen.html` (around line 10020)

**Before:**
```javascript
contentHtml = `<img src="https://i.postimg.cc/KYr2qRCK/1.jpg" class="ai-generated-image" alt="${altText}" data-description="${msg.content}">`;
```

**After:**
```javascript
// Use custom URL if available, otherwise use default
const imageUrl = msg.imageUrl || "https://files.catbox.moe/cww7rw.jpg";
contentHtml = `<img src="${imageUrl}" class="ai-generated-image" alt="${altText}" data-description="${msg.content}">`;
```

### 2. Message Editor Templates Update
**Files:** Both `createMessageEditorBlock` and `openMessageEditor` functions

**Before:**
```javascript
image: { type: 'ai_image', description: '在这里输入图片描述' }
```

**After:**
```javascript
image: { type: 'ai_image', description: '在这里输入图片描述', imageUrl: 'https://files.catbox.moe/cww7rw.jpg' }
```

### 3. Message Editor Content Preparation
**Functions:** `openAdvancedMessageEditor` and `openMessageEditor`

**Added support for `imageUrl` field when preparing AI image messages for editing:**
```javascript
else if (message.type === 'ai_image') {
    fullMessageObject.description = message.content;
    // Always show imageUrl field, use existing or default
    fullMessageObject.imageUrl = message.imageUrl || "https://files.catbox.moe/cww7rw.jpg";
}
```

### 4. Message Saving Logic
**Function:** `saveEditedMessage`

**Added support for saving the `imageUrl` field:**
```javascript
if (parsedResult.imageUrl) newMessage.imageUrl = parsedResult.imageUrl;
```

## How It Works

### For Users:
1. **Editing AI Images:**
   - Long press any AI image message
   - Click "编辑" (Edit)
   - See JSON format with both `description` and `imageUrl` fields
   - Edit the `imageUrl` to any valid image URL
   - Save changes

2. **JSON Format Example:**
   ```json
   {
     "type": "ai_image",
     "description": "一只可爱的小猫在阳光下打哈欠",
     "imageUrl": "https://example.com/cat-photo.jpg"
   }
   ```

### For Developers:
- **Backward Compatibility:** Messages without `imageUrl` still work (use default placeholder)
- **API Safety:** Only `description` is sent to AI APIs, `imageUrl` is display-only
- **Data Structure:** `imageUrl` is stored as an optional field in message objects

## API Impact Analysis

### ✅ **SAFE - No Breaking Changes**

1. **API Request Format:** 
   - AI image messages are converted to: `[你收到了一张用户描述的照片，内容是：'${msg.content}']`
   - Only the `content` field (description) is sent to the API
   - The `imageUrl` field is never sent to API providers

2. **Message Processing:**
   - Existing `parseAiResponse` function unchanged
   - AI responses still create messages with `type: 'ai_image'` and `content: description`
   - No changes to AI instruction format

3. **Database Storage:**
   - New `imageUrl` field is optional
   - Existing messages without `imageUrl` continue to work
   - No migration needed

## Testing

### Manual Testing Steps:
1. Open the chat app
2. Find or create an AI image message
3. Long press the message → Edit
4. Modify the `imageUrl` field to a different image URL
5. Save and verify the new image displays
6. Verify clicking the image still shows the description popup

### Test File:
- `test_ai_image_url.html` - Visual demonstration of the feature

## Benefits

1. **Enhanced User Experience:** Users can customize AI image appearances
2. **Creative Freedom:** Users can match images to AI descriptions
3. **Visual Consistency:** Better integration with chat themes/styles
4. **No Performance Impact:** Only affects display, not API calls
5. **Backward Compatible:** Existing messages continue to work

## Future Enhancements

Potential future improvements:
- Image URL validation
- Image preview in editor
- Bulk image URL updates
- Integration with image hosting services
- AI-generated image URL suggestions

## Technical Notes

- The feature uses optional chaining: `msg.imageUrl || defaultUrl`
- All existing click handlers and CSS styles continue to work
- The `data-description` attribute is preserved for popup functionality
- Message editor templates provide example URLs for user guidance