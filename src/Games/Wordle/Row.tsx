import React from 'react';
import Cell from './Cell';

interface RowProps {
  guess: string;
  targetWord: string;
}

const Row: React.FC<RowProps> = ({ guess, targetWord }) => {
  const isSubmitted = guess.length === 5;

  const cells = Array.from({ length: 5 }, (_, i) => {
    const char = guess[i] || '';
    let status = '';

    if (isSubmitted) {
      if (targetWord[i] === char) {
        status = 'correct';
      } else if (targetWord.includes(char)) {
        status = 'present';
      } else {
        status = 'absent';
      }
    }

    return { char, status };
  });

  return (
    <div className="grid grid-cols-5 gap-1">
      {cells.map((cell, index) => (
        <Cell key={index} char={cell.char} status={cell.status} />
      ))}
    </div>
  );
};

export default Row;
