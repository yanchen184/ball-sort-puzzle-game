import React from 'react';
import { gameLevels } from '../utils/GameUtils';
import { isSoundEnabled, toggleSound } from '../utils/SoundUtils';
import { APP_VERSION } from '../config';

/**
 * Game settings component
 * Allows user to select difficulty level and configure game options
 */
const Settings = ({ 
  currentLevel, 
  setCurrentLevel, 
  showTimer, 
  setShowTimer, 
  showHints, 
  setShowHints 
}) => {
  const soundEnabled = isSoundEnabled();
  
  const handleSoundToggle = () => {
    const newState = toggleSound();
    // 強制重新渲染
    setShowTimer(showTimer);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">遊戲設置</h2>
        <span className="text-xs text-gray-500">版本 {APP_VERSION}</span>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">難度等級</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(gameLevels).map((level) => (
            <button
              key={level}
              className={`px-3 py-2 rounded-md ${
                currentLevel === level
                  ? 'bg-blue-500 text-white font-bold'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setCurrentLevel(level)}
            >
              {gameLevels[level].name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-timer"
            checked={showTimer}
            onChange={(e) => setShowTimer(e.target.checked)}
            className="h-5 w-5 text-blue-500 rounded border-gray-300"
          />
          <label htmlFor="show-timer" className="ml-2 text-gray-700">
            顯示計時器
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-hints"
            checked={showHints}
            onChange={(e) => setShowHints(e.target.checked)}
            className="h-5 w-5 text-blue-500 rounded border-gray-300"
          />
          <label htmlFor="show-hints" className="ml-2 text-gray-700">
            啟用提示功能
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sound-toggle"
            checked={soundEnabled}
            onChange={handleSoundToggle}
            className="h-5 w-5 text-blue-500 rounded border-gray-300"
          />
          <label htmlFor="sound-toggle" className="ml-2 text-gray-700">
            遊戲音效
          </label>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p><span className="font-semibold">簡單：</span> {gameLevels.easy.colors.length}種顏色, {gameLevels.easy.tubeCount}根試管</p>
        <p><span className="font-semibold">中等：</span> {gameLevels.medium.colors.length}種顏色, {gameLevels.medium.tubeCount}根試管</p>
        <p><span className="font-semibold">困難：</span> {gameLevels.hard.colors.length}種顏色, {gameLevels.hard.tubeCount}根試管</p>
        <p><span className="font-semibold">專家：</span> {gameLevels.expert.colors.length}種顏色, {gameLevels.expert.tubeCount}根試管</p>
      </div>
    </div>
  );
};

export default Settings;
