import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
  ];

  return (
    <div className="flex flex-col items-center">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.split('').map((key) => (
            <button
              key={key}
              className="w-10 h-10 m-1 bg-gray-300 rounded"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center">
        <button
          className="w-20 h-10 m-1 bg-gray-300 rounded"
          onClick={() => onKeyPress('Enter')}
        >
          Enter
        </button>
        <button
          className="w-20 h-10 m-1 bg-gray-300 rounded"
          onClick={() => onKeyPress('Backspace')}
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
