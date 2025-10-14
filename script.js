// ========================================
// グローバル変数と設定
// ========================================

// ロゴ画像の総数(必要に応じて変更可能)
const TOTAL_LOGOS = 25;

// ========================================
// 初期化関数
// ========================================

/**
 * ページ読み込み時の初期化処理
 */
document.addEventListener('DOMContentLoaded', function() {
    // ロゴギャラリーを生成
    generateGallery();
});

// ========================================
// ロゴギャラリー生成
// ========================================

/**
 * ロゴカードを動的に生成してグリッドに追加
 */
function generateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = ''; // 既存のコンテンツをクリア
    
    // 各ロゴカードを生成
    for (let i = 1; i <= TOTAL_LOGOS; i++) {
        const logoCard = createLogoCard(i);
        galleryGrid.appendChild(logoCard);
    }
}

/**
 * 個別のロゴカード要素を作成
 * @param {number} logoNumber - ロゴの番号
 * @returns {HTMLElement} - ロゴカード要素
 */
function createLogoCard(logoNumber) {
    // カードのメインコンテナ
    const card = document.createElement('div');
    card.className = 'logo-card';
    card.dataset.logo = logoNumber;
    
    // ロゴ番号バッジ
    const logoNumberBadge = document.createElement('div');
    logoNumberBadge.className = 'logo-number';
    logoNumberBadge.textContent = `案${logoNumber}`;
    
    // 画像コンテナ
    const imageContainer = document.createElement('div');
    imageContainer.className = 'logo-image-container';
    
    // ロゴ画像
    const logoImage = document.createElement('img');
    logoImage.className = 'logo-image';
    logoImage.src = `images/${logoNumber}.png`;
    logoImage.alt = `ロゴ案 ${logoNumber}`;
    
    // 画像読み込みエラー時の処理
    logoImage.onerror = function() {
        // 画像が見つからない場合、プレースホルダーSVGを表示
        this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect fill='%23f0f0f0' width='500' height='500'/%3E%3Ctext fill='%23c41e3a' font-size='28' font-weight='bold' x='50%25' y='45%25' text-anchor='middle' dy='.3em'%3E画像が見つかりません%3C/text%3E%3Ctext fill='%23666' font-size='18' x='50%25' y='55%25' text-anchor='middle' dy='.3em'%3E${logoNumber}.png%3C/text%3E%3C/svg%3E`;
        console.error(`画像の読み込みに失敗しました: images/${logoNumber}.png`);
    };
    
    // 画像読み込み成功時の処理(デバッグ用)
    logoImage.onload = function() {
        console.log(`画像読み込み成功: images/${logoNumber}.png`);
    };
    
    imageContainer.appendChild(logoImage);
    
    // ロゴ説明ラベル
    const logoLabel = document.createElement('div');
    logoLabel.className = 'logo-label';
    logoLabel.textContent = `ロゴデザイン案 ${logoNumber}`;
    
    // すべての要素をカードに追加
    card.appendChild(logoNumberBadge);
    card.appendChild(imageContainer);
    card.appendChild(logoLabel);
    
    return card;
}

// ========================================
// ユーティリティ関数
// ========================================

/**
 * ロゴの総数を変更する場合の関数
 * 使用方法: ブラウザのコンソールで updateLogoCount(25) を実行
 * @param {number} newTotal - 新しいロゴの総数
 */
function updateLogoCount(newTotal) {
    if (newTotal > 0) {
        // グローバル変数を更新
        window.TOTAL_LOGOS = newTotal;
        // ギャラリーを再生成
        generateGallery();
        console.log(`ロゴ数を${newTotal}個に更新しました`);
    } else {
        console.error('ロゴ数は1以上の値を指定してください');
    }
}
