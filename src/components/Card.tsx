// src/components/Card.tsx
import React from 'react';

interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, value, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => onClick(id)}
    >
      {isFlipped ? value : '?'}
    </div>
  );
};

export default Card;


