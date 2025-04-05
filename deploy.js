/**
 * GitHub Pages 部署腳本
 * 這個腳本自動化了 React 應用到 GitHub Pages 的部署過程
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 顯示彩色輸出的輔助函數
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 打印帶樣式的消息
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// 運行命令並返回輸出
function runCommand(command) {
  log(`執行: ${command}`, colors.cyan);
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    log(`命令執行失敗: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// 主函數
async function deploy() {
  // 開始部署過程
  log('開始部署流程...', colors.bright + colors.green);
  
  // 確保目錄是乾淨的
  log('檢查 Git 狀態...', colors.yellow);
  try {
    const status = execSync('git status --porcelain').toString().trim();
    if (status) {
      log('警告: 您有未提交的變更。請先提交或存儲這些變更。', colors.red);
      log('未提交的變更: \n' + status, colors.yellow);
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      
      readline.question('是否繼續部署? (y/n) ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
          log('部署已取消', colors.red);
          process.exit(0);
        }
        readline.close();
        continueDeployment();
      });
    } else {
      continueDeployment();
    }
  } catch (error) {
    log(`檢查 Git 狀態時出錯: ${error.message}`, colors.red);
    process.exit(1);
  }
  
  // 繼續部署流程
  function continueDeployment() {
    // 構建應用
    log('構建 React 應用...', colors.yellow);
    runCommand('npm run build');
    
    // 添加 .nojekyll 文件
    log('創建 .nojekyll 文件...', colors.yellow);
    fs.writeFileSync(path.join('build', '.nojekyll'), '');
    
    // 創建 CNAME 文件 (如果需要)
    if (false) { // 設置為 true 如果您有自定義域名
      log('創建 CNAME 文件...', colors.yellow);
      fs.writeFileSync(path.join('build', 'CNAME'), 'your-custom-domain.com');
    }
    
    // 初始化 build 目錄為 Git 倉庫
    log('初始化 build 目錄為 Git 倉庫...', colors.yellow);
    process.chdir('build');
    runCommand('git init');
    runCommand('git add .');
    runCommand('git commit -m "Deploy to GitHub Pages"');
    
    // 推送到 gh-pages 分支
    log('推送到 gh-pages 分支...', colors.yellow);
    runCommand('git push -f git@github.com:yanchen184/ball-sort-puzzle-game.git main:gh-pages');
    process.chdir('..');
    
    // 清理臨時 Git 倉庫
    log('清理臨時 Git 倉庫...', colors.yellow);
    fs.rmSync(path.join('build', '.git'), { recursive: true, force: true });
    
    // 完成
    log('部署成功完成!', colors.bright + colors.green);
    log('您的應用已部署到: https://yanchen184.github.io/ball-sort-puzzle-game', colors.green);
  }
}

// 執行部署流程
deploy().catch(error => {
  log(`部署過程中出錯: ${error.message}`, colors.red);
  process.exit(1);
});
