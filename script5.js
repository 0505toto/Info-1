/* フォント */
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

/* 基本リセット */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Exo', sans-serif;
  height: 100vh;
  background-color: #121212;
  color: #f5f5f5;
  overflow: hidden;
}

/* 背景アニメーション */
.area {
  background: -webkit-linear-gradient(to left, #0f0f0f, #1a1a1a);
  width: 100%;
  height: 100vh;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
  animation: animate 25s linear infinite;
  bottom: -150px;
  border-radius: 50%;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

/* 円サイズランダム化 */
.circles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
.circles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
.circles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
.circles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
.circles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
.circles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
.circles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
.circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
.circles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
.circles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }

/* レイアウト */
.layout {
  display: flex;
  height: 100vh;
  position: relative;
  z-index: 1;
}

/* メイン9割 */
.main-content {
  flex: 9;
  padding: 2rem;
  overflow-y: auto;
}

/* サイド1割 */
.side-links {
  flex: 1;
  background-color: #1f1f1f;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.quick-links a {
  display: block;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #2c2c2c;
  color: #a0ff9f;
  text-decoration: none;
  border-left: 4px solid #50fa7b;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.quick-links a:hover {
  background-color: #333;
}

/* ロゴアニメーション中央配置 */
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 100%;
}

#logo-webbab {
  max-width: 100%;
  height: auto;
}

/* ドラッグ＆ドロップの項目 */
.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.block {
  background-color: #222;
  padding: 1rem;
  border-left: 5px solid #50fa7b;
  border-radius: 8px;
  cursor: grab;
  font-weight: bold;
  user-select: none;
}

.block:focus {
  outline: 2px dashed #50fa7b;
}

/* ドラッグ中 */
.dragging {
  opacity: 0.6;
  transform: rotate(1deg);
}

/* プレースホルダー */
.placeholder {
  height: 50px;
  border: 2px dashed #50fa7b;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* アニメーションコントロール */
.control {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.control ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.control a {
  color: #fff;
  background: #333;
  padding: 0.5rem 1rem;
  border: 1px solid #50fa7b;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
}

.control a:hover {
  background: #50fa7b;
  color: #000;
}
.block-header {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  color: #a0ff9f;
}

.block-body {
  margin-top: 0.5rem;
  display: none;
  font-size: 0.9rem;
  line-height: 1.5;
}

.block.open .block-body {
  display: block;
}

.block-body a {
  color: #80ffb0;
  text-decoration: underline;
}

.block-body a:hover {
  color: #caffc0;
}
