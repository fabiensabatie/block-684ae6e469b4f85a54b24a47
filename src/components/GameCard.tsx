import React from 'react';
import { Card } from '../types';

interface GameCardProps {
  card: Card;
  onClick: (cardId: number) => void;
  disabled: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`game-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
        card.isMatched ? 'matched' : ''
      } ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-pattern">?</div>
        </div>
        <div className="card-back" style={{ backgroundColor: card.bug.color }}>
          <div className="bug-emoji">{card.bug.emoji}</div>
          <div className="bug-name">{card.bug.name}</div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;