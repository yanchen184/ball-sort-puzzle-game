import React, { useState } from 'react';
import BallSortGame from './components/BallSortGame';

/**
 * Main Application Component
 * Renders the Ball Sort Game with header and footer
 */
function App() {
  const [showIntro, setShowIntro] = useState(true);
  
  return (
    <div className="App min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">試管倒球遊戲</h1>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100 font-medium text-sm"
              onClick={() => setShowIntro(!showIntro)}
            >
              {showIntro ? '隱藏介紹' : '遊戲介紹'}
            </button>
            <a 
              href="https://github.com/yanchen184/ball-sort-puzzle-game"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100 font-medium text-sm flex items-center"
            >
              <svg 
                className="w-4 h-4 mr-1" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>
      
      {/* Introduction */}
      {showIntro && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-5 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">歡迎來到試管倒球遊戲！</h2>
            <p className="text-gray-700 mb-4">
              試管倒球是一個有趣的邏輯解謎遊戲。遊戲中有多根試管，每根試管中裝有不同顏色的球。
              您的目標是透過移動這些球，使得每根試管中只包含同一種顏色的球或完全空置。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">遊戲特色</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>多種難度級別可供選擇</li>
                  <li>提示功能幫助解決難題</li>
                  <li>計時器追蹤您的解題時間</li>
                  <li>自動保存遊戲進度</li>
                  <li>撤銷功能可回退錯誤步驟</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">技巧提示</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>儘量先整理同一顏色的球</li>
                  <li>善用空試管作為臨時儲存空間</li>
                  <li>思考幾步之後的局面，避免陷入無法移動的情況</li>
                  <li>顏色較多的球優先處理</li>
                  <li>如遇到困難，可使用提示功能或撤銷前一步</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
                onClick={() => setShowIntro(false)}
              >
                開始遊戲
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Game */}
      <main className="container mx-auto px-4 pb-8">
        <BallSortGame />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} 試管倒球遊戲 | 由 React 開發</p>
          <p className="mt-1 text-sm">
            <a href="https://github.com/yanchen184/ball-sort-puzzle-game" className="text-blue-300 hover:text-blue-200" target="_blank" rel="noopener noreferrer">
              在 GitHub 上查看源代碼
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
