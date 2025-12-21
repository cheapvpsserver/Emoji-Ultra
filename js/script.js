// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error occurred:', e.error);
});

// Add favicon to all pages dynamically
function addFavicon() {
    // Check if favicon already exists
    if (!document.querySelector('link[rel="icon"]')) {
        // Create favicon link elements
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = '/images/logo1.png';
        faviconLink.type = 'image/png';
        
        const appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        appleTouchIcon.href = '/images/logo1.png';
        
        const shortcutIcon = document.createElement('link');
        shortcutIcon.rel = 'shortcut icon';
        shortcutIcon.href = '/images/logo1.png';
        shortcutIcon.type = 'image/png';
        
        // Add to head
        const head = document.head;
        head.appendChild(faviconLink);
        head.appendChild(appleTouchIcon);
        head.appendChild(shortcutIcon);
    }
}

// Protocol modal functionality
function initProtocolModal() {
    const modal = document.getElementById('protocol-modal');
    const acceptBtn = document.getElementById('accept-btn');
    const rejectBtn = document.getElementById('reject-btn');
    
    // Check if user has already accepted the protocol
    const protocolAccepted = localStorage.getItem('protocolAccepted');
    
    // Show modal only if it's the first visit
    if (!protocolAccepted) {
        // Use a timeout to ensure the modal is displayed after page load
        setTimeout(function() {
            const protocolAcceptedCheck = localStorage.getItem('protocolAccepted');
            if (!protocolAcceptedCheck && modal) {
                modal.style.display = 'flex';
            }
        }, 100);
    } else {
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Accept protocol
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // Save to localStorage
            localStorage.setItem('protocolAccepted', 'true');
            
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Reject protocol
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            window.location.href = 'about:blank';
        });
    }
}

