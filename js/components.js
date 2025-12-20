// Function to load HTML components
function loadComponent(elementId, filePath) {
    // Use absolute path to ensure correct loading in all pages
    let fullPath;
    
    // For files in the includes directory, always use root-relative path
    if (filePath.startsWith('includes/')) {
        fullPath = '/' + filePath;
    } else {
        fullPath = filePath;
    }
    
    console.log('Loading component from:', fullPath);
    
    fetch(fullPath)
        .then(response => {
            console.log('Fetch response for', fullPath, ':', response.status, response.statusText);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            console.log('Successfully loaded component:', filePath);
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                // Re-initialize any necessary scripts after loading components
                if (filePath.includes('header')) {
                    initializeHeaderScripts();
                }
            } else {
                console.error('Element with id', elementId, 'not found');
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
            // Display error message in development environment
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<div style="color: red; padding: 10px; border: 1px solid red; margin: 10px;">
                    Error loading component: ${filePath} - ${error.message}
                </div>`;
            }
        });
}

// Initialize header scripts
function initializeHeaderScripts() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsContainer = document.getElementById('search-results-container');
    
    if (searchInput && searchResultsSection && searchResultsContainer) {
        // All emoji data (simplified version)
        const allEmojis = [
            { emoji: '😀', name: 'Grinning Face' },
            { emoji: '😂', name: 'Face with Tears of Joy' },
            { emoji: '🥰', name: 'Smiling Face with Hearts' },
            { emoji: '😎', name: 'Smiling Face with Sunglasses' },
            { emoji: '🤩', name: 'Star-Struck' },
            { emoji: '😍', name: 'Smiling Face with Heart-Eyes' },
            { emoji: '👍', name: 'Thumbs Up' },
            { emoji: '👎', name: 'Thumbs Down' },
            { emoji: '👏', name: 'Clapping Hands' },
            { emoji: '🙌', name: 'Raising Hands' },
            { emoji: '👐', name: 'Open Hands' },
            { emoji: '🤝', name: 'Handshake' },
            { emoji: '🐶', name: 'Dog Face' },
            { emoji: '🐱', name: 'Cat Face' },
            { emoji: '🐭', name: 'Mouse Face' },
            { emoji: '🐹', name: 'Hamster Face' },
            { emoji: '🐰', name: 'Rabbit Face' },
            { emoji: '🦊', name: 'Fox Face' },
            { emoji: '🍎', name: 'Red Apple' },
            { emoji: '🍐', name: 'Pear' },
            { emoji: '🍊', name: 'Tangerine' },
            { emoji: '🍋', name: 'Lemon' },
            { emoji: '🍌', name: 'Banana' },
            { emoji: '🍉', name: 'Watermelon' },
            { emoji: '🚗', name: 'Automobile' },
            { emoji: '🚕', name: 'Taxi' },
            { emoji: '🚙', name: 'Sport Utility Vehicle' },
            { emoji: '🚌', name: 'Bus' },
            { emoji: '🚎', name: 'Trolleybus' },
            { emoji: '🏎️', name: 'Racing Car' },
            { emoji: '⚽', name: 'Soccer Ball' },
            { emoji: '🏀', name: 'Basketball' },
            { emoji: '🏈', name: 'American Football' },
            { emoji: '⚾', name: 'Baseball' },
            { emoji: '🎾', name: 'Tennis' },
            { emoji: '🏐', name: 'Volleyball' },
            { emoji: '⌚', name: 'Watch' },
            { emoji: '📱', name: 'Mobile Phone' },
            { emoji: '💻', name: 'Laptop Computer' },
            { emoji: '⌨️', name: 'Keyboard' },
            { emoji: '🖥️', name: 'Desktop Computer' },
            { emoji: '🖨️', name: 'Printer' },
            { emoji: '❤️', name: 'Red Heart' },
            { emoji: '❣️', name: 'Heavy Heart Exclamation' },
            { emoji: '💕', name: 'Two Hearts' },
            { emoji: '💞', name: 'Revolving Hearts' },
            { emoji: '💓', name: 'Beating Heart' },
            { emoji: '💔', name: 'Broken Heart' }
        ];
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length === 0) {
                searchResultsSection.classList.add('hidden');
                return;
            }
            
            // Filter emojis
            const filteredEmojis = allEmojis.filter(emojiObj => 
                emojiObj.name.toLowerCase().includes(searchTerm) || 
                emojiObj.emoji.includes(searchTerm)
            );
            
            // Display search results
            displaySearchResults(filteredEmojis);
            searchResultsSection.classList.remove('hidden');
        });
        
        function displaySearchResults(emojis) {
            searchResultsContainer.innerHTML = '';
            
            if (emojis.length === 0) {
                searchResultsContainer.innerHTML = '<p>No emojis found.</p>';
                return;
            }
            
            // Create emoji grid
            const grid = document.createElement('div');
            grid.className = 'emoji-grid';
            
            emojis.forEach(emojiObj => {
                const item = document.createElement('div');
                item.className = 'emoji-item';
                item.innerHTML = `
                    <div class="emoji">${emojiObj.emoji}</div>
                    <div class="emoji-name">${emojiObj.name}</div>
                `;
                
                item.addEventListener('click', function() {
                    navigator.clipboard.writeText(emojiObj.emoji).then(() => {
                        showNotification('Copied to clipboard: ' + emojiObj.emoji);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        showManualCopyPrompt(emojiObj.emoji);
                    });
                });
                
                grid.appendChild(item);
            });
            
            searchResultsContainer.appendChild(grid);
        }
        
        // Show notification
        function showNotification(message) {
            // Remove existing notifications
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            // Add styles
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '15px 20px',
                borderRadius: '5px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: '1000',
                fontSize: '16px'
            });
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        // Show manual copy prompt
        function showManualCopyPrompt(emoji) {
            const prompt = document.createElement('div');
            prompt.className = 'copy-prompt';
            prompt.innerHTML = `
                <div class="prompt-content">
                    <p>Please manually copy the emoji:</p>
                    <div class="emoji-display">${emoji}</div>
                    <button class="close-prompt">Close</button>
                </div>
            `;
            
            // Add styles
            Object.assign(prompt.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '1000'
            });
            
            const promptContent = prompt.querySelector('.prompt-content');
            Object.assign(promptContent.style, {
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%'
            });
            
            const emojiDisplay = prompt.querySelector('.emoji-display');
            Object.assign(emojiDisplay.style, {
                fontSize: '3em',
                margin: '20px 0'
            });
            
            const closeBtn = prompt.querySelector('.close-prompt');
            Object.assign(closeBtn.style, {
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            });
            
            closeBtn.addEventListener('click', function() {
                prompt.remove();
            });
            
            document.body.appendChild(prompt);
        }
    }
}

// Load components when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    if (document.getElementById('site-header')) {
        loadComponent('site-header', 'includes/header.html');
    }
    
    // Load footer
    if (document.getElementById('footer-placeholder')) {
        loadComponent('footer-placeholder', 'includes/footer.html');
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
                });
        });
    }
});
