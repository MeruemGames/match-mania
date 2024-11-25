import React, { useState, useEffect } from 'react';
import Card from './Card';

interface GameBoardProps {
  level: number;
  score: number;
  clickCount: number;
  timeRemaining: number;
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

  const calculateGridDimensions = (level: number) => {
    // Example logic: switch between 2x2, 2x4, 4x4, 4x6, etc., based on level
    const gridSizes = [
      { rows: 2, cols: 2 },
      { rows: 2, cols: 3 },
      { rows: 2, cols: 4 },
      { rows: 3, cols: 4 },
      { rows: 4, cols: 4 },
      { rows: 5, cols: 4 }
    ];
    if (level >= gridSizes.length) {
      return gridSizes[gridSizes.length - 1];
    }
    return gridSizes[(level - 1) % gridSizes.length];
  };

  const { rows, cols } = calculateGridDimensions(level);
  const totalCards = rows * cols;
  const uniquePairs = totalCards / 2;


  // console.log("debug ..", level, rows, cols, totalCards, uniquePairs)

  useEffect(() => {
    const cardValues = Array.from({ length: uniquePairs }, (_, i) => String.fromCharCode(65 + i));
    const shuffledCards = [...cardValues, ...cardValues]
      .slice(0, totalCards) // Ensures exact number of cards for grid
      .map(value => ({ value, id: Math.random(), isFlipped: false }))
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
  }, [level]);

  const onCardClick = (id: number) => {
    handleCardClick(); // Increment click count in LevelManager

    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

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
    <div className="game-board" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
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