/* Mobile Navigation functionality */
function initMobileNavigation() {
    // Get elements
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navMenu = document.getElementById('nav-menu');
    
    // Toggle mobile menu when menu icon is clicked
    if (mobileMenuIcon && navMenu) {
        mobileMenuIcon.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Event delegation for dropdown toggles
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            // Check if the click is on a dropdown toggle
            const dropdownToggle = e.target.closest('.dropdown > a');
            if (dropdownToggle) {
                e.preventDefault();
                
                // Get the parent dropdown element
                const dropdown = dropdownToggle.parentElement;
                if (!dropdown || !dropdown.classList.contains('dropdown')) return;
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle the active class on the current dropdown
                dropdown.classList.toggle('active');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuIcon && navMenu && !mobileMenuIcon.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuIcon.classList.remove('active');
            // Close all dropdowns by removing active class
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    addFavicon();
    initProtocolModal();
    initMobileNavigation();
    
    // Use a setTimeout to ensure the header with search input is loaded
    setTimeout(function() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            // Get current page filename (works for both Windows and Unix paths)
            const currentPage = window.location.pathname.split(/[\\/]/).pop();
            
            // Check if we're on a file (contains .html extension)
            const isFile = currentPage.includes('.html');
            const isSearchPage = isFile && currentPage === 'search.html';
            const isHomePage = (!isFile && currentPage === '') || (isFile && currentPage === 'index.html');
            
            // Make search input redirect to search page when typing stops on all pages except search page itself
            if (isSearchPage || window.location.pathname.includes('search.html')) {
                // On search page, implement search functionality directly on top search box
                const searchResultsSection = document.getElementById('search-results');
                const searchResultsContainer = document.getElementById('search-results-container');
                
                if (searchResultsSection && searchResultsContainer) {
                    // Emoji data will be loaded from JSON file
                    let allEmojis = [];
                    
                    // Fetch emoji data from JSON file
                    fetch('/data/emojis.json')
                        .then(response => response.json())
                        .then(data => {
                            allEmojis = data;
                            
                            // Get search term from URL if present
                            const urlParams = new URLSearchParams(window.location.search);
                            const initialSearchTerm = urlParams.get('q');
                            if (initialSearchTerm) {
                                searchInput.value = initialSearchTerm;
                                performSearch(initialSearchTerm);
                            } else {
                                // No initial search term, show all emojis or empty state
                                searchResultsSection.classList.add('hidden');
                            }
                        })
                        .catch(error => {
                            console.error('Error loading emoji data:', error);
                            // Fallback to simplified emoji list if JSON load fails
                            allEmojis = [
                                { emoji: '�', name: 'Grinning Face' },
                                { emoji: '�', name: 'Face with Tears of Joy' },
                                { emoji: '🥰', name: 'Smiling Face with Hearts' },
                                { emoji: '😎', name: 'Smiling Face with Sunglasses' },
                                { emoji: '🤩', name: 'Star-Struck' },
                                { emoji: '�', name: 'Smiling Face with Heart-Eyes' },
                                { emoji: '�', name: 'Thumbs Up' },
                                { emoji: '�', name: 'Thumbs Down' },
                                { emoji: '�', name: 'Clapping Hands' },
                                { emoji: '🙌', name: 'Raising Hands' },
                                { emoji: '👐', name: 'Open Hands' },
                                { emoji: '🤝', name: 'Handshake' },
                                { emoji: '�', name: 'Dog Face' },
                                { emoji: '�', name: 'Cat Face' },
                                { emoji: '�', name: 'Mouse Face' },
                                { emoji: '🐹', name: 'Hamster Face' },
                                { emoji: '🐰', name: 'Rabbit Face' },
                                { emoji: '🦊', name: 'Fox Face' }
                            ];
                        });
                    
                    searchInput.addEventListener('input', function() {
                        const searchTerm = this.value.toLowerCase();
                        performSearch(searchTerm);
                    });
                    
                    function performSearch(searchTerm) {
                        if (searchTerm.length === 0) {
                            searchResultsSection.classList.add('hidden');
                            return;
                        }
                        
                        // Filter emojis
                        const filteredEmojis = allEmojis.filter(emojiObj => 
                            emojiObj.name.toLowerCase().includes(searchTerm) || 
                            emojiObj.emoji.includes(searchTerm)
                        );
                        
                        // Update search results title with count
                        const searchTitle = searchResultsSection.querySelector('h2');
                        if (searchTitle) {
                            searchTitle.textContent = `Search Results (${filteredEmojis.length})`;
                        }
                        
                        // Display search results
                        displaySearchResults(filteredEmojis);
                        searchResultsSection.classList.remove('hidden');
                    }
                    
                    function displaySearchResults(emojis) {
                        searchResultsContainer.innerHTML = '';
                        
                        if (emojis.length === 0) {
                            searchResultsContainer.innerHTML = '<p>No emojis found.</p>';
                            return;
                        }
                        
                        // Create simple container with all emoji cells
                        // CSS will handle the responsive layout using grid
                        const container = document.createElement('div');
                        container.className = 'emoji-responsive-container';
                        
                        emojis.forEach(emojiObj => {
                            const cell = document.createElement('div');
                            cell.className = 'emoji-cell';
                            cell.innerHTML = `
                                <div class="emoji-img">${emojiObj.emoji}</div>
                                <div class="emoji-name">${emojiObj.name}</div>
                            `;
                            
                            // Store original text in data attribute for hover effect
                            const emojiName = cell.querySelector('.emoji-name');
                            if (emojiName) {
                                emojiName.dataset.originalText = emojiName.textContent;
                            }
                            
                            // Hover effect: change text to "copy" on hover, restore on mouseout
                            cell.addEventListener('mouseenter', function() {
                                const nameElement = this.querySelector('.emoji-name');
                                if (nameElement) {
                                    nameElement.textContent = 'copy';
                                }
                            });
                            
                            cell.addEventListener('mouseleave', function() {
                                const nameElement = this.querySelector('.emoji-name');
                                if (nameElement && nameElement.dataset.originalText) {
                                    nameElement.textContent = nameElement.dataset.originalText;
                                }
                            });
                            
                            // Add click to copy functionality
                            cell.addEventListener('click', function(e) {
                                // Only copy when clicking on the emoji-name element (where "copy" text is displayed)
                                if (e.target.classList.contains('emoji-name')) {
                                    navigator.clipboard.writeText(emojiObj.emoji).then(() => {
                                        showNotification('Copied to clipboard: ' + emojiObj.emoji);
                                    }).catch(err => {
                                        console.error('Failed to copy: ', err);
                                        showManualCopyPrompt(emojiObj.emoji);
                                    });
                                }
                            });
                            
                            container.appendChild(cell);
                        });
                        
                        searchResultsContainer.appendChild(container);
                    }
                }
            } else {
                let searchTimeout;
                
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.trim();
                    
                    // Clear previous timeout
                    clearTimeout(searchTimeout);
                    
                    if (searchTerm) {
                        // Set new timeout - redirect after 500ms of inactivity
                        searchTimeout = setTimeout(() => {
                            // Redirect to search page with search term using absolute path
                                window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
                        }, 500);
                    }
                });
            }
        }
    }, 100); // Short delay to ensure header is loaded
    
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
    
    // Smooth scrolling for anchor links
    // 使用事件委托来处理动态添加的元素
    document.addEventListener('click', function(e) {
        // 检查点击的元素是否是锚点链接
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            const targetId = e.target.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // 计算目标元素的位置
                    const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
    
    // Emoji click to copy functionality for grid layout (existing)
    const emojiItems = document.querySelectorAll('.emoji-item');
    
    emojiItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only copy when clicking on the emoji or emoji-name element
            if (e.target.classList.contains('emoji') || e.target.classList.contains('emoji-name')) {
                const emoji = this.querySelector('.emoji').textContent;
                
                // Copy to clipboard
                navigator.clipboard.writeText(emoji).then(() => {
                    // Show copy success notification - only success message
                    showNotification('Copied successfully');
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    // If copy fails, show manual copy prompt
                    showManualCopyPrompt(emoji);
                });
            }
        });
    });
    
    // Emoji click to copy functionality for table layout (new)
    const emojiCells = document.querySelectorAll('.emoji-cell');

    emojiCells.forEach(cell => {
        // Store original text in data attribute
        const emojiName = cell.querySelector('.emoji-name');
        if (emojiName) {
            emojiName.dataset.originalText = emojiName.textContent;
        }
        
        // Hover effect: change text to "copy" on hover, restore on mouseout
        cell.addEventListener('mouseenter', function() {
            // For vendor cells, we don't change the text
            if (this.classList.contains('vendor-cell')) {
                return;
            }
            
            const nameElement = this.querySelector('.emoji-name');
            if (nameElement) {
                nameElement.textContent = 'copy';
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            // For vendor cells, we don't change the text
            if (this.classList.contains('vendor-cell')) {
                return;
            }
            
            const nameElement = this.querySelector('.emoji-name');
            if (nameElement && nameElement.dataset.originalText) {
                nameElement.textContent = nameElement.dataset.originalText;
            }
        });
        
        // Click functionality
        cell.addEventListener('click', function(e) {
            // For vendor cells, we don't copy anything and don't show "Copy" text on hover
            if (this.classList.contains('vendor-cell')) {
                // 检查单元格是否已经被 <a> 标签包装
                const isWrappedInLink = this.parentElement.tagName === 'A';
                
                // 如果单元格已经被 <a> 标签包装，则不需要特殊处理
                // 链接会正常工作，不需要阻止默认行为
                if (isWrappedInLink) {
                    // 不阻止默认行为，让链接正常工作
                    return;
                }
                
                // 如果单元格内部有链接元素，则让链接正常工作
                const link = this.querySelector('a');
                if (link) {
                    // 如果用户点击的不是链接本身，而是单元格的其他部分，则触发链接点击
                    if (e.target !== link) {
                        e.preventDefault();
                        link.click();
                    }
                    // 如果用户点击的是链接本身，则让默认行为发生（跳转）
                    return;
                }
                
                // 在这里可以添加跳转到对应页面的逻辑
                // 目前页面还未创建，所以只记录日志
                console.log('Vendor cell clicked: ' + (emojiName ? emojiName.textContent : 'Unknown'));
                return;
            }
            
            // Only copy when clicking on the emoji-name element (where "copy" text is displayed)
            if (e.target.classList.contains('emoji-name')) {
                const emojiImg = this.querySelector('.emoji-img');
                if (emojiImg) {
                    const emoji = emojiImg.textContent;
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(emoji).then(() => {
                        // Show copy success notification - only success message
                        showNotification('Copied successfully');
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        // If copy fails, show manual copy prompt
                        showManualCopyPrompt(emoji);
                    });
                }
            }
        });
        
        // 移动端长按功能
        let pressTimer;
        
        // 触摸开始事件
        cell.addEventListener('touchstart', function(e) {
            pressTimer = setTimeout(() => {
                // 长按触发
                this.classList.add('active');
            }, 500); // 500ms长按
        });
        
        // 触摸结束事件
        cell.addEventListener('touchend', function(e) {
            clearTimeout(pressTimer);
            
            // 如果是短按，则移除active类
            if (!this.classList.contains('active')) {
                setTimeout(() => {
                    this.classList.remove('active');
                }, 3000); // 3秒后隐藏按钮
            }
        });
        
        // 触摸取消事件
        cell.addEventListener('touchcancel', function(e) {
            clearTimeout(pressTimer);
        });
    });

    // Copy button functionality for emoji set pages
    console.log('Setting up copy button event listeners');
    const copyButtons = document.querySelectorAll('.copy-btn');
    console.log('Found copy buttons:', copyButtons.length);
    copyButtons.forEach(button => {
        console.log('Adding event listener to copy button');
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering cell click event
            console.log('Copy button clicked');
            const emoji = this.getAttribute('data-emoji');
            // 获取对应的图片元素
            const emojiCell = this.closest('.emoji-cell');
            const emojiImg = emojiCell.querySelector('.emoji-img img');
            
            if (emojiImg) {
                console.log('Copying image:', emojiImg.src);
                // 尝试复制图片到剪贴板
                copyImageToClipboard(emojiImg.src).catch(err => {
                    console.error('Failed to copy image: ', err);
                    // 如果复制失败，回退到下载图片
                    downloadImage(emojiImg.src, emojiImg.alt);
                });
            } else {
                // 如果没有图片，回退到复制emoji文本
                navigator.clipboard.writeText(emoji).then(() => {
                    showNotification('Copied to clipboard: ' + emoji);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    showManualCopyPrompt(emoji);
                });
            }
        });
        console.log('Event listener added to copy button');
    });
    console.log('Copy button event listeners setup complete');
    
    // Download button functionality for emoji set pages
    console.log('Setting up download button event listeners');
    const downloadButtons = document.querySelectorAll('.download-btn');
    console.log('Found download buttons:', downloadButtons.length);
    downloadButtons.forEach(button => {
        console.log('Adding event listener to download button');
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering cell click event
            console.log('Download button clicked');
            const emoji = this.getAttribute('data-emoji');
            // 获取对应的图片元素
            const emojiCell = this.closest('.emoji-cell');
            const emojiImg = emojiCell.querySelector('.emoji-img img');
            
            if (emojiImg) {
                console.log('Downloading image:', emojiImg.src);
                // 下载图片
                downloadImage(emojiImg.src, emojiImg.alt);
            } else {
                // 如果没有图片，显示提示信息
                alert('In a real implementation, this would download: ' + emoji);
            }
        });
        console.log('Event listener added to download button');
    });
    console.log('Download button event listeners setup complete');

    
    
    // Call manual binding immediately after DOM is loaded
    console.log('About to bind button events');
    bindButtonEvents();
    console.log('Button events bound');
    
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
    
    // Copy image to clipboard helper function
    function copyImageToClipboard(url) {
        return new Promise((resolve, reject) => {
            // 创建一个临时的img元素来复制图片
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            
            // 等待图片加载完成
            img.onload = function() {
                // 创建一个临时的canvas元素
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // 尝试将canvas内容复制到剪贴板
                canvas.toBlob(function(blob) {
                    if (blob) {
                        const item = new ClipboardItem({ [blob.type]: blob });
                        navigator.clipboard.write([item]).then(() => {
                            showNotification('Image copied to clipboard');
                            resolve();
                        }).catch(err => {
                            reject(err);
                        });
                    } else {
                        reject(new Error('Failed to create blob from canvas'));
                    }
                });
            };
            
            // 如果图片加载失败
            img.onerror = function() {
                reject(new Error('Failed to load image'));
            };
        });
    }
    
    // Download image helper function
    function downloadImage(url, altText) {
        // 下载图片
        const link = document.createElement('a');
        link.href = url;
        link.download = altText.replace(/\s+/g, '_') + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('Image downloaded');
    }
        
    // Verify that event listeners are attached
    setTimeout(function() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        const downloadButtons = document.querySelectorAll('.download-btn');
        console.log('Verification - Copy buttons:', copyButtons.length);
        console.log('Verification - Download buttons:', downloadButtons.length);
            
        // Test if first button has event listeners
        if (copyButtons.length > 0) {
            console.log('First copy button:', copyButtons[0]);
        }
        if (downloadButtons.length > 0) {
            console.log('First download button:', downloadButtons[0]);
        }
            
        // Add direct event listeners for debugging
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('copy-btn')) {
                console.log('Direct copy button click detected');
            }
            if (e.target.classList.contains('download-btn')) {
                console.log('Direct download button click detected');
            }
        });
            
        // Manual event binding as a fallback
        bindButtonEvents();
    }, 1000);
        
    // Fallback function to manually bind events
    function bindButtonEvents() {
        console.log('Attempting manual event binding');
            
        // Check if buttons exist in DOM
        const allCopyBtns = document.querySelectorAll('.copy-btn');
        const allDownloadBtns = document.querySelectorAll('.download-btn');
        console.log('Total copy buttons found:', allCopyBtns.length);
        console.log('Total download buttons found:', allDownloadBtns.length);
            
        // Bind copy button events
        const copyBtns = document.querySelectorAll('.copy-btn:not([data-bound])');
        console.log('Unbound copy buttons found:', copyBtns.length);
        copyBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Manual copy button click');
                const emoji = this.getAttribute('data-emoji');
                const emojiCell = this.closest('.emoji-cell');
                const emojiImg = emojiCell.querySelector('.emoji-img img');
                    
                if (emojiImg) {
                    console.log('Manual copy - copying image:', emojiImg.src);
                    // 尝试复制图片到剪贴板
                    copyImageToClipboard(emojiImg.src).catch(err => {
                        console.error('Failed to copy image: ', err);
                        // 如果复制失败，回退到下载图片
                        downloadImage(emojiImg.src, emojiImg.alt);
                    });
                } else {
                    navigator.clipboard.writeText(emoji).then(() => {
                        showNotification('Copied to clipboard: ' + emoji);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        showManualCopyPrompt(emoji);
                    });
                }
            });
            btn.setAttribute('data-bound', 'true');
        });
            
        // Bind download button events
        const downloadBtns = document.querySelectorAll('.download-btn:not([data-bound])');
        console.log('Unbound download buttons found:', downloadBtns.length);
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Manual download button click');
                const emoji = this.getAttribute('data-emoji');
                const emojiCell = this.closest('.emoji-cell');
                const emojiImg = emojiCell.querySelector('.emoji-img img');
                    
                if (emojiImg) {
                    console.log('Manual download - downloading image:', emojiImg.src);
                    downloadImage(emojiImg.src, emojiImg.alt);
                } else {
                    alert('In a real implementation, this would download: ' + emoji);
                }
            });
            btn.setAttribute('data-bound', 'true');
        });
    }
});
