// ===== Events Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initEventFilters();
    initEventInteractions();
    initCalendar();
    initRecordedEvents();
});

// ===== Event Filters =====
function initEventFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const topicSelect = document.querySelector('.topic-select');
    const formatSelect = document.querySelector('.format-select');
    const levelSelect = document.querySelector('.level-select');
    const eventCards = document.querySelectorAll('.event-card');
    const eventItems = document.querySelectorAll('.event-item');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            filterEvents(filter);
        });
    });
    
    topicSelect.addEventListener('change', function() {
        filterByTopic(this.value);
    });
    
    formatSelect.addEventListener('change', function() {
        filterByFormat(this.value);
    });
    
    levelSelect.addEventListener('change', function() {
        filterByLevel(this.value);
    });
    
    function filterEvents(filter) {
        const allEvents = [...eventCards, ...eventItems];
        
        allEvents.forEach(event => {
            let shouldShow = false;
            
            switch(filter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'upcoming':
                    shouldShow = !event.closest('.recorded-events');
                    break;
                case 'seminar':
                    shouldShow = event.querySelector('.event-type')?.textContent.includes('セミナー') ||
                               event.querySelector('.event-meta .event-type')?.textContent.includes('セミナー');
                    break;
                case 'workshop':
                    shouldShow = event.querySelector('.event-type')?.textContent.includes('ワークセッション') ||
                               event.querySelector('.event-meta .event-type')?.textContent.includes('ワークセッション');
                    break;
                case 'hands-on':
                    shouldShow = event.querySelector('.event-type')?.textContent.includes('ハンズオン') ||
                               event.querySelector('.event-meta .event-type')?.textContent.includes('ハンズオン');
                    break;
                case 'recorded':
                    shouldShow = event.closest('.recorded-events') !== null;
                    break;
            }
            
            animateEventVisibility(event, shouldShow);
        });
    }
    
    function filterByTopic(topic) {
        if (topic === 'all') {
            const allEvents = [...eventCards, ...eventItems];
            allEvents.forEach(event => animateEventVisibility(event, true));
            return;
        }
        
        const allEvents = [...eventCards, ...eventItems];
        allEvents.forEach(event => {
            const title = event.querySelector('.event-title').textContent.toLowerCase();
            const tags = Array.from(event.querySelectorAll('.event-tag, .tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            let shouldShow = false;
            
            switch(topic) {
                case 'okr':
                    shouldShow = title.includes('okr') || title.includes('目標') ||
                               tags.some(tag => tag.includes('okr') || tag.includes('目標'));
                    break;
                case 'leadership':
                    shouldShow = title.includes('リーダーシップ') || title.includes('マネジメント') ||
                               tags.some(tag => tag.includes('リーダーシップ') || tag.includes('マネジメント'));
                    break;
                case 'engagement':
                    shouldShow = title.includes('エンゲージメント') || title.includes('モチベーション') ||
                               tags.some(tag => tag.includes('エンゲージメント'));
                    break;
                case 'dx':
                    shouldShow = title.includes('dx') || title.includes('デジタル') || title.includes('変革') ||
                               tags.some(tag => tag.includes('dx') || tag.includes('デジタル'));
                    break;
                case 'hr':
                    shouldShow = title.includes('人事') || title.includes('評価') ||
                               tags.some(tag => tag.includes('人事') || tag.includes('評価'));
                    break;
                case 'culture':
                    shouldShow = title.includes('文化') || title.includes('組織') ||
                               tags.some(tag => tag.includes('文化') || tag.includes('組織'));
                    break;
            }
            
            animateEventVisibility(event, shouldShow);
        });
    }
    
    function filterByFormat(format) {
        if (format === 'all') {
            const allEvents = [...eventCards, ...eventItems];
            allEvents.forEach(event => animateEventVisibility(event, true));
            return;
        }
        
        const allEvents = [...eventCards, ...eventItems];
        allEvents.forEach(event => {
            const formatElement = event.querySelector('.event-format');
            let shouldShow = false;
            
            if (formatElement) {
                switch(format) {
                    case 'online':
                        shouldShow = formatElement.classList.contains('online') ||
                                   formatElement.textContent.includes('オンライン');
                        break;
                    case 'offline':
                        shouldShow = formatElement.classList.contains('offline') ||
                                   formatElement.textContent.includes('オフライン');
                        break;
                    case 'hybrid':
                        shouldShow = formatElement.classList.contains('hybrid') ||
                                   formatElement.textContent.includes('ハイブリッド');
                        break;
                }
            }
            
            animateEventVisibility(event, shouldShow);
        });
    }
    
    function filterByLevel(level) {
        if (level === 'all') {
            const allEvents = [...eventCards, ...eventItems];
            allEvents.forEach(event => animateEventVisibility(event, true));
            return;
        }
        
        const allEvents = [...eventCards, ...eventItems];
        allEvents.forEach(event => {
            const levelElement = event.querySelector('.event-level');
            let shouldShow = false;
            
            if (levelElement) {
                shouldShow = levelElement.classList.contains(level);
            }
            
            animateEventVisibility(event, shouldShow);
        });
    }
    
    function animateEventVisibility(event, shouldShow) {
        if (shouldShow) {
            event.style.display = event.classList.contains('event-item') ? 'flex' : 'block';
            event.style.opacity = '0';
            event.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                event.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                event.style.opacity = '1';
                event.style.transform = 'translateY(0)';
            }, 50);
        } else {
            event.style.opacity = '0';
            event.style.transform = 'translateY(20px)';
            setTimeout(() => {
                event.style.display = 'none';
            }, 300);
        }
    }
}

