import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';

const LevelManager: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [score, setScore] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isGameWon, setIsGameWon] = useState(false);

  const maxLevel = 10;

  // Increase level and reset game when all cards are matched
  const handleLevelComplete = () => {
    setIsGameWon(true);
    if (level < maxLevel) {
      setLevel(prevLevel => prevLevel + 1);
      // resetGame();
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !isGameWon) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isGameWon]);

  useEffect(() => {
    window.Poki?.gameplayStart();
    return () => window.Poki?.gameplayStop();
  }, []);

  // Reset game for the next level
  const resetGame = () => {
    setClickCount(0);
    setTimeRemaining(60);
    setStartTime(Date.now());

    setIsGameWon(false);
    window.Poki?.gameplayStart();

  };

  // Calculate score
  const calculateScore = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const pointsForTime = Math.max(100 - timeTaken * 2, 0);
    const pointsForClicks = 100 - clickCount * 2;
    const finalScore = pointsForTime + pointsForClicks;
    setScore(finalScore);
  };

  return (
    <div className="level-manager">
      {isGameWon && (
        <div className="win-overlay">
          <div className="win-message">Congratulations! You Win!</div>
          <button className="restart-button" onClick={resetGame}>Play Again</button>
        </div>
      )}
      <GameBoard
        level={level}
        score={score}
        clickCount={clickCount}
        timeRemaining={timeRemaining}
        handleCardClick={() => setClickCount(prev => prev + 1)}
        handleLevelComplete={handleLevelComplete}
        calculateScore={calculateScore}
      />
      <div className="game-status">
        <div>Click Count: {clickCount}</div>
        <div>Level: {level}</div>
        <div>Score: {score}</div>
        <div>Time Remaining: {timeRemaining}s</div>
      </div>
    </div>
  );
};

export default LevelManager;
