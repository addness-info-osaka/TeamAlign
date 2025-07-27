# TeamAlign - 次世代型BtoBオープンプラットフォーム

## 🎯 プロジェクト概要

TeamAlignは「経営が見える。人がつながる。組織が進化する。」をコンセプトとした次世代型BtoBオープンプラットフォームです。AI経営の可視化、企業間マッチング、実践知の共有を通じて、組織変革を支援します。

## ✨ 主要機能

### 📊 AI経営ダッシュボード
- 組織健康度スコアのリアルタイム表示
- OKR達成率、エンゲージメント指数の可視化
- 業界平均との比較分析
- 成長トレンドの時系列データ

### 🤝 スマートマッチング
- AIによる事業シナジー分析
- 組織文化・価値観の適合度算出
- 戦略的な協業パートナー提案
- 段階的関係構築プロセス

### 📚 ナレッジライブラリ
- 組織変革ケーススタディ
- 業界別・課題別ソリューション集
- 専門家による解説・コメント機能
- 実装難易度・効果予測の評価

### 🎓 AI経営アカデミー
- 段階的学習プログラム（基礎→中級→上級）
- インタラクティブな学習コンテンツ
- 実際のデータを使った演習
- 修了証・バッジ発行システム

## 🚀 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **チャート**: Chart.js
- **フォント**: Inter, Noto Sans JP
- **アニメーション**: CSS Animations, Intersection Observer API
- **レスポンシブ**: CSS Grid, Flexbox

## 📁 プロジェクト構造

```
TeamAlign-Platform/
├── index.html              # メインHTML
├── styles.css              # メインCSSファイル
├── script.js               # JavaScript機能
├── assets/                 # 画像・動画などのリソース
│   ├── logo.svg
│   ├── company-*.jpg
│   ├── case-study-*.mp4
│   ├── webinar-*.jpg
│   └── avatar-*.jpg
├── TeamAlign_Platform_Design.md  # 詳細設計書
└── README.md
```

## 🛠️ セットアップ方法

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd TeamAlign-Platform
```

### 2. ローカルサーバーの起動
```bash
# Python 3の場合
python -m http.server 8000

# Python 2の場合
python -m SimpleHTTPServer 8000

# Node.jsの場合（npx live-server）
npx live-server
```

### 3. ブラウザでアクセス
```
http://localhost:8000
```

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: #2563eb (Blue)
- **セカンダリ**: #8b5cf6 (Purple)
- **アクセント**: #06b6d4 (Cyan)
- **成功**: #10b981 (Green)
- **警告**: #f59e0b (Amber)
- **エラー**: #ef4444 (Red)

### タイポグラフィ
- **メインフォント**: Inter
- **日本語フォント**: Noto Sans JP
- **サイズスケール**: 14px, 16px, 18px, 20px, 24px, 32px, 48px

### スペーシング
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px
- **3XL**: 64px

## 🔧 カスタマイズ

### CSS変数の変更
`styles.css`の`:root`セクションで色やサイズを調整できます：

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #8b5cf6;
  --space-md: 1rem;
  /* 他の変数... */
}
```

### コンテンツの更新
- **成功事例**: `script.js`の`storyCards`配列を編集
- **統計数値**: HTMLの`data-target`属性を変更
- **学習コンテンツ**: HTML内の`.content-card`セクションを編集

## 📱 レスポンシブ対応

- **デスクトップ**: 1200px以上
- **タブレット**: 768px - 1199px
- **モバイル**: 767px以下

## 🔒 セキュリティ

- フォームバリデーション実装済み
- XSS攻撃対策（適切なエスケープ処理）
- HTTPS推奨

## 🧪 テスト

### ブラウザサポート
- **Chrome**: 最新版
- **Firefox**: 最新版
- **Safari**: 最新版
- **Edge**: 最新版

### モバイルテスト
- iOS Safari
- Android Chrome

## 📊 アナリティクス

`script.js`の`trackUserInteraction`関数でユーザー行動を追跡：

```javascript
function trackUserInteraction(action, element) {
  // Google Analytics, Mixpanel等との統合
  console.log(`User interaction: ${action} on ${element}`);
}
```

## 🚀 デプロイ

### Netlify
1. GitHubリポジトリと連携
2. ビルド設定不要（静的サイト）
3. 自動デプロイ設定

### Vercel
1. `vercel --prod`コマンド実行
2. 自動最適化適用

### AWS S3 + CloudFront
1. S3バケットに静的ファイルアップロード
2. CloudFront配信設定

## 🤝 コントリビューション

1. Forkしてください
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で配布されています。詳細は`LICENSE`ファイルを参照してください。

## 📞 サポート

- **Email**: support@teamalign.jp
- **ドキュメント**: [docs.teamalign.jp](https://docs.teamalign.jp)
- **コミュニティ**: [community.teamalign.jp](https://community.teamalign.jp)

## 🔄 バージョン履歴

### v1.0.0 (2024-01-01)
- 初回リリース
- AI経営ダッシュボード実装
- 基本的なマッチング機能
- 学習コンテンツ表示
- レスポンシブデザイン対応

---

**TeamAlign** - 経営が見える。人がつながる。組織が進化する。 