// ===== Event Interactions =====
function initEventInteractions() {
    // Event registration buttons
    const registerButtons = document.querySelectorAll('.btn-primary');
    registerButtons.forEach(btn => {
        if (btn.textContent.includes('参加') || btn.textContent.includes('申込')) {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card, .event-item');
                const eventTitle = eventCard.querySelector('.event-title').textContent;
                
                showRegistrationModal(eventTitle);
            });
        }
    });
    
    // Event details buttons
    const detailButtons = document.querySelectorAll('.btn-outline');
    detailButtons.forEach(btn => {
        if (btn.textContent.includes('詳細')) {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card, .event-item');
                const eventTitle = eventCard.querySelector('.event-title').textContent;
                
                showEventDetailsModal(eventTitle);
            });
        }
    });
    
    // Bookmark buttons
    const bookmarkButtons = document.querySelectorAll('.btn-icon');
    bookmarkButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isBookmarked = this.classList.contains('bookmarked');
            
            if (isBookmarked) {
                this.style.backgroundColor = '';
                this.style.color = '';
                this.classList.remove('bookmarked');
            } else {
                this.style.backgroundColor = '#3b82f6';
                this.style.color = 'white';
                this.classList.add('bookmarked');
            }
        });
    });
}

// ===== Calendar Functions =====
function initCalendar() {
    const calendarNavPrev = document.querySelector('.calendar-nav.prev');
    const calendarNavNext = document.querySelector('.calendar-nav.next');
    const calendarMonth = document.querySelector('.calendar-month');
    const calendarDays = document.querySelectorAll('.calendar-day:not(.header)');
    
    let currentMonth = new Date(2024, 1); // February 2024
    
    if (calendarNavPrev) {
        calendarNavPrev.addEventListener('click', function() {
            currentMonth.setMonth(currentMonth.getMonth() - 1);
            updateCalendar();
        });
    }
    
    if (calendarNavNext) {
        calendarNavNext.addEventListener('click', function() {
            currentMonth.setMonth(currentMonth.getMonth() + 1);
            updateCalendar();
        });
    }
    
    // Calendar day click events
    calendarDays.forEach(day => {
        if (day.classList.contains('has-event')) {
            day.addEventListener('click', function() {
                const dayNumber = this.textContent.trim();
                showDayEventsModal(dayNumber);
            });
        }
    });
    
    function updateCalendar() {
        const months = [
            '1月', '2月', '3月', '4月', '5月', '6月',
            '7月', '8月', '9月', '10月', '11月', '12月'
        ];
        
        calendarMonth.textContent = `${currentMonth.getFullYear()}年 ${months[currentMonth.getMonth()]}`;
        
        // In a real app, this would update the calendar days and events
        console.log('Calendar updated to:', currentMonth);
    }
}

