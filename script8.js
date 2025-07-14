/*
    ユーザー提供のロゴアニメーションコード
    (この部分は変更ありません)
*/
function logoWebbab() {
    // ...ロゴアニメーションのコードは長いので省略...
    // ...以前の回答と同じコードをここに記述...

    // ★ 唯一の変更点：アニメーション完了コールバック
    var master = gsap.timeline({
        onComplete: showMainContent // 関数名を直接指定
    });

    master.add(rhombusRotation(), "scene2")
          .add(ellipsesAnimation(), "-=0.6")
          .add(circleIntersection(), "-=0.4")
          .add(textAnimation(), "-=0.5");
    master.timeScale(self.timer);
};
// ...ロゴアニメーションのコードここまで...

/**
 * ロゴアニメーション完了後に、ロゴを移動させコンテンツを表示する関数
 */
function showMainContent() {
    const logoWrapper = $('.logo-wrapper');
    const pageContent = $('.page-content');

    logoWrapper.css({
        'top': '30px',
        'max-width': '200px',
        'transform': 'translateX(-50%)'
    });

    setTimeout(function() {
        pageContent.css({
            'visibility': 'visible',
            'opacity': '1'
        });
    }, 800);
}

// ドキュメントが読み込まれたら実行
$(document).ready(function() {

    // --- 1. オープニングアニメーションの実行 ---
    $(window).on('load', function() {
        var runLogo = new logoWebbab();
        runLogo.init();
    });

    // --- 2. アコーディオン機能 ---
    $('.section-header').on('click', function() {
        const section = $(this).closest('.draggable-section');
        section.toggleClass('open');
    });

    // --- ここからが追加・変更部分 ---

    // --- 3. 保存機能 ---
    
    // 項目の並び順を保存する関数
    function saveOrder() {
        const order = [];
        $('.main-content .draggable-section').each(function() {
            order.push($(this).data('id'));
        });
        localStorage.setItem('portalOrder', JSON.stringify(order));
    }

    // 名前の変更を保存する関数
    function saveNames() {
        const names = {};
        $('[contenteditable="true"]').each(function() {
            const id = $(this).data('id');
            const text = $(this).text();
            names[id] = text;
        });
        localStorage.setItem('portalNames', JSON.stringify(names));
    }

    // --- 4. ドラッグ＆ドロップ機能 (保存処理を追加) ---
    const mainContent = document.querySelector('.main-content');
    let draggedItem = null;

    mainContent.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.style.opacity = '0.5';
        }, 0);
    });

    mainContent.addEventListener('dragend', (e) => {
        e.target.style.opacity = '';
        draggedItem = null;
        // ドラッグ終了時に並び順を保存
        saveOrder();
    });
    
    mainContent.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(mainContent, e.clientY);
        if (afterElement == null) {
            mainContent.appendChild(draggedItem);
        } else {
            mainContent.insertBefore(draggedItem, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-section:not([style*="opacity: 0.5"])')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // --- 5. 名前の変更を監視して保存 ---
    // contenteditable要素からフォーカスが外れたら(編集が終わったら)保存
    $('[contenteditable="true"]').on('blur', saveNames);

    // --- 6. ページ読み込み時に保存したデータを復元 ---
    function loadData() {
        // 並び順を復元
        const savedOrder = JSON.parse(localStorage.getItem('portalOrder'));
        if (savedOrder) {
            savedOrder.forEach(id => {
                const element = $(`.main-content [data-id="${id}"]`);
                $('.main-content').append(element);
            });
        }

        // 名前を復元
        const savedNames = JSON.parse(localStorage.getItem('portalNames'));
        if (savedNames) {
            for (const id in savedNames) {
                $(`[data-id="${id}"]`).text(savedNames[id]);
            }
        }
    }

    // ページが読み込まれた瞬間にデータを復元
    loadData();

});
