import React from 'react';

interface GameStatsProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  onRestart: () => void;
  gameComplete: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  moves, 
  matchedPairs, 
  totalPairs, 
  onRestart, 
  gameComplete 
}) => {
  return (
    <div className="game-stats">
      <div className="stats-info">
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pairs:</span>
          <span className="stat-value">{matchedPairs}/{totalPairs}</span>
        </div>
      </div>
      
      <button 
        className="restart-btn"
        onClick={onRestart}
      >
        🔄 New Game
      </button>
      
      {gameComplete && (
        <div className="victory-message">
          🎉 Congratulations! You completed the game in {moves} moves!
        </div>
      )}
    </div>
  );
};

export default GameStats;