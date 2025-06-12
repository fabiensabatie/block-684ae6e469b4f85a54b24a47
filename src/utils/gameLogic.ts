import { Card, Bug } from '../types';
import { bugs } from '../data/bugs';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const createGameCards = (): Card[] => {
  const selectedBugs = bugs.slice(0, 8); // Use 8 different bugs
  const cardPairs: Card[] = [];
  
  selectedBugs.forEach((bug: Bug) => {
    // Create two cards for each bug (a pair)
    cardPairs.push(
      {
        id: bug.id * 2 - 1, // Odd numbers for first card
        bugId: bug.id,
        bug,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: bug.id * 2, // Even numbers for second card
        bugId: bug.id,
        bug,
        isFlipped: false,
        isMatched: false,
      }
    );
  });
  
  return shuffleArray(cardPairs);
};

export const checkMatch = (card1: Card, card2: Card): boolean => {
  return card1.bugId === card2.bugId;
};

export const areCardsMatched = (cards: Card[], cardIds: number[]): boolean => {
  if (cardIds.length !== 2) return false;
  
  const [card1, card2] = cardIds.map(id => cards.find(card => card.id === id));
  if (!card1 || !card2) return false;
  
  return checkMatch(card1, card2);
};