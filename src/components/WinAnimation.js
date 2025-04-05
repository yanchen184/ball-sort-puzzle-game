import React, { useState, useEffect } from 'react';

/**
 * WinAnimation component
 * Displays a congratulatory animation when player wins the game
 */
const WinAnimation = ({ colors, show }) => {
  const [particles, setParticles] = useState([]);
  
  // Generate confetti particles when component mounts or show changes
  useEffect(() => {
    if (show) {
      const newParticles = [];
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // Random x position (0-100%)
          y: -10 - Math.random() * 10, // Start slightly above screen
          size: Math.random() * 8 + 4, // Size between 4-12px
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 1, // Fall speed
          wobble: Math.random() * 10, // Horizontal wobble amount
          wobbleSpeed: Math.random() * 2 + 0.5, // Wobble speed
          rotation: Math.random() * 360, // Random rotation
          rotationSpeed: (Math.random() - 0.5) * 5, // Rotation speed
        });
      }
      
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [show, colors]);
  
  // Update particle positions
  useEffect(() => {
    if (!show || particles.length === 0) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Update particle position
          const newY = particle.y + particle.speed;
          const newRotation = (particle.rotation + particle.rotationSpeed) % 360;
          const newX = particle.x + Math.sin(newY * particle.wobbleSpeed / 100) * particle.wobble / 10;
          
          // If particle is below screen, reset it to the top
          if (newY > 110) {
            return {
              ...particle,
              y: -10,
              x: Math.random() * 100,
              rotation: Math.random() * 360,
            };
          }
          
          return {
            ...particle,
            y: newY,
            x: newX,
            rotation: newRotation,
          };
        });
      });
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [particles, show]);
  
  // Don't render if not showing
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
      
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
        <div className="text-5xl font-bold text-yellow-500 animate-bounce mb-4 text-shadow-lg">
          恭喜您獲勝！
        </div>
      </div>
    </div>
  );
};

export default WinAnimation;
