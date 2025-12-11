// 首页专用JavaScript - 实现点击表情符号跳转到对应的页面
// 使用说明：
// 1. 已为index.html中的1923个emoji-cell元素批量添加了空的data-href属性
// 2. 您可以直接编辑index.html文件，在data-href属性中填写每个表情符号的自定义链接
//    例如：<div class="emoji-cell" data-href="/your-custom-link.html">
// 3. 每个表情符号点击时将跳转到其对应的data-href链接
// 4. 如果data-href为空，则使用默认链接（基于表情符号名称生成）
// 5. 点击表情符号图片(😀)会跳转到对应的链接
// 6. 点击copy文字会复制表情符号，不会触发跳转

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有的emoji-cell元素
    const emojiCells = document.querySelectorAll('.home-page .emoji-cell');
    
    // 为每个emoji-cell添加事件处理
    emojiCells.forEach(function(cell) {
        // 获取emoji-img和emoji-name元素
        const emojiImg = cell.querySelector('.emoji-img');
        const emojiNameEl = cell.querySelector('.emoji-name');
        
        // 为emoji-img元素添加点击事件，实现跳转功能
        if (emojiImg && emojiNameEl) {
            // 为emoji-name元素添加点击事件，确保复制功能正常执行
            emojiNameEl.addEventListener('click', function(e) {
                // 阻止事件冒泡到父元素，避免触发跳转功能
                e.stopPropagation();
                
                // 直接在这里实现复制功能，确保点击copy文字时能正常复制
                const emojiImg = cell.querySelector('.emoji-img');
                if (emojiImg) {
                    const emoji = emojiImg.textContent;
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(emoji).then(() => {
                        // 创建一个简单的复制成功提示
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
                        
                        // 添加到页面
                        document.body.appendChild(notification);
                        
                        // 3秒后移除提示
                        setTimeout(() => {
                            notification.remove();
                        }, 3000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        // 复制失败时的提示
                        alert('Failed to copy emoji. Please copy it manually: ' + emoji);
                    });
                }
            });
            
            emojiImg.addEventListener('click', function(e) {
                // 阻止事件冒泡到父元素，避免触发复制功能
                e.stopPropagation();
                
                // 从data-href属性获取自定义跳转链接
                const customHref = cell.getAttribute('data-href');
                
                // 获取emoji名称，用于构建默认链接
                const emojiName = emojiNameEl.dataset.originalText || emojiNameEl.textContent;
                
                // 构建默认跳转链接
                // 例如："Grinning Face" -> "grinning-face.html"
                const safeEmojiName = emojiName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const defaultHref = `/Emoji-Vendors/${safeEmojiName}.html`;
                
                // 使用自定义链接或默认链接
                const href = customHref || defaultHref;
                
                // 跳转到对应的页面
                window.location.href = href;
            });
        }
    });
});