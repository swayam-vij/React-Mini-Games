import { useEffect, useState } from 'react';

const TwoZeroFourEight = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGame = () => {
    const initialBoard = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    setBoard(initialBoard);
    setTwo();
    setTwo();
  };

  const updateTile = (r: number, c: number, num: number) => {
    const tileId = `${r}-${c}`;
    const tile = document.getElementById(tileId);
    if (tile) {
      tile.innerText = num === 0 ? '' : num.toString();
      tile.className = 'tile';
      if (num > 0) {
        tile.classList.add(`x${num}`);
      }
    }
  };

  document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
      slideLeft();
      setTwo();
    } else if (e.code === 'ArrowRight') {
      slideRight();
      setTwo();
    } else if (e.code === 'ArrowUp') {
      slideUp();
      setTwo();
    } else if (e.code === 'ArrowDown') {
      slideDown();
      setTwo();
    }
    document.getElementById('score')!.innerText = score.toString();
  });

  const slide = (row: number[]): number[] => {
    row = row.filter(num => num !== 0);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        setScore(score + row[i]);
      }
    }
    row = row.filter(num => num !== 0);
    while (row.length < 4) {
      row.push(0);
    }
    return row;
  };

  const slideLeft = () => {
    const newBoard = [...board];
    for (let r = 0; r < 4; r++) {
      newBoard[r] = slide(newBoard[r]);
      setBoard(newBoard);
      for (let c = 0; c < 4; c++) {
        updateTile(r, c, newBoard[r][c]);
      }
    }
  };

  const slideRight = () => {
    const newBoard = [...board];
    for (let r = 0; r < 4; r++) {
      newBoard[r].reverse();
      newBoard[r] = slide(newBoard[r]);
      newBoard[r].reverse();
      setBoard(newBoard);
      for (let c = 0; c < 4; c++) {
        updateTile(r, c, newBoard[r][c]);
      }
    }
  };

  const slideUp = () => {
    const newBoard = [...board];
    for (let c = 0; c < 4; c++) {
      const column = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
      const updatedColumn = slide(column);
      for (let r = 0; r < 4; r++) {
        newBoard[r][c] = updatedColumn[r];
        updateTile(r, c, newBoard[r][c]);
      }
    }
    setBoard(newBoard);
  };

  const slideDown = () => {
    const newBoard = [...board];
    for (let c = 0; c < 4; c++) {
      const column = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
      column.reverse();
      const updatedColumn = slide(column);
      updatedColumn.reverse();
      for (let r = 0; r < 4; r++) {
        newBoard[r][c] = updatedColumn[r];
        updateTile(r, c, newBoard[r][c]);
      }
    }
    setBoard(newBoard);
  };

  const setTwo = () => {
    if (!hasEmptyTile()) {
      return;
    }
    let found = false;
    while (!found) {
      const r = Math.floor(Math.random() * 4);
      const c = Math.floor(Math.random() * 4);
      if (board[r][c] === 0) {
        const newBoard = [...board];
        newBoard[r][c] = 2;
        setBoard(newBoard);
        updateTile(r, c, 2);
        found = true;
      }
    }
  };

  const hasEmptyTile = (): boolean => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">2048</h1>
      <hr className="w-1/2 mb-4" />
      <h2 className="text-xl mb-4">Score: <span id="score">{score}</span></h2>
      <div id="board" className="w-400 h-400 bg-gray-300 border-4 border-gray-800 mx-auto flex flex-wrap">
        {board.map((row, r) =>
          row.map((num, c) => (
            <div key={`${r}-${c}`} id={`${r}-${c}`} className={`tile w-20 h-20 border-2 border-gray-800 text-2xl font-bold flex justify-center items-center ${num === 0 ? '' : `x${num}`}`}>
              {num !== 0 && num}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TwoZeroFourEight;
  