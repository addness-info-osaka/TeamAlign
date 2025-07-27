// ===== Knowledge Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize knowledge page functionality
    initCategoryFiltering();
    initKnowledgeCounters();
    initKnowledgeInteractions();
    initResourceDownloads();
    initStickyNavigation();
});

// ===== Category Filtering =====
function initCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const knowledgeSections = document.querySelectorAll('.knowledge-section, .success-showcase, .techniques-section, .industry-guides, .tools-resources');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter content based on category
            filterKnowledgeContent(category);
        });
    });
    
    function filterKnowledgeContent(category) {
        knowledgeSections.forEach(section => {
            const sectionId = section.id;
            
            if (category === 'all') {
                section.style.display = 'block';
                animateSection(section);
            } else {
                // Map categories to sections
                const categoryMap = {
                    'getting-started': ['getting-started'],
                    'okr': ['getting-started', 'success-showcase'],
                    'engagement': ['techniques-section'],
                    'leadership': ['techniques-section', 'industry-guides'],
                    'case-studies': ['success-showcase'],
                    'best-practices': ['techniques-section', 'tools-resources']
                };
                
                const relevantSections = categoryMap[category] || [];
                
                if (relevantSections.some(sec => section.classList.contains(sec.replace('-', '-')) || sectionId === sec)) {
                    section.style.display = 'block';
                    animateSection(section);
                } else {
                    section.style.display = 'none';
                }
            }
        });
    }
    
    function animateSection(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
}

// ===== Knowledge Counters =====
function initKnowledgeCounters() {
    const knowledgeStats = document.querySelectorAll('.knowledge-stat .stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    knowledgeStats.forEach(stat => {
        observer.observe(stat);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===== Knowledge Interactions =====
function initKnowledgeInteractions() {
    // Guide card interactions
    const guideCards = document.querySelectorAll('.guide-card .btn-outline');
    guideCards.forEach((button, index) => {
        button.addEventListener('click', function() {
            const guideTitle = this.closest('.guide-card').querySelector('h3').textContent;
            showGuideDetailModal(guideTitle, index + 1);
        });
    });
    
    // Case study interactions
    const caseStudyButtons = document.querySelectorAll('.showcase-card .btn-primary, .showcase-card .btn-outline');
    caseStudyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const companyName = this.closest('.showcase-card').querySelector('h3').textContent;
            showCaseStudyModal(companyName);
        });
    });
    
    // Technique card interactions
    const techniqueButtons = document.querySelectorAll('.technique-card .btn-outline');
    techniqueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const techniqueTitle = this.closest('.technique-card').querySelector('h3').textContent;
            showTechniqueModal(techniqueTitle);
        });
    });
    
    // Industry guide interactions
    const industryButtons = document.querySelectorAll('.industry-card .btn-outline');
    industryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const industryName = this.closest('.industry-card').querySelector('h3').textContent;
            showIndustryGuideModal(industryName);
        });
    });
}

