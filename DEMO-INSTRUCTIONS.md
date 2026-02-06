# Hero Demo - Complete Instructions

## What I Created

✅ **hero-demo-complete.html** - A complete standalone file with the EXACT hero section from Career.html

## Features

This demo includes:
- ✨ Large tilted "DREAM" text at bottom (hollow with stroke)
- ✨ Video playing inside/behind the text
- ✨ Top text: "Join people who believe your next big dream deserves the best"
- ✨ Subtitle: "At Dream Desk."
- ✨ Clean white background
- ✨ ALL CSS from Career.html
- ✨ Geist and Caveat fonts loaded from Google Fonts
- ✨ Fully responsive design

## How to Test

1. Open `hero-demo-complete.html` in your browser
2. You should see the exact hero section from Career.html
3. The video `student_images.mp4` will play inside the large "DREAM" text

## How to Use in Your Index.html

### Option 1: Copy the Entire Section

1. Open `hero-demo-complete.html`
2. Copy everything from `<style>` tags in the `<head>` section
3. Paste into your index.html `<head>` section
4. Copy the entire `<div class="framer-ll2u5v">...</div>` section from the body
5. Replace your current `<div class="student-quote-wrapper">...</div>` with it

### Option 2: Use as Reference

1. Open both files side by side
2. Compare the structure
3. Copy specific parts you need

## Customization

### Change the Large Text
Find this section:
```html
<p>
  <span>
    <span>D</span>
    <span>R</span>
    <span>E</span>
    <span>A</span>
    <span>M</span>
  </span>
</p>
```

Change D, R, E, A, M to your desired text (one letter per `<span>`).

### Change the Video
Replace `student_images.mp4` with your video file path:
```html
<video src="YOUR-VIDEO.mp4" loop preload="auto" muted playsinline autoplay></video>
```

### Change Colors
- **Text stroke color**: Find `-webkit-text-stroke: 2px #000;` and change `#000` to your color
- **Background**: Find `background-color: #fff;` and change `#fff` to your color
- **Text color**: Find `color: #000;` and change to your color

### Adjust Text Size
- **Large text**: Find `font-size: 440px;` in `.framer-jcul6d p` and adjust
- **Top subtitle**: Find `font-size: 120px;` in `.framer-dnb8d0 p` and adjust
- **Main title**: Find `font-size: 48px;` in `.framer-1ebgzuc h2` and adjust

## Troubleshooting

**Video not showing:**
- Make sure `student_images.mp4` is in the same folder as the HTML file
- Check browser console for errors
- Try a different video format (MP4 is most compatible)

**Text too large/small:**
- Adjust the `font-size` values in the CSS
- Check responsive breakpoints for mobile sizes

**Layout broken:**
- Make sure you copied ALL the CSS
- Check that no closing tags are missing
- Clear browser cache and refresh

## File Structure

```
Dreandesk_website_animated_one/
├── hero-demo-complete.html  ← Open this to see the demo
├── student_images.mp4        ← Your video file
├── index.html                ← Your main file (to be updated)
└── DEMO-INSTRUCTIONS.md      ← This file
```

## Next Steps

1. **Test the demo** - Open `hero-demo-complete.html` in your browser
2. **If it works** - Copy the code to your index.html
3. **If it doesn't work** - Check the troubleshooting section above

The demo file is completely standalone and includes everything needed to work!
