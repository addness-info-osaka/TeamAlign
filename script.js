// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize community functionality
    initMobileMenu();
    initScrollEffects();
    initCounterAnimations();
    initSmoothScrolling();
    initCommunityHandlers();
    initIntersectionObserver();
});

// ===== Mobile Menu =====
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle mobile menu visibility
            if (navMenu) navMenu.classList.toggle('mobile-active');
            if (navActions) navActions.classList.toggle('mobile-active');
        });
    }
}

// ===== Scroll Effects =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header background opacity based on scroll
        if (header) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = 'none';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== Counter Animations =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-target]');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on target
            if (target >= 1000) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Observe counters for intersection
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== Community Handlers =====
function initCommunityHandlers() {
    // Join Community Button handlers
    const joinButtons = document.querySelectorAll('.btn-primary');
    joinButtons.forEach(button => {
        if (button.textContent.includes('参加') || button.textContent.includes('今すぐ')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showJoinModal();
            });
        }
    });
    
    // View Community button handlers  
    const viewButtons = document.querySelectorAll('.btn-outline');
    viewButtons.forEach(button => {
        if (button.textContent.includes('見てみる') || button.textContent.includes('見学')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showPreviewModal();
            });
        }
    });
    
    // Discussion card click handlers
    const discussionCards = document.querySelectorAll('.discussion-card');
    discussionCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, this would navigate to the discussion detail page
            const title = this.querySelector('.discussion-title').textContent;
            alert(`「${title}」のディスカッションページに移動します。\n（実際のアプリでは詳細ページが表示されます）`);
        });
    });
}

// ===== Modal Functions =====
function showJoinModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>コミュニティに参加</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>TeamAlign Communityへようこそ！組織変革に関心のあるプロフェッショナルの皆様をお待ちしています。</p>
                <form class="join-form">
                    <div class="form-group">
                        <label for="name">お名前</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">メールアドレス</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="company">会社名</label>
                        <input type="text" id="company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="role">役職・職種</label>
                        <select id="role" name="role" required>
                            <option value="">選択してください</option>
                            <option value="executive">経営陣</option>
                            <option value="hr">人事・組織開発</option>
                            <option value="manager">マネージャー</option>
                            <option value="consultant">コンサルタント</option>
                            <option value="other">その他</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="interests">関心のあるトピック（複数選択可）</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="interests" value="okr"> OKR・目標管理</label>
                            <label><input type="checkbox" name="interests" value="engagement"> エンゲージメント</label>
                            <label><input type="checkbox" name="interests" value="leadership"> リーダーシップ</label>
                            <label><input type="checkbox" name="interests" value="dx"> デジタル変革</label>
                            <label><input type="checkbox" name="interests" value="culture"> 組織文化</label>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary btn-large">参加申請を送信</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Form submission handler
    modalOverlay.querySelector('.join-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('参加申請を受け付けました！24時間以内に招待メールをお送りします。');
        closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    }
}

function showPreviewModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>コミュニティプレビュー</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>TeamAlign Communityでは、以下のような活発な議論が日々行われています。</p>
                <div class="preview-content">
                    <div class="preview-stats">
                        <div class="preview-stat">
                            <span class="stat-number">4,892</span>
                            <span class="stat-label">アクティブメンバー</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-number">156</span>
                            <span class="stat-label">今月の新規投稿</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-number">95%</span>
                            <span class="stat-label">質問回答率</span>
                        </div>
                    </div>
                    <div class="preview-topics">
                        <h4>人気のトピック</h4>
                        <ul>
                            <li>リモートワーク環境でのチームマネジメント</li>
                            <li>Z世代社員のエンゲージメント向上策</li>
                            <li>360度評価制度の導入プロセス</li>
                            <li>DX推進における組織変革のポイント</li>
                        </ul>
                    </div>
                </div>
                <div class="preview-actions">
                    <button type="button" class="btn-primary btn-large" onclick="closeModalAndJoin()">参加してみる</button>
                    <button type="button" class="btn-outline" onclick="closeModal()">後で検討する</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Add global functions for button handlers
    window.closeModal = closeModal;
    window.closeModalAndJoin = function() {
        closeModal();
        setTimeout(() => showJoinModal(), 200);
    };
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
        // Clean up global functions
        delete window.closeModal;
        delete window.closeModalAndJoin;
    }
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// ===== Modal Functions =====
function showTrialModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>14日間無料トライアル</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>TeamAlignの全機能を14日間無料でお試しいただけます。</p>
                <form class="trial-form">
                    <div class="form-group">
                        <label for="company">会社名</label>
                        <input type="text" id="company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="name">お名前</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">メールアドレス</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="employees">従業員数</label>
                        <select id="employees" name="employees" required>
                            <option value="">選択してください</option>
                            <option value="1-10">1-10名</option>
                            <option value="11-50">11-50名</option>
                            <option value="51-200">51-200名</option>
                            <option value="201-1000">201-1000名</option>
                            <option value="1000+">1000名以上</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary btn-large">無料トライアルを開始</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Form submission handler
    modalOverlay.querySelector('.trial-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send the data to your backend
        alert('ありがとうございます！担当者より24時間以内にご連絡いたします。');
        closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    }
}

function showDemoModal() {
    // Similar to trial modal but for demo requests
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>デモ・資料請求</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>TeamAlignの詳細資料をお送りし、オンラインデモもご案内いたします。</p>
                <form class="demo-form">
                    <div class="form-group">
                        <label for="demo-company">会社名</label>
                        <input type="text" id="demo-company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="demo-name">お名前</label>
                        <input type="text" id="demo-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="demo-email">メールアドレス</label>
                        <input type="email" id="demo-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="demo-interest">ご関心のある機能</label>
                        <select id="demo-interest" name="interest" required>
                            <option value="">選択してください</option>
                            <option value="ai-dashboard">AI経営ダッシュボード</option>
                            <option value="matching">企業マッチング</option>
                            <option value="learning">学習コンテンツ</option>
                            <option value="community">コミュニティ</option>
                            <option value="all">すべて</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary btn-large">資料請求・デモ申込</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Form submission handler
    modalOverlay.querySelector('.demo-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('ありがとうございます！資料をお送りし、担当者よりデモのご案内をいたします。');
        closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    }
}

// ===== Intersection Observer for Animations =====
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.value-card, .content-card, .activity-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Performance Optimizations =====
// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// ===== Analytics and Tracking =====
function trackUserInteraction(action, element) {
    // This would integrate with your analytics platform
    console.log(`User interaction: ${action} on ${element}`);
    
    // Example: Google Analytics event tracking
    // gtag('event', action, {
    //     event_category: 'user_interaction',
    //     event_label: element
    // });
}

// Add click tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackUserInteraction('click', 'primary_button');
    } else if (e.target.matches('.btn-outline')) {
        trackUserInteraction('click', 'outline_button');
    } else if (e.target.matches('.nav-link')) {
        trackUserInteraction('click', 'navigation');
    }
}); 