// ===== Modal Functions =====
function showGuideDetailModal(title, step) {
    const modalContent = {
        1: {
            title: "初期設定とセットアップ",
            content: `
                <div class="modal-guide-content">
                    <h4>TeamAlign導入の最初の30日間ロードマップ</h4>
                    <div class="guide-timeline">
                        <div class="timeline-item">
                            <span class="timeline-day">Day 1-5</span>
                            <div class="timeline-content">
                                <h5>組織構造の設定</h5>
                                <p>部門、チーム、役職の階層構造をTeamAlignに反映させます。</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-day">Day 6-10</span>
                            <div class="timeline-content">
                                <h5>ユーザー招待とロール設定</h5>
                                <p>段階的にメンバーを招待し、適切な権限設定を行います。</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-day">Day 11-20</span>
                            <div class="timeline-content">
                                <h5>初回OKR設定ワークショップ</h5>
                                <p>全社レベルから個人レベルまでのOKRを設定します。</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-day">Day 21-30</span>
                            <div class="timeline-content">
                                <h5>ダッシュボードのカスタマイズ</h5>
                                <p>各ユーザーに最適化された情報表示を設定します。</p>
                            </div>
                        </div>
                    </div>
                    <div class="guide-tips">
                        <h5>💡 成功のコツ</h5>
                        <ul>
                            <li>段階的な展開でユーザーの負担を軽減</li>
                            <li>早期にスモールウィンを積み重ねる</li>
                            <li>定期的なフィードバック収集と改善</li>
                        </ul>
                    </div>
                </div>
            `
        },
        2: {
            title: "OKR設定のベストプラクティス",
            content: `
                <div class="modal-guide-content">
                    <h4>効果的なOKR設計の5つのステップ</h4>
                    <div class="okr-steps">
                        <div class="okr-step">
                            <h5>1. Objective（目標）の設定</h5>
                            <p>インスパイアリングで定性的な目標を設定します。</p>
                            <div class="example">
                                <strong>良い例:</strong> "顧客満足度を飛躍的に向上させる"
                            </div>
                        </div>
                        <div class="okr-step">
                            <h5>2. Key Results（主要結果）の定義</h5>
                            <p>測定可能で具体的な成果指標を3-5個設定します。</p>
                            <div class="example">
                                <strong>例:</strong> "NPS 50以上達成", "解約率を5%以下に削減"
                            </div>
                        </div>
                        <div class="okr-step">
                            <h5>3. アラインメントの確保</h5>
                            <p>全社OKRと各チームOKRの連携を可視化します。</p>
                        </div>
                        <div class="okr-step">
                            <h5>4. 定期的なチェックイン</h5>
                            <p>週次・月次でのプロセス追跡を実施します。</p>
                        </div>
                        <div class="okr-step">
                            <h5>5. 四半期振り返り</h5>
                            <p>結果分析と次期OKRへの反映を行います。</p>
                        </div>
                    </div>
                </div>
            `
        },
        3: {
            title: "組織全体への展開戦略",
            content: `
                <div class="modal-guide-content">
                    <h4>段階的ロールアウト戦略</h4>
                    <div class="rollout-phases">
                        <div class="phase">
                            <h5>Phase 1: パイロットチーム (1-2ヶ月)</h5>
                            <p>最も協力的な1-2チームで検証開始</p>
                            <ul>
                                <li>機能の実証と課題の特定</li>
                                <li>初期ベストプラクティスの確立</li>
                                <li>チェンジエージェントの育成</li>
                            </ul>
                        </div>
                        <div class="phase">
                            <h5>Phase 2: 部門展開 (3-4ヶ月)</h5>
                            <p>成功部門の事例を他部門に展開</p>
                            <ul>
                                <li>部門別カスタマイゼーション</li>
                                <li>横展開のための研修実施</li>
                                <li>抵抗要因への対策実行</li>
                            </ul>
                        </div>
                        <div class="phase">
                            <h5>Phase 3: 全社展開 (5-6ヶ月)</h5>
                            <p>組織全体での本格運用開始</p>
                            <ul>
                                <li>統一された運用ルールの確立</li>
                                <li>継続的改善体制の構築</li>
                                <li>定着化のためのKPI設定</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    const content = modalContent[step] || { title: title, content: "<p>詳細なガイドを準備中です。</p>" };
    showModal(content.title, content.content);
}

function showCaseStudyModal(companyName) {
    const caseStudies = {
        "製造業A社": `
            <div class="case-study-detail">
                <div class="case-overview">
                    <h4>🏭 製造業A社の組織変革ストーリー</h4>
                    <p>従業員1,200名の老舗製造業が、TeamAlignを活用してデジタル時代の組織変革を実現した詳細事例です。</p>
                </div>
                <div class="case-timeline">
                    <h5>導入から成果まで6ヶ月の軌跡</h5>
                    <div class="timeline">
                        <div class="timeline-item">
                            <span class="timeline-period">Month 1-2</span>
                            <div class="timeline-desc">
                                <strong>課題分析・設計</strong><br>
                                既存の目標管理制度の課題分析とTeamAlign設計
                            </div>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-period">Month 3-4</span>
                            <div class="timeline-desc">
                                <strong>パイロット実施</strong><br>
                                生産部門での試験運用と機能検証
                            </div>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-period">Month 5-6</span>
                            <div class="timeline-desc">
                                <strong>全社展開</strong><br>
                                全部門への段階的ロールアウトと定着化
                            </div>
                        </div>
                    </div>
                </div>
                <div class="key-learnings">
                    <h5>🎯 重要な学び</h5>
                    <ul>
                        <li>現場リーダーの早期巻き込みが成功の鍵</li>
                        <li>既存プロセスとの段階的統合が効果的</li>
                        <li>可視化による透明性向上が組織文化を変革</li>
                    </ul>
                </div>
            </div>
        `,
        "IT企業B社": `
            <div class="case-study-detail">
                <div class="case-overview">
                    <h4>💻 IT企業B社のリモートワーク変革</h4>
                    <p>コロナ禍でリモートワークに移行したIT企業が、TeamAlignでチーム一体感を再構築した事例です。</p>
                </div>
                <div class="remote-challenges">
                    <h5>リモートワーク特有の課題</h5>
                    <ul>
                        <li>チームメンバー間のコミュニケーション不足</li>
                        <li>進捗状況の見えにくさ</li>
                        <li>個人のモチベーション管理の困難</li>
                        <li>成果の公平な評価の難しさ</li>
                    </ul>
                </div>
                <div class="solutions-implemented">
                    <h5>TeamAlignによる解決策</h5>
                    <ul>
                        <li>透明な目標設定と進捗共有</li>
                        <li>定期的なチェックインの仕組み化</li>
                        <li>成果と貢献の可視化</li>
                        <li>チーム目標への個人貢献度の明確化</li>
                    </ul>
                </div>
            </div>
        `
    };
    
    const content = caseStudies[companyName] || "<p>詳細な事例を準備中です。</p>";
    showModal(`${companyName} 導入事例`, content);
}

function showTechniqueModal(technique) {
    const techniques = {
        "データドリブン意思決定": `
            <div class="technique-detail">
                <h4>📊 データドリブン意思決定の実践法</h4>
                <div class="technique-steps">
                    <div class="step">
                        <h5>1. 適切なKPIの設定</h5>
                        <p>ビジネス目標に直結する測定可能な指標を選択します。</p>
                        <div class="example">
                            <strong>例:</strong> 売上だけでなく、顧客満足度、従業員エンゲージメント等
                        </div>
                    </div>
                    <div class="step">
                        <h5>2. データの収集と可視化</h5>
                        <p>TeamAlignのダッシュボード機能でリアルタイムデータを表示。</p>
                    </div>
                    <div class="step">
                        <h5>3. 定期的な分析と改善</h5>
                        <p>週次・月次でのデータレビューと意思決定プロセスの確立。</p>
                    </div>
                </div>
            </div>
        `,
        "効果的な1on1ミーティング": `
            <div class="technique-detail">
                <h4>🎯 TeamAlignを活用した1on1ミーティング</h4>
                <div class="oneone-structure">
                    <h5>効果的な1on1の構造</h5>
                    <div class="meeting-agenda">
                        <div class="agenda-item">
                            <strong>開始5分:</strong> 現在の状況・気持ちの確認
                        </div>
                        <div class="agenda-item">
                            <strong>15分:</strong> OKR進捗のレビューと課題討議
                        </div>
                        <div class="agenda-item">
                            <strong>10分:</strong> 成長・キャリアについての対話
                        </div>
                        <div class="agenda-item">
                            <strong>5分:</strong> 次回までのアクションアイテム確認
                        </div>
                    </div>
                </div>
                <div class="oneone-tips">
                    <h5>💡 成功のポイント</h5>
                    <ul>
                        <li>事前にTeamAlignで進捗状況を確認</li>
                        <li>データに基づいた具体的なフィードバック</li>
                        <li>部下主導の対話を心がける</li>
                        <li>記録と継続的な振り返り</li>
                    </ul>
                </div>
            </div>
        `
    };
    
    const content = techniques[technique] || "<p>詳細なテクニックを準備中です。</p>";
    showModal(technique, content);
}

function showIndustryGuideModal(industry) {
    const guides = {
        "製造業": `
            <div class="industry-guide-detail">
                <h4>🏭 製造業向けTeamAlign活用ガイド</h4>
                <div class="industry-specific">
                    <h5>製造業特有の課題とソリューション</h5>
                    <div class="challenge-solution">
                        <div class="challenge">
                            <strong>課題:</strong> 現場と管理部門の情報格差
                        </div>
                        <div class="solution">
                            <strong>解決策:</strong> 生産指標のリアルタイム可視化
                        </div>
                    </div>
                    <div class="challenge-solution">
                        <div class="challenge">
                            <strong>課題:</strong> 品質向上と効率化の両立
                        </div>
                        <div class="solution">
                            <strong>解決策:</strong> 品質KPIと生産性KPIの統合管理
                        </div>
                    </div>
                </div>
                <div class="implementation-examples">
                    <h5>導入事例とROI</h5>
                    <ul>
                        <li>生産効率 平均+25%向上</li>
                        <li>品質クレーム -40%削減</li>
                        <li>従業員エンゲージメント +30%向上</li>
                    </ul>
                </div>
            </div>
        `,
        "IT・テクノロジー": `
            <div class="industry-guide-detail">
                <h4>💻 IT・テクノロジー業界向けガイド</h4>
                <div class="agile-integration">
                    <h5>アジャイル開発との統合</h5>
                    <p>スプリント目標とOKRを連携させ、開発チームの目標達成を支援します。</p>
                    <div class="integration-points">
                        <ul>
                            <li>スプリント目標の自動同期</li>
                            <li>バーンダウンチャートとの連携</li>
                            <li>チーム速度の可視化</li>
                            <li>技術的負債の管理</li>
                        </ul>
                    </div>
                </div>
                <div class="remote-team-management">
                    <h5>リモートチーム管理のベストプラクティス</h5>
                    <p>分散したチームでも高いパフォーマンスを維持する手法。</p>
                </div>
            </div>
        `
    };
    
    const content = guides[industry] || "<p>業界別ガイドを準備中です。</p>";
    showModal(`${industry}向けガイド`, content);
}

function showModal(title, content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content knowledge-modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn-primary">TeamAlignを試してみる</button>
                <button class="btn-outline" onclick="closeModal()">閉じる</button>
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
    
    // Add global function for close button
    window.closeModal = closeModal;
    
    function closeModal() {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
        delete window.closeModal;
    }
}

// ===== Resource Downloads =====
function initResourceDownloads() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    const watchButtons = document.querySelectorAll('.btn-watch');
    const startButtons = document.querySelectorAll('.btn-start');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resourceName = this.closest('.resource-item').querySelector('.resource-name').textContent;
            handleResourceDownload(resourceName);
        });
    });
    
    watchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resourceName = this.closest('.resource-item').querySelector('.resource-name').textContent;
            handleResourceWatch(resourceName);
        });
    });
    
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resourceName = this.closest('.resource-item').querySelector('.resource-name').textContent;
            handleResourceStart(resourceName);
        });
    });
}

function handleResourceDownload(resourceName) {
    // In a real app, this would trigger actual download
    showDownloadModal(resourceName);
}

function handleResourceWatch(resourceName) {
    // In a real app, this would open video player
    showVideoModal(resourceName);
}

function handleResourceStart(resourceName) {
    // In a real app, this would start the tool/assessment
    showToolModal(resourceName);
}

function showDownloadModal(resourceName) {
    const content = `
        <div class="download-modal-content">
            <h4>📋 ${resourceName}</h4>
            <p>このリソースをダウンロードするには、メールアドレスの登録が必要です。</p>
            <form class="download-form">
                <div class="form-group">
                    <label for="download-email">メールアドレス</label>
                    <input type="email" id="download-email" required>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" required>
                        TeamAlignの最新情報をメールで受け取る
                    </label>
                </div>
                <button type="submit" class="btn-primary">ダウンロード開始</button>
            </form>
        </div>
    `;
    
    showModal('リソースダウンロード', content);
}

function showVideoModal(resourceName) {
    const content = `
        <div class="video-modal-content">
            <h4>🎓 ${resourceName}</h4>
            <div class="video-placeholder">
                <div class="video-info">
                    <p>このビデオコンテンツは約30分の学習プログラムです。</p>
                    <div class="video-features">
                        <span class="feature">日本語字幕対応</span>
                        <span class="feature">資料DL可能</span>
                        <span class="feature">質疑応答セッション付き</span>
                    </div>
                </div>
                <button class="btn-primary btn-large play-button">▶ 視聴を開始</button>
            </div>
            <p class="video-note">※ 視聴にはTeamAlignアカウントが必要です</p>
        </div>
    `;
    
    showModal('学習コンテンツ', content);
}

function showToolModal(resourceName) {
    const content = `
        <div class="tool-modal-content">
            <h4>📊 ${resourceName}</h4>
            <p>このツールは約10-15分で完了する診断ツールです。結果に基づいたカスタマイズされた改善提案を受け取れます。</p>
            <div class="tool-preview">
                <div class="preview-questions">
                    <h5>診断内容の例:</h5>
                    <ul>
                        <li>現在の組織目標の明確性</li>
                        <li>チーム間の連携度</li>
                        <li>進捗管理の効率性</li>
                        <li>フィードバック文化の浸透度</li>
                    </ul>
                </div>
            </div>
            <div class="tool-actions">
                <button class="btn-primary">診断を開始</button>
                <button class="btn-outline">サンプル結果を見る</button>
            </div>
        </div>
    `;
    
    showModal('診断ツール', content);
}

// ===== Sticky Navigation =====
function initStickyNavigation() {
    const knowledgeNav = document.querySelector('.knowledge-nav');
    const header = document.querySelector('.header');
    
    if (knowledgeNav && header) {
        const headerHeight = header.offsetHeight;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const knowledgeNavPosition = knowledgeNav.offsetTop - headerHeight;
            
            if (scrollPosition >= knowledgeNavPosition) {
                knowledgeNav.style.position = 'fixed';
                knowledgeNav.style.top = headerHeight + 'px';
                knowledgeNav.style.width = '100%';
                knowledgeNav.style.zIndex = '999';
            } else {
                knowledgeNav.style.position = 'static';
                knowledgeNav.style.top = 'auto';
                knowledgeNav.style.width = 'auto';
            }
        });
    }
}

// ===== Utility Functions =====
function trackKnowledgeInteraction(action, resource) {
    // Analytics tracking for knowledge page interactions
    console.log(`Knowledge interaction: ${action} - ${resource}`);
    
    // In a real app, this would send data to analytics service
    // gtag('event', 'knowledge_interaction', {
    //     action: action,
    //     resource: resource
    // });
} 