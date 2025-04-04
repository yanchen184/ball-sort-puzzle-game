import React, { useState, useEffect, useCallback } from 'react';
import Settings from './Settings';
import Timer from './Timer';
import { 
  gameLevels, 
  initializeGame, 
  checkWin, 
  isValidMove, 
  getHint, 
  saveGameState, 
  loadGameState 
} from '../utils/GameUtils';

/**
 * Ball Sort Puzzle game component
 * This game features tubes with balls of different colors.
 * The goal is to sort the balls so each tube contains balls of only one color.
 */
const BallSortGame = () => {
  // Game settings
  const [showSettings, setShowSettings] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('medium');
  const [showTimer, setShowTimer] = useState(true);
  const [showHints, setShowHints] = useState(true);
  
  // Game state
  const [tubes, setTubes] = useState([]);
  const [selectedTube, setSelectedTube] = useState(null);
  const [moves, setMoves] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [hint, setHint] = useState(null);
  const [timerReset, setTimerReset] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Get current level settings
  const currentLevelSettings = gameLevels[currentLevel];
  
  /**
   * Reset the game with current settings
   */
  const resetGame = useCallback(() => {
    setTubes(initializeGame(currentLevelSettings));
    setSelectedTube(null);
    setMoves(0);
    setMoveHistory([]);
    setGameWon(false);
    setHint(null);
    setTimerReset(prev => prev + 1);
    setGameStarted(true);
    
    // Clear saved game
    localStorage.removeItem('ballSortGameState');
  }, [currentLevelSettings]);
  
  // Initialize the game on component mount or when level changes
  useEffect(() => {
    // Try to load saved game
    const savedGame = loadGameState();
    
    if (savedGame && savedGame.level === currentLevel) {
      // Restore saved game state
      setTubes(savedGame.tubes);
      setMoves(savedGame.moves);
      setMoveHistory(savedGame.moveHistory);
      setGameWon(savedGame.gameWon);
      setGameStarted(true);
    } else {
      // Start a new game
      resetGame();
    }
  }, [currentLevel, resetGame]);
  
  // Save game state when it changes
  useEffect(() => {
    if (gameStarted && !gameWon) {
      saveGameState({
        level: currentLevel,
        tubes,
        moves,
        moveHistory,
        gameWon
      });
    }
  }, [tubes, moves, moveHistory, gameWon, currentLevel, gameStarted]);
  
  /**
   * Handle tube click event
   * @param {number} tubeIndex - Index of the clicked tube
   */
  const handleTubeClick = (tubeIndex) => {
    // If game is already won, do nothing
    if (gameWon) return;
    
    // Clear any hint when user makes a move
    if (hint) setHint(null);
    
    // If no tube is selected, select the current tube (if not empty)
    if (selectedTube === null) {
      if (tubes[tubeIndex].length > 0) {
        setSelectedTube(tubeIndex);
      }
    } else {
      // A tube is already selected, try to move a ball
      const fromTube = tubes[selectedTube];
      const toTube = tubes[tubeIndex];
      
      // Can't move to the same tube
      if (selectedTube === tubeIndex) {
        setSelectedTube(null);
        return;
      }
      
      // Check if move is valid
      if (isValidMove(fromTube, toTube, currentLevelSettings.ballsPerColor)) {
        // Move the ball
        const newTubes = [...tubes];
        const ball = newTubes[selectedTube].pop();
        newTubes[tubeIndex].push(ball);
        
        // Record move in history
        const moveRecord = {
          from: selectedTube,
          to: tubeIndex,
          color: ball,
          moveNumber: moves + 1
        };
        
        setTubes(newTubes);
        setSelectedTube(null);
        setMoves(moves + 1);
        setMoveHistory([...moveHistory, moveRecord]);
        
        // Check if game is won
        if (checkWin(newTubes)) {
          setGameWon(true);
          // Remove saved game on win
          localStorage.removeItem('ballSortGameState');
        }
      } else {
        // Move is invalid, deselect tube
        setSelectedTube(null);
      }
    }
  };
  
  /**
   * Undo the last move
   */
  const undoLastMove = () => {
    if (moveHistory.length === 0 || gameWon) return;
    
    // Get the last move
    const lastMove = moveHistory[moveHistory.length - 1];
    
    // Apply the reverse move
    const newTubes = [...tubes];
    const ball = newTubes[lastMove.to].pop();
    newTubes[lastMove.from].push(ball);
    
    // Update state
    setTubes(newTubes);
    setSelectedTube(null);
    setMoves(moves - 1);
    setMoveHistory(moveHistory.slice(0, -1));
  };
  
  /**
   * Show hint for next move
   */
  const showNextHint = () => {
    const nextHint = getHint(tubes, currentLevelSettings.ballsPerColor);
    setHint(nextHint);
  };
  
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">試管倒球遊戲</h1>
      
      {/* Game Controls and Info Bar */}
      <div className="flex flex-wrap justify-between items-center w-full max-w-4xl mb-4 gap-2">
        <div className="flex gap-2 items-center">
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            onClick={() => setShowSettings(!showSettings)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            設置
          </button>
          
          <span className="text-lg font-semibold px-2 py-1 bg-white rounded-lg shadow">
            難度: <span className="text-blue-600">{currentLevelSettings.name}</span>
          </span>
          
          <span className="text-lg font-semibold px-2 py-1 bg-white rounded-lg shadow">
            移動次數: <span className="text-blue-600">{moves}</span>
          </span>
        </div>
        
        <div className="flex gap-2">
          {showTimer && <Timer isRunning={gameStarted && !gameWon} onReset={timerReset} />}
          
          <button 
            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={undoLastMove}
            disabled={moveHistory.length === 0 || gameWon}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            撤銷
          </button>
          
          {showHints && (
            <button 
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={showNextHint}
              disabled={gameWon}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              提示
            </button>
          )}
        </div>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 w-full max-w-4xl">
          <Settings 
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            showTimer={showTimer}
            setShowTimer={setShowTimer}
            showHints={showHints}
            setShowHints={setShowHints}
          />
        </div>
      )}
      
      {/* Game Won Message */}
      {gameWon && (
        <div className="mb-6 p-4 bg-green-100 rounded-lg shadow-md border border-green-300 w-full max-w-4xl">
          <p className="text-2xl font-bold text-green-600 mb-2">恭喜！您獲勝了！</p>
          <p className="text-lg mb-1">總共用了 <span className="font-bold">{moves}</span> 步完成遊戲！</p>
          {moves <= (currentLevelSettings.colors.length * 3) && (
            <p className="text-sm text-green-700">太厲害了！非常高效的解法！</p>
          )}
          {moves > (currentLevelSettings.colors.length * 3) && moves <= (currentLevelSettings.colors.length * 6) && (
            <p className="text-sm text-blue-700">做得好！相當不錯的成績！</p>
          )}
          {moves > (currentLevelSettings.colors.length * 6) && (
            <p className="text-sm text-orange-700">完成了遊戲！再接再厲，挑戰更少步數！</p>
          )}
          <button 
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={resetGame}
          >
            再玩一次
          </button>
        </div>
      )}
      
      {/* Game Board */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {tubes.map((tube, index) => (
          <div 
            key={index}
            className={`relative flex flex-col-reverse items-center justify-start w-16 h-64 bg-white bg-opacity-50 rounded-b-3xl border-2 border-t-0 border-gray-400 cursor-pointer transition-all duration-200 
              ${selectedTube === index ? 'border-blue-500 border-4 transform scale-105' : ''}
              ${hint && (hint.from === index || hint.to === index) ? 'border-yellow-400 border-4' : ''}
            `}
            onClick={() => handleTubeClick(index)}
          >
            {/* Draw tube content */}
            {tube.map((color, ballIndex) => (
              <div
                key={ballIndex}
                className={`w-12 h-12 rounded-full m-1 transition-all duration-300 transform
                  ${hint && hint.from === index && ballIndex === tube.length - 1 ? 'animate-bounce' : ''}
                `}
                style={{ 
                  backgroundColor: color,
                  boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.2), inset 3px 3px 8px rgba(255,255,255,0.5)"
                }}
              />
            ))}
            
            {/* Tube label */}
            <div className="absolute -bottom-6 text-center w-full text-sm text-gray-600">
              {index + 1}
            </div>
            
            {/* Hint animation */}
            {hint && hint.from === index && (
              <div className="absolute -top-8 w-full flex justify-center">
                <div className="animate-bounce text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
              </div>
            )}
            {hint && hint.to === index && (
              <div className="absolute -top-8 w-full flex justify-center">
                <div className="animate-bounce text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l5-5 5 5" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Game Controls */}
      <div className="flex gap-4 mb-6">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          onClick={resetGame}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          重新開始
        </button>
        
        {moveHistory.length > 0 && (
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center"
            onClick={() => {
              // Show move history
              alert(`移動歷史 (共${moves}步):\n${moveHistory.map(m => 
                `第${m.moveNumber}步: 從試管${m.from + 1}移動${m.color}球到試管${m.to + 1}`
              ).join('\n')}`)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            查看記錄
          </button>
        )}
      </div>
      
      {/* Game Rules */}
      <div className="mt-2 p-4 bg-white rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-2 text-gray-800">遊戲規則：</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>點擊一根試管選擇它，再點擊另一根試管將球移動過去</li>
          <li>只能移動試管最上方的球</li>
          <li>球只能移動到空試管或頂部有相同顏色球的試管</li>
          <li>獲勝條件：每根試管中裝的要麼是同種顏色的球，要麼是空的</li>
        </ul>
      </div>
    </div>
  );
};

export default BallSortGame;
