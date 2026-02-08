# Integration Instructions for Hero Section

## Task
Replace the `student-quote-wrapper` section in `index.html` (around line 8292) with the hero section from `hero-demo-PERFECT.html`.

## Steps

### 1. Find the section to replace in index.html
Look for this section (around line 8292-8380):
```html
<div class="student-quote-wrapper">
    <!-- Left - Student Image -->
    ...
    <!-- All the content with student-img-box, welcome-box, etc. -->
</div>
```

### 2. Delete the entire student-quote-wrapper div
Delete from `<div class="student-quote-wrapper">` to its closing `</div>` tag.

### 3. Copy the hero section from hero-demo-PERFECT.html
Copy everything from `<div class="framer-ll2u5v">` to its closing `</div>` tag, including:
- All the CSS styles in the `<style>` tag in the `<head>`
- The HTML structure
- The JavaScript at the bottom

### 4. Paste into index.html
Paste the copied content where you deleted the student-quote-wrapper.

### 5. Update class names to avoid conflicts
Since index.html already has many styles, rename the hero section classes to be unique:
- `framer-ll2u5v` → `hero-section-wrapper`
- `framer-1eiawcr` → `hero-inner-container`
- `framer-3y1b7i` → `hero-top-text`
- `framer-1kfwg09` → `hero-text-container`
- `framer-dnb8d0` → `hero-caveat-text`
- `framer-su7jo2` → `hero-description`
- `framer-5tvmqk-container` → `hero-main-title-container`
- `framer-J6ugj` → `hero-main-title`
- `framer-1ebgzuc` → `hero-main-title-text`
- `framer-rqqsrm` → `hero-dream-container`
- `text-video-container` → `hero-text-video-container`
- `textCanvas` → `heroTextCanvas`
- `sourceVideo` → `heroSourceVideo`
- `framer-1gqk893` → `hero-bg-video`

### 6. Update JavaScript IDs
In the JavaScript section, update:
```javascript
const canvas = document.getElementById('heroTextCanvas');
const video = document.getElementById('heroSourceVideo');
```

### 7. Wrap JavaScript in IIFE
Wrap the JavaScript in an immediately invoked function expression to avoid variable conflicts:
```javascript
(function() {
    // All the JavaScript code here
})();
```

## Alternative: Use the hero-demo-PERFECT.html directly
If integration is too complex, you can:
1. Open `hero-demo-PERFECT.html` in a browser to see the working hero section
2. Use it as a reference to manually build the section in index.html
3. Copy styles and structure piece by piece

## Notes
- The hero section uses Geist font (weight 900) for the "DREAM" text
- The hero section uses Playfair font for "Join people who believe..." text  
- The hero section uses Caveat font for "At Dream Desk" text
- Make sure all font-face declarations are in the `<head>` section
- The video file path is `Sections_svgs/Background_page.mp4`
