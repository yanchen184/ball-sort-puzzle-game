/**
 * Utility functions for the Ball Sort Puzzle game
 */

// Predefined levels with different difficulties
export const gameLevels = {
  easy: {
    name: "簡單",
    tubeCount: 6,
    colors: ['red', 'blue', 'green', 'yellow'],
    ballsPerColor: 3,
  },
  medium: {
    name: "中等",
    tubeCount: 8,
    colors: ['red', 'blue', 'green', 'yellow', 'purple'],
    ballsPerColor: 4,
  },
  hard: {
    name: "困難",
    tubeCount: 10,
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'teal'],
    ballsPerColor: 4,
  },
  expert: {
    name: "專家",
    tubeCount: 12,
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'teal', 'pink', 'brown'],
    ballsPerColor: 4,
  }
};

/**
 * Initialize the game based on level settings
 * @param {Object} level - Level configuration
 * @returns {Array} Array of tubes containing balls
 */
export const initializeGame = (level) => {
  const { tubeCount, colors, ballsPerColor } = level;
  
  // Create an array of all balls
  const allBalls = [];
  colors.forEach(color => {
    for (let i = 0; i < ballsPerColor; i++) {
      allBalls.push(color);
    }
  });
  
  // Randomly shuffle the balls
  for (let i = allBalls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allBalls[i], allBalls[j]] = [allBalls[j], allBalls[i]];
  }
  
  // Calculate tubes needed for the balls plus empty tubes
  const totalBallTubes = Math.ceil(allBalls.length / ballsPerColor);
  const emptyTubeCount = tubeCount - totalBallTubes;
  
  // Distribute balls to tubes
  const tubes = Array(tubeCount).fill().map(() => []);
  let tubeIndex = 0;
  
  for (let i = 0; i < allBalls.length; i++) {
    if (tubes[tubeIndex].length < ballsPerColor) {
      tubes[tubeIndex].push(allBalls[i]);
    } else {
      tubeIndex++;
      tubes[tubeIndex].push(allBalls[i]);
    }
  }
  
  return tubes;
};

/**
 * Check if the game is won
 * @param {Array} tubes - Current state of tubes
 * @returns {boolean} True if game is won
 */
export const checkWin = (tubes) => {
  for (const tube of tubes) {
    if (tube.length === 0) continue; // Empty tubes don't need checking
    
    const firstColor = tube[0];
    
    // Check if all balls in the tube are the same color
    const allSameColor = tube.every(ball => ball === firstColor);
    
    // Each tube must be either empty or full with same color balls
    if (!allSameColor) return false;
  }
  return true;
};

/**
 * Check if a move is valid
 * @param {Array} fromTube - Source tube
 * @param {Array} toTube - Target tube
 * @param {number} maxBalls - Maximum balls per tube
 * @returns {boolean} True if move is valid
 */
export const isValidMove = (fromTube, toTube, maxBalls) => {
  // Can't move from an empty tube
  if (fromTube.length === 0) return false;
  
  // Target tube can't be full
  if (toTube.length >= maxBalls) return false;
  
  // If target tube is not empty, top ball color must match
  if (toTube.length > 0 && fromTube[fromTube.length - 1] !== toTube[toTube.length - 1]) {
    return false;
  }
  
  return true;
};

/**
 * Get a hint for the next move
 * @param {Array} tubes - Current state of tubes
 * @param {number} maxBalls - Maximum balls per tube
 * @returns {Object|null} Hint object with from and to indices, or null if no hint available
 */
export const getHint = (tubes, maxBalls) => {
  // Try to find a valid move
  for (let fromIndex = 0; fromIndex < tubes.length; fromIndex++) {
    for (let toIndex = 0; toIndex < tubes.length; toIndex++) {
      // Skip same tube
      if (fromIndex === toIndex) continue;
      
      const fromTube = tubes[fromIndex];
      const toTube = tubes[toIndex];
      
      if (isValidMove(fromTube, toTube, maxBalls)) {
        // Check if this move helps complete a tube or moves a ball to an empty tube
        const topBallColor = fromTube[fromTube.length - 1];
        
        // If moving to an empty tube
        if (toTube.length === 0) {
          // Only suggest moving to empty tubes if it helps separate mixed colors
          const sameColorCount = fromTube.filter(b => b === topBallColor).length;
          if (sameColorCount < fromTube.length) {
            return { from: fromIndex, to: toIndex };
          }
        } 
        // If moving to a tube with the same color
        else if (toTube[toTube.length - 1] === topBallColor) {
          // This is a good move to combine same colors
          return { from: fromIndex, to: toIndex };
        }
      }
    }
  }
  
  // If no optimal move found, suggest any valid move
  for (let fromIndex = 0; fromIndex < tubes.length; fromIndex++) {
    for (let toIndex = 0; toIndex < tubes.length; toIndex++) {
      if (fromIndex !== toIndex && 
          isValidMove(tubes[fromIndex], tubes[toIndex], maxBalls)) {
        return { from: fromIndex, to: toIndex };
      }
    }
  }
  
  // No valid moves available
  return null;
};

/**
 * Save game state to local storage
 * @param {Object} gameState - Game state to save
 */
export const saveGameState = (gameState) => {
  try {
    localStorage.setItem('ballSortGameState', JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

/**
 * Load game state from local storage
 * @returns {Object|null} Loaded game state or null if not found
 */
export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem('ballSortGameState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};
