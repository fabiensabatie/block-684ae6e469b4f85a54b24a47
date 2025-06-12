import React from 'react';
import { Card } from '../types';
import GameCard from './GameCard';

interface GameBoardProps {
  cards: Card[];
  onCardClick: (cardId: number) => void;
  disabled: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, disabled }) => {
  return (
    <div className="game-board">
      <div className="cards-grid">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={onCardClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;