import React from 'react';
import Row from './Row';

interface BoardProps {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
}

const Board: React.FC<BoardProps> = ({ targetWord, guesses, currentGuess }) => {
  const rows = [...guesses, currentGuess, ...Array(5 - guesses.length - 1).fill('')];

  return (
    <div className="grid grid-rows-6 gap-2 mb-8">
      {rows.map((guess, index) => (
        <Row key={index} guess={guess} targetWord={targetWord} />
      ))}
    </div>
  );
};

export default Board;
