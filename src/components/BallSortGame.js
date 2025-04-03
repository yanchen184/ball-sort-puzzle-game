import React, { useState, useEffect } from 'react';

/**
 * Ball Sort Puzzle game component
 * This game features 8 tubes with balls of 5 different colors.
 * The goal is to sort the balls so each tube contains balls of only one color.
 */
const BallSortGame = () => {
  // Ball colors
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  
  /**
   * Initialize the game state with randomly distributed balls
   * @returns {Array} Array of tubes containing balls
   */
  const initializeGame = () => {
    // Create an array of all balls (5 of each color)
    const allBalls = [];
    colors.forEach(color => {
      for (let i = 0; i < 5; i++) {
        allBalls.push(color);
      }
    });
    
    // Randomly shuffle the balls
    for (let i = allBalls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allBalls[i], allBalls[j]] = [allBalls[j], allBalls[i]];
    }
    
    // Distribute balls to tubes
    const tubes = Array(8).fill().map(() => []);
    let tubeIndex = 0;
    
    for (let i = 0; i < allBalls.length; i++) {
      if (tubes[tubeIndex].length < 5) {
        tubes[tubeIndex].push(allBalls[i]);
      } else {
        tubeIndex++;
        tubes[tubeIndex].push(allBalls[i]);
      }
    }
    
    return tubes;
  };
  
  // Game state
  const [tubes, setTubes] = useState([]);
  const [selectedTube, setSelectedTube] = useState(null);
  const [moves, setMoves] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  
  // Initialize the game on component mount
  useEffect(() => {
    resetGame();
  }, []);
  
  /**
   * Reset the game to initial state
   */
  const resetGame = () => {
    setTubes(initializeGame());
    setSelectedTube(null);
    setMoves(0);
    setMoveHistory([]);
    setGameWon(false);
  };
  
  /**
   * Check if the game is won
   * @param {Array} currentTubes - Current state of tubes
   * @returns {boolean} True if game is won
   */
  const checkWin = (currentTubes) => {
    for (const tube of currentTubes) {
      if (tube.length === 0) continue; // Empty tubes don't need checking
      
      // Check if all balls in the tube are the same color
      const firstColor = tube[0];
      const allSameColor = tube.every(ball => ball === firstColor);
      
      // If any tube has balls of different colors, game is not won yet
      if (!allSameColor) return false;
    }
    return true;
  };
  
  /**
   * Handle tube click event
   * @param {number} tubeIndex - Index of the clicked tube
   */
  const handleTubeClick = (tubeIndex) => {
    // If game is already won, do nothing
    if (gameWon) return;
    
    // If no tube is selected, select the current tube (if not empty)
    if (selectedTube === null) {
      if (tubes[tubeIndex].length > 0) {
        setSelectedTube(tubeIndex);
      }
    } else {
      // A tube is already selected, try to move a ball
      const fromTube = tubes[selectedTube];
      const toTube = tubes[tubeIndex];
      
      // Check if move is valid
      if (
        // Can't move to the same tube
        selectedTube !== tubeIndex &&
        // Target tube can't be full
        toTube.length < 5 &&
        // If target tube is not empty, top ball color must match
        (toTube.length === 0 || fromTube[fromTube.length - 1] === toTube[toTube.length - 1])
      ) {
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
        }
      } else {
        // Move is invalid, deselect tube
        setSelectedTube(null);
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">試管倒球遊戲</h1>
      
      <div className="mb-4 bg-white p-3 rounded-lg shadow-md">
        <p className="text-lg font-semibold">移動次數: <span className="text-blue-600">{moves}</span></p>
        {gameWon && (
          <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
            <p className="text-xl font-bold text-green-600">恭喜！您獲勝了！</p>
            <p className="text-md">總共用了 <span className="font-bold">{moves}</span> 步完成遊戲！</p>
            {moves <= 50 && <p className="text-sm text-green-700">太厲害了！非常高效的解法！</p>}
            {moves > 50 && moves <= 100 && <p className="text-sm text-blue-700">做得好！相當不錯的成績！</p>}
            {moves > 100 && <p className="text-sm text-orange-700">完成了遊戲！再接再厲，挑戰更少步數！</p>}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {tubes.map((tube, index) => (
          <div 
            key={index}
            className={`relative flex flex-col-reverse items-center justify-start w-16 h-64 bg-white bg-opacity-50 rounded-b-3xl border-2 border-t-0 border-gray-400 cursor-pointer ${selectedTube === index ? 'border-blue-500 border-4' : ''}`}
            onClick={() => handleTubeClick(index)}
          >
            {tube.map((color, ballIndex) => (
              <div
                key={ballIndex}
                className="w-12 h-12 rounded-full m-1"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex gap-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetGame}
        >
          重新開始遊戲
        </button>
        
        {moveHistory.length > 0 && (
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => {
              // Show move history
              alert(`移動歷史 (共${moves}步):\n${moveHistory.map(m => 
                `第${m.moveNumber}步: 從試管${m.from + 1}移動${m.color}球到試管${m.to + 1}`
              ).join('\n')}`);
            }}
          >
            查看移動記錄
          </button>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-bold mb-2">遊戲規則：</h2>
        <ul className="list-disc pl-5">
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
