import React, { useState, useEffect } from 'react';

/**
 * Game timer component
 * Displays elapsed time since game start
 */
const Timer = ({ isRunning, onReset }) => {
  const [seconds, setSeconds] = useState(0);
  
  // Start/stop timer based on isRunning prop
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  
  // Reset timer when onReset changes
  useEffect(() => {
    setSeconds(0);
  }, [onReset]);
  
  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-mono text-xl font-semibold text-gray-700">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;
