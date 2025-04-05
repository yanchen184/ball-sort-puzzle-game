# 試管倒球遊戲部署指南

本文檔提供將試管倒球遊戲應用部署到 GitHub Pages 的詳細步驟。

## 部署選項

您有三種方式可以部署此應用：

1. 使用 `npm run deploy` 命令（標準方法）
2. 使用 `npm run deploy:custom` 命令（自定義腳本方法）
3. 使用 GitHub Actions 自動部署（CI/CD 方法）

## 選項 1：使用標準 npm run deploy

這是使用 `gh-pages` 套件的標準方法。

```bash
# 安裝依賴（如果尚未安裝）
npm install

# 編譯並部署
npm run deploy
```

此命令會自動執行以下操作：
1. 運行 `npm run build` 構建應用
2. 將 `build` 目錄中的文件推送到 `gh-pages` 分支

## 選項 2：使用自定義部署腳本

我們提供了一個增強的部署腳本，它提供更好的錯誤處理和更詳細的進度信息。

```bash
# 安裝依賴（如果尚未安裝）
npm install

# 編譯並使用自定義腳本部署
npm run deploy:custom
```

此腳本執行以下操作：
1. 檢查尚未提交的變更
2. 構建應用
3. 添加 `.nojekyll` 和其他必要文件
4. 將構建文件推送到 `gh-pages` 分支
5. 清理臨時文件

## 選項 3：使用 GitHub Actions

此選項自動化部署過程，當您推送到 `main` 分支時會自動觸發。

無需手動操作：每當您推送到 `main` 分支時，GitHub Actions 工作流會自動構建和部署您的應用。

## 部署後檢查清單

部署完成後，檢查以下事項：

1. 訪問 https://yanchen184.github.io/ball-sort-puzzle-game 確認網站是否正常顯示
2. 檢查頁面跳轉和路由是否正常工作
3. 確保所有資源（圖像、聲音等）都可以正確加載

## 故障排除

如果您遇到部署問題，請嘗試以下步驟：

1. **問題：網站顯示 404**
   - 解決方案：檢查 GitHub 倉庫設置中的 Pages 設置，確保它指向 `gh-pages` 分支

2. **問題：樣式或資源丟失**
   - 解決方案：確保 `package.json` 中的 `homepage` 字段設置正確

3. **問題：頁面刷新時顯示 404**
   - 解決方案：確認 `404.html` 和 `index.html` 中的重定向腳本正確無誤

4. **問題：自動部署失敗**
   - 解決方案：檢查 GitHub Actions 工作流日誌以找出具體錯誤

## 手動清理 gh-pages 分支

如果需要完全重設 `gh-pages` 分支：

```bash
# 刪除遠程 gh-pages 分支
git push origin --delete gh-pages

# 從頭開始部署
npm run deploy
```

## 了解更多

- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [React 應用部署到 GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)
- [處理 SPA 在 GitHub Pages 上的路由問題](https://github.com/rafgraph/spa-github-pages)
