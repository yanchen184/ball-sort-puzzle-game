/**
 * SoundUtils - 音效工具函數
 * 管理遊戲中的所有音效
 */

// 音效文件路徑
const sounds = {
  click: '/sounds/click.mp3',
  move: '/sounds/move.mp3',
  invalidMove: '/sounds/invalid-move.mp3',
  complete: '/sounds/complete.mp3',
  win: '/sounds/win.mp3',
  hint: '/sounds/hint.mp3',
  undo: '/sounds/undo.mp3',
  reset: '/sounds/reset.mp3',
};

// 音效緩存
let soundCache = {};
let soundEnabled = true;

/**
 * 初始化音效
 * 預加載所有音效
 */
export const initSounds = () => {
  try {
    // 檢查是否已有保存的音效設置
    const savedSoundState = localStorage.getItem('ballSortSoundEnabled');
    if (savedSoundState !== null) {
      soundEnabled = JSON.parse(savedSoundState);
    }
    
    // 預加載所有音效
    Object.entries(sounds).forEach(([name, path]) => {
      const audio = new Audio(path);
      audio.load();
      soundCache[name] = audio;
    });
    
    return true;
  } catch (error) {
    console.error('初始化音效失敗:', error);
    return false;
  }
};

/**
 * 播放指定音效
 * @param {string} name - 音效名稱
 */
export const playSound = (name) => {
  if (!soundEnabled || !soundCache[name]) return;
  
  try {
    // 克隆音效以允許重疊播放
    const sound = soundCache[name].cloneNode();
    sound.volume = 0.5; // 設置音量
    sound.play().catch(err => {
      // 自動播放可能被瀏覽器阻止，這裡靜默處理
      console.debug('音效播放被阻止:', err);
    });
  } catch (error) {
    console.error('播放音效失敗:', error);
  }
};

/**
 * 切換音效開關
 * @returns {boolean} 音效是否啟用
 */
export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  
  // 保存音效設置到本地存儲
  try {
    localStorage.setItem('ballSortSoundEnabled', JSON.stringify(soundEnabled));
  } catch (error) {
    console.error('保存音效設置失敗:', error);
  }
  
  return soundEnabled;
};

/**
 * 獲取音效狀態
 * @returns {boolean} 音效是否啟用
 */
export const isSoundEnabled = () => {
  return soundEnabled;
};
