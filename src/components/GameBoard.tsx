import React, { useState, useEffect } from 'react';
import Card from './Card';

interface GameBoardProps {
  level: number;
  score: number;
  clickCount: number;
  timeRemaining: number;
  isGameWon: boolean;
  handleCardClick: () => void;
  handleLevelComplete: () => void;
  calculateScore: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  level,
  handleCardClick,
  handleLevelComplete,
}) => {
  const [cards, setCards] = useState<{ id: number; value: string; isFlipped: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  // Set up cards for the current level
  useEffect(() => {
    const cardValues = Array.from({ length: 4 + level }, (_, i) => String.fromCharCode(65 + i));
    const shuffledCards = [...cardValues, ...cardValues]
      .map(value => ({ value, id: Math.random(), isFlipped: false }))
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
  }, [level]);

  const onCardClick = (id: number) => {
    handleCardClick(); // Increment click count in LevelManager

    // Avoid flipping if two cards are already flipped or if the card is already matched
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

    // Flip the selected card
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      if (cards[firstCardId].value === cards[secondCardId].value) {
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
        if (matchedCards.length + 2 === cards.length) {
          handleLevelComplete(); // Level complete logic
        }
      }
      // Flip back after delay if no match
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="game-board">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
