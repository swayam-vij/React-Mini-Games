import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import wordsData from '../../assets/Wordle-assets/words.json';

const Wordle: React.FC = () => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');

  useEffect(() => {
    setWordList(wordsData.words);
    setTargetWord(wordsData.words[Math.floor(Math.random() * wordsData.words.length)]);
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Enter' && currentGuess.length === 5) {
        setGuesses((prev) => [...prev, currentGuess]);
        setCurrentGuess('');
      } else if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    },
    [currentGuess]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      <Board targetWord={targetWord} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard onKeyPress={(key) => handleKeyPress(new KeyboardEvent('keydown', { key }))} />
    </div>
  );
};

export default Wordle;
