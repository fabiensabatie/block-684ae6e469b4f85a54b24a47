export interface Bug {
  id: number;
  name: string;
  emoji: string;
  color: string;
}

export interface Card {
  id: number;
  bugId: number;
  bug: Bug;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  moves: number;
  gameComplete: boolean;
  gameStarted: boolean;
}