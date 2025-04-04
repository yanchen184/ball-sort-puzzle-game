import React, { useState, useEffect } from 'react';

/**
 * FallingBalls component
 * Creates a background animation of falling colored balls
 */
const FallingBalls = ({ colors = ['red', 'blue', 'green', 'yellow', 'purple'], count = 15 }) => {
  const [balls, setBalls] = useState([]);
  
  useEffect(() => {
    // Generate random balls
    const newBalls = [];
    for (let i = 0; i < count; i++) {
      newBalls.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 20 + 10, // 10-30px
        left: Math.random() * 100, // 0-100%
        delay: Math.random() * 5, // 0-5s delay
        duration: Math.random() * 10 + 5, // 5-15s fall duration
      });
    }
    setBalls(newBalls);
  }, [count, colors]);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="absolute rounded-full opacity-30"
          style={{
            backgroundColor: ball.color,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            left: `${ball.left}%`,
            top: '-30px',
            animation: `fallAnimation ${ball.duration}s linear ${ball.delay}s infinite`,
            boxShadow: `0 0 10px ${ball.color}`,
          }}
        />
      ))}
      
      {/* Add the falling animation */}
      <style jsx="true">{`
        @keyframes fallAnimation {
          0% {
            transform: translateY(-30px) rotate(0deg);
          }
          100% {
            transform: translateY(calc(100vh + 30px)) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FallingBalls;
