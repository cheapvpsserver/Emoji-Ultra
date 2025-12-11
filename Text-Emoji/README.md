# Emoji Detail Page Template

This is a template for creating emoji detail pages. The Grinning Face page serves as an example that you can copy and modify for other emojis.

## File Structure

```
Text-Emoji/
├── grinning-face.html       # Example emoji detail page
├── css/
│   └── grinning-face.css   # Example page-specific CSS
├── js/
│   └── grinning-face.js     # Example page-specific JavaScript
└── README.md                # This file
```

## Creating a New Emoji Page

1. **Copy the template files**:
   - Copy `grinning-face.html` and rename it to match your emoji (e.g., `smiling-face.html`)
   - Copy `css/grinning-face.css` and rename it accordingly
   - Copy `js/grinning-face.js` and rename it accordingly

2. **Edit the HTML file**:
   - Update the `<title>` and `<meta name="description">` tags for SEO
   - Update the user-visible `<h1>` title
   - Update the emoji characters and their ASCII variations
   - Update the Emoji Code section
   - Update the Emoji Meaning & Appearance section

3. **Edit the CSS file** (optional):
   - Modify styles if needed for different emoji types
   - Keep the basic structure intact for consistency

4. **Edit the JavaScript file** (optional):
   - The JavaScript is generic and should work for most pages
   - Modify only if you need custom functionality

## Page Features

- **Responsive Design**: Adapts to mobile devices
- **Two-column Layout**: Displays two emoji items per row on desktop
- **Copy Functionality**: Each emoji has a copy button
- **SEO Optimized**: Includes both user-visible and SEO-specific titles
- **Consistent Structure**: Easy to maintain and extend

## Usage

- **Emoji Display**: First item is always the actual emoji, followed by ASCII variations
- **Copy Buttons**: Click to copy the emoji or ASCII art to clipboard
- **Emoji Code**: Add emoji codes that can be used in HTML, CSS, etc.
- **Meaning Section**: Add detailed information about the emoji's meaning and appearance

## Technical Details

- **CSS Grid**: Used for the two-column layout
- **Flexbox**: Used for centering content
- **Media Queries**: For responsive design
- **ES6+ JavaScript**: For copy functionality and interactions
- **Modern Clipboard API**: For reliable copying

## Customization Tips

1. **Color Scheme**: Modify the `background-color`, `color`, and `border` properties in CSS
2. **Layout**: Adjust grid columns and gaps in the `.emoji-content` selector
3. **Font Sizes**: Modify font-size values for different screen sizes
4. **Copy Behavior**: Customize the copy success/failure messages in JavaScript
5. **Animation**: Add transitions and animations as needed

## Browser Support

- Chrome 60+
- Firefox 54+
- Safari 12+
- Edge 79+

## License

MIT
