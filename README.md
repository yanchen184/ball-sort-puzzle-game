# 試管倒球遊戲 (Ball Sort Puzzle)

一個使用React實現的彩色球排序遊戲。遊戲的目標是通過移動彩色球，使每根試管中的球都是同一顏色。

## 遊戲規則

- 有八根試管，每根最多可以放五顆球
- 總共有五種顏色的球，每種顏色五顆
- 開始時球隨機分佈在試管中
- 只能移動試管最上面的球到另一根試管
- 球只能移動到空試管或頂部有相同顏色球的試管
- 獲勝條件：每根試管中的球都是同一顏色

## 功能特色

- 步數計數器：記錄完成遊戲所需的步數
- 移動歷史：記錄每一步移動的詳細信息
- 成績評價：根據完成步數給予不同評價
- 簡潔直觀的用戶界面

## 在線演示

你可以通過以下鏈接在線體驗遊戲：

[在線試玩 Ball Sort Puzzle](https://yanchen184.github.io/ball-sort-puzzle-game/)

## 本地運行

```bash
# 克隆倉庫
git clone https://github.com/yanchen184/ball-sort-puzzle-game.git

# 進入項目目錄
cd ball-sort-puzzle-game

# 安裝依賴
npm install

# 啟動開發服務器
npm start
```

## 技術棧

- React
- CSS/Tailwind CSS
- JavaScript

## 關於作者

球排序遊戲是一個有趣且富有挑戰性的邏輯遊戲，希望您能享受！

## 版本更新

- v1.0.0: 初始版本發布 (2025-04-03)
