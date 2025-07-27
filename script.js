// TeamAlign Community Platform - メインスクリプト

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initCounterAnimations();
    initSuccessStoryFilters();
    initMatchingDemo();
    initModals();
});

// モバイルメニューの初期化
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// スクロールエフェクトの初期化
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ヘッダーの背景変更
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    document.querySelectorAll('.value-card, .story-card, .step').forEach(el => {
        observer.observe(el);
    });
}

// カウンターアニメーションの初期化
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// カウンターアニメーション
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(target * easeOutQuart(progress));
        
        if (element.textContent.includes('+')) {
            element.textContent = currentValue + '+';
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// イージング関数
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// 成功事例フィルターの初期化
function initSuccessStoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const storyCards = document.querySelectorAll('.story-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // アクティブボタンの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // カードのフィルタリング
            storyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// マッチングデモの初期化
function initMatchingDemo() {
    // マッチングデモデータ
    const matchingData = {
        manufacturing: {
            tech: [
                {
                    name: "株式会社TechSolution",
                    industry: "IT・システム開発",
                    size: "中堅企業（350名）",
                    synergy: "92%",
                    speciality: "製造業向けIoTソリューション",
                    achievements: "DX導入実績50社以上",
                    collaboration: "生産ライン自動化・データ分析"
                },
                {
                    name: "デジタルイノベーション株式会社",
                    industry: "AI・データサイエンス",
                    size: "スタートアップ（45名）",
                    synergy: "88%",
                    speciality: "AI による品質管理最適化",
                    achievements: "品質向上率平均35%",
                    collaboration: "AI品質検査システム共同開発"
                }
            ],
            marketing: [
                {
                    name: "マーケティング革新株式会社",
                    industry: "マーケティング・広告",
                    size: "中小企業（120名）",
                    synergy: "85%",
                    speciality: "BtoB製造業特化マーケティング",
                    achievements: "リード獲得300%向上実績",
                    collaboration: "デジタルマーケティング戦略立案"
                }
            ]
        },
        tech: {
            manufacturing: [
                {
                    name: "グローバル製造株式会社",
                    industry: "精密機械製造",
                    size: "大企業（2,500名）",
                    synergy: "94%",
                    speciality: "高精度製造技術・品質管理",
                    achievements: "ISO9001認証・品質不良率0.01%",
                    collaboration: "IoTセンサー製造・品質管理システム"
                }
            ],
            finance: [
                {
                    name: "フィンテック協業銀行",
                    industry: "金融・フィンテック",
                    size: "大企業（1,800名）",
                    synergy: "89%",
                    speciality: "企業向けデジタル決済・融資",
                    achievements: "中小企業向け融資実績1,000億円",
                    collaboration: "B2B決済ソリューション共同開発"
                }
            ]
        }
    };

    window.simulateMatching = function() {
        const industry = document.querySelector('select[name="industry"]').value;
        const collaboration = document.querySelector('select[name="collaboration"]').value;
        const resultsSection = document.getElementById('matching-results');
        const matchCards = document.querySelector('.match-cards');

        if (!industry || !collaboration) {
            alert('業界と連携希望分野を選択してください。');
            return;
        }

        // マッチング結果を生成
        let matches = [];
        const collaborationMap = {
            'dx': 'tech',
            'marketing': 'marketing',
            'hr': 'hr',
            'supply': 'manufacturing',
            'innovation': 'tech'
        };

        const targetIndustry = collaborationMap[collaboration];
        if (matchingData[industry] && matchingData[industry][targetIndustry]) {
            matches = matchingData[industry][targetIndustry];
        }

        // 結果を表示
        if (matches.length > 0) {
            matchCards.innerHTML = matches.map(match => `
                <div class="match-card">
                    <div class="match-header">
                        <div class="company-name">${match.name}</div>
                        <div class="synergy-score">
                            <span class="synergy-label">シナジー度</span>
                            <span class="synergy-value">${match.synergy}</span>
                        </div>
                    </div>
                    <div class="match-details">
                        <div class="detail-item">
                            <span class="label">業界：</span>
                            <span class="value">${match.industry}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">規模：</span>
                            <span class="value">${match.size}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">専門分野：</span>
                            <span class="value">${match.speciality}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">実績：</span>
                            <span class="value">${match.achievements}</span>
                        </div>
                        <div class="collaboration-potential">
                            <h4>連携可能性</h4>
                            <p>${match.collaboration}</p>
                        </div>
                    </div>
                    <div class="match-actions">
                        <button class="btn-outline" onclick="showContactForm('${match.name}')">詳細を確認</button>
                        <button class="btn-primary" onclick="showJoinModal()">連携を申し込む</button>
                    </div>
                </div>
            `).join('');

            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            matchCards.innerHTML = `
                <div class="no-matches">
                    <p>現在、条件に合うマッチング候補が見つかりませんでした。</p>
                    <p>コミュニティに参加すると、より多くの企業とのマッチング機会があります。</p>
                </div>
            `;
            resultsSection.style.display = 'block';
        }
    };
}

// モーダルの初期化
function initModals() {
    // モーダル要素の取得
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal .close');

    // モーダルを閉じる関数
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    // モーダルを開く関数
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    // 閉じるボタンのイベントリスナー
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // モーダル外クリックで閉じる
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    closeModal(modal);
                }
            });
        }
    });
}

