#!/usr/bin/env bash

# 停止腳本，一旦有命令失敗
set -e

# 構建項目
echo "開始構建..."
npm run build

# 切換到 build 文件夾
cd build

# 創建必要的 Git 文件
echo "準備 Git..."
git init
git config user.name "yanchen184"
git config user.email "62279165+yanchen184@users.noreply.github.com"
git add -A
git commit -m "Deploy to GitHub Pages"

# 強制推送到 gh-pages 分支
echo "部署到 GitHub Pages..."
git push -f git@github.com:yanchen184/ball-sort-puzzle-game.git master:gh-pages

# 返回到上一個目錄
cd ..

echo "部署完成！"
