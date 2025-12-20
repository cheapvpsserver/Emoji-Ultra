// Home Page Specific JavaScript - Implements clicking emoji to jump to corresponding page
// Usage Instructions:
// 1. Batch added empty data-href attributes to 1923 emoji-cell elements in index.html
// 2. You can directly edit the index.html file and fill in custom links for each emoji in the data-href attribute
//    For example: <div class="emoji-cell" data-href="/your-custom-link.html">
// 3. Each emoji will jump to its corresponding data-href link when clicked
// 4. If data-href is empty, use default link (generated based on emoji name)
// 5. Clicking the emoji image (😀) will jump to the corresponding link
// 6. Clicking the copy text will copy the emoji without triggering a jump

document.addEventListener('DOMContentLoaded', function() {
    // Get all emoji-cell elements
    const emojiCells = document.querySelectorAll('.home-page .emoji-cell');
    
    // Add event handling for each emoji-cell
    emojiCells.forEach(function(cell) {
        // Get emoji-img and emoji-name elements
        const emojiImg = cell.querySelector('.emoji-img');
        const emojiNameEl = cell.querySelector('.emoji-name');
        
        // Add click event to emoji-img element to implement jump functionality
        if (emojiImg && emojiNameEl) {
            // Add click event to emoji-name element to ensure copy function works correctly
            emojiNameEl.addEventListener('click', function(e) {
                // Prevent event bubbling to parent element, avoid triggering jump functionality
                e.stopPropagation();
                
                // Implement copy functionality directly here, ensure copy text clicks work correctly
                const emojiImg = cell.querySelector('.emoji-img');
                if (emojiImg) {
                    const emoji = emojiImg.textContent;
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(emoji).then(() => {
                        // Create a simple copy success notification
                        const notification = document.createElement('div');
                        notification.textContent = 'Copied to clipboard: ' + emoji;
                        notification.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: #4CAF50;
                            color: white;
                            padding: 15px 20px;
                            border-radius: 5px;
                            z-index: 10000;
                            font-weight: bold;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                        `;
                        
                        // Add to page
                        document.body.appendChild(notification);
                        
                        // Remove notification after 3 seconds
                        setTimeout(() => {
                            notification.remove();
                        }, 3000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        // Prompt when copy fails
                        alert('Failed to copy emoji. Please copy it manually: ' + emoji);
                    });
                }
            });
            
            emojiImg.addEventListener('click', function(e) {
                // Prevent event bubbling to parent element, avoid triggering copy functionality
                e.stopPropagation();
                
                // Get custom jump link from data-href attribute
                const customHref = cell.getAttribute('data-href');
                
                // Get emoji name, used to build default link
                const emojiName = emojiNameEl.dataset.originalText || emojiNameEl.textContent;
                
                // Build default jump link
                // For example: "Grinning Face" -> "grinning-face.html"
                const safeEmojiName = emojiName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const defaultHref = `/Emoji-Vendors/${safeEmojiName}.html`;
                
                // Use custom link or default link
                const href = customHref || defaultHref;
                
                // Jump to corresponding page
                window.location.href = href;
            });
        }
    });
});
