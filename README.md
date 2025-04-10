# 試管倒球遊戲 (Ball Sort Puzzle Game)

一個使用React開發的試管倒球益智遊戲。玩家需要通過移動試管中的彩色球,將所有同顏色的球歸類到同一試管中。

當前版本: v1.1.0

## 在線演示

[試管倒球遊戲](https://yanchen184.github.io/ball-sort-puzzle-game)

## 功能特點

* 四種不同難度級別:簡單、中等、困難和專家
* 自動保存遊戲進度,可隨時繼續未完成的遊戲
* 移動撤銷功能,可回退錯誤的步驟
* 提示系統,在遇到難題時提供幫助
* 遊戲計時器,記錄解題時間
* 移動步數計數和記錄
* 精美的視覺效果和動畫
* 遊戲音效,增強遊戲體驗
* 響應式設計,適用於不同尺寸的設備

## 遊戲規則

* 點擊一根試管選擇它,再點擊另一根試管將球移動過去
* 只能移動試管最上方的球
* 球只能移動到空試管或頂部有相同顏色球的試管
* 獲勝條件:每根試管中裝的要麼是同種顏色的球,要麼是空的

## 技術堆棧

* React.js - 前端框架
* TailwindCSS - 樣式和UI
* LocalStorage - 本地數據存儲
* HTML5 Audio API - 音效播放
* GitHub Actions - 自動部署到 GitHub Pages

## 遊戲技巧

1. 使用策略:思考幾步之後的局面,避免陷入無法移動的情況
2. 空試管利用:保持至少一個空試管作為臨時存放空間
3. 優先處理:先處理數量較多的顏色,再處理數量較少的
4. 移動順序:儘量按照顏色分組移動球,避免打亂已經整理好的球
5. 使用提示:如果遇到困難,可以使用提示功能尋求幫助

## 本地開發

要在本地運行此項目,請按照以下步驟操作:

1. 克隆倉庫

   ```
   git clone https://github.com/yanchen184/ball-sort-puzzle-game.git
   ```
2. 安裝依賴

   ```
   cd ball-sort-puzzle-game
   npm install
   ```
3. 啟動開發服務器

   ```
   npm start
   ```
4. 構建生產版本

   ```
   npm run build
   ```
5. 部署到 GitHub Pages

   ```
   npm run deploy
   ```

## 部署說明

本專案使用 GitHub Actions 自動部署。每當推送到 `main` 分支時，會自動構建並部署到 GitHub Pages。

如果需要手動部署，可以執行 `npm run deploy` 命令，這將構建應用並推送到 `gh-pages` 分支。

## 代碼結構

```
src/
├── components/      # React組件
│   ├── BallSortGame.js   # 主要遊戲組件
│   ├── FallingBalls.js   # 背景動畫效果
│   ├── Settings.js       # 遊戲設置組件
│   ├── Timer.js          # 計時器組件
│   └── WinAnimation.js   # 勝利動畫效果
├── utils/           # 工具函數
│   ├── GameUtils.js      # 遊戲邏輯工具
│   └── SoundUtils.js     # 音效工具函數
├── config.js        # 配置文件和常量
├── App.js           # 應用程序入口
└── index.js         # React入口點
```

## 版本歷史

### v1.1.0 (當前版本)

* 添加音效功能
* 添加版本號顯示
* 優化動畫效果
* 修復已知問題
* 改進 GitHub Pages 部署流程

### v1.0.0

* 初始版本發布
* 基本遊戲功能
* 不同難度級別
* 自動保存功能

## 未來計劃

* 添加更多難度級別
* 實現自定義關卡功能
* 支持多語言
* 排行榜系統
* 添加教程模式

## 貢獻

歡迎通過Pull Request或Issues提出改進建議和反饋。

## 許可證

MIT License
