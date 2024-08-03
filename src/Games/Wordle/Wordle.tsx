import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import wordsData from '../../assets/Wordle-assets/words.json';
import { useNavigate } from 'react-router-dom';

const Wordle: React.FC = () => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');

  useEffect(() => {
    setWordList(wordsData.words);
    setTargetWord(wordsData.words[Math.floor(Math.random() * wordsData.words.length)]);
  }, []);

  const navigate = useNavigate();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Enter' && currentGuess.length === 5) {
        if (!wordList.includes(currentGuess)) {
          alert('Invalid word');
          return;
        }

        setGuesses((prev) => {
          const newGuesses = [...prev, currentGuess];
          if (newGuesses.length === 5 && currentGuess !== targetWord) {
            alert(`The word was ${targetWord}`);
            navigate("/");
          } else if (newGuesses.length === 5 && currentGuess === targetWord) {
            alert(`You won!`);
            navigate("/");
          }
          return newGuesses;
        });
        setCurrentGuess('');
      } else if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    },
    [currentGuess, targetWord, wordList, navigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="absolute flex flex-col items-center justify-center space-y-32 min-h-full lg:space-y-2 bg-neutral-950 lg:w-full">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white pt-6">Wordle</h1>
      <Board targetWord={targetWord} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard onKeyPress={(key) => handleKeyPress(new KeyboardEvent('keydown', { key }))} />
      <div className=""></div>
    </div>
  );
};

export default Wordle;
