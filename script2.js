// --- 1. オープニング演出とロゴアニメーション ---
$(window).on('load', function() {
    
    // ロゴアニメーション完了後に実行される関数
    function startMainApp() {
        // 1. ロゴをコンテンツ内の所定の位置に移動させる
        $('.logo-wrapper').addClass('in-place');

        // 2. ロゴの移動アニメーション(0.8s)が終わるのを待ってからコンテンツを表示
        setTimeout(function() {
            $('#app-wrapper').addClass('visible');
            $('body').css('overflow', 'auto'); // スクロールを許可
        }, 800); // 0.8秒
    }

    // デバイス判定（変更なし）
    const isDevice = /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase());
    if (isDevice) {
        // モバイルの場合はアニメーションをスキップして即座にアプリを開始
        $('.logo-wrapper').remove(); // ロゴは表示しない
        startMainApp();
        return;
    }

    // アニメーションの初期設定（変更なし）
    TweenMax.set($('#logo-webbab #iso'), { attr: { rx: 50, ry: 50 }, transformOrigin: "50% 50%", rotation: 90, scale: 0, autoAlpha: 1 });
    TweenMax.set($('.logo-circle'), { transformOrigin: "50% 50%", scale: 2, autoAlpha: 0 });
    TweenMax.set($('.logo-ellipse'), { attr: { cx: 100, cy: 150, rx: 180, ry: 180 }, strokeWidth: 60, transformOrigin: "50% 50%", autoAlpha: 0 });

    // GSAPのタイムラインに完了時コールバックを追加
    const master = new TimelineMax({ onComplete: startMainApp });

    // アニメーション定義（変更なし）
    function rhombusRotation() {
        const tl = new TimelineMax();
        tl.to($('#logo-webbab #iso'), 0.6, { autoAlpha: 1, scale: 1, ease: Power1.easeIn }).to($('#logo-webbab #iso'), 0.6, { attr: { rx: 15, ry: 15 }, rotation: -45, ease: Power1.easeOut });
        return tl;
    }
    function ellipsesAnimation() {
        const tl = new TimelineMax();
        tl.to($('.logo-ellipse').eq(0), 0.4, { attr: { cx: 6, cy: -64, rx: 150, ry: 150 }, strokeWidth: 2, autoAlpha: 1, ease: Power2.easeOut }).to($('.logo-ellipse').eq(1), 0.4, { attr: { cx: 138, cy: -80, rx: 150, ry: 150 }, strokeWidth: 2, autoAlpha: 1, ease: Power2.easeOut }, '-=0.2').to($('.logo-ellipse').eq(2), 0.4, { attr: { cx: 190, cy: 15, rx: 150, ry: 150 }, strokeWidth: 2, autoAlpha: 1, ease: Power2.easeOut }, '-=0.2');
        return tl;
    }
    function circleIntersection() {
        const tl = new TimelineMax();
        tl.staggerFromTo($('.logo-circle'), 0.4, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: Cubic.easeInOut }, 0.1);
        return tl;
    }
    function textAnimation() {
        const tl = new TimelineMax();
        tl.staggerFromTo($('.word'), 1.5, { autoAlpha: 0, scale: 0.8, x: -20, transformOrigin: "left center", ease: Elastic.easeOut.config(1, 0.3) }, { autoAlpha: 1, scale: 1, x: 0, ease: Elastic.easeOut.config(1, 0.5) }, 0.05);
        return tl;
    }

    // タイムラインの実行
    master.add(rhombusRotation(), "scene2").add(ellipsesAnimation(), "-=0.6", "scene3").add(circleIntersection(), "-=0.4", "scene4").add(textAnimation(), "-=0.5", "scene5");
    master.timeScale(0.9);
});

// --- 2. アコーディオン機能 と ドラッグ＆ドロップ機能 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- アコーディオン機能 ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // クリックされたヘッダーに 'active' クラスを付け外し
            header.classList.toggle('active');
            
            const accordionContent = header.nextElementSibling;

            // 'active' なら高さを設定、でなければ高さを0に
            if (header.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });


    // --- ドラッグ＆ドロップ機能（変更なし） ---
    const draggableContainer = document.getElementById('draggable-container');
    if (draggableContainer) { // コンテナが存在する場合のみ実行
        const draggables = draggableContainer.querySelectorAll('.content-block');
        let draggingElement = null;

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggingElement = draggable;
                setTimeout(() => {
                    draggable.style.opacity = '0.5';
                }, 0);
            });
            draggable.addEventListener('dragend', () => {
                draggingElement.style.opacity = '1';
                draggingElement = null;
            });
        });

        draggableContainer.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(draggableContainer, e.clientY);
            if (afterElement == null) {
                draggableContainer.appendChild(draggingElement);
            } else {
                draggableContainer.insertBefore(draggingElement, afterElement);
            }
        });

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.content-block:not([style*="opacity: 0.5"])')];
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
    }
});
