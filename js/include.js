// Function to load header and footer immediately when the script is parsed
(function() {
    // Preloaded header HTML to avoid network requests
    const headerHTML = `<!-- Top Navigation -->
<header class="navbar">
    <div class="nav-container">
        <div class="logo">
            <a href="/">
                <img src="/images/logo.png" alt="EmojiHub Logo" width="200" height="50">
            </a>
        </div>
        <nav class="nav-menu" id="nav-menu">
            <ul>
                <li><a href="/">Home</a></li>
                <li class="dropdown">
                    <a javascript:void(0)>Emoji-Vendors</a>
                    <ul class="dropdown-content">
                        <li><a href="/Emoji-Vendors/Google-Emojis.html">Google</a></li>
                        <li><a href="/Emoji-Vendors/Microsoft-Emojis.html">Microsoft</a></li>
                        <li><a href="/Emoji-Vendors/Facebook-Emojis.html">Facebook</a></li>
                        <li><a href="/Emoji-Vendors/Twitter-Emojis.html">Twitter</a></li>
                        <li><a href="/Emoji-Vendors/Whatsapp-Emojis.html">Whatsapp</a></li>
                        <li><a href="/articles/emoji-vendors.html">More Vendors</a></li>
                    </ul>
                </li>
                <li><a href="/Emoji-Vendors/Apple-Emojis.html">Apple Emoji</a></li>
                <li><a href="/Emoji-Vendors/TikTok-Emojis.html">TikTok Emoji</a></li>
                <li><a href="https://ko-fi.com/libredepot" target="_blank">🤑 Sponsor</a></li>
            </ul>
        </nav>
        <div class="search-box">
            <input type="text" id="search-input" placeholder="Search emojis...">
        </div>
        <div class="mobile-menu-icon" id="mobile-menu-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>`;

    // Preloaded footer HTML to avoid network requests
    const footerHTML = `<!-- Back to Top Button -->
<button id="back-to-top" class="back-to-top">↑</button>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="copyright">
                <p>&copy; 2025 EmojiHub. All rights reserved.</p>
                <p>Disclaimer: This website is for educational purposes only. All emojis are the property of their respective owners.</p>
            </div>
            <div class="social-icons">
                <a javascript:void(0) aria-label="Facebook">📘</a>
                <a javascript:void(0) aria-label="Twitter">🐦</a>
                <a javascript:void(0) aria-label="Instagram">📷</a>
                <a javascript:void(0) aria-label="GitHub">🐙</a>
            </div>
        </div>
    </div>
</footer>`;

    // Function to check if element is available and load HTML
    function tryLoadHTML() {
        // Get the site-header element
        const siteHeader = document.getElementById('site-header');
        const siteFooter = document.getElementById('site-footer');
        
        // If both elements are loaded, we're done
        let headerLoaded = false;
        let footerLoaded = false;
        
        // Load header if available
        if (siteHeader && !siteHeader.innerHTML) {
            siteHeader.innerHTML = headerHTML;
            headerLoaded = true;
        }
        
        // Load footer if available
        if (siteFooter && !siteFooter.innerHTML) {
            siteFooter.innerHTML = footerHTML;
            footerLoaded = true;
        }
        
        // If both are loaded, we're done
        if (headerLoaded && footerLoaded) {
            return true;
        }
        
        // If not, try again after a short delay
        return false;
    }
    
    // Try to load immediately
    let loaded = tryLoadHTML();
    
    // If not loaded immediately, try again when DOM is ready
    if (!loaded) {
        // Use a MutationObserver to detect when the site-header element is added to the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Check if site-header was added
                if (document.getElementById('site-header') || document.getElementById('site-footer')) {
                    if (tryLoadHTML()) {
                        // If loaded, disconnect the observer
                        observer.disconnect();
                    }
                }
            });
        });
        
        // Start observing the document
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        
        // Also add a DOMContentLoaded listener as a fallback
        document.addEventListener('DOMContentLoaded', () => {
            observer.disconnect();
            tryLoadHTML();
        });
    }
})();