// グローバル関数の定義

// コミュニティ参加モーダルを表示
function showJoinModal() {
    const modal = document.getElementById('join-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
}

// ログインモーダルを表示（仮実装）
function showLoginModal() {
    alert('ログイン機能は開発中です。現在はコミュニティ参加のみ受付中です。');
}

// 成功事例詳細を表示
function showStoryDetail(storyId) {
    const storyDetails = {
        'manufacturing-dx': {
            title: '製造業DX革命 - A社×B社連携事例',
            content: `
                <h3>プロジェクト概要</h3>
                <p>従来の製造プロセスにIT企業の最新デジタル技術を融合させ、生産性と品質の大幅向上を実現。</p>
                
                <h3>実施内容</h3>
                <ul>
                    <li>IoTセンサーによる生産ライン可視化</li>
                    <li>AIを活用した品質予測システム導入</li>
                    <li>TeamAlignによる両社進捗管理</li>
                    <li>リアルタイムデータ分析環境構築</li>
                </ul>
                
                <h3>成果</h3>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-value">300%</div>
                        <div class="result-label">売上向上</div>
                    </div>
                    <div class="result-item">
                        <div class="result-value">85%</div>
                        <div class="result-label">効率改善</div>
                    </div>
                    <div class="result-item">
                        <div class="result-value">18ヶ月</div>
                        <div class="result-label">達成期間</div>
                    </div>
                </div>
            `
        },
        'startup-growth': {
            title: 'スタートアップ急成長事例 - C社',
            content: `
                <h3>背景・課題</h3>
                <p>創業3年目で成長が鈍化。組織のスケールアップと効率的な目標管理が急務となっていた。</p>
                
                <h3>TeamAlign活用法</h3>
                <ul>
                    <li>全社OKR導入と進捗可視化</li>
                    <li>チーム間連携強化</li>
                    <li>データドリブンな意思決定体制構築</li>
                    <li>コミュニティからのベストプラクティス学習</li>
                </ul>
                
                <h3>成果</h3>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-value">250%</div>
                        <div class="result-label">成長率</div>
                    </div>
                    <div class="result-item">
                        <div class="result-value">92%</div>
                        <div class="result-label">目標達成率</div>
                    </div>
                    <div class="result-item">
                        <div class="result-value">12ヶ月</div>
                        <div class="result-label">達成期間</div>
                    </div>
                </div>
            `
        },
        'supply-chain': {
            title: 'サプライチェーン最適化 - D社×E社連携',
            content: `
                <h3>連携の背景</h3>
                <p>小売業と物流企業が、在庫効率と配送最適化を目的とした戦略的パートナーシップを締結。</p>
                
                <h3>実施施策</h3>
                <ul>
                    <li>リアルタイム在庫データ共有システム</li>
                    <li>需要予測AIの共同開発</li>
                    <li>配送ルート最適化アルゴリズム</li>
                    <li>TeamAlignによる両社KPI統合管理</li>
                </ul>
                
                <h3>成果</h3>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-value">40%</div>
                        <div class="result-label">在庫効率改善</div>
                    </div>
                    <div class="result-item">
                        <div class="result-value">￥2.8億</div>
                        <div class="result-label">年間コスト削減</div>
                    </div>
                    <div class="result-item">
                        <div class="result-value">95%</div>
                        <div class="result-label">納期達成率</div>
                    </div>
                </div>
            `
        }
    };

    const story = storyDetails[storyId];
    if (story) {
        // 動的にモーダルを作成して表示
        const modalHtml = `
            <div id="story-detail-modal" class="modal" style="display: flex;">
                <div class="modal-content large">
                    <span class="close">&times;</span>
                    <h2>${story.title}</h2>
                    <div class="story-detail-content">
                        ${story.content}
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="showJoinModal(); closeStoryModal();">同様の成果を目指す</button>
                        <button class="btn-outline" onclick="closeStoryModal()">閉じる</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.body.classList.add('modal-open');
        
        // 閉じるボタンのイベントリスナー
        document.querySelector('#story-detail-modal .close').addEventListener('click', closeStoryModal);
        document.getElementById('story-detail-modal').addEventListener('click', function(e) {
            if (e.target === this) closeStoryModal();
        });
    }
}

// 成功事例モーダルを閉じる
function closeStoryModal() {
    const modal = document.getElementById('story-detail-modal');
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
    }
}

// すべての成功事例を表示
function showAllStoriesModal() {
    alert('すべての成功事例ページは開発中です。詳細はコミュニティ参加後にご覧いただけます。');
}

// 成功事例プレビューモーダル
function showSuccessStoriesModal() {
    const successStoriesSection = document.getElementById('success-stories');
    if (successStoriesSection) {
        successStoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// マッチングプレビューモーダル
function showMatchingModal() {
    const matchingSection = document.getElementById('matching');
    if (matchingSection) {
        matchingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// TeamAlign製品デモ
function showTeamAlignDemo() {
    alert('TeamAlign製品デモページは開発中です。お問い合わせフォームからデモをご依頼ください。');
}

// 連絡フォーム表示
function showContactForm(companyName) {
    alert(`${companyName}との連携に興味をお持ちいただき、ありがとうございます。詳細はコミュニティ参加後にご確認いただけます。`);
} 