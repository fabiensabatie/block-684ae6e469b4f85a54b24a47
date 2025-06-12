import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Card } from '../types';
import { createGameCards, areCardsMatched } from '../utils/gameLogic';
import GameBoard from './GameBoard';
import GameStats from './GameStats';

const MemoryGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: createGameCards(),
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    gameComplete: false,
    gameStarted: false,
  });

  const totalPairs = 8; // 8 different bugs = 8 pairs

  const resetGame = useCallback(() => {
    setGameState({
      cards: createGameCards(),
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameComplete: false,
      gameStarted: false,
    });
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    setGameState(prevState => {
      if (prevState.flippedCards.includes(cardId) || prevState.flippedCards.length >= 2) {
        return prevState;
      }

      const newFlippedCards = [...prevState.flippedCards, cardId];
      const newCards = prevState.cards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      );

      // Start the game on first card click
      const gameStarted = prevState.gameStarted || newFlippedCards.length === 1;

      // If two cards are flipped, check for match
      if (newFlippedCards.length === 2) {
        const isMatch = areCardsMatched(newCards, newFlippedCards);
        const moves = prevState.moves + 1;
        
        if (isMatch) {
          // Match found - mark cards as matched
          const matchedCards = newCards.map(card =>
            newFlippedCards.includes(card.id) 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          );
          
          const matchedPairs = prevState.matchedPairs + 1;
          const gameComplete = matchedPairs === totalPairs;
          
          return {
            ...prevState,
            cards: matchedCards,
            flippedCards: [],
            matchedPairs,
            moves,
            gameComplete,
            gameStarted,
          };
        } else {
          // No match - flip cards back after delay
          setTimeout(() => {
            setGameState(current => ({
              ...current,
              cards: current.cards.map(card =>
                newFlippedCards.includes(card.id) && !card.isMatched
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: [],
            }));
          }, 1000);
          
          return {
            ...prevState,
            cards: newCards,
            flippedCards: newFlippedCards,
            moves,
            gameStarted,
          };
        }
      }

      return {
        ...prevState,
        cards: newCards,
        flippedCards: newFlippedCards,
        gameStarted,
      };
    });
  }, [totalPairs]);

  return (
    <div className="memory-game">
      <div className="game-header">
        <h1>🐛 Bug Memory Game</h1>
        <p>Find pairs of matching bugs by flipping the cards!</p>
      </div>

      <GameStats
        moves={gameState.moves}
        matchedPairs={gameState.matchedPairs}
        totalPairs={totalPairs}
        onRestart={resetGame}
        gameComplete={gameState.gameComplete}
      />

      <GameBoard
        cards={gameState.cards}
        onCardClick={handleCardClick}
        disabled={gameState.flippedCards.length >= 2 && !gameState.gameComplete}
      />
    </div>
  );
};

export default MemoryGame;