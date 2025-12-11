// Grinning Face page-specific JavaScript
// Implements copy functionality and other interactive effects

document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    console.log('Found copy buttons:', copyButtons.length);
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the emoji or code to copy
            const emojiToCopy = this.getAttribute('data-emoji');
            
            if (emojiToCopy) {
                // Call the copy function
                copyToClipboard(emojiToCopy, this);
            }
        });
    });
    
    // Copy to clipboard function
    function copyToClipboard(text, button) {
        // Use navigator.clipboard API for copying
        navigator.clipboard.writeText(text)
            .then(() => {
                // Show copy success notification
                showCopySuccess(button);
            })
            .catch(err => {
                // Handle copy failure
                console.error('Failed to copy: ', err);
                showCopyError();
            });
    }
    
    // Show copy success notification
    function showCopySuccess(button) {
        // Save original button text
        const originalText = button.textContent;
        
        // Temporarily change button text to "Copied!"
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#4CAF50';
        
        // Restore original text and style after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#2196F3';
        }, 3000);
        
        // Create global notification - only show success message, no emoji
        createNotification('Copied successfully');
    }
    
    // Show copy error notification
    function showCopyError() {
        // Create error notification
        createNotification('Failed to copy. Please try again.', 'error');
    }
    
    // Create notification function
    function createNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.global-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `global-notification ${type}`;
        notification.textContent = message;
        
        // Set notification styles
        const styles = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: '0',
            maxWidth: '300px',
            wordWrap: 'break-word',
            textAlign: 'center'
        };
        
        // Set background color based on type
        if (type === 'error') {
            styles.backgroundColor = '#f44336';
        } else {
            styles.backgroundColor = '#4CAF50';
        }
        
        // Apply styles
        Object.assign(notification.style, styles);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(1)';
            notification.style.opacity = '1';
        }, 10);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
            notification.style.opacity = '0';
            
            // Remove notification element
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Initialization after page load
    function initPage() {
        console.log('Grinning Face page loaded successfully');
        
        // Add class for page loaded
        document.body.classList.add('page-loaded');
        
        // Can add other initialization logic here
    }
    
    // Call initialization function
    initPage();
    
    // Mobile adaptation handling
    function handleMobileAdaptation() {
        // Listen for window resize events
        window.addEventListener('resize', function() {
            updateLayout();
        });
        
        // Initial layout update
        updateLayout();
    }
    
    // Update layout function
    function updateLayout() {
        const width = window.innerWidth;
        const emojiContent = document.querySelector('.emoji-content');
        
        if (emojiContent) {
            // Always show one emoji per row regardless of window width
            emojiContent.style.gridTemplateColumns = '1fr';
        }
    }
    
    // Call mobile adaptation function
    handleMobileAdaptation();
});

// Export functions (if needed for use elsewhere)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Can export some functional functions
    };
}