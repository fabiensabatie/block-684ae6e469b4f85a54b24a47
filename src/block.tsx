import React from 'react';
import MemoryGame from './components/MemoryGame';
import './styles/game.css';

interface BlockProps {
  title?: string;
  description?: string;
}

const Block: React.FC<BlockProps> = ({ 
  title = "Bug Memory Game", 
  description = "A fun 2D memory card game featuring different bugs" 
}) => {
  return (
    <div className="bug-memory-game-block">
      <MemoryGame />
    </div>
  );
};

export default Block;