// ===== Recorded Events =====
function initRecordedEvents() {
    const playButtons = document.querySelectorAll('.play-overlay');
    const watchButtons = document.querySelectorAll('.recorded-card .btn-primary');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const recordedCard = this.closest('.recorded-card');
            const title = recordedCard.querySelector('.recorded-title').textContent;
            
            showVideoPlayerModal(title);
        });
    });
    
    watchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const recordedCard = this.closest('.recorded-card');
            const title = recordedCard.querySelector('.recorded-title').textContent;
            
            showVideoPlayerModal(title);
        });
    });
}

// ===== Modal Functions =====
function showRegistrationModal(eventTitle) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>イベント参加登録</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <h4>${eventTitle}</h4>
                <p>このイベントに参加登録いたします。必要事項をご入力ください。</p>
                <form class="registration-form">
                    <div class="form-group">
                        <label for="participant-name">お名前</label>
                        <input type="text" id="participant-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="participant-email">メールアドレス</label>
                        <input type="email" id="participant-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="participant-company">会社名</label>
                        <input type="text" id="participant-company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="participant-role">役職</label>
                        <input type="text" id="participant-role" name="role">
                    </div>
                    <div class="form-group">
                        <label for="participation-reason">参加理由・期待すること</label>
                        <textarea id="participation-reason" name="reason" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary btn-large">参加登録</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    modalOverlay.querySelector('.registration-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('参加登録が完了しました！確認メールをお送りします。');
        closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    }
}

function showEventDetailsModal(eventTitle) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>イベント詳細</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <h4>${eventTitle}</h4>
                <div class="event-detail-content">
                    <h5>📅 開催概要</h5>
                    <ul>
                        <li>日時: 2024年2月15日（木）19:00-20:30</li>
                        <li>形式: オンライン（Zoom）</li>
                        <li>参加費: 無料</li>
                        <li>定員: 500名</li>
                    </ul>
                    
                    <h5>📝 内容</h5>
                    <p>このイベントでは、組織変革の最新トレンドとAI時代の新しいマネジメント手法について詳しく解説します。</p>
                    
                    <h5>🎯 対象者</h5>
                    <ul>
                        <li>経営者・経営幹部</li>
                        <li>人事・組織開発担当者</li>
                        <li>マネージャー・チームリーダー</li>
                        <li>組織変革に関心のある方</li>
                    </ul>
                    
                    <h5>👨‍🏫 講師紹介</h5>
                    <p>業界のトップエキスパートが実践的な知見をお届けします。</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary">参加登録</button>
                    <button class="btn-outline" onclick="closeModal()">閉じる</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    window.closeModal = closeModal;
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
        delete window.closeModal;
    }
}

function showDayEventsModal(dayNumber) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>2024年2月${dayNumber}日のイベント</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="day-events-list">
                    <div class="day-event-item">
                        <div class="event-time">19:00-20:30</div>
                        <div class="event-info">
                            <h4>組織変革トレンド総まとめ</h4>
                            <p>オンライン・無料</p>
                        </div>
                        <button class="btn-primary btn-small">詳細</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    }
}

function showVideoPlayerModal(videoTitle) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content video-modal">
            <div class="modal-header">
                <h3>${videoTitle}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="video-player">
                    <div class="video-placeholder">
                        <div class="play-button">▶</div>
                        <p>動画プレイヤー</p>
                        <p class="video-note">※ 実際のアプリでは動画が再生されます</p>
                    </div>
                </div>
                <div class="video-controls">
                    <button class="btn-outline">資料ダウンロード</button>
                    <button class="btn-outline">関連イベント</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    }